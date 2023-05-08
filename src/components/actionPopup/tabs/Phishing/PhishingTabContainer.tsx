import React, { useEffect, useState } from 'react';
import { PhishingResponse, PhishingResult, Warning } from '../../../../models/PhishingResponse';
import styles from '../../ActionPopup.module.css';
import { URLCheckerInput } from './CheckUrl';
import { getCurrentSite } from '../../../../services/phishing/currentSiteService';
import { posthog } from 'posthog-js';
import { add3Dots } from '../../../app-dashboard/tabs/extensions/ExtensionsTab';

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

export const PhishingTabContainer = () => {
  const [url, setURL] = useState('');
  const [phishingResult, setPhishing] = useState(PhishingResult.NotPhishing);
  const [verified, setVerified] = useState(false);
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    getCurrentSite().then((response) => {
      setURL(response.input);
      setPhishing(response.phishing);
      setVerified(response.verified);

      posthog.capture('open toolbar popup', {
        response,
      });
    });
  }, []);

  useEffect(() => {
    if (verified) {
      // todo: get special theme
    } else {
      const theme = getTheme(phishingResult);
      setTheme(theme);
    }
  }, [url]);

  function getTheme(result: PhishingResult) {
    switch (result) {
      case PhishingResult.NotPhishing:
        return {
          color: 'green',
          title: 'verified',
          logoPath: '/images/popup/actionPopup/app_icons/secure.png',
        } as PhishingTabTheme;
      case PhishingResult.Phishing:
        return {
          color: 'red',
          title: 'malicious',
          logoPath: '/images/popup/actionPopup/app_icons/malicious.png',
        } as PhishingTabTheme;
      case PhishingResult.Unknown:
        return {
          color: 'gray',
          title: 'unknown',
          logoPath: '/images/popup/actionPopup/app_icons/unknown.png',
        } as PhishingTabTheme;
    }
  }

  function updateScanResult(result: PhishingResponse) {
    setURL(result.input);
    setPhishing(result.phishing);
    setVerified(result.verified);
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
            Current URL: <span className={styles[`text-${theme.color}`]}>{add3Dots(url, 30)}</span>
          </p>
          <img src="images/popup/actionPopup/divider.png" />
          <p className={styles.phishingResultHeader}>
            This is a <span className={styles[`text-${theme.color}`]}>{theme.title}</span> website
          </p>
        </div>
      </div>

      <URLCheckerInput updateURLCallback={updateScanResult} />
    </div>
  );
};
