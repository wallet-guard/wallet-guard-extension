import { ErrorType, SimulationErrorResponse, SimulationResponse, TransactionArgs } from '../../models/simulation/Transaction';
import { Response, ResponseType } from '../../models/simulation/Transaction';
import { SERVER_URL_PROD } from '../environment';

// TODO: add unit tests for these 2 functions
export const fetchSimulate = async (args: TransactionArgs): Promise<Response> => {
  try {
    const simulationURL = getSimulationEndpoint(args.chainId);

    const result: globalThis.Response = await fetch(simulationURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    if (result.status === 200) {
      const data: SimulationResponse = await result.json();

      if (data.error?.type === ErrorType.Revert) {
        return {
          type: ResponseType.Revert,
          error: data.error,
        }
      }

      return {
        type: ResponseType.Success,
        simulation: data,
      };
    }

    if (result.status === 403) {
      return {
        type: ResponseType.Error,
        error: {
          type: ErrorType.Unauthorized,
          message: "Unauthorized",
          extraData: null
        }
      };
    } else if (result.status === 429) {
      return {
        type: ResponseType.Error,
        error: {
          type: ErrorType.TooManyRequests,
          message: "TooManyRequests",
          extraData: null
        }
      }
    }

    const data: SimulationErrorResponse = await result.json();
    return { type: ResponseType.Error, error: data.error };
  } catch (e: any) {
    // if data.error is undefined it is most likely a network error
    console.log('ERROR: ', e);
    return {
      error: {
        type: ErrorType.UnknownError,
        message: 'An unknown error occurred',
        extraData: e
      },
      type: ResponseType.Error
    };
  }
};

export const fetchSignature = async (
  args: TransactionArgs
): Promise<Response> => {
  try {
    const signatureURL = getSignatureEndpoint(args.chainId);

    const result: globalThis.Response = await fetch(signatureURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    if (result.status === 200) {
      const data: SimulationResponse = await result.json();

      if (data.error?.type === ErrorType.Revert) {
        return {
          type: ResponseType.Revert,
          error: data.error,
        }
      }

      return {
        type: ResponseType.Success,
        simulation: data,
      };
    }

    if (result.status === 403) {
      return {
        type: ResponseType.Error,
        error: {
          type: ErrorType.Unauthorized,
          message: "Unauthorized",
          extraData: null
        }
      };
    } else if (result.status === 429) {
      return {
        type: ResponseType.Error,
        error: {
          type: ErrorType.TooManyRequests,
          message: "TooManyRequests",
          extraData: null
        }
      }
    }

    const data: SimulationErrorResponse = await result.json();
    return { type: ResponseType.Error, error: data.error };
  } catch (e: any) {
    // if data.error is undefined it is most likely a network error
    console.log('ERROR: ', e);
    return {
      error: {
        type: ErrorType.UnknownError,
        message: 'An unknown error occurred',
        extraData: e
      },
      type: ResponseType.Error
    };
  }
};

export function getSimulationEndpoint(chainId: string): string {
  switch (chainId.toLowerCase()) {
    case '0x1':
    case '1':
      return `${SERVER_URL_PROD}/eth/mainnet/transaction`;
    case "0xa4b1":
    case '42161':
      return `${SERVER_URL_PROD}/arb/mainnet/transaction`;
    case '0x89':
    case '137':
      return `${SERVER_URL_PROD}/polygon/mainnet/transaction`;
    default:
      return `${SERVER_URL_PROD}/eth/mainnet/transaction`;
  }
}

export function getSignatureEndpoint(chainId: string): string {
  switch (chainId.toLowerCase()) {
    case '0x1':
    case '1':
      return `${SERVER_URL_PROD}/eth/mainnet/signature`;
    case '0xa4b1':
    case '42161':
      return `${SERVER_URL_PROD}/arb/mainnet/signature`;
    case '0x89':
    case '137':
      return `${SERVER_URL_PROD}/polygon/mainnet/signature`;
    default:
      return `${SERVER_URL_PROD}/eth/mainnet/signature`;
  }
}