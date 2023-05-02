import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TwitterShareButton } from 'react-share';
import styles from '../../simulation/simulation.module.css';
import { SettingsIcon } from '@chakra-ui/icons';

export const PopupHeader = () => {
  return (
    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
      <div className="justify-content-between" style={{ display: 'flex' }}>
        <div>
          <img src="/images/wg_logos/Wallpaper-Transparent.png" alt="" width={'150px'} />
        </div>

        <div style={{ float: 'right', paddingTop: '20px', paddingRight: '20px' }}>
          <TwitterShareButton
            url={'https://walletguard.app'}
            title={'Join myself and 10,000+ others who are protecting our assets with Wallet Guard'}
            via={'wallet_guard'}
          >
            <a style={{ color: 'white' }} className="btn btn-dark">
              <div>
                <b className={`${styles['font-archivo-medium']} pr-2`}>Share</b>
                <FontAwesomeIcon icon={faTwitter} size="sm" />
              </div>
            </a>
          </TwitterShareButton>
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};
