import React, { useEffect, useState } from 'react';
import { StoredSimulation } from '../../lib/simulation/storage';
import { DappLogoWithChain } from './DappLogoWithChain';
import styles from '../../styles/simulation/PersonalSign/PersonalSign.module.css';
import animations from '../../styles/CommonAnimations.module.css';
import { S3_URL_PROD } from '../../lib/environment';
import { ConfirmSimulationButton } from './ConfirmSimulationButton';

interface PersonalSignProps {
  simulation: StoredSimulation;
  // children: React.ReactNode;
}

interface Metadata {
  name: string;
  logo: string;
  color: string;
}

const defaultMetadata: Metadata = {
  name: '',
  logo: '/images/asset_logos/default-dapp.svg',
  color: 'green',
};

export const PersonalSign: React.FC<PersonalSignProps> = ({ simulation }) => {
  const [metadata, setMetadata] = useState<Metadata>(defaultMetadata);
  const [chainLogoPath, setChainLogoPath] = useState<string>('/images/asset_logos/eth-mainnet.png');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const formatEthereumAddress = (address: string): string => {
    const prefix = address.substring(0, 8);
    const suffix = address.substring(address.length - 6);
    return `${prefix}...${suffix}`;
  };

  // Fetch the metadata json
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log('simulation.args.origin', simulation.args.origin);
      const response = await fetch(S3_URL_PROD + simulation.args.origin + '.json');
      const data = await response.json();

      // Add a delay of 2 seconds before setting the metadata
      // setTimeout(() => {
      setMetadata(data);
      setIsLoading(false);
      // }, 2000);
    };

    fetchData();
  }, []);

  // Set the chain logo path
  useEffect(() => {
    switch (simulation.args.chainId) {
      case '1':
      case '0x1':
        setChainLogoPath('/images/asset_logos/ethereum.png');
        break;
      case '42161':
      case '0xa4b1':
      case '0xA4B1':
        setChainLogoPath('/images/asset_logos/arbitrum.png');
        break;
      case '137':
      case '0x89':
        setChainLogoPath('/images/asset_logos/matic.png');
        break;
    }
  }, []);

  const unveil = isLoading ? '' : animations['unveil'];
  const hideOnLoading = isLoading ? animations['hide'] : '';
  const shimmer = isLoading ? animations['shimmer'] : '';

  return (
    <div className={styles['parent']}>
      <DappLogoWithChain
        name={metadata.name}
        logoPath={metadata.logo}
        chainLogoPath={chainLogoPath}
        color={metadata.color}
        isLoading={isLoading}
      />

      <div className={hideOnLoading}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div className={`${unveil} ${hideOnLoading} ${styles['row']}`} style={{ textAlign: 'right' }}>
            <p>Account</p>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <p>Your account</p>
              <p className={styles['c-grey']}>{formatEthereumAddress(simulation.signer)}</p>
            </div>
          </div>

          <div className={`${unveil}  ${styles['row']}`}>
            <p>Signing into</p>
            <div className={styles['df-ac-g5']}>
              <div
                className={`${hideOnLoading} ${shimmer}`}
                style={{ display: 'flex', height: '15px', width: '15px', borderRadius: '50%' }}
              >
                <img className={`${hideOnLoading}`} src={metadata.logo} />
              </div>
              <p>{simulation.args.origin}</p>
            </div>
          </div>

          <div
            className={`${unveil} ${hideOnLoading} ${styles['row']}`}
            style={{ flexDirection: 'column', textAlign: 'left', gap: '10px', height: '180px' }}
          >
            <p>You are signing</p>
            <p className={`${styles['scrollable']} ${styles['c-grey']}`}>{simulation.simulation?.decodedMessage}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={`${hideOnLoading} ${unveil}`}>
          <ConfirmSimulationButton storedSimulation={simulation} />
        </div>
      </div>
    </div>
  );
};
