import React from 'react';
import { PhishingResponse, PhishingResult, Warning } from '../../../../models/PhishingResponse';
import styles from '../../ActionPopup.module.css';
import { URLCheckerInput } from './CheckUrl';

interface PhishingTabContainerProps {
  scanResult: PhishingResponse;
}

export const PhishingTabContainer = (props: PhishingTabContainerProps) => {
  const { phishing, domainName } = props.scanResult;
  const logoPath = getLogoPath();

  function getLogoPath(): string {
    switch (phishing) {
      case PhishingResult.NotPhishing:
        return '/images/wg_logos/Logo-Large-Transparent.png';
      case PhishingResult.Phishing:
        return '/images/wg_logos/Logo-Large-Transparent-Alert.png';
      case PhishingResult.Unknown:
        return '/images/wg_logos/Logo-Large-Transparent.png'; // todo
    }
  }

  return (
    <div className={styles.popupContent}>
      <img
        style={{
          zIndex: '-1',
          position: 'absolute',
          maxHeight: '600px',
          marginBottom: '150px',
          width: '100vw',
          opacity: '80%',
        }}
        src="images/popup/GreenGlow.png"
      />
      <div className={styles.popupContent}>
        <img width="100px" style={{ marginTop: '50px' }} src={logoPath} />
        <div className={styles.popupContent} style={{ marginTop: '30px' }}>
          <p className={styles.currentURL}>
            {/* todo: pass in current URL as full url here, not just domainName for better ux */}
            Current URL: <span className={styles['text-green']}>{domainName}</span>
          </p>
          <img src="images/popup/divider.png" />
          <p className={styles.phishingResultHeader}>
            This is a <span className={styles['text-green']}>Verified</span> Website
          </p>
        </div>
      </div>

      <URLCheckerInput defaultURL={domainName} />
    </div>
  );
};
