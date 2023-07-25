import React from 'react';
import { SimulatedGas, SimulationStateChange } from '../../../models/simulation/Transaction';
import { StateChangesComponent } from './StateChangesComponent';
import styles from '../simulation.module.css';
import { PhishingResponse } from '../../../models/PhishingResponse';
import { Tooltip } from '@chakra-ui/react';

export interface ChangeTypeSectionProps {
  stateChanges?: SimulationStateChange[];
  title: string;
  scanResult: PhishingResponse;
  iconPath: string;
  gas?: SimulatedGas;
}

export const ChangeTypeSection = (props: ChangeTypeSectionProps) => {
  return (
    <>
      <div className="p-3 container">
        <div className="container">
          <div className="row mb-3 justify-content-between">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <img src={props.iconPath} style={{ height: '16px', marginRight: '5px' }} />
              <p className={styles['label-md']}>{props.title}</p>
            </div>
            {props.gas && (
              <Tooltip
                placement="top-start"
                hasArrow
                bg="#212121"
                color="white"
                borderRadius={'5px'}
                className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
                label="Gas is an estimated value"
              >
                <p className={styles['label-md']}>
                  Gas <span className={styles['text-sm']}>${Number(props.gas.fiatValue).toFixed(2)}</span>
                </p>
              </Tooltip>
            )}
          </div>
        </div>
        <div
          className="card"
          style={{
            width: '100%',
            backgroundColor: '#2b2b2b',
            borderRadius: '.5em',
            borderColor: '#515151',
          }}
        >
          <div className="card-body">
            {props.stateChanges && (
              <StateChangesComponent simulationStateChanges={props.stateChanges} scanResult={props.scanResult} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
