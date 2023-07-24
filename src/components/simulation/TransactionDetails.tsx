import React from 'react';
import styles from './simulation.module.css';
import { TransactionDetailLabel } from './SimulationSubComponents/transactionDetails/TransactionDetailLabel';
import { StoredSimulation } from '../../lib/simulation/storage';

interface TransactionDetailsProps {
  currentSimulation: StoredSimulation;
}

export function TransactionDetails(props: TransactionDetailsProps) {
  const { currentSimulation } = props;

  return (
    <div className={styles.transactionDetailsCard}>
      <p>Transaction Details</p>

      <div className="row">
        <div className="col-6">
          <TransactionDetailLabel labelText="Chain" />
          {/* todo: make a component that takes chainid as input and maps that to an icon+label */}
          <p className={styles['text-sm']}>{currentSimulation.args.chainId}</p>
        </div>
        <div className="col-6">
          <TransactionDetailLabel labelText="Contract" />
          <p>0x008..d6</p>
          {/* todo: make a component that takes contract, and verified flags as input and maps that to the respective icons */}
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <TransactionDetailLabel labelText="Website" />
          {/* todo: create a component that takes scanresult as input */}
          <p>opensea-mint.com</p>
        </div>
        <div className="col-6">
          <TransactionDetailLabel labelText="Interacting with" />
          <p>Unknown address</p>
        </div>
      </div>

      {/* Start of risk component */}
    </div>
  );
}
