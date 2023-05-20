import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  color: 'gray' | 'green';
}

export function Spinner(props: SpinnerProps) {
  const { color } = props;
  return (
    <div className={styles['lds-ring'] + ' ' + styles[color]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
