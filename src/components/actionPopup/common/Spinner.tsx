import React from 'react';
import styles from './Spinner.module.css';

export function Spinner() {
  return (
    <div className={styles['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
