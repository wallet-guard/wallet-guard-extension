export interface Settings {
  phishingDetectionEnabled: boolean;
  maliciousExtensionDetection: boolean;
  simulationEnabled: boolean;
  walletVersionNotifications: boolean;
}

export const WG_DEFAULT_SETTINGS: Settings = {
  phishingDetectionEnabled: true,
  maliciousExtensionDetection: true,
  simulationEnabled: true,
  walletVersionNotifications: true
};

export type SettingsKey = keyof typeof WG_DEFAULT_SETTINGS;