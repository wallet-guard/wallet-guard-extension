import React, { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import AlertsTable from './AlertsTable';
import { AlertDetail } from '../../../../models/Alert';
import { AlertHandler } from '../../../../lib/helpers/chrome/alertHandler';
import { Feedback } from '../../../common/Feedback';

export default function AlertsTab() {
  const [alertsHistory, setAlertsHistory] = useState<AlertDetail[]>([]);

  useEffect(() => {
    AlertHandler.getAllAlerts().then((_alertsFeed) =>
      setAlertsHistory(_alertsFeed)
    );
  }, []);

  return (
    <div className="pt-3 container-fluid">
      <Heading as="h6" size="md" pb={4}>
        Alert History
      </Heading>

      <AlertsTable
        alertsHistory={alertsHistory}
        parentComponent={'AlertsTab'}
        unreadAlerts={[]}
      />
      <Feedback />

    </div>
  );
}
