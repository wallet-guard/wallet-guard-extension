import { Tooltip } from '@chakra-ui/react';
import React from 'react';
import { SimulationStateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';
import { AssetChangeImage } from './AssetChangeImage';

export interface StateChangesComponentProps {
  stateChange: SimulationStateChange;
}

export const NFTInfo = (props: StateChangesComponentProps) => {
  return (
    <div className={styles.assetChangeLeftColumn}>
      <AssetChangeImage imageURL={props.stateChange.tokenURI} />
      <div>
        {props.stateChange.openSeaLink ? (
          <a href={props.stateChange.openSeaLink} target="_blank" className={`${styles['links']}`}>
            <p
              style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
              className={`${styles['font-archivo-bold']} pl-3`}
            >
              {props.stateChange.tokenName
                ? add3Dots(props.stateChange.tokenName, 18)
                : props.stateChange.tokenID
                ? props.stateChange.tokenID
                : 'Unknown'}
            </p>
          </a>
        ) : (
          <p
            style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
            className={`${styles['font-archivo-bold']} pl-3`}
          >
            {props.stateChange.tokenName
              ? add3Dots(props.stateChange.tokenName, 18)
              : props.stateChange.tokenID
              ? props.stateChange.tokenID
              : 'Unknown'}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p
            style={{ color: 'darkgray', fontSize: '16px', marginBottom: 0 }}
            className={`${styles['font-archivo-bold']} pl-3`}
          >
            {props.stateChange.name ? add3Dots(props.stateChange.name, 18) : 'Unknown'}
          </p>
          {props.stateChange.openSeaVerified && (
            <Tooltip
              hasArrow
              label="Verified on OpenSea"
              bg="#212121"
              color="white"
              placement="right"
              className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
              style={{ borderRadius: '2em' }}
            >
              <img src="/images/popup/OpenseaVerified.svg" height={20} className="pl-2" />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
