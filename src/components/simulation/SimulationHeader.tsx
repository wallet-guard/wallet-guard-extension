import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TwitterShareButton } from 'react-share';
import styles from './simulation.module.css';
import { StoredSimulation } from '../../lib/simulation/storage';
import posthog from 'posthog-js';

interface SimulationHeaderProps {
  storedSimulation?: StoredSimulation;
  showChatWeb3?: boolean | undefined;
  setShowChatWeb3?: any;
}

export const SimulationHeader: React.FC<SimulationHeaderProps> = ({
  showChatWeb3,
  setShowChatWeb3,
  storedSimulation,
}) => {
  return (
    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
      <div className="justify-content-between" style={{ display: 'flex' }}>
        <div>
          <img src="/images/wg_logos/Wallpaper-Transparent.png" alt="" width={'175px'} />
        </div>

        <div style={{ float: 'right', paddingTop: '30px', paddingRight: '20px' }}>
          <TwitterShareButton
            url={'https://walletguard.app'}
            title={'Join myself and 20,000+ others who are protecting our assets with Wallet Guard'}
            via={'wallet_guard'}
          >
            <a style={{ color: 'white' }} className="btn btn-dark">
              <div>
                {/* <b className={`${styles['font-archivo-medium']} pr-2`}>Share</b> */}
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </div>
            </a>
          </TwitterShareButton>

          <button
            style={{ color: 'white' }}
            className="btn btn-dark ml-2"
            onClick={() => {
              setShowChatWeb3(!showChatWeb3);
              posthog.capture('chatweb3 opened', { source: 'simulation' });
            }}
          >
            <div style={{ display: 'flex', padding: '0.75px' }}>
              <img
                src="/images/wg_logos/Logo-Large-Transparent.png"
                alt=""
                width={'18px'}
                style={{ alignSelf: 'center' }}
              />

              <b className={`${styles['font-archivo-medium']} pr-2 pl-1`}> ChatWeb3</b>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
