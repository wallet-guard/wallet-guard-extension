import posthog from 'posthog-js';
import React from 'react';
import type { StoredSimulation } from '../../lib/simulation/storage';
import { simulationNeedsAction, StoredSimulationState, updateSimulationState } from '../../lib/simulation/storage';
import { SimulationMethodType, SimulationWarningType } from '../../models/simulation/Transaction';
import styles from '../../styles/simulation/ConfirmSimulationButton.module.css';

// export const ConfirmSimulationButton = ({
//   storedSimulation,
//   showChatWeb3,
//   setShowChatWeb3,
// }: {
//   storedSimulation: StoredSimulation;
//   showChatWeb3?: any;
//   setShowChatWeb3?: any;

interface SimulationActionButton {
  color?: string;
  backgroundColor?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgWidth: number;
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
      <img src={imgSrc} width={imgWidth} height={imgWidth} />
      {buttonText}
    </button>
  );
};

interface ConfirmSimulationButtonProps {
  storedSimulation: StoredSimulation;
  confirmText?: string;
  showChatWeb3?: any;
  setShowChatWeb3?: any;
}

export const ConfirmSimulationButton: React.FC<ConfirmSimulationButtonProps> = ({
  storedSimulation,
  confirmText = 'CONTINUE',
  showChatWeb3,
  setShowChatWeb3,
}) => {
  const { id, signer, state } = storedSimulation;

  if (simulationNeedsAction(state)) {
    return (
      // <div className={` ${styles['footer-container']} `}>
      //   <div className={` ${styles['center-button']}`}>
      //     <button
      //       className="mt-3 text-center"
      //       style={{
      //         textDecoration: 'underline',
      //         color: 'white',
      //         background: 'none',
      //         border: 'none',
      //         outline: 'none',
      //         cursor: 'pointer',
      //       }}
      //       onClick={() => {
      //         setShowChatWeb3(!showChatWeb3);
      //         posthog.capture('chatweb3 from tas clicked');
      //       }}
      //     >
      //       Ask our AI about this transaction
      //     </button>
      //   </div>

      //   <div className="row px-3 pt-3">
      //     <div className="col-6 text-center">
      //       <button
      //         className={`${styles['reject-button']} btn`}
      //         onClick={() => {
      //           posthog.capture('simulation rejected', {
      //             warningType: storedSimulation.simulation?.warningType,
      //             storedSimulation: storedSimulation,
      //           });
      //           updateSimulationState(id, StoredSimulationState.Rejected);
      //         }}
      //       >
      //         <img
      //           src="/images/popup/x.png"
      //           alt="An X icon in a circle, indicating cancel or close."
      //           width={19}
      //           className={`${styles['font-archivo-medium']} pr-2`}
      //           style={{ marginTop: '-3px' }}

      //   <div className={` ${styles['center-button']}`}>
      //   <button
      //     className="mt-3 text-center"
      //     style={{
      //       textDecoration: 'underline',
      //       color: 'white',
      //       background: 'none',
      //       border: 'none',
      //       outline: 'none',
      //       cursor: 'pointer',
      //     }}
      //     onClick={() => {
      //       setShowChatWeb3(!showChatWeb3);
      //       posthog.capture('chatweb3 from tas clicked');
      //     }}
      //   >
      //     Ask our AI about this transaction
      //   </button>
      // </div>

      <div className={`${styles['footer-container']}`}>
        <div style={{ display: 'flex' }}>
          <button
            className="mt-3 text-center"
            style={{
              textDecoration: 'underline',
              color: 'white',
              background: 'none',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
            }}
            onClick={() => {
              setShowChatWeb3(!showChatWeb3);
              posthog.capture('chatweb3 from tas clicked');
            }}
          >
            Ask our AI about this transaction
          </button>
        </div>

        <div className={styles['button-container']}>
          <div className="row">
            <div className="col-6" style={{ paddingRight: '7.5px' }}>
              <SimulationActionButton
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
            </div>
            <div className="col-6" style={{ paddingLeft: '7.5px' }}>
              {state === StoredSimulationState.Success ||
              state === StoredSimulationState.Revert ||
              state === StoredSimulationState.Error ? (
                <SimulationActionButton
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
                <SimulationActionButton
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
        </div>
      </div>
    );
  }
  return null;
};
