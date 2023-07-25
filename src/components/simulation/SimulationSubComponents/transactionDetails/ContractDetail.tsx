import React, { useContext } from 'react';
import styles from '../../simulation.module.css';
import { SimulationAddressDetails } from '../../../../models/simulation/Transaction';

interface ChainDetailProps {
  addressDetails: SimulationAddressDetails | undefined;
}

export function ContractDetail(props: ChainDetailProps) {
  const { addressDetails } = props;

  if (!addressDetails) {
    return <></>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <p className={styles['text-md']}>{addressDetails.addressName || addressDetails.address}</p>
    </div>
  );
}
