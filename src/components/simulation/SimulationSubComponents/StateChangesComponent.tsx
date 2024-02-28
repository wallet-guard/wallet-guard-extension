import React from 'react';
import { SimulationAssetTypes, SimulationChangeType, StateChange } from '../../../models/simulation/Transaction';
import {
  ApprovalChange,
  RevokeApprovalForAll,
  TransferNFT,
  TransferToken,
} from './stateChangeSubComponents/StateChangeSubComponents';
import { PhishingResponse } from '../../../models/PhishingResponse';
import styles from '../simulation.module.css';
import { AssetInfo } from './stateChangeSubComponents/AssetInfo';

export interface StateChangesComponentProps {
  simulationStateChanges: StateChange[];
  scanResult: PhishingResponse;
}

export const add3Dots = (string: string, limit: number) => {
  var dots = '...';
  if (string.length > limit) {
    string = string.substring(0, limit) + dots;
  }

  return string;
};

export const StateChangesComponent = (props: StateChangesComponentProps) => {
  const isTransfer = (stateChange: StateChange) => {
    if (
      stateChange.changeType === SimulationChangeType.Transfer ||
      stateChange.changeType === SimulationChangeType.Listing ||
      stateChange.changeType === SimulationChangeType.Bidding ||
      // old types
      stateChange.changeType === SimulationChangeType.OpenSeaListing ||
      stateChange.changeType === SimulationChangeType.LooksRareAskListing ||
      stateChange.changeType === SimulationChangeType.LooksRareBidOffer ||
      stateChange.changeType === SimulationChangeType.ListingTransfer ||
      stateChange.changeType === SimulationChangeType.PermitTransfer
    ) {
      return true;
    }
  };

  const isReceive = (stateChange: StateChange) => {
    if (
      stateChange.changeType === SimulationChangeType.Receive ||
      // old types
      stateChange.changeType === SimulationChangeType.OpenSeaReceive ||
      stateChange.changeType === SimulationChangeType.LooksRareBidReceive ||
      stateChange.changeType === SimulationChangeType.LooksRareAskReceive ||
      stateChange.changeType === SimulationChangeType.ListingReceive ||
      stateChange.changeType === SimulationChangeType.PermitReceive
    ) {
      return true;
    }
  };

  return (
    <>
      {props.simulationStateChanges.map((stateChange: StateChange) => {
        return (
          <div key={stateChange.name + stateChange.tokenID + stateChange.fiatValue} className="container">
            <div className={`${styles.assetChangeRow} row justify-content-between`}>
<<<<<<< HEAD
  <AssetInfo stateChange={stateChange} />
=======
              {stateChange.assetType !== SimulationAssetTypes.Native &&
                stateChange.assetType !== SimulationAssetTypes.ERC20 ? (
                <NFTInfo stateChange={stateChange} />
              ) : (
                <TokenInfo stateChange={stateChange} />
              )}
>>>>>>> fe68bbd87e5edc22d8c2d5a9af4f8f7d3ef1f2c9

  {
    stateChange && (
      <>
        {/* IF NFT ELSE TOKEN */}
        {stateChange.assetType !== SimulationAssetTypes.Native &&
          stateChange.assetType !== SimulationAssetTypes.ERC20 ? (
          <div className={styles.assetChangeRightColumn}>
            {isTransfer(stateChange) ? (
              <TransferNFT stateChange={stateChange} type="send" />
            ) : stateChange.changeType === SimulationChangeType.ApprovalForAll ? (
              <ApprovalChange verified={props.scanResult.verified} symbol={stateChange.symbol} amount="ALL" fiatValue={stateChange.fiatValue} locked={stateChange.locked} isNFT />
            ) : stateChange.changeType === SimulationChangeType.RevokeApprovalForAll ? (
              <RevokeApprovalForAll />
            ) : isReceive(stateChange) ? (
              <TransferNFT stateChange={stateChange} type="receive" />
            ) : (
              stateChange.changeType === SimulationChangeType.Approve && (
                <ApprovalChange
                  verified={props.scanResult.verified}
                  symbol={stateChange.symbol}
                  amount={stateChange.amount}
                  fiatValue={stateChange.fiatValue}
                  isNFT
                />
              )
            )}
          </div>
        ) : (
          <div className={styles.assetChangeRightColumn}>
            {isTransfer(stateChange) ? (
              <TransferToken stateChange={stateChange} type="send" />
            ) : stateChange.changeType === SimulationChangeType.ApprovalForAll ? (
              <ApprovalChange verified={props.scanResult.verified} symbol={stateChange.symbol} fiatValue={stateChange.fiatValue} amount="ALL" locked={stateChange.locked} isNFT={false} />
            ) : stateChange.changeType === SimulationChangeType.RevokeApprovalForAll ? (
              <RevokeApprovalForAll />
            ) : isReceive(stateChange) ? (
              <TransferToken stateChange={stateChange} type="receive" />
            ) : (
              stateChange.changeType === SimulationChangeType.Approve && (
                <ApprovalChange
                  symbol={stateChange.symbol}
                  verified={props.scanResult.verified}
                  amount={stateChange.amount}
                  locked={stateChange.locked}
                  fiatValue={stateChange.fiatValue}
                  isNFT={false}
                />
              )
            )}
          </div>
        )}
      </>
    )
  }
            </div >
          </div >
        );
      })}
    </>
  );
};
