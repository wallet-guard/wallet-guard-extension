import React from 'react';
import { TwitterShareButton } from 'react-share';
import styles from './common.module.css';
import { BsTwitterX } from 'react-icons/bs';

export function NavbarShareButton() {
  return (
    <TwitterShareButton
      url={'https://walletguard.app'}
      title={
        'Join 100,000+ wallets already protected using Wallet Guard. Proactively detect wallet drainers & phishing scams so you can transact confidently in your preferred wallet.'
      }
      via={'wallet_guard'}
    >
      <div className={styles['buttonWithIcon']}>
        Share
        <BsTwitterX style={{ marginLeft: '5px' }} />
      </div>
    </TwitterShareButton>
  );
}
