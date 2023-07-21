import { AlertHandler } from '../../lib/helpers/chrome/alertHandler';
import localStorageHelpers from '../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../lib/helpers/chrome/localStorageKeys';
import { getDomainNameFromURL } from '../../lib/helpers/phishing/parseDomainHelper';
import { urlIsPhishingWarning } from '../../lib/helpers/util';
import { AlertDetail } from '../../models/Alert';
import { PhishingResult } from '../../models/PhishingResponse';
import { RiskFactor, Severity, WarningType } from '../../models/simulation/Transaction';
import { domainScan } from '../http/domainScan';

export async function checkUrlForPhishing(tab: chrome.tabs.Tab) {
  const url: string = tab.url || '';
  // do not do a check if we are already on this page
  if (urlIsPhishingWarning(url)) return;

  const domainName = getDomainNameFromURL(url);
  const personalWhitelist = await localStorageHelpers.get<string[]>(WgKeys.PersonalWhitelist);
  // do not scan if domain is on personal whitelist
  if (personalWhitelist?.includes(domainName)) return;

  // do not scan if domain is browser native page
  if (hasBrowserPrefix(url)) return;

  const pdsResponse = await domainScan(url);
  chrome.storage.local.set({ currentSite: pdsResponse });

  const recentlyCreatedWarning = pdsResponse?.riskFactors?.find(warning => warning.type === WarningType.RecentlyCreated);
  if (recentlyCreatedWarning) {
    const daysSinceCreated = Math.round(parseFloat(recentlyCreatedWarning.value) / 24);

    if (recentlyCreatedWarning.severity === Severity.Critical) {
      chrome.tabs.update(tab.id || chrome.tabs.TAB_ID_NONE, {
        url:
          chrome.runtime.getURL('phish.html') +
          '?safe=' +
          'null' +
          '&proceed=' +
          tab.url +
          '&reason=' +
          recentlyCreatedWarning.type,
      });
    } else if (recentlyCreatedWarning.severity === Severity.High) {
      chrome.notifications.create('', {
        title: 'Suspicious Activity Detected',
        message: `This website was updated ${daysSinceCreated} days ago.\nPlease proceed with caution and double-check any approval requests`,
        iconUrl: '../images/wg_logos/Logo-Large-Transparent.png', // todo: check if dimensions need to be 128x128 & that this looks good
        type: 'basic'
      });
    }

    const shouldBlock = pdsResponse?.phishing === PhishingResult.Phishing;
    const criticalRiskFactor: RiskFactor | undefined = pdsResponse?.riskFactors?.find(warning => warning.severity === Severity.Critical);

    if (shouldBlock && criticalRiskFactor) {
      const safeURL = criticalRiskFactor.value || 'null';
      const reason = criticalRiskFactor.type || 'null';

      chrome.tabs.update(tab.id || chrome.tabs.TAB_ID_NONE, {
        url:
          chrome.runtime.getURL('phish.html') +
          '?safe=' +
          safeURL +
          '&proceed=' +
          tab.url +
          '&reason=' +
          reason,
      });
    }

    const activityInfo = {
      name: 'Suspicious Site Detected',
      category: criticalRiskFactor?.type,
      details: `${tab.url}`,
      key: `${new Date()}`,
    } as AlertDetail;

    AlertHandler.create(activityInfo);
  }
}


function hasBrowserPrefix(input: string): boolean {
  const isChrome = input.startsWith('chrome://') || input.startsWith('chrome-extension://');
  const isBrave = input.startsWith('brave://');
  const isEdge = input.startsWith('edge://') || input.startsWith('about:blank');
  const isLocalhost = input.startsWith('localhost:') || input.startsWith('http://localhost:');
  const isFile = input.startsWith('file://');

  if (isChrome || isBrave || isEdge || isLocalhost || isFile) {
    return true;
  }

  return false;
}