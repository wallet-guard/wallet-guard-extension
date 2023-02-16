import React from 'react';

export interface WelcomeCardsProps {
  title: string;
  subTitle: string;
  image: string;
}

export const WelcomeCards = (props: WelcomeCardsProps) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={`/images/dashboard/onboarding/${props.image}.png`} alt={props.title} style={{ height: '100px' }} />
      </div>
      <div className="row text-center pt-4">
        <div className="col-12">
          <p style={{ fontSize: '22px' }}>
            <b>{props.title}</b>
          </p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12">
          <p style={{ fontSize: '18px' }}>{props.subTitle}</p>
        </div>
      </div>
    </div>
  );
};
