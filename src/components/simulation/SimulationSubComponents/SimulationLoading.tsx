import React from 'react';
import styles from '../simulation.module.css';

export const SimulationLoading = () => {
  function getRandomGif() {
    const rand = Math.floor(Math.random() * 3) + 1;

    switch (rand) {
      case 1:
        return "/images/popup/RunMichaelK.gif";
      case 2:
        return "/images/popup/PenguinRunLeft.gif";
      case 3:
        return "/images/popup/PenguinRunRight.gif";
      default:
        return "/images/popup/RunMichaelK.gif";
    }
  }

  const loadingGif = getRandomGif();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="row text-center" style={{ marginTop: '50%' }}>
        <div className="col" style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={loadingGif} alt="" width={150} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className={styles['bouncing-loader']}></div>
        </div>
      </div>
    </div>
  );
};
