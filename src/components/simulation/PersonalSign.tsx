import React, {useEffect, useState } from 'react';
import { StoredSimulation } from '../../lib/simulation/storage';
import { DappLogoWithChain } from './DappLogoWithChain';
import styles from '../../styles/simulation/PersonalSign/PersonalSign.module.css';

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

  const formatEthereumAddress = (address: string): string => {
    const prefix = address.substring(0, 8);
    const suffix = address.substring(address.length - 6);
    return `${prefix}...${suffix}`;
  }

  // Fetch the metadata json
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://walletguard-public-prod.s3.us-east-2.amazonaws.com/url/metadata/'+ simulation.simulation?.scanResult.domainName + '.json');
      const data = await response.json();
      setMetadata(data);
    };

    fetchData();
  }, []);

  return (
    <div className={styles['parent']}>
      <DappLogoWithChain
        name={metadata.name}
        logoPath={metadata.logo}
        chainLogoPath="/images/asset_logos/eth-mainnet.png"
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
          <p>{simulation.simulation?.scanResult.domainName}</p>
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