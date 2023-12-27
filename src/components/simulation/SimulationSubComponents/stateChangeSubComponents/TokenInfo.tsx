import React from 'react';
import { StateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';
import { AssetChangeImage } from './AssetChangeImage';
import { LockIcon } from '@chakra-ui/icons';

export interface StateChangesComponentProps {
  stateChange: StateChange;
}

export const TokenInfo = (props: StateChangesComponentProps) => {
  return (
    <div className={styles.assetChangeLeftColumn} style={{ color: props.stateChange.locked ? '#646464 !important' : '' }}>
      <AssetChangeImage imageURL={props.stateChange.logo || props.stateChange.tokenURI} />
      {props.stateChange.coinmarketcapLink ? (
        <a href={props.stateChange.coinmarketcapLink} target="_blank" className={`${styles['links']}`}>
          <h3
            style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
            className={`${styles['font-archivo-bold']} pl-3`}
          >
            {props.stateChange.symbol ? add3Dots(props.stateChange.symbol, 14) : 'Unknown'}
            {props.stateChange.locked &&
              <LockIcon />
            }
          </h3>
        </a>
      ) : (
        <h3
          style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
          className={`${styles['font-archivo-bold']} pl-3`}
        >
          {props.stateChange.symbol ? add3Dots(props.stateChange.symbol, 14) : 'Unknown'}
          {props.stateChange.locked &&
            <LockIcon />
          }
        </h3>
      )}
    </div>
  );
};
