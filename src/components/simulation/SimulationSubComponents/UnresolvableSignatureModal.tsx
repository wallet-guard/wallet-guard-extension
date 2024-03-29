import React, { useEffect } from 'react';
import styles from '../simulation.module.css'
import posthog from 'posthog-js';

export function UnresolvableSignatureModal(props: { message: string }) {
  const { message } = props;

  useEffect(() => {
    posthog.capture('unresolvable signature ui shown', {
      message,
    });
  }, []);

  return (
    <div className='container' style={{ position: 'fixed', bottom: '100px' }}>
      <div style={{ width: '100%', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', background: '#2B2B2B', padding: '20px' }}>
        <img height={56} width={56} src='/images/popup/alertIcon.png' alt='an alert icon' />

        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <p style={{ fontSize: '20px', marginBottom: '0px' }} className={styles['font-archivo-semibold']}>Unresolvable Transaction</p>
          <p className={styles['softLockedWarningSubtitle']} style={{ marginBottom: '0px', fontSize: '14px' }}>{message}</p>
        </div>
      </div>
    </div>
  )
}