import { mapRiskFactorValue } from '../lib/helpers/riskFactorsMapper';
import { RiskFactor, Severity, WarningType } from '../models/simulation/Transaction';

describe('mapRiskFactorValue', () => {
  it('handles recently created', () => {
    const riskFactor: RiskFactor = {
      type: WarningType.RecentlyCreated,
      severity: Severity.High,
      value: '24',
      message: ''
    };

    const output = mapRiskFactorValue(riskFactor);
    expect(output).toEqual('Created 1 day ago');
    expect(output.length).toBeLessThan(40);
  });

  it('handles recently created multiple days', () => {
    const riskFactor: RiskFactor = {
      type: WarningType.RecentlyCreated,
      severity: Severity.High,
      value: '50',
      message: ''
    };

    const output = mapRiskFactorValue(riskFactor);
    expect(output).toEqual('Created 2 days ago');
    expect(output.length).toBeLessThan(40);
  });

  it('handles similarity', () => {
    const riskFactor: RiskFactor = {
      type: WarningType.MLInference,
      severity: Severity.High,
      value: 'opensea.io',
      message: ''
    };

    const output = mapRiskFactorValue(riskFactor);
    expect(output).toEqual('Likely a phishing attempt on opensea.io');
    expect(output.length).toBeLessThan(40);
  });
});