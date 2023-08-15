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
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react';
import { posthog } from 'posthog-js';

export function TransactionDetails(props: SimulationBaseProps) {
  const { currentSimulation } = props;
  const [showReportButton, setShowReportButton] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);

  function toggleReportButton() {
    if (showReportButton) {
      closeReportButton();
    } else {
      openReportButton();
    }

    setTimeout(() => {
      closeReportButton();
    }, 3000);
  }

  function openReportButton() {
    const reportButton = document.querySelector('#reportButton');
    reportButton?.classList.add(styles.visible);
    setShowReportButton(true);
  }

  function closeReportButton() {
    const reportButton = document.querySelector('#reportButton');
    reportButton?.classList.remove(styles.visible);
    setShowReportButton(false);
  }

  function handleSelectOption(e: any) {
    console.log(e);
    console.log(e.target.value);

    // posthog.capture('simulation issue reported', {
    //   reason: e
    // })
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

          <BsFlagFill className={styles.reportFlag} onClick={() => setShowReportMenu(true)} />
          {/* <BsThreeDots style={{ cursor: 'pointer' }} onClick={toggleReportButton} />

          <div id='reportButton' className={styles.reportButton} onClick={() => setShowReportMenu(true)}>
            <BsFlagFill style={{ marginRight: '5px' }} />
            <p>Report Transaction</p>
          </div> */}
        </div>

        <Modal isOpen={showReportMenu} onClose={() => { }} isCentered>
          <ModalOverlay backdropFilter="blur(1px)" />
          <ModalContent>
            <ModalBody>
              <div style={{ width: '300px', marginLeft: '65px', position: 'absolute', top: '50%', left: '', height: '100px', background: '#212121', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p>Report an issue</p>
                <Select placeholder='Select an issue' onChange={handleSelectOption}>
                  <option value='malicious transaction'>Malicious transaction</option>
                  <option value='incorrect state changes'>Incorrect asset changes</option>
                  <option value='false positive'>False positive</option>
                  <option value='other issue'>Other issue</option>
                </Select>
                <button>Submit</button>
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
