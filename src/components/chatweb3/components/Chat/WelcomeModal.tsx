import { IconChevronRight } from '@tabler/icons-react';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Kbd,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';
import { openDashboard } from '../../../../lib/helpers/linkHelper';
import styles from './WelcomeModal.module.css';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { BsListCheck } from 'react-icons/bs';
import posthog from 'posthog-js';

interface WelcomeModalProps {
  onClose: () => void;
}

type ButtonColor = 'green' | undefined;

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [isMac, setIsMac] = useState(false);
  const [buttonColor, setButtonColor] = useState<ButtonColor>();

  useEffect(() => {
    posthog.capture('show dashboard promo');
    posthog.onFeatureFlags(() => {
      const color = posthog.getFeatureFlagPayload('dashboard-promo-button-color') as ButtonColor;
      setButtonColor(color);
    });
  }, []);

  const updateScreenSize = () => {
    setIsLargeScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  chrome.runtime.getPlatformInfo(function (info) {
    if (info.os === 'mac') {
      setIsMac(true);
    }
  });

  function promptDashboard(converted: boolean) {
    posthog.capture('dashboard promo interaction', {
      converted,
    });
    onClose();

    if (converted) {
      openDashboard('simulation_promo', true);
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} size={'5xl'}>
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent
        style={{ padding: 0, backgroundColor: '#0b0b0b', marginBottom: !isLargeScreen ? '0px' : '4rem' }}
        containerProps={{ alignItems: isLargeScreen ? 'center' : 'flex-end' }}
      >
        <ModalBody style={{ padding: 0, paddingBottom: '2rem' }}>
          <div>
            <div>
              <img
                src="/images/chatweb3/dashboardWelcome.png"
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '0.375rem 0.375rem 0 0',
                  height: '25%',
                }}
                width={1004}
                height={370}
              />
              <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    marginTop: '-25%',
                  }}
                >
                  <img src="/images/chatweb3/wave.png" alt="" style={{ maxWidth: '70px' }} width={60} height={60} />
                  <h1
                    style={{
                      fontSize: isLargeScreen ? '42px' : '40px',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Run your first<span style={{ color: '#19FF00' }}> security scan</span>
                  </h1>
                  <p
                    style={{
                      fontSize: '1.1rem',
                      marginBottom: '1.25rem',
                      color: 'white',
                      maxWidth: '450px',
                      textAlign: 'center',
                    }}
                  >
                    Our new security dashboard automates your wallet security, so you can degen safely.
                  </p>
                  <hr style={{ width: '100%', borderColor: 'gray', maxWidth: '650px', paddingBottom: '0.75rem' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '0.75rem' }}
                  >
                    <div style={{ marginBottom: '1rem' }}>
                      <AiOutlineSecurityScan color='#19ff00' fontSize={'35px'} />
                    </div>
                    <h2
                      style={{
                        fontSize: isLargeScreen ? '28px' : '24px',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      Run your security scan
                    </h2>
                    <p style={{ color: 'gray', textAlign: 'center', maxWidth: isLargeScreen ? '230px' : '270px' }}>
                      Runs in seconds. Alerts you to any risks.
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: '0 1.5rem',
                      marginTop: '55px',
                    }}
                  >
                    <IconChevronRight color="white" />
                  </div>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '0.75rem' }}
                  >
                    <div style={{ marginBottom: '1rem' }}>
                      <BsListCheck color='#19ff00' fontSize={'35px'} />
                    </div>
                    <h2
                      style={{
                        fontSize: isLargeScreen ? '28px' : '24px',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      Revoke open approvals
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'gray', textAlign: 'center', maxWidth: '230px' }}>
                      Open approvals can put your assets at risk.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button
                    style={{
                      backgroundColor: buttonColor === 'green' ? '#19ff00' : 'white',
                      color: 'black',
                      fontWeight: '600',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      width: '200px',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                    className={styles.tryButton}
                    onClick={() => promptDashboard(true)}
                  >
                    Scan Now
                  </button>
                  <button
                    className={styles.skipButton}
                    style={{
                      backgroundColor: '#fff0',
                      fontWeight: '600',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      width: '200px',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                    onClick={() => promptDashboard(false)}
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
