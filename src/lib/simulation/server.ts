import {
  ErrorType,
  SimulationErrorResponse,
  SimulationResponse,
  SimulationApiResponse,
  TransactionArgs,
  TransactionType,
} from '../../models/simulation/Transaction';
import { SERVER_URL_PROD, SERVER_URL_PROD_V1 } from '../environment';

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
    case '8453':
    case '0x2105':
      return `${SERVER_URL_PROD}/base/mainnet/transaction`;
    case '56':
    case '0x38':
      return `${SERVER_URL_PROD}/bsc/mainnet/transaction`;
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
      return `${SERVER_URL_PROD_V1}/eth/mainnet/signature`;
    case '0xa4b1':
    case '42161':
      return `${SERVER_URL_PROD_V1}/arb/mainnet/signature`;
    case '0x89':
    case '137':
      return `${SERVER_URL_PROD_V1}/polygon/mainnet/signature`;
    case '0xa':
    case '10':
      return `${SERVER_URL_PROD_V1}/optimism/mainnet/signature`;
    case '8453':
    case '0x2105':
      return `${SERVER_URL_PROD_V1}/base/mainnet/signature`;
    default:
      return `${SERVER_URL_PROD_V1}/eth/mainnet/signature`;
  }
}
