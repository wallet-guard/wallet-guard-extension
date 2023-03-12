import React from 'react';
import styles from '../../simulation.module.css';

export default function InsufficientFundsComponent() {
  return (
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
  );
}
