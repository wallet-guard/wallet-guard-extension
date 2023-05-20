import React, { useContext, useEffect, useState } from 'react';
import localStorageHelpers from '../../../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../../../lib/helpers/chrome/localStorageKeys';
import { Settings, WG_DEFAULT_SETTINGS } from '../../../../lib/settings';
import styles from '../../ActionPopup.module.css';
import { Switch } from '../../common/Switch';
import { PopupTabContext } from '../../../../lib/context/context';
import { ActionPopupTab } from '../../../../models/actionPopupScreen';
import posthog from 'posthog-js';

export function SettingsTab() {
  const [settings, setSettings] = useState<Settings>(WG_DEFAULT_SETTINGS);
  const { updateTab } = useContext(PopupTabContext);

  useEffect(() => {
    getSettingsFromLocalstorage();

    async function getSettingsFromLocalstorage() {
      const data = await localStorageHelpers.get<Settings>(WgKeys.Settings);
      if (data) {
        setSettings(data);
      }
    }
  }, []);

  function updateSetting(key: string, value: boolean) {
    const newSettings: Settings = {
      ...settings,
      [key]: value,
    };

    posthog.capture('popup change settings', { newSettings });
    setSettings(newSettings);
    chrome.storage.local.set({ settings: newSettings });
  }

  return (
    <div style={{ height: '100%' }}>
      <div
        className={styles.tabHeader}
        style={{
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <p className={styles.settingsHeader}>Settings</p>
        <p
          className={styles.hover}
          style={{ fontSize: '20px', marginRight: '15px' }}
          onClick={() => updateTab(ActionPopupTab.PhishingTab)}
        >
          X
        </p>
      </div>

      {/* todo: add tooltips to these */}
      <div className={styles.settingsRow}>
        <p className={styles.settingsOption}>Phishing Detection</p>
        <Switch
          active={settings.phishingDetectionEnabled}
          toggleCB={updateSetting}
          settingKey="phishingDetectionEnabled"
        />
      </div>

      <div className={styles.settingsRow}>
        <p className={styles.settingsOption}>Transaction Simulation</p>
        <Switch active={settings.simulationEnabled} toggleCB={updateSetting} settingKey="simulationEnabled" />
      </div>

      <div className={styles.settingsRow}>
        <p className={styles.settingsOption}>Malicious Extension Detection</p>
        <Switch
          active={settings.maliciousExtensionDetection}
          toggleCB={updateSetting}
          settingKey="maliciousExtensionDetection"
        />
      </div>

      <div className={styles.settingsRow}>
        <p className={styles.settingsOption}>Wallet Version Alerts</p>
        <Switch
          active={settings.walletVersionNotifications}
          toggleCB={updateSetting}
          settingKey="walletVersionNotifications"
        />
      </div>
    </div>
  );
}
