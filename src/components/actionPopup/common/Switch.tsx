import React, { useState } from 'react';
import styles from './Switch.module.css';

interface SwitchButtonProps {
  settingKey: string;
  active: boolean;
  toggleCB: (key: string, checked: boolean) => void;
}

export function Switch(props: SwitchButtonProps) {
  const { active, toggleCB, settingKey } = props;
  const [isEnabled, setEnabled] = useState(active);

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;

    setEnabled(checked);
    toggleCB(settingKey, checked);
  }

  return (
    <>
      <label className={styles.switch}>
        <input type="checkbox" id={settingKey} onChange={handleToggle} checked={isEnabled} />
        <span className={styles.slider + ' ' + styles.sliderRound}></span>
      </label>
    </>
  );
}
