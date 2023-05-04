import React, { useState } from 'react';
import { PhishingResponse, PhishingResult, Warning } from '../../../../models/PhishingResponse';
import styles from '../../ActionPopup.module.css';
import { URLCheckerInput } from './CheckUrl';

interface PhishingTabContainerProps {
  scanResult: PhishingResponse;
}

// TODO: Figure out if we should generate the props / colors from the above component? or just pass in scanResult
export const PhishingTabContainer = (props: PhishingTabContainerProps) => {
  const [scanResult, setScanResult] = useState(props.scanResult);
  const { phishing, domainName } = props.scanResult;
  const logoPath = getLogoPath();

  function getLogoPath(): string {
    switch (phishing) {
      case PhishingResult.NotPhishing:
        return '/images/popup/actionPopup/secure.png';
      case PhishingResult.Phishing:
        return '/images/wg_logos/Logo-Large-Transparent-Alert.png';
      case PhishingResult.Unknown:
        return '/images/wg_logos/Logo-Large-Transparent.png'; // todo
    }
  }

  function updateScanResult(result: PhishingResponse) {
    setScanResult(result);
  }

  return (
    <div className={styles.centeredContainer}>
      <img
        style={{
          zIndex: '-1',
          position: 'absolute',
          maxHeight: '600px',
          marginBottom: '150px',
          width: '100vw',
          opacity: '80%',
        }}
        src="images/popup/actionPopup/green-glow.png"
      />
      <div className={styles.centeredContainer}>
        <img width="200px" src={logoPath} />
        <div className={styles.centeredContainer} style={{ marginTop: '-50px' }}>
          <p className={styles.currentURL}>
            {/* todo: pass in current URL as full url here, not just domainName for better ux */}
            Current URL: <span className={styles['text-green']}>{scanResult.domainName}</span>
          </p>
          <img src="images/popup/actionPopup/divider.png" />
          <p className={styles.phishingResultHeader}>
            This is a <span className={styles['text-green']}>Verified</span> Website
          </p>
        </div>
      </div>

      <URLCheckerInput defaultURL={domainName} updateURLCallback={updateScanResult} />
    </div>
  );
};
