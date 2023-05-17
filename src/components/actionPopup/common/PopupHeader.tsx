import React, { useContext, useEffect, useState } from 'react';
import styles from '../ActionPopup.module.css';
import { openDashboard } from '../../../lib/helpers/linkHelper';
import { FiBell, FiSettings } from 'react-icons/fi';
import { PopupTabContext } from '../../../lib/context/context';
import { ActionPopupTab } from '../../../models/actionPopupScreen';
import { AlertHandler } from '../../../lib/helpers/chrome/alertHandler';
import { AlertDetail } from '../../../models/Alert';

export const PopupHeader = () => {
  const { currentTab, updateTab } = useContext(PopupTabContext);
  const [unreadAlerts, setUnreadAlerts] = useState<AlertDetail[]>([]);

  useEffect(() => {
    AlertHandler.getAllUnreadAlerts().then((_alertsFeed) => setUnreadAlerts(_alertsFeed));
  }, []);

  function toggleSettingsTab() {
    if (currentTab === ActionPopupTab.SettingsTab) {
      updateTab(ActionPopupTab.PhishingTab);
    } else {
      updateTab(ActionPopupTab.SettingsTab);
    }
  }

  // todo: Grab number of unread alerts here
  return (
    <div className={styles.headerRow}>
      <img src="/images/wg_logos/Wallpaper-Transparent.png" alt="" width={'140px'} />

      <div className={styles.iconsRow}>
        <div className={styles.alertsButton}>
          {unreadAlerts.length > 0 && <span className={styles.badge}>{unreadAlerts.length}</span>}
          <FiBell className={styles.headerIcon} onClick={() => openDashboard('popup', false)} />
        </div>
        <FiSettings className={styles.headerIcon} onClick={toggleSettingsTab} />
      </div>
    </div>
  );
};
