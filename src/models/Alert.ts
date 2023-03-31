import { WarningType } from './PhishingResponse';

export type AlertType = WarningType | AlertCategory | PHISHING_REASON;

export interface AlertDetail {
  key: string; // uuid or walletName:latestVersion
  name: string;
  category: AlertType;
  details: string;
  link?: string;
  createdAt: string | number;
  data?: any;
}

export enum AlertCategory {
  WalletOutOfDate = 'WALLET_OUT_OF_DATE',
  News = 'NEWS',
  MaliciousExtension = 'MALICIOUS_EXTENSION'
}

// Legacy phishing detection reasons for backward compatability
export type PHISHING_REASON = 'CREATED_AT' | 'CHECK_DOMAIN_FOR_SIMILARITY' | 'MALWARE' | 'UNICODE_SIMILARITY' | 'BLOCKLIST_CONTAINS_URL' | 'CHECK_WHITELIST' | 'OVERRIDE_LIST';
