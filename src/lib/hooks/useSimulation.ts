import { useEffect, useState } from 'react';
import { StoredSimulation, StoredSimulationState } from '../simulation/storage';
import { RecommendedActionType, RiskFactor, Severity, SimulationWarningType, WarningType } from '../../models/simulation/Transaction';

export function useSimulation() {
  const [currentSimulation, setCurrentSimulation] = useState<StoredSimulation>();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    isLoading(true);
    chrome.storage.local
      .get('simulations')
      .then(({ simulations }) => updateSimulations(simulations))
      .catch((err) => {
        isLoading(false);
        console.log('unable to fetch simulations from popup', err);
      });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes['simulations']?.newValue) {
        const newSimulations = changes['simulations']?.newValue;
        updateSimulations(newSimulations);
      }
    });
  }, []);


  function updateSimulations(simulations: StoredSimulation[]) {
    const filteredSimulations = simulations?.filter(
      (simulation: StoredSimulation) =>
        simulation.state !== StoredSimulationState.Rejected && simulation.state !== StoredSimulationState.Confirmed
    );

    let current;

    if (filteredSimulations && filteredSimulations[0]) {
      current = filteredSimulations[0];
      setCurrentSimulation(current);
    } else {
      setCurrentSimulation(undefined);
    }

    if (current?.args?.bypassed) {
      if (current.state !== StoredSimulationState.Simulating && !current.simulation.error) {
        current.simulation.recommendedAction = RecommendedActionType.Warn;
        current.simulation.overviewMessage = current.simulation.overviewMessage ? 'We detected several risky indicator from this transaction.' : 'We detected 1 risky indicator from this transaction.'
        const existingRiskFactors = current.simulation.riskFactors || [];
        current.simulation.riskFactors = [
          ...existingRiskFactors,
          {
            type: WarningType.Bypass,
            message: 'This transaction attempted to bypass Wallet Guard',
            severity: Severity.High,
            value: 'If you continue seeing this, please open a support ticket.'
          } as RiskFactor
        ]
        setCurrentSimulation(current);
      }
    }

    isLoading(false);
  }

  return {
    currentSimulation,
    loading
  }
}
