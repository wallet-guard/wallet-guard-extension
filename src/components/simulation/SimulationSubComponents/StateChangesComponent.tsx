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
      stateChange.changeType === SimulationChangeType.ChangeTypeTransfer ||
      stateChange.changeType === SimulationChangeType.ChangeTypeOpenSeaListing ||
      stateChange.changeType === SimulationChangeType.ChangeTypeLooksRareAskListing ||
      stateChange.changeType === SimulationChangeType.ChangeTypeLooksRareBidOffer ||
      stateChange.changeType === SimulationChangeType.ChangeTypeListingTransfer ||
      stateChange.changeType === SimulationChangeType.ChangeTypePermitTransfer
    ) {
      return true;
    }
  };

  const isReceive = (stateChange: StateChange) => {
    if (
      stateChange.changeType === SimulationChangeType.ChangeTypeReceive ||
      stateChange.changeType === SimulationChangeType.ChangeTypeOpenSeaReceive ||
      stateChange.changeType === SimulationChangeType.ChangeTypeLooksRareBidReceive ||
      stateChange.changeType === SimulationChangeType.ChangeTypeLooksRareAskReceive ||
      stateChange.changeType === SimulationChangeType.ChangeTypeListingReceive ||
      stateChange.changeType === SimulationChangeType.ChangeTypePermitReceive
    ) {
      return true;
    }
  };

  return (
    <>
      {props.simulationStateChanges.map((stateChange: StateChange) => {
        return (
          <div key={stateChange.name + stateChange.tokenId + stateChange.fiatValue} className="container">
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
                      ) : stateChange.changeType === SimulationChangeType.ChangeTypeApprovalForAll ? (
                        <ApprovalChange verified={props.scanResult.verified} symbol={stateChange.symbol} amount='ALL' locked={stateChange.locked} />
                      ) : stateChange.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll ? (
                        <RevokeApprovalForAll />
                      ) : isReceive(stateChange) ? (
                        <TransferNFT stateChange={stateChange} type="receive" />
                      ) : (
                        stateChange.changeType === SimulationChangeType.ChangeTypeApprove && (
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
                      ) : stateChange.changeType === SimulationChangeType.ChangeTypeApprovalForAll ? (
                        <ApprovalChange verified={props.scanResult.verified} symbol={stateChange.symbol} amount="ALL" locked={stateChange.locked} />
                      ) : stateChange.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll ? (
                        <RevokeApprovalForAll />
                      ) : isReceive(stateChange) ? (
                        <TransferToken stateChange={stateChange} type="receive" />
                      ) : (
                        stateChange.changeType === SimulationChangeType.ChangeTypeApprove && (
                          <ApprovalChange
                            symbol={stateChange.symbol}
                            verified={props.scanResult.verified}
                            amount={stateChange.amount}
                            locked={stateChange.locked}
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
