export interface Settings {
  blockPunycode: boolean;// todo: remove, deprecated
  blockSuspiciousDNS: boolean; // todo: remove, deprecated
  phishingDetectionEnabled: boolean;
  maliciousExtensionDetection: boolean;
  simulationEnabled: boolean;
  walletVersionNotifications: boolean;
}

export const WG_DEFAULT_SETTINGS: Settings = {
  blockPunycode: true,
  blockSuspiciousDNS: true,
  phishingDetectionEnabled: true,
  maliciousExtensionDetection: true,
  simulationEnabled: true,
  walletVersionNotifications: true
};

export type SettingsKey = keyof typeof WG_DEFAULT_SETTINGS;