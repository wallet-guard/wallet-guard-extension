import React from 'react';
import styles from '../../simulation.module.css';
import ErrorTextComponent from './ErrorText';
import { ErrorComponentProps } from './GeneralError';

export default function RateLimitedError(props: ErrorComponentProps) {
  return (
    <div className="row pt-5 text-center pl-4 pr-4">
      <div className="col-12">
        <h4 className={`${styles['font-archivo-medium']} pb-3`} style={{ color: 'white', marginBottom: '20px' }}>
          Too many requests
        </h4>
      </div>
      <div className="col-12 text-center">
        <p
          className={`${styles['font-archivo-medium']}`}
          style={{
            color: 'white',
            fontSize: '16px',
          }}
        >
          We've received a lot of requests recently. Please try again in an hour.
        </p>
      </div>
      <ErrorTextComponent currentSimulation={props.currentSimulation} />
    </div>
  );
}
