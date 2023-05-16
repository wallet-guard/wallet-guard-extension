import React from 'react';
import styles from '../simulation.module.css';

export const SimulationLoading = () => {
  return (
    <div>
        <div className="row text-center" style={{ marginTop: '50%' }}>
          <div className="col">
            <img src="/images/popup/RunMichaelK.gif" alt="" width={150} />
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
