import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Kbd } from '@chakra-ui/react';
import { IconChevronLeft } from '@tabler/icons-react';
import { TwitterShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export const Navbar = ({
  showChatWeb3,
  setShowChatWeb3,
}: {
  showChatWeb3?: boolean | undefined;
  setShowChatWeb3?: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isMac, setIsMac] = useState(false);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  chrome.runtime.getPlatformInfo(function (info) {
    if (info.os === 'mac') {
      setIsMac(true);
    }
  });

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
        width: '100%', // temp
        position: 'fixed', // temp
      }}
    >
      <div>
        {showChatWeb3 && setShowChatWeb3 ? (
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
                Back
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
      {showChatWeb3 ? (
        <span style={{ textAlign: 'right', fontWeight: 'bold' }}>
          Hotkey: <Kbd>{isMac ? 'command' : 'control'}</Kbd> + <Kbd>shift</Kbd> + <Kbd>U</Kbd>
        </span>
      ) : (
        <TwitterShareButton
          url={'https://walletguard.app'}
          title={'Join myself and 20,000+ others who are protecting our assets with Wallet Guard'}
          via={'wallet_guard'}
        >
          <a style={{ color: 'white' }} className="btn btn-dark">
            <div>
              <b className={`pr-2`}>Share</b>
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </div>
          </a>
        </TwitterShareButton>
      )}
    </div>
  );
};
