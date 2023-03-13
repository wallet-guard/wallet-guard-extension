import React, { useEffect, useState } from 'react';
import { Chatweb3Core } from './Chatweb3Core';
import styles from './chatweb3.module.css';

export const Chatweb3Tab = () => {
  const [userInput, setUserInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 1200) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <div>
      <div className="row">
        <div
          className="col-lg-12 col-xl-10 "
          style={{ paddingLeft: '0px', marginLeft: '0px', paddingRight: '0px', marginRight: '0px' }}
        >
          <Chatweb3Core message={userInput} />
        </div>
        {!isMobile && (
          <div className="col-2 text-center" style={{ paddingTop: '4%', boxShadow: '1px 0 0 #212121 inset' }}>
            <img src="/images/lightbulb.png" alt="" width={50} style={{ marginLeft: '80px', paddingBottom: '10px' }} />

            <h1 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Examples</h1>
            <button
              className={`mt-5 ${styles.links}`}
              onClick={() => setUserInput('Explain the difference between ERC20 and ERC721')}
            >
              "Explain the difference between ERC20 and ERC721"{' '}
              <img src="/images/arrow.png" alt="" width={13} style={{ display: 'inline-block' }} />
            </button>

            <button
              className={`mt-5 ${styles.links}`}
              onClick={() => setUserInput('How should i store my seed phrase as secure as possible?')}
            >
              "How should i store my seed phrase as secure as possible?"{' '}
              <img src="/images/arrow.png" alt="" width={13} style={{ display: 'inline-block' }} />
            </button>

            <button
              className={`mt-5 ${styles.links}`}
              onClick={() => setUserInput('Explain to me what an NFT is as if I knew nothing')}
            >
              "Explain to me what an NFT is as if I knew nothing"{' '}
              <img src="/images/arrow.png" alt="" width={13} style={{ display: 'inline-block' }} />
            </button>

            <button
              className={`mt-5 ${styles.links}`}
              onClick={() => setUserInput('Explain the difference between ERC20 and ERC721')}
            >
              "Explain the difference between ERC20 and ERC721"{' '}
              <img src="/images/arrow.png" alt="" width={13} style={{ display: 'inline-block' }} />
            </button>

            <button
              className={`mt-5 ${styles.links}`}
              onClick={() => setUserInput('How should i store my seed phrase as secure as possible?')}
            >
              "How should i store my seed phrase as secure as possible?"{' '}
              <img src="/images/arrow.png" alt="" width={13} style={{ display: 'inline-block' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
