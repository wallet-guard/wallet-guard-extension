import React, { useContext } from 'react';
import styles from '../../simulation/simulation.module.css';
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
    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
      <div className="justify-content-between" style={{ display: 'flex' }}>
        <div>
          <img src="/images/wg_logos/Wallpaper-Transparent.png" alt="" width={'150px'} />
        </div>

        <div style={{ float: 'right', paddingTop: '20px', display: 'flex', fontSize: '20px' }}>
          <FiBell />
          <SettingsIcon className={styles.hover} onClick={toggleSettingsTab} />
          <FaExpandArrowsAlt className={styles.hover} onClick={() => openDashboard('popup', false)} />
        </div>
      </div>
    </div>
  );
};
