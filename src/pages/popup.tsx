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
import { ErrorType, SimulationWarningType } from '../models/simulation/Transaction';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { ErrorComponent } from '../components/simulation/Error';
import { BypassedSimulationButton } from '../components/simulation/SimulationSubComponents/BypassButton';
import { SimulationSurvey } from '../components/simulation/SimulationSurvey';

const Popup = () => {
  const [storedSimulations, setStoredSimulations] = useState<StoredSimulation[]>([]);
  const [currentSimulation, setCurrentSimulation] = useState<StoredSimulation>();

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
    chrome.storage.local.get('simulations').then(({ simulations }) => {
      setStoredSimulations(simulations);
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes['simulations']?.newValue) {
        const newSimulations = changes['simulations']?.newValue;
        setStoredSimulations(newSimulations);
      }
    });
  }, []);

  useEffect(() => {
    const filteredSimulations = storedSimulations?.filter(
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

    if (current?.args.bypassed) {
      if (current.simulation) {
        current.simulation.warningType = SimulationWarningType.Warn;
        current.simulation.message = [
          `This transaction attempted to bypass Wallet Guard's simulation. Please proceed with caution.`,
          ...(current.simulation.message || ''),
        ];
        setCurrentSimulation(current);
      }
    }
  }, [storedSimulations]);

  posthog.onFeatureFlags(() => {
    console.log(posthog.isFeatureEnabled('user-survey-4-14'));
  });

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

  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <SimulationHeader />
      </div>
      {posthog.isFeatureEnabled('user-survey-4-14') && <SimulationSurvey />}
      {/* todo: intergrate this w/ posthog feature flags */}

      <div>
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
      </div>

      {currentSimulation.state === StoredSimulationState.Success && (
        <div className="pt-4">
          <ContractDetails storedSimulation={currentSimulation} />
        </div>
      )}

      <div className="pb-4">
        <TransactionContent storedSimulation={currentSimulation} />
      </div>
      <div style={{ height: '120px' }} />
      {currentSimulation.args.bypassed ? (
        <BypassedSimulationButton storedSimulation={currentSimulation} />
      ) : (
        <ConfirmSimulationButton storedSimulation={currentSimulation} />
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
