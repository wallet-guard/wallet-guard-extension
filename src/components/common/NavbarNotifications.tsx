import React from 'react';
import styles from './common.module.css';
import { BsBellFill } from 'react-icons/bs';

export function NavbarNotifications() {
  {/* TODO: Make this go back to the dashboard */ }

  return (
    <div className={styles['buttonWithIcon']} style={{ marginRight: '10px' }}>
      <BsBellFill />
    </div>
  )
}
