import posthog from 'posthog-js';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfirmSimulationButton } from '../components/simulation/ConfirmSimulationButton';
import { ContractDetails } from '../components/simulation/ContractDetails';
import { NoSimulation } from '../components/simulation/NoSimulation';
import { SimulationHeader } from '../components/simulation/SimulationHeader';
import { SimulationOverview } from '../components/simulation/SimulationOverview';
import { TransactionContent } from '../components/simulation/TransactionContent';
import logger from '../lib/logger';
import type { StoredSimulation } from '../lib/simulation/storage';
import { StoredSimulationState } from '../lib/simulation/storage';
import { ResponseType, SimulationWarningType } from '../models/simulation/Transaction';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { InsufficientFunds } from '../components/simulation/InsufficientFunds';

const Popup = () => {
  const [storedSimulations, setStoredSimulations] = useState<StoredSimulation[]>([]);

  const log = logger.child({ component: 'Popup' });

  posthog.init('phc_rb7Dd9nqkBMJYCCh7MQWpXtkNqIGUFdCZbUThgipNQD', {
    api_host: 'https://app.posthog.com',
    persistence: 'localStorage',
    autocapture: false,
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

  const filteredSimulations = storedSimulations?.filter(
    (simulation: StoredSimulation) =>
      simulation.state !== StoredSimulationState.Rejected && simulation.state !== StoredSimulationState.Confirmed
  );

  console.log(filteredSimulations);

  if (!filteredSimulations || filteredSimulations.length === 0) {
    return (
      <>
        <NoSimulation />
      </>
    );
  }

  // TODO: I have no idea if we have a filtered simulation here or not. Does the 409 error code make it to here??
  if (filteredSimulations[0].state === ResponseType.InsufficientFunds) {
    return (
      <>
        {/* todo: adding a errorType to the TAS response would be helpful to determine which UI to show, especially if multiple
      warning screens could be shown here. (or base it on status code?)
      type: insufficientFunds = this screen */}
        <InsufficientFunds filteredSimulations={filteredSimulations} />
      </>
    );
  }

  if (!!filteredSimulations[0].error) {
    return <>{/* TODO: Generalized error component */}</>;
  }
  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <SimulationHeader />
      </div>

      <div>
        {((filteredSimulations[0].state === StoredSimulationState.Success &&
          filteredSimulations[0].simulation?.warningType === SimulationWarningType.Warn) ||
          filteredSimulations[0].simulation?.warningType === SimulationWarningType.Info ||
          filteredSimulations[0].simulation?.error) && (
          <div>
            <SimulationOverview
              warningType={filteredSimulations[0].simulation?.warningType}
              message={filteredSimulations[0].simulation?.message}
              method={filteredSimulations[0].simulation.method}
            />
          </div>
        )}
      </div>

      {filteredSimulations[0].state === StoredSimulationState.Success && (
        <div className="pt-4">
          <ContractDetails storedSimulation={filteredSimulations && filteredSimulations[0]} />
        </div>
      )}

      <div className="pb-4">
        <TransactionContent storedSimulation={filteredSimulations && filteredSimulations[0]} />
      </div>
      <div style={{ height: '120px' }} />
      <ConfirmSimulationButton storedSimulation={filteredSimulations && filteredSimulations[0]} />
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
