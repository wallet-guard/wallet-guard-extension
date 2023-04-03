import { PDS_SERVER_URL_PROD, TAS_SERVER_URL_PROD, EDS_URL_PROD } from '../lib/environment';

describe('environment URLs', () => {
  it('Verify PDS base URL', () => {
    expect(PDS_SERVER_URL_PROD).toEqual('https://walletguard-phishing-detection-service-prod.com');
  });

  it('Verify TAS base URL', () => {
    expect(TAS_SERVER_URL_PROD).toEqual('https://walletguard-transaction-analysis-service-prod.com');
  });

  it('Verify EDS base URL', () => {
    expect(EDS_URL_PROD).toEqual('https://bkep3tnrs3.us-east-2.awsapprunner.com');
  });
});