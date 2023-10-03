import logger from './lib/logger';
import { StoredSimulation, StoredSimulationState, updateSimulationAction } from './lib/simulation/storage';
import { clearOldSimulations, fetchSimulationAndUpdate, simulationNeedsAction } from './lib/simulation/storage';
import { TransactionArgs } from './models/simulation/Transaction';
import { AlertHandler } from './lib/helpers/chrome/alertHandler';
import localStorageHelpers from './lib/helpers/chrome/localStorage';
import {
  PortMessage,
  BrowserMessageType,
  PortIdentifiers,
  BrowserMessage,
  findApprovedTransaction,
  ProceedAnywayMessageType,
  ApprovedTxnMessageType,
  RunSimulationMessageType,
  DashboardMessageBody,
  DashboardMessageCommands,
  isValidExtensionSettings,
} from './lib/helpers/chrome/messageHandler';
import { openDashboard } from './lib/helpers/linkHelper';
import { domainHasChanged, getDomainNameFromURL } from './lib/helpers/phishing/parseDomainHelper';
import { ExtensionSettings, WG_EXTENSION_DEFAULT_SETTINGS } from './lib/settings';
import { AlertCategory, AlertDetail } from './models/Alert';
import { getCurrentSite } from './services/phishing/currentSiteService';
import { checkUrlForPhishing } from './services/phishing/phishingService';
import { checkAllWalletsAndCreateAlerts, fetchAllWallets } from './services/http/versionService';
import { WgKeys } from './lib/helpers/chrome/localStorageKeys';
import * as Sentry from '@sentry/react';
import Browser from 'webextension-polyfill';
import { SUPPORTED_CHAINS } from './lib/config/features';

const log = logger.child({ component: 'Background' });
const approvedTxns: TransactionArgs[] = [];

let currentPopup: undefined | number;
let currentChatWeb3Popup: undefined | number;

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
chrome.runtime.onMessage.addListener((message: BrowserMessage, sender, sendResponse) => {
  if (message.type === BrowserMessageType.ProceedAnyway) {
    const { url, permanent } = message as ProceedAnywayMessageType;

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
  } else if (message.type === BrowserMessageType.ApprovedTxn) {
    const { data } = message as ApprovedTxnMessageType;
    approvedTxns.push(data);
  } else if (message.type === BrowserMessageType.RunSimulation) {
    const { data } = message as RunSimulationMessageType;
    clearOldSimulations().then(() => fetchSimulationAndUpdate(data));
  }
});

