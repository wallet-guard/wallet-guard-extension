import React from 'react';
import { RecommendedActionType, SimulationChangeType, StateChange } from '../../models/simulation/Transaction';
import { ChangeTypeSection } from './SimulationSubComponents/ChangeTypeSection';
import { NoTransactionChanges } from './SimulationSubComponents/NoTransactionChanges';
import { SimulationBaseProps } from '../../pages/popup';

export const TransactionContent = (props: SimulationBaseProps) => {
  const { currentSimulation } = props;

  if (!currentSimulation.simulation.stateChanges) {
    if (currentSimulation.simulation.gas) {
      return (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          // todo: consider adding a gas stateChange here
          stateChanges={[]}
          title="You are sending"
          iconPath="images/popup/assetChanges/ArrowGiving.png"
          gas={currentSimulation.simulation.gas}
        />
      );
    } else if (
      currentSimulation.simulation.recommendedAction === RecommendedActionType.Warn ||
      currentSimulation.simulation.recommendedAction === RecommendedActionType.Block
    ) {
      return <div></div>;
    } else {
      return <NoTransactionChanges />;
    }
  }

  const transferAndApproveStateChanges = currentSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeTransfer ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareBidOffer ||
      val.changeType === SimulationChangeType.ChangeTypeApprovalForAll ||
      val.changeType === SimulationChangeType.ChangeTypeApprove
  );

  const listingStateChanges = currentSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeOpenSeaListing ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareAskListing ||
      val.changeType === SimulationChangeType.ChangeTypeListingTransfer ||
      val.changeType === SimulationChangeType.ChangeTypePermitTransfer
  );

  const receiveStateChanges = currentSimulation.simulation.stateChanges?.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.ChangeTypeReceive ||
      val.changeType === SimulationChangeType.ChangeTypeOpenSeaReceive ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareBidReceive ||
      val.changeType === SimulationChangeType.ChangeTypeLooksRareAskReceive ||
      val.changeType === SimulationChangeType.ChangeTypeListingReceive ||
      val.changeType === SimulationChangeType.ChangeTypePermitReceive
  );

  const revokeStateChanges = currentSimulation.simulation.stateChanges?.filter(
    (val: StateChange) => val.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll
  );

  return (
    <>
      {revokeStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={revokeStateChanges}
          title="You are revoking"
          iconPath="images/popup/assetChanges/ArrowReceiving.png"
          gas={currentSimulation.simulation.gas}
        />
      )}

      {listingStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={listingStateChanges}
          title="You are listing"
          iconPath="images/popup/assetChanges/Listing.png"
        />
      )}

      {transferAndApproveStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={transferAndApproveStateChanges}
          title="You are sending"
          iconPath="images/popup/assetChanges/ArrowGiving.png"
          gas={currentSimulation.simulation.gas}
        />
      )}

      {receiveStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={receiveStateChanges}
          title="You are receiving"
          iconPath="images/popup/assetChanges/ArrowReceiving.png"
        />
      )}
    </>
  );
};
