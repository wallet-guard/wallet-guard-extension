import React, { useState } from 'react';
import styles from '../../ActionPopup.module.css';
import { PhishingResponse } from '../../../../models/PhishingResponse';
import { domainScan } from '../../../../services/http/domainScan';
import { Spinner } from '../../common/Spinner';
import { posthog } from 'posthog-js';

interface URLCheckProps {
  updateURLCallback: (result: PhishingResponse) => void;
}

export const URLCheckerInput = (props: URLCheckProps) => {
  const { updateURLCallback } = props;
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);
  const [showError, setShowError] = useState(false);

  async function checkURL() {
    setLoading(true);
    const response = await domainScan(inputValue);

    posthog.capture('URL Search', {
      query: inputValue,
    });

    setLoading(false);

    if (!response) {
      posthog.capture('URL Search Error', {
        query: inputValue,
      });
      setShowError(true);
      return;
    }

    setShowError(false);
    updateURLCallback(response);
  }

  function onPressEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      checkURL();
    }
  }

  return (
    <div className={styles.footer}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <p className="text-muted" style={{ fontSize: '16px', marginBottom: '10px' }}>
            Input any URL to lookup
          </p>
          <div className="row" style={{ width: '372px' }}>
            <input
              className={styles.urlCheckInput}
              placeholder="https://coinbase.com"
              onChange={handleChange}
              value={inputValue}
              onKeyDown={onPressEnter}
            />
            {/* TODO: add regex for is not valid URL + spinner for loading*/}
            {/* TODO: Add timeout on this button (same as refresh button on version checker) */}
            <button disabled={inputValue === ''} onClick={checkURL} className={styles.urlCheckButton}>
              {loading ? <Spinner /> : 'CHECK'}
            </button>
          </div>
          {showError && (
            <p style={{ fontSize: '12px', marginBottom: 0, alignSelf: 'flex-start' }} className={styles['text-red']}>
              We encountered an error. Please try again later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
