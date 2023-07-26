import React from 'react';
import { SimulatedGas, SimulationStateChange } from '../../../models/simulation/Transaction';
import { StateChangesComponent } from './StateChangesComponent';
import { PhishingResponse } from '../../../models/PhishingResponse';
import { ChangeTypeHeading } from './stateChangeSubComponents/StateChangeTypeHeading';

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
      <div className="p-3">
        <ChangeTypeHeading title={props.title} iconPath={props.iconPath} gas={props.gas} />
        {props.stateChanges && (
          <StateChangesComponent simulationStateChanges={props.stateChanges} scanResult={props.scanResult} />
        )}
      </div>
    </>
  );
};
