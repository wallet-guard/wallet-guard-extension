import React from 'react';
import styles from '../../simulation.module.css';
import ErrorTextComponent from './ErrorText';
import { ErrorComponentProps } from './GeneralError';

export default function UnauthorizedComponent(props: ErrorComponentProps) {
  return (
    <div className="row pt-5 text-center pl-4 pr-4">
      <div className="col-12">
        <h4 className={`${styles['font-archivo-medium']} pb-3`} style={{ color: 'white', marginBottom: '20px' }}>
          Unauthorized
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
          If you are running a VPN it may be conflicting with our services due to a recent DDoS attack. We apologize for
          any inconvenience.
        </p>
      </div>
      <ErrorTextComponent currentSimulation={props.currentSimulation} />
    </div>
  );
}
