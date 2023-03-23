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
  id: string;
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
  requestId: string;
  data: RequestArgs; // todo: extend this type when if/when we add more use cases to postMessage
};
