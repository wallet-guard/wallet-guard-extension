import posthog from 'posthog-js';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfirmSimulationButton } from '../components/simulation/SimulationButton';
import { NoSimulation } from '../components/simulation/NoSimulation';
import { SimulationHeader } from '../components/simulation/SimulationHeader';
import { TransactionContent } from '../components/simulation/TransactionContent';
import { RecommendedActionType, SimulationMethodType } from '../models/simulation/Transaction';
import * as Sentry from '@sentry/react';
import { ErrorComponent } from '../components/simulation/Error';
import { ChatWeb3Tab } from '../components/chatweb3/components/Chat/ChatWeb3Tab';
import { BypassedSimulationButton } from '../components/simulation/SimulationSubComponents/BypassButton';
import { PersonalSign } from '../components/simulation/PersonalSign';
import { TransactionDetails } from '../components/simulation/TransactionDetails';
import { useSimulation } from '../lib/hooks/useSimulation';
import { SimulationTabs } from '../components/simulation/SimulationTabs';
import { SimulationLoading } from '../components/simulation/SimulationSubComponents/SimulationLoading';
import { CompletedSuccessfulSimulation, StoredSimulationState } from '../lib/simulation/storage';
import styles from '../styles.module.css';
import { LockedAssetPopup } from '../components/simulation/SimulationSubComponents/errors/LockedAssetPopup';
import { UnresolvableSignatureModal } from '../components/simulation/SimulationSubComponents/UnresolvableSignatureModal';
import { TrySkipTransactions } from '../components/simulation/SimulationSubComponents/TrySkipTransactions';
import { getDomainNameFromURL } from '../lib/helpers/phishing/parseDomainHelper';
import { PopupManagerType, getAdditionalDataPopup } from '../lib/simulation/popupManager';
import { WgKeys } from '../lib/helpers/chrome/localStorageKeys';
import { AcquisitionNoticeModal } from '../components/simulation/SimulationSubComponents/AcquisitionNotice';

export interface SimulationBaseProps {
  currentSimulation: CompletedSuccessfulSimulation;
}

const Popup = () => {
  const [showChatWeb3, setShowChatWeb3] = useState<boolean>(false);
  const { currentSimulation, loading } = useSimulation();
  const [viewedAcquisitionNotice, setViewedAcquisitionNotice] = useState(true);

  posthog.init('phc_rb7Dd9nqkBMJYCCh7MQWpXtkNqIGUFdCZbUThgipNQD', {
    api_host: 'https://app.posthog.com',
    persistence: 'localStorage',
    autocapture: false,
    capture_pageleave: false,
    disable_session_recording: true,
  });

  useEffect(() => {
    const viewedAcquisitionNotice = localStorage.getItem(WgKeys.ViewedAcquisitionNotice);

    if (!viewedAcquisitionNotice) {
      setViewedAcquisitionNotice(false);
    }
  }, []);

  function closeAcquisitionPopup() {
    localStorage.setItem(WgKeys.ViewedAcquisitionNotice, 'true');
    setViewedAcquisitionNotice(true);
  }

  Sentry.init({
    dsn: 'https://d6ac9c557b4c4eee8b1d4224528f52b3@o4504402373640192.ingest.sentry.io/4504402378293248',
    integrations: [new Sentry.BrowserTracing()],
  });

  // Return an empty page because we don't want any other UIs to flash in the few ms before we finish pulling from localStorage
  if (loading) {
    return <></>;
  }

  // No Active Transaction Screen
  if (!currentSimulation) {
    return <NoSimulation />;
  }

  // Loading Screen
  if (currentSimulation.state === StoredSimulationState.Simulating) {
    return (
      <>
        <SimulationHeader details={{ recommendedAction: RecommendedActionType.None, verified: false }} />
        <SimulationLoading />;
        <ConfirmSimulationButton storedSimulation={currentSimulation} />
      </>
    );
  }

  // Error Screen
  if (currentSimulation.simulation.error) {
    return <ErrorComponent currentSimulation={currentSimulation} type={currentSimulation.simulation.error.type} />;
  }

  // Not sure why TypeScript doesn't pick this up, but by this point, this is the type.
  const successfulSimulation: CompletedSuccessfulSimulation = currentSimulation as CompletedSuccessfulSimulation;

  // Personal Sign Screen
  if (currentSimulation.args.method === SimulationMethodType.PersonalSign && !currentSimulation.simulation.extraInfo) {
    return (
      <>
        <PersonalSign currentSimulation={successfulSimulation} />
        <ConfirmSimulationButton storedSimulation={currentSimulation} />
      </>
    );
  }

  const domainName = getDomainNameFromURL(currentSimulation.args.origin);
  const popup = getAdditionalDataPopup(successfulSimulation);

  return (
    <>
      <div className={styles.transactionHeadingFixed}>
        <SimulationHeader
          details={{
            recommendedAction: currentSimulation.simulation.recommendedAction,
            verified: currentSimulation.simulation.scanResult.verified,
          }}
        />
        <SimulationTabs setShowChatWeb3={setShowChatWeb3} />
      </div>

      {showChatWeb3 ? (
        <ChatWeb3Tab
          showChatWeb3={showChatWeb3}
          setShowChatWeb3={setShowChatWeb3}
          storedSimulation={successfulSimulation}
        />
      ) : (
        <>
          <TransactionDetails currentSimulation={successfulSimulation} />
          <TransactionContent currentSimulation={successfulSimulation} />
          <div style={{ height: popup !== PopupManagerType.None ? '200px' : '140px' }} />

          {!viewedAcquisitionNotice && <AcquisitionNoticeModal closeCb={closeAcquisitionPopup} />}

          {popup === PopupManagerType.ShowUnresolvableSignature ? (
            <UnresolvableSignatureModal message={currentSimulation.simulation.extraInfo!.message} />
          ) : popup === PopupManagerType.ShowLockedAsset ? (
            <LockedAssetPopup />
          ) : popup === PopupManagerType.ShowSkipSimulation ? (
            <TrySkipTransactions domainName={domainName} />
          ) : (
            <></>
          )}

          {currentSimulation.args.bypassed ? (
            <BypassedSimulationButton storedSimulation={currentSimulation} />
          ) : (
            <ConfirmSimulationButton storedSimulation={currentSimulation} />
          )}
        </>
      )}
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
