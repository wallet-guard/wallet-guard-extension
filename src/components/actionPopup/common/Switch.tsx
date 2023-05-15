import React from 'react';
import styles from './Switch.module.css';

export function Switch() {
  return (
    <>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span className={styles.slider + ' ' + styles.sliderRound}></span>
      </label>
    </>
  );
}
