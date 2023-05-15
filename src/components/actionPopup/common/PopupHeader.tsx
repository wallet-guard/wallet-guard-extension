import React, { useContext } from 'react';
import styles from '../ActionPopup.module.css';
import { SettingsIcon } from '@chakra-ui/icons';
import { openDashboard } from '../../../lib/helpers/linkHelper';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { FiBell } from 'react-icons/fi';
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

  return (
    <div className={styles.headerRow}>
      <img src="/images/wg_logos/Wallpaper-Transparent.png" alt="" width={'140px'} />

      <div className={styles.iconsRow}>
        <FiBell />
        <SettingsIcon onClick={toggleSettingsTab} />
        <FaExpandArrowsAlt className={styles.hover} onClick={() => openDashboard('popup', false)} />
      </div>
    </div>
  );
};