// EXTENSION DETECTION
chrome.management.onInstalled.addListener(async (extensionInfo) => {
  const settings = await localStorageHelpers.get<ExtensionSettings>(WgKeys.ExtensionSettings);

  if (extensionInfo.installType === 'development' && settings?.maliciousExtensionDetection) {
    chrome.management.setEnabled(extensionInfo.id, false);
    const activityInfo = {
      name: 'Unpacked Extension Installed',
      category: AlertCategory.MaliciousExtension,
      details: `Disabled extension: ${extensionInfo.name}`,
      key: `extension:${extensionInfo.id}`,
      data: extensionInfo,
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

  localStorageHelpers.get<ExtensionSettings>(WgKeys.ExtensionSettings).then((res) => {
    // if the user don't have any settings, set the default settings
    if (!res) {
      chrome.storage.local.set({ [WgKeys.ExtensionSettings]: WG_EXTENSION_DEFAULT_SETTINGS });
    }
  });

  chrome.runtime.setUninstallURL('https://dashboard.walletguard.app/uninstall');

  const ONE_DAY_AS_MINUTES = 1440;
  chrome.alarms.create('checkVersions', {
    delayInMinutes: 0,
    periodInMinutes: ONE_DAY_AS_MINUTES,
  });

  await checkAllWalletsAndCreateAlerts();

  if (process.env.NODE_ENV === 'production' && details.reason === 'install') {
    openDashboard('install');
  }

  // Create a context menu item
  chrome.contextMenus.create({
    id: 'ask-chatweb3',
    title: 'Ask ChatWeb3',
    contexts: ['all'],
  });
});

// STARTUP
chrome.runtime.onStartup.addListener(() => {
  // This is ran once per Startup and every 24h
  checkAllWalletsAndCreateAlerts();
});

// Reject the current transaction if we close the simulation popup
chrome.windows.onRemoved.addListener(async (windowId: number) => {
  if (currentPopup === windowId) {
    localStorageHelpers.get<StoredSimulation[]>(WgKeys.Simulations).then((res) => {
      // Reject the simulation
      if (res && res.length > 0) {
        const id = res[0].id;
        updateSimulationAction(id, StoredSimulationState.Rejected);
      }
    });
  }

  // If the user waits 30s before closing the window, the service worker loses context of the currentPopup so we may not always have this.
  if (currentPopup && currentPopup === windowId) {
    currentPopup = undefined;
  }
});

// Reset the currentChatWeb3Popup if the user closes the window
chrome.windows.onRemoved.addListener((windowId: number) => {
  if (currentChatWeb3Popup && currentChatWeb3Popup === windowId) {
    currentChatWeb3Popup = undefined;
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  console.log('found localStorage changes');
  if (area === 'local' && changes[WgKeys.Simulations]?.newValue) {
    const oldSimulations: StoredSimulation[] = changes[WgKeys.Simulations].oldValue || [];
    const newSimulations: StoredSimulation[] = changes[WgKeys.Simulations].newValue || [];

    const oldFiltered = oldSimulations.filter((storedSimulation) => {
      return simulationNeedsAction(storedSimulation.state);
    });
    const newFiltered = newSimulations.filter((storedSimulation) => {
      return simulationNeedsAction(storedSimulation.state);
    });

    console.log('preparing to open popup');

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

    chrome.windows.getCurrent().then((current) => {
      if (!current || !current.width || !current.height) return;

      if (current.type === 'popup' && !oldFiltered.length && !newFiltered.length && current.width === 420 && current.height === 840) {
        chrome.windows.remove(current.id || 0);
      }
      return;
    });

    if (!currentPopup && (!oldFiltered || newFiltered.length > oldFiltered.length)) {
      // Indicate we're creating a popup so we don't have many.
      currentPopup = -1;

      chrome.windows.create({
        url: 'popup.html',
        type: 'popup',
        width: 420,
        height: 840,
      }).then((createdWindow) => {
        currentPopup = createdWindow.id;
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

// Listen for when the user clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'ask-chatweb3') {
    // Send a message to the content script

    if (!currentChatWeb3Popup) {
      // Indicate we're creating a popup so we don't have many.
      currentChatWeb3Popup = -1;

      chrome.windows
        .create({
          url: 'chatweb3.html',
          type: 'popup',
          width: 420,
          height: 760,
        })
        .then((createdWindow) => {
          currentChatWeb3Popup = createdWindow?.id;
        });

      return;
    }

    if (currentChatWeb3Popup && currentChatWeb3Popup !== -1) {
      const closeId = currentChatWeb3Popup;
      currentChatWeb3Popup = undefined;
      chrome.windows.remove(closeId);

      return;
    }
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (!currentChatWeb3Popup) {
    // Indicate we're creating a popup so we don't have many.
    currentChatWeb3Popup = -1;

    chrome.windows
      .create({
        url: 'chatweb3.html',
        type: 'popup',
        width: 420,
        height: 760,
      })
      .then((createdWindow) => {
        currentChatWeb3Popup = createdWindow?.id;
      });

    return;
  }

  if (currentChatWeb3Popup && currentChatWeb3Popup !== -1) {
    const closeId = currentChatWeb3Popup;
    currentChatWeb3Popup = undefined;
    chrome.windows.remove(closeId);

    return;
  }
});

const contentScriptMessageHandler = async (message: PortMessage, sourcePort: Browser.Runtime.Port) => {
  if (!SUPPORTED_CHAINS.includes(message.data.chainId)) return;
  const settings = await localStorageHelpers.get<ExtensionSettings>(WgKeys.ExtensionSettings);
  if (!settings?.simulationEnabled) return;

  // Check if the transaction was already simulated and confirmed
  const isApproved = findApprovedTransaction(approvedTxns, message.data);
  if (isApproved) return;
  // Wait for Metamask to popup first because otherwise Chrome will create both popups in the same coordinates
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Run the simulation
  clearOldSimulations().then(() => fetchSimulationAndUpdate(message.data));
};

chrome.runtime.onMessageExternal.addListener((request: DashboardMessageBody, sender, sendResponse) => {
  if (!request?.type) return;

  if (request.type === DashboardMessageCommands.GetWalletVersions) {
    fetchAllWallets().then((wallets) => sendResponse(wallets));
  } else if (request.type === DashboardMessageCommands.GetSettings) {
    localStorageHelpers.get<ExtensionSettings>(WgKeys.ExtensionSettings).then((settings) => sendResponse(settings));
  } else if (request.type === DashboardMessageCommands.UpdateSettings) {
    if (isValidExtensionSettings(request.data)) {
      const newSettings = request.data;
      chrome.storage.local.set({ [WgKeys.ExtensionSettings]: newSettings });
    } else {
      console.error('invalid settings update request', request);
    }
  } else if (request.type === DashboardMessageCommands.GetAlertHistory) {
    AlertHandler.getAllAlerts().then((alerts) => sendResponse(alerts));
  } else if (request.type === DashboardMessageCommands.HasWalletGuardExtension) {
    sendResponse(true);
  } else if (request.type === DashboardMessageCommands.ReadAllAlerts) {
    AlertHandler.clearNotifications();
    AlertHandler.removeAllUnreadAlerts();
  }
});
