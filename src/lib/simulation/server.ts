import { ErrorType, SimulationErrorResponse, SimulationResponse, TransactionArgs } from '../../models/simulation/Transaction';
import { Response, ResponseType } from '../../models/simulation/Transaction';
import { TAS_SERVER_URL_PROD } from '../environment';

// TODO: add unit tests for these 2 functions
export const fetchSimulate = async (args: TransactionArgs): Promise<Response> => {
  try {
    let simulationURL = '';

    switch (args.chainId) {
      case '0x1':
      case '1':
        simulationURL = `${TAS_SERVER_URL_PROD}/simulate`;
        break;
      case "0xa4b1":
      case "0xA4BA":
      case '42161':
      case '42170':
        simulationURL = `${TAS_SERVER_URL_PROD}/v1/arbitrum/transaction`;
        break;
    }

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
    }

    const data: SimulationErrorResponse = await result.json();
    return { type: ResponseType.Error, error: data.error };
  } catch (e: any) {
    // if data.error is undefined it is most likely a network error
    console.log('ERROR: ', e);
    return {
      error: {
        // TODO: Verify this w/ posthog
        type: ErrorType.UnknownError,
        message: 'An unknown error occurred',
        extraData: null
      },
      type: ResponseType.Error
    };
  }
};

export const fetchSignature = async (
  args: TransactionArgs
): Promise<Response> => {
  try {
    const result: globalThis.Response = await fetch(`${TAS_SERVER_URL_PROD}/signature`, {
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
    }

    const data: SimulationErrorResponse = await result.json();
    return { type: ResponseType.Error, error: data.error };
  } catch (e: any) {
    // if data.error is undefined it is most likely a network error
    console.log('ERROR: ', e);
    return {
      error: {
        // TODO: Verify this w/ posthog
        type: ErrorType.UnknownError,
        message: 'An unknown error occurred',
        extraData: null
      },
      type: ResponseType.Error
    };
  }
};
