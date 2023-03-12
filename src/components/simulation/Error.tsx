import React from 'react';
import { StoredSimulation } from '../../lib/simulation/storage';
import { ErrorType } from '../../models/simulation/Transaction';
import { ConfirmSimulationButton } from './ConfirmSimulationButton';
import { SimulationHeader } from './SimulationHeader';
import GeneralErrorComponent from './SimulationSubComponents/errors/GeneralError';
import InsufficientFundsComponent from './SimulationSubComponents/errors/InsufficientFundsError';

interface ErrorComponentProps {
  filteredSimulations: StoredSimulation[];
  type: ErrorType;
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  const { filteredSimulations, type } = props;

  return (
    <div>
      <SimulationHeader />
      <div className="row text-center" style={{ marginTop: '65px' }}>
        <div className="col-12">
          <img src="/images/popup/simulation_error.png" alt="error" width={150} />
        </div>
      </div>
      {type === ErrorType.InsufficientFunds && <InsufficientFundsComponent />}
      {type === ErrorType.MaxFeePerGasLessThanBlockBaseFee || (type === ErrorType.Revert && <GeneralErrorComponent />)}

      <ConfirmSimulationButton storedSimulation={filteredSimulations && filteredSimulations[0]} />
    </div>
  );
};
