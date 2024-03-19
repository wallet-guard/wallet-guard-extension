import React, { useContext } from 'react';
import styles from '../../simulation.module.css';
import { getAssetLogo } from '../../../../lib/helpers/chainMappings';

interface ChainDetailProps {
  chainId: string;
}

export function ChainDetail(props: ChainDetailProps) {
  function getAssetName() {
    switch (props.chainId) {
      case '0x1':
      case '1':
        return 'Ethereum';
      case '42161':
      case '0xa4b1':
        return 'Arbitrum';
      case '137':
      case '0x89':
        return 'Polygon';
      case '10':
      case '0xa':
        return 'Optimism';
      case '56':
      case '0x38':
        return 'Binance Smart Chain';
      case '8453':
      case '0x2105':
        return 'Base';
      case '59144':
      case '0xe708':
        return 'Linea';
      case '43114':
      case '0xa86a':
        return 'Avalanche';
      default:
        return 'Ethereum';
    }
  }

  const assetLogo = getAssetLogo(props.chainId);
  const assetName = getAssetName();

  return (
    <div className={styles.row}>
      <img src={assetLogo} style={{ height: '18px', marginRight: '5px' }} />
      <p className={styles['text-md']}>{assetName}</p>
    </div>
  );
}
