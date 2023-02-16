export interface Settings {
  blockPunycode: boolean;
  blockSuspiciousDNS: boolean; // todo: deprecated
  maliciousExtensionDetection: boolean;
  simulationEnabled: boolean;
  walletVersionNotifications: boolean;
}

export const WG_DEFAULT_SETTINGS: Settings = {
  blockPunycode: true,
  blockSuspiciousDNS: true,
  maliciousExtensionDetection: true,
  simulationEnabled: true,
  walletVersionNotifications: true
};
