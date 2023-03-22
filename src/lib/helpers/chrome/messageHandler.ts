import { RequestArgs } from '../../../models/simulation/Transaction';

export enum MessageType {
  ProceedAnyway = 'proceedAnyway',
  RunSimulation = 'runSimulation',
}

export const PortIdentifiers = {
  WG_CONTENT_SCRIPT: 'wg-contentscript',
  METAMASK_INPAGE: 'metamask-inpage',
  METAMASK_CONTENT_SCRIPT: 'metamask-contentscript',
  METAMASK_PROVIDER: 'metamask-provider',
};

export type BrowserMessage = {
  requestId: string;
  data: RequestArgs; // todo: extend this type when if/when we add more use cases to postMessage
};
