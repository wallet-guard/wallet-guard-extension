import logger from './lib/logger';
import { StoredSimulation, StoredSimulationState, updateSimulationState } from './lib/simulation/storage';
import { clearOldSimulations, fetchSimulationAndUpdate, simulationNeedsAction } from './lib/simulation/storage';
import { RequestArgs } from './models/simulation/Transaction';
import { AlertHandler } from './lib/helpers/chrome/alertHandler';
import localStorageHelpers from './lib/helpers/chrome/localStorage';
import { PortMessage, BrowserMessageType, PortIdentifiers, BrowserMessage, findTransaction } from './lib/helpers/chrome/messageHandler';
import { openDashboard } from './lib/helpers/linkHelper';
import { domainHasChanged, getDomainNameFromURL } from './lib/helpers/phishing/parseDomainHelper';
import { Settings, WG_DEFAULT_SETTINGS } from './lib/settings';
import { AlertCategory, AlertDetail } from './models/Alert';
import { getCurrentSite } from './services/phishing/currentSiteService';
import { checkUrlForPhishing } from './services/phishing/phishingService';
import { checkAllWalletsAndCreateAlerts } from './services/http/versionService';
import { WgKeys } from './lib/helpers/chrome/localStorageKeys';
import * as Sentry from '@sentry/react';
import Browser from 'webextension-polyfill';

const log = logger.child({ component: 'Background' });
const approvedTxns: RequestArgs[] = [];

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
// TODO: MY old code did not use async. The RunSimulation function is async, so I need to make sure that this is working properly
chrome.runtime.onMessage.addListener(async (message: BrowserMessage, sender, sendResponse) => {
  if (message.type === BrowserMessageType.ProceedAnyway && 'url' in message) {
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
  } else if (message.type === BrowserMessageType.ApprovedTxn && 'data' in message) {
    approvedTxns.push(message.data);
  } else if (message.type === BrowserMessageType.RunSimulation && 'data' in message) {
    const args: RequestArgs = message.data;
    clearOldSimulations().then(() => fetchSimulationAndUpdate(args));
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

Browser.runtime.onConnect.addListener(async (remotePort: Browser.Runtime.Port) => {
  if (remotePort.name === PortIdentifiers.WG_CONTENT_SCRIPT) {
    remotePort.onMessage.addListener(contentScriptMessageHandler);
  }
});

const contentScriptMessageHandler = async (message: PortMessage, sourcePort: Browser.Runtime.Port) => {
  if (message.data.chainId !== '0x1' && message.data.chainId !== '1') return;

  // Check if the transaction was already simulated and confirmed
  const isApproved = findTransaction(approvedTxns, message.data);
  if (isApproved) return;

  // Wait for Metamask to popup first because otherwise Chrome will create both popups in the same coordinates
  await new Promise(resolve => setTimeout(resolve, 200));

  // Run the simulation
  clearOldSimulations().then(() => fetchSimulationAndUpdate(message.data));
};
