import React, { useContext, useEffect } from 'react';
import styles from '../../simulation.module.css';
import { SimulationAddressDetails } from '../../../../models/simulation/Transaction';
import { useClipboard } from '@chakra-ui/react';
import { AiFillCopy, AiOutlineCheck } from 'react-icons/ai';

interface ChainDetailProps {
  addressDetails: SimulationAddressDetails | undefined;
}

export function ContractDetail(props: ChainDetailProps) {
  const { addressDetails } = props;
  const { onCopy, setValue, hasCopied } = useClipboard('');

  useEffect(() => {
    if (addressDetails?.address) {
      setValue(addressDetails.address);
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
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <p onClick={onCopy} style={{ marginRight: '6px', cursor: 'pointer' }} className={styles['text-md']}>
        {addressDetails.addressName || add3DotsMiddle(addressDetails.address, 6)}
      </p>
      {hasCopied ? (
        <AiOutlineCheck color="#19FF00" fontSize={'16px'} style={{ marginRight: '6px' }} />
      ) : (
        <AiFillCopy
          fontSize={'16px'}
          onClick={onCopy}
          color="#676767"
          style={{ cursor: 'pointer', marginRight: '6px' }}
        />
      )}
      <a href={addressDetails.etherscanLink} className={styles.zoom} target="_blank">
        {addressDetails.etherscanVerified ? (
          <img src="/images/popup/EtherscanVerified.png" width={18} />
        ) : (
          <img src="/images/popup/EtherscanUnverified.png" width={18} />
        )}
      </a>
    </div>
  );
}
