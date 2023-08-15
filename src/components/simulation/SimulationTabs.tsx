import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './simulation.module.css';

interface SimulationTabsProps {
  setShowChatWeb3: Dispatch<SetStateAction<boolean>>;
}

type Tab = 'Transaction' | 'ChatWeb3';

export function SimulationTabs(props: SimulationTabsProps) {
  const { setShowChatWeb3 } = props;
  const [currentTab, setCurrentTab] = useState<Tab>('Transaction');

  function handleTabSwitch(activeTab: Tab) {
    setCurrentTab(activeTab);

    setShowChatWeb3(activeTab === 'ChatWeb3');
  }

  return (
    <div className="container text-center">
      <div className={styles.row}>
        <div
          onClick={() => handleTabSwitch('Transaction')}
          className={currentTab === 'Transaction' ? styles.simulationTabActive : styles.simulationTab}
        >
          <p style={{ marginBottom: '10px' }}>Transaction</p>
        </div>

        <div
          onClick={() => handleTabSwitch('ChatWeb3')}
          className={currentTab === 'ChatWeb3' ? styles.simulationTabActive : styles.simulationTab}
        >
          <p style={{ marginBottom: '10px' }}>Ask ChatWeb3</p>
        </div>
      </div>
    </div>
  );
}
