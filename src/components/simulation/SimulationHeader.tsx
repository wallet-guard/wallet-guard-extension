import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TwitterShareButton } from 'react-share';
import styles from './simulation.module.css';

export const SimulationHeader = () => {
  return (
    <div style={{ marginTop: '-10px', marginBottom: '-10px' }}>
      <div className="justify-content-between" style={{ display: 'flex' }}>
        <div className="">
          <img src="/images/wg_logos/Wallpaper-Transparent.png" alt="" width={'175px'} />
        </div>

        <div className="" style={{ float: 'right', paddingTop: '30px', paddingRight: '30px' }}>
          <TwitterShareButton
            url={'https://walletguard.app'}
            title={'Have feedback, a suggestion, or just want to share how Wallet Guard has helped you? Tweet at us!'}
            via={'wallet_guard'}
          >
            <a style={{ color: 'white' }} className="btn btn-dark">
              <div>
                <b className={`${styles['font-archivo-bold']} pr-2`}>Share</b>
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </div>
            </a>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};
