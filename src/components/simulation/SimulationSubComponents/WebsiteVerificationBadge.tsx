import React from 'react';
import { RecommendedActionType } from '../../../models/simulation/Transaction';
import { PlacementWithLogical, Tooltip } from '@chakra-ui/react';
import styles from '../simulation.module.css';


interface WebsiteVerificationBadgeProps {
  verified: boolean;
  recommendedAction: RecommendedActionType;
  tooltipPosition: PlacementWithLogical;
}

interface VerificationBadge {
  tooltipText: string;
  iconPath: string;
}

export function WebsiteVerificationBadge(props: WebsiteVerificationBadgeProps) {
  const { verified, recommendedAction, tooltipPosition } = props;

  function getWebsiteIcon(): VerificationBadge | null {
    if (verified) {
      return {
        tooltipText: 'Verified by Wallet Guard',
        iconPath: '/images/popup/websiteDetail/green-verified.png',
      } as VerificationBadge;
    } else if (recommendedAction === RecommendedActionType.Block) {
      return {
        tooltipText: 'Dangerous website',
        iconPath: '/images/popup/websiteDetail/red-danger.png',
      } as VerificationBadge;
    } else if (recommendedAction === RecommendedActionType.Warn) {
      return {
        tooltipText: 'Suspicious website',
        iconPath: '/images/popup/websiteDetail/orange-danger.png',
      } as VerificationBadge;
    }

    return null;
  }

  const websiteIcon = getWebsiteIcon();

  return (
    <>
      <Tooltip
        hasArrow
        label={websiteIcon?.tooltipText}
        bg="#212121"
        color="white"
        placement={tooltipPosition}
        borderRadius={'5px'}
        className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
      >
        <img src={websiteIcon?.iconPath} width={25} className={styles.zoom} />
      </Tooltip>
    </>

  )
}