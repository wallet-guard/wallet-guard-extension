import { getSignatureEndpoint, getSimulationEndpoint } from '../lib/simulation/server';

describe('Server URLs', () => {
  describe('Signature endpoints', () => {
    it('Ethereum signature base URL', () => {
      const baseURL = getSignatureEndpoint('1');
      const baseURLHex = getSignatureEndpoint('0x1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/eth/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/eth/mainnet/signature');
    });
    it('Polygon signature base URL', () => {
      const baseURL = getSignatureEndpoint('137');
      const baseURLHex = getSignatureEndpoint('0x89');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/polygon/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/polygon/mainnet/signature');
    });
    it('Arbitrum signature base URL', () => {
      const baseURL = getSignatureEndpoint('42161');
      const baseURLHex = getSignatureEndpoint('0xa4b1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/arb/mainnet/signature');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/arb/mainnet/signature');
    });
  });

  describe('Transaction endpoints', () => {
    it('Ethereum signature base URL', () => {
      const baseURL = getSimulationEndpoint('1');
      const baseURLHex = getSimulationEndpoint('0x1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/eth/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/eth/mainnet/transaction');
    });
    it('Polygon signature base URL', () => {
      const baseURL = getSimulationEndpoint('137');
      const baseURLHex = getSimulationEndpoint('0x89');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/polygon/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/polygon/mainnet/transaction');
    });
    it('Arbitrum signature base URL', () => {
      const baseURL = getSimulationEndpoint('42161');
      const baseURLHex = getSimulationEndpoint('0xa4b1');
      expect(baseURL).toEqual('https://api.walletguard.app/extension/v0/arb/mainnet/transaction');
      expect(baseURLHex).toEqual('https://api.walletguard.app/extension/v0/arb/mainnet/transaction');
    });
  });
});