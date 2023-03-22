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
import { ErrorType, SimulationWarningType } from '../models/simulation/Transaction';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { ErrorComponent } from '../components/simulation/Error';
import { BypassedSimulationButton } from '../components/simulation/SimulationSubComponents/BypassButton';

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

  // SET THIS TEMPORARILY TO UPDATE CURRENT USERS - Remove after 0.7.5
  const uid = posthog.get_distinct_id();
  chrome.runtime.setUninstallURL('https://walletguard.app/uninstall?id=' + uid);

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

  // TODO: Consider the idea of filtering out anything that does not match the currentSite.
  // Do not use currentSite service because someone could change tabs and get the data mismatched
  const filteredSimulations = storedSimulations?.filter(
    (simulation: StoredSimulation) =>
      simulation.state !== StoredSimulationState.Rejected && simulation.state !== StoredSimulationState.Confirmed
  );

  if (!filteredSimulations || filteredSimulations.length === 0) {
    return <NoSimulation />;
  }

  const currentSimulation = filteredSimulations[0];

  if (currentSimulation.bypassed) {
    // TODO: Implement a component that warns the user
    // and does not have the normal buttons. Only button
    // neccessary here is 'Dismiss'
    // make sure we cover the two major cases here
    // 1. handle simulation errors (TAS down or insufficient funds)
    // 2. if it's coming from opensea/isVerified. Revoke's implementation does not show in this case I think
    // ========
    // The approach here should either be:
    //1. code this directly into the existing components,
    //2. split out into new component but you'd have to bring in the ErrorComponent + the return statement below
    // ========
    // maybe just implement override components on top of the 2-3 components that need changed. for ex
    // on line 121 maybe check: if bypass, display Bypass Confirmation Component, otherwise show current
    // yeah, this is probs the best solution
    // but again how do we display errors?
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

      <div>
        {((currentSimulation.state === StoredSimulationState.Success &&
          currentSimulation.simulation?.warningType === SimulationWarningType.Warn) ||
          currentSimulation.simulation?.warningType === SimulationWarningType.Info ||
          currentSimulation.simulation?.error) && (
          <div>
            <SimulationOverview
              warningType={currentSimulation.simulation?.warningType}
              message={currentSimulation.simulation?.message}
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
      {currentSimulation.bypassed ? (
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
