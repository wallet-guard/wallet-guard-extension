import logger from './lib/logger';
import { REQUEST_COMMAND } from './lib/simulation/requests';
import { StoredSimulation, StoredSimulationState, updateSimulationState } from './lib/simulation/storage';
import { clearOldSimulations, fetchSimulationAndUpdate, simulationNeedsAction } from './lib/simulation/storage';
import { RequestArgs } from './models/simulation/Transaction';
import { AlertHandler } from './lib/helpers/chrome/alertHandler';
import localStorageHelpers from './lib/helpers/chrome/localStorage';
import { MessageType } from './lib/helpers/chrome/messageHandler';
import { openDashboard } from './lib/helpers/linkHelper';
import { domainHasChanged, getDomainNameFromURL } from './lib/helpers/phishing/parseDomainHelper';
import { Settings, WG_DEFAULT_SETTINGS } from './lib/settings';
import { AlertCategory, AlertDetail } from './models/Alert';
import { getCurrentSite } from './services/phishing/currentSiteService';
import { checkUrlForPhishing } from './services/phishing/phishingService';
import { checkAllWalletsAndCreateAlerts } from './services/http/versionService';
import { WgKeys } from './lib/helpers/chrome/localStorageKeys';
import * as Sentry from '@sentry/react';


// Note that these messages will be periodically cleared due to the background service shutting down
// after 5 minutes of inactivity (see Manifest v3 docs).
const messagePorts: { [index: string]: chrome.runtime.Port } = {};
const approvedMessages: string[] = [];

export enum WarningType {
  ALLOWANCE = 'allowance',
  LISTING = 'listing',
  HASH = 'hash',
  SUSPECTED_SCAM = 'suspected_scam',
}

export const AllowList = {
  ALLOWANCE: [] as string[],
  NFT_LISTING: ['opensea.io', 'www.genie.xyz', 'www.gem.xyz', 'looksrare.org', 'x2y2.io', 'blur.io'],
  HASH_SIGNATURE: ['opensea.io', 'www.genie.xyz', 'www.gem.xyz', 'looksrare.org', 'x2y2.io', 'unstoppabledomains.com'],
};

const log = logger.child({ component: 'Background' });

let currentPopup: undefined | number;

Sentry.init({
  dsn: 'https://d6ac9c557b4c4eee8b1d4224528f52b3@o4504402373640192.ingest.sentry.io/4504402378293248',
});

// Open Dashboard or Simulation Popup on toolbar click
chrome.action.onClicked.addListener(function (tab) {
  // Open the current simulation popup if one exists
  if (currentPopup && currentPopup !== -1) {
    chrome.windows.update(currentPopup, {
      focused: true,
    });
  } else {
    openDashboard('toolbar');
  }
});

// MESSAGING
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MessageType.ProceedAnyway) {
    const { url, permanent } = message;

    if (permanent) {
      const domainName = getDomainNameFromURL(url);

      // TODO: Need to set this up for new Server
      //incrementFalsePositiveCount(domainName);

      localStorageHelpers.get<string[]>(WgKeys.PersonalWhitelist).then((res) => {
        if (res) {
          const personalWhitelist = res;
          personalWhitelist.push(domainName);
          chrome.storage.local.set({ personalWhitelist }).then(() => {
            chrome.tabs.update({ url });
          });
        } else {
          chrome.storage.local
            .set({
              personalWhitelist: [domainName],
            })
            .then(() => {
              chrome.tabs.update({ url });
            });
        }
      });
    }
    return true; // need to return true here for async message passing
    // https://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
  }
});

// EXTENSION DETECTION
chrome.management.onInstalled.addListener(async (extensionInfo) => {
  const settings = await localStorageHelpers.get<Settings>(WgKeys.Settings);

  if (extensionInfo.installType === 'development' && settings?.maliciousExtensionDetection) {
    chrome.management.setEnabled(extensionInfo.id, false);
    const activityInfo = {
      name: 'Unpacked Extension Installed',
      category: AlertCategory.MaliciousExtension,
      details: `Disabled extension: ${extensionInfo.name}`,
      key: `extension:${extensionInfo.id}`,
    } as AlertDetail;
    AlertHandler.create(activityInfo);
    openDashboard('malicious_extension');
  }
});

// PHISHING DETECTION
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // some sites like exocharts trigger onUpdated events, but the url hasn't changed causing excessive function calls
  if (changeInfo?.url === undefined) return;

  const currentSite = await getCurrentSite();

  if (domainHasChanged(changeInfo.url, currentSite)) {
    await checkUrlForPhishing(tab);
  }
});

// ALARMS
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'checkVersions') {
    checkAllWalletsAndCreateAlerts();
  }
});

// INSTALLS / UPDATES
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // TODO: Signin Anonymously
  } else if (details.reason === 'update') {
    // TODO: Signin Anonymously
  }

  localStorageHelpers.get<Settings>(WgKeys.Settings).then((res) => {
    // if the user don't have any settings, set the default settings
    if (!res) {
      chrome.storage.local.set({ settings: WG_DEFAULT_SETTINGS });
    }
  });

  const ONE_DAY_AS_MINUTES = 1440;
  chrome.alarms.create('checkVersions', {
    delayInMinutes: 0,
    periodInMinutes: ONE_DAY_AS_MINUTES,
  });

  await checkAllWalletsAndCreateAlerts();

  if (process.env.NODE_ENV === 'production' && details.reason === 'install') {
    openDashboard('install');
  }
});

// STARTUP
chrome.runtime.onStartup.addListener(() => {
  // This is ran once per Startup and every 24h
  checkAllWalletsAndCreateAlerts();
});

