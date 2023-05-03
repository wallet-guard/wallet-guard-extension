import React, { useState } from 'react';
import styles from '../../ActionPopup.module.css';
import { Button, Input } from '@chakra-ui/react';

export const URLCheckerInput = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

  return (
    <div className={styles.footer}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <p className="text-muted" style={{ fontSize: '16px' }}>
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
            {/* <Input value={inputValue} onChange={handleChange} placeholder="coinbase.com" size="sm" />
            <Button disabled={inputValue === ''} size="md" color="green.200" variant="solid">
              Check
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
