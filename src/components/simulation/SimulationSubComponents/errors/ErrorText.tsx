import React from 'react';
import styles from '../../simulation.module.css';
import { ErrorComponentProps } from './GeneralError';

export default function ErrorTextComponent(props: ErrorComponentProps) {
  return (
    <div className="col-12 text-center">
      <p
        className={`${styles['font-archivo-medium']}`}
        style={{
          color: 'white',
          fontSize: '16px',
          marginBottom: 0,
        }}
      >
        Reach out to our <a href="https://discord.com/invite/cM8USCesnd">Discord</a> if you have any questions
      </p>
      <p
        className={`${styles['font-archivo-medium']} text-muted`}
        style={{
          fontSize: '16px',
        }}
      >
        ID: {props.currentSimulation.id}
      </p>
    </div>
  );
}
