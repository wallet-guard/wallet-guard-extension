// Storage wrapper for updating the storage.
import { fetchLockedAssets, fetchTransaction } from './server';
import { AssetsEqual, ErrorType, IsTransferChangeType, SimulationChangeType, SimulationResponse, SimulationSuccessResponse, SoftLockedAssetsResponse, TransactionArgs, TransactionType } from '../../models/simulation/Transaction';
import Browser from 'webextension-polyfill';
import { BrowserMessage, BrowserMessageType } from '../helpers/chrome/messageHandler';
import { SUPPORTED_CHAINS } from '../config/features';

export enum StoredSimulationState {
  // Currently in the process of simulating.
  Simulating = 'Simulating',

  // Successful simulation
  Success = 'Success',

  // User has rejected.
  Rejected = 'Reject',

  // User has requested we keep going. This could be confirming or skipping.
  Confirmed = 'Confirm',
}

type SimulationCompletionAction = StoredSimulationState.Confirmed | StoredSimulationState.Rejected;

export type StoredSimulation = LoadingSimulation | CompletedSimulation;

export interface LoadingSimulation {
  id: string;

  /// Signer who initiated this signature.
  signer: string;

  /// The state this simulation is in.
  state: StoredSimulationState.Simulating;

  // The params that were used to simulate this transaction.
  args: TransactionArgs;
}

export interface CompletedSimulation {
  id: string;

  /// Signer who initiated this signature.
  signer: string;

  /// The state this simulation is in.
  state: StoredSimulationState.Success | StoredSimulationState.Confirmed | StoredSimulationState.Rejected;

  // Set once no longer simulating
  simulation: SimulationResponse;

  // The params that were used to simulate this transaction.
  args: TransactionArgs;

  lockedAssets?: SoftLockedAssetsResponse;
}

// This is what we pass down to all simulation components
export type CompletedSuccessfulSimulation = CompletedSimulation & {
  simulation: SimulationSuccessResponse;
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

const completeSimulation = async (id: string, simulation: SimulationResponse, lockedAssetsResponse: SoftLockedAssetsResponse | null) => {
  const data = await chrome.storage.local.get('simulations');
  const simulations: CompletedSimulation[] = data.simulations || [];

  simulations.forEach((storedSimulation) => {
    if (storedSimulation.id === id) {
      let isMovingLockedAsset = false;

      // Check and flag any soft locked assets
      if (!simulation.error) {
        simulation.stateChanges?.forEach((stateChange, i) => {
          lockedAssetsResponse?.lockedAssets.forEach((asset) => {
            const isEqual = AssetsEqual(asset, stateChange);
            const isTransferChangeType = IsTransferChangeType(stateChange.changeType);

            if (isEqual && isTransferChangeType) {
              simulation.stateChanges![i].locked = true;
              isMovingLockedAsset = true;
            }
          });
        });
      }

      // Map the state to successful
      storedSimulation.state = StoredSimulationState.Success;
      storedSimulation.simulation = simulation;
      storedSimulation.lockedAssets = lockedAssetsResponse || undefined;
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

export const removeSimulation = async (id: string) => {
  const data = await chrome.storage.local.get('simulations');
  let simulations: StoredSimulation[] = data.simulations || [];

  simulations = simulations.filter((storedSimulation: StoredSimulation) => {
    return storedSimulation.id !== id;
  });

  return chrome.storage.local.set({ simulations });
};

export const updateSimulationAction = async (id: string, state: SimulationCompletionAction) => {
  const data = await chrome.storage.local.get('simulations');
  let simulations: StoredSimulation[] = data.simulations || [];

  const simulationToUpdate = simulations.find((x) => x.id === id);

  if (simulationToUpdate) {
    simulationToUpdate.state = state;
  }

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

export const fetchSimulationAndUpdate = async (args: TransactionArgs) => {
  let response: SimulationResponse;
  let softLockedAssetsCheck: SoftLockedAssetsResponse | null = null;
  let state = StoredSimulationState.Simulating;

  // Automatically skip if chain id is incorrect. This prevents the popup.
  if (!SUPPORTED_CHAINS.includes(args.chainId)) {
    state = StoredSimulationState.Confirmed;

    return addSimulation({
      id: args.id,
      signer: args.signer,
      args,
      state,
    } as StoredSimulation);
  }

  console.log('args', args);
  if ('transaction' in args) {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        state,
        args,
      }),
      fetchTransaction(args, TransactionType.Transaction),
      fetchLockedAssets(args.signer)
    ]);
    response = result[1];
    softLockedAssetsCheck = result[2];
  } else if ('hash' in args) {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        state,
        args,
      }),
      fetchTransaction(args, TransactionType.Signature),
      fetchLockedAssets(args.signer)
    ]);
    response = result[1];
    softLockedAssetsCheck = result[2];
  } else if ('signMessage' in args) {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        state,
        args,
      }),
      fetchTransaction(args, TransactionType.Signature),
      // do not fetch locked assets on personal_sign
    ]);
    response = result[1];
  } else {
    const result = await Promise.all([
      addSimulation({
        id: args.id,
        signer: args.signer,
        state,
        args,
      }),
      fetchTransaction(args, TransactionType.Signature),
      fetchLockedAssets(args.signer)
    ]);
    response = result[1];
    softLockedAssetsCheck = result[2];
  }

  return completeSimulation(args.id, response, softLockedAssetsCheck);
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
    state === StoredSimulationState.Simulating
  );
};
