import { TransactionArgs } from '../../../models/simulation/Transaction';
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
};

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
  data: TransactionArgs; // todo: extend this type when if/when we add more use cases to postMessage
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
  }
}
