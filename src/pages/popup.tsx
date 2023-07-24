import posthog from 'posthog-js';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfirmSimulationButton } from '../components/simulation/ConfirmSimulationButton';
import { ContractDetails } from '../components/simulation/ContractDetails';
import { NoSimulation } from '../components/simulation/NoSimulation';
import { SimulationHeader } from '../components/simulation/SimulationHeader';
import { SimulationOverview } from '../components/simulation/SimulationOverview';
import { TransactionContent } from '../components/simulation/TransactionContent';
import type { StoredSimulation } from '../lib/simulation/storage';
import { StoredSimulationState } from '../lib/simulation/storage';
import { ErrorType, SimulationMethodType, SimulationWarningType } from '../models/simulation/Transaction';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { ErrorComponent } from '../components/simulation/Error';
import { ChatWeb3Tab } from '../components/app-dashboard/tabs/chatweb3/components/Chat/ChatWeb3Tab';
import { BypassedSimulationButton } from '../components/simulation/SimulationSubComponents/BypassButton';
import { SimulationSurvey } from '../components/simulation/SimulationSurvey';
import { WgKeys } from '../lib/helpers/chrome/localStorageKeys';
import { PersonalSign } from '../components/simulation/PersonalSign';
import localStorageHelpers from '../lib/helpers/chrome/localStorage';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../lib/theme';
import { WelcomeModal } from '../components/app-dashboard/tabs/chatweb3/components/Chat/WelcomeModal';
import { TransactionDetails } from '../components/simulation/TransactionDetails';

const Popup = () => {
  const [showChatWeb3, setShowChatWeb3] = useState<boolean>(false);
  const [currentSimulation, setCurrentSimulation] = useState<StoredSimulation>();
  const [showSurvey, setShowSurvey] = useState(false);
  const [loading, isLoading] = useState(true);
  const [tutorialComplete, setTutorialComplete] = useState<boolean>(true);

  const [chatweb3Welcome, setChatWeb3Welcome] = useState<boolean>(true);
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

  function updateSimulations(simulations: StoredSimulation[]) {
    const filteredSimulations = simulations?.filter(
      (simulation: StoredSimulation) =>
        simulation.state !== StoredSimulationState.Rejected && simulation.state !== StoredSimulationState.Confirmed
    );

    let current;

    if (filteredSimulations && filteredSimulations[0]) {
      current = filteredSimulations[0];
      setCurrentSimulation(current);
    } else {
      setCurrentSimulation(undefined);
    }

    if (current?.args?.bypassed) {
      if (current.simulation) {
        current.simulation.warningType = SimulationWarningType.Warn;
        current.simulation.message = [
          `This transaction attempted to bypass Wallet Guard's simulation. If you continue seeing this, please open a support ticket.`,
          ...(current.simulation.message || ''),
        ];
        setCurrentSimulation(current);
      }
    }

    isLoading(false);
  }

  useEffect(() => {
    isLoading(true);
    chrome.storage.local
      .get('simulations')
      .then(({ simulations }) => updateSimulations(simulations))
      .catch((err) => {
        isLoading(false);
        console.log('unable to fetch simulations from popup', err);
      });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes['simulations']?.newValue) {
        const newSimulations = changes['simulations']?.newValue;
        updateSimulations(newSimulations);
      }
    });

    // Show the survey if the feature flag is enabled and the user hasn't completed it yet
    const surveyFlag = posthog.isFeatureEnabled('show-user-survey');
    if (surveyFlag) {
      localStorageHelpers.get<boolean>(WgKeys.SurveyComplete).then((surveyComplete) => {
        if (!surveyComplete) {
          setShowSurvey(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    localStorageHelpers.get<boolean>(WgKeys.ChatWeb3Onboarding).then((tutorialIsComplete) => {
      if (tutorialIsComplete) {
        setTutorialComplete(true);
        return;
      }

      chrome.storage.local.set({ [WgKeys.ChatWeb3Onboarding]: true });

      posthog.onFeatureFlags(() => {
        const onboardingFeatureEnabled = posthog.getFeatureFlagPayload('show-onboarding') as boolean;

        if (onboardingFeatureEnabled) {
          posthog.capture('showChatWeb3Onboarding');
          setTutorialComplete(false);
        } else {
          setTutorialComplete(true);
        }
      });
    });
  }, []);

  if (loading) {
    return <div style={{ backgroundColor: 'black' }} />;
  }

  if (!currentSimulation) {
    return <NoSimulation />;
  }

  if (currentSimulation.simulation?.error || currentSimulation.error) {
    return (
      <ErrorComponent
        currentSimulation={currentSimulation}
        type={currentSimulation.simulation?.error?.type || currentSimulation.error?.type || ErrorType.GeneralError}
      />
    );
  }

  // Personal Sign Screen
  if (currentSimulation.args.method === SimulationMethodType.PersonalSign) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PersonalSign simulation={currentSimulation} />
        </div>
        <ConfirmSimulationButton storedSimulation={currentSimulation} />
      </>
    );
  }

  return (
    <>
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
          <ChakraProvider theme={theme}>
            <WelcomeModal isOpen={!tutorialComplete} onClose={toggleChatWeb3WelcomeModal} />
          </ChakraProvider>
          <div style={{ backgroundColor: 'black' }}>
            <SimulationHeader
              showChatWeb3={showChatWeb3}
              setShowChatWeb3={setShowChatWeb3}
              storedSimulation={currentSimulation}
            />
          </div>
          {showSurvey && <SimulationSurvey />}

          <div className="container">
            <TransactionDetails currentSimulation={currentSimulation} />
          </div>

          {/* <div>
            {((currentSimulation.state === StoredSimulationState.Success &&
              currentSimulation.simulation?.warningType === SimulationWarningType.Warn) ||
              currentSimulation.simulation?.warningType === SimulationWarningType.Info ||
              currentSimulation.simulation?.error) && (
              <div>
                <SimulationOverview
                  warningType={currentSimulation.simulation.warningType}
                  message={currentSimulation.simulation.message || []}
                  method={currentSimulation.simulation.method}
                />
              </div>
            )}
          </div> */}
          {currentSimulation.state === StoredSimulationState.Success && (
            <div className="pt-4">
              <ContractDetails storedSimulation={currentSimulation} />
            </div>
          )}
          <div className="pb-4">
            <TransactionContent storedSimulation={currentSimulation && currentSimulation} />
          </div>
          <div style={{ height: '140px' }} />
          {currentSimulation.args?.bypassed ? (
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
