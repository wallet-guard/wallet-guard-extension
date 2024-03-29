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
          stateChanges={[]}
          title="You are sending"
          iconPath="images/popup/assetChanges/ArrowGiving.png"
          gas={currentSimulation.simulation.gas}
        />
      );
    } else if (
      currentSimulation.simulation.recommendedAction === RecommendedActionType.Warn ||
      currentSimulation.simulation.recommendedAction === RecommendedActionType.Block ||
      currentSimulation.simulation.extraInfo
    ) {
      return <div></div>;
    } else {
      return <NoTransactionChanges />;
    }
  }

  const transferStateChanges = currentSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.Transfer ||
      val.changeType === SimulationChangeType.LooksRareBidOffer
  );

  const approvalStateChanges = currentSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.ApprovalForAll ||
      val.changeType === SimulationChangeType.Approve
  );

  const biddingStateChanges = currentSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.Bidding
  );

  const listingStateChanges = currentSimulation.simulation.stateChanges.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.OpenSeaListing ||
      val.changeType === SimulationChangeType.LooksRareAskListing ||
      val.changeType === SimulationChangeType.ListingTransfer ||
      val.changeType === SimulationChangeType.PermitTransfer ||
      val.changeType === SimulationChangeType.Listing
  );

  const receiveStateChanges = currentSimulation.simulation.stateChanges?.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.Receive ||
      val.changeType === SimulationChangeType.OpenSeaReceive ||
      val.changeType === SimulationChangeType.LooksRareBidReceive ||
      val.changeType === SimulationChangeType.LooksRareAskReceive ||
      val.changeType === SimulationChangeType.ListingReceive ||
      val.changeType === SimulationChangeType.PermitReceive
  );

  const revokeStateChanges = currentSimulation.simulation.stateChanges?.filter(
    (val: StateChange) =>
      val.changeType === SimulationChangeType.RevokeApprovalForAll ||
      val.changeType === SimulationChangeType.Revoke
  );

  return (
    <>
      {approvalStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={approvalStateChanges}
          title="You are approving"
          iconPath="images/popup/assetChanges/ArrowGiving.png"
          gas={currentSimulation.simulation.gas}
          isFirstChild
        />
      )}

      {revokeStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={revokeStateChanges}
          title="You are revoking"
          iconPath="images/popup/assetChanges/ArrowReceiving.png"
          gas={currentSimulation.simulation.gas}
          isFirstChild={approvalStateChanges.length === 0}
        />
      )}

      {biddingStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={biddingStateChanges}
          title="You are bidding"
          iconPath="images/popup/assetChanges/Bidding.png"

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

      {transferStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={transferStateChanges}
          title="You are sending"
          iconPath="images/popup/assetChanges/ArrowGiving.png"
          gas={currentSimulation.simulation.gas}
          isFirstChild={approvalStateChanges.length === 0 && revokeStateChanges.length === 0}
        />
      )}

      {receiveStateChanges.length > 0 && (
        <ChangeTypeSection
          scanResult={currentSimulation.simulation.scanResult}
          stateChanges={receiveStateChanges}
          title="You are receiving"
          iconPath="images/popup/assetChanges/ArrowReceiving.png"
          gas={currentSimulation.simulation.gas}
          isFirstChild={approvalStateChanges.length === 0 &&
            revokeStateChanges.length === 0 &&
            transferStateChanges.length === 0
          }
        />
      )}
    </>
  );
};
