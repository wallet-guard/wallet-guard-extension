import React, { useEffect, useState } from 'react';

export interface OnboardingCardsProps {
  title: string;
  amount: string;
}

export const OnboardingCards = (props: OnboardingCardsProps) => {
  return (
    <div>
      <div
        className="card"
        style={{
          width: '100%',
          backgroundColor: '#2b2b2b',
          borderRadius: '.5em',
          borderColor: '#515151',
          minHeight: '160px',
          minWidth: '220px',
        }}
      >
        <div className="card-body">
          <div className="row text-center">
            <div className="col">
              <h5 style={{ fontSize: '18px' }}>{props.title}</h5>
            </div>
          </div>
          <div className="row text-center pt-4">
            <div className="col">
              <h5 style={{ fontSize: '24px', color: 'white' }}>{props.amount}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
