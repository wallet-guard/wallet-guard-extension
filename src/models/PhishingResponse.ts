import { RiskFactor, WarningType } from './simulation/Transaction';

export interface PhishingResponse {
  domainName: string;
  phishing: PhishingResult;
  warnings: Warning[] | null; // Deprecated in favor of riskFactors
  verified: boolean;
  riskFactors: RiskFactor[] | null;
  status: 'IN_PROGRESS' | 'COMPLETE';
}


export interface Warning {
  level: WarningLevel;
  type: WarningType;
  value: string;
}

export enum WarningLevel {
  Info = "INFO",
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Critical = "CRITICAL"
}

export enum PhishingResult {
  Phishing = "PHISHING",
  NotPhishing = "NOT_PHISHING",
  Unknown = "UNKNOWN"
}
