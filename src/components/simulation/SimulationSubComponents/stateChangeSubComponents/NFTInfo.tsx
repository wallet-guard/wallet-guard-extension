import { Tooltip } from '@chakra-ui/react';
import React from 'react';
import { SimulationStateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';

export interface StateChangesComponentProps {
  stateChange: SimulationStateChange;
}

export const NFTInfo = (props: StateChangesComponentProps) => {
  return (
    <div className={styles.assetChangeLeftColumn}>
      <img
        src={props.stateChange.tokenURI ? props.stateChange.tokenURI : '/images/popup/unknown.png'}
        alt=""
        width={50}
        style={{ borderRadius: '20%', alignSelf: 'center', maxHeight: '50px' }}
      />
      <div>
        {props.stateChange.openSeaLink ? (
          <a
            href={props.stateChange.openSeaLink}
            target="_blank"
            className={`${styles['links']}`}
            style={{ display: 'flex' }}
          >
            <p
              style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
              className={`${styles['font-archivo-bold']} pl-3`}
            >
              <b>
                {props.stateChange.tokenName
                  ? add3Dots(props.stateChange.tokenName, 14)
                  : props.stateChange.tokenID
                  ? props.stateChange.tokenID
                  : 'Unknown'}
              </b>
            </p>
          </a>
        ) : (
          <p
            style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
            className={`${styles['font-archivo-bold']} pl-3`}
          >
            <b>
              {props.stateChange.tokenName
                ? add3Dots(props.stateChange.tokenName, 14)
                : props.stateChange.tokenID
                ? props.stateChange.tokenID
                : 'Unknown'}
            </b>
          </p>
        )}

        <div style={{ display: 'flex' }}>
          <p
            style={{ color: 'darkgray', fontSize: '16px', marginBottom: 0 }}
            className={`${styles['font-archivo-bold']} pl-3`}
          >
            <b>{props.stateChange.name ? add3Dots(props.stateChange.name, 14) : 'Unknown'}</b>
          </p>
          {props.stateChange.openSeaVerified && (
            <Tooltip
              hasArrow
              label="Verified on Opensea"
              bg="#212121"
              color="white"
              placement="right"
              className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
              style={{ borderRadius: '2em' }}
            >
              <img src="/images/popup/twitter-verified-badge.svg" alt="" width={25} className="pl-2" />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
