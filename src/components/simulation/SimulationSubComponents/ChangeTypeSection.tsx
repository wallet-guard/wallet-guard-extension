import React from 'react';
import { SimulatedGas, StateChange } from '../../../models/simulation/Transaction';
import { StateChangesComponent } from './StateChangesComponent';
import { PhishingResponse } from '../../../models/PhishingResponse';
import { ChangeTypeHeading } from './stateChangeSubComponents/StateChangeTypeHeading';

export interface ChangeTypeSectionProps {
  stateChanges?: StateChange[];
  title: string;
  scanResult: PhishingResponse;
  iconPath: string;
  gas?: SimulatedGas;
}

export const ChangeTypeSection = (props: ChangeTypeSectionProps) => {
  return (
    <>
      <div className="px-3 pt-3">
        <ChangeTypeHeading title={props.title} iconPath={props.iconPath} gas={props.gas} />
        {props.stateChanges && (
          <StateChangesComponent simulationStateChanges={props.stateChanges} scanResult={props.scanResult} />
        )}
      </div>
    </>
  );
};
