import { RequestArgs } from '../../../models/simulation/Transaction';

export enum BrowserMessageType {
  ProceedAnyway = 'proceedAnyway',
  RunSimulation = 'runSimulation',
  ApprovedTxn = 'approvedTxn',
}

export type ProceedAnywayMessageType = {
  url: string;
  permanent: boolean;
};

export type ApprovedTxnMessageType = {
  data: RequestArgs;
}

export type RunSimulationMessageType = {
  data: RequestArgs;
}

export type BrowserMessage = {
  type: BrowserMessageType;
} & (ProceedAnywayMessageType | ApprovedTxnMessageType | RunSimulationMessageType);

export const PortIdentifiers = {
  WG_CONTENT_SCRIPT: 'wg-contentscript',
  METAMASK_INPAGE: 'metamask-inpage',
  METAMASK_CONTENT_SCRIPT: 'metamask-contentscript',
  METAMASK_PROVIDER: 'metamask-provider',
};

export type PortMessage = {
  data: RequestArgs; // todo: extend this type when if/when we add more use cases to postMessage
};

export function findTransaction(approvedTxns: RequestArgs[], txn: RequestArgs) {
  if ('transaction' in txn) {
    return approvedTxns.find((x: any) => x.transaction.from === txn.transaction.from
      && x.transaction.to === txn.transaction.to
      && x.transaction.value === txn.transaction.value
      && x.transaction.data === txn.transaction.data);
  } else if ('message' in txn) {
    return approvedTxns.find((x: any) => x.message === txn.message);
  } else if ('signMessage' in txn) {
    return approvedTxns.find((x: any) => x.signMessage === txn.signMessage);
  } else if ('hash' in txn) {
    return approvedTxns.find((x: any) => x.hash === txn.hash);
  }
}