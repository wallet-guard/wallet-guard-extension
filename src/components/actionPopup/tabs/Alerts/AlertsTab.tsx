import React, { useEffect, useState } from 'react';
import { AlertHandler } from '../../../../lib/helpers/chrome/alertHandler';
import { AlertDetail } from '../../../../models/Alert';
import styles from '../../ActionPopup.module.css';
import { PopupAlertsTable } from './PopupAlertTable';

export function AlertsTab() {
  const [alertsHistory, setAlertsHistory] = useState<AlertDetail[]>([]);

  useEffect(() => {
    AlertHandler.getAllAlerts().then((_alertsFeed) => setAlertsHistory(_alertsFeed));
  }, []);

  return (
    <>
      <div style={{ height: '100%' }}>
        <div
          className={styles.settingsRow}
          style={{
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <p className={styles.tabHeader}>Alert History</p>
        </div>
        <PopupAlertsTable />
      </div>
    </>
  );
}
