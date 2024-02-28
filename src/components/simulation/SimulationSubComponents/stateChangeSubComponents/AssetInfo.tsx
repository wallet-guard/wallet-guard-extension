import React from 'react';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';
import { AssetChangeImage } from './AssetChangeImage';
import { SimulationAssetTypes, StateChange } from '../../../../models/simulation/Transaction';
import { Tooltip } from '@chakra-ui/react';

interface StateChangesComponentProps {
  stateChange: StateChange;
}

export const AssetInfo = (props: StateChangesComponentProps) => {
  const isNftChangeType = props.stateChange.assetType !== SimulationAssetTypes.Native && props.stateChange.assetType !== SimulationAssetTypes.ERC20;
  const shouldShowSubtitle = props.stateChange.locked || !isNftChangeType || (!!props.stateChange.tokenName || !!props.stateChange.tokenID);
  const title = !isNftChangeType ?
    // Native and ERC20 mappings
    add3Dots((props.stateChange.symbol || props.stateChange.name || 'Unknown'), 15) :
    // ERC721 and ERC1155 mappings
    shouldShowSubtitle ?
      (props.stateChange.tokenName ? add3Dots(props.stateChange.tokenName, 15) : props.stateChange.tokenID) :
      (props.stateChange.name ? add3Dots(props.stateChange.name, 15) : 'Unknown');
  const titleLink = isNftChangeType ? (props.stateChange.openSeaLink || 'https://opensea.io') : (props.stateChange.coinmarketcapLink || 'https://coinmarketcap.com')
  const subtitle = props.stateChange.name ? add3Dots(props.stateChange.name, 18) : "Unknown";

  return (
    <div className={styles.assetChangeLeftColumn} style={{ filter: props.stateChange.locked ? 'grayscale(60%)' : '' }}>
      <AssetChangeImage imageURL={props.stateChange.logo || props.stateChange.tokenURI} />
      <div className='flex column align-center pl-3'>
        <AssetTitle
          title={title}
          locked={props.stateChange.locked}
          link={titleLink}
        />
        {shouldShowSubtitle && (
          <AssetSubtitle
            locked={props.stateChange.locked}
            openSeaVerified={props.stateChange.openSeaVerified}
            subtitle={subtitle}
          />
        )}
      </div>
    </div>
  );
};

interface AssetTitleProps {
  title: string;
  locked: boolean;
  link: string;
}

function AssetTitle(props: AssetTitleProps) {
  const { title, locked, link } = props;

  return (
    <div className={styles['row']}>
      <a href={link}
        target="_blank"
        className={`${styles['links']}`}>
        <h3
          style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
          className={`${styles['font-archivo-bold']}`}
        >
          {title}
        </h3>
      </a>
      {locked &&
        <img src='/images/popup/assetLock.svg' className='pl-1' />
      }
    </div>
  );
}

interface AssetSubtitleProps {
  locked: boolean;
  openSeaVerified: boolean;
  subtitle: string;
}

function AssetSubtitle(props: AssetSubtitleProps) {
  const { locked, openSeaVerified, subtitle } = props;

  if (locked) {
    return (
      <p style={{ marginBottom: 0, color: '#646464' }} className={`${styles['font-archivo-medium']}`}>Locked</p>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p
        style={{ color: 'darkgray', fontSize: '16px', marginBottom: 0 }}
        className={`${styles['font-archivo-bold']}`}
      >
        {subtitle}
      </p>
      {openSeaVerified && (
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
  );
}
