import { RiskFactor, WarningType } from './simulation/Transaction';

export interface PhishingResponse {
  domainName: string;
  verified: boolean;
  recommendedAction: RecommendedAction;
  riskFactors: RiskFactor[] | null;
  status: 'IN_PROGRESS' | 'COMPLETE';
}

export enum RecommendedAction {
  Block = 'BLOCK',
  Warn = 'WARN',
  None = 'NONE',
}
