import React from 'react';
import styles from '../../simulation.module.css';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Tooltip } from '@chakra-ui/react';
import { RecommendedActionType, RiskFactor, Severity, WarningType } from '../../../../models/simulation/Transaction';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { mapRiskFactorValue } from '../../../../lib/helpers/riskFactorsMapper';

interface RiskFactorsProps {
  recommendedAction: RecommendedActionType;
  riskFactors: RiskFactor[];
  overviewMessage: string;
}

function getWarningIcon(riskFactor: RiskFactor) {
  const { severity } = riskFactor;
  let riskTooltipMessage = '';
  let riskColor = '';

  switch (severity) {
    case Severity.Critical:
      riskTooltipMessage = 'Critical risk';
      riskColor = '#F44B4C';
      break;
    case Severity.High:
      riskTooltipMessage = 'High risk';
      riskColor = '#FF783E';
      break;
    case Severity.Low:
      riskTooltipMessage = 'Low risk';
      riskColor = '#FFEF5C';
      break;
  }

  return (
    <Tooltip
      hasArrow
      label={riskTooltipMessage}
      bg="#212121"
      color="white"
      placement="right"
      className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
      borderRadius={'5px'}
    >
      <WarningTwoIcon className={styles.zoom} color={riskColor} fontSize={'30px'} marginRight={'20px'} />
    </Tooltip>
  );
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
          <div className="container">
            {riskFactors.map((riskFactor) => {
              const mappedValue = mapRiskFactorValue(riskFactor);
              return (
                <div key={riskFactor.message}>
                  <div className={styles.row} style={{ height: '67px', marginLeft: '10px' }}>
                    {getWarningIcon(riskFactor)}
                    <div>
                      <p className={styles.riskFactorHeader}>{riskFactor.message}</p>
                      {mappedValue !== '' && <p className={styles.riskFactorValue}>{mappedValue}</p>}
                    </div>
                  </div>
                  <div className={styles.divider} />
                </div>
              );
            })}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}

function RiskFactorsBlock(props: RiskFactorsProps) {
  const { riskFactors, overviewMessage } = props;

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
        <AccordionButton outline={'none !important'}>
          <div className="container" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <div className={styles.row} style={{ marginBottom: '3px' }}>
                <img width={'16px'} src="/images/popup/websiteDetail/hand_danger.svg" style={{ marginRight: '6px' }} />
                <p className={styles['heading-md']} style={{ letterSpacing: '.75px' }}>
                  Dangerous
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
          border={'1px solid #F44B4C'}
          borderBottomLeftRadius={'16px'}
          borderBottomRightRadius={'16px'}
        >
          <div className="container">
            {riskFactors.map((riskFactor) => {
              const mappedValue = mapRiskFactorValue(riskFactor);
              return (
                <div key={riskFactor.message}>
                  <div key={riskFactor.message} className={styles.row} style={{ height: '67px', marginLeft: '10px' }}>
                    {getWarningIcon(riskFactor)}
                    <div key={riskFactor.message}>
                      <p className={styles.riskFactorHeader}>{riskFactor.message}</p>
                      {mappedValue !== '' && <p className={styles.riskFactorValue}>{mappedValue}</p>}
                    </div>
                  </div>
                  <div className={styles.divider} />
                </div>
              );
            })}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
