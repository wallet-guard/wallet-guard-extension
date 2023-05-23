import React from 'react';
import styles from '../../ActionPopup.module.css';
import { AlertCategory, AlertType } from '../../../../models/Alert';
import { Badge } from '@chakra-ui/react';
import { WarningType } from '../../../../models/PhishingResponse';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export function PopupAlertsTable() {
  function mapStatusToColor(status: AlertType) {
    switch (status) {
      case 'CREATED_AT':
        return 'yellow';
      case WarningType.Blocklisted:
      case WarningType.Drainer:
      case WarningType.Similarity:
      case WarningType.Homoglyph:
      case WarningType.MLInference:
      case WarningType.RecentlyCreated: // todo: make this yellow/red depending on WarningLevel
      case WarningType.Malware:
      case AlertCategory.MaliciousExtension:
      // Legacy types
      case 'CHECK_DOMAIN_FOR_SIMILARITY':
      case 'UNICODE_SIMILARITY':
      case 'CHECK_WHITELIST':
      case 'OVERRIDE_LIST':
      case 'MALWARE':
      case 'BLOCKLIST_CONTAINS_URL':
        return 'red';
      case AlertCategory.News:
        return 'blue';
      case AlertCategory.WalletOutOfDate:
        return 'yellow';
      default:
        return 'blue';
    }
  }

  function mapCategory(category: AlertType) {
    switch (category) {
      case WarningType.Drainer:
        return 'Suspected wallet drainer';
      case WarningType.Blocklisted:
      case 'BLOCKLIST_CONTAINS_URL':
        return 'Known Phishing Website';
      case 'OVERRIDE_LIST':
        return 'Temporarily blocked';
      case WarningType.RecentlyCreated:
      case 'CREATED_AT':
        return 'Recently created domain';
      case WarningType.Malware:
      case 'MALWARE':
        return 'Malware Detected';
      case WarningType.Similarity:
      case 'CHECK_WHITELIST':
      case 'CHECK_DOMAIN_FOR_SIMILARITY':
        return 'Impersonation attempt';
      case AlertCategory.MaliciousExtension:
        return 'Potentially Malicious Extension';
      case WarningType.MLInference:
        return 'Suspicious website';
      case WarningType.Homoglyph:
      case 'UNICODE_SIMILARITY':
        return 'Homoglyph attack';
      case AlertCategory.News:
        return 'News';
      case AlertCategory.WalletOutOfDate:
        return 'Wallet out of date';
    }
  }

  return (
    <>
      <div className={styles['alerts-row']}>
        <div className={styles['alerts-row-header']}>
          <p style={{ marginBottom: '0px' }}>4/21/2023</p>
          {/* <p>Suspicious Site Blocked</p> */}
          <Badge colorScheme={mapStatusToColor(WarningType.Similarity)}>{mapCategory('BLOCKLIST_CONTAINS_URL')}</Badge>
        </div>

        <div className={styles['alerts-row-detail']}>
          <p style={{ marginBottom: '0px' }}>c0inbase.com</p>
          <AiOutlineExclamationCircle />
        </div>
      </div>
    </>
  );
}
