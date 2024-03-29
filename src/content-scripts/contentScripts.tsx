import Browser from 'webextension-polyfill';
import localStorageHelpers from '../lib/helpers/chrome/localStorage';
import { WgKeys } from '../lib/helpers/chrome/localStorageKeys';
import { BrowserMessageType, RunSimulationMessageType } from '../lib/helpers/chrome/messageHandler';
import logger from '../lib/logger';
import { dispatchResponse, listenToRequest, Response } from '../lib/simulation/requests';
import type { StoredSimulation } from '../lib/simulation/storage';
import { removeSimulation, StoredSimulationState } from '../lib/simulation/storage';
import { TransactionArgs } from '../models/simulation/Transaction';
import { ExtensionSettings, SimulationSettings } from '../lib/settings';
import { KNOWN_MARKETPLACES, shouldSkipBasedOnDomain } from '../lib/simulation/skip';
import { getDomainNameFromURL } from '../lib/helpers/phishing/parseDomainHelper';

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

  // Fetch both ExtensionSettings and SimulationSettings
  const [settings, simulationSettings] = await Promise.all([
    localStorageHelpers.get<ExtensionSettings>(WgKeys.ExtensionSettings),
    localStorageHelpers.get<SimulationSettings>(WgKeys.SimulationSettings),
  ]);

  // Degen mode is enabled, skip simulation
  const shouldSkipSimulation =
    settings?.skipOnOfficialMarketplaces &&
    simulationSettings &&
    shouldSkipBasedOnDomain(getDomainNameFromURL(request.origin), simulationSettings) &&
    'transaction' in request &&
    KNOWN_MARKETPLACES.includes(request.transaction.to.toLowerCase());

  if (!settings?.simulationEnabled || shouldSkipSimulation) {
    // Immediately respond continue if simulation is disabled or should be skipped
    dispatchResponse({
      id: request.id,
      type: Response.Continue,
    });
    return;
  }

  // Page has sent an event, start listening to storage changes.
  // This ensures we don't listen to storage changes on every single webpage.
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
