import Browser from 'webextension-polyfill';
import localStorageHelpers from '../lib/helpers/chrome/localStorage';
import { WgKeys } from '../lib/helpers/chrome/localStorageKeys';
import { BrowserMessageType, RunSimulationMessageType } from '../lib/helpers/chrome/messageHandler';
import logger from '../lib/logger';
import { Settings } from '../lib/settings';
import { dispatchResponse, listenToRequest, Response } from '../lib/simulation/requests';
import type { StoredSimulation } from '../lib/simulation/storage';
import { removeSimulation, StoredSimulationState } from '../lib/simulation/storage';
import { TransactionArgs } from '../models/simulation/Transaction';

// Function to inject scripts into browser
const addScript = (url: string) => {
  const container = document.head || document.documentElement;
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('async', 'false');
  scriptTag.setAttribute('src', Browser.runtime.getURL(url));
  container.appendChild(scriptTag);
  scriptTag.onload = () => scriptTag.remove();
};

// Add vendor and injectWalletGuard
addScript('js/vendor.js');
addScript('js/injected/injectWalletGuard.js');

const log = logger.child({ component: 'Content-Script' });

log.debug({ msg: 'Content Script Loaded' });

let ids: string[] = [];

const maybeRemoveId = (id: string) => {
  if (ids.includes(id)) {
    ids = ids.filter((thisId) => thisId !== id);
    removeSimulation(id);
  }
};

// Listen to Request from injected script
listenToRequest(async (request: TransactionArgs) => {
  log.info({ request }, 'Request');
  ids.push(request.id);

  let currentTab = window.location.href;
  if (currentTab) {
    request.origin = currentTab;
  }

  // Get User Settings
  localStorageHelpers.get<Settings>(WgKeys.Settings).then((settings) => {
    if (!settings || !settings.simulationEnabled) {
      // Immediately respond continue.
      dispatchResponse({
        id: request.id,
        type: Response.Continue,
      });

      return;
    }

    // Page has sent an event, start listening to storage changes.
    // This ensures we don't listen to storage changes on every singel webpage.
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes['simulations']?.newValue) {
        const newSimulations = changes['simulations'].newValue;

        newSimulations.forEach((simulation: StoredSimulation) => {
          // Either dispatch the corresponding event, or push the item to new simulations.
          if (simulation.state === StoredSimulationState.Confirmed) {
            dispatchResponse({
              id: simulation.id,
              type: Response.Continue,
            });
            maybeRemoveId(simulation.id);
          } else if (simulation.state === StoredSimulationState.Rejected) {
            dispatchResponse({
              id: simulation.id,
              type: Response.Reject,
            });
            maybeRemoveId(simulation.id);
          }
        });
      }
    });

    chrome.runtime.sendMessage({
      type: BrowserMessageType.RunSimulation,
      data: request,
    } as RunSimulationMessageType);
  });
});
