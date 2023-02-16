import React from 'react';
import styles from './simulation.module.css';
import { SimulationHeader } from './SimulationHeader';

export const NoSimulation = () => {
  return (
    <div>
      <SimulationHeader />
      <div className="row text-center" style={{ marginTop: '160px' }}>
        <div className="col-12">
          <img src="/images/wg_logos/Logo-Large-Transparent.png" alt="" width={220} />
        </div>
      </div>
      <div className="row pt-5 text-center pl-4 pr-4">
        <div className="col-12">
          <h5 className={`${styles['font-archivo-bold']}`} style={{ color: 'white' }}>
            Start a transaction on Ethereum Mainnet to create a simulation
          </h5>
        </div>
      </div>
    </div>
  );
};
