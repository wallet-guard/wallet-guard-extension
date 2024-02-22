import { SERVER_URL_PROD } from '../../lib/environment';
import { WgKeys } from '../../lib/helpers/chrome/localStorageKeys';
import * as httpClient from '../clients/httpClient';

type BlocklistResponse = {
  blocklist: string[];
}

async function fetchRequestsBlocklist(): Promise<string[] | null> {
  try {
    const request: BlocklistResponse = await (await httpClient.get(`${SERVER_URL_PROD}/v0/requests-blocklist`))?.json();
    return request.blocklist;
  } catch (e) {
    return null;
  }
}

export async function handleRequestsBlocklist() {
  const blocklistResponse = await fetchRequestsBlocklist();

  if (!blocklistResponse) return;

  chrome.storage.local.set({ [WgKeys.RequestsBlocklist]: blocklistResponse });
}
