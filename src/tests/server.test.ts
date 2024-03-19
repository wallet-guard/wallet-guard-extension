import { getSignatureEndpoint, getTransactionEndpoint } from '../lib/simulation/server';

describe('Server URLs', () => {
  describe('Signature endpoints', () => {
    it('Ethereum signature base URL', () => {
      const baseURL = getSignatureEndpoint('1');
      const baseURLHex = getSignatureEndpoint('0x1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/eth/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/eth/mainnet/signature');
    });
    it('Polygon signature base URL', () => {
      const baseURL = getSignatureEndpoint('137');
      const baseURLHex = getSignatureEndpoint('0x89');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/polygon/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/polygon/mainnet/signature');
    });
    it('Arbitrum signature base URL', () => {
      const baseURL = getSignatureEndpoint('42161');
      const baseURLHex = getSignatureEndpoint('0xa4b1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/arb/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/arb/mainnet/signature');
    });
    it('Optimism signature base URL', () => {
      const baseURL = getSignatureEndpoint('10');
      const baseURLHex = getSignatureEndpoint('0xa');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/optimism/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/optimism/mainnet/signature');
    });
    it('Base signature base URL', () => {
      const baseURL = getSignatureEndpoint('8453');
      const baseURLHex = getSignatureEndpoint('0x2105');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/base/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/base/mainnet/signature');
    });
    it('BSC signature base URL', () => {
      const baseURL = getSignatureEndpoint('56');
      const baseURLHex = getSignatureEndpoint('0x38');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/bsc/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/bsc/mainnet/signature');
    });
    it('Avalanche signature base URL', () => {
      const baseURL = getSignatureEndpoint('43114');
      const baseURLHex = getSignatureEndpoint('0xa86a');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/avax/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/avax/mainnet/signature');
    });
    it('Linea signature base URL', () => {
      const baseURL = getSignatureEndpoint('59144');
      const baseURLHex = getSignatureEndpoint('0xe708');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/linea/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/linea/mainnet/signature');
    });
  });

  describe('Transaction endpoints', () => {
    it('Ethereum transaction base URL', () => {
      const baseURL = getTransactionEndpoint('1');
      const baseURLHex = getTransactionEndpoint('0x1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/eth/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/eth/mainnet/transaction');
    });
    it('Polygon transaction base URL', () => {
      const baseURL = getTransactionEndpoint('137');
      const baseURLHex = getTransactionEndpoint('0x89');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/polygon/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/polygon/mainnet/transaction');
    });
    it('Arbitrum transaction base URL', () => {
      const baseURL = getTransactionEndpoint('42161');
      const baseURLHex = getTransactionEndpoint('0xa4b1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/arb/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/arb/mainnet/transaction');
    });
    it('Optimism transaction base URL', () => {
      const baseURL = getTransactionEndpoint('10');
      const baseURLHex = getTransactionEndpoint('0xa');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/optimism/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/optimism/mainnet/transaction');
    });
    it('Base transaction base URL', () => {
      const baseURL = getTransactionEndpoint('8453');
      const baseURLHex = getTransactionEndpoint('0x2105');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/base/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/base/mainnet/transaction');
    });
    it('BSC transaction base URL', () => {
      const baseURL = getTransactionEndpoint('56');
      const baseURLHex = getTransactionEndpoint('0x38');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/bsc/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/bsc/mainnet/transaction');
    });
    it('Avalanche transaction base URL', () => {
      const baseURL = getTransactionEndpoint('43114');
      const baseURLHex = getTransactionEndpoint('0xa86a');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/avax/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/avax/mainnet/transaction');
    });
    it('Linea transaction base URL', () => {
      const baseURL = getTransactionEndpoint('59144');
      const baseURLHex = getTransactionEndpoint('0xe708');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v1/linea/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v1/linea/mainnet/transaction');
    });
  });
});