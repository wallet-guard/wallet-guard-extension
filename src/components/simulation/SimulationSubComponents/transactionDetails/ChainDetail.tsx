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
