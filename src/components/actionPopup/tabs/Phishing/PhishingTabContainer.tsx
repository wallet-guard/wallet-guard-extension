import React, { useEffect, useState } from 'react';
import { PhishingResponse, PhishingResult, Warning } from '../../../../models/PhishingResponse';
import styles from '../../ActionPopup.module.css';
import { URLCheckerInput } from './CheckUrl';

interface PhishingTabContainerProps {
  scanResult: PhishingResponse;
}

interface PhishingTabTheme {
  color: 'green' | 'red' | 'orange' | 'gray';
  title: string;
  logoPath: string;
}

const defaultTheme: PhishingTabTheme = {
  color: 'green',
  title: 'verified',
  logoPath: '/images/popup/actionPopup/secure.png',
};

export const PhishingTabContainer = (props: PhishingTabContainerProps) => {
  const [scanResult, setScanResult] = useState(props.scanResult);
  const [theme, setTheme] = useState<PhishingTabTheme>(defaultTheme);

  useEffect(() => {
    setTheme(getTheme());
  }, [scanResult]);

  function getTheme() {
    switch (scanResult.phishing) {
      case PhishingResult.NotPhishing:
        return {
          color: 'green',
          title: 'verified',
          logoPath: '/images/popup/actionPopup/secure.png',
        } as PhishingTabTheme;
      case PhishingResult.Phishing:
        return {
          color: 'red',
          title: 'malicious',
          logoPath: '/images/popup/actionPopup/malicious.png',
        } as PhishingTabTheme;
      case PhishingResult.Unknown:
        return {
          color: 'gray',
          title: 'unknown',
          logoPath: '/images/popup/actionPopup/unknown.png',
        } as PhishingTabTheme;
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
        src={`images/popup/actionPopup/${theme.color}-glow.png`}
      />
      <div className={styles.centeredContainer}>
        <img width="200px" src={theme.logoPath} />
        <div className={styles.centeredContainer} style={{ marginTop: '-50px' }}>
          <p className={styles.currentURL}>
            {/* todo: pass in current URL as full url here, not just domainName for better ux */}
            Current URL: <span className={styles[`text-${theme.color}`]}>{scanResult.domainName}</span>
          </p>
          <img src="images/popup/actionPopup/divider.png" />
          <p className={styles.phishingResultHeader}>
            This is a <span className={styles[`text-${theme.color}`]}>{theme.title}</span> website
          </p>
        </div>
      </div>

      <URLCheckerInput defaultURL={scanResult.domainName} updateURLCallback={updateScanResult} />
    </div>
  );
};
