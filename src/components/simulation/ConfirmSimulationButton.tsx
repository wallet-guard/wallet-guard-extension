import posthog from 'posthog-js';
import React from 'react';
import type { StoredSimulation } from '../../lib/simulation/storage';
import { simulationNeedsAction, StoredSimulationState, updateSimulationState } from '../../lib/simulation/storage';
import { SimulationMethodType, SimulationWarningType } from '../../models/simulation/Transaction';
import styles from './simulation.module.css';

export const ConfirmSimulationButton = ({ storedSimulation }: { storedSimulation: StoredSimulation }) => {
  const { id, signer, state } = storedSimulation;

  if (simulationNeedsAction(state)) {
    return (
      <div className={` ${styles['footer-container']} `}>
        <div className={` ${styles['center-button']}`}>
          <button
            className="pt-3 text-center"
            style={{ textDecoration: 'underline', color: 'white', background: 'none', border: 'none', outline: 'none' }}
          >
            Have any questions?
          </button>
        </div>

        <div className="row px-3 pt-3">
          <div className="col-6 text-center">
            <button
              className={`${styles['reject-button']} btn`}
              onClick={() => {
                posthog.capture('simulation rejected', {
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
              Reject
            </button>
          </div>
          <div className="col-6 text-center">
            {state === StoredSimulationState.Success ||
            state === StoredSimulationState.Revert ||
            state === StoredSimulationState.Error ? (
              <button
                className={`${styles['confirm-button']} btn`}
                onClick={() => {
                  posthog.capture('simulation confirmed', {
                    warningType: storedSimulation.simulation?.warningType,
                    storedSimulation: storedSimulation,
                  });
                  updateSimulationState(id, StoredSimulationState.Confirmed);
                }}
              >
                <div>
                  <img
                    src="/images/popup/circleCheck.png"
                    alt="Circle with a checkmark in the center, indicating approval or continuation of the transaction."
                    width={23}
                    className={`${styles['font-archivo-medium']} pr-2`}
                    style={{ marginTop: '-2px' }}
                  />
                  Continue
                </div>
              </button>
            ) : storedSimulation.simulation &&
              storedSimulation.simulation.method === SimulationMethodType.EthSign &&
              storedSimulation.simulation.warningType === SimulationWarningType.Warn ? (
              <div></div>
            ) : (
              <button
                className={`${styles['confirm-button']} btn`}
                onClick={() => {
                  posthog.alias(signer);
                  posthog.capture('simulation confirmed', {
                    warningType: storedSimulation.simulation?.warningType,
                    storedSimulation: storedSimulation,
                  });
                  updateSimulationState(id, StoredSimulationState.Confirmed);
                }}
              >
                <div>
                  <img
                    src="/images/popup/circleCheck.png"
                    alt="Circle with a checkmark in the center, indicating approval or continuation of the transaction."
                    width={23}
                    className={`${styles['font-archivo-medium']} pr-2`}
                    style={{ marginTop: '-2px' }}
                  />
                  Skip
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};
