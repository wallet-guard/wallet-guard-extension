import React, { useContext } from 'react';
import styles from '../ActionPopup.module.css';
import { openDashboard } from '../../../lib/helpers/linkHelper';
import { FiBell, FiSettings } from 'react-icons/fi';
import { PopupTabContext } from '../../../lib/context/context';
import { ActionPopupTab } from '../../../models/actionPopupScreen';

export const PopupHeader = () => {
  const { currentTab, updateTab } = useContext(PopupTabContext);

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
        <FiBell onClick={() => openDashboard('popup', false)} />
        <FiSettings onClick={toggleSettingsTab} />
      </div>
    </div>
  );
};