// Remove Simulation Popup
chrome.windows.onRemoved.addListener((windowId: number) => {
  if (currentPopup && currentPopup === windowId) {
    currentPopup = undefined;
    localStorageHelpers.get<StoredSimulation[]>(WgKeys.Simulations).then((res) => {
      // Reject the simulation
      if (res && res.length > 0) {
        const id = res[0].id;
        updateSimulationState(id, StoredSimulationState.Rejected);
      }
    });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes['simulations']?.newValue) {
    const oldSimulations = changes['simulations'].oldValue;
    const newSimulations = changes['simulations'].newValue;

    const oldFiltered = oldSimulations?.filter((storedSimulation: StoredSimulation) => {
      return simulationNeedsAction(storedSimulation.state);
    });
    const newFiltered = newSimulations.filter((storedSimulation: StoredSimulation) => {
      return simulationNeedsAction(storedSimulation.state);
    });

    log.debug(
      {
        currentPopup,
        oldSimulations,
        newSimulations,
        oldFiltered,
        newFiltered,
      },
      'New storage values'
    );

    if (!currentPopup && (!oldFiltered || newFiltered.length > oldFiltered.length)) {
      // Indicate we're creating a popup so we don't have many.
      currentPopup = -1;

      chrome.windows
        .create({
          url: 'popup.html',
          type: 'popup',
          width: 420,
          height: 840,
        })
        .then((createdWindow) => {
          currentPopup = createdWindow?.id;
        });

      return;
    }

    if (newFiltered.length === 0 && oldFiltered.length === 1 && currentPopup && currentPopup !== -1) {
      const closeId = currentPopup;
      currentPopup = undefined;
      chrome.windows.remove(closeId);

      return;
    }

    // Let's send it to the front if it already exists
    if (currentPopup && currentPopup !== -1) {
      chrome.windows.update(currentPopup, {
        focused: true,
      });
    }
  }
});

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.command === REQUEST_COMMAND) {
    const args: RequestArgs = request.data;
    clearOldSimulations().then(() => fetchSimulationAndUpdate(args));
  } else {
    log.warn(request, 'Unknown command');
  }
});



const setupRemoteConnection = async (remotePort: any) => {
  remotePort.onMessage.addListener((message: any) => {
    processMessage(message, remotePort);
  });
};

chrome.runtime.onConnect.addListener(setupRemoteConnection);


const processMessage = async (message: any, remotePort: any) => {
  const popupCreated = await decodeMessageAndCreatePopupIfNeeded(message);

  // For bypassed messages we have no response to return
  if (message.data.bypassed) return;

  // If no popup was created, we respond positively to indicate that the request should go through
  if (!popupCreated) {
    remotePort.postMessage({ requestId: message.requestId, data: true });
    return;
  }

  // Store the remote port so the response can be sent back there
  messagePorts[message.requestId] = remotePort;
};

// Boolean result indicates whether a popup was created
const decodeMessageAndCreatePopupIfNeeded = async (message: any): Promise<boolean> => {
  if (approvedMessages.includes(message.requestId)) return false;

  const warningData = 'some warning'
  if (!warningData) return false;

  // const warningsTurnedOnForType = await getStorage('local', warningSettingKeys[warningData.type], true);
  // if (!warningsTurnedOnForType) return false;

  // const isAllowListed = AllowList[warningData.type].includes(warningData.hostname);
  // if (isAllowListed) return false;

  createWarningPopup(warningData);

  return true;
};

const calculatePopupPositions = (window: chrome.windows.Window, warningData: any) => {
  const width = 480;
  const height = calculatePopupHeight(warningData);

  const left = window.left! + Math.round((window.width! - width) * 0.5);
  const top = window.top! + Math.round((window.height! - height) * 0.2);

  return { width, height, left, top };
};

const calculatePopupHeight = (warningData: any) => {
  const lineHeight = 24;
  const baseHeight = 11 * lineHeight;
  const bypassHeight = warningData.bypassed ? lineHeight : 0;

  if (warningData.type === WarningType.ALLOWANCE) {
    return baseHeight + bypassHeight + 3 * lineHeight + warningData.assets.length * lineHeight;
  } else if (warningData.type === WarningType.LISTING) {
    const offerLines = warningData.listing.offer.length + 1;
    const considerationLines = warningData.listing.consideration.length + 1;
    return baseHeight + bypassHeight + offerLines * lineHeight + considerationLines * lineHeight;
  } else if (warningData.type === WarningType.SUSPECTED_SCAM) {
    return baseHeight + bypassHeight + 2 * lineHeight;
  }

  return baseHeight + bypassHeight;
};

const createWarningPopup = async (warningData: any) => {
  // Add a slight delay to prevent weird window positioning
  const delayPromise = new Promise((resolve) => setTimeout(resolve, 200));
  const [currentWindow] = await Promise.all([chrome.windows.getCurrent(), delayPromise]);
  const positions = calculatePopupPositions(currentWindow, warningData);

  const queryString = new URLSearchParams({ warningData: JSON.stringify(warningData) }).toString();
  chrome.windows
    .create({
      url: 'popup.html',
      type: 'popup',
      width: 420,
      height: 840,
    })
    .then((createdWindow) => {
      currentPopup = createdWindow?.id;
    });

  // Specifying window position does not work on Firefox, so we have to reposition after creation (6 y/o bug -_-).
  // Has no effect on Chrome, because the window position is already correct.
  // await chrome.windows.update(popupWindow.id!, positions);
};