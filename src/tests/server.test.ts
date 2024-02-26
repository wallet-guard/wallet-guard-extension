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
  });

  describe('Transaction endpoints', () => {
    it('Ethereum transaction base URL', () => {
      const baseURL = getTransactionEndpoint('1');
      const baseURLHex = getTransactionEndpoint('0x1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/eth/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/eth/mainnet/transaction');
    });
    it('Polygon transaction base URL', () => {
      const baseURL = getTransactionEndpoint('137');
      const baseURLHex = getTransactionEndpoint('0x89');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/polygon/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/polygon/mainnet/transaction');
    });
    it('Arbitrum transaction base URL', () => {
      const baseURL = getTransactionEndpoint('42161');
      const baseURLHex = getTransactionEndpoint('0xa4b1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/arb/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/arb/mainnet/transaction');
    });
    it('Optimism transaction base URL', () => {
      const baseURL = getTransactionEndpoint('10');
      const baseURLHex = getTransactionEndpoint('0xa');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/optimism/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/optimism/mainnet/transaction');
    });
  });
});