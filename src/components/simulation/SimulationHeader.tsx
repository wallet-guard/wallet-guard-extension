import React from 'react';
import { RecommendedActionType } from '../../models/simulation/Transaction';
import { NavbarShareButton } from '../common/NavbarShareButton';
import { CiSettings } from 'react-icons/ci';
import { openDashboard } from '../../lib/helpers/linkHelper';
import styles from '../common/common.module.css';

interface SimulationHeaderProps {
  // Details are all or nothing
  details?: {
    recommendedAction: RecommendedActionType;
    verified: boolean;
  };
}

export const SimulationHeader: React.FC<SimulationHeaderProps> = ({ details }) => {
  const recommendedAction = details?.recommendedAction || undefined;
  const verified = details?.verified || false;

  function getHeaderColor() {
    if (verified) {
      return '#19FF00';
    } else if (recommendedAction === RecommendedActionType.Block) {
      return '#F44B4C';
    } else if (recommendedAction === RecommendedActionType.Warn) {
      return '#FF783E';
    } else if (recommendedAction === RecommendedActionType.None) {
      return '#646464';
    }

    return '#0b0b0b';
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

        <div style={{ display: 'flex', float: 'right', fontFamily: 'ArchivoBold' }}>
          {/* <NavbarNotifications /> */}
          <NavbarShareButton />

          <CiSettings
            onClick={() => openDashboard('settings')}
            size={34}
            className={styles['settingsIcon']} />
        </div>
      </div>
    </div>
  );
};
