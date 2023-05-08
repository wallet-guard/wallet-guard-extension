import { PDS_SERVER_URL_PROD } from '../../lib/environment';
import { PhishingResponse } from '../../models/PhishingResponse';
import * as httpClient from '../clients/httpClient';

export async function domainScan(url: string): Promise<PhishingResponse | null> {
  try {
    const res = await httpClient.get(`${PDS_SERVER_URL_PROD}/scan?url=${url}`);

    if (!res?.ok) {
      console.error("bad status code from PDS", res?.status)
      return null;
    }

    const json: PhishingResponse = (await res?.json()) || null;
    return json;
  } catch (e) {
    console.error('unable to fetch phishing result', e);
    return null;
  }
}
