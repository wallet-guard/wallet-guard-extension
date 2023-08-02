import posthog from 'posthog-js';
import React, { useState } from 'react';
import {
  simulationNeedsAction,
  StoredSimulation,
  StoredSimulationState,
  updateSimulationAction,
} from '../../lib/simulation/storage';
import { RecommendedActionType, SimulationSuccessResponse } from '../../models/simulation/Transaction';
import styles from '../../styles/simulation/SimulationButton.module.css';

interface SimulationActionButton {
  color?: string;
  backgroundColor?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgWidth?: number;
  buttonText: string;
  onClick: () => void;
}

const SimulationActionButton: React.FC<SimulationActionButton> = ({
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
      {imgSrc && <img src={imgSrc} width={imgWidth} height={imgWidth} />}
      {buttonText}
    </button>
  );
};

interface ConfirmSimulationButtonProps {
  storedSimulation: StoredSimulation;
}

export const ConfirmSimulationButton: React.FC<ConfirmSimulationButtonProps> = ({ storedSimulation }) => {
  const [needsConfirm, setNeedsConfirm] = useState(true);
  const { id, signer, state } = storedSimulation;

  function handleProceedAnyway() {
    setNeedsConfirm(false);
  }

  if (simulationNeedsAction(state)) {
    return (
      <div className={`${styles['footer-container']}`}>
        <div className={styles['button-container']}>
          <div className="row">
            <div className="col-6" style={{ paddingRight: '7.5px' }}>
              <SimulationActionButton
                backgroundColor="#424242"
                imgSrc="/images/popup/x.png"
                imgWidth={13}
                color="white"
                buttonText="Reject"
                onClick={() => {
                  posthog.capture('simulation rejected', {
                    storedSimulation: storedSimulation,
                  });
                  updateSimulationAction(id, StoredSimulationState.Rejected);
                }}
              />
            </div>
            <div className="col-6" style={{ paddingLeft: '7.5px' }}>
              {!storedSimulation || storedSimulation.state === StoredSimulationState.Simulating ? (
                <SimulationActionButton
                  backgroundColor="white"
                  imgSrc="/images/popup/ArrowRight.png"
                  imgWidth={19}
                  buttonText="SKIP"
                  onClick={() => {
                    posthog.alias(signer);
                    posthog.capture('simulation skipped', {
                      storedSimulation: storedSimulation,
                    });
                    updateSimulationAction(id, StoredSimulationState.Confirmed);
                  }}
                />
              ) : !storedSimulation.simulation.error &&
                storedSimulation.simulation.recommendedAction === RecommendedActionType.Block &&
                needsConfirm ? (
                <SimulationActionButton
                  backgroundColor="rgb(211 211 211 / 8%)"
                  color="white"
                  buttonText="Proceed anyway"
                  onClick={() => {
                    posthog.capture('simulation proceed anyway', {
                      storedSimulation: storedSimulation,
                    });
                    handleProceedAnyway();
                  }}
                />
              ) : (
                <SimulationActionButton
                  backgroundColor={'white'}
                  imgSrc="/images/popup/ArrowRight.png"
                  imgWidth={19}
                  buttonText="Continue"
                  onClick={() => {
                    posthog.capture('simulation confirmed', {
                      storedSimulation: storedSimulation,
                    });
                    updateSimulationAction(id, StoredSimulationState.Confirmed);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
