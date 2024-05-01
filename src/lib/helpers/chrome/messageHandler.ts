import { TransactionArgs } from '../../../models/simulation/Transaction';
import { ExtensionSettings, SimulationSettings } from '../../settings';
var equal = require('deep-equal');

export enum BrowserMessageType {
  ProceedAnyway = 'proceedAnyway',
  RunSimulation = 'runSimulation',
  ApprovedTxn = 'approvedTxn',
}

interface BaseBrowserMessage {
  type: BrowserMessageType;
}
export interface ProceedAnywayMessageType extends BaseBrowserMessage {
  url: string;
  permanent: boolean;
}

export interface ApprovedTxnMessageType extends BaseBrowserMessage {
  data: TransactionArgs;
}

export interface RunSimulationMessageType extends BaseBrowserMessage {
  data: TransactionArgs;
}

export type BrowserMessage = ProceedAnywayMessageType | ApprovedTxnMessageType | RunSimulationMessageType;

export const PortIdentifiers = {
  WG_CONTENT_SCRIPT: 'wg-contentscript',
  METAMASK_INPAGE: 'metamask-inpage',
  METAMASK_CONTENT_SCRIPT: 'metamask-contentscript',
  METAMASK_PROVIDER: 'metamask-provider',
};

export type PortMessage = {
  data: TransactionArgs; // extend this type when if/when we add more use cases to postMessage
};

export function findApprovedTransaction(approvedTxns: TransactionArgs[], txn: TransactionArgs) {
  if ('transaction' in txn) {
    return approvedTxns.find((x: any) => equal(x.transaction, txn.transaction));
  } else if ('message' in txn) {
    return approvedTxns.find((x: any) => equal(x.message, txn.message));
  } else if ('signMessage' in txn) {
    return approvedTxns.find((x: any) => x.signMessage === txn.signMessage);
  } else if ('hash' in txn) {
    return approvedTxns.find((x: any) => x.hash === txn.hash);
  } else if ('params' in txn) {
    return approvedTxns.find((x: any) => txn.signer === 'unknown request type');
  }
}

// DASHBOARD MESSAGE HANDLING

export enum DashboardMessageCommands {
  GetWalletVersions = 'GET_WALLET_VERSIONS',
  GetSettings = 'GET_SETTINGS',
  UpdateSettings = 'UPDATE_SETTINGS',
  GetAlertHistory = 'GET_ALERT_HISTORY',
  HasWalletGuardExtension = 'HAS_WALLET_GUARD_EXTENSION',
  ReadAllAlerts = 'READ_ALL_ALERTS',
  GetSimulationSettings = 'GET_SIMULATION_SETTINGS',
  UpdateSimulationSettings = 'UPDATE_SIMULATION_SETTINGS',
}

export interface DashboardMessageBody {
  type: DashboardMessageCommands;
  data?: unknown;
}

export function isValidExtensionSettings(obj: any): obj is ExtensionSettings {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.phishingDetection === 'boolean' &&
    typeof obj.simulationEnabled === 'boolean' &&
    typeof obj.maliciousExtensionDetection === 'boolean' &&
    typeof obj.approvalNotifications === 'boolean'
  );
}

export function isValidSimulationSettings(obj: any): obj is SimulationSettings {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.opensea === 'boolean' &&
    typeof obj.blur === 'boolean' &&
    typeof obj.uniswap === 'boolean' &&
    typeof obj.x2y2 === 'boolean' &&
    typeof obj.looksrare === 'boolean'
  );
}
