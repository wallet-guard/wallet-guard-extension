import { Tooltip } from '@chakra-ui/react';
import React from 'react';
import { StateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';
import { AssetChangeImage } from './AssetChangeImage';

export interface StateChangesComponentProps {
  stateChange: StateChange;
}

export const NFTInfo = (props: StateChangesComponentProps) => {
  return (
    <div className={styles.assetChangeLeftColumn}>
      <AssetChangeImage imageURL={props.stateChange.tokenURI || props.stateChange.logo} />
      <NFTInfoAssetChange stateChange={props.stateChange} />
    </div>
  );
};

function NFTInfoAssetChange(props: StateChangesComponentProps) {
  const shouldShowSubtitle = props.stateChange.tokenName || props.stateChange.tokenID;

  function NFTInfoHeader() {
    return (
      <>
        <p
          style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
          className={`${styles['font-archivo-bold']} pl-3`}
        >
          {/* display the name of the collection if that is all we have, otherwise show the 
        additional details from tokenName and tokenID */}
          {shouldShowSubtitle ?
            (props.stateChange.tokenName
              ? add3Dots(props.stateChange.tokenName, 13)
              : props.stateChange.tokenID
            ) : (
              props.stateChange.name ? add3Dots(props.stateChange.name, 13) : 'Unknown'
            )}
        </p>
        {(!shouldShowSubtitle && props.stateChange.openSeaVerified) && (
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
      </>
    )
  }

  function NFTInfoSubHeader() {
    return (
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
            borderRadius={'5px'}
          >
            <img src="/images/popup/websiteDetail/OpenseaVerified.svg" height={20} className="pl-2" />
          </Tooltip>
        )}
      </div>
    )
  }

  return (
    <>
      {props.stateChange.openSeaLink ?
        <a href={props.stateChange.openSeaLink} target="_blank" className={`${styles['links']}`}>
          <NFTInfoHeader />
        </a>
        :
        <NFTInfoHeader />
      }

      {shouldShowSubtitle && (
        <NFTInfoSubHeader />
      )}
    </>
  )
}