import React, { useEffect, useState } from 'react';
import { WalletName } from '../../../../lib/config/features';
import { WalletInfo } from '../../../../models/VersionChecker';
import localStorageHelpers from '../../../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../../../lib/helpers/chrome/localStorageKeys';

interface WalletDetailProps {
  name: WalletName;
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

  useEffect(() => {
    localStorageHelpers.get<WalletInfo>(name as WgKeys).then((_walletInfo) => {
      if (_walletInfo) setWalletInfo(_walletInfo);
    });
  }, []);

  return (
    <>
      <img src={`/images/wallets/${name}.png`} height={50} width={50} />
    </>
  );
}
