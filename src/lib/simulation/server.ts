import { ErrorType, RequestArgs, SimulationErrorResponse, SimulationResponse, Transaction } from '../../models/simulation/Transaction';
import { Response, ResponseType } from '../../models/simulation/Transaction';
import { TAS_SERVER_URL_PROD } from '../environment';

// TODO: add unit tests for these 2 functions
export const fetchSimulate = async (args: RequestArgs): Promise<Response> => {
  try {
    const result: globalThis.Response = await fetch(`${TAS_SERVER_URL_PROD}/simulate`, {
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
        type: ErrorType.GeneralError,
        message: 'An unknown error occurred',
        extraData: null
      },
      type: ResponseType.Error
    };
  }
};

export const fetchSignature = async (
  args: RequestArgs
): Promise<Response> => {
  try {
    console.log('ARGS:', args);
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
        type: ErrorType.GeneralError,
        message: 'An unknown error occurred',
        extraData: null
      },
      type: ResponseType.Error
    };
  }
};
