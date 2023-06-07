import { posthog } from 'posthog-js';
import React from 'react';
import { StoredSimulation, StoredSimulationState } from '../../lib/simulation/storage';
import { ErrorType, SimulationWarningType } from '../../models/simulation/Transaction';
import { ConfirmSimulationButton } from './ConfirmSimulationButton';
import { SimulationHeader } from './SimulationHeader';
import { SimulationOverview } from './SimulationOverview';
import { BypassedSimulationButton } from './SimulationSubComponents/BypassButton';
import GeneralErrorComponent from './SimulationSubComponents/errors/GeneralError';
import InsufficientFundsComponent from './SimulationSubComponents/errors/InsufficientFundsError';
import RevertComponent from './SimulationSubComponents/errors/RevertError';
import UnauthorizedComponent from './SimulationSubComponents/errors/UnauthorizedError';
import RateLimitedError from './SimulationSubComponents/errors/RateLimitedError';

interface ErrorComponentProps {
  currentSimulation: StoredSimulation;
  type: ErrorType;
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  const { currentSimulation, type } = props;

  posthog.capture('show simulation error', {
    currentSimulation,
    errorType: type,
  });

  function getErrorComponent() {
    switch (type) {
      case ErrorType.Unauthorized:
        return <UnauthorizedComponent currentSimulation={currentSimulation} />;
      case ErrorType.InsufficientFunds:
        return <InsufficientFundsComponent currentSimulation={currentSimulation} />;
      case ErrorType.Revert:
        return <RevertComponent currentSimulation={currentSimulation} />;
      case ErrorType.TooManyRequests:
        return <RateLimitedError currentSimulation={currentSimulation} />;
      default:
        return <GeneralErrorComponent currentSimulation={currentSimulation} />;
    }
  }

  return (
    <div>
      <SimulationHeader />

      <div>
        {((currentSimulation.state === StoredSimulationState.Success &&
          currentSimulation.simulation?.warningType === SimulationWarningType.Warn) ||
          currentSimulation.simulation?.warningType === SimulationWarningType.Info ||
          currentSimulation.simulation?.error) && (
          <div>
            <SimulationOverview
              warningType={currentSimulation.simulation.warningType}
              message={currentSimulation.simulation.message || []}
              method={currentSimulation.simulation.method}
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
      {currentSimulation.args?.bypassed ? (
        <BypassedSimulationButton storedSimulation={currentSimulation} />
      ) : (
        <ConfirmSimulationButton storedSimulation={currentSimulation && currentSimulation} />
      )}
    </div>
  );
};
