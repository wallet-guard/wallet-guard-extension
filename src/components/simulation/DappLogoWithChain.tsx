import React, { useEffect, useState } from 'react';
import styles from '../../styles/simulation/DappLogoWithChain.module.css';
import animations from '../../styles/CommonAnimations.module.css';

interface DappLogoWithChainProps {
  name: string;
  logoPath: string;
  chainLogoPath: string;
  color: string;
  isLoading: boolean;
}

export const DappLogoWithChain: React.FC<DappLogoWithChainProps> = ({ name, logoPath, chainLogoPath, color, isLoading }) => {
  const [backgroundGradient1, setBackgroundGradient1] = useState('');
  const [backgroundGradient2, setBackgroundGradient2] = useState('');
  const [loaded, setLoaded] = useState(!isLoading);

  useEffect(() => {
    if (loaded) {
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
    } else {
      setBackgroundGradient1(styles['white-1']);
      setBackgroundGradient2(styles['white-2']);
    }
  }, [color, loaded]);

  useEffect(() => {
    if (!isLoading) {
      setLoaded(true);
    }
  }, [isLoading]);

  const logoClass = isLoading ? animations['shimmer'] : '';
  const pulsateClass = isLoading ? animations['pulsate'] : animations['grow'];
  const pulsateGrowClass50 = isLoading ? animations['pulsate'] : animations['grow-50'];
  const pulsateGrowClass65 = isLoading ? animations['pulsate'] : animations['grow-65'];
  const pulsateGrowClass80 = isLoading ? animations['pulsate'] : animations['grow-80'];
  const pulsateGrowClass95 = isLoading ? animations['pulsate'] : animations['grow-95'];
  const unveilClass = isLoading ? '' : animations['unveil'];
  const hideOnLoading = isLoading ? animations['hide'] : '';

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12vh auto' }}>
        <div className={`${styles['blur-1']} ${backgroundGradient1} ${pulsateClass} ${unveilClass}`}></div>
        <div className={`${styles['blur-common']} ${styles['filter-50']} ${backgroundGradient2} ${pulsateGrowClass50}`}></div>
        <div className={`${styles['blur-common']} ${styles['filter-65']} ${backgroundGradient2} ${pulsateGrowClass65}`}></div>
        <div className={`${styles['blur-common']} ${styles['filter-80']} ${backgroundGradient2} ${pulsateGrowClass80}`}></div>
        <div className={`${styles['blur-common']} ${styles['filter-95']} ${backgroundGradient2} ${pulsateGrowClass95}`}></div>
        <div className={`${styles['blur-common']} ${styles['logo-dapp']} ${logoClass} ${unveilClass}`}>
          <img className={hideOnLoading} src={logoPath} alt="" width={'100%'} height={'100%'}/> 
        </div>
        <div className={`${styles['logo-chain']} ${unveilClass}`}>
          <img className={`${hideOnLoading}`} src={chainLogoPath} width={'100%'} height={'100%'}/>
        </div>
        <div className={`${styles['text-dapp']} ${unveilClass}`}>
          {name}
        </div>
      </div>
    </>
  );
};