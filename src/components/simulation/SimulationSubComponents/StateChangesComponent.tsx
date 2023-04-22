import React from 'react';
import {
  SimulationAssetTypes,
  SimulationChangeType,
  SimulationStateChange,
} from '../../../models/simulation/Transaction';
import { NFTInfo } from './stateChangeSubComponents/NFTInfo';
import {
  RevokeApprovalForAll,
  SetApproval,
  SetApprovalForAll,
  SetTokenApproval,
  TransferNFT,
  TransferToken,
} from './stateChangeSubComponents/StateChangeSubComponents';
import { TokenInfo } from './stateChangeSubComponents/TokenInfo';
import { PhishingResponse } from '../../../models/PhishingResponse';
import styles from '../simulation.module.css';

export interface StateChangesComponentProps {
  simulationStateChanges: SimulationStateChange[];
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
  const isTransfer = (stateChange: SimulationStateChange) => {
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

  const isReceive = (stateChange: SimulationStateChange) => {
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
      {props.simulationStateChanges &&
        props.simulationStateChanges.map((stateChange: SimulationStateChange) => {
          return (
            <div
              className={`${styles.assetChangeRow} row justify-content-between`}
              key={stateChange.name + stateChange.tokenID + stateChange.fiatValue}
            >
              {/* TODO: FIX check opensea if its is an NFT */}
              {stateChange.tokenURI ? <NFTInfo stateChange={stateChange} /> : <TokenInfo stateChange={stateChange} />}

              {stateChange && (
                <>
                  {/* IF NFT ELSE TOKEN */}
                  {stateChange.assetType !== SimulationAssetTypes.Native &&
                  stateChange.assetType !== SimulationAssetTypes.ERC20 ? (
                    <div className={styles.assetChangeRightColumn}>
                      {isTransfer(stateChange) ? (
                        <TransferNFT stateChange={stateChange} type="send" />
                      ) : stateChange.changeType === SimulationChangeType.ChangeTypeApprovalForAll ? (
                        <SetApprovalForAll verified={props.scanResult.verified} />
                      ) : stateChange.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll ? (
                        <RevokeApprovalForAll />
                      ) : isReceive(stateChange) ? (
                        <TransferNFT stateChange={stateChange} type="receive" />
                      ) : (
                        stateChange.changeType === SimulationChangeType.ChangeTypeApprove && <SetApproval />
                      )}
                    </div>
                  ) : (
                    <div className={styles.assetChangeRightColumn}>
                      {isTransfer(stateChange) ? (
                        <TransferToken stateChange={stateChange} type="send" />
                      ) : stateChange.changeType === SimulationChangeType.ChangeTypeApprovalForAll ? (
                        <SetApprovalForAll verified={props.scanResult.verified} />
                      ) : stateChange.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll ? (
                        <RevokeApprovalForAll />
                      ) : isReceive(stateChange) ? (
                        <TransferToken stateChange={stateChange} type="receive" />
                      ) : (
                        stateChange.changeType === SimulationChangeType.ChangeTypeApprove && (
                          <SetTokenApproval stateChange={stateChange} />
                        )
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
    </>
  );
};
