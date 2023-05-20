import React, { useEffect, useState } from 'react';
import { WalletName } from '../../../../lib/config/features';
import { WalletInfo } from '../../../../models/VersionChecker';
import localStorageHelpers from '../../../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../../../lib/helpers/chrome/localStorageKeys';
import { checkAllWalletsAndCreateAlerts } from '../../../../services/http/versionService';
import { Spinner } from '../../common/Spinner';
import { capitalizeFirstLetter } from '../../../../lib/helpers/stringUtil';
import styles from '../../ActionPopup.module.css';
import { Badge } from '@chakra-ui/react';
import { openGuide } from '../../../../lib/helpers/linkHelper';

interface WalletDetailProps {
  name: WalletName;
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

export function WalletDetail(props: WalletDetailProps) {
  const { name } = props;
  const defaultWalletInfo = {
    name,
    lastCheckedAt: 0,
    latestVersion: 'n/a',
    localVersion: 'n/a',
  };
  const [walletInfo, setWalletInfo] = useState<WalletInfo>(defaultWalletInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    localStorageHelpers.get<WalletInfo>(name as WgKeys).then((_walletInfo) => {
      if (_walletInfo) setWalletInfo(_walletInfo);
    });

    checkAllWalletsAndCreateAlerts().then(() => {
      localStorageHelpers.get<WalletInfo>(name as WgKeys).then((_walletInfo) => {
        if (_walletInfo) setWalletInfo(_walletInfo);
        setLoading(false);
      });
    });
  }, []);

  // Do not show wallets that are not installed
  if (!walletInfo.localVersion) return <></>;

  return (
    <div className={styles.row} style={{ marginBottom: '30px' }}>
      <img src={`/images/wallets/${name}.png`} style={{ height: '100%' }} width="50px" />

      <div className="col">
        <div className={styles.row} style={{ marginBottom: '0px' }}>
          <p className={styles.archivoSemiBold}>{capitalizeFirstLetter(name)}</p>

          {walletInfo.latestVersion === walletInfo.localVersion && (
            <Badge pl="1" fontSize="13px" colorScheme="green" marginLeft={'7px'}>
              Up-to-date
            </Badge>
          )}

          {walletInfo.latestVersion && walletInfo.latestVersion !== walletInfo.localVersion && (
            <Badge
              onClick={openGuide}
              className={styles.hover}
              pl="1"
              fontSize="13px"
              colorScheme="yellow"
              marginLeft={'7px'}
            >
              Update Available
            </Badge>
          )}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
            {loading && <Spinner color="gray" />}
          </div>
        </div>

        {!walletInfo.latestVersion ? (
          <p style={{ marginBottom: '0px' }}>We ran into an issue. Please try again later.</p>
        ) : (
          <p style={{ marginBottom: '0px' }}>Last Checked: {formatDate(walletInfo.lastCheckedAt)}</p>
        )}
      </div>
    </div>
  );
}
