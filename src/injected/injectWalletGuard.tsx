import { ethErrors } from 'eth-rpc-errors';
import logger from '../lib/logger';
import { RequestManager, Response } from '../lib/simulation/requests';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// this function standardizes all values sent to the API into strings to prevent type errors
export function convertObjectValuesToString(inputObj: any): any {
  const keys = Object.keys(inputObj);
  const output: any = {};
  for (let x of keys) {
    if (typeof inputObj[x] === 'number' || typeof inputObj[x] === 'bigint') {
      output[x] = String(inputObj[x]);
    } else {
      output[x] = inputObj[x];
    }
  }

  return output;
}

const log = logger.child({ component: 'Injected' });

// Handling all the request communication.
const REQUEST_MANAGER = new RequestManager();

let timer: NodeJS.Timer | undefined = undefined;

// Injector taken heavily taken from Pocket Universe and Revoke Cash
// Shoutout to both for innovating on this <3
// https://github.com/RevokeCash/browser-extension
// https://github.com/jqphu/PocketUniverse
const addWalletGuardProxy = (provider: any) => {
  const sendHandler = {
    apply: (target: any, thisArg: any, args: any[]) => {
      const [payloadOrMethod, callbackOrParams] = args;

      // ethereum.send has three overloads:

      // ethereum.send(method: string, params?: Array<unknown>): Promise<JsonRpcResponse>;
      // > gets handled like ethereum.request
      if (typeof payloadOrMethod === 'string') {
        return provider.request({
          method: payloadOrMethod,
          params: callbackOrParams,
        });
      }

      // ethereum.send(payload: JsonRpcRequest): unknown;
      // > cannot contain signature requests
      if (!callbackOrParams) {
        return Reflect.apply(target, thisArg, args);
      }

      // ethereum.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
      // > gets handled like ethereum.sendAsync
      return provider.sendAsync(payloadOrMethod, callbackOrParams);
    },
  };

  const requestHandler = {
    apply: async (target: any, thisArg: any, args: any[]) => {
      const [request] = args;

      if (!request) {
        return Reflect.apply(target, thisArg, args);
      }

      if (
        request.method !== 'eth_signTypedData_v3' &&
        request.method !== 'eth_signTypedData_v4' &&
        request.method !== 'eth_sendTransaction' &&
        request.method !== 'eth_sign' &&
        request.method !== 'personal_sign'
      ) {
        return Reflect.apply(target, thisArg, args);
      }

      log.info({ args }, 'Request type');
      let response;

      if (request.method === 'eth_sendTransaction') {
        if (request.params.length !== 1) {
          // Forward the request anyway.
          log.warn('Unexpected argument length.');
          return Reflect.apply(target, thisArg, args);
        }

        log.info(request, 'Request being sent');

        // Sending response.
        response = await REQUEST_MANAGER.request({
          chainId: await provider.request({ method: 'eth_chainId' }),
          signer: request.params[0].from,
          transaction: request.params[0], // this is type safe
          method: request.method,
        });

        if (response === Response.Reject) {
          log.info('Reject');
          // Based on EIP-1103
          // eslint-disable-next-line no-throw-literal
          throw ethErrors.provider.userRejectedRequest('Wallet Guard Tx Signature: User denied transaction signature.');
        }
      } else if (request.method === 'eth_signTypedData_v3' || request.method === 'eth_signTypedData_v4') {
        if (request.params.length !== 2) {
          // Forward the request anyway.
          log.warn('Unexpected argument length.');
          return Reflect.apply(target, thisArg, args);
        }

        const params = JSON.parse(request.params[1]);
        log.info({ params }, 'Request being sent');

        let signer: string = params[0];

        if (!signer) {
          signer = request.params[0];
        }

        const domain = convertObjectValuesToString(params.domain);
        const message = convertObjectValuesToString(params.message);

        // Sending response.
        response = await REQUEST_MANAGER.request({
          chainId: await provider.request({ method: 'eth_chainId' }),
          signer: signer,
          domain: domain,
          message: message,
          primaryType: params['primaryType'],
          method: request.method,
        });

        if (response === Response.Reject) {
          log.info('Reject');
          // NOTE: Be cautious when changing this name. 1inch behaves strangely when the error message diverges.
          throw ethErrors.provider.userRejectedRequest(
            'Wallet Guard Message Signature: User denied message signature.'
          );
        }
      } else if (request.method === 'eth_sign') {
        log.info('EthSign Request');
        if (request.params.length !== 2) {
          // Forward the request anyway.
          log.warn('Unexpected argument length.');
          return Reflect.apply(target, thisArg, args);
        }

        // Sending response.
        response = await REQUEST_MANAGER.request({
          chainId: await provider.request({ method: 'eth_chainId' }),
          signer: request.params[0],
          hash: request.params[1],
          method: request.method,
        });

        if (response === Response.Reject) {
          log.info('Reject');
          // NOTE: Be cautious when changing this name. 1inch behaves strangely when the error message diverges.
          throw ethErrors.provider.userRejectedRequest(
            'Wallet Guard Message Signature: User denied message signature.'
          );
        }
      } else if (request.method === 'personal_sign') {
        if (request.params.length < 2) {
          // Forward the request anyway.
          log.warn('Unexpected argument length.');
          return Reflect.apply(target, thisArg, args);
        }

        const signer: string = request.params[1];
        const signMessage: string = request.params[0];

        // Sending response.
        response = await REQUEST_MANAGER.request({
          chainId: await provider.request({ method: 'eth_chainId' }),
          signer,
          signMessage,
          method: request.method,
        });

        if (response === Response.Reject) {
          log.info('Reject');
          // NOTE: Be cautious when changing this name. 1inch behaves strangely when the error message diverges.
          throw ethErrors.provider.userRejectedRequest(
            'Wallet Guard Message Signature: User denied message signature.'
          );
        }
      } else {
        throw new Error('Show never reach here');
      }

      // For error, we just continue, to make sure we don't block the user!
      // we should also implement auto continue on errors (server response isn't mapped properly)
      if (response === Response.Continue || response === Response.Error) {
        return Reflect.apply(target, thisArg, args);
      }
    },
  };

  const sendAsyncHandler = {
    apply: async (target: any, thisArg: any, args: any[]) => {
      const [request, callback] = args;
      if (!request) {
        return Reflect.apply(target, thisArg, args);
      }

      if (
        request.method !== 'eth_signTypedData_v3' &&
        request.method !== 'eth_signTypedData_v4' &&
        request.method !== 'eth_sendTransaction' &&
        request.method !== 'eth_sign' &&
        request.method !== 'personal_sign'
      ) {
        return Reflect.apply(target, thisArg, args);
      }

      if (request.method === 'eth_sendTransaction') {
        if (request.params.length !== 1) {
          // Forward the request anyway.
          log.warn('Unexpected argument length.');
          return Reflect.apply(target, thisArg, args);
        }

        log.info(request, 'Request being sent');
        provider
          .request({ method: 'eth_chainId' })
          .then((chainId: any) => {
            return REQUEST_MANAGER.request({
              chainId,
              signer: request.params[0].from,
              transaction: request.params[0], // this is type safe
              method: request.method,
            });
          })
          .then((response: any) => {
            if (response === Response.Reject) {
              log.info('Reject');
              // Based on EIP-1103
              // eslint-disable-next-line no-throw-literal
              const error = ethErrors.provider.userRejectedRequest(
                'Wallet Guard Tx Signature: User denied transaction signature.'
              );
              const response = {
                id: request?.id,
                jsonrpc: '2.0',
                error,
              };
              callback(error, response);
              // For error, we just continue, to make sure we don't block the user!
            } else if (response === Response.Continue || response === Response.Error) {
              log.info(response, 'Continue | Error');
              return Reflect.apply(target, thisArg, args);
            }
          });
      } else if (request.method === 'eth_signTypedData_v3' || request.method === 'eth_signTypedData_v4') {
        if (request.params.length !== 2) {
          // Forward the request anyway.
          log.warn('Unexpected argument length.');
          return Reflect.apply(target, thisArg, args);
        }

        const params = JSON.parse(request.params[1]);
        log.info({ params }, 'Request being sent');

        let signer: string = params[0];

        if (!signer) {
          signer = request.params[0];
        }

        const domain = convertObjectValuesToString(params.domain);
        const message = convertObjectValuesToString(params.message);

        provider
          .request({ method: 'eth_chainId' })
          .then((chainId: any) => {
            return REQUEST_MANAGER.request({
              chainId,
              signer: signer,
              domain: domain,
              message: message,
              primaryType: params['primaryType'],
              method: request.method,
            });
          })
          .then((response: any) => {
            if (response === Response.Reject) {
              log.info('Reject');
              // Based on EIP-1103
              // eslint-disable-next-line no-throw-literal
              const error = ethErrors.provider.userRejectedRequest(
                'Wallet Guard Message Signature: User denied message signature.'
              );
              const response = {
                id: request?.id,
                jsonrpc: '2.0',
                error,
              };
              callback(error, response);
              // For error, we just continue, to make sure we don't block the user!
            } else if (response === Response.Continue || response === Response.Error) {
              return Reflect.apply(target, thisArg, args);
            }
          });
      } else if (request.method === 'eth_sign') {
        log.info('EthSign Request');
        if (request.params.length !== 2) {
          // Forward the request anyway.
          log.warn('Unexpected argument length.');
          return Reflect.apply(target, thisArg, args);
        }

        const signer: string = request.params[0];
        const hash: string = request.params[1];

        provider
          .request({ method: 'eth_chainId' })
          .then((chainId: any) => {
            return REQUEST_MANAGER.request({
              chainId,
              signer,
              hash,
              method: request.method,
            });
          })
          .then((response: any) => {
            if (response === Response.Reject) {
              log.info('Reject');
              // Based on EIP-1103
              // eslint-disable-next-line no-throw-literal
              const error = ethErrors.provider.userRejectedRequest(
                'Wallet Guard Message Signature: User denied message signature.'
              );
              const response = {
                id: request?.id,
                jsonrpc: '2.0',
                error,
              };
              callback(error, response);
              // For error, we just continue, to make sure we don't block the user!
            } else if (response === Response.Continue || response === Response.Error) {
              log.info(response, 'Continue | Error');
              return Reflect.apply(target, thisArg, args);
            }
          });
      } else if (request.method === 'personal_sign') {
        log.info('Presonal Sign Request');
        if (request.params.length === 0) {
          // Forward the request anyway.
          log.warn('Unexpected argument length.');
          return Reflect.apply(target, thisArg, args);
        }

        const signer: string = request.params[1];
        const signMessage: string = request.params[0];

        provider
          .request({ method: 'eth_chainId' })
          .then((chainId: any) => {
            return REQUEST_MANAGER.request({
              chainId,
              signer,
              signMessage,
              method: request.method,
            });
          })
          .then((response: any) => {
            if (response === Response.Reject) {
              log.info('Reject');
              // Based on EIP-1103
              // eslint-disable-next-line no-throw-literal
              const error = ethErrors.provider.userRejectedRequest(
                'Wallet Guard Message Signature: User denied message signature.'
              );
              const response = {
                id: request?.id,
                jsonrpc: '2.0',
                error,
              };
              callback(error, response);
              // For error, we just continue, to make sure we don't block the user!
            } else if (response === Response.Continue || response === Response.Error) {
              return Reflect.apply(target, thisArg, args);
            }
          });
      }
    },
  };

  // if provider and wallet guard is not in provider
  if (provider && !provider?.isWalletGuard) {
    try {
      Object.defineProperty(provider, 'request', {
        value: new Proxy(provider.request, requestHandler),
      });
      Object.defineProperty(provider, 'send', {
        value: new Proxy(provider.send, sendHandler),
      });
      Object.defineProperty(provider, 'sendAsync', {
        value: new Proxy(provider.sendAsync, sendAsyncHandler),
      });
      provider.isWalletGuard = true;
      console.log('Wallet Guard is running!');
    } catch (error) {
      // If we can't add ourselves to this provider, don't mess with other providers.
      log.warn({ provider, error }, 'Could not attach to provider');
      console.log('Wallet Guard could not start!');
    }
  }
};

// if window.ethereum is there and proxy is not already initizlised
// inject proxy too window.ethereum

// if there are new providers add proxy to all providers

const addProxy = () => {
  // Protect against double initialization.
  if (window.ethereum && !window.ethereum?.isWalletGuard) {
    addWalletGuardProxy(window.ethereum);

    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach(addWalletGuardProxy);
    }
  }
};

// If we detect window.ethereum
// Add proxy ( proxy server is a server application that acts as an intermediary between a client requesting a
// resource and the server providing that resource.)
// if we do not detect window.ethereum
// add an event listener to window to add proxy when ethereum is initalized
if (window.ethereum) {
  addProxy();
} else {
  window.addEventListener('ethereum#initialized', addProxy);
}

timer = setInterval(addProxy, 100);

setTimeout(() => {
  window.removeEventListener('ethereum#initialized', addProxy);
  clearTimeout(timer);
}, 5000);
