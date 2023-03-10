import { PhishingResponse } from '../PhishingResponse';

export interface Transaction {
  from: string;
  to: string;
  data?: string;
  value?: string;
}

export type Response = {
  readonly type: ResponseType;
  // Only set on success.
  readonly simulation?: SimulationResponse;
  // Might be set on error.
  readonly error?: SimulationError;
};

export enum ResponseType {
  Success = 'success',
  Revert = 'revert',
  Error = 'error',
}

export enum TokenType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  ERC20 = 'ERC20',
}

export enum SimulationMethodType {
  EthSignTypedDataV3 = 'eth_signTypedData_v3',
  EthSignTypedDataV4 = 'eth_signTypedData_v4',
  EthSendTransaction = 'eth_sendTransaction',
  EthSign = 'eth_sign',
  PersonalSign = 'personal_sign',
}

// Transaction we want to forward.
export type SimulateRequestArgs = {
  transaction: Transaction;
};

export type SignatureRequestArgs = {
  // Domain for this signature request.
  domain: any;
  // Message to be signed for this signature request.
  message: any;
  // Primary type for this message.
  primaryType: string;
};

// Hash being signed.
export type SignatureHashSignArgs = {
  hash: string;
};

// Message to be signed.
export type PersonalSignArgs = {
  signMessage: string;
};

export type RequestArgs = {
  // UUID for this request.
  id: string;
  // Chain ID for this request in hex.
  chainId: string;
  // Signer for this request.
  signer: string;
  // Domain Origin
  origin: string;
  // Method type
  method: string;
} & (SimulateRequestArgs | SignatureRequestArgs | SignatureHashSignArgs | PersonalSignArgs);

export type SimulationResponse = {
  warningType: SimulationWarningType;
  message: string;
  stateChanges: SimulationStateChange[];
  addressDetails: SimulationAddressDetails;
  method: string;
  scanResult: PhishingResponse;
  error: SimulationError | null;
};

export type SimulationErrorResponse = {
  error: SimulationError;
}

export type SimulationError = {
  type: ErrorType;
  message: string;
  extraData: object | null;
}

export enum ErrorType {
  InsufficientFunds = 'INSUFFICIENT_FUNDS',
  MaxFeePerGasLessThanBlockBaseFee = 'MAX_FEE_PER_GAS_LESS_THAN_BLOCK_BASE_FEE',
  Revert = 'REVERT',
  Error = 'ERROR',
}

export enum SimulationWarningType {
  None = 'NONE',
  Info = 'INFO',
  Warn = 'WARN',
}

export enum SimulationChangeType {
  ChangeTypeOpenSeaListing = 'OPENSEA_LISTING',
  ChangeTypeOpenSeaReceive = 'OPENSEA_RECEIVE',
  ChangeTypeLooksRareAskReceive = 'LOOKSRARE_ASK_RECEIVE',
  ChangeTypeLooksRareAskListing = 'LOOKSRARE_ASK_LISTING',
  ChangeTypeLooksRareBidReceive = 'LOOKSRARE_BID_RECEIVE',
  ChangeTypeLooksRareBidOffer = 'LOOKSRARE_BID_OFFER',
  ChangeTypeRevokeApprovalForAll = 'REVOKE_APPROVAL_FOR_ALL',
  ChangeTypeApprovalForAll = 'APPROVAL_FOR_ALL',
  ChangeTypeApprove = 'APPROVE',
  ChangeTypeTransfer = 'TRANSFER',
  ChangeTypeReceive = 'RECEIVE',
  ChangeTypeReceiveApproval = 'RECEIVE_APPROVAL',
  ChangeTypeReceiveApprovalForAll = 'RECEIVE_APPROVAL_FOR_ALL',
  ChangeTypeListingReceive = 'LISTING_RECEIVE',
  ChangeTypeListingTransfer = 'LISTING_TRANSFER',
  ChangeTypePermitTransfer = 'PERMIT_TRANSFER',
  ChangeTypePermitReceive = 'PERMIT_RECEIVE',
}

export enum SimulationAssetTypes {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  Native = 'NATIVE',
}

export type SimulationAddressDetails = {
  address: string;
  addressType: string;
  etherscanVerified: boolean;
  etherscanLink: string;
};

export type TokenData = {
  verified?: Verified;
  address: string;
  name?: string;
  symbol?: string;
  tokenID?: string;
  tokenURI?: string;
  decimals?: number;
  logo?: string;
  EIP: string;
};

export type ApprovalStateChange = {
  approval: boolean;
  allTokens: boolean;
  tokenID: string;
  amount: number;
  address: string;
};

export type Verified = {
  etherscan?: boolean;
  sourcify?: boolean;
};

export type SimulationStateChange = {
  assetType: SimulationAssetTypes;
  changeType: SimulationChangeType;
  address: string;
  amount: string;
  symbol: string;
  decimals: number;
  contractAddress: string;
  name: string;
  logo: string;
  tokenID: string;
  tokenURI: string;
  tokenName: string;
  openSeaFloorPrice: number;
  openSeaVerified: boolean;
  etherscanVerified: boolean;
  message: string;
  fiatValue: string;
  coinmarketcapLink: string;
  openSeaLink: string;
};
