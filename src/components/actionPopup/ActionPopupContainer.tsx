import React, { useEffect, useState } from 'react';
import styles from './ActionPopup.module.css';
import { PopupHeader } from './common/PopupHeader';
import { ActionPopupTab } from '../../models/actionPopupScreen';
import { TabSelector } from './common/TabSelector';
import { PhishingTab } from './tabs/Phishing/PhishingTab';
import { PopupTabContext } from '../../lib/context/context';
import { useTab } from '../../lib/hooks/useNavigation';

export const ActionPopupContainer = () => {
  const tabData = useTab();

  // todo: add UseContext so that TabSelector can update state here
  // todo: add check for simulation that needs action to swap to TAS tab

  function renderSelectedTab() {
    switch (tabData.currentTab) {
      case ActionPopupTab.PhishingTab:
        return <PhishingTab />;
      case ActionPopupTab.SimulationTab:
        return <></>;
      case ActionPopupTab.ChatWeb3Tab:
        return <></>;
      default:
        return <PhishingTab />;
    }
  }

  return (
    <PopupTabContext.Provider value={tabData}>
      <div className={styles.container}>
        <PopupHeader />
        <TabSelector />
        {renderSelectedTab()}
      </div>
    </PopupTabContext.Provider>
  );
};
