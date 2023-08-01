import React from 'react';
import styles from '../../simulation.module.css';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import { RecommendedActionType, RiskFactor, WarningType } from '../../../../models/simulation/Transaction';
import { WarningTwoIcon } from '@chakra-ui/icons';

interface RiskFactorsProps {
  recommendedAction: RecommendedActionType;
  riskFactors: RiskFactor[];
  overviewMessage: string;
}

export function RiskFactors(props: RiskFactorsProps) {
  const { recommendedAction, riskFactors, overviewMessage } = props;

  if (recommendedAction === RecommendedActionType.None) {
    return <></>;
  }

  return (
    <Accordion allowToggle style={{ marginTop: '-25px' }}>
      {recommendedAction === RecommendedActionType.Block ? (
        <RiskFactorsBlock
          recommendedAction={recommendedAction}
          riskFactors={riskFactors}
          overviewMessage={overviewMessage}
        />
      ) : (
        <RiskFactorsWarn
          recommendedAction={recommendedAction}
          riskFactors={riskFactors}
          overviewMessage={overviewMessage}
        />
      )}
    </Accordion>
  );
}

function RiskFactorsWarn(props: RiskFactorsProps) {
  const { riskFactors, overviewMessage } = props;

  function mapValue(riskFactor: RiskFactor): string {
    if (riskFactor.type === WarningType.RecentlyCreated) {
      const daysAgo = Math.round(parseFloat(riskFactor.value || '') / 24);
      return `Created ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    } else if (riskFactor.type === WarningType.MLInference) {
      return `Likely a phishing attempt of ${riskFactor.value}`;
    } else if (riskFactor.type == WarningType.Bypass) {
      return riskFactor.value || '';
    }

    return '';
  }

  return (
    <>
      <img
        style={{ marginBottom: '-1px', marginLeft: '50px' }}
        width={'15px'}
        src="/images/popup/websiteDetail/arrow_warn.svg"
      />
      <AccordionItem
        background={'#FF783E'}
        borderBottomLeftRadius={'16px'}
        borderBottomRightRadius={'16px'}
        marginBottom="20px"
      >
        <AccordionButton outline={'none !important'}>
          <div className="container" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <div className={styles.row} style={{ marginBottom: '3px' }}>
                <WarningTwoIcon fontSize={'16px'} color={'white'} marginRight={'6px'} />
                <p className={styles['heading-md']} style={{ letterSpacing: '.75px' }}>
                  Warning
                </p>
                <AccordionIcon fontSize={'22px'} style={{ position: 'absolute', right: '30px' }} />
              </div>
              <p className={styles['text-md']} style={{ fontFamily: 'ArchivoRegular' }}>
                {overviewMessage}
              </p>
            </div>
          </div>
        </AccordionButton>
        <AccordionPanel
          pb={4}
          background="#141414"
          border={'1px solid #FF783E'}
          borderBottomLeftRadius={'16px'}
          borderBottomRightRadius={'16px'}
        >
          {/* todo: add mapping for low risk indicators */}
          <div className="container">
            {riskFactors.map((riskFactor) => {
              const mappedValue = mapValue(riskFactor);
              return (
                <>
                  <div key={riskFactor.message} className={styles.row} style={{ height: '67px', marginLeft: '10px' }}>
                    <WarningTwoIcon color={'#FF783E'} fontSize={'30px'} marginRight={'20px'} />
                    <div>
                      <p className={styles.riskFactorHeader}>{riskFactor.message}</p>
                      {mappedValue !== '' && <p className={styles.riskFactorValue}>{mappedValue}</p>}
                    </div>
                  </div>
                  <div className={styles.divider} />
                </>
              );
            })}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}

function RiskFactorsBlock(props: RiskFactorsProps) {
  const { overviewMessage } = props;

  return (
    <>
      <img
        style={{ marginBottom: '-1px', marginLeft: '50px' }}
        width={'15px'}
        src="/images/popup/websiteDetail/arrow_block.svg"
      />
      <AccordionItem
        background={'#F44B4C'}
        borderBottomLeftRadius="16px"
        borderBottomRightRadius="16px"
        marginBottom="20px"
      >
        <div className="container" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div className={styles.row} style={{ marginBottom: '3px' }}>
              <img width={'16px'} src="/images/popup/websiteDetail/hand_danger.svg" style={{ marginRight: '6px' }} />
              <p className={styles['heading-md']} style={{ letterSpacing: '.75px' }}>
                Dangerous
              </p>
            </div>
            <p className={styles['text-md']} style={{ fontFamily: 'ArchivoRegular' }}>
              {overviewMessage}
            </p>
          </div>
        </div>
      </AccordionItem>
    </>
  );
}
