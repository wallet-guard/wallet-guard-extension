import React, { useEffect, useState } from 'react';
import { WgKeys } from '../../../lib/helpers/chrome/localStorageKeys';
import posthog from 'posthog-js';

interface TrySkipTransactionsProps {
  domainName?: string;
}

export const TrySkipTransactions: React.FC<TrySkipTransactionsProps> = ({ domainName }) => {
  const [showModal, setShowModal] = useState(() => {
    const modalShown = localStorage.getItem(WgKeys.SimulationSkipModal);
    return !(modalShown === 'true'); // Show modal if modalShown isn't true
  });

  useEffect(() => {
    posthog.capture('simulation_skip_modal_shown', {
      domain: domainName,
    });
  }, []);

  const handleClose = (source: string) => {
    posthog.capture('simulation_skip_modal_closed', {
      source,
    });

    localStorage.setItem(WgKeys.SimulationSkipModal, 'true');
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <>
      <div style={{ paddingTop: '60px' }}></div>
      <div
        style={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          backgroundColor: '#2B2B2B',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '18px 20px',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0px',
            right: '10px',
            cursor: 'pointer',
          }}
          onClick={() => handleClose('close_button')}
        >
          <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>×</span>
        </div>

        <img src="/images/popup/running-icon.png" alt="Skip Icon" style={{ height: '28px', width: '28px' }} />
        <span
          style={{
            flexGrow: 1,
            textAlign: 'left',
            paddingLeft: '18px',
            color: '#FFFFFF',
            fontSize: '15px',
            fontFamily: 'ArchivoBold',
          }}
        >
          Skip simulations on {domainName ? domainName : 'this website'}?
        </span>
        <a
          href="https://dashboard.walletguard.app/settings/extension/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClose('try_now_button')}
          style={{
            textDecoration: 'none',
            color: '#18F101',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <span
            style={{
              fontFamily: 'ArchivoBold',
              color: '#18F101',
              fontSize: '15px',
              whiteSpace: 'nowrap',
            }}
          >
            Try Now
          </span>
          <span
            style={{
              paddingLeft: '5px',
              display: 'flex',
              alignItems: 'center',
              color: '#18F101',
              fontFamily: 'ArchivoBold',
            }}
          >
            →
          </span>
        </a>
      </div>
    </>
  );
};
