import React from 'react';
import styles from '../../simulation.module.css';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import { RecommendedActionType, RiskFactor } from '../../../../models/simulation/Transaction';
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
  const { recommendedAction, riskFactors, overviewMessage } = props;

  return (
    <>
      <img style={{ marginBottom: '-1px', marginLeft: '50px' }} width={'15px'} src="/images/popup/arrow_block.svg" />
      <AccordionItem background={'#FF783E'} borderBottomLeftRadius={'16px'} borderBottomRightRadius={'16px'}>
        <AccordionButton>
          <div className="container" style={{ paddingTop: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <WarningTwoIcon fontSize={'16px'} color={'white'} marginRight={'6px'} />
              <p className={styles['heading-md']}>Warning</p>
              <p className={styles['text-sm']}>{overviewMessage}</p>
            </div>
          </div>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}></AccordionPanel>
      </AccordionItem>
    </>
  );
}

function RiskFactorsBlock(props: RiskFactorsProps) {
  const { overviewMessage } = props;

  return (
    <>
      <img style={{ marginBottom: '-1px', marginLeft: '50px' }} width={'15px'} src="/images/popup/arrow_block.svg" />
      <AccordionItem
        background={'#F44B4C'}
        borderBottomLeftRadius={'16px'}
        borderBottomRightRadius={'16px'}
        marginBottom="20px"
      >
        <div className="container" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div className={styles.row} style={{ marginBottom: '3px' }}>
              <img width={'16px'} src="/images/popup/hand_danger.svg" style={{ marginRight: '6px' }} />
              <p className={styles['heading-md']}>Dangerous</p>
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
