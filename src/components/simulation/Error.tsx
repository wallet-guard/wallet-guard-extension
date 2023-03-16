import { posthog } from 'posthog-js';
import React from 'react';
import { StoredSimulation, StoredSimulationState } from '../../lib/simulation/storage';
import { ErrorType, SimulationWarningType } from '../../models/simulation/Transaction';
import { ConfirmSimulationButton } from './ConfirmSimulationButton';
import { SimulationHeader } from './SimulationHeader';
import { SimulationOverview } from './SimulationOverview';
import GeneralErrorComponent from './SimulationSubComponents/errors/GeneralError';
import InsufficientFundsComponent from './SimulationSubComponents/errors/InsufficientFundsError';
import RevertComponent from './SimulationSubComponents/errors/RevertError';
import UnauthorizedComponent from './SimulationSubComponents/errors/UnauthorizedError';

interface ErrorComponentProps {
  filteredSimulations: StoredSimulation[];
  type: ErrorType;
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  const { filteredSimulations, type } = props;

  posthog.capture('show simulation error', {
    filteredSimulations,
    type,
  });

  function getErrorComponent() {
    switch (type) {
      case ErrorType.Unauthorized:
        return <UnauthorizedComponent filteredSimulations={filteredSimulations} />;
      case ErrorType.InsufficientFunds:
        return <InsufficientFundsComponent filteredSimulations={filteredSimulations} />;
      case ErrorType.Revert:
        return <RevertComponent filteredSimulations={filteredSimulations} />;
      default:
        return <GeneralErrorComponent filteredSimulations={filteredSimulations} />;
    }
  }

  return (
    <div>
      <SimulationHeader />

      <div>
        {((filteredSimulations[0].state === StoredSimulationState.Success &&
          filteredSimulations[0].simulation?.warningType === SimulationWarningType.Warn) ||
          filteredSimulations[0].simulation?.warningType === SimulationWarningType.Info ||
          filteredSimulations[0].simulation?.error) && (
          <div>
            <SimulationOverview
              warningType={filteredSimulations[0].simulation?.warningType}
              message={filteredSimulations[0].simulation?.message}
              method={filteredSimulations[0].simulation.method}
            />
          </div>
        )}
      </div>

      <div className="row text-center" style={{ marginTop: '65px' }}>
        <div className="col-12">
          <img
            src="/images/popup/simulation_error.png"
            alt="A picture of a wallet UI with a red exclamation mark displayed in the center of the screen over an empty transaction screen representing an error"
            width={150}
          />
        </div>
      </div>

      {getErrorComponent()}

      <ConfirmSimulationButton storedSimulation={filteredSimulations && filteredSimulations[0]} />
    </div>
  );
};
