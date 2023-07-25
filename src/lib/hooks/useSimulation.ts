import { useEffect, useState } from 'react';
import { StoredSimulation, StoredSimulationState } from '../simulation/storage';
import { SimulationWarningType } from '../../models/simulation/Transaction';

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
      if (current.simulation) {
        current.simulation.warningType = SimulationWarningType.Warn;
        current.simulation.message = [
          `This transaction attempted to bypass Wallet Guard's simulation. If you continue seeing this, please open a support ticket.`,
          ...(current.simulation.message || ''),
        ];
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
