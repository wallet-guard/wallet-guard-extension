import { ExtraInfoType } from '../../models/simulation/Transaction';
import { getDomainNameFromURL } from '../helpers/phishing/parseDomainHelper';
import { shouldShowSkipTransactionModal } from './skip';
import { CompletedSuccessfulSimulation } from './storage';

export enum PopupManagerType {
  ShowUnresolvableSignature = 'UNRESOLVABLE_SIGNATURE',
  ShowSkipSimulation = 'SKIP_SIMULATION',
  ShowLockedAsset = 'LOCKED_ASSET',
  None = '',
};

export function getAdditionalDataPopup(currentSimulation: CompletedSuccessfulSimulation): PopupManagerType {
  const domainName = getDomainNameFromURL(currentSimulation.args.origin);
  const showSkipTransactionModal = shouldShowSkipTransactionModal(domainName);
  const showUnresolvablePopup = currentSimulation.simulation.extraInfo?.type === ExtraInfoType.UnresolvableSignature;
  const showLockedAsset = currentSimulation.lockedAssetsState?.shouldBlockTx;

  if (showUnresolvablePopup) {
    return PopupManagerType.ShowUnresolvableSignature;
  } else if (showLockedAsset) {
    return PopupManagerType.ShowLockedAsset;
  } else if (showSkipTransactionModal) {
    return PopupManagerType.ShowSkipSimulation;
  }

  return PopupManagerType.None;
}