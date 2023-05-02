import React from 'react';
import styles from '../../ActionPopup.module.css';

export const URLCheckerInput = () => {
  return (
    <div className={styles.footer}>
      <div className="justify-content-center align-items-center">
        <p className="text-muted">Input any URL to lookup</p>
      </div>
    </div>
  );
};
