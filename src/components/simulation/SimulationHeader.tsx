import React from 'react';
import { TwitterShareButton } from 'react-share';
import { RecommendedActionType } from '../../models/simulation/Transaction';
import { FaTwitter } from 'react-icons/fa';
import styles from '../simulation/simulation.module.css';
import { BsBellFill } from 'react-icons/bs';

interface SimulationHeaderProps {
  recommendedAction?: RecommendedActionType;
}

export const SimulationHeader: React.FC<SimulationHeaderProps> = ({ recommendedAction }) => {
  function getHeaderColor() {
    switch (recommendedAction) {
      case RecommendedActionType.None:
        return '#19FF00';
      case RecommendedActionType.Warn:
        return '#FF783E';
      case RecommendedActionType.Block:
        return '#F44B4C';
      default:
        return '#0b0b0b';
    }
  }

  const headerColor = getHeaderColor();

  return (
    <div className="container">
      <div
        style={{
          height: '2px',
          width: '100vw',
          position: 'absolute',
          left: 0,
          background: headerColor,
          boxShadow: `0 2px 10px ${headerColor}`,
          opacity: '80%',
        }}
      />
      <div
        className="justify-content-between"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '70px',
        }}
      >
        <img src="/images/wg_logos/logo_official.png" alt="" />

        <div style={{ display: 'flex', float: 'right' }}>
          {/* TODO: Make this go back to the dashboard */}
          <div className={styles['buttonWithIcon']} style={{ marginRight: '10px' }}>
            <BsBellFill />
          </div>

          <TwitterShareButton
            url={'https://walletguard.app'}
            title={'Join myself and 20,000+ others who are protecting our assets with Wallet Guard'}
            via={'wallet_guard'}
          >
            <div className={styles['buttonWithIcon']}>
              Share
              <FaTwitter style={{ marginLeft: '5px' }} />
            </div>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};
