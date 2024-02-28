import { StateChange, SimulationChangeType, AssetKey } from './Transaction';

export function AssetsEqual(assetKey: AssetKey, stateChange: StateChange): boolean {
  const lockedAssetContractAddress = assetKey.contractAddress.toLowerCase();
  const stateChangeContractAddress = stateChange.contractAddress.toLowerCase();

  if (stateChange.changeType === SimulationChangeType.ApprovalForAll &&
    stateChangeContractAddress === lockedAssetContractAddress) {
    return true;
  }

  return lockedAssetContractAddress === stateChangeContractAddress &&
    assetKey.ercType === stateChange.assetType &&
    (assetKey.tokenId === stateChange.tokenID || assetKey.tokenId === 'COLLECTION');
}

export function IsTransferChangeType(changeType: SimulationChangeType): boolean {
  // TODO: pull in V1 Signature change types when they're merged
  return changeType === SimulationChangeType.Transfer ||
    changeType === SimulationChangeType.ApprovalForAll ||
    changeType === SimulationChangeType.Approve ||
    changeType === SimulationChangeType.OpenSeaListing ||
    changeType === SimulationChangeType.LooksRareAskListing ||
    changeType === SimulationChangeType.ListingTransfer ||
    changeType === SimulationChangeType.PermitTransfer;
}
