import React from 'react';
import { URLCheckerInput } from './CheckUrl';
import { PhishingTabContainer } from './PhishingTabContainer';
import { PhishingResult } from '../../../../models/PhishingResponse';

export const PhishingTab = () => {
  return (
    <>
      <PhishingTabContainer
        scanResult={{ phishing: PhishingResult.NotPhishing, domainName: '', warnings: [], verified: true }}
      />
      <URLCheckerInput />
    </>
  );
};
