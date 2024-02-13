export interface ExtensionSettings {
  phishingDetection: boolean;
  simulationEnabled: boolean;
  maliciousExtensionDetection: boolean;
  approvalNotifications: boolean;
  skipOnOfficialMarketplaces: boolean;
}

export const WG_EXTENSION_DEFAULT_SETTINGS: ExtensionSettings = {
  phishingDetection: true,
  simulationEnabled: true,
  maliciousExtensionDetection: true,
  approvalNotifications: true,
  skipOnOfficialMarketplaces: false,
};

export interface SimulationSettings {
  opensea: boolean;
  blur: boolean;
  uniswap: boolean;
  x2y2: boolean;
  looksrare: boolean;
}

export const WG_EXTENSION_DEFAULT_SIMULATION_SETTINGS: SimulationSettings = {
  opensea: false,
  blur: false,
  uniswap: false,
  x2y2: false,
  looksrare: false,
};
