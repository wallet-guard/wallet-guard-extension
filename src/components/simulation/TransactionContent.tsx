import React from 'react';
import { StoredSimulation, StoredSimulationState } from '../../lib/simulation/storage';
import {
  SimulationChangeType,
  SimulationStateChange,
  SimulationWarningType,
} from '../../models/simulation/Transaction';
import { ChangeTypeSection } from './simulationSubComponents/ChangeTypeSection';
import { NoTransactionChanges } from './simulationSubComponents/NoTransactionChanges';
import { SimulationLoading } from './simulationSubComponents/SimulationLoading';
import styles from './simulation.module.css';

export const TransactionContent = ({ storedSimulation }: { storedSimulation: StoredSimulation }) => {
  if (storedSimulation.state === StoredSimulationState.Simulating) {
    return <SimulationLoading />;
  } else if (!storedSimulation.simulation) {
    return <SimulationLoading />;
  } else if (
    !storedSimulation.simulation.stateChanges &&
    storedSimulation.simulation.warningType === SimulationWarningType.None
  ) {
    return <NoTransactionChanges />;
  } else if (
    !storedSimulation.simulation.stateChanges &&
    storedSimulation.simulation.warningType === SimulationWarningType.Warn
  ) {
    return (
      <div></div>
      // return <ChangeTypeSection title="Risk Factors" warnings={['this is a warning']}/>
    );
  } else if (!storedSimulation.simulation.stateChanges) {
    return <NoTransactionChanges />;
  }

  const transferAndApproveStateChanges = storedSimulation.simulation.stateChanges.filter(
    (val: SimulationStateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeTransfer ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareBidOffer ||
      val.changeType === SimulationChangeType.ChangeTypeApprovalForAll ||
      val.changeType === SimulationChangeType.ChangeTypeApprove
  );

  const listingStateChanges = storedSimulation.simulation.stateChanges.filter(
    (val: SimulationStateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeOpenSeaListing ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareAskListing ||
      val.changeType === SimulationChangeType.ChangeTypeListingTransfer ||
      val.changeType === SimulationChangeType.ChangeTypePermitTransfer
  );

  const receiveStateChanges = storedSimulation.simulation.stateChanges.filter(
    (val: SimulationStateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeReceive ||
      val.changeType === SimulationChangeType.ChangeTypeOpenSeaReceive ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareBidReceive ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareAskReceive ||
      val.changeType === SimulationChangeType.ChangeTypeListingReceive ||
      val.changeType === SimulationChangeType.ChangeTypePermitReceive
  );

  const revokeStateChanges = storedSimulation.simulation.stateChanges.filter(
    (val: SimulationStateChange) => val.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll
  );

  return (
    <div style={{ marginTop: '-10px' }}>
      {revokeStateChanges.length !== 0 && (
        <ChangeTypeSection stateChanges={revokeStateChanges} title="You are revoking" />
      )}

      {listingStateChanges.length !== 0 && (
        <ChangeTypeSection stateChanges={listingStateChanges} title="You are listing" />
      )}

      {transferAndApproveStateChanges.length !== 0 && (
        <ChangeTypeSection stateChanges={transferAndApproveStateChanges} title="You are giving" />
      )}

      {receiveStateChanges.length !== 0 && (
        <ChangeTypeSection stateChanges={receiveStateChanges} title="You are receiving" />
      )}
    </div>
  );
};
