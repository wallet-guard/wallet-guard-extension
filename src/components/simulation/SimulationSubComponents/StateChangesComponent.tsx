import React from 'react';
import {
  SimulationAssetTypes,
  SimulationChangeType,
  SimulationStateChange,
} from '../../../models/simulation/Transaction';
import { NFTInfo } from './stateChangeSubComponents/NFTInfo';
import {
  ReceiveNFT,
  ReceiveToken,
  RevokeApprovalForAll,
  SetApproval,
  SetApprovalForAll,
  SetTokenApproval,
  TransferNFT,
  TransferToken,
} from './stateChangeSubComponents/StateChangeSubComponents';
import { TokenInfo } from './stateChangeSubComponents/TokenInfo';

export interface StateChangesComponentProps {
  simulationStateChanges: SimulationStateChange[];
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
    <div>
      {props.simulationStateChanges &&
        props.simulationStateChanges.map((stateChange: SimulationStateChange) => {
          return (
            <div key={stateChange.name + stateChange.tokenID + stateChange.fiatValue}>
              <div className="pt-2">
                <div className="row justify-content-between">
                  {/* TODO: FIX check opensea if its is an NFT */}
                  {stateChange.tokenURI ? (
                    <NFTInfo stateChange={stateChange} />
                  ) : (
                    <TokenInfo stateChange={stateChange} />
                  )}

                  {stateChange && (
                    <div style={{ marginLeft: '-5px' }}>
                      <div className="col">
                        {/* IF NFT ELSE TOKEN */}
                        {stateChange.assetType !== SimulationAssetTypes.Native &&
                        stateChange.assetType !== SimulationAssetTypes.ERC20 ? (
                          <div>
                            {isTransfer(stateChange) ? (
                              <TransferNFT stateChange={stateChange} />
                            ) : stateChange.changeType === SimulationChangeType.ChangeTypeApprovalForAll ? (
                              <SetApprovalForAll />
                            ) : stateChange.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll ? (
                              <RevokeApprovalForAll />
                            ) : isReceive(stateChange) ? (
                              <ReceiveNFT stateChange={stateChange} />
                            ) : (
                              stateChange.changeType === SimulationChangeType.ChangeTypeApprove && <SetApproval />
                            )}
                          </div>
                        ) : (
                          <div>
                            {isTransfer(stateChange) ? (
                              <TransferToken stateChange={stateChange} />
                            ) : stateChange.changeType === SimulationChangeType.ChangeTypeApprovalForAll ? (
                              <SetApprovalForAll />
                            ) : stateChange.changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll ? (
                              <RevokeApprovalForAll />
                            ) : isReceive(stateChange) ? (
                              <ReceiveToken stateChange={stateChange} />
                            ) : (
                              stateChange.changeType === SimulationChangeType.ChangeTypeApprove && (
                                <SetTokenApproval stateChange={stateChange} />
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
