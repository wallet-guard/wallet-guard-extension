import posthog from 'posthog-js';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfirmSimulationButton } from '../components/simulation/SimulationButton';
import { NoSimulation } from '../components/simulation/NoSimulation';
import { SimulationHeader } from '../components/simulation/SimulationHeader';
import { TransactionContent } from '../components/simulation/TransactionContent';
import { SimulationMethodType } from '../models/simulation/Transaction';
import * as Sentry from '@sentry/react';
import { ErrorComponent } from '../components/simulation/Error';
import { ChatWeb3Tab } from '../components/chatweb3/components/Chat/ChatWeb3Tab';
import { BypassedSimulationButton } from '../components/simulation/SimulationSubComponents/BypassButton';
import { WgKeys } from '../lib/helpers/chrome/localStorageKeys';
import { PersonalSign } from '../components/simulation/PersonalSign';
import localStorageHelpers from '../lib/helpers/chrome/localStorage';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../lib/theme';
import { TransactionDetails } from '../components/simulation/TransactionDetails';
import { useSimulation } from '../lib/hooks/useSimulation';
import { SimulationTabs } from '../components/simulation/SimulationTabs';
import { SimulationLoading } from '../components/simulation/SimulationSubComponents/SimulationLoading';
import { CompletedSuccessfulSimulation, StoredSimulationState } from '../lib/simulation/storage';
import styles from '../styles.module.css';
import { WelcomeModal } from '../components/chatweb3/components/Chat/WelcomeModal';

export interface SimulationBaseProps {
  currentSimulation: CompletedSuccessfulSimulation;
}

const Popup = () => {
  const [showChatWeb3, setShowChatWeb3] = useState<boolean>(false);
  const [showDashboardWelcome, updateShowDashboardWelcome] = useState<boolean>(false);
  const { currentSimulation, loading } = useSimulation();

  posthog.init('phc_rb7Dd9nqkBMJYCCh7MQWpXtkNqIGUFdCZbUThgipNQD', {
    api_host: 'https://app.posthog.com',
    persistence: 'localStorage',
    autocapture: false,
    capture_pageleave: false,
    disable_session_recording: true,
  });

  Sentry.init({
    dsn: 'https://d6ac9c557b4c4eee8b1d4224528f52b3@o4504402373640192.ingest.sentry.io/4504402378293248',
    integrations: [new Sentry.BrowserTracing()],
  });

  useEffect(() => {
    posthog.onFeatureFlags(() => {
      const showPromo = posthog.isFeatureEnabled('show-dashboard-promo');
      if (!showPromo) return;

      localStorageHelpers.get<boolean | null>(WgKeys.DashboardOnboarding).then((hasShownDashboardPromo) => {
        if (hasShownDashboardPromo) {
          updateShowDashboardWelcome(false);
          return;
        }

        chrome.storage.local.set({ [WgKeys.DashboardOnboarding]: true });
        updateShowDashboardWelcome(true);
      });
    });
  }, []);

  function toggleDashboardWelcomeModal() {
    updateShowDashboardWelcome(!showDashboardWelcome);
  }

  // Return an empty page because we don't want any other UIs to flash in the few ms before we finish pulling from localStorage
  if (loading) {
    return <></>;
  }

  // No Active Transaction Screen
  if (!currentSimulation) {
    return <NoSimulation />;
  }

  // Loading Screen
  if (currentSimulation.state === StoredSimulationState.Simulating) {
    return (
      <>
        <SimulationLoading />;
        <ConfirmSimulationButton storedSimulation={currentSimulation} />
      </>
    );
  }

  // Error Screen
  if (currentSimulation.simulation.error) {
    return <ErrorComponent currentSimulation={currentSimulation} type={currentSimulation.simulation.error.type} />;
  }

  // Not sure why TypeScript doesn't pick this up, but by this point, this is the type.
  const successfulSimulation: CompletedSuccessfulSimulation = currentSimulation as CompletedSuccessfulSimulation;

  // Personal Sign Screen
  if (currentSimulation.args.method === SimulationMethodType.PersonalSign) {
    return (
      <>
        <PersonalSign currentSimulation={successfulSimulation} />
        <ConfirmSimulationButton storedSimulation={currentSimulation} />
      </>
    );
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        {showDashboardWelcome && (
          <WelcomeModal onClose={toggleDashboardWelcomeModal} />
        )}
      </ChakraProvider>

      <div className={styles.transactionHeadingFixed}>
        <SimulationHeader details={{ recommendedAction: currentSimulation.simulation.recommendedAction, verified: currentSimulation.simulation.scanResult.verified }} />
        <SimulationTabs setShowChatWeb3={setShowChatWeb3} />
      </div>

      {showChatWeb3 ? (
        <ChakraProvider theme={theme}>
          <ChatWeb3Tab
            showChatWeb3={showChatWeb3}
            setShowChatWeb3={setShowChatWeb3}
            storedSimulation={successfulSimulation}
          />
        </ChakraProvider>
      ) : (
        <>
          <TransactionDetails currentSimulation={successfulSimulation} />
          <TransactionContent currentSimulation={successfulSimulation} />
          <div style={{ height: '140px' }} />
          {currentSimulation.args.bypassed ? (
            <BypassedSimulationButton storedSimulation={currentSimulation} />
          ) : (
            <ConfirmSimulationButton storedSimulation={currentSimulation} />
          )}
        </>
      )}
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
