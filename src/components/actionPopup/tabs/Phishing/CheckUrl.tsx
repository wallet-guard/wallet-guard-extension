import React, { useState } from 'react';
import styles from '../../ActionPopup.module.css';
import { Button, ChakraProvider, Input, InputGroup, InputRightAddon, InputRightElement } from '@chakra-ui/react';

export const URLCheckerInput = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="justify-content-center align-items-center">
          <p className="text-muted">Input any URL to lookup</p>
          <Input value={inputValue} onChange={handleChange} placeholder="coinbase.com" size="sm" />
          <Button size="md" color="green.200" variant="solid">
            Check
          </Button>
        </div>
      </div>
    </div>
  );
};
