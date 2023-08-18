import React, { useEffect, useState } from 'react';
import styles from '../../simulation.module.css';
import { AddressType, SimulationAddressDetails } from '../../../../models/simulation/Transaction';
import { Tooltip, useClipboard } from '@chakra-ui/react';
import { AiFillCopy, AiOutlineCheck } from 'react-icons/ai';
import { add3Dots } from '../StateChangesComponent';

interface ChainDetailProps {
  addressDetails: SimulationAddressDetails | undefined;
}

export function ContractDetail(props: ChainDetailProps) {
  const [addressName, setAddressName] = useState('');
  const { addressDetails } = props;
  const { onCopy, setValue, hasCopied } = useClipboard('');

  useEffect(() => {
    if (addressDetails?.address) {
      setValue(addressDetails.address);
    }

    if (addressDetails?.addressName) {
      if (addressDetails.addressName.includes(':')) {
        const tempName = addressDetails.addressName.split(':').at(0);
        setAddressName(tempName || '');
        return;
      }

      setAddressName(addressDetails.addressName);
    }
  }, []);

  const add3DotsMiddle = (string: string, limit: number) => {
    var dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots + string.substring(string.length - 4, string.length);
    }

    return string;
  };

  if (!addressDetails) {
    return <></>;
  }

  return (
    <div className={styles.row}>
      <Tooltip
        hasArrow
        label="Copy address"
        bg="#212121"
        placement="top"
        color="white"
        borderRadius={'5px'}
        className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
      >
        <div className={styles.row}>
          <p onClick={onCopy} style={{ marginRight: '10px', cursor: 'pointer' }} className={styles['text-md']}>
            {add3Dots(addressName, 10) || add3DotsMiddle(addressDetails?.address || 'n/a', 6)}
          </p>
          {hasCopied ? (
            <AiOutlineCheck color="#19FF00" fontSize={'16px'} style={{ marginRight: '8px' }} />
          ) : (
            <AiFillCopy
              className={styles.zoom}
              fontSize={'16px'}
              onClick={onCopy}
              color="#676767"
              style={{ cursor: 'pointer', marginRight: '6px' }}
            />
          )}
        </div>
      </Tooltip>
      {addressDetails.etherscanLink && (
        <Tooltip
          hasArrow
          label={addressDetails.addressType === AddressType.Contract ? addressDetails.etherscanVerified ? 'Verified contract' : 'Unverified contract' : 'View on Etherscan'}
          bg="#212121"
          placement="left"
          color="white"
          borderRadius={'5px'}
          className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
        >
          <a href={addressDetails.etherscanLink} className={styles.zoom} target="_blank">
            {addressDetails.etherscanVerified ? (
              <img src="/images/popup/websiteDetail/EtherscanVerified.svg" height={20} />
            ) : (
              <img src="/images/popup/websiteDetail/EtherscanUnverified.svg" height={20} />
            )}
          </a>
        </Tooltip>
      )}

    </div>
  );
}
