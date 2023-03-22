import Browser from 'webextension-polyfill';
import objectHash from 'object-hash';
import { RequestArgs, Transaction } from '../models/simulation/Transaction';
import { uuid4 } from '@sentry/utils';
import { BrowserMessage, PortIdentifiers } from '../lib/helpers/chrome/messageHandler';

let metamaskChainId = 1;
const bypassed = true;

// TODO: Come back to this by matching these cases to the way we handle them below
const generateMessageId = (data: RequestArgs) => {
  // Transaction types
  if ('transaction' in data) return objectHash(data.transaction);
  // Signed signature types
  if ('hash' in data) return objectHash(data.hash);
  // Unsigned signature types
  if ('signMessage' in data) return objectHash(data.signMessage);
  return objectHash(data);
};

export const sendMessageToPort = (stream: Browser.Runtime.Port, data: RequestArgs): void => {
  const requestId = generateMessageId(data);
  const message: BrowserMessage = {
    requestId,
    data,
  };
  stream.postMessage(message);
};

// Bypass checks for MetaMask
window.addEventListener('message', (message) => {
  const { target } = message?.data ?? {};
  const { name, data } = message?.data?.data ?? {};
  const { hostname } = location;
  const chainId = metamaskChainId;

  if (name !== PortIdentifiers.METAMASK_PROVIDER || !data) return;

  if (target === PortIdentifiers.METAMASK_CONTENT_SCRIPT) {
    if (data.method === 'eth_sendTransaction') {
      const transaction: Transaction = data.params[0];
      const request: RequestArgs = {
        id: uuid4(),
        chainId: String(chainId),
        signer: transaction.from,
        transaction,
        method: data.method,
        origin: hostname,
        bypassed,
      };

      // Forward received messages to background.js
      const contentScriptPort = Browser.runtime.connect({ name: PortIdentifiers.WG_CONTENT_SCRIPT });
      sendMessageToPort(contentScriptPort, request);
    } else if (data.method === 'eth_signTypedData_v3' || data.method === 'eth_signTypedData_v4') {
      // const [address, typedDataStr] = data.params ?? [];
      // const typedData = JSON.parse(typedDataStr);
      // // Forward received messages to background.js
      // const contentScriptPort = Browser.runtime.connect({ name: PortIdentifiers.WG_CONTENT_SCRIPT });
      // sendMessageToPort(contentScriptPort, { type, bypassed, hostname, address, typedData, chainId });
    }
    //  else if (data.method === 'eth_sign' || data.method === 'personal_sign') {
    //   console.log(data);

    //   // if the first parameter is the address, the second is the message, otherwise the first is the message
    //   const [first, second] = data.params ?? [];
    //   const message = String(first).replace(/0x/, '').length === 40 ? second : first;
    //   const type = RequestType.UNTYPED_SIGNATURE;

    //   // Forward received messages to background.js
    //   const contentScriptPort = Browser.runtime.connect({ name: PortIdentifiers.WG_CONTENT_SCRIPT });
    //   sendMessageToPort(contentScriptPort, { type, bypassed, message, hostname });
    // }
  }

  if (target === PortIdentifiers.METAMASK_INPAGE && data?.method?.includes('chainChanged')) {
    metamaskChainId = Number(data?.params?.chainId ?? metamaskChainId);
  }
});
