import React, { ReactEventHandler, useState } from 'react';
import styles from './simulation.module.css';
import { TransactionDetailLabel } from './SimulationSubComponents/transactionDetails/TransactionDetailLabel';
import { ChainDetail } from './SimulationSubComponents/transactionDetails/ChainDetail';
import { ContractDetail } from './SimulationSubComponents/transactionDetails/ContractDetail';
import { WebsiteDetail } from './SimulationSubComponents/transactionDetails/WebsiteDetail';
import { AddressType, RecommendedActionType } from '../../models/simulation/Transaction';
import { RiskFactors } from './SimulationSubComponents/transactionDetails/RiskFactors';
import { SimulationBaseProps } from '../../pages/popup';
import { BsFlagFill, BsThreeDots } from 'react-icons/bs';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import { posthog } from 'posthog-js';

export function TransactionDetails(props: SimulationBaseProps) {
  const { currentSimulation } = props;
  const [selectedReportOption, setSelectedOption] = useState('malicious transaction');
  const [sentReport, setSentReport] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    // margin top accounts for the heading + tabs
    <div className="container" style={{ marginTop: '118px' }}>
      <div
        className={
          currentSimulation.simulation.riskFactors
            ? styles.transactionDetailsCardWithWarnings
            : styles.transactionDetailsCard
        }
      >
        <div className={styles.row} style={{ justifyContent: "space-between", marginBottom: '10px' }}>
          <p className={styles['heading-md']} style={{ textTransform: 'none' }}>
            Transaction Details
          </p>

          <BsFlagFill className={styles.reportFlag} onClick={onOpen} />
        </div>

        <Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay backdropFilter="blur(1px)" />
          <ModalContent>
            <ModalBody>
              <div style={{ width: '300px', marginLeft: '65px', position: 'absolute', top: '50%', left: '', height: '150px', background: '#212121', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src='/images/popup/x.png' width={12} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
                <p className={styles['heading-md']} style={{ textTransform: 'none' }}>Report an issue</p>
                {!sentReport ? (
                  <>
                    <select value={selectedReportOption}
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
            </ModalBody>
          </ModalContent>
        </Modal>

        <div className="row mb-3">
          <div className="col-6">
            <TransactionDetailLabel labelText="Chain" />
            <ChainDetail chainId={currentSimulation.args.chainId} />
          </div>
          <div className="col-6">
            <TransactionDetailLabel
              labelText={
                currentSimulation.simulation.addressDetails.addressType === AddressType.Contract
                  ? 'Contract'
                  : 'Address'
              }
            />
            <ContractDetail addressDetails={currentSimulation.simulation.addressDetails} />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <TransactionDetailLabel labelText="Website" />
            <WebsiteDetail
              verified={currentSimulation.simulation.scanResult.verified || false}
              domainName={currentSimulation.simulation.scanResult.domainName || ''}
              recommendedAction={currentSimulation.simulation.recommendedAction || RecommendedActionType.None}
            />
          </div>
        </div>
      </div>
      {
        currentSimulation.simulation.riskFactors && (
          <RiskFactors
            riskFactors={currentSimulation.simulation.riskFactors}
            recommendedAction={currentSimulation.simulation.recommendedAction}
            overviewMessage={currentSimulation.simulation.overviewMessage}
          />
        )
      }
    </div >
  );
}
