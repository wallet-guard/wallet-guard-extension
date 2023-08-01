import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TwitterShareButton } from 'react-share';
import { StoredSimulation } from '../../lib/simulation/storage';
import { RecommendedActionType } from '../../models/simulation/Transaction';

interface SimulationHeaderProps {
  storedSimulation?: StoredSimulation;
}

export const SimulationHeader: React.FC<SimulationHeaderProps> = ({ storedSimulation }) => {
  function getHeaderColor() {
    switch (storedSimulation?.simulation?.recommendedAction) {
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
          paddingRight: '10px',
          height: '70px',
        }}
      >
        <div>
          <img src="/images/wg_logos/Wallpaper-Transparent.png" alt="" width={'150px'} />
        </div>

        <div style={{ float: 'right' }}>
          <TwitterShareButton
            url={'https://walletguard.app'}
            title={'Join myself and 20,000+ others who are protecting our assets with Wallet Guard'}
            via={'wallet_guard'}
          >
            <a style={{ color: 'white' }} className="btn btn-dark">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};
