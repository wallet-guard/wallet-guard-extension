import { PhishingResponse } from '../PhishingResponse';

export interface Transaction {
  from: string;
  to: string;
  data?: string;
  value?: string;
}

export enum TransactionType {
  Transaction = 'Transaction',
  Signature = 'Signature'
}

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

export type TransactionArgs = SimulateRequestArgs | SignatureRequestArgs | SignatureHashSignArgs | PersonalSignArgs | UnstandardizedSignatureRequestArgs;

// Transaction we want to forward.
export interface SimulateRequestArgs extends RequestArgs {
  transaction: Transaction;
};

export interface UnstandardizedSignatureRequestArgs extends RequestArgs {
  params: any;
}

export interface SignatureRequestArgs extends RequestArgs {
  // Domain for this signature request.
  domain: any; // TODO: add types here?
  // Message to be signed for this signature request.
  message: any;
  // Primary type for this message.
  primaryType: string;
};

// Hash being signed.
export interface SignatureHashSignArgs extends RequestArgs {
  hash: string;
};

// Message to be signed.
export interface PersonalSignArgs extends RequestArgs {
  signMessage: string;
};

interface RequestArgs {
  // UUID for this request.
  id: string;
  // Chain ID for this request in hex.
  chainId: string;
  // Signer for this request.
  signer: string;
  // Domain Origin
  origin: string;
  // Method type
  method: SimulationMethodType | string;
  // Whether this request is a bypassed request.
  bypassed?: boolean;
}

export type SimulationResponse =
  | SimulationSuccessResponse
  | SimulationErrorResponse;

export type SimulationErrorResponse = {
  error: SimulationError;
  scanResult?: PhishingResponse;
  // extraInfo: ExtraInfoType | null;
};

export type SimulationSuccessResponse = {
  recommendedAction: RecommendedActionType;
  overviewMessage: string;
  stateChanges: StateChange[] | null;
  addressDetails: SimulationAddressDetails;
  method: SimulationMethodType | string;
  decodedMessage?: string; // Only present on signatures
  scanResult: PhishingResponse;
  riskFactors: RiskFactor[] | null;
  gas?: SimulatedGas; // Only present on transactions
  error: null;
  extraInfo: ExtraInfoData | null;
};

export type SimulationApiResponse = {
  recommendedAction: RecommendedActionType;
  overviewMessage: string;
  stateChanges: StateChange[] | null;
  addressDetails: SimulationAddressDetails;
  method: SimulationMethodType | string;
  decodedMessage?: string; // Only present on signatures
  scanResult: PhishingResponse;
  riskFactors: RiskFactor[] | null;
  gas?: SimulatedGas; // Only present on transactions
  error: SimulationError | null;
  extraInfo: ExtraInfoData | null;
};

export enum ExtraInfoType {
  UnresolvableSignature = "UNRESOLVABLE_SIGNATURE",
}

export type ExtraInfoData = {
  type: ExtraInfoType;
  message: string;
}

export type SimulatedGas = {
  gasUsedEth: string;
  fiatValue: string;
  currency: Currency;
};

export enum Currency {
  // add support for more currencies here in the future
  USD = 'USD',
}

export enum RecommendedActionType {
  None = 'NONE',
  Warn = 'WARN',
  Block = 'BLOCK',
}

export type RiskFactor = {
  severity: Severity;
  type: WarningType;
  message: string;
  value?: string;
};

export enum WarningType {
  Bypass = 'BYPASS',
  Similarity = 'SIMILARITY',
  RecentlyCreated = 'RECENTLY_CREATED',
  Malware = 'MALWARE',
  Homoglyph = 'HOMOGLYPH',
  Blocklisted = 'BLOCKLISTED',
  MLInference = 'ML_INFERENCE',
  Drainer = 'DRAINER',
  BlurListing = 'BLUR_LISTING',
  OpenseaListing = 'OPENSEA_LISTING',
  EthSign = 'ETH_SIGN',
  LooksrareListing = 'LOOKSRARE_LISTING',
}

export enum Severity {
  Low = 'LOW',
  High = 'HIGH',
  Critical = 'CRITICAL',
}

export type SimulationError = {
  type: ErrorType;
  message: string;
  extraData: object | null;
}

export enum ErrorType {
  Unauthorized = 'UNAUTHORIZED',
  InsufficientFunds = 'INSUFFICIENT_FUNDS',
  MaxFeePerGasLessThanBlockBaseFee = 'MAX_FEE_PER_GAS_LESS_THAN_BLOCK_BASE_FEE',
  UnsupportedSignature = "UNSUPPORTED_SIGNATURE",
  Revert = 'REVERT',
  TooManyRequests = 'TOO_MANY_REQUESTS',
  GeneralError = 'ERROR',
  UnknownError = "UNKNOWN_ERROR"
}

export enum SimulationWarningType {
  None = 'NONE',
  Info = 'INFO',
  Warn = 'WARN',
}

export enum SimulationChangeType {
  // v0 (+ everything from v1 except bid, listing, and revoke)
  OpenSeaListing = 'OPENSEA_LISTING',
  OpenSeaReceive = 'OPENSEA_RECEIVE',
  LooksRareAskReceive = 'LOOKSRARE_ASK_RECEIVE',
  LooksRareAskListing = 'LOOKSRARE_ASK_LISTING',
  LooksRareBidReceive = 'LOOKSRARE_BID_RECEIVE',
  LooksRareBidOffer = 'LOOKSRARE_BID_OFFER',
  ReceiveApproval = 'RECEIVE_APPROVAL',
  ReceiveApprovalForAll = 'RECEIVE_APPROVAL_FOR_ALL',
  ListingReceive = 'LISTING_RECEIVE',
  ListingTransfer = 'LISTING_TRANSFER',
  PermitTransfer = 'PERMIT_TRANSFER',
  PermitReceive = 'PERMIT_RECEIVE',

  // v1
  ApprovalForAll = 'APPROVAL_FOR_ALL',
  Approve = 'APPROVE',
  RevokeApprovalForAll = 'REVOKE_APPROVAL_FOR_ALL',
  Revoke = 'REVOKE_APPROVE',
  Transfer = 'TRANSFER',
  Receive = 'RECEIVE',
  Bidding = 'BIDDING',
  Listing = 'LISTING',
}

export enum SimulationAssetTypes {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  Native = 'NATIVE',
}

export enum AddressType {
  EOA = 'EOA',
  Contract = 'CONTRACT'
}

export type SimulationAddressDetails = {
  address: string;
  addressType: AddressType;
  etherscanVerified: boolean;
  etherscanLink: string;
  addressName: string;
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

export type StateChange = {
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
  fiatValue: string;
  coinmarketcapLink: string;
  openSeaLink: string;
};
