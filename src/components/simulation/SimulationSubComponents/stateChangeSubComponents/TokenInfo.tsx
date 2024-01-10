import React from 'react';
import { StateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';
import { AssetChangeImage } from './AssetChangeImage';

export interface StateChangesComponentProps {
  stateChange: StateChange;
}

export const TokenInfo = (props: StateChangesComponentProps) => {
  return (
    <div className={styles.assetChangeLeftColumn}>
      <AssetChangeImage imageURL={props.stateChange.logo || props.stateChange.tokenURI} />
      <div className='flex column align-center pl-3'>
        <div className={styles['row']}>
          <a href={props.stateChange.coinmarketcapLink || 'https://coinmarketcap.com'} target="_blank" className={`${styles['links']}`}>
            <h3
              style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
              className={`${styles['font-archivo-bold']}`}
            >
              {props.stateChange.symbol ? add3Dots(props.stateChange.symbol, 14) : 'Unknown'}
            </h3>
          </a>
          {props.stateChange.locked &&
            <img src='/images/popup/assetLock.svg' className='pl-1' />
          }
        </div>
        {props.stateChange.locked && (
          <p style={{ marginBottom: 0, color: '#646464' }} className={`${styles['font-archivo-medium']}`}>Locked</p>
        )}
      </div>

    </div>
  );
};
