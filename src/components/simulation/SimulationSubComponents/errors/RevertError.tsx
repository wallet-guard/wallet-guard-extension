import React from 'react';
import styles from '../../simulation.module.css';
import { ErrorComponentProps } from './GeneralError';

export default function RevertComponent(props: ErrorComponentProps) {
  return (
    <div className="pt-5 text-center">
      <div className="col-12">
        <h4 className={`${styles['font-archivo-semibold']} pb-3`} style={{ color: 'white' }}>
          This transaction may fail
        </h4>
      </div>

      <div className="container text-center">
        <p
          className={`${styles['font-archivo-medium']}`}
          style={{
            color: 'white',
            fontSize: '16px',
            marginBottom: 0,
          }}
        >
          This can occur when a transaction is no longer valid.
        </p>

        <p
          className={`${styles['font-archivo-medium']}`}
          style={{
            color: 'white',
            fontSize: '16px',
            marginBottom: 0,
            marginTop: '10px'
          }}
        >
          For example: if you try to buy an NFT but it's already been sold, the transaction will fail and you will lose your gas fee.
        </p>

        <p
          className={`${styles['font-archivo-medium']} text-muted`}
          style={{
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          ID: {props.currentSimulation.id}
        </p>
      </div>
    </div>
  );
}
