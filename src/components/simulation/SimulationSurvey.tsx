import React, { useEffect, useState } from 'react';
import { FaPoll } from 'react-icons/fa';
import styles from './simulation.module.css';
import { posthog } from 'posthog-js';
import { WgKeys } from '../../lib/helpers/chrome/localStorageKeys';

export const SimulationSurvey = () => {
  const [showSurvey, setShowSurvey] = useState(true);

  useEffect(() => {
    posthog.capture('show survey');
  }, []);

  function openSurvey() {
    posthog.capture('open survey');
    chrome.tabs.create({ url: 'https://forms.gle/Db1eGs35e6xKZJaM7' });
    closeSurvey(false);
  }

  function closeSurvey(ignore: boolean) {
    if (ignore) {
      posthog.capture('ignore survey');
    }
    setShowSurvey(false);
    chrome.storage.local.set({ [WgKeys.SurveyComplete]: true });
  }

  if (!showSurvey) {
    return <></>;
  }

  return (
    <>
      <div className={styles.hover} style={{ backgroundColor: '#343a40' }}>
        <div className="container">
          <div className={styles.close} onClick={() => closeSurvey(true)}>
            <img src="/images/popup/x.png" alt="x" width={12} />
          </div>
          <div onClick={openSurvey} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FaPoll color="white" fontSize={'75px'} />
            <p
              className={`${styles['font-archivo-medium']} px-3`}
              style={{ color: 'white', fontSize: '14px', marginBottom: 0, paddingBottom: 0 }}
            >
              Please let us know how your experience has been using Wallet Guard with a quick 1 minute survey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
