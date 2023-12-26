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
  skipOnOfficialMarketplaces: true,
};
