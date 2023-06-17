import { Heading } from '@chakra-ui/react';
import React from 'react';
import { AlertCategory, AlertType } from '../../../../../models/Alert';
import { WarningType } from '../../../../../models/PhishingResponse';

interface Warning {
  type: AlertType;
  warningsCount: number;
}

const UnreadAlertComponent = (props: Warning) => {
  const { type, warningsCount } = props;
  const warningText = mapCategory(type);

  function mapCategory(category: AlertType) {
    switch (category) {
      case WarningType.Blocklisted:
      case WarningType.Drainer:
      case WarningType.RecentlyCreated:
      case WarningType.Malware:
      case 'BLOCKLIST_CONTAINS_URL':
      case 'OVERRIDE_LIST':
      case 'MALWARE':
        return "We've identified a malicious website. Remember to always stay security conscious while browsing web3.";
      case WarningType.Similarity:
      case WarningType.Homoglyph:
      case WarningType.MLInference:
      case 'CHECK_WHITELIST':
      case 'UNICODE_SIMILARITY':
      case 'CREATED_AT':
      case 'CHECK_DOMAIN_FOR_SIMILARITY':
        return "We've identified a possible malicious website. Remember to always stay security conscious while browsing web3.";
      case AlertCategory.MaliciousExtension:
        return 'We detected a possible malicious extension installation on your browser. Please visit the Alerts tab for more information.';
      case AlertCategory.News:
        return "We've identified a critical web3 threat for you to be aware of. Please visit the Alerts tab for more information.";
      case AlertCategory.WalletOutOfDate:
        return 'One or more of your wallets may be out of date. Please visit the Alert History for more information.';
    }
  }

  return (
    <>
      <div className="row">
        <Heading as="h1" size="xl" style={{ paddingLeft: '25px' }}>
          You have{' '}
          <span style={{ color: 'orange' }}>
            {props.warningsCount} unread {warningsCount === 1 ? 'alert' : 'alerts'}
          </span>
        </Heading>
      </div>
      <div className="row">
        <div className="col-12" style={{ paddingLeft: '25px' }}>
          <p style={{ paddingTop: '3%' }}>{warningText}</p>
        </div>
      </div>
    </>
  );
};

export default UnreadAlertComponent;
