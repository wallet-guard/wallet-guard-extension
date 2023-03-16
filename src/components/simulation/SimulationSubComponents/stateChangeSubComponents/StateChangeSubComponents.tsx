import React from 'react';
import { SimulationStateChange } from '../../../../models/simulation/Transaction';
import styles from '../../simulation.module.css';

function roundNumberIfNeccessary(num: string): string {
  let result = Number(num).toFixed(4);

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
    <div style={{ display: 'flex' }}>
      <h3
        style={{ color: '#17FE00', fontSize: '16px', marginTop: '4px', paddingBottom: '6px' }}
        className={`${styles['font-archivo-bold']}`}
      >
        <b>
          Revoking permission <br /> to withdraw ALL
        </b>
      </h3>
    </div>
  );
};

export const SetTokenApproval = ({ stateChange }: { stateChange: SimulationStateChange }) => {
  return (
    <div style={{ display: 'flex' }}>
      <h3
        style={{ color: '#fb4b4b', fontSize: '16px', marginTop: '4px', paddingBottom: '6px' }}
        className={`${styles['font-archivo-bold']}`}
      >
        <b>
          Permission to <br /> withdraw {stateChange.symbol}
        </b>
      </h3>
    </div>
  );
};

export const SetApprovalForAll = () => {
  return (
    <div style={{ display: 'flex' }}>
      <img
        src="/images/popup/orange-danger.png"
        alt=""
        width={33}
        style={{ alignSelf: 'center', paddingRight: '10px', marginBottom: '10px' }}
      />
      <h3
        style={{ color: '#fb4b4b', fontSize: '16px', marginTop: '4px', paddingBottom: '6px' }}
        className={`${styles['font-archivo-bold']}`}
      >
        <b>
          Permission to <br /> withdraw ALL
        </b>
      </h3>
    </div>
  );
};

export const SetApproval = () => {
  return (
    <div style={{ display: 'flex' }}>
      <img
        src="/images/popup/orange-danger.png"
        alt=""
        width={33}
        style={{ alignSelf: 'center', paddingRight: '10px', marginBottom: '10px' }}
      />
      <h3
        style={{ color: '#fb4b4b', fontSize: '16px', marginTop: '4px', paddingBottom: '6px', float: 'right' }}
        className={`${styles['font-archivo-bold']}`}
      >
        <b>
          Permission to <br /> withdraw NFT
        </b>
      </h3>
    </div>
  );
};

export const ReceiveNFT = ({ stateChange }: { stateChange: SimulationStateChange }) => {
  return (
    <div>
      <h3 style={{ color: '#17FE00', fontSize: '18px' }} className={`${styles['font-archivo-bold']}`}>
        <b>+1 NFT</b>
      </h3>
      <p style={{ color: '#17FE00', float: 'right' }} className={`${styles['font-archivo-medium']}`}>
        <b>${Number(stateChange.fiatValue).toFixed(2)}</b>
      </p>
    </div>
  );
};

export const TransferNFT = ({ stateChange }: { stateChange: SimulationStateChange }) => {
  return (
    <div>
      <h3 style={{ color: '#fb4b4b', fontSize: '18px' }} className={`${styles['font-archivo-bold']}`}>
        <b>-1 NFT</b>
      </h3>
      <p style={{ color: '#fb4b4b', float: 'right' }} className={`${styles['font-archivo-medium']}`}>
        <b>${Number(stateChange.fiatValue).toFixed(2)}</b>
      </p>
    </div>
  );
};

export const TransferToken = ({ stateChange }: { stateChange: SimulationStateChange }) => {
  return (
    <div>
      <h3 style={{ color: '#fb4b4b', fontSize: '18px' }} className={`${styles['font-archivo-bold']}`}>
        <b>
          {roundNumberIfNeccessary(stateChange.amount)} {stateChange.symbol}
        </b>
      </h3>
      <p style={{ color: '#fb4b4b', float: 'right' }} className={`${styles['font-archivo-medium']}`}>
        <b>${Number(stateChange.fiatValue).toFixed(2)}</b>
      </p>
    </div>
  );
};

export const ReceiveToken = ({ stateChange }: { stateChange: SimulationStateChange }) => {
  return (
    <div>
      <h3 style={{ color: '#17FE00', fontSize: '18px' }} className={`${styles['font-archivo-bold']}`}>
        <b>
          {roundNumberIfNeccessary(stateChange.amount)} {stateChange.symbol}
        </b>
      </h3>
      <p style={{ color: '#17FE00', float: 'right' }} className={`${styles['font-archivo-medium']}`}>
        <b>${Number(stateChange.fiatValue).toFixed(2)}</b>
      </p>
    </div>
  );
};
