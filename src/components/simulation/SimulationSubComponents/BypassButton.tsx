import posthog from 'posthog-js';
import React from 'react';
import {
  simulationNeedsAction,
  StoredSimulation,
  StoredSimulationState,
  updateSimulationAction,
} from '../../../lib/simulation/storage';
import styles from '../simulation.module.css';

export const BypassedSimulationButton = ({ storedSimulation }: { storedSimulation: StoredSimulation }) => {
  const { id, state } = storedSimulation;

  posthog.capture('simulation bypass attempt', {
    storedSimulation,
  });

  function joinDiscord() {
    chrome.tabs.create({ url: 'https://discord.gg/mvbtaJzXDP' });
  }

  if (simulationNeedsAction(state)) {
    return (
      <div className={`${styles['footer-container']}`}>
        <div className="row px-3">
          <div
            className="col-12 text-center"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <a href="#" onClick={joinDiscord} style={{ marginTop: '15px', marginBottom: '15px' }}>
              Open Support Ticket
            </a>
            <button
              className={`${styles['reject-button']} btn`}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
              onClick={() => {
                posthog.capture('bypassed simulation rejected', {
                  storedSimulation: storedSimulation,
                });
                updateSimulationAction(id, StoredSimulationState.Rejected);
              }}
            >
              <img
                src="/images/popup/x.png"
                alt="An X icon in a circle, indicating cancel or close."
                width={19}
                className={`${styles['font-archivo-medium']} pr-2`}
              />
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
