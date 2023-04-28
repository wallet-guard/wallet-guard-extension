import { CheckCircleIcon, InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Badge, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { capitalizeFirstLetter } from '../../../../../lib/helpers/stringUtil';
import { WalletInfo } from '../../../../../models/VersionChecker';
import styles from '../../../../../styles.module.css';

export interface ChecklistItemProps {
  walletInfo: WalletInfo;
}

interface ChecklistDetails {
  icon: 'check' | 'warn' | 'notInstalled';
  text: string;
  userVersion: string | null;
  latestVersion: string | null;
  lastCheckedAt: string;
}

function formatDate(dateAsNumber: number) {
  let date = new Date(dateAsNumber);
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ampm;
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + strTime;
}

export function ChecklistItem(props: ChecklistItemProps) {
  const { name, localVersion, latestVersion, lastCheckedAt } = props.walletInfo;
  const details: ChecklistDetails = mapInfo();
  const icon = mapIcon(details.icon);
  const bothVersionsExist = localVersion && latestVersion;

  function mapInfo(): ChecklistDetails {
    if (!localVersion) {
      return {
        icon: 'notInstalled',
        text: capitalizeFirstLetter(name),
        userVersion: '',
        latestVersion: latestVersion,
        lastCheckedAt: formatDate(lastCheckedAt),
      };
    } else if (latestVersion === localVersion) {
      return {
        icon: 'check',
        text: capitalizeFirstLetter(name),
        userVersion: localVersion,
        latestVersion: latestVersion,
        lastCheckedAt: formatDate(lastCheckedAt),
      };
    } else {
      return {
        icon: 'warn',
        text: capitalizeFirstLetter(name),
        userVersion: localVersion,
        latestVersion: latestVersion,
        lastCheckedAt: formatDate(lastCheckedAt),
      };
    }
  }

  function mapIcon(icon: string) {
    switch (icon) {
      case 'check':
        return <CheckCircleIcon boxSize={'20px'} color={'green.500'} ml={2} />;
      case 'warn':
        return <WarningTwoIcon boxSize={'20px'} color={'yellow.400'} ml={2} />;
      case 'notInstalled':
        return <InfoOutlineIcon boxSize={'20px'} color={'gray.200'} ml={2} />;
    }
  }

  function goToExtensions() {
    chrome.tabs.create({
      url: 'chrome://extensions',
    });
  }

  return (
    <div
      className={`${styles.row} col-md-12 col-lg-6`}
      style={{ marginBottom: '20px', marginTop: '20px', paddingLeft: '80px' }}
    >
      <img src={`/images/wallets/${name}.png`} height={50} width={50} />
      <div
        className={`${styles.col} ${bothVersionsExist && localVersion !== latestVersion ? styles.hover : ''}`}
        style={{ marginLeft: '25px' }}
        onClick={bothVersionsExist && localVersion !== latestVersion ? goToExtensions : () => {}}
      >
        <div className={styles.row}>
          <Heading as="h6" fontSize={22}>
            {details.text}
            {icon}
            {bothVersionsExist && localVersion !== latestVersion && (
              <Badge className={styles.hover} pl="1" fontSize="13px" colorScheme="yellow" marginLeft={'7px'}>
                Update
              </Badge>
            )}
          </Heading>
        </div>
        <div className={styles.row}>
          {localVersion && !latestVersion && (
            <Text fontSize={18} color={'gray.300'}>
              We ran into an issue. Please try again later.
            </Text>
          )}
          {bothVersionsExist && localVersion !== latestVersion && (
            <Text fontSize={18} color={'orange'}>
              Update Now
            </Text>
          )}
          {bothVersionsExist && localVersion === latestVersion && (
            <Text fontSize={18} color={'gray.300'}>
              Last Checked: {details.lastCheckedAt}
            </Text>
          )}
          {!localVersion && (
            <Text fontSize={18} color={'gray.300'}>
              Not Installed
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
