import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import { StateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';

function roundNumberIfNeccessary(num: string): string {
  if (num.includes('ALL')) return num; // we include ALL on some transactions

  // if the integer part of the number is very large, we can assume it is ALL
  const findDecimal = num.indexOf('.');

  if (num.substring(0, findDecimal).length > 15) {
    return 'ALL';
  }
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
      <h3 style={{ color: 'white', fontSize: '16px', marginBottom: 0 }} className={`${styles['font-archivo-bold']}`}>
        Revoking approval
      </h3>
    </>
  );
};

export const SetTokenApproval = ({ stateChange, verified }: { stateChange: StateChange; verified?: boolean }) => {
  return (
    <>
      <h3
        style={{ color: verified ? 'white' : '#fb4b4b', fontSize: '16px', marginBottom: 0 }}
        className={`${styles['font-archivo-bold']}`}
      >
        Giving approval
      </h3>
      <p style={{ color: '#646464', marginBottom: 0, fontSize: '16px' }} className={`${styles['font-archivo-medium']}`}>
        {roundNumberIfNeccessary(stateChange.amount)} {stateChange.symbol}
      </p>
    </>
  );
};

interface ApprovalProps {
  verified?: boolean;
}

export const SetApprovalForAll = (props: ApprovalProps) => {
  return (
    <>
      {!props.verified && (
        <img
          src="/images/popup/websiteDetail/orange-danger.png"
          alt=""
          width={33}
          style={{ alignSelf: 'center', paddingRight: '10px', marginBottom: '10px' }}
        />
      )}

      <h3
        style={{ color: props.verified ? 'white' : '#fb4b4b', fontSize: '16px', marginBottom: 0 }}
        className={`${styles['font-archivo-bold']}`}
      >
        Approval to <br /> withdraw ALL
      </h3>
    </>
  );
};

export const SetApproval = (props: ApprovalProps) => {
  return (
    <>
      {!props.verified && (
        <img
          src="/images/popup/websiteDetail/orange-danger.png"
          alt=""
          width={33}
          style={{ alignSelf: 'center', paddingRight: '10px', marginBottom: '10px' }}
        />
      )}
      <h3
        style={{ color: props.verified ? 'white' : '#fb4b4b', fontSize: '16px', marginBottom: 0 }}
        className={`${styles['font-archivo-bold']}`}
      >
        Approval to <br /> withdraw NFT
      </h3>
    </>
  );
};

type TransferType = 'send' | 'receive';

interface TransferAssetProps {
  type: TransferType;
  stateChange: StateChange;
}

export const TransferNFT = (props: TransferAssetProps) => {
  return (
    <>
      <TransferValueHeading
        title={props.type === 'send' ? `-${props.stateChange.amount} NFT` : `+${props.stateChange.amount} NFT`}
        type={props.type}
      />

      <TransferValueSubHeading type={props.type} fiatValue={props.stateChange.fiatValue} isNFT />
    </>
  );
};

export const TransferToken = (props: TransferAssetProps) => {
  return (
    <>
      <TransferValueHeading
        title={`${roundNumberIfNeccessary(props.stateChange.amount)} ${props.stateChange.symbol}`}
        type={props.type}
      />
      <TransferValueSubHeading type={props.type} fiatValue={props.stateChange.fiatValue} />
    </>
  );
};

function TransferValueHeading({ title, type }: { title: string; type: TransferType }) {
  return (
    <h3
      style={{ color: type === 'send' ? '#fb4b4b' : '#17FE00', fontSize: '18px', marginBottom: 0 }}
      className={`${styles['font-archivo-bold']}`}
    >
      {title}
    </h3>
  );
}

function TransferValueSubHeading({
  fiatValue,
  type,
  isNFT,
}: {
  fiatValue: string;
  type: TransferType;
  isNFT?: boolean;
}) {
  if (!fiatValue) return <></>;

  return (
    <>
      <Tooltip
        hidden={!isNFT}
        hasArrow
        label="OpenSea floor price"
        placement="left"
        bg="#212121"
        color="white"
        className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
        borderRadius={'5px'}
      >
        <p
          style={{ color: type === 'send' ? '#fb4b4b' : '#17FE00', marginBottom: 0, fontSize: '16px' }}
          className={`${styles['font-archivo-medium']}`}
        >
          ${Number(fiatValue).toFixed(2)}
        </p>
      </Tooltip>
    </>
  );
}
