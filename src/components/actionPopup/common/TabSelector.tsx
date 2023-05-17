import React, { useContext } from 'react';
import { ActionPopupTab } from '../../../models/actionPopupScreen';
import { PopupTabContext } from '../../../lib/context/context';
import styles from '../ActionPopup.module.css';
import { ChatIcon, GlobeIcon, WalletIcon } from './icons';

export const TabSelector = () => {
  const { currentTab, updateTab } = useContext(PopupTabContext);

  return (
    <>
      {/* todo; turn these 3 buttons into one component */}
      <div className={styles.tabButtonRow}>
        <div className={styles.tabButtonSpacer}>
          <button
            className={currentTab === ActionPopupTab.PhishingTab ? styles.tabButtonActive : styles.tabButton}
            onClick={() => updateTab(ActionPopupTab.PhishingTab)}
          >
            <GlobeIcon active={currentTab === ActionPopupTab.PhishingTab} />
          </button>
        </div>

        <div className={styles.tabButtonSpacer}>
          <button
            className={currentTab === ActionPopupTab.ChatWeb3Tab ? styles.tabButtonActive : styles.tabButton}
            onClick={() => updateTab(ActionPopupTab.ChatWeb3Tab)}
          >
            <ChatIcon active={currentTab === ActionPopupTab.ChatWeb3Tab} />
          </button>
        </div>

        <div className={styles.tabButtonSpacer}>
          <button
            className={currentTab === ActionPopupTab.WalletVersionsTab ? styles.tabButtonActive : styles.tabButton}
            onClick={() => updateTab(ActionPopupTab.WalletVersionsTab)}
          >
            <WalletIcon active={currentTab === ActionPopupTab.WalletVersionsTab} />
          </button>
        </div>
      </div>
    </>
  );
};
