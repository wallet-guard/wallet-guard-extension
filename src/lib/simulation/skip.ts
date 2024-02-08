import { TransactionArgs } from '../../models/simulation/Transaction';
import { SimulationSettings } from '../settings';

/// Known Marketplaces that we can skip for hyperdrive.
export const KNOWN_MARKETPLACES = [
  // Opensea Seaport 1.1
  '0x00000000006c3852cbef3e08e8df289169ede581',
  // Opensea Seaport 1.4
  '0x00000000000001ad428e4906ae43d8f9852d0dd6',
  // Opensea Seaport 1.5
  '0x00000000000000adc04c56bf30ac9d3c0aaf14dc',
  // Blur
  '0x000000000000ad05ccc4f10045630fb830b95127',
  // Blur
  '0x39da41747a83aee658334415666f3ef92dd0d541',
  // Blur
  '0xb2ecfe4e4d61f8790bbb9de2d1259b9e2410cea5',
  // X2Y2
  '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
  // Looksrare
  '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
  // Uniswap Universal Router
  '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
  // Uniswap
  '0x643770e279d5d0733f21d6dc03a8efbabf3255b4',
  // Uniswap
  '0xec8b0f7ffe3ae75d7ffab09429e3675bb63503e4',
  // Uniswap
  '0x000000000022d473030f116ddee9f6b43ac78ba3',
];

/// Check whether we should skip this transaction.
///
/// This should run in the content script in order to retrieve settings.
export const IsOfficialMarketplace = async (request: TransactionArgs) => {
  if (request.method === 'eth_sendTransaction') {
    // Type guard to check if request is SimulateRequestArgs
    if ('transaction' in request) {
      const address = request.transaction?.to?.toLowerCase();
      if (KNOWN_MARKETPLACES.includes(address)) {
        return true;
      }
    }
  }

  return false;
};

// Function to check if simulation should be skipped based on domain
export const shouldSkipBasedOnDomain = (domainName: string, simulationSettings: SimulationSettings) => {
  return (
    (domainName === 'opensea.io' && simulationSettings.opensea) ||
    (domainName === 'blur.io' && simulationSettings.blur) ||
    (domainName === 'uniswap.org' && simulationSettings.uniswap) ||
    (domainName === 'x2y2.io' && simulationSettings.x2y2) ||
    (domainName === 'looksrare.org' && simulationSettings.looksrare)
  );
};

export const shouldShowSkipTransactionModal = (domainName: string) => {
  return (
    domainName === 'opensea.io' ||
    domainName === 'blur.io' ||
    domainName === 'uniswap.org' ||
    domainName === 'x2y2.io' ||
    domainName === 'looksrare.org'
  );
};
