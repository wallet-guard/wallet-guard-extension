import React from 'react';
import styles from './ActionPopup.module.css';
import { PopupHeader } from './common/PopupHeader';
import { ActionPopupTab } from '../../models/actionPopupScreen';
import { TabSelector } from './common/TabSelector';
import { PhishingTab } from './tabs/Phishing/PhishingTab';
import { PopupTabContext } from '../../lib/context/context';
import { useTab } from '../../lib/hooks/useNavigation';
import { SettingsTab } from './tabs/Settings/SettingsTab';
import { WalletsTab } from './tabs/Wallets/WalletTab';
import { AlertsTab } from './tabs/Alerts/AlertsTab';

export const ActionPopupContainer = () => {
  const tabData = useTab();

  function renderSelectedTab() {
    switch (tabData.currentTab) {
      case ActionPopupTab.AlertsTab:
        return <AlertsTab />;
      case ActionPopupTab.PhishingTab:
        return <PhishingTab />;
      case ActionPopupTab.ChatWeb3Tab:
        return <></>;
      case ActionPopupTab.WalletVersionsTab:
        return <WalletsTab />;
      case ActionPopupTab.SettingsTab:
        return <SettingsTab />;
      default:
        return <PhishingTab />;
    }
  }

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
