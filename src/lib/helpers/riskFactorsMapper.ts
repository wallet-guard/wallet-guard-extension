import { RiskFactor, WarningType } from '../../models/simulation/Transaction';

export function mapRiskFactorValue(riskFactor: RiskFactor): string {
  if (riskFactor.type === WarningType.RecentlyCreated) {
    const daysAgo = Math.round(parseFloat(riskFactor.value || '') / 24);
    return `Created ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  } else if (riskFactor.type === WarningType.MLInference) {
    return `Likely a phishing attempt on ${riskFactor.value}`;
  }

  return '';
}