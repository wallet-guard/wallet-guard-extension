import React from 'react';
import styles from './simulation.module.css';
import { TransactionDetailLabel } from './SimulationSubComponents/transactionDetails/TransactionDetailLabel';

export function TransactionDetails() {
  return (
    <div className={styles.transactionDetailsCard}>
      <p>Transaction Details</p>

      <div className="row">
        <div className="col-6">
          <TransactionDetailLabel labelText="Chain" />
          <p className={styles['label-xs']}>Chain</p>
          <p className={styles['text-sm']}>ETHEREUM</p>
        </div>
        <div className="col-6">
          <p>Contract</p>
          <p>0x008..d6</p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <p>Website</p>
          <p>opensea-mint.com</p>
        </div>
        <div className="col-6">
          <p>Interacting with</p>
          <p>Unknown address</p>
        </div>
      </div>

      {/* Start of risk component */}
    </div>
  );
}
