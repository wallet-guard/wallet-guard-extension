import Browser from 'webextension-polyfill';
import {
  PersonalSignArgs,
  SignatureHashSignArgs,
  SignatureRequestArgs,
  SimulateRequestArgs,
  Transaction,
  TransactionArgs,
  UnstandardizedSignatureRequestArgs,
} from '../models/simulation/Transaction';
import { uuid4 } from '@sentry/utils';
import { PortMessage, PortIdentifiers } from '../lib/helpers/chrome/messageHandler';
import { convertObjectValuesToString, shouldSwapPersonalSignArgs } from '../injected/injectWalletGuard';

const bypassed = true;
const bypassType = 'postMessage';

const sendMessageToPort = (stream: Browser.Runtime.Port, data: TransactionArgs): void => {
  const message: PortMessage = {
    data,
  };
  stream.postMessage(message);
};

// Bypass checks for MetaMask
window.addEventListener('message', (message) => {
  const { target } = message?.data ?? {};
  const { name, data } = message?.data?.data ?? {};
  const { href } = location;

  if (name !== PortIdentifiers.METAMASK_PROVIDER || !data) return;

  if (target === PortIdentifiers.METAMASK_CONTENT_SCRIPT) {
    if (data.method === 'eth_sendTransaction') {
      const transaction: Transaction = convertObjectValuesToString(data.params[0]);

      const request: SimulateRequestArgs = {
        id: uuid4(),
        chainId: '',
        signer: transaction.from,
        transaction,
        method: data.method,
        origin: href,
        bypassed,
        bypassType,
      };

      // Forward received messages to background.js
      const contentScriptPort = Browser.runtime.connect({ name: PortIdentifiers.WG_CONTENT_SCRIPT });
      sendMessageToPort(contentScriptPort, request);
    } else if (
      data.method === 'eth_signTypedData' ||
      data.method === 'eth_signTypedData_v1' ||
      data.method === 'eth_signTypedData_v3' ||
      data.method === 'eth_signTypedData_v4') {
      try {
        if (data.params.length < 2) {
          console.warn('Unexpected argument length.');
          return;
        }

        const params = JSON.parse(data.params[1]);
        let signer: string = params[0];

        if (!signer) {
          signer = data.params[0];
        }

        const domain = convertObjectValuesToString(params.domain);
        const message = convertObjectValuesToString(params.message);

        const request: SignatureRequestArgs = {
          id: uuid4(),
          chainId: '',
          signer,
          domain: domain,
          message: message,
          primaryType: params['primaryType'],
          method: data.method,
          origin: href,
          bypassed,
          bypassType,
        };

        // Forward received messages to background.js
        const contentScriptPort = Browser.runtime.connect({ name: PortIdentifiers.WG_CONTENT_SCRIPT });
        sendMessageToPort(contentScriptPort, request);
      } catch (e) {
        const request: UnstandardizedSignatureRequestArgs = {
          signer: 'unknown request type',
          params: data.params,
          id: uuid4(),
          chainId: '',
          method: data.method,
          origin: href,
          bypassed,
          bypassType,
        };

        // Forward received messages to background.js
        const contentScriptPort = Browser.runtime.connect({ name: PortIdentifiers.WG_CONTENT_SCRIPT });
        sendMessageToPort(contentScriptPort, request);
      }
    } else if (data.method === 'personal_sign') {
      if (data.params.length < 2) {
        console.warn('Unexpected argument length.');
        return;
      }

      let signer: string = data.params[1];
      let signMessage: string = data.params[0];

      if (shouldSwapPersonalSignArgs(signer, signMessage)) {
        const tempSigner = signer;
        signer = signMessage
        signMessage = tempSigner;
      }

      const request: PersonalSignArgs = {
        id: uuid4(),
        chainId: '',
        origin: href,
        method: data.method,
        signer,
        signMessage,
        bypassed,
        bypassType,
      };

      // Forward received messages to background.js
      const contentScriptPort = Browser.runtime.connect({ name: PortIdentifiers.WG_CONTENT_SCRIPT });
      sendMessageToPort(contentScriptPort, request);
    } else if (data.method === 'eth_sign') {
      if (data.params.length < 2) {
        console.warn('Unexpected argument length.');
        return;
      }

      const signer: string = data.params[0];
      const hash: string = data.params[1];

      const request: SignatureHashSignArgs = {
        id: uuid4(),
        chainId: '',
        origin: href,
        method: data.method,
        signer,
        hash,
        bypassed,
        bypassType,
      };

      // Forward received messages to background.js
      const contentScriptPort = Browser.runtime.connect({ name: PortIdentifiers.WG_CONTENT_SCRIPT });
      sendMessageToPort(contentScriptPort, request);
    }
  }
});
