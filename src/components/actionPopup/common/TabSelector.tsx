import React, { useContext } from 'react';
import { ActionPopupTab } from '../../../models/actionPopupScreen';
import { PopupTabContext } from '../../../lib/context/context';
import styles from '../ActionPopup.module.css';

export const TabSelector = () => {
  const { currentTab, updateTab } = useContext(PopupTabContext);

  return (
    <>
      <div className="row" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <button
          className={currentTab === ActionPopupTab.PhishingTab ? styles.tabButtonActive : styles.tabButton}
          onClick={() => updateTab(ActionPopupTab.PhishingTab)}
        >
          Phishing Detection
        </button>

        <button
          className={currentTab === ActionPopupTab.SimulationTab ? styles.tabButtonActive : styles.tabButton}
          onClick={() => updateTab(ActionPopupTab.SimulationTab)}
        >
          Transaction Simulation
        </button>

        <button
          className={currentTab === ActionPopupTab.ChatWeb3Tab ? styles.tabButtonActive : styles.tabButton}
          onClick={() => updateTab(ActionPopupTab.ChatWeb3Tab)}
        >
          Chat Web3
        </button>
      </div>
    </>
  );
};
