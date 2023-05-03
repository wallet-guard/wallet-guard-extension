import React, {useEffect, useState } from 'react';
import { StoredSimulation } from '../../lib/simulation/storage';
import { DappLogoWithChain } from './DappLogoWithChain';
import styles from '../../styles/simulation/PersonalSign/PersonalSign.module.css';
import { S3_URL_PROD } from '../../lib/environment';

interface PersonalSignProps {
  simulation: StoredSimulation;
}

interface Metadata {
  name: string;
  logo: string; 
  color: string;
}

const defaultMetadata: Metadata = {
  name: '',
  logo: '',
  color: ''
};


export const PersonalSign: React.FC<PersonalSignProps> = ({ simulation }) => {
  const [metadata, setMetadata] = useState<Metadata>(defaultMetadata);
  const [chainLogoPath, setChainLogoPath] = useState<string>('/images/asset_logos/eth-mainnet.png');

  const formatEthereumAddress = (address: string): string => {
    const prefix = address.substring(0, 8);
    const suffix = address.substring(address.length - 6);
    return `${prefix}...${suffix}`;
  }

  // Fetch the metadata json
  useEffect(() => {
    const fetchData = async () => {
      console.log("simulation.args.origin", simulation.args.origin)
      const response = await fetch(S3_URL_PROD + simulation.args.origin + '.json');
      const data = await response.json();
      setMetadata(data);
    };

    fetchData();
  }, []);

  // Set the chain logo path
  useEffect(() => {
    switch (simulation.args.chainId) {
      case '1':
        setChainLogoPath('/images/asset_logos/eth-mainnet.png');
        break;
      case '42161':
        setChainLogoPath('/images/asset_logos/arbitrum-one.png');
        break;
    }
  }, []);

  return (
    <div className={styles['parent']}>
      <DappLogoWithChain
        name={metadata.name}
        logoPath={metadata.logo}
        chainLogoPath={chainLogoPath}
        color={metadata.color}
      />
      <div className={styles['row']} style={{ textAlign: 'right' }}>
        <div>Account</div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <p>Your account</p>
          <p className={styles['c-grey']}>{formatEthereumAddress(simulation.signer)}</p>
        </div>
      </div>

      <div className={styles['row']}>
        <div>Signing into</div>
        <div className={styles['df-ac-g5']}>
          <div style={{ display: 'flex', height: '15px', width: '15px', borderRadius: '50%' }}>
            <img src={metadata.logo}/>
          </div>
          <p>{simulation.args.origin}</p>
        </div>
      </div>

      <div className={styles['row']} style={{flexDirection:'column', textAlign:'left', gap:'10px'}}>
        <div>You are signing</div>
        <div className={`${styles['scrollable']} ${styles['c-grey']}`}>
          {simulation.simulation?.decodedMessage}
        </div>
      </div>
    </div>
  );
};