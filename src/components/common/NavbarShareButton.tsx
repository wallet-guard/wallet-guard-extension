import React from 'react';
import { TwitterShareButton } from 'react-share';
import styles from './common.module.css';
import { BsTwitterX } from 'react-icons/bs';

export function NavbarShareButton() {
  return (
    <TwitterShareButton
      url={'https://walletguard.app'}
      title={'Join myself and 100,000+ others who are protecting our assets with Wallet Guard'}
      via={'wallet_guard'}
    >
      <div className={styles['buttonWithIcon']}>
        Share
        <BsTwitterX style={{ marginLeft: '5px' }} />
      </div>
    </TwitterShareButton>
  );
}
