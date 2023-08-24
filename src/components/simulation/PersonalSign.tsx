import React, { useEffect, useState } from 'react';
import { CompletedSuccessfulSimulation } from '../../lib/simulation/storage';
import { DappLogoWithChain } from './DappLogoWithChain';
import styles from '../../styles/simulation/PersonalSign/PersonalSign.module.css';
import animations from '../../styles/CommonAnimations.module.css';
import { CDN_URL_PROD } from '../../lib/environment';
import { getDomainNameFromURL } from '../../lib/helpers/phishing/parseDomainHelper';
import { getAssetLogo } from '../../lib/helpers/chainMappings';
import { WebsiteVerificationBadge } from './SimulationSubComponents/WebsiteVerificationBadge';

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

interface PersonalSignProps {
  currentSimulation: CompletedSuccessfulSimulation;
}

export const PersonalSign: React.FC<PersonalSignProps> = (props: PersonalSignProps) => {
  const { currentSimulation } = props;
  const [metadata, setMetadata] = useState<Metadata>(defaultMetadata);
  const [chainLogoPath, setChainLogoPath] = useState<string>('images/asset_logos/ethereum.png');
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
      const domainName = getDomainNameFromURL(currentSimulation.args.origin);
      const response = await fetch(CDN_URL_PROD + `/url/metadata/${domainName}.json`);
      if (response.ok) {
        const data = await response.json();
        setMetadata(data);
        setIsLoading(false);
      } else {
        setMetadata(defaultMetadata);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Set the chain logo path
  useEffect(() => {
    const logoPath = getAssetLogo(currentSimulation.args.chainId);
    setChainLogoPath(logoPath);
  }, []);

  const unveil = isLoading ? '' : animations['unveil'];
  const hideOnLoading = isLoading ? animations['hide'] : '';
  const shimmer = isLoading ? animations['shimmer'] : '';

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                <p className={styles['c-grey']}>{formatEthereumAddress(currentSimulation.signer || '')}</p>
              </div>
            </div>

            <div className={`${unveil}  ${styles['row']}`}>
              <p>Signing into</p>
              <div className={styles['df-ac-g5']}>
                <div
                  className={`${hideOnLoading} ${shimmer}`}
                  style={{ display: 'flex', height: '18px', width: '18px' }}
                >
                  <WebsiteVerificationBadge verified={currentSimulation.simulation.scanResult.verified} recommendedAction={currentSimulation.simulation.recommendedAction} tooltipPosition='left' />
                </div>
                <p className='ml-1'>{getDomainNameFromURL(currentSimulation.args.origin)}</p>
              </div>
            </div>

            <div
              className={`${unveil} ${hideOnLoading} ${styles['row']}`}
              style={{ flexDirection: 'column', textAlign: 'left', gap: '10px', height: '180px' }}
            >
              <p>You are signing</p>
              <p className={`${styles['scrollable']} ${styles['c-grey']}`}>
                {currentSimulation.simulation.decodedMessage || ''}
              </p>
            </div>
          </div>
        </div>

        <div className={`${hideOnLoading} ${unveil}`}></div>
      </div>
    </div>
  );
};
