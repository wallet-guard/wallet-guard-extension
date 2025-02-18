import React from 'react';
import styles from '../simulation.module.css';

export interface WalletGuardSunsetNoticeProps {
  closeCb: () => void;
}

export function WalletGuardSunsetNoticeModal({ closeCb }: WalletGuardSunsetNoticeProps) {
  return (
    <div
      className="container"
      style={{ position: 'fixed', bottom: '100px', zIndex: 10 }}
    >
      <div
        style={{
          width: '100%',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          background: '#2B2B2B',
          padding: '15px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <p
            style={{ fontSize: '20px', marginBottom: '5px' }}
            className={styles['font-archivo-semibold']}
          >
            Wallet Guard Sunset Notice
          </p>

          <p
            className={styles['softLockedWarningSubtitle']}
            style={{ marginBottom: '0px', fontSize: '14px' }}
          >
            The Wallet Guard extension will be discontinued on <strong>March 31st, 2025</strong>. Please install MetaMask to continue using Wallet Guard's security features.
            Please read our{' '}
            <a
              className={styles.links}
              href="https://www.walletguard.app/blog/wallet-guard-sunset-notice"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sunset Notice
            </a>{' '}
            for more information.
          </p>

          <button
            className={styles.buttonOutline}
            style={{
              marginTop: '10px',
              textAlign: 'left',
              width: 'fit-content',
              padding: '5px 10px',
            }}
            onClick={closeCb}
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
