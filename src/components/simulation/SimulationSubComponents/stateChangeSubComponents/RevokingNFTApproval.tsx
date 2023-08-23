import React from 'react';
import { StateChangesComponentProps } from './NFTInfo';
import { Tooltip } from '@chakra-ui/react';
import styles from '../../simulation.module.css';
import { add3Dots } from '../StateChangesComponent';

export function RevokingNFTApproval(props: StateChangesComponentProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {props.stateChange.openSeaLink ?
        <a href={props.stateChange.openSeaLink} target="_blank" className={`${styles['links']}`}>
          <RevokingHeader name={props.stateChange.name} />
        </a>
        : <RevokingHeader name={props.stateChange.name} />
      }
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

function RevokingHeader({ name }: { name: string }) {
  return (
    <p
      style={{ color: 'white', fontSize: '18px', marginBottom: 0 }}
      className={`${styles['font-archivo-bold']} pl-3`}
    >
      {name ? add3Dots(name, 13) : 'Unknown'}
    </p>
  )
}