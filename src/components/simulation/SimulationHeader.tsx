import React from 'react';
import { RecommendedActionType } from '../../models/simulation/Transaction';
import styles from '../simulation/simulation.module.css';
import { BsBellFill } from 'react-icons/bs';
import { NavbarShareButton } from '../common/NavbarShareButton';
import { NavbarNotifications } from '../common/NavbarNotifications';

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

        <div style={{ display: 'flex', float: 'right', fontFamily: 'ArchivoBold' }}>
          {/* <NavbarNotifications /> */}
          <NavbarShareButton />
        </div>
      </div>
    </div>
  );
};
