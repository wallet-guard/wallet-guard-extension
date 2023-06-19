import React, { useEffect, useState } from 'react';
import { Kbd } from '@chakra-ui/react';
import { CloseButton } from '@chakra-ui/react';
import { IconArrowBarLeft, IconArrowBarRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export const Navbar = ({
  showChatWeb3,
  setShowChatWeb3,
  fromSimulation,
}: {
  showChatWeb3?: any;
  setShowChatWeb3?: any;
  fromSimulation?: any;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Default (GPT-3.5)');

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownSelect = (model: any) => {
    setSelectedModel(model);
    setIsDropdownOpen(false);
  };

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#232323',
        height: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div>
        {fromSimulation ? (
          <>
            <button
              onClick={() => setShowChatWeb3(!showChatWeb3)}
              style={{ display: 'flex', alignItems: 'center', flex: '1' }}
            >
              <IconChevronLeft size={35} className="pr-1" />
              <h1
                style={{
                  color: 'white',
                  fontSize: '1.25rem',
                  marginLeft: '0.15rem',
                  fontWeight: 'bold',
                  marginTop: '6px',
                }}
              >
                Back to transaction
              </h1>
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
            <img
              style={{ height: '2rem', width: 'auto' }}
              src="/images/wg_logos/Logo-Large-Transparent.png"
              alt="Logo"
            />
            <h1
              style={{
                color: 'white',
                fontSize: '1.25rem',
                marginLeft: '0.5rem',
                fontWeight: 'bold',
                marginTop: '6px',
              }}
            >
              ChatWeb3
            </h1>
          </div>
        )}
      </div>
      {width > 768 && (
        <span style={{ textAlign: 'right', fontWeight: 'bold' }}>
          Hotkey: <Kbd>command</Kbd> + <Kbd>shift</Kbd> + <Kbd>U</Kbd>
        </span>
      )}
    </div>
  );
};
