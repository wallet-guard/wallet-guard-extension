import { ErrorType, SimulationErrorResponse, SimulationResponse, Transaction } from '../../models/simulation/Transaction';
import { Response, ResponseType } from '../../models/simulation/Transaction';
import { TAS_SERVER_URL_PROD } from '../environment';

export const fetchSimulate = async (args: {
  id: string;
  signer: string;
  chainId: string;
  transaction: Transaction;
}): Promise<Response> => {
  try {
    const result: any = await fetch(`${TAS_SERVER_URL_PROD}/simulate`, {
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

    const data: SimulationErrorResponse = await result.json();
    return { type: ResponseType.Error, error: data.error };
  } catch (e: any) {
    console.log('ERROR: ', e);
    return { error: e.message, type: ResponseType.Error };
  }
};

export const fetchSignature = async (
  args: { id: string; chainId: string; signer: string } & (
    | {
      domain: any;
      message: any;
    }
    | {
      hash: any;
    }
    | {
      signMessage: string;
    }
  )
): Promise<Response> => {
  try {
    const result: any = await fetch(`${TAS_SERVER_URL_PROD}/signature`, {
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

    try {
      const data: SimulationErrorResponse = await result.json();
      return { type: ResponseType.Error, error: data.error };
    } catch (e) {
      return { type: ResponseType.Error };
    }
  } catch (e: any) {
    console.log('ERROR: ', e);
    return { error: e.message, type: ResponseType.Error };
  }
};
