import { AlertDetail } from '../../../models/Alert';
import localStorageHelpers from './localStorage';
import { WgKeys } from './localStorageKeys';

// handles in-extension alerts
export class AlertHandler {
  constructor() { }

  // aggregates notifications from several sources
  // Example use cases: 1. notifs from the API 2. wallet version alerts 3. malicious urls/extension installs
  // feature of this: wallet notifs will not be shown twice for the same version
  static create(alertData: AlertDetail) {
    let mappedData: AlertDetail = alertData

    // If it doesnt come from the server :)
    // !alertData.createdAt
    if (!alertData.createdAt) {
      mappedData = {
        ...alertData,
        createdAt: new Date().toLocaleString()
      };
    } else {
      mappedData = {
        ...alertData,
        createdAt: new Date(alertData.createdAt).toLocaleString()
      };
    }

    this.hasAlert(alertData.key)
      .then(alertExists => {
        if (!alertExists) {
          localStorageHelpers.upsertAlert(mappedData);
          this.incrementNotifications();
        }
      });
  }

  static async createMany(alertData: AlertDetail[]) {
    const mappedData: AlertDetail[] = alertData.map((_alert) => {
      return {
        ..._alert,
        createdAt: new Date(_alert.createdAt).toLocaleString()
      };
    });

    let alertsToAdd: AlertDetail[] = [];

    for (let _alert of mappedData) {
      const alertExists = await this.hasAlert(_alert.key);
      if (!alertExists) {
        alertsToAdd.push(_alert);
      }
    }

    localStorageHelpers.upsertMany(alertsToAdd);

    if (alertsToAdd.length > 0)
      this.incrementNotifications(alertsToAdd.length);
  }

  static async hasAlert(key: string) {
    const alerts = await localStorageHelpers.get<AlertDetail[]>(WgKeys.AlertHistory);

    if (!alerts) return false;

    const alertAlreadyExists = alerts.find(alert => alert.key === key);
    return !!alertAlreadyExists;
  }

  static async getAllUnreadAlerts(): Promise<AlertDetail[]> {
    const alertsRemoved = await localStorageHelpers.get<AlertDetail[]>(WgKeys.UnreadAlerts);

    return alertsRemoved || [];
  }

  static async removeAllUnreadAlerts(): Promise<AlertDetail[]> {
    const alertsRemoved = await localStorageHelpers.get<AlertDetail[]>(WgKeys.UnreadAlerts);
    chrome.storage.local.remove(WgKeys.UnreadAlerts);
    return alertsRemoved || [];
  }

  static async getAllAlerts(): Promise<AlertDetail[]> {
    const alerts = await localStorageHelpers.get<AlertDetail[]>(WgKeys.AlertHistory);
    return alerts || [];
  }

  static incrementNotifications(count = 1): void {
    chrome.action.getBadgeText({})
      .then((text) => {
        const newText = text ? (parseInt(text) + count).toString() : count.toString();
        chrome.action.setBadgeText({ text: newText });
        chrome.action.setBadgeBackgroundColor({ color: '#ede053' });
      });
  }

  static clearNotifications(): void {
    chrome.action.getBadgeText({}).then((badgeText: string) => {
      if (badgeText) {
        chrome.action.setBadgeText({ text: '' });
      }
    });
  }
}