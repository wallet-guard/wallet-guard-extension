import React from 'react';
import { PhishingResponse, PhishingResult, Warning } from '../../../../models/PhishingResponse';
import styles from '../../ActionPopup.module.css';
import { URLCheckerInput } from './CheckUrl';

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
    <div className={styles.popupContent}>
      {/* <div
          style={{
            background: 'radial-gradient(88.3% 88.3% at 50% 95%, rgba(144, 255, 0, 0.5) 0%, rgba(0, 255, 122, 0) 100%)',
            filter: 'blur(50px)',
            width: '200px',
            height: '200px',
            zIndex: '-1',
            position: 'absolute',
          }}
        ></div> */}
      <div className={styles.popupContent}>
        <img width="100px" src={logoPath} />
        <p className={styles.phishingResultHeader}>This is a Verified Website</p>
      </div>

      <URLCheckerInput />
    </div>
  );
};
