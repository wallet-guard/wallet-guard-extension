import { Tooltip, useClipboard } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { StoredSimulation } from '../../lib/simulation/storage';
import { PhishingResult } from '../../models/PhishingResponse';
import { SimulationMethodType } from '../../models/simulation/Transaction';
import styles from './simulation.module.css';

export const ContractDetails = ({ storedSimulation }: { storedSimulation: StoredSimulation }) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  useEffect(() => {
    if (storedSimulation.simulation?.addressDetails.address) {
      setValue(storedSimulation.simulation?.addressDetails.address);
    }
  }, []);

  const add3DotsMiddle = (string: string, limit: number) => {
    var dots = '...';
    if (string.length > limit) {
      string = string.substring(0, limit) + dots + string.substring(string.length - 4, string.length);
    }

    return string;
  };

  return (
    <div className="card-body">
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <h5
              className={`${styles['font-archivo-medium']} card-title`}
              style={{ color: '#ffffff', fontSize: '21px', marginTop: '-15px' }}
            >
              {storedSimulation.simulation?.method === SimulationMethodType.EthSendTransaction
                ? 'Transaction details'
                : 'Signature details'}
            </h5>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="container">
            <div className="row pt-1">
              <div className="col-12">
                <p className={`${styles['font-archivo-medium']}`} style={{ color: '#a8a8a8' }}>
                  Website
                </p>
              </div>
              <div className="col-12" style={{ display: 'flex', flexDirection: 'row', marginTop: '-15px' }}>
                <p className={`${styles['font-archivo-medium']}`} style={{ color: 'white' }}>
                  <b>
                    {storedSimulation.simulation?.scanResult.domainName
                      ? storedSimulation.simulation?.scanResult.domainName
                      : '-'}
                  </b>
                </p>
                {storedSimulation.simulation?.scanResult.domainName &&
                storedSimulation.simulation?.scanResult.verified ? (
                  <Tooltip
                    hasArrow
                    label="Verified by Wallet Guard"
                    bg="#212121"
                    color="white"
                    placement="right"
                    className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
                    style={{ borderRadius: '2em' }}
                  >
                    <img
                      src="/images/popup/green-verified.png"
                      alt=""
                      width={25}
                      className="pl-2 "
                      style={{ marginTop: '-14px', alignSelf: 'center' }}
                    />
                  </Tooltip>
                ) : storedSimulation.simulation?.scanResult.domainName &&
                  storedSimulation.simulation?.scanResult.phishing === PhishingResult.Phishing ? (
                  <Tooltip
                    hasArrow
                    label={'Low Trust Website'}
                    bg="#212121"
                    color="white"
                    placement="right"
                    className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
                    style={{ borderRadius: '2em' }}
                  >
                    <img
                      src="/images/popup/orange-danger.png"
                      alt=""
                      width={25}
                      className="pl-2 "
                      style={{ marginTop: '-15px', alignSelf: 'center' }}
                    />
                  </Tooltip>
                ) : (
                  storedSimulation.simulation?.scanResult.domainName && (
                    <Tooltip
                      hasArrow
                      label="This is an unknown website"
                      bg="#212121"
                      color="white"
                      placement="right"
                      className={`${styles['font-archivo-medium']} pl-2 pr-2 pt-1 pb-1`}
                      style={{ borderRadius: '2em' }}
                    >
                      <img
                        src="/images/popup/unknown.png"
                        alt=""
                        width={25}
                        className="pl-2 "
                        style={{ marginTop: '-14px', alignSelf: 'center' }}
                      />
                    </Tooltip>
                  )
                )}
              </div>
            </div>
          </div>

          {storedSimulation.simulation?.addressDetails.address && (
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <p className={`${styles['font-archivo-medium']}`} style={{ color: '#a8a8a8' }}>
                    {storedSimulation.simulation?.addressDetails.addressType === 'CONTRACT' ? 'Contract' : 'address'}
                  </p>
                </div>
                <div className="col-12" style={{ display: 'flex', flexDirection: 'row', marginTop: '-8px' }}>
                  <button
                    onClick={onCopy}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      marginLeft: '-6px',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className={`${styles.copy}`}
                      style={{
                        border: '2px solid #3E3E3E',
                        borderRadius: '.5em',
                        borderBottom: '-60px',
                      }}
                    >
                      <div
                        style={{
                          paddingLeft: '9px',
                          paddingRight: '8px',
                          marginBottom: '-10px',
                          marginTop: '2px',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <p
                          className={`${styles['font-archivo-medium']}`}
                          style={{
                            color: 'white',
                          }}
                        >
                          <b>{add3DotsMiddle(storedSimulation.simulation?.addressDetails.address, 8)}</b>
                        </p>
                        {hasCopied ? (
                          <img
                            src="/images/popup/green-check.png"
                            alt=""
                            width={24}
                            style={{ alignSelf: 'center', paddingLeft: '10px', marginTop: '-15px' }}
                          />
                        ) : (
                          <img
                            src="/images/popup/copy.png"
                            alt=""
                            width={24}
                            style={{ alignSelf: 'center', paddingLeft: '10px', marginTop: '-14px' }}
                          />
                        )}
                      </div>
                    </div>
                  </button>

                  {storedSimulation.simulation?.addressDetails.etherscanVerified && (
                    <Tooltip
                      hasArrow
                      label="Verified on Etherscan"
                      bg="#212121"
                      color="white"
                      placement="right"
                      className="pl-2 pr-2 pb-1"
                      style={{ borderRadius: '2em' }}
                    >
                      <img
                        src="/images/popup/twitter-verified-badge.svg"
                        alt=""
                        width={22}
                        className={`pl-1`}
                        style={{ marginRight: '3px', marginLeft: '3px' }}
                      />
                    </Tooltip>
                  )}

                  {storedSimulation.simulation?.addressDetails.etherscanLink && (
                    <a href={storedSimulation.simulation?.addressDetails.etherscanLink} target="_blank">
                      <img
                        src="/images/popup/etherscan-logo-circle.svg"
                        alt=""
                        width={21}
                        className={`${styles.zoom} pl-1`}
                        style={{ marginTop: '9px' }}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
