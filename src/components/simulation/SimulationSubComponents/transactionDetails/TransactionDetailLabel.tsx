import React from 'react';
import styles from './transactionDetails.module.css';

interface DetailProps {
  labelText: string;
}

export function TransactionDetailLabel(props: DetailProps) {
  const { labelText } = props;

  return <p className={styles['label-xs']}>{labelText}</p>;
}
