import React from 'react';
import styles from '../../simulation.module.css';
import { RecommendedActionType } from '../../../../models/simulation/Transaction';
import { WebsiteVerificationBadge } from '../WebsiteVerificationBadge';

interface WebsiteDetailProps {
  verified: boolean;
  recommendedAction: RecommendedActionType;
  domainName: string;
}

export function WebsiteDetail(props: WebsiteDetailProps) {
  const { verified, recommendedAction, domainName } = props;

  function getColor(): string {
    if (verified) {
      return '#ffffff';
    } else if (recommendedAction === RecommendedActionType.Block) {
      return '#F44B4C';
    } else if (recommendedAction === RecommendedActionType.Warn) {
      return '#FF783E'
    }

    return '#ffffff';
  }

  const color = getColor();

  return (
    <div className={styles.row}>
      <p className={styles['text-md'] + ' mr-2'} style={{ color: color }}>
        {domainName || 'Unknown site'}
      </p>

      <div style={{ height: '18px', width: '18px', minWidth: '18px' }}>
        <WebsiteVerificationBadge verified={verified} recommendedAction={recommendedAction} tooltipPosition='right' />
      </div>

    </div>
  );
}
