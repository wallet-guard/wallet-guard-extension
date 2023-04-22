import { Tooltip } from '@chakra-ui/react';
import React from 'react';
import { SimulationStateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';

export interface StateChangesComponentProps {
  stateChange: SimulationStateChange;
}

export const TokenInfo = (props: StateChangesComponentProps) => {
  {
    /* ONLY DO THIS ON NFTS */
  }
  return (
    <div className="col-6" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <img
        src={props.stateChange.logo ? props.stateChange.logo : '/images/popup/unknown.png'}
        alt=""
        width={48}
        style={{ borderRadius: '20%', alignSelf: 'center', maxHeight: '50px' }}
      />
      {props.stateChange.coinmarketcapLink ? (
        <a
          href={props.stateChange.coinmarketcapLink}
          target="_blank"
          className={`${styles['links']}`}
          style={{ display: 'flex' }}
        >
          <h3
            style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
            className={`${styles['font-archivo-bold']} pl-3`}
          >
            <b>{props.stateChange.symbol ? add3Dots(props.stateChange.symbol, 11) : 'Unknown'}</b>
          </h3>
        </a>
      ) : (
        <h3
          style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
          className={`${styles['font-archivo-bold']} pl-3`}
        >
          <b>{props.stateChange.symbol ? add3Dots(props.stateChange.symbol, 11) : 'Unknown'}</b>
        </h3>
      )}

      {props.stateChange.etherscanVerified && (
        <Tooltip
          hasArrow
          label="Verified on Etherscan"
          bg="#212121"
          color="white"
          placement="right"
          className={`${styles['font-archivo-bold']}`}
          style={{ borderRadius: '2em' }}
        >
          <img src="/images/popup/twitter-verified-badge.svg" alt="" width={25} className="pl-2" />
        </Tooltip>
      )}
    </div>
  );
};
