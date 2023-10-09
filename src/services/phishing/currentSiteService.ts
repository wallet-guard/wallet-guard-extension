import localStorageHelpers from '../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../lib/helpers/chrome/localStorageKeys';
import { PhishingResponse, PhishingResult } from '../../models/PhishingResponse';

export async function getCurrentSite(): Promise<PhishingResponse> {
  const currentSiteCheck = await localStorageHelpers.get<PhishingResponse | null>(WgKeys.CurrentSite);
  const defaultCurrentSite: PhishingResponse = {
    domainName: '',
    phishing: PhishingResult.Unknown,
    warnings: null,
    verified: false,
    riskFactors: null,
    status: 'COMPLETE'
  };

  return currentSiteCheck ?? defaultCurrentSite;
}
