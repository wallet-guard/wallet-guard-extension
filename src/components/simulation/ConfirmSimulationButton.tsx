import posthog from 'posthog-js';
import React from 'react';
import type { StoredSimulation } from '../../lib/simulation/storage';
import { simulationNeedsAction, StoredSimulationState, updateSimulationState } from '../../lib/simulation/storage';
import { SimulationMethodType, SimulationWarningType } from '../../models/simulation/Transaction';
import styles from '../../styles/simulation/ConfirmSimulationButton.module.css';

interface RejectSignInButton {
  color?: string;
  backgroundColor?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgWidth: number;
  buttonText: string;
  onClick: () => void;
}

const RejectSignInButton: React.FC<RejectSignInButton> = ({
  color = 'black',
  backgroundColor,
  imgSrc,
  imgWidth,
  buttonText,
  onClick,
}) => {
  return (
    <button
      className={styles['button']}
      style={{ color: color, backgroundColor: backgroundColor, border: backgroundColor }}
      onClick={onClick}
    >
      <img src={imgSrc} width={imgWidth} height={imgWidth} />
      {buttonText}
    </button>
  );
};

interface ConfirmSimulationButtonProps {
  storedSimulation: StoredSimulation;
  confirmText?: string;
}

export const ConfirmSimulationButton: React.FC<ConfirmSimulationButtonProps> = ({
  storedSimulation,
  confirmText = 'CONTINUE',
}) => {
  const { id, signer, state } = storedSimulation;

  if (simulationNeedsAction(state)) {
    return (
      <div className={`${styles['footer-container']}`}>
        <div className={styles['button-container']}>
          <RejectSignInButton
            backgroundColor="#424242"
            imgSrc="/images/popup/x.png"
            imgWidth={13}
            color="white"
            buttonText="REJECT"
            onClick={() => {
              posthog.capture('simulation rejected', {
                warningType: storedSimulation.simulation?.warningType,
                storedSimulation: storedSimulation,
              });
              updateSimulationState(id, StoredSimulationState.Rejected);
            }}
          />
          {state === StoredSimulationState.Success ||
          state === StoredSimulationState.Revert ||
          state === StoredSimulationState.Error ? (
            <RejectSignInButton
              backgroundColor="white"
              imgSrc="/images/popup/ArrowRight.png"
              imgWidth={19}
              buttonText={confirmText}
              onClick={() => {
                posthog.capture('simulation confirmed', {
                  warningType: storedSimulation.simulation?.warningType,
                  storedSimulation: storedSimulation,
                });
                updateSimulationState(id, StoredSimulationState.Confirmed);
              }}
            />
          ) : storedSimulation.simulation &&
            storedSimulation.simulation.method === SimulationMethodType.EthSign &&
            storedSimulation.simulation.warningType === SimulationWarningType.Warn ? (
            <div></div>
          ) : (
            <RejectSignInButton
              backgroundColor="white"
              imgSrc="/images/popup/circleCheck.png"
              imgWidth={19}
              buttonText="SKIP"
              onClick={() => {
                posthog.alias(signer);
                posthog.capture('simulation confirmed', {
                  warningType: storedSimulation.simulation?.warningType,
                  storedSimulation: storedSimulation,
                });
                updateSimulationState(id, StoredSimulationState.Confirmed);
              }}
            />
          )}
        </div>
      </div>
    );
  }
  return null;
};
