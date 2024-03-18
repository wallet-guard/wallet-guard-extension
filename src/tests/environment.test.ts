import { SERVER_URL_PROD, SERVER_URL_PROD_V1 } from '../lib/environment';

describe('environment URLs', () => {
  it('Verify V0 Server Base URL', () => {
    expect(SERVER_URL_PROD).toEqual('https://api.walletguard.app/extension/v0');
  });
  it('Verify V1 Server Base URL', () => {
    expect(SERVER_URL_PROD_V1).toEqual('https://api.walletguard.app/extension/v1');
  });
});