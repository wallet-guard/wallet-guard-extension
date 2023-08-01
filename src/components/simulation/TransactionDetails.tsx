import React, { useContext } from 'react';
import styles from './simulation.module.css';
import { TransactionDetailLabel } from './SimulationSubComponents/transactionDetails/TransactionDetailLabel';
import { SimulationContext } from '../../lib/context/context';
import { ChainDetail } from './SimulationSubComponents/transactionDetails/ChainDetail';
import { ContractDetail } from './SimulationSubComponents/transactionDetails/ContractDetail';
import { WebsiteDetail } from './SimulationSubComponents/transactionDetails/WebsiteDetail';
import { RecommendedActionType } from '../../models/simulation/Transaction';
import { RiskFactors } from './SimulationSubComponents/transactionDetails/RiskFactors';

export function TransactionDetails() {
  const { currentSimulation } = useContext(SimulationContext);

  if (!currentSimulation) {
    return <></>;
  }

  return (
    <div className="container">
      <div
        className={
          currentSimulation.simulation?.riskFactors
            ? styles.transactionDetailsCardWithWarnings
            : styles.transactionDetailsCard
        }
      >
        {/* todo: instead of setting defaults for currentsimulation undefined on every prop, simply check for it being
        undefined at the top of the component */}
        <p className={styles['text-md']} style={{ marginBottom: '10px' }}>
          Transaction Details
        </p>

        <div className="row mb-3">
          <div className="col-6">
            <TransactionDetailLabel labelText="Chain" />
            <ChainDetail chainId={currentSimulation.args.chainId} />
          </div>
          <div className="col-6">
            <TransactionDetailLabel labelText="Contract" />
            <ContractDetail addressDetails={currentSimulation.simulation?.addressDetails} />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <TransactionDetailLabel labelText="Website" />
            <WebsiteDetail
              verified={currentSimulation.simulation?.scanResult.verified || false}
              domainName={currentSimulation.simulation?.scanResult.domainName || ''}
              recommendedAction={currentSimulation.simulation?.recommendedAction || RecommendedActionType.None}
            />
          </div>
        </div>
      </div>
      {currentSimulation.simulation?.riskFactors && (
        <RiskFactors
          riskFactors={currentSimulation.simulation.riskFactors}
          recommendedAction={currentSimulation.simulation.recommendedAction}
          overviewMessage={currentSimulation.simulation.overviewMessage}
        />
      )}
    </div>
  );
}
