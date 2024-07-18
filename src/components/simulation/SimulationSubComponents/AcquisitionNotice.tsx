import React, { useEffect } from 'react';
import styles from '../simulation.module.css'

export interface AcquiredNoticeProps {
  closeCb: () => void;
}

export function AcquisitionNoticeModal({ closeCb }: AcquiredNoticeProps) {
  return (
    <div className='container' style={{ position: 'fixed', bottom: '100px', zIndex: 10 }}>
      <div style={{ width: '100%', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', background: '#2B2B2B', padding: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <p style={{ fontSize: '20px', marginBottom: '5px' }} className={styles['font-archivo-semibold']}>Terms & Privacy Update</p>
          <p className={styles['softLockedWarningSubtitle']} style={{ marginBottom: '0px', fontSize: '14px' }}>
            Our <a className={styles.links} href='https://consensys.io/terms-of-use' target='_blank'>Terms of Service</a> and <a className={styles.links} href='https://consensys.io/privacy-notice' target='_blank'>Privacy Policy</a> have recently changed, please read and acknowledge <a className={styles.links} href='https://www.walletguard.app/blog/weve-been-acquired-what-this-means-for-your-data' target='_blank'>the full privacy notice.</a>
          </p>

          <p className={styles['softLockedWarningSubtitle']} style={{ marginBottom: '0px', marginTop: '10px', fontSize: '14px' }}>
            <a className={styles.links} style={{ marginBottom: '0px', fontSize: '14px' }} target='_blank' href='https://consensys.io/blog/consensys-acquires-wallet-guard-to-enhance-metamask-security'>
              Read the Full Press Release
            </a>
            {' '}
            to learn more about our recent acquisition.
          </p>

          <button className={styles.buttonOutline} style={{ marginTop: '10px', textAlign: 'left', width: 'fit-content', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px' }} onClick={closeCb}>Acknowledge</button>
        </div>
      </div>
    </div>
  )
}