import React from 'react';
import { SimulationStateChange } from '../../../models/simulation/Transaction';
import { StateChangesComponent } from './StateChangesComponent';
import styles from '../simulation.module.css';
import { RiskFactors } from './stateChangeSubComponents/RiskFactors';
import { PhishingResponse } from '../../../models/PhishingResponse';

export interface ChangeTypeSectionProps {
  stateChanges?: SimulationStateChange[];
  title: string;
  warnings?: any;
  scanResult: PhishingResponse;
}

export const ChangeTypeSection = (props: ChangeTypeSectionProps) => {
  return (
    <div>
      <div className="pl-3 pr-3 pt-3 pb-2 container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5
                className={`${styles['font-archivo-medium']} card-title pb-1`}
                style={{ color: '#a8a8a8', fontSize: '20px', marginTop: '-4px' }}
              >
                {props.title}
              </h5>
            </div>
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
            {props.warnings && <RiskFactors warnings={props.warnings} />}
            {props.stateChanges && (
              <StateChangesComponent simulationStateChanges={props.stateChanges} scanResult={props.scanResult} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
