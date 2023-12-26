import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { TwitterShareButton } from 'react-share';
import styles from './common.module.css';

export function NavbarShareButton() {
  return (
    <TwitterShareButton
      url={'https://walletguard.app'}
      title={'Join myself and 100,000+ others who are protecting our assets with Wallet Guard'}
      via={'wallet_guard'}
    >
      <div className={styles['buttonWithIcon']}>
        Share
        <FaTwitter style={{ marginLeft: '5px' }} />
      </div>
    </TwitterShareButton>
  );
}
