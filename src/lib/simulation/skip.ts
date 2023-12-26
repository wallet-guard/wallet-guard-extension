import { TransactionArgs } from '../../models/simulation/Transaction';

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
  // X2Y2
  '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
  // Looksrare
  '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
  // Uniswap Universal Router
  '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
];

/// Check whether we should skip this transaction.
///
/// This should run in the content script in order to retrieve settings.
export const CheckIfOfficialMarketplace = async (request: TransactionArgs) => {
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
