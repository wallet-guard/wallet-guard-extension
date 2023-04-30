// Storage wrapper for updating the storage.
import { fetchSimulate, fetchSignature } from './server';
import { SimulationError, SimulationResponse, TransactionArgs } from '../../models/simulation/Transaction';
import { Response, ResponseType } from '../../models/simulation/Transaction';
import Browser from 'webextension-polyfill';
import { BrowserMessage, BrowserMessageType } from '../helpers/chrome/messageHandler';
import { SUPPORTED_CHAINS } from '../config/features';

export enum StoredSimulationState {
  // Currently in the process of simulating.
  Simulating = 'Simulating',

  // Reverted or invalid signature processing.
  Revert = 'Revert',

  // Error
  Error = 'Error',

  InsufficientFunds = 'InsufficientFunds',

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

  // The params that were used to simulate this transaction.
  args: TransactionArgs;

  /// Optional error message on Error
  error?: SimulationError;
}

// Thank you Pocket Universe for leading the way in proxying transactions
// https://github.com/jqphu/PocketUniverse
export const addSimulation = async (simulation: StoredSimulation) => {
  const data = await chrome.storage.local.get('simulations');
  const simulations: StoredSimulation[] = data.simulations || [];

  // Add new simulation to the front.
  simulations.push({ ...simulation });

  return chrome.storage.local.set({ simulations });
};

const completeSimulation = async (id: string, simulation: SimulationResponse) => {
  const data = await chrome.storage.local.get('simulations');
  const simulations: StoredSimulation[] = data.simulations || [];

  simulations.forEach((storedSimulation: StoredSimulation) => {
    if (storedSimulation.id === id) {
      storedSimulation.state = StoredSimulationState.Success;
      storedSimulation.simulation = simulation;
    }
  });

  return await chrome.storage.local.set({ simulations });
};

// Skip the popup, this is used for incorrect chain id.
export const skipSimulation = async (id: string) => {
  const data = await chrome.storage.local.get('simulations');
  const simulations: StoredSimulation[] = data.simulations || [];

  simulations.forEach((storedSimulation: StoredSimulation) => {
    if (storedSimulation.id === id) {
      storedSimulation.state = StoredSimulationState.Confirmed;
    }
  });

  return chrome.storage.local.set({ simulations });
};

const revertSimulation = async (id: string, error?: SimulationError) => {
  const data = await chrome.storage.local.get('simulations');
  const simulations: StoredSimulation[] = data.simulations || [];

  simulations.forEach((storedSimulation: StoredSimulation) => {
    if (storedSimulation.id === id) {
      storedSimulation.state = StoredSimulationState.Revert;
      storedSimulation.error = error;
    }
  });

  return chrome.storage.local.set({ simulations });
};

export const removeSimulation = async (id: string) => {
  const data = await chrome.storage.local.get('simulations');
  let simulations: StoredSimulation[] = data.simulations || [];

  simulations = simulations.filter((storedSimulation: StoredSimulation) => {
    return storedSimulation.id !== id;
  });

  return chrome.storage.local.set({ simulations });
};

export const updateSimulationState = async (id: string, state: StoredSimulationState) => {
  const data = await chrome.storage.local.get('simulations');
  let simulations: StoredSimulation[] = data.simulations || [];

  simulations = simulations.map((x: StoredSimulation) =>
    x.id === id
      ? {
        ...x,
        state,
      }
      : x
  );

  if (simulations && simulations.length > 0 && !simulations[0].args?.bypassed && state === StoredSimulationState.Confirmed) {
    const currentSimulation: StoredSimulation = simulations[0] || [];

    const message: BrowserMessage = {
      type: BrowserMessageType.ApprovedTxn,
      data: currentSimulation.args,
    };

    await Browser.runtime.sendMessage(undefined, message);
  }

  return await chrome.storage.local.set({ simulations });
};

const updateSimulatioWithErrorMsg = async (id: string, error?: SimulationError) => {
  const data = await chrome.storage.local.get('simulations');
  let simulations: StoredSimulation[] = data.simulations || [];

  simulations = simulations.map((x: StoredSimulation) =>
    x.id === id
      ? {
        ...x,
        error,
        state: StoredSimulationState.Error,
      }
      : x
  );

  return await chrome.storage.local.set({ simulations });
};

export const fetchSimulationAndUpdate = async (args: TransactionArgs) => {
  let response: Response;

  let state = StoredSimulationState.Simulating;
  if (!SUPPORTED_CHAINS.includes(args.chainId)) {
    // Automatically confirm if chain id is incorrect. This prevents the popup.
    state = StoredSimulationState.Confirmed;

    return addSimulation({
      id: args.id,
      signer: args.signer,
      type: StoredType.Simulation,
      args,
      state,
    });
  }

  console.log('args', args);
  if ('transaction' in args) {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        type: StoredType.Simulation,
        state,
        args,
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
        args,
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
        args,
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
        args,
      }),
      fetchSignature(args),
    ]);
    response = result[1];
  }

  // Just in case the bypass check triggers, skip the simulation on verified websites
  if (response.simulation?.scanResult.verified && args.bypassed) {
    return skipSimulation(args.id);
  }

  if (response.type === ResponseType.Error) {
    if (response?.error?.message === 'invalid chain id') {
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
