import React from 'react';
import styles from './transactionDetails.module.css';

interface DetailProps {
  labelText: string;
  dataText: string;
}

export function TransactionDetail(props: DetailProps) {
  const { labelText, dataText } = props;

  return (
    <div className="col-6">
      <p className={styles['label-xs']}>{labelText}</p>
      <p className={styles['text-sm']}>{dataText}</p>
    </div>
  );
}
