import { AlertDetail } from '../../../models/Alert';
import { isEmptyObject } from '../util';
import { WgKeys } from './localStorageKeys';

const localStorageHelpers = {
  get: async function <T>(key: WgKeys): Promise<T | null> {
    const data = await chrome.storage.local.get(key);

    if (isEmptyObject(data)) {
      return null;
    }

    return data[key] ?? null;
  },
  upsertAlert: function (data: AlertDetail) {
    this.get<AlertDetail[]>(WgKeys.UnreadAlerts)
      .then((res) => {
        if (!res) {
          chrome.storage.local.set({ wgUnreadAlerts: [data] });
        } else {
          res.push(data);
          chrome.storage.local.set({ wgUnreadAlerts: res });
        }
      });
    this.get<AlertDetail[]>(WgKeys.AlertHistory)
      .then((res) => {
        if (!res) {
          chrome.storage.local.set({ wgAlertHistory: [data] });
        } else {
          res.push(data);
          chrome.storage.local.set({ wgAlertHistory: res });
        }
      });
  },
  upsertMany: async function (data: AlertDetail[]) {
    const unreadAlerts = await this.get<AlertDetail[]>(WgKeys.UnreadAlerts);
    if (!unreadAlerts) {
      chrome.storage.local.set({ wgUnreadAlerts: data });
    } else {
      unreadAlerts.push(...data);
      chrome.storage.local.set({ wgUnreadAlerts: unreadAlerts });
    }

    const alertHistory = await this.get<AlertDetail[]>(WgKeys.AlertHistory);
    if (!alertHistory) {
      chrome.storage.local.set({ wgAlertHistory: data });
    } else {
      alertHistory.push(...data);
      chrome.storage.local.set({ wgAlertHistory: alertHistory });
    }
  }
}
export default localStorageHelpers;