import React, { useState } from 'react';
import styles from '../../ActionPopup.module.css';
import { PhishingResponse } from '../../../../models/PhishingResponse';
import { domainScan } from '../../../../services/http/domainScan';

interface URLCheckProps {
  defaultURL: string;
  updateURLCallback: (result: PhishingResponse) => void;
}

export const URLCheckerInput = (props: URLCheckProps) => {
  const { defaultURL, updateURLCallback } = props;
  const [inputValue, setInputValue] = useState(defaultURL);
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);
  const [showError, setShowError] = useState(false);

  async function checkURL() {
    console.log('hit');
    setLoading(true);
    const response = await domainScan(inputValue);

    setLoading(false);

    if (!response) {
      setShowError(true);
      return;
    }

    updateURLCallback(response);
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
            />
            <button onClick={checkURL} className={styles.urlCheckButton}>
              {loading ? 'LOADING' : 'CHECK'}
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
