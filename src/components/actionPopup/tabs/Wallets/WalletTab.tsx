import React from 'react';
import styles from '../../ActionPopup.module.css';
import { supportedWallets, WalletName } from '../../../../lib/config/features';
import { WalletDetail } from './WalletDetail';

export function WalletsTab() {
  const supportedWalletKeys = Object.keys(supportedWallets) as WalletName[];

  return (
    <div style={{ height: '100%' }}>
      {/* <Switch colorScheme={'green'} pl={'10px'} isChecked={true}></Switch> */}
      <div
        className={styles.settingsRow}
        style={{
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <p className={styles.tabHeader}>Wallet Versions</p>
      </div>

      {supportedWalletKeys.map((walletName) => {
        return <WalletDetail key={walletName} name={walletName} />;
      })}
    </div>
  );
}
