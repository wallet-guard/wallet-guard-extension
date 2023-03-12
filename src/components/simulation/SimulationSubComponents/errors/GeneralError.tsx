import React from 'react';
import styles from '../../simulation.module.css';

export default function GeneralErrorComponent() {
  return (
    <div className="row pt-5 text-center pl-4 pr-4">
      <div className="col-12">
        <h4 className={`${styles['font-archivo-medium']}`} style={{ color: 'white', marginBottom: '20px' }}>
          Something went wrong
        </h4>
      </div>
    </div>
  );
}
