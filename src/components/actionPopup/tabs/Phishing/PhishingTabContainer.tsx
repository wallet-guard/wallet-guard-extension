import React, { useState } from 'react';
import { PhishingResponse, PhishingResult, Warning } from '../../../../models/PhishingResponse';

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
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: 'radial-gradient(88.3% 88.3% at 50% 95%, rgba(144, 255, 0, 0.5) 0%, rgba(0, 255, 122, 0) 100%)',
          filter: 'blur(50px)',
          width: '200px',
          height: '200px',
          position: 'absolute',
        }}
      ></div>
      <img width="100px" src={logoPath} />
      <h4>This is a Verified Website</h4>
    </div>
  );
};
