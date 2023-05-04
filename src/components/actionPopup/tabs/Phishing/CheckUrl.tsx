import React, { useState } from 'react';
import styles from '../../ActionPopup.module.css';

interface URLCheckProps {
  defaultURL: string;
}

export const URLCheckerInput = (props: URLCheckProps) => {
  const [inputValue, setInputValue] = useState(props.defaultURL);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

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
            <button className={styles.urlCheckButton}>CHECK</button>
          </div>
        </div>
      </div>
    </div>
  );
};
