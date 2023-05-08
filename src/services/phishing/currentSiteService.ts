import localStorageHelpers from '../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../lib/helpers/chrome/localStorageKeys';
import { setIcon } from '../../lib/helpers/util';
import { PhishingResponse, PhishingResult } from '../../models/PhishingResponse';

export async function getCurrentSite(): Promise<PhishingResponse> {
  const currentSiteCheck = await localStorageHelpers.get<PhishingResponse>(WgKeys.CurrentSite);
  const defaultCurrentSite: PhishingResponse = {
    domainName: '',
    phishing: PhishingResult.Unknown,
    warnings: null,
    verified: false,
    status: '',
    input: '',
  };

  return currentSiteCheck ?? defaultCurrentSite;
}

export function skippedPDSVerified(URL: string) {
  const defaultCurrentSite: PhishingResponse = {
    domainName: URL,
    phishing: PhishingResult.NotPhishing,
    warnings: null,
    verified: false,
    status: '',
    input: URL,
  };

  return defaultCurrentSite;
}

export async function setCurrentSite(scanResult: PhishingResponse | null, currentURL: string) {
  if (!scanResult) {
    scanResult = {
      domainName: currentURL,
      phishing: PhishingResult.Unknown,
      warnings: null,
      verified: false,
      status: '',
      input: currentURL
    };
  }

  chrome.storage.local.set({
    [WgKeys.CurrentSite]: {
      ...scanResult,
      input: currentURL
    } as PhishingResponse
  });
  setIcon(scanResult.phishing);
}