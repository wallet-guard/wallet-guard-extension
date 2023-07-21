import React, { useState } from 'react';
import styles from '../../simulation.module.css';
import { posthog } from 'posthog-js';
import { ErrorComponentProps } from './GeneralError';
import { SimulationHeader } from '../../SimulationHeader';
import { ConfirmSimulationButton } from '../../ConfirmSimulationButton';
import { BypassedSimulationButton } from '../BypassButton';

export default function UnsupportedSignatureComponent(props: ErrorComponentProps) {
  const { currentSimulation } = props;
  const [requestedProject, setRequestedProject] = useState(false);

  function handleSubmission() {
    posthog.capture('unsupported project request', {
      currentSimulation,
    });
    setRequestedProject(true);
  }

  return (
    <>
      <SimulationHeader />

      <div className="row text-center pl-4 pr-4" style={{ justifyContent: 'center' }}>
        {!requestedProject ? (
          <UnsupportedProjectComponent votedSuccessfullyCB={handleSubmission} />
        ) : (
          <VotedSuccessfullyComponent />
        )}
      </div>

      {currentSimulation.args?.bypassed ? (
        <BypassedSimulationButton storedSimulation={currentSimulation} />
      ) : (
        <ConfirmSimulationButton storedSimulation={currentSimulation && currentSimulation} />
      )}
    </>
  );
}

interface UnsupportedProjectComponentProps {
  votedSuccessfullyCB: () => void;
}

function UnsupportedProjectComponent(props: UnsupportedProjectComponentProps) {
  return (
    <>
      <div className="row text-center">
        <div className="col-12">
          <img
            style={{ marginBottom: '-100px', pointerEvents: 'none' }}
            src="/images/popup/shield_unknown.png"
            alt="a shield with a question mark in the middle"
          />
        </div>
      </div>

      <div className="col-12">
        <h4 className={`${styles['font-archivo-medium']} pb-3`} style={{ color: 'white', marginBottom: '20px' }}>
          Unsupported Project
        </h4>
      </div>
      <div className="col-12" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <p
          className={`${styles['font-archivo-medium']}`}
          style={{
            color: 'white',
            fontSize: '16px',
          }}
        >
          Please make sure you understand this signature before signing it.
        </p>

        <p className={`${styles['font-archivo-medium']}`} style={{ color: '#646464' }}>
          Do you want us to support this project?
        </p>

        <div
          onClick={props.votedSuccessfullyCB}
          className={styles.hover}
          style={{
            marginTop: '20px',
            background: '#1F1F1F',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'row',
            width: '150px',
            height: '50px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input type="checkbox" color="black" />
          <p
            className={`${styles['font-archivo-medium']}`}
            style={{
              color: 'white',
              fontSize: '16px',
              marginBottom: 0,
              marginLeft: '15px',
            }}
          >
            Yes please!
          </p>
        </div>
      </div>
    </>
  );
}

function VotedSuccessfullyComponent() {
  return (
    <>
      <div className="row text-center">
        <img
          style={{ marginTop: '75px', marginBottom: '-100px', pointerEvents: 'none' }}
          src="/images/popup/green_check.png"
          alt="a green checkmark"
        />
      </div>

      <div className="col-12">
        <h4 className={`${styles['font-archivo-medium']} pb-3`} style={{ color: 'white', marginBottom: '20px' }}>
          Your vote has been counted
        </h4>
      </div>
      <div className="col-12 text-center">
        <p
          className={`${styles['font-archivo-medium']}`}
          style={{
            color: '#646464',
            fontSize: '16px',
          }}
        >
          Thanks for your input!
        </p>
      </div>
    </>
  );
}
