import type { Transaction } from '../../models/simulation/Transaction';
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
      // TODO: need TAS response model here on data
      const data = await result.json();

      if (result.status === 200) {
        return {
          type: ResponseType.Success,
          simulation: data,
        };
      }
      if (result.status === 409) {
        return {
          type: ResponseType.InsufficientFunds,
          error: data.error,
        };
      }
      return {
        type: ResponseType.Revert,
        error: data.error,
      };
    }

    const { error } = await result.json();
    return { type: ResponseType.Error, error };
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
      const data = await result.json();

      if (data) {
        return {
          type: ResponseType.Success,
          simulation: data,
        };
      }

      return {
        type: ResponseType.Revert,
        error: data.error,
      };
    }

    try {
      let { error } = await result.json();
      return { type: ResponseType.Error, error };
    } catch (e) {
      return { type: ResponseType.Error };
    }
  } catch (e: any) {
    console.log('ERROR: ', e);
    return { error: e.message, type: ResponseType.Error };
  }
};
