import React from 'react';
import styles from '../../simulation.module.css';
import { Tooltip } from '@chakra-ui/react';
import { SimulatedGas } from '../../../../models/simulation/Transaction';
import { FaGasPump } from 'react-icons/fa';

export interface ChangeTypeSectionProps {
  title: string;
  iconPath: string;
  gas?: SimulatedGas;
}

export const ChangeTypeHeading = (props: ChangeTypeSectionProps) => {
  return (
    <div className="container">
      <div className="row mb-2 justify-content-between">
        <div className={styles.row} style={{ marginLeft: '3px' }}>
          <img src={props.iconPath} style={{ height: '16px', marginRight: '5px' }} />
          <p className={styles['label-md']}>{props.title}</p>
        </div>
        {props.gas && (
          <Tooltip
            placement="top-start"
            hasArrow
            bg="#212121"
            color="white"
            borderRadius={'5px'}
            className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
            label="Gas is an estimated value"
          >
            <div className={styles.row} style={{ marginRight: '3px' }}>
              <FaGasPump color="#646464" fontSize={'14px'} style={{ marginRight: '5px' }} />
              <p className={styles['label-md']}>
                Gas <span className={styles['text-sm']}>${Number(props.gas.fiatValue).toFixed(2)}</span>
              </p>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
