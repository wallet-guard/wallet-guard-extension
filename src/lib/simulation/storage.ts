// Storage wrapper for updating the storage.
import logger from '../logger';
import { fetchSimulate, fetchSignature } from './server';
import type { RequestArgs, SimulationResponse } from '../../models/simulation/Transaction';
import { Response, ResponseType } from '../../models/simulation/Transaction';

const log = logger.child({ component: 'Storage' });

export enum StoredSimulationState {
  // Currently in the process of simulating.
  Simulating = 'Simulating',

  // Reverted or invalid signature processing.
  Revert = 'Revert',

  // Error
  Error = 'Error',

  // Successful simulation
  Success = 'Success',

  // User has rejected.
  Rejected = 'Reject',

  // User has requested we keep going. This could be confirming or skipping.
  Confirmed = 'Confirm',
}

export enum StoredType {
  Simulation,
  Signature,
  SignatureHash,
  PersonalSign,
}

export interface StoredSimulation {
  id: string;

  /// Signer who initiated this signature.
  signer: string;

  /// Type of request.
  type: StoredType;

  /// The state this simulation is in.
  state: StoredSimulationState;

  /// Simulation set on success.
  simulation?: SimulationResponse;

  /// Optional error message on Error
  error?: string;
}

// Thank you Pocket Universe for leading the way in proxying transactions
// https://github.com/jqphu/PocketUniverse
export const addSimulation = async (simulation: StoredSimulation) => {
  const { simulations = [] } = await chrome.storage.local.get('simulations');

  // Add new simulation to the front.
  simulations.push({ ...simulation });

  return chrome.storage.local.set({ simulations });
};

const completeSimulation = async (id: string, simulation: SimulationResponse) => {
  const { simulations = [] } = await chrome.storage.local.get('simulations');

  simulations.forEach((storedSimulation: StoredSimulation) => {
    if (storedSimulation.id === id) {
      log.debug('Simulation found id', id);
      storedSimulation.state = StoredSimulationState.Success;
      storedSimulation.simulation = simulation;
    }
  });

  return chrome.storage.local.set({ simulations });
};

// Skip the popup, this is used for incorrect chain id.
export const skipSimulation = async (id: string) => {
  const { simulations = [] } = await chrome.storage.local.get('simulations');

  simulations.forEach((storedSimulation: StoredSimulation) => {
    if (storedSimulation.id === id) {
      log.debug('Simulation found id', id);
      storedSimulation.state = StoredSimulationState.Confirmed;
    }
  });

  return chrome.storage.local.set({ simulations });
};

const revertSimulation = async (id: string, error?: string) => {
  const { simulations = [] } = await chrome.storage.local.get('simulations');

  simulations.forEach((storedSimulation: StoredSimulation) => {
    if (storedSimulation.id === id) {
      log.debug('Simulation found id', id);
      storedSimulation.state = StoredSimulationState.Revert;
      storedSimulation.error = error;
    }
  });

  return chrome.storage.local.set({ simulations });
};

export const removeSimulation = async (id: string) => {
  let { simulations = [] } = await chrome.storage.local.get('simulations');

  simulations = simulations.filter((storedSimulation: StoredSimulation) => {
    return storedSimulation.id !== id;
  });

  return chrome.storage.local.set({ simulations });
};

export const updateSimulationState = async (id: string, state: StoredSimulationState) => {
  let { simulations = [] } = await chrome.storage.local.get('simulations');

  simulations = simulations.map((x: StoredSimulation) =>
    x.id === id
      ? {
          ...x,
          state,
        }
      : x
  );

  return chrome.storage.local.set({ simulations });
};

// TODO(jqphu): dedup with above...
const updateSimulatioWithErrorMsg = async (id: string, error?: string) => {
  let { simulations = [] } = await chrome.storage.local.get('simulations');

  simulations = simulations.map((x: StoredSimulation) =>
    x.id === id
      ? {
          ...x,
          error,
          state: StoredSimulationState.Error,
        }
      : x
  );

  return chrome.storage.local.set({ simulations });
};

export const fetchSimulationAndUpdate = async (args: RequestArgs) => {
  let response: Response;

  let state = StoredSimulationState.Simulating;
  if (args.chainId !== '0x1' && args.chainId !== '1') {
    // Automatically confirm if chain id is incorrect. This prevents the popup.
    state = StoredSimulationState.Confirmed;
  }

  if ('transaction' in args) {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        type: StoredType.Simulation,
        state,
      }),
      fetchSimulate(args),
    ]);
    response = result[1];
  } else if ('hash' in args) {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        type: StoredType.SignatureHash,
        state,
      }),
      fetchSignature(args),
    ]);
    response = result[1];
  } else if ('signMessage' in args) {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        type: StoredType.PersonalSign,
        state,
      }),
      fetchSignature(args),
    ]);
    response = result[1];
  } else {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        type: StoredType.Signature,
        state,
      }),
      fetchSignature(args),
    ]);
    response = result[1];
  }

  if (response.type === ResponseType.Error) {
    if (response?.error === 'invalid chain id') {
      // This will likely be a no-op but we want to handle it anyway.
      return skipSimulation(args.id);
    } else {
      return updateSimulatioWithErrorMsg(args.id, response.error);
    }
  }
  if (response.type === ResponseType.Revert) {
    return revertSimulation(args.id, response.error);
  }
  if (response.type === ResponseType.Success) {
    if (!response.simulation) {
      throw new Error('Invalid state');
    }
    return completeSimulation(args.id, response.simulation);
  }
};

export const clearOldSimulations = async () => {
  let { simulations = [] } = await chrome.storage.local.get('simulations');

  // Remove confirmed/rejected simulations.
  simulations = simulations.filter(
    (x: StoredSimulation) => x.state !== StoredSimulationState.Rejected && x.state !== StoredSimulationState.Confirmed
  );

  return chrome.storage.local.set({ simulations });
};

export const simulationNeedsAction = (state: StoredSimulationState): boolean => {
  return (
    state === StoredSimulationState.Success ||
    state === StoredSimulationState.Error ||
    state === StoredSimulationState.Simulating ||
    state === StoredSimulationState.Revert
  );
};
