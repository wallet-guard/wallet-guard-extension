import React, { useEffect, useState } from 'react';

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
        setBackgroundGradient1(
          'radial-gradient(88.3% 88.3% at 50% 95%, rgba(255, 0, 122, 0.5) 0%, rgba(255, 0, 122, 0) 100%)'
        );
        setBackgroundGradient2(
          'radial-gradient(88.3% 88.3% at 50% 100%, #FF007A 0%, rgba(255, 0, 122, 0) 100%)'
        );
        break;
      case 'blue':
        setBackgroundGradient1(
          'radial-gradient(88.3% 88.3% at 50% 95%, rgba(26, 106, 185, 0.5) 0%, rgba(122, 0, 255, 0) 100%)'
        );
        setBackgroundGradient2(
          'radial-gradient(88.3% 88.3% at 50% 100%, rgb(26, 106, 185) 0%, rgba(122, 0, 255, 0) 100%)'
        );
        break;
      case 'orange':
        setBackgroundGradient1(
          'radial-gradient(88.3% 88.3% at 50% 95%, rgba(255, 122, 0, 0.5) 0%, rgba(255, 122, 0, 0) 100%)'
        );
        setBackgroundGradient2(
          'radial-gradient(88.3% 88.3% at 50% 100%, rgb(255, 122, 0) 0%, rgba(255, 122, 0, 0) 100%)'
        );
        break;
      case 'white':
        setBackgroundGradient1(
          'radial-gradient(88.3% 88.3% at 50% 95%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)'
        );
        setBackgroundGradient2(
          'radial-gradient(88.3% 88.3% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)'
        );
        break;
      case 'purple':
        setBackgroundGradient1(
          'radial-gradient(88.3% 88.3% at 50% 95%, rgba(122, 0, 255, 0.5) 0%, rgba(122, 0, 255, 0) 100%)'
        );
        setBackgroundGradient2(
          'radial-gradient(88.3% 88.3% at 50% 100%, rgb(122, 0, 255) 0%, rgba(122, 0, 255, 0) 100%)'
        );
        break;
      case 'green':
        setBackgroundGradient1(
          'radial-gradient(88.3% 88.3% at 50% 95%, rgba(0, 255, 122, 0.5) 0%, rgba(0, 255, 122, 0) 100%)'
        );
        setBackgroundGradient2(
          'radial-gradient(88.3% 88.3% at 50% 100%, rgb(0, 255, 122) 0%, rgba(0, 255, 122, 0) 100%)'
        );             
        break;
      case 'lime-green':
        setBackgroundGradient1(
          'radial-gradient(88.3% 88.3% at 50% 95%, rgba(144, 255, 0, 0.5) 0%, rgba(0, 255, 122, 0) 100%)'
        );
        setBackgroundGradient2(
          'radial-gradient(88.3% 88.3% at 50% 100%, rgb(144, 255, 0) 0%, rgba(0, 255, 122, 0) 100%)'
        );
        break;
      case 'yellow':
        setBackgroundGradient1(
          'radial-gradient(88.3% 88.3% at 50% 95%, rgba(255, 255, 0, 0.5) 0%, rgba(255, 255, 0, 0) 100%)'
        );
        setBackgroundGradient2(
          'radial-gradient(88.3% 88.3% at 50% 100%, rgb(255, 255, 0) 0%, rgba(255, 255, 0, 0) 100%)'
        );
        break;

      default:
    }
  }, [color]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12vh auto' }}>
        <div style={{ background: backgroundGradient1, filter: 'blur(50px)', width: '206px', height: '206px' }}></div>
        <div
          style={{
            position: 'absolute',
            zIndex: '0',
            background: backgroundGradient2,
            filter: 'blur(50px)',
            width: '103px',
            height: '103px',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            zIndex: '0',
            background: backgroundGradient2,
            filter: 'blur(65px)',
            width: '103px',
            height: '103px',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            zIndex: '0',
            background: backgroundGradient2,
            filter: 'blur(80px)',
            width: '103px',
            height: '103px',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            zIndex: '0',
            background: backgroundGradient2,
            filter: 'blur(95px)',
            width: '103px',
            height: '103px',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            zIndex: '1',
            borderRadius: '50%',
            width: '103px',
            height: '103px',
            overflow: 'hidden',
            margin: 'auto',
            boxShadow: '0px 11px 4px rgba(0,0,0,0.25)',
          }}
        >
          <img src={logoPath} alt="" width={'100%'} height={'100%'} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: '2',
            background: 'white',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            margin: '64px 0px 0px 76px',
            boxShadow: '0px 8px 8px rgba(0,0,0,0.25)',
          }}
        >
          <img src={chainLogoPath} />
        </div>
        <div style={{ position: 'absolute', zIndex: '3', marginTop: '175px', fontSize: '32px', color: 'white' }}>
          {name}
        </div>
      </div>
    </>
  );
};
