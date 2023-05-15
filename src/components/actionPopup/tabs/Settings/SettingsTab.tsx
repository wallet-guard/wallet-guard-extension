import React, { useEffect, useState } from 'react';
import localStorageHelpers from '../../../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../../../lib/helpers/chrome/localStorageKeys';
import { Settings, WG_DEFAULT_SETTINGS } from '../../../../lib/settings';
import styles from '../../ActionPopup.module.css';
import { Switch } from '../../common/Switch';

export function SettingsTab() {
  const [settings, setSettings] = useState<Settings>(WG_DEFAULT_SETTINGS);

  useEffect(() => {
    getSettingsFromLocalstorage();
    async function getSettingsFromLocalstorage() {
      const data = await localStorageHelpers.get<Settings>(WgKeys.Settings);
      if (data) {
        setSettings(data);
      }
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <p className={styles.settingsHeader}>Settings</p>
        {/* TODO: add close button here integrated w/ context*/}
        <p>X</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <p className={styles.settingsOption}>Transaction Simulation</p>
        <Switch />
      </div>
    </>
  );
}
