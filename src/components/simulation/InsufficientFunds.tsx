import React from 'react';
import { StoredSimulation } from '../../lib/simulation/storage';
import { ConfirmSimulationButton } from './ConfirmSimulationButton';
import styles from './simulation.module.css';
import { SimulationHeader } from './SimulationHeader';

interface InsufficientFundsProps {
  filteredSimulations: StoredSimulation[];
}

export const InsufficientFunds = (props: InsufficientFundsProps) => {
  const { filteredSimulations } = props;

  return (
    <div>
      <SimulationHeader />
      <div className="row text-center" style={{ marginTop: '65px' }}>
        <div className="col-12">
          <img src="/images/popup/simulation_error.png" alt="error" width={150} />
        </div>
      </div>
      <div className="row pt-5 text-center pl-4 pr-4">
        <div className="col-12">
          <h4 className={`${styles['font-archivo-medium']}`} style={{ color: 'white', marginBottom: '20px' }}>
            Insufficient funds
          </h4>
          {/* TODO: Circle back to this */}
          {/* <div className="text-center">
            <p className={`${styles['font-archivo-medium']} text-muted`} style={{ marginBottom: 0 }}>
              Balance:
            </p>
            <p className={`${styles['font-archivo-medium']}`} style={{ color: 'white' }}>
              0.005 ETH
            </p>

            <p className={`${styles['font-archivo-medium']} text-muted`} style={{ marginBottom: 0 }}>
              Transaction:
            </p>
            <p className={`${styles['font-archivo-medium']}`} style={{ color: 'white' }}>
              0.14 ETH + gas
            </p>
          </div> */}
        </div>
      </div>
      <ConfirmSimulationButton storedSimulation={filteredSimulations && filteredSimulations[0]} />
    </div>
  );
};
