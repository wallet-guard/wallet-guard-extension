import React, { useContext } from 'react';
import styles from './simulation.module.css';
import { TransactionDetailLabel } from './SimulationSubComponents/transactionDetails/TransactionDetailLabel';
import { SimulationContext } from '../../lib/context/context';
import { ChainDetail } from './SimulationSubComponents/transactionDetails/ChainDetail';
import { ContractDetail } from './SimulationSubComponents/transactionDetails/ContractDetail';

export function TransactionDetails() {
  const { currentSimulation } = useContext(SimulationContext);

  return (
    <div className={styles.transactionDetailsCard}>
      <p className={styles['text-md']} style={{ marginBottom: '10px' }}>
        Transaction Details
      </p>

      <div className="row mb-2">
        <div className="col-6">
          <TransactionDetailLabel labelText="Chain" />
          <ChainDetail chainId={currentSimulation?.args.chainId || '0x1'} />
        </div>
        <div className="col-6">
          <TransactionDetailLabel labelText="Contract" />
          <ContractDetail addressDetails={currentSimulation?.simulation?.addressDetails} />
          {/* <p className={styles['text-md']}>0x008..d6</p> */}
          {/* todo: make a component that takes contract, and verified flags as input and maps that to the respective icons */}
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <TransactionDetailLabel labelText="Website" />
          {/* todo: create a component that takes scanresult as input */}
          <p className={styles['text-md']}>opensea-mint.com</p>
        </div>
      </div>

      {/* Start of risk component */}
    </div>
  );
}
