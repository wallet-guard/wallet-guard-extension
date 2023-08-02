import React from 'react';
import { StoredSimulation } from '../../lib/simulation/storage';
import { RecommendedActionType, SimulationChangeType, StateChange } from '../../models/simulation/Transaction';
import { ChangeTypeSection } from './SimulationSubComponents/ChangeTypeSection';
import { NoTransactionChanges } from './SimulationSubComponents/NoTransactionChanges';

export const TransactionContent = ({ storedSimulation }: { storedSimulation: StoredSimulation }) => {
  if (
    !storedSimulation.simulation?.stateChanges &&
    (storedSimulation.simulation?.recommendedAction === RecommendedActionType.Warn ||
      storedSimulation.simulation?.recommendedAction === RecommendedActionType.Block)
  ) {
    return <div></div>;
  } else if (!storedSimulation.simulation?.stateChanges) {
    return <NoTransactionChanges />;
  }

  const transferAndApproveStateChanges = storedSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeTransfer ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareBidOffer ||
      val.changeType === SimulationChangeType.ChangeTypeApprovalForAll ||
      val.changeType === SimulationChangeType.ChangeTypeApprove
  );

  const listingStateChanges = storedSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeOpenSeaListing ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareAskListing ||
      val.changeType === SimulationChangeType.ChangeTypeListingTransfer ||
      val.changeType === SimulationChangeType.ChangeTypePermitTransfer
  );

  const receiveStateChanges = storedSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeReceive ||
      val.changeType === SimulationChangeType.ChangeTypeOpenSeaReceive ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareBidReceive ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareAskReceive ||
      val.changeType === SimulationChangeType.ChangeTypeListingReceive ||
      val.changeType === SimulationChangeType.ChangeTypePermitReceive
  );

  const revokeStateChanges = storedSimulation.simulation.stateChanges.filter(
    (val: StateChange) => val.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll
  );

  return (
    <>
      {revokeStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={storedSimulation.simulation.scanResult}
          stateChanges={revokeStateChanges}
          title="You are revoking"
          iconPath="images/popup/assetChanges/ArrowReceiving.png"
          gas={storedSimulation.simulation.gas}
        />
      )}

      {listingStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={storedSimulation.simulation.scanResult}
          stateChanges={listingStateChanges}
          title="You are listing"
          iconPath="images/popup/assetChanges/Listing.png"
        />
      )}

      {transferAndApproveStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={storedSimulation.simulation.scanResult}
          stateChanges={transferAndApproveStateChanges}
          title="You are sending"
          iconPath="images/popup/assetChanges/ArrowGiving.png"
          gas={storedSimulation.simulation.gas}
        />
      )}
      {receiveStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={storedSimulation.simulation.scanResult}
          stateChanges={receiveStateChanges}
          title="You are receiving"
          iconPath="images/popup/assetChanges/ArrowReceiving.png"
        />
      )}
    </>
  );
};
