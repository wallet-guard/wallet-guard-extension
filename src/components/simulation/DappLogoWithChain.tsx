import React, { useEffect, useState } from 'react';
import styles from '../../styles/simulation/DappLogoWithChain.module.css';

interface DappLogoWithChainProps {
  name: string;
  logoPath: string;
  chainLogoPath: string;
  color: string;
}

export const DappLogoWithChain: React.FC<DappLogoWithChainProps> = ({ name, logoPath, chainLogoPath, color }) => {
  const [backgroundGradient1, setBackgroundGradient1] = useState('');
  const [backgroundGradient2, setBackgroundGradient2] = useState('');

  useEffect(() => {
    switch (color) {
      case 'pink':
        setBackgroundGradient1(styles['pink-1']);
        setBackgroundGradient2(styles['pink-2']);
        break;
      case 'blue':
        setBackgroundGradient1(styles['blue-1']);
        setBackgroundGradient2(styles['blue-2']);
        break;
      case 'orange':
        setBackgroundGradient1(styles['orange-1']);
        setBackgroundGradient2(styles['orange-2']);
        break;
      case 'white':
        setBackgroundGradient1(styles['white-1']);
        setBackgroundGradient2(styles['white-2']);
        break;
      case 'purple':
        setBackgroundGradient1(styles['purple-1']);
        setBackgroundGradient2(styles['purple-2']);
        break;
      case 'green':
        setBackgroundGradient1(styles['green-1']);
        setBackgroundGradient2(styles['green-2']);
        break;
      case 'lime-green':
        setBackgroundGradient1(styles['lime-green-1']);
        setBackgroundGradient2(styles['lime-green-2']);
        break;
      case 'yellow':
        setBackgroundGradient1(styles['yellow-1']);
        setBackgroundGradient2(styles['yellow-2']);
        break;
      default:
    }
  }, [color]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12vh auto' }}>
        <div className={`${styles['blur-1']} ${backgroundGradient1}`}></div>
        <div className={`${styles['blur-common']} ${styles['filter-50']} ${backgroundGradient2}`}></div>
        <div className={`${styles['blur-common']} ${styles['filter-65']} ${backgroundGradient2}`}></div>
        <div className={`${styles['blur-common']} ${styles['filter-80']} ${backgroundGradient2}`}></div>
        <div className={`${styles['blur-common']} ${styles['filter-95']} ${backgroundGradient2}`}></div>
        <div className={`${styles['blur-common']} ${styles['logo-dapp']}`}>
          <img src={logoPath} alt="" width={'100%'} height={'100%'} />
        </div>
        <div className={styles['logo-chain']}>
          <img src={chainLogoPath} />
        </div>
        <div className={styles['text-dapp']}>
          {name}
        </div>
      </div>
    </>
  );
};
