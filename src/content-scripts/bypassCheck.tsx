import Browser from 'webextension-polyfill';
import objectHash from 'object-hash';
import { RequestManager } from '../lib/simulation/requests';

let metamaskChainId = 1;
const bypassed = true;

export interface MessageResponse {
  requestId: string;
  data: boolean;
}

export enum RequestType {
  TRANSACTION = 'transaction',
  TYPED_SIGNATURE = 'typed-signature',
  UNTYPED_SIGNATURE = 'untyped-signature',
}

export const Identifier = {
  INPAGE: 'revoke-inpage',
  CONTENT_SCRIPT: 'revoke-contentscript',
  CONFIRM: 'revoke-confirm',
  METAMASK_INPAGE: 'metamask-inpage',
  METAMASK_CONTENT_SCRIPT: 'metamask-contentscript',
  METAMASK_PROVIDER: 'metamask-provider',
  COINBASE_WALLET_REQUEST: 'extensionUIRequest',
};

const generateMessageId = (data: any) => {
  if (data.type === RequestType.TRANSACTION) return objectHash(data.transaction);
  if (data.type === RequestType.TYPED_SIGNATURE) return objectHash(data.typedData);
  if (data.type === RequestType.UNTYPED_SIGNATURE) return objectHash(data.message);
  return objectHash(data);
};

export const sendToPortAndDisregard = (stream: Browser.Runtime.Port, data: any): void => {
  const requestId = generateMessageId(data);
  stream.postMessage({ requestId, data });
};

// TODO: Support bypass checks for other wallets
const REQUEST_MANAGER = new RequestManager();

// Bypass checks for MetaMask
window.addEventListener('message', (message) => {
  const { target } = message?.data ?? {};
  const { name, data } = message?.data?.data ?? {};
  const { hostname } = location;
  const chainId = metamaskChainId;

  if (name !== Identifier.METAMASK_PROVIDER || !data) return;

  if (target === Identifier.METAMASK_CONTENT_SCRIPT) {
    if (data.method === 'eth_sendTransaction') {
      const [transaction] = data.params ?? [];
      const type = RequestType.TRANSACTION;

      // Forward received messages to background.js
      const extensionPort = Browser.runtime.connect({ name: Identifier.CONTENT_SCRIPT });
      sendToPortAndDisregard(extensionPort, { type, bypassed, hostname, transaction, chainId });
    } else if (data.method === 'eth_signTypedData_v3' || data.method === 'eth_signTypedData_v4') {
      const [address, typedDataStr] = data.params ?? [];
      const typedData = JSON.parse(typedDataStr);
      const type = RequestType.TYPED_SIGNATURE;

      // Forward received messages to background.js
      const extensionPort = Browser.runtime.connect({ name: Identifier.CONTENT_SCRIPT });
      sendToPortAndDisregard(extensionPort, { type, bypassed, hostname, address, typedData, chainId });
    } else if (data.method === 'eth_sign' || data.method === 'personal_sign') {
      // if the first parameter is the address, the second is the message, otherwise the first is the message
      const [first, second] = data.params ?? [];
      const message = String(first).replace(/0x/, '').length === 40 ? second : first;
      const type = RequestType.UNTYPED_SIGNATURE;

      // Forward received messages to background.js
      const extensionPort = Browser.runtime.connect({ name: Identifier.CONTENT_SCRIPT });
      sendToPortAndDisregard(extensionPort, { type, bypassed, message, hostname });
    }
  }

  if (target === Identifier.METAMASK_INPAGE && data?.method?.includes('chainChanged')) {
    metamaskChainId = Number(data?.params?.chainId ?? metamaskChainId);
  }
});
