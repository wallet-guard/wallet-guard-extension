import React from 'react';
import styles from './common.module.css';
import { BsGift } from 'react-icons/bs';
import { openDashboard } from '../../lib/helpers/linkHelper';

export function NavbarShareButton() {
  return (
    <div className={styles['buttonWithIcon']} onClick={() => openDashboard('referrals')}>
      Share
      <BsGift style={{ marginLeft: '5px' }} />
    </div>
  );
}
