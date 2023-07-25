import React, { useContext } from 'react';
import styles from './simulation.module.css';
import { TransactionDetailLabel } from './SimulationSubComponents/transactionDetails/TransactionDetailLabel';
import { SimulationContext } from '../../lib/context/context';
import { ChainDetail } from './SimulationSubComponents/transactionDetails/ChainDetail';
import { ContractDetail } from './SimulationSubComponents/transactionDetails/ContractDetail';
import { WebsiteDetail } from './SimulationSubComponents/transactionDetails/WebsiteDetail';

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
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <TransactionDetailLabel labelText="Website" />
          <WebsiteDetail scanResult={currentSimulation?.simulation?.scanResult} />
        </div>
      </div>

      {/* Start of risk component */}
    </div>
  );
}
