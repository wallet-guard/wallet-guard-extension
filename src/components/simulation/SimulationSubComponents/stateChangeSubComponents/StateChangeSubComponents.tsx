import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import { SimulationStateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';

function roundNumberIfNeccessary(num: string): string {
  let result = Number(num).toFixed(4);

  // Remove any trailing 0s
  while (result.charAt(result.length - 1) === '0') {
    result = result.substring(0, result.length - 1);
  }

  // If it is a whole number, remove the .
  if (result.charAt(result.length - 1) === '.') {
    result = result.substring(0, result.length - 1);
  }

  return result;
}

export const RevokeApprovalForAll = () => {
  return (
    <>
      <h3 style={{ color: '#17FE00', fontSize: '16px' }} className={`${styles['font-archivo-bold']}`}>
        <b>
          Revoking permission <br /> to withdraw ALL
        </b>
      </h3>
    </>
  );
};

export const SetTokenApproval = ({ stateChange }: { stateChange: SimulationStateChange }) => {
  return (
    <>
      <h3 style={{ color: '#fb4b4b', fontSize: '16px' }} className={`${styles['font-archivo-bold']}`}>
        <b>
          Permission to <br /> withdraw {stateChange.symbol}
        </b>
      </h3>
    </>
  );
};

interface SetApprovalForAllProps {
  verified?: boolean;
}

export const SetApprovalForAll = (props: SetApprovalForAllProps) => {
  return (
    <>
      {!props.verified && (
        <img
          src="/images/popup/orange-danger.png"
          alt=""
          width={33}
          style={{ alignSelf: 'center', paddingRight: '10px', marginBottom: '10px' }}
        />
      )}

      <h3
        style={{ color: props.verified ? 'white' : '#fb4b4b', fontSize: '16px' }}
        className={`${styles['font-archivo-bold']}`}
      >
        <b>
          Permission to <br /> withdraw ALL
        </b>
      </h3>
    </>
  );
};

export const SetApproval = () => {
  return (
    <>
      <img
        src="/images/popup/orange-danger.png"
        alt=""
        width={33}
        style={{ alignSelf: 'center', paddingRight: '10px', marginBottom: '10px' }}
      />
      <h3 style={{ color: '#fb4b4b', fontSize: '16px' }} className={`${styles['font-archivo-bold']}`}>
        <b>
          Permission to <br /> withdraw NFT
        </b>
      </h3>
    </>
  );
};

interface TransferAssetProps {
  type: 'send' | 'receive';
  stateChange: SimulationStateChange;
}

export const TransferNFT = (props: TransferAssetProps) => {
  return (
    <>
      <h3
        style={{ color: props.type === 'send' ? '#fb4b4b' : '#17FE00', fontSize: '18px', marginBottom: 0 }}
        className={`${styles['font-archivo-bold']}`}
      >
        <b>{props.type === 'send' ? '-1 NFT' : '+1 NFT'}</b>
      </h3>
      {props.stateChange.fiatValue !== '' && (
        <Tooltip
          hasArrow
          label="OpenSea floor price"
          placement="left"
          bg="#212121"
          color="white"
          className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
          style={{ borderRadius: '2em' }}
        >
          <p
            style={{ color: props.type === 'send' ? '#fb4b4b' : '#17FE00', marginBottom: 0 }}
            className={`${styles['font-archivo-medium']}`}
          >
            <b>${Number(props.stateChange.fiatValue).toFixed(2)}</b>
          </p>
        </Tooltip>
      )}
    </>
  );
};

export const TransferToken = (props: TransferAssetProps) => {
  return (
    <>
      <h3
        style={{ color: props.type === 'send' ? '#fb4b4b' : '#17FE00', fontSize: '18px', marginBottom: 0 }}
        className={`${styles['font-archivo-bold']}`}
      >
        <b>
          {roundNumberIfNeccessary(props.stateChange.amount)} {props.stateChange.symbol}
        </b>
      </h3>
      {props.stateChange.fiatValue !== '' && (
        <p
          style={{ color: props.type === 'send' ? '#fb4b4b' : '#17FE00', marginBottom: 0 }}
          className={`${styles['font-archivo-medium']}`}
        >
          <b>${Number(props.stateChange.fiatValue).toFixed(2)}</b>
        </p>
      )}
    </>
  );
};
