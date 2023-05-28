import { WalletType, supportedWallets } from '../../lib/config/features';
import { SERVER_URL_PROD } from '../../lib/environment';
import { AlertHandler } from '../../lib/helpers/chrome/alertHandler';
import localStorageHelpers from '../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../lib/helpers/chrome/localStorageKeys';
import { capitalizeFirstLetter } from '../../lib/helpers/stringUtil';
import { Settings } from '../../lib/settings';
import { AlertCategory, AlertDetail } from '../../models/Alert';
import { WalletInfo } from '../../models/VersionChecker';
import * as httpClient from '../clients/httpClient';

export interface VersionCheckResponse {
  version: string;
  lastCheckedAt: string; // ISO string in UTC time
}

async function getVersion(wallet: WalletType): Promise<string | null> {
  try {
    const request: VersionCheckResponse = await (await httpClient.get(`${SERVER_URL_PROD}/version/${wallet}`))?.json();
    return request.version;
  } catch (e) {
    return null;
  }
}

async function checkWallet(wallet: WalletType) {
  let local: string | null = null;
  const latest = await getVersion(wallet);

  let extensionId = supportedWallets[wallet];

  try {
    local = (await chrome.management.get(extensionId))?.version || null;
  } catch (e) {
    console.warn(e);
  }

  const walletInfo: WalletInfo = {
    name: wallet,
    localVersion: local,
    latestVersion: latest,
    lastCheckedAt: Date.now()
  };

  chrome.storage.local.set({ [wallet]: walletInfo });

  return walletInfo;
}

// todo: move this to a separate helper file?
export async function checkAllWalletsAndCreateAlerts() {
  const supported = Object.keys(supportedWallets);
  const expiredWallets: WalletInfo[] = [];

  for (let wallet of supported) {
    const walletCheck = await checkWallet(wallet as WalletType);
    const settings = await localStorageHelpers.get<Settings>(WgKeys.Settings);
    const isMuted = settings?.walletVersionNotifications

    if (
      walletCheck.localVersion &&
      walletCheck.latestVersion &&
      walletCheck.localVersion !== walletCheck.latestVersion &&
      isMuted !== false
    ) {
      expiredWallets.push(walletCheck);
    }
  }

  if (expiredWallets.length > 0) {
    chrome.storage.local.set({ expiredWallets });
    expiredWallets.forEach(wallet => {
      AlertHandler.create({
        name: `${capitalizeFirstLetter(wallet.name)} Version`,
        category: AlertCategory.WalletOutOfDate,
        details: 'View the update guide for more info',
        link: 'https://www.walletguard.app/blog/how-to-update-browser-extensions',
        key: `${wallet.name}:${wallet.latestVersion}`
      } as AlertDetail);
    });
  }
}