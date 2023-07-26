import React, { useContext } from 'react';
import styles from './simulation.module.css';
import { TransactionDetailLabel } from './SimulationSubComponents/transactionDetails/TransactionDetailLabel';
import { SimulationContext } from '../../lib/context/context';
import { ChainDetail } from './SimulationSubComponents/transactionDetails/ChainDetail';
import { ContractDetail } from './SimulationSubComponents/transactionDetails/ContractDetail';
import { WebsiteDetail } from './SimulationSubComponents/transactionDetails/WebsiteDetail';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

export function TransactionDetails() {
  const { currentSimulation } = useContext(SimulationContext);

  return (
    <div className="container">
      <div
        className={
          currentSimulation?.simulation?.riskFactors
            ? styles.transactionDetailsCardWithWarnings
            : styles.transactionDetailsCard
        }
      >
        <p className={styles['text-md']} style={{ marginBottom: '10px' }}>
          Transaction Details
        </p>

        <div className="row mb-2">
          <div className="col-6">
            <TransactionDetailLabel labelText="Chain" />
            <ChainDetail chainId={currentSimulation?.args.chainId || '0x1'} />
          </div>
          <div className="col-6">
            <TransactionDetailLabel labelText="Contract" />
            <ContractDetail addressDetails={currentSimulation?.simulation?.addressDetails} />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <TransactionDetailLabel labelText="Website" />
            <WebsiteDetail scanResult={currentSimulation?.simulation?.scanResult} />
          </div>
        </div>
      </div>
      {/* {currentSimulation?.simulation?.riskFactors && currentSimulation?.simulation?.riskFactors.length > 0 && ( */}

      {/* <Accordion allowToggle style={{ marginTop: '-15px' }}>
        <AccordionItem background={'#FF783E'}>
          <AccordionButton>
            <div className="container" style={{ paddingTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <p className={styles['heading-md']}>Warning</p>
                <p className={styles['text-sm']}>We detected 3 risky indicators from this website.</p>
              </div>
            </div>

            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}></AccordionPanel>
        </AccordionItem>
      </Accordion> */}
      {/* )} */}
    </div>
  );
}
