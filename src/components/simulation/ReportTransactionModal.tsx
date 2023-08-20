import { ChakraProvider, Modal, ModalOverlay, ModalContent, UseDisclosureProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import styles from './simulation.module.css';
import { CompletedSuccessfulSimulation } from '../../lib/simulation/storage';
import posthog from 'posthog-js';

interface ReportTransactionProps {
  currentSimulation: CompletedSuccessfulSimulation;
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}

export function ReportTransactionModal(props: ReportTransactionProps) {
  const { currentSimulation, disclosure } = props;
  const [selectedReportOption, setSelectedOption] = useState('malicious transaction');
  const [sentReport, setSentReport] = useState(false);
  const { isOpen, onClose } = disclosure;

  function handleSelectOption(e: any) {
    setSelectedOption(e.target.value);
  }

  function handleSubmitReport() {
    setSentReport(true);

    posthog.capture('simulation issue reported', {
      reason: selectedReportOption,
      currentSimulation
    });
  }

  return (
    <ChakraProvider>
      <Modal isCentered closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(1px)" />

        <ModalContent alignItems={'center'}>
          <div style={{ width: '300px', position: 'absolute', top: '-100px', height: '150px', background: '#212121', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src='/images/popup/x.png'
              width={12}
              style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
              onClick={onClose} />
            <p className={styles['heading-md']} style={{ textTransform: 'none' }}>Report an issue</p>
            {!sentReport ? (
              <>
                <select
                  value={selectedReportOption}
                  style={{ borderRadius: '5px', padding: '5px', marginTop: '5px' }}
                  placeholder='Select an issue'
                  onChange={handleSelectOption}>
                  <option value='malicious transaction'>Malicious transaction</option>
                  <option value='incorrect state changes'>Incorrect asset changes</option>
                  <option value='false positive'>False positive</option>
                  <option value='other issue'>Other issue</option>
                </select>
                <button onClick={handleSubmitReport} className={styles.submitButton} style={{ marginTop: '20px' }}>Submit</button>
              </>
            ) : (
              <p style={{ color: '#19ff00' }}>We will look into this, thank you!</p>
            )}
          </div>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )

}