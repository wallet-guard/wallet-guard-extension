import React, { useContext } from 'react';
import styles from '../../simulation.module.css';

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

  function getAssetLogo() {
    switch (props.chainId) {
      case '0x1':
      case '1':
        return 'images/asset_logos/ethereum.png';
      case '42161':
      case '0xa4b1':
        return 'images/asset_logos/polygon.png';
      case '137':
      case '0x89':
        return 'images/asset_logos/arbitrum.png';
    }
  }

  const assetLogo = getAssetLogo();
  const assetName = getAssetName();

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <img src={assetLogo} style={{ height: '16px', marginRight: '5px' }} />
      <p className={styles['text-md']}>{assetName}</p>
    </div>
  );
}
