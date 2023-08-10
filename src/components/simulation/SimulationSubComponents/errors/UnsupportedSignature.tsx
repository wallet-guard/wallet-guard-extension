import React, { useState } from 'react';
import styles from '../../simulation.module.css';
import { posthog } from 'posthog-js';
import { ErrorComponentProps } from './GeneralError';
import { SimulationHeader } from '../../SimulationHeader';
import { ConfirmSimulationButton } from '../../SimulationButton';
import { BypassedSimulationButton } from '../BypassButton';
import { PhishingResponse, PhishingResult } from '../../../../models/PhishingResponse';
import { Tooltip } from '@chakra-ui/react';

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
          <UnsupportedProjectComponent
            scanResult={currentSimulation.simulation?.scanResult}
            votedSuccessfullyCB={handleSubmission}
          />
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
  scanResult?: PhishingResponse;
  votedSuccessfullyCB: () => void;
}

function UnsupportedProjectComponent(props: UnsupportedProjectComponentProps) {
  const { scanResult, votedSuccessfullyCB } = props;

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
        <h4 className={`${styles['font-archivo-semibold']} pb-1`} style={{ color: 'white', marginBottom: '10px' }}>
          Unsupported Project
        </h4>
      </div>
      <div className="col-12" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <p
          className={`${styles['font-archivo-medium']}`}
          style={{
            color: 'white',
            fontSize: '16px',
            marginBottom: '10px',
          }}
        >
          Please make sure you trust this website before signing it.
        </p>

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
          <p className={`${styles['font-archivo-medium']}`} style={{ color: '#a8a8a8', marginRight: '5px' }}>
            Website:
          </p>
          <p className={`${styles['font-archivo-medium']}`} style={{ color: 'white' }}>
            <b>{scanResult?.domainName ? scanResult.domainName : 'n/a'}</b>
          </p>
          {scanResult?.domainName && scanResult.verified ? (
            <Tooltip
              hasArrow
              label="Verified by Wallet Guard"
              bg="#212121"
              color="white"
              placement="right"
              className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
              style={{ borderRadius: '2em' }}
            >
              <img
                src="/images/popup/green-verified.png"
                alt=""
                width={25}
                className="pl-2 "
                style={{ marginTop: '-15px', alignSelf: 'center' }}
              />
            </Tooltip>
          ) : scanResult?.domainName && scanResult.phishing === PhishingResult.Phishing ? (
            <Tooltip
              hasArrow
              label={'Low Trust Website'}
              bg="#212121"
              color="white"
              placement="right"
              className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
              style={{ borderRadius: '2em' }}
            >
              <img
                src="/images/popup/orange-danger.png"
                alt=""
                width={25}
                className="pl-2 "
                style={{ marginTop: '-15px', alignSelf: 'center' }}
              />
            </Tooltip>
          ) : (
            scanResult?.domainName && (
              <Tooltip
                hasArrow
                label="This is an unknown website"
                bg="#212121"
                color="white"
                placement="right"
                className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
                style={{ borderRadius: '2em' }}
              >
                <img
                  src="/images/popup/unknown.png"
                  alt=""
                  width={25}
                  className="pl-2 "
                  style={{ marginTop: '-15px', alignSelf: 'center' }}
                />
              </Tooltip>
            )
          )}
        </div>

        <p className={`${styles['font-archivo-medium']}`} style={{ color: '#a8a8a8', marginBottom: 0 }}>
          Do you want us to support this project?
        </p>

        <div
          onClick={votedSuccessfullyCB}
          className={styles.hover}
          style={{
            marginTop: '20px',
            background: '#1F1F1F',
            borderRadius: '8px',
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
          style={{ marginTop: '75px', marginBottom: '-60px', pointerEvents: 'none' }}
          src="/images/popup/green_check.png"
          alt="a green checkmark"
        />
      </div>

      <div className="col-12">
        <h4 className={`${styles['font-archivo-semibold']} pb-3`} style={{ color: 'white' }}>
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
