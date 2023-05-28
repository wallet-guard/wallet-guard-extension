import { SERVER_URL_PROD } from '../lib/environment';

describe('environment URLs', () => {
  it('Verify Server Base URL', () => {
    expect(SERVER_URL_PROD).toEqual('https://api.walletguard.app/extension/v0');
  });
});