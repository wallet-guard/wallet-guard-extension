import React from 'react';
import { useState, useEffect } from 'react';
import { StoredSimulation } from '../../lib/simulation/storage';
import './simulation.module.css';

interface PersonalSignRowProps {
  flexDirection?: 'column' | 'row';
  textAlign?: 'left' | 'right';
  gap?: string;
}

const PersonalSignRow: React.FC<PersonalSignRowProps> = ({ flexDirection, textAlign, gap, children }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: flexDirection,
          gap: gap,
          padding: '1rem 0rem',
          justifyContent: 'space-between',
          color: 'white',
          borderBottom: '0.5px solid #3F3F3F',
          textAlign: textAlign
        }}
      >
        {children}
      </div>
    </>
  );
};

interface LogoWithChainIconProps {
  logoPath: string;
  chainLogoPath: string;
  color: 'green' | 'pink';
}

const LogoWithChainIcon: React.FC<LogoWithChainIconProps> = ({ logoPath, chainLogoPath, color }) => {
  const [backgroundGradient1, setBackgroundGradient1] = useState('');
  const [backgroundGradient2, setBackgroundGradient2] = useState('');

  useEffect(() => {
    switch (color) {
      case 'pink':
        setBackgroundGradient1('radial-gradient(88.3% 88.3% at 50% 95%, rgba(255, 0, 122, 0.2) 0%, rgba(255, 0, 122, 0) 100%)');
        setBackgroundGradient2('radial-gradient(88.3% 88.3% at 50% 100%, #FF007A 0%, rgba(255, 0, 122, 0) 100%)');
        break;
      default:
    }
  }, [color]);

  return (
    <>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'12vh auto'}}>
        <div style={{background: backgroundGradient1,filter:'blur(50px)',width:'206px',height:'206px'}}></div>
        <div style={{position:'absolute',zIndex:'1',background: backgroundGradient2, filter:'blur(50px)',width:'103px',height:'103px'}}></div>
        <div style={{position:'absolute',zIndex:'2',borderRadius:'50%',width:'103px',height:'103px',overflow:'hidden',margin:'auto',background:'white',boxShadow:'0px 11px 4px rgba(0,0,0,0.25)'}}>
          <img src={logoPath} alt="" width={'100%'} height={'100%'} style={{padding: '10px'}} />
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'absolute',zIndex:'3',background:'white',width:'36px',height:'36px',borderRadius:'50%',margin:'64px 0px 0px 76px',boxShadow:'0px 8px 8px rgba(0,0,0,0.25)'}}><img src={chainLogoPath}/></div>
        <div style={{position:'absolute', zIndex: '4', marginTop: "175px", fontSize: "32px", color: "white"}}>Uniswap</div>
      </div>
    </>
  );
};

export const PersonalSign = ({ simulation }: { simulation: StoredSimulation }) => {
  function formatEthereumAddress(address: string): string {
    const prefix = address.substring(0, 8);
    const suffix = address.substring(address.length - 6);
    return `${prefix}...${suffix}`;
  }

  return (
    <div style={{ margin: 'auto', fontFamily: 'ArchivoLight', maxWidth: '500px'}}>
      <LogoWithChainIcon
        logoPath="/images/asset_logos/Uniswap_Logo.svg"
        chainLogoPath="/images/asset_logos/eth-mainnet.png"
        color='pink'
      />
      <PersonalSignRow textAlign='right'>
        <div>Account</div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <p style={{ margin: 0 }}>Your account</p>
          <p style={{ color: '#636363' }}>{formatEthereumAddress(simulation.signer)}</p>
        </div>
      </PersonalSignRow>

      <PersonalSignRow>
        <div>Signing into</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ display: 'flex', background: 'white', marginTop: '1.5px', height: '15px', width: '15px', borderRadius: '50%' }}>
            <img src="/images/asset_logos/Uniswap_Logo.svg" style={{ padding: '1px' }}/>
          </div>
          <p style={{marginBottom: '0'}}>{simulation.simulation?.scanResult.domainName}</p>
        </div>
      </PersonalSignRow>

      <PersonalSignRow flexDirection='column' textAlign='left' gap='10px'>
        <div>You are signing</div>
        <div className="scrollable" style={{ color: '#636363', maxHeight: 'min(70px, 100%)', overflow: 'scroll' }}>
          {simulation.simulation?.decodedMessage}
        </div>
      </PersonalSignRow>
    </div>
  );
};