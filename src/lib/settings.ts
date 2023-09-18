export interface ExtensionSettings {
  phishingDetection: boolean;
  simulationEnabled: boolean;
  maliciousExtensionDetection: boolean;
  approvalNotifications: boolean;
}

export const WG_EXTENSION_DEFAULT_SETTINGS: ExtensionSettings = {
  phishingDetection: true,
  simulationEnabled: true,
  maliciousExtensionDetection: true,
  approvalNotifications: true,
};

export function isValidExtensionSettings(obj: any): obj is ExtensionSettings {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.phishingDetection === "boolean" &&
    typeof obj.simulationEnabled === "boolean" &&
    typeof obj.maliciousExtensionDetection === "boolean" &&
    typeof obj.approvalNotifications === "boolean"
  );
}