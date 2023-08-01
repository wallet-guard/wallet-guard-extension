import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { TwitterShareButton } from 'react-share';
import { StoredSimulation } from '../../lib/simulation/storage';
import { RecommendedActionType } from '../../models/simulation/Transaction';

interface SimulationHeaderProps {
  storedSimulation?: StoredSimulation;
  showChatWeb3?: boolean | undefined;
  setShowChatWeb3?: Dispatch<SetStateAction<boolean>> | undefined;
}

export const SimulationHeader: React.FC<SimulationHeaderProps> = ({
  showChatWeb3,
  setShowChatWeb3,
  storedSimulation,
}) => {
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
      {/* todo: add glow here */}
      <div style={{ height: '2px', width: '100vw', position: 'absolute', left: 0, background: headerColor }} />
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
