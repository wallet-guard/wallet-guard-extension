import React from 'react';
import styles from '../../simulation.module.css';

export interface RiskFactorComponents {
  warnings: any;
}

export const RiskFactors = (props: RiskFactorComponents) => {
  return (
    <>
      {props.warnings &&
        props.warnings.map((warning: any) => {
          return (
            <div key={warning}>
              <div className="pt-3 pb-3">
                <div className="row ">
                  <img
                    src="/images/popup/orange-danger.png"
                    alt=""
                    width={45}
                    className="pl-3 "
                    style={{ marginTop: '-14px', alignSelf: 'center' }}
                  />

                  {warning && (
                    <div>
                      <div className="">
                        <h5
                          style={{
                            color: 'white',
                            fontSize: '18px',
                            float: 'left',
                            marginLeft: '18px',
                            marginTop: '-4px',
                          }}
                          className={`${styles['font-archivo-bold']}`}
                        >
                          This website was recently created{' '}
                        </h5>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
