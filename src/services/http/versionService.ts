import { WalletType, supportedWallets } from '../../lib/config/features';
import { SERVER_URL_PROD } from '../../lib/environment';
import { AlertHandler } from '../../lib/helpers/chrome/alertHandler';
import { capitalizeFirstLetter } from '../../lib/helpers/stringUtil';
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
    id: extensionId,
    localVersion: local,
    latestVersion: latest,
    lastCheckedAt: Date.now()
  };

  return walletInfo;
}

// todo: move this to a separate helper file?
export async function checkAllWalletsAndCreateAlerts() {
  const supported = Object.keys(supportedWallets);
  const expiredWallets: WalletInfo[] = [];

  for (let wallet of supported) {
    const walletCheck = await checkWallet(wallet as WalletType);

    if (
      walletCheck.localVersion &&
      walletCheck.latestVersion &&
      walletCheck.localVersion !== walletCheck.latestVersion
    ) {
      expiredWallets.push(walletCheck);
    }
  }

  if (expiredWallets.length > 0) {
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

// TODO: make this a Promise.all in the future - it may be slow if you have a lot of wallets
export async function fetchAllWallets() {
  const supported = Object.keys(supportedWallets);
  const wallets: WalletInfo[] = [];

  for (let wallet of supported) {
    const walletCheck = await checkWallet(wallet as WalletType);
    wallets.push(walletCheck);
  }

  return wallets;
}