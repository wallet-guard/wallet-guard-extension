import posthog from 'posthog-js';
import React from 'react';
import {
  simulationNeedsAction,
  StoredSimulation,
  StoredSimulationState,
  updateSimulationState,
} from '../../../lib/simulation/storage';
import styles from '../simulation.module.css';

export const BypassedSimulationButton = ({ storedSimulation }: { storedSimulation: StoredSimulation }) => {
  const { id, state } = storedSimulation;

  posthog.capture('simulation bypass attempt', {
    storedSimulation,
  });

  if (simulationNeedsAction(state)) {
    return (
      <div className={`${styles['footer-container']}`}>
        <div className="row px-3 pt-4">
          <div className="col-12 text-center">
            <button
              className={`${styles['reject-button']} btn`}
              onClick={() => {
                posthog.capture('bypassed simulation rejected', {
                  warningType: storedSimulation.simulation?.warningType,
                  storedSimulation: storedSimulation,
                });
                updateSimulationState(id, StoredSimulationState.Rejected);
              }}
            >
              <img
                src="/images/popup/x.png"
                alt="An X icon in a circle, indicating cancel or close."
                width={19}
                className={`${styles['font-archivo-medium']} pr-2`}
                style={{ marginTop: '-3px' }}
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
