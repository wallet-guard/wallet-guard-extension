import { Dialog } from '@headlessui/react';
import { IconChevronRight } from '@tabler/icons-react';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  CloseButton,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: any;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  const updateScreenSize = () => {
    setIsLargeScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
      <ModalOverlay />
      <ModalContent
        style={{ padding: 0, backgroundColor: '#232323', marginBottom: !isLargeScreen ? '0px' : '4rem' }}
        containerProps={{ alignItems: isLargeScreen ? 'center' : 'flex-end' }}
      >
        <ModalBody style={{ padding: 0, paddingBottom: '2rem' }}>
          <div>
            <div>
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
                    Introducing <span style={{ color: '#19FF00' }}>ChatWeb3</span>
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
                    Your personal web3 security companion to help onboard and educate you as you navigate the space.
                  </p>
                  <hr style={{ width: '100%', borderColor: 'gray', maxWidth: '650px', paddingBottom: '0.75rem' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '0.75rem' }}
                  >
                    <div style={{ marginBottom: '1rem' }}>
                      <img src="/images/chatweb3/choice.png" alt="" width={35} height={35} />
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
                      Command + Shift + U
                    </h2>
                    <p style={{ color: 'gray', textAlign: 'center', maxWidth: isLargeScreen ? '230px' : '270px' }}>
                      Access ChatWeb3 from anywhere on the web.
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
                      <img src="/images/chatweb3/asking.png" alt="" width={35} height={35} />
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
                      Ask questions
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'gray', textAlign: 'center', maxWidth: '230px' }}>
                      Trained specifically on everything web3
                    </p>
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
                      width: '200px',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                    onClick={onClose}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        {/* <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
