import posthog from 'posthog-js';
import React from 'react';
import type { StoredSimulation } from '../../lib/simulation/storage';
import { simulationNeedsAction, StoredSimulationState, updateSimulationState } from '../../lib/simulation/storage';
import { SimulationMethodType, SimulationWarningType } from '../../models/simulation/Transaction';
import styles from '../../styles/simulation/ConfirmSimulationButton.module.css';

interface ActionIconButton {
  color?: string;
  backgroundColor?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconSize: number;
  label: string;
  onClick: () => void;
}

const ActionIconButton: React.FC<ActionIconButton> = ({
  color = 'black',
  backgroundColor,
  iconSrc,
  iconSize,
  label,
  onClick,
}) => {
  return (
    <button
      className={styles['button']}
      style={{ color: color, backgroundColor: backgroundColor, border: backgroundColor }}
      onClick={onClick}
    >
      <img src={iconSrc} width={iconSize} height={iconSize}/>
      {label}
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
        <ActionIconButton
          backgroundColor="#424242"
          iconSrc="/images/popup/x.png"
          iconSize={13}
          color="white"
          label="REJECT"
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
          <ActionIconButton
            backgroundColor="white"
            iconSrc="/images/popup/ArrowRight.png"
            iconSize={19}
            label={confirmText}
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
          <ActionIconButton
            backgroundColor="white"
            iconSrc="/images/popup/circleCheck.png"
            iconSize={19}
            label="SKIP"
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
    );
  }
  return null;
};
