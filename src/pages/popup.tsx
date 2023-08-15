import posthog from 'posthog-js';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfirmSimulationButton } from '../components/simulation/SimulationButton';
import { NoSimulation } from '../components/simulation/NoSimulation';
import { SimulationHeader } from '../components/simulation/SimulationHeader';
import { TransactionContent } from '../components/simulation/TransactionContent';
import { SimulationMethodType } from '../models/simulation/Transaction';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { ErrorComponent } from '../components/simulation/Error';
import { ChatWeb3Tab } from '../components/app-dashboard/tabs/chatweb3/components/Chat/ChatWeb3Tab';
import { BypassedSimulationButton } from '../components/simulation/SimulationSubComponents/BypassButton';
import { WgKeys } from '../lib/helpers/chrome/localStorageKeys';
import { PersonalSign } from '../components/simulation/PersonalSign';
import localStorageHelpers from '../lib/helpers/chrome/localStorage';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../lib/theme';
import { WelcomeModal } from '../components/app-dashboard/tabs/chatweb3/components/Chat/WelcomeModal';
import { TransactionDetails } from '../components/simulation/TransactionDetails';
import { useSimulation } from '../lib/hooks/useSimulation';
import { SimulationTabs } from '../components/simulation/SimulationTabs';
import { SimulationLoading } from '../components/simulation/SimulationSubComponents/SimulationLoading';
import { CompletedSuccessfulSimulation, StoredSimulationState } from '../lib/simulation/storage';
import styles from '../styles.module.css';

export interface SimulationBaseProps {
  currentSimulation: CompletedSuccessfulSimulation;
}

const Popup = () => {
  const [showChatWeb3, setShowChatWeb3] = useState<boolean>(false);
  const [tutorialComplete, setTutorialComplete] = useState<boolean>(true);
  const [chatweb3Welcome, setChatWeb3Welcome] = useState<boolean>(true);
  const { currentSimulation, loading } = useSimulation();

  function toggleChatWeb3WelcomeModal() {
    setChatWeb3Welcome(!chatweb3Welcome);
    setTutorialComplete(!tutorialComplete);
  }

  posthog.init('phc_rb7Dd9nqkBMJYCCh7MQWpXtkNqIGUFdCZbUThgipNQD', {
    api_host: 'https://app.posthog.com',
    persistence: 'localStorage',
    autocapture: false,
    capture_pageleave: false,
  });

  Sentry.init({
    dsn: 'https://d6ac9c557b4c4eee8b1d4224528f52b3@o4504402373640192.ingest.sentry.io/4504402378293248',
    integrations: [new BrowserTracing()],
  });

  useEffect(() => {
    localStorageHelpers.get<boolean>(WgKeys.ChatWeb3Onboarding).then((tutorialIsComplete) => {
      if (tutorialIsComplete) {
        setTutorialComplete(true);
        return;
      }

      chrome.storage.local.set({ [WgKeys.ChatWeb3Onboarding]: true });
      setTutorialComplete(false);
    });
  }, []);

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
        <WelcomeModal isOpen={!tutorialComplete} onClose={toggleChatWeb3WelcomeModal} />
      </ChakraProvider>

      <div className={styles.transactionHeadingFixed}>
        <SimulationHeader recommendedAction={currentSimulation.simulation.recommendedAction} />
        <SimulationTabs setShowChatWeb3={setShowChatWeb3} />
      </div>

      {showChatWeb3 ? (
        <ChakraProvider theme={theme}>
          <ChatWeb3Tab
            showChatWeb3={showChatWeb3}
            setShowChatWeb3={setShowChatWeb3}
            storedSimulation={currentSimulation}
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
