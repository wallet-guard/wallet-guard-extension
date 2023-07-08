import { Badge, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import { toUnicode } from 'punycode';
import React, { useEffect } from 'react';
import { standardizeUrl } from '../../../../lib/helpers/util';
import { AlertCategory, AlertDetail, AlertType } from '../../../../models/Alert';
import { add3Dots } from '../extensions/ExtensionsTab';
import styles from './Alerts.module.css';
import { WarningType } from '../../../../models/simulation/Transaction';

interface Props {
  alertsHistory: AlertDetail[];
  unreadAlerts: AlertDetail[];
  parentComponent: string;
}

export function sortByCreatedAt(a: AlertDetail, b: AlertDetail) {
  return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
}

export default function AlertsTable(props: Props) {
  function mapStatusToColor(status: AlertType) {
    switch (status) {
      case 'CREATED_AT':
        return 'yellow';
      case WarningType.Blocklisted:
      case WarningType.Similarity:
      case WarningType.Drainer:
      case WarningType.Homoglyph:
      case WarningType.MLInference:
      case WarningType.RecentlyCreated: // todo: make this yellow/red depending on WarningLevel
      case WarningType.Malware:
      case AlertCategory.MaliciousExtension:
      // Legacy types
      case 'CHECK_DOMAIN_FOR_SIMILARITY':
      case 'UNICODE_SIMILARITY':
      case 'CHECK_WHITELIST':
      case 'OVERRIDE_LIST':
      case 'MALWARE':
      case 'BLOCKLIST_CONTAINS_URL':
        return 'red';
      case AlertCategory.News:
        return 'blue';
      case AlertCategory.WalletOutOfDate:
        return 'yellow';
      default:
        return 'blue';
    }
  }

  // TODO: Unhandled cases here now that we have things like ETH_SIGN
  function mapCategory(category: AlertType) {
    switch (category) {
      case WarningType.Drainer:
        return 'Suspected wallet drainer';
      case WarningType.Blocklisted:
      case 'BLOCKLIST_CONTAINS_URL':
        return 'Known Phishing Website';
      case 'OVERRIDE_LIST':
        return 'Temporarily blocked';
      case WarningType.RecentlyCreated:
      case 'CREATED_AT':
        return 'Recently created domain';
      case WarningType.Malware:
      case 'MALWARE':
        return 'Malware Detected';
      case WarningType.Similarity:
      case 'CHECK_WHITELIST':
      case 'CHECK_DOMAIN_FOR_SIMILARITY':
        return 'Impersonation attempt';
      case AlertCategory.MaliciousExtension:
        return 'Potentially Malicious Extension';
      case WarningType.MLInference:
        return 'Suspicious website';
      case WarningType.Homoglyph:
      case 'UNICODE_SIMILARITY':
        return 'Homoglyph attack';
      case AlertCategory.News:
        return 'News';
      case AlertCategory.WalletOutOfDate:
        return 'Wallet out of date';
    }
  }

  function openLink(alert: AlertDetail) {
    chrome.tabs.create({ url: alert.link });
  }

  function isUnreadAlert(alert: AlertDetail) {
    return props.unreadAlerts.some((_alert) => _alert.key === alert.key);
  }

  return (
    <div className="pt-3 container-fluid">
      <div>
        <TableContainer>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Date</Th>

                {props.parentComponent === 'AlertsTab' && <Th>Notification</Th>}

                <Th>Category</Th>

                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.alertsHistory.length === 0 && (
                <>
                  <Tr key={0}>
                    <Td>{new Date().toLocaleString()}</Td>
                    <Td>
                      <Badge colorScheme={'blue'}>{mapCategory(AlertCategory.News)}</Badge>
                    </Td>
                    <Td>Welcome to Wallet Guard. Your alerts will be shown here.</Td>
                  </Tr>
                </>
              )}
              {props.alertsHistory &&
                props.alertsHistory.sort(sortByCreatedAt).map((alert) => {
                  return (
                    <Tr key={alert.key} className={isUnreadAlert(alert) ? styles['unread-alert-row'] : null}>
                      <Td>
                        {isUnreadAlert(alert) && (
                          <div
                            style={{
                              height: '7px',
                              width: '7px',
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              position: 'absolute',
                              marginTop: '8px',
                              marginLeft: '-17px',
                            }}
                          ></div>
                        )}
                        {alert.createdAt}
                      </Td>

                      {props.parentComponent === 'AlertsTab' && <Td>{alert.name}</Td>}

                      <Td>
                        <Badge colorScheme={mapStatusToColor(alert.category)}>{mapCategory(alert.category)}</Badge>
                      </Td>

                      <Td>
                        {!!alert.link && (
                          <Tooltip label={alert.details} placement="top" variant={'default'}>
                            <div className={styles.hover} onClick={() => openLink(alert)}>
                              {add3Dots(alert.details, 68)}
                            </div>
                          </Tooltip>
                        )}
                        {!alert.link && (
                          <Tooltip
                            variant={'default'}
                            label={
                              alert.details.includes('xn--')
                                ? `This was a homoglyph attack. The URL was ${toUnicode(standardizeUrl(alert.details))}`
                                : alert.details
                            }
                            placement="top"
                          >
                            {alert.details}
                          </Tooltip>
                        )}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
