import React from 'react';
import { SimulationMethodType, SimulationWarningType } from '../../models/simulation/Transaction';
import styles from './simulation.module.css';

export interface OverviewProps {
  warningType: string;
  message: string;
  method?: string;
}

export const SimulationOverview = (props: OverviewProps) => {
  return (
    <div
      style={
        props.warningType === 'WARN'
          ? { backgroundColor: '#fb4b4b', marginBottom: '-26px' }
          : { backgroundColor: '#484848', marginBottom: '-26px' }
      }
    >
      <div className="container pt-3">
        <div className="pl-3" style={{ display: 'flex' }}>
          {props.warningType === 'WARN' && (
            <img
              src="/images/popup/white-danger.png"
              alt=""
              width={30}
              style={{ alignSelf: 'center', marginBottom: '10px' }}
            />
          )}
          {props.method === SimulationMethodType.PersonalSign && props.warningType === SimulationWarningType.Info ? (
            <h3
              className={`${styles['font-archivo-bold']} pl-2`}
              style={{ color: 'white', marginLeft: '-10px', fontSize: '30px' }}
            >
              Sign a Message
            </h3>
          ) : props.warningType === SimulationWarningType.Warn ? (
            <h3
              className={`${styles['font-archivo-bold']} pl-3`}
              style={{ color: 'white', marginLeft: '-10px', fontSize: '30px' }}
            >
              Warning
            </h3>
          ) : (
            <h3
              className={`${styles['font-archivo-bold']} pl-2`}
              style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: '700', marginLeft: '-10px' }}
            >
              Overview
            </h3>
          )}
        </div>

        <p className={`${styles['font-archivo-medium']} pl-3 pb-3 pr-2`} style={{ color: 'white', fontSize: '16px' }}>
          {props.message
            ? props.message
            : 'We seem to be having some trouble simulating this transaction. Please continue with caution.'}
        </p>
      </div>
    </div>
  );
};
