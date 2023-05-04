import React from 'react';

export const NoSimulationPopup = () => {
  return (
    <>
      <div className="row text-center">
        <div className="col-12">
          <img src="/images/wg_logos/Logo-Large-Transparent.png" alt="" width={150} />
        </div>
      </div>
      <div className="row pt-5 text-center pl-4 pr-4">
        <div className="col-12">
          <h5 style={{ color: 'white' }}>Start a transaction on Ethereum Mainnet to create a simulation</h5>
        </div>
      </div>
    </>
  );
};
