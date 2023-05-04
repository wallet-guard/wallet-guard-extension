import React from 'react';
import { PhishingResponse, PhishingResult, Warning } from '../../../../models/PhishingResponse';
import styles from '../../ActionPopup.module.css';

interface PhishingTabContainerProps {
  scanResult: PhishingResponse;
}

export const PhishingTabContainer = (props: PhishingTabContainerProps) => {
  const { phishing } = props.scanResult;
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '340px',
      }}
    >
      <div
        style={{
          background: 'radial-gradient(88.3% 88.3% at 50% 95%, rgba(144, 255, 0, 0.5) 0%, rgba(0, 255, 122, 0) 100%)',
          filter: 'blur(50px)',
          width: '200px',
          height: '200px',
          zIndex: '-1',
          position: 'absolute',
        }}
      ></div>
      <img width="100px" src={logoPath} />
      <p className={styles.phishingResultHeader}>This is a Verified Website</p>
    </div>
  );
};
