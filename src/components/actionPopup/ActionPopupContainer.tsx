import React from 'react';
import styles from './ActionPopup.module.css';
import { PopupHeader } from './common/PopupHeader';
import { ActionPopupTab } from '../../models/actionPopupScreen';
import { TabSelector } from './common/TabSelector';
import { PhishingTab } from './tabs/Phishing/PhishingTab';
import { PopupTabContext } from '../../lib/context/context';
import { useTab } from '../../lib/hooks/useNavigation';
import { SettingsTab } from './tabs/Settings/SettingsTab';

export const ActionPopupContainer = () => {
  const tabData = useTab();

  // todo: figure out how to get settings working
  // todo: add check for simulation that needs action to swap to TAS tab

  function renderSelectedTab() {
    switch (tabData.currentTab) {
      case ActionPopupTab.PhishingTab:
        return <PhishingTab />;
      case ActionPopupTab.ChatWeb3Tab:
        return <></>;
      case ActionPopupTab.WalletVersionsTab:
        return <></>;
      case ActionPopupTab.SettingsTab:
        return <SettingsTab />;
      default:
        return <PhishingTab />;
    }
  }

  // todo: popup header + tab selector should take up X room, and the other tab should take up 100% of remaining space

  return (
    <div className={styles.popup}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <PopupTabContext.Provider value={tabData}>
          <PopupHeader />
          {renderSelectedTab()}
          <TabSelector />
        </PopupTabContext.Provider>
      </div>
    </div>
  );
};
