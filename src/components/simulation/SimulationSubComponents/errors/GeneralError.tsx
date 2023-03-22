import React from 'react';
import { StoredSimulation } from '../../../../lib/simulation/storage';
import styles from '../../simulation.module.css';
import ErrorTextComponent from './ErrorText';

export interface ErrorComponentProps {
  currentSimulation: StoredSimulation;
}

export default function GeneralErrorComponent(props: ErrorComponentProps) {
  return (
    <div className="row pt-5 text-center pl-4 pr-4">
      <div className="col-12 text-center">
        <h4 className={`${styles['font-archivo-medium']} pb-3`} style={{ color: 'white', marginBottom: '20px' }}>
          Oops... Something went wrong
        </h4>
      </div>
      <ErrorTextComponent currentSimulation={props.currentSimulation} />
    </div>
  );
}
