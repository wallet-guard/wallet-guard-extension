import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import { StateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';

function roundNumberIfNeccessary(num: string): string {
  if (!num) return '1';
  if (num.includes('ALL')) return num; // we include ALL on some transactions. this is a bit hacky but it works for now

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


interface ApprovalProps {
  verified: boolean;
  symbol: string;
  amount: string;
  locked?: boolean;
  fiatValue: string;
  isNFT: boolean;
}

export const ApprovalChange = (props: ApprovalProps) => {
  const { verified, symbol, amount, fiatValue, isNFT, locked } = props;
  const roundedAmount = roundNumberIfNeccessary(amount);

  return (
    <>
      <h3
        style={{
          color: locked ? '#646464' : (verified ? 'white' : '#fb4b4b'),
          fontSize: '18px',
          marginBottom: 0
        }}
        className={`${styles['font-archivo-bold']}`}
      >
        {roundedAmount} {symbol || (isNFT ? 'NFT' : 'tokens')}
      </h3>

      {roundedAmount !== 'ALL' && (
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
          <p style={{ color: locked ? '#646464' : (verified ? '#646464' : '#fb4b4b'), marginBottom: 0, fontSize: '16px' }} className={`${styles['font-archivo-medium']}`}>
            ${Number(fiatValue).toFixed(2)}
          </p>
        </Tooltip>
      )}
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
        title={props.type === 'send' ? `-${props.stateChange.amount || 1} NFT` : `+${props.stateChange.amount || 1} NFT`}
        type={props.type}
        locked={props.stateChange.locked}
      />

      <TransferValueSubHeading
        type={props.type}
        fiatValue={props.stateChange.fiatValue}
        isNFT
        locked={props.stateChange.locked} />
    </>
  );
};

export const TransferToken = (props: TransferAssetProps) => {
  return (
    <>
      <TransferValueHeading
        title={`${roundNumberIfNeccessary(props.stateChange.amount)} ${props.stateChange.symbol}`}
        type={props.type}
        locked={props.stateChange.locked}
      />
      <TransferValueSubHeading
        type={props.type}
        fiatValue={props.stateChange.fiatValue}
        locked={props.stateChange.locked}
      />
    </>
  );
};

function TransferValueHeading({ title, type, locked }: { title: string; type: TransferType, locked?: boolean }) {
  return (
    <h3
      style={{
        color: locked ? '#646464' : (type === 'send' ? '#fb4b4b' : '#17FE00'), fontSize: '18px', marginBottom: 0
      }}
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
  locked
}: {
  fiatValue: string;
  type: TransferType;
  isNFT?: boolean;
  locked?: boolean;
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
          style={{ color: locked ? '#646464' : type === 'send' ? '#fb4b4b' : '#17FE00', marginBottom: 0, fontSize: '16px' }}
          className={`${styles['font-archivo-medium']}`}
        >
          ${Number(fiatValue).toFixed(2)}
        </p>
      </Tooltip >
    </>
  );
}
