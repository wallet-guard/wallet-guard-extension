import { Dialog } from '@headlessui/react';
import { IconChevronRight } from '@tabler/icons-react';
import React from 'react';
import { useEffect, useState } from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onRequestClose }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  const updateScreenSize = () => {
    setIsLargeScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <Dialog open={isOpen} onClose={onRequestClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div
        style={{
          display: 'flex',
          alignItems: isLargeScreen ? 'center' : 'flex-end',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            backgroundColor: '#232323',
            borderRadius: '0.375rem',
            maxWidth: '1100px',
            width: '100%',
            margin: '0 auto',
            minHeight: '680px',
            maxHeight: '700px',
          }}
        >
          <img
            src="/images/chatweb3/welcomeChatWeb3.png"
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
              <img src="/images/chatweb3/wave.png" alt="" style={{ maxWidth: '70px' }} width={70} height={70} />
              <Dialog.Title
                style={{
                  fontSize: '42px',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                Introducing <span style={{ color: '#19FF00' }}>ChatWeb3</span>
              </Dialog.Title>
              <Dialog.Description
                style={{
                  fontSize: '1rem',
                  marginBottom: '1.25rem',
                  color: 'white',
                  maxWidth: '420px',
                  textAlign: 'center',
                }}
              >
                Your personal web3 security companion to help onboard and educate you as you navigate the space.
              </Dialog.Description>
              <hr style={{ width: '100%', borderColor: 'gray', maxWidth: '650px', paddingBottom: '0.75rem' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '0.75rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <img src="/images/chatweb3/choice.png" alt="" width={35} height={35} />
                </div>
                <Dialog.Title
                  style={{
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Select a plugin
                </Dialog.Title>
                <Dialog.Description style={{ color: 'gray', textAlign: 'center', maxWidth: '200px' }}>
                  Select your desired plugin for better insights.
                </Dialog.Description>
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '0.75rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <img src="/images/chatweb3/asking.png" alt="" width={35} height={35} />
                </div>
                <Dialog.Title
                  style={{
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Ask questions
                </Dialog.Title>
                <Dialog.Description style={{ fontSize: '1rem', color: 'gray', textAlign: 'center', maxWidth: '200px' }}>
                  Chat about anything web3.
                </Dialog.Description>
              </div>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
              <button
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: '600',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  minWidth: '90%',
                  fontSize: '1rem',
                }}
                onClick={onRequestClose}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
