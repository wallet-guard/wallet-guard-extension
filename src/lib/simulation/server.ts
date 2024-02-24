import {
  ErrorType,
  SimulationErrorResponse,
  SimulationResponse,
  SimulationApiResponse,
  TransactionArgs,
  TransactionType,
  SoftLockedAssetsResponse,
} from '../../models/simulation/Transaction';
import { SERVER_URL_PROD } from '../environment';

export const fetchTransaction = async (args: TransactionArgs, type: TransactionType): Promise<SimulationResponse> => {
  try {
    const simulationURL = type === TransactionType.Transaction ?
      getTransactionEndpoint(args.chainId) : getSignatureEndpoint(args.chainId);

    const response: globalThis.Response = await fetch(simulationURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    if (response.status === 200) {
      const data: SimulationApiResponse = await response.json();

      return data;
    } else if (response.status === 403) {
      const result: SimulationErrorResponse = {
        error: {
          type: ErrorType.Unauthorized,
          message: 'Unauthorized',
          extraData: null,
        },
      };

      return result;
    } else if (response.status === 429) {
      const result: SimulationErrorResponse = {
        error: {
          type: ErrorType.TooManyRequests,
          message: 'Rate limit hit',
          extraData: null,
        },
      };

      return result;
    }

    const result: SimulationErrorResponse = {
      error: {
        type: ErrorType.GeneralError,
        message: 'Unrecognized status code returned',
        extraData: null,
      },
    };

    return result;
  } catch (e: any) {
    const result: SimulationErrorResponse = {
      error: {
        type: ErrorType.UnknownError,
        message: 'an unknown error has occurred',
        extraData: null,
      },
    };

    return result;
  }
};

export const fetchLockedAssets = async (address: string): Promise<SoftLockedAssetsResponse | null> => {
  try {
    const response: globalThis.Response = await fetch(`${SERVER_URL_PROD}/soft-lock/locked-assets?address=${address}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data: SoftLockedAssetsResponse = await response.json();

      return data;
    }

    return null;
  } catch (e) {
    console.error('error fetching soft locked assets', e);
    return null;
  }
}

export function getTransactionEndpoint(chainId: string): string {
  switch (chainId.toLowerCase()) {
    case '0x1':
    case '1':
      return `${SERVER_URL_PROD}/eth/mainnet/transaction`;
    case '0xa4b1':
    case '42161':
      return `${SERVER_URL_PROD}/arb/mainnet/transaction`;
    case '0x89':
    case '137':
      return `${SERVER_URL_PROD}/polygon/mainnet/transaction`;
    case '0xa':
    case '10':
      return `${SERVER_URL_PROD}/optimism/mainnet/transaction`;
    case '56':
    case '0x38':
      return `${SERVER_URL_PROD}/bsc/mainnet/transaction`;
    case '8453':
    case '0x2105':
      return `${SERVER_URL_PROD}/base/mainnet/transaction`;
    case '59144':
    case '0xe708':
      return `${SERVER_URL_PROD}/linea/mainnet/transaction`;
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
    case '0xa':
    case '10':
      return `${SERVER_URL_PROD}/optimism/mainnet/signature`;
    case '56':
    case '0x38':
      return `${SERVER_URL_PROD}/bsc/mainnet/signature`;
    case '8453':
    case '0x2105':
      return `${SERVER_URL_PROD}/base/mainnet/signature`;
    case '59144':
    case '0xe708':
      return `${SERVER_URL_PROD}/linea/mainnet/signature`;
    default:
      return `${SERVER_URL_PROD}/eth/mainnet/signature`;
  }
}
