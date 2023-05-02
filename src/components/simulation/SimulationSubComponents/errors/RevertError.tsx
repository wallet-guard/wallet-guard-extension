import React from 'react';
import styles from '../../simulation.module.css';
import ErrorTextComponent from './ErrorText';
import { ErrorComponentProps } from './GeneralError';

export default function RevertComponent(props: ErrorComponentProps) {
  return (
    <div className="row pt-5 text-center pl-4 pr-4">
      <div className="col-12">
        <h4 className={`${styles['font-archivo-medium']} pb-3`} style={{ color: 'white', marginBottom: '20px' }}>
          The transaction will be reverted
        </h4>
      </div>
      <ErrorTextComponent currentSimulation={props.currentSimulation} />
    </div>
  );
}
