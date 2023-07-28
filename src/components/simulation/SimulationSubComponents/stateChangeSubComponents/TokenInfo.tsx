import { Tooltip } from '@chakra-ui/react';
import React from 'react';
import { SimulationStateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';
import { AssetChangeImage } from './AssetChangeImage';

export interface StateChangesComponentProps {
  stateChange: SimulationStateChange;
}

export const TokenInfo = (props: StateChangesComponentProps) => {
  return (
    <div className={styles.assetChangeLeftColumn}>
      <AssetChangeImage imageURL={props.stateChange.logo} />
      {props.stateChange.coinmarketcapLink ? (
        <a href={props.stateChange.coinmarketcapLink} target="_blank" className={`${styles['links']}`}>
          <h3
            style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
            className={`${styles['font-archivo-bold']} pl-3`}
          >
            {props.stateChange.symbol ? add3Dots(props.stateChange.symbol, 14) : 'Unknown'}
          </h3>
        </a>
      ) : (
        <h3
          style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
          className={`${styles['font-archivo-bold']} pl-3`}
        >
          {props.stateChange.symbol ? add3Dots(props.stateChange.symbol, 14) : 'Unknown'}
        </h3>
      )}
    </div>
  );
};
