import React from 'react';
import { PhishingResponse, PhishingResult } from '../../../../models/PhishingResponse';
import styles from '../../simulation.module.css';
import { Tooltip } from '@chakra-ui/react';

interface WebsiteDetailProps {
  scanResult: PhishingResponse | undefined;
}

interface WebsiteIcon {
  tooltipText: string;
  iconPath: string;
}

export function WebsiteDetail(props: WebsiteDetailProps) {
  const { scanResult } = props;

  function getWebsiteIcon(): WebsiteIcon {
    if (scanResult?.verified) {
      return {
        tooltipText: 'Verified by Wallet Guard',
        iconPath: '/images/popup/green-verified.png',
      } as WebsiteIcon;
    } else if (scanResult?.phishing === PhishingResult.Phishing) {
      return {
        tooltipText: 'Low trust website',
        iconPath: '/images/popup/orange-danger.png',
      } as WebsiteIcon;
    }

    return {
      tooltipText: 'Unknown website',
      iconPath: '/images/popup/unknown.png',
    } as WebsiteIcon;
  }

  const websiteIcon = getWebsiteIcon();

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <p className={styles['text-md']}>{scanResult?.domainName}</p>
      <Tooltip
        hasArrow
        label={websiteIcon.tooltipText}
        bg="#212121"
        color="white"
        placement="right"
        className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
        style={{ borderRadius: '2em' }}
      >
        <img src={websiteIcon.iconPath} width={25} className="pl-2" />
      </Tooltip>
    </div>
  );
}
