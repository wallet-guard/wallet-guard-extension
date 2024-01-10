import { StateChange, SimulationChangeType, AssetKey } from './Transaction';

export function AssetsEqual(assetKey: AssetKey, stateChange: StateChange): boolean {
  return assetKey.contractAddress === stateChange.contractAddress &&
    assetKey.ercType === stateChange.assetType &&
    (assetKey.tokenId === stateChange.tokenId || assetKey.tokenId === 'COLLECTION');
}

export function IsTransferChangeType(changeType: SimulationChangeType): boolean {
  return changeType === SimulationChangeType.ChangeTypeTransfer ||
    changeType === SimulationChangeType.ChangeTypeLooksRareBidOffer ||
    changeType === SimulationChangeType.ChangeTypeApprovalForAll ||
    changeType === SimulationChangeType.ChangeTypeApprove ||
    changeType === SimulationChangeType.ChangeTypeOpenSeaListing ||
    changeType === SimulationChangeType.ChangeTypeLooksRareAskListing ||
    changeType === SimulationChangeType.ChangeTypeListingTransfer ||
    changeType === SimulationChangeType.ChangeTypePermitTransfer;
}

export function IsApprovalChangeType(changeType: SimulationChangeType): boolean {
  return changeType === SimulationChangeType.ChangeTypeRevokeApprovalForAll ||
    changeType === SimulationChangeType.ChangeTypeApprovalForAll ||
    changeType === SimulationChangeType.ChangeTypeApprove;
}