/// Simulate request/reply manager for the content script and injected script.
import { v4 as uuidv4 } from 'uuid';
import { TransactionArgs, SimulationMethodType, Transaction } from '../../models/simulation/Transaction';


/**
 * Map request to replies.
 *
 * This is stored in memory, after the page shuts down this is gone.
 */
export class RequestManager {
  /**
   * Maps from a uuid to a resolver function which takes a response.
   */
  mappings: Map<string, (args: Response) => void> = new Map();

  constructor() {
    this.mappings = new Map();

    document.addEventListener(DISPATCH_RESPONSE, (event: any) => {
      this._handleResponse(JSON.parse(event.detail));
    });
  }

  /**
   * Add a request and store it in the request manager.
   */
  public request(
    args: { signer: string; chainId: string; method: SimulationMethodType | string } & (
      | {
        transaction: Transaction;
      }
      | {
        domain: any;
        message: any;
        primaryType: string;
      }
      | {
        hash: string;
      }
      | {
        signMessage: string;
      }
    )
  ): Promise<Response> {
    return new Promise((resolve) => {
      let request: TransactionArgs | undefined;
      const id = uuidv4();
      const chainId = args.chainId;
      const signer = args.signer;

      if ('transaction' in args) {
        request = {
          id,
          chainId,
          signer,
          origin,
          transaction: args.transaction,
          method: args.method,
        };
      } else if ('hash' in args) {
        request = {
          id,
          chainId,
          signer,
          origin,
          hash: args.hash,
          method: args.method,
        };
      } else if ('message' in args) {
        request = {
          id,
          chainId,
          signer,
          origin,
          domain: args.domain,
          message: args.message,
          primaryType: args.primaryType,
          method: args.method,
        };
      } else if ('signMessage' in args) {
        request = {
          id,
          chainId,
          signer,
          origin,
          signMessage: args.signMessage,
          method: args.method,
        };
      } else {
        console.warn('Unexpected Request', args);
      }

      if (request != undefined) {
        this.mappings.set(id, resolve);

        this._dispatchRequest(request);
      }
    });
  }

  /**
   * Dispatch a request.
   */
  private _dispatchRequest = (request: TransactionArgs) => {
    document.dispatchEvent(
      new CustomEvent(DISPATCH_REQUEST, {
        detail: request,
      })
    );
  };

  private _handleResponse = (response: ResponseWrapped) => {
    const resolver = this.mappings.get(response.id);
    if (!resolver) {
      // Could be a stale request or for another webpage.
      return;
    }

    // Unwrap the response, drop the id.
    resolver(response.type);

    // Remove it from the mapping.
    this.mappings.delete(response.id);
  };
}

/**
 * Dispatch from injected script to content script.
 */
const DISPATCH_REQUEST = 'WALLET_GUARD_DISPATCH_REQUEST';

/**
 * Listen to request
 */
export const listenToRequest = (callback: (request: TransactionArgs) => void) => {
  document.addEventListener(DISPATCH_REQUEST, async (event: any) => {
    callback(event.detail);
  });
};

/**
 * Response.
 */
export enum Response {
  Reject,
  Continue,
  Error,
}

/**
 * Response with id wrapped.
 */
interface ResponseWrapped {
  id: string;
  type: Response;
}

/**
 * Dispatch from content script to injected script
 */
const DISPATCH_RESPONSE = 'WALLET_GUARD_DISPATCH_RESPONSE';

export const dispatchResponse = (response: ResponseWrapped) => {
  document.dispatchEvent(
    new CustomEvent(DISPATCH_RESPONSE, {
      detail: JSON.stringify(response),
    })
  );
};
