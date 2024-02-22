import { RiskFactor, WarningType } from './simulation/Transaction';

export interface PhishingResponse {
  domainName: string;
  verified: boolean;
  recommendedAction: RecommendedAction;
  riskFactors: RiskFactor[] | null;
  status: 'IN_PROGRESS' | 'COMPLETE';
}

export interface Warning {
  level: WarningLevel;
  type: WarningType;
  value: string;
}

export enum WarningLevel {
  Info = 'INFO',
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
  Critical = 'CRITICAL',
}

export enum RecommendedAction {
  Block = 'BLOCK',
  Warn = 'WARN',
  None = 'NONE',
}
