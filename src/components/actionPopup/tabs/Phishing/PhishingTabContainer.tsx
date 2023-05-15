import React, { useEffect, useState } from 'react';
import { PhishingResponse, PhishingResult, Warning } from '../../../../models/PhishingResponse';
import styles from '../../ActionPopup.module.css';
import { URLCheckerInput } from './CheckUrl';
import { getCurrentSite } from '../../../../services/phishing/currentSiteService';
import { posthog } from 'posthog-js';
import { add3Dots } from '../../../app-dashboard/tabs/extensions/ExtensionsTab';
import { CDN_URL_PROD } from '../../../../lib/environment';

type ThemeColors = 'green' | 'red' | 'orange' | 'gray' | 'blue'; // todo: add the rest
interface PhishingTabTheme {
  color: ThemeColors;
  title: string;
  logoPath: string;
}

const defaultTheme: PhishingTabTheme = {
  color: 'green',
  title: 'verified',
  logoPath: '/images/popup/actionPopup/secure.png',
};

interface SpecialTheme {
  name: string;
  logo: string;
  color: ThemeColors;
}

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
    async function fetchSpecialTheme() {
      const response = await fetch(CDN_URL_PROD + url + '.json');
      const data: SpecialTheme = await response.json();
      setTheme({ color: data.color, title: 'verified', logoPath: data.logo });
    }

    if (verified) {
      fetchSpecialTheme();
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
      case PhishingResult.Suspicious:
        return {
          color: 'orange',
          title: 'suspicious',
          logoPath: '/images/popup/actionPopup/app_icons/suspicious.png',
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
        <img width={'100px'} style={{ marginTop: '20px', marginBottom: '20px' }} src={theme.logoPath} />
        <div className={styles.centeredContainer}>
          <p className={styles.currentURL}>
            Current URL: <span className={styles[`text-${theme.color}`]}>{add3Dots(url, 30)}</span>
          </p>
          <img src="images/popup/actionPopup/divider.png" />
          {/* TODO: add classes for suspicious and unknown here */}
          <p className={styles.phishingResultHeader}>
            This is a <span className={styles[`text-${theme.color}`]}>{theme.title}</span> website
          </p>
        </div>
      </div>

      <URLCheckerInput updateURLCallback={updateScanResult} />
    </div>
  );
};
