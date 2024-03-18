import { SERVER_URL_PROD_V1 } from '../../lib/environment';
import { PhishingResponse } from '../../models/PhishingResponse';
import * as httpClient from '../clients/httpClient';

export async function domainScan(url: string): Promise<PhishingResponse | null> {
  const MAX_RETRIES = 3;
  let attempt = 0;
  let lastJson: PhishingResponse | null = null;

  while (attempt < MAX_RETRIES) {
    try {
      const res = await httpClient.get(`${SERVER_URL_PROD_V1}/scan?url=${url}`);
      const json: PhishingResponse = await res?.json();

      // Update lastJson on each successful fetch, whether or not status is IN_PROGRESS
      lastJson = json;

      if (json && json.status !== 'IN_PROGRESS') {
        return json; // If scan is reaches completion state, return the result immediately
      }
    } catch (e) {
      console.error('unable to fetch phishing result', e);
      return lastJson;
    }

    attempt++;
    if (attempt < MAX_RETRIES) await sleep(20000);
  }

  return lastJson;
}

// Create a promise for the timer
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
