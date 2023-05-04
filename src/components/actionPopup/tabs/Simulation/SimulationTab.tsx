import React from 'react';
import { NoSimulationPopup } from './NoSimulationPopup';
import styles from '../../ActionPopup.module.css';

export const SimulationTab = () => {
  return (
    <div className={styles.popupContent}>
      <NoSimulationPopup />
    </div>
  );
};
