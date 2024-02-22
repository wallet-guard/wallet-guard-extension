import React from 'react';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';
import { AssetChangeImage } from './AssetChangeImage';
import { SimulationAssetTypes, StateChange } from '../../../../models/simulation/Transaction';
import { Tooltip } from '@chakra-ui/react';
import { IsApprovalChangeType } from '../../../../models/simulation/ChangeTypeHelper';

interface StateChangesComponentProps {
  stateChange: StateChange;
}

export const AssetInfo = (props: StateChangesComponentProps) => {
  const isNftChangeType = props.stateChange.assetType !== SimulationAssetTypes.Native &&
    props.stateChange.assetType !== SimulationAssetTypes.ERC20;

  return (
    <div className={styles.assetChangeLeftColumn} style={{ filter: props.stateChange.locked ? 'grayscale(60%)' : '' }}>
      <AssetChangeImage imageURL={props.stateChange.logo || props.stateChange.tokenURI} />
      <div className='flex column align-center pl-3'>
        <div className={styles['row']}>
          <a href={isNftChangeType ? (props.stateChange.openSeaLink || 'https://opensea.io') : (props.stateChange.coinmarketcapLink || 'https://coinmarketcap.com')}
            target="_blank"
            className={`${styles['links']}`}>
            <h3
              style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
              className={`${styles['font-archivo-bold']}`}
            >
              {isNftChangeType && IsApprovalChangeType(props.stateChange.changeType) ? (
                props.stateChange.name ? add3Dots(props.stateChange.name, 13) : 'Unknown'
              ) : isNftChangeType ?
                props.stateChange.tokenName
                  ? add3Dots(props.stateChange.tokenName, 13)
                  : props.stateChange.tokenID
                    ? props.stateChange.tokenID
                    : 'Unknown'
                : (
                  // Native and ERC20
                  props.stateChange.symbol ?
                    add3Dots(props.stateChange.symbol, 13)
                    : 'Unknown'
                )}
            </h3>
          </a>
          {props.stateChange.locked &&
            <img src='/images/popup/assetLock.svg' className='pl-1' />
          }
        </div>

        {props.stateChange.locked ?
          (
            <p style={{ marginBottom: 0, color: '#646464' }} className={`${styles['font-archivo-medium']}`}>Locked</p>
          )
          : isNftChangeType && !IsApprovalChangeType(props.stateChange.changeType) ?
            (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p
                  style={{ color: 'darkgray', fontSize: '16px', marginBottom: 0 }}
                  className={`${styles['font-archivo-bold']}`}
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
                    borderRadius={'5px'}
                  >
                    <img src="/images/popup/websiteDetail/OpenseaVerified.svg" height={20} className="pl-2" />
                  </Tooltip>
                )}
              </div>
            ) :
            <></>}
      </div>
    </div>
  );
};
