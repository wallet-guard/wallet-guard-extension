import React from 'react';
import { SimulationAssetTypes, SimulationChangeType, StateChange } from '../../../models/simulation/Transaction';
import { NFTInfo } from './stateChangeSubComponents/NFTInfo';
import {
  ApprovalChange,
  RevokeApprovalForAll,
  TransferNFT,
  TransferToken,
} from './stateChangeSubComponents/StateChangeSubComponents';
import { TokenInfo } from './stateChangeSubComponents/TokenInfo';
import { PhishingResponse } from '../../../models/PhishingResponse';
import styles from '../simulation.module.css';

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
              {stateChange.assetType !== SimulationAssetTypes.Native &&
                stateChange.assetType !== SimulationAssetTypes.ERC20 ? (
                <NFTInfo stateChange={stateChange} />
              ) : (
                <TokenInfo stateChange={stateChange} />
              )}

              {stateChange && (
                <>
                  {/* IF NFT ELSE TOKEN */}
                  {stateChange.assetType !== SimulationAssetTypes.Native &&
                    stateChange.assetType !== SimulationAssetTypes.ERC20 ? (
                    <div className={styles.assetChangeRightColumn}>
                      {isTransfer(stateChange) ? (
                        <TransferNFT stateChange={stateChange} type="send" />
                      ) : stateChange.changeType === SimulationChangeType.ApprovalForAll ? (
                        <ApprovalChange verified={props.scanResult.verified} symbol={stateChange.symbol} amount="ALL" />
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
                          />
                        )
                      )}
                    </div>
                  ) : (
                    <div className={styles.assetChangeRightColumn}>
                      {isTransfer(stateChange) ? (
                        <TransferToken stateChange={stateChange} type="send" />
                      ) : stateChange.changeType === SimulationChangeType.ApprovalForAll ? (
                        <ApprovalChange verified={props.scanResult.verified} symbol={stateChange.symbol} amount="ALL" />
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
                          />
                        )
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
