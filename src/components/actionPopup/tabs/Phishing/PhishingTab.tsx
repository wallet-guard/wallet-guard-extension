import React from 'react';
import { PhishingTabContainer } from './PhishingTabContainer';
import { PhishingResult } from '../../../../models/PhishingResponse';

// TODO: Integrate current site service here
export const PhishingTab = () => {
  return (
    <PhishingTabContainer
      scanResult={{
        phishing: PhishingResult.NotPhishing,
        domainName: 'youtube.com',
        warnings: [],
        verified: true,
        complete: true,
      }}
    />
  );
};
