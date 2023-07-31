import React from 'react';
import styles from '../../simulation.module.css';
import { Tooltip } from '@chakra-ui/react';
import { RecommendedActionType } from '../../../../models/simulation/Transaction';

interface WebsiteDetailProps {
  verified: boolean;
  recommendedAction: RecommendedActionType;
  domainName: string;
}

interface WebsiteIcon {
  tooltipText: string;
  iconPath: string;
  color: string;
}

export function WebsiteDetail(props: WebsiteDetailProps) {
  const { verified, recommendedAction, domainName } = props;

  function getWebsiteIcon(): WebsiteIcon {
    // TEMP - re-add this
    // if (verified) {
    //   return {
    //     tooltipText: 'Verified by Wallet Guard',
    //     iconPath: '/images/popup/green-verified.png',
    //     color: '',
    //   } as WebsiteIcon;
    // } else
    if (recommendedAction === RecommendedActionType.Block) {
      return {
        tooltipText: 'Dangerous website',
        // todo: need a red version of this
        iconPath: '/images/popup/orange-danger.png',
        color: '#F44B4C',
      } as WebsiteIcon;
    } else if (recommendedAction === RecommendedActionType.Warn) {
      return {
        tooltipText: 'Suspicious website',
        iconPath: '/images/popup/orange-danger.png',
        color: '#FF783E',
      } as WebsiteIcon;
    }

    return {
      tooltipText: 'Unknown website',
      iconPath: '/images/popup/unknown.png',
      color: '',
    } as WebsiteIcon;
  }

  const websiteIcon = getWebsiteIcon();

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <p className={styles['text-md']} style={{ color: websiteIcon.color }}>
        {domainName}
      </p>
      <Tooltip
        hasArrow
        label={websiteIcon.tooltipText}
        bg="#212121"
        color="white"
        placement="right"
        borderRadius={'5px'}
        className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
      >
        <img src={websiteIcon.iconPath} width={25} className="pl-2" />
      </Tooltip>
    </div>
  );
}
