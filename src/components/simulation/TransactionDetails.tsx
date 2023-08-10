import React from 'react';
import styles from './simulation.module.css';
import { TransactionDetailLabel } from './SimulationSubComponents/transactionDetails/TransactionDetailLabel';
import { ChainDetail } from './SimulationSubComponents/transactionDetails/ChainDetail';
import { ContractDetail } from './SimulationSubComponents/transactionDetails/ContractDetail';
import { WebsiteDetail } from './SimulationSubComponents/transactionDetails/WebsiteDetail';
import { AddressType, RecommendedActionType } from '../../models/simulation/Transaction';
import { RiskFactors } from './SimulationSubComponents/transactionDetails/RiskFactors';
import { SimulationBaseProps } from '../../pages/popup';

export function TransactionDetails(props: SimulationBaseProps) {
  const { currentSimulation } = props;

  return (
    <div className="container">
      <div
        className={
          currentSimulation.simulation.riskFactors
            ? styles.transactionDetailsCardWithWarnings
            : styles.transactionDetailsCard
        }
      >
        <p className={styles['heading-md']} style={{ marginBottom: '10px', textTransform: 'none' }}>
          Transaction Details
        </p>

        <div className="row mb-3">
          <div className="col-6">
            <TransactionDetailLabel labelText="Chain" />
            <ChainDetail chainId={currentSimulation.args.chainId} />
          </div>
          <div className="col-6">
            <TransactionDetailLabel
              labelText={
                currentSimulation.simulation.addressDetails.addressType === AddressType.Contract
                  ? 'Contract'
                  : 'Address'
              }
            />
            <ContractDetail addressDetails={currentSimulation.simulation.addressDetails} />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <TransactionDetailLabel labelText="Website" />
            <WebsiteDetail
              verified={currentSimulation.simulation.scanResult.verified || false}
              domainName={currentSimulation.simulation.scanResult.domainName || ''}
              recommendedAction={currentSimulation.simulation.recommendedAction || RecommendedActionType.None}
            />
          </div>
        </div>
      </div>
      {currentSimulation.simulation.riskFactors && (
        <RiskFactors
          riskFactors={currentSimulation.simulation.riskFactors}
          recommendedAction={currentSimulation.simulation.recommendedAction}
          overviewMessage={currentSimulation.simulation.overviewMessage}
        />
      )}
    </div>
  );
}
