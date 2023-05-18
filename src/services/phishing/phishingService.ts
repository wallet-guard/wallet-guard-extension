import { AlertHandler } from '../../lib/helpers/chrome/alertHandler';
import localStorageHelpers from '../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../lib/helpers/chrome/localStorageKeys';
import { getDomainNameFromURL } from '../../lib/helpers/phishing/parseDomainHelper';
import { urlIsPhishingWarning } from '../../lib/helpers/util';
import { Settings } from '../../lib/settings';
import { AlertDetail } from '../../models/Alert';
import { PhishingResult, WarningLevel, WarningType } from '../../models/PhishingResponse';
import { domainScan } from '../http/domainScan';
import { setCurrentSite, skippedPDSVerified } from './currentSiteService';

export async function checkUrlForPhishing(tab: chrome.tabs.Tab) {
  const url: string = tab.url || '';
  // do not do a check if we are already on this page
  if (!url || urlIsPhishingWarning(url)) {
    const currentSite = skippedPDSVerified(url);
    setCurrentSite(currentSite, url);
    return;
  }

  const domainName = getDomainNameFromURL(url);
  const personalWhitelist = await localStorageHelpers.get<string[]>(WgKeys.PersonalWhitelist);
  // do not scan if domain is on personal whitelist
  if (personalWhitelist?.includes(domainName)) {
    const currentSite = skippedPDSVerified(url);
    setCurrentSite(currentSite, url);
    return;
  }

  // do not scan if domain is browser native page
  if (hasBrowserPrefix(url)) {
    const currentSite = skippedPDSVerified(url);
    setCurrentSite(currentSite, url);
    return;
  }

  const pdsResponse = await domainScan(url);
  setCurrentSite(pdsResponse, url);

  // Check settings to make sure 
  const settings = await localStorageHelpers.get<Settings>(WgKeys.Settings);

  // phishingDetectionEnabled is a new key, therefore we need to set it to a default
  // TODO: Remove this after everyone has received the the update
  if (settings && settings.phishingDetectionEnabled === undefined) {
    const newSettings: Settings = {
      ...settings,
      phishingDetectionEnabled: true
    };
    chrome.storage.local.set({ [WgKeys.Settings]: newSettings });
  }

  const phishingDetectionEnabled = settings &&
    (settings.phishingDetectionEnabled === undefined || settings.phishingDetectionEnabled === true);

  if (phishingDetectionEnabled && pdsResponse?.phishing === PhishingResult.Phishing) {
    const recentlyCreatedWarning = pdsResponse.warnings?.find(warning => warning.type === WarningType.RecentlyCreated);
    if (recentlyCreatedWarning) {
      const daysSinceCreated = Math.round(parseFloat(recentlyCreatedWarning.value) / 24);

      if (recentlyCreatedWarning.level === WarningLevel.Critical) {
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
      } else if (recentlyCreatedWarning.level === WarningLevel.High) {
        chrome.notifications.create('', {
          title: 'Suspicious Activity Detected',
          message: `This website was updated ${daysSinceCreated} days ago.\nPlease proceed with caution and double-check any approval requests`,
          iconUrl: '../images/wg_logos/Logo-Large-Transparent.png', // todo: check if dimensions need to be 128x128 & that this looks good
          type: 'basic'
        });
      }
    }

    const drainerWarning = pdsResponse.warnings?.find(warning => warning.type === WarningType.Drainer);
    const similarityWarning = pdsResponse.warnings?.find(warning => warning.type === WarningType.Similarity);
    const homoglyphWarning = pdsResponse.warnings?.find(warning => warning.type === WarningType.Homoglyph);
    const mlWarning = pdsResponse.warnings?.find(warning => warning.type === WarningType.MLInference);
    const blocklistWarning = pdsResponse.warnings?.find(warning => warning.type === WarningType.Blocklisted);
    if (drainerWarning || similarityWarning || homoglyphWarning || mlWarning || blocklistWarning) {
      const safeURL = similarityWarning?.value || homoglyphWarning?.value || mlWarning?.value || 'null';
      const reason = drainerWarning?.type || similarityWarning?.type || homoglyphWarning?.type || mlWarning?.type || blocklistWarning?.type || 'null';
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
      category: pdsResponse.warnings && pdsResponse.warnings[0].type,
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