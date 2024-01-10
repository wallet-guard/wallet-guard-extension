import React, { useEffect } from 'react';
import styles from '../../simulation.module.css';
import posthog from 'posthog-js';

export function LockedAssetPopup() {
  useEffect(() => {
    posthog.capture('locked asset warning shown');
  }, []);

  return (
    <div className='container'>
      <div style={{ width: '100%', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', background: '#2B2B2B', padding: '15px' }}>
        <img src='/images/popup/notAllowedIcon.png' alt='a not allowed icon' />

        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <p style={{ fontSize: '20px', marginBottom: '0px' }} className={styles['font-archivo-semibold']}>Locked asset detected</p>
          <p className={styles['softLockedWarningSubtitle']} style={{ marginBottom: '0px' }}>If this was intentional, visit your dashboard to unlock the asset.</p>
        </div>
      </div>
    </div>

  )
}