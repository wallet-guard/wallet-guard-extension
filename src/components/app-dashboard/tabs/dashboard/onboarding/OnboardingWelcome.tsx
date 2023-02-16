import tutorialStyles from '../DashboardTab.module.css';
import React from 'react';
import { WelcomeCards } from './onboardingSubComponents/WelcomeCards';

interface TutorialProps {
  step: number;
}

export function OnboardingWelcome(props: TutorialProps) {
  function getAnimation() {
    switch (props.step) {
      case 1:
      case 2:
        return `${tutorialStyles.moveOut}`;
      default:
        return '';
    }
  }

  return (
    <div className={`${tutorialStyles.slideEffect} ${getAnimation()}`}>
      <div className={tutorialStyles.tutorialContainer}>
        <div className="row">
          <div className="col-12">
            <h1 className={tutorialStyles.slideUpPrimary}>
              <span>
                <b>gm</b>{' '}
              </span>
              <span className={tutorialStyles.wave}>
                {' '}
                <img src="/images/dashboard/onboarding/handwave.png" width={'50px'} />
              </span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className={tutorialStyles.slideUpSecondary}>
              The future of <span style={{ color: '#19FF00' }}>web3 security</span> is here
            </p>
          </div>
        </div>
        <div className="row justify-content-between pt-5" style={{ alignItems: 'baseline', width: '70%' }}>
          <div className={`${tutorialStyles.slideUpThird} col-4`}>
            <WelcomeCards title="Proactive" subTitle="phishing detection" image="Browser" />
          </div>
          <div className={`${tutorialStyles.slideUpForth} col-4`}>
            <WelcomeCards title="Secure" subTitle="transaction simulations" image="TransactionScreen" />
          </div>
          <div className={`${tutorialStyles.slideUpFifth} col-4`}>
            <WelcomeCards title="Personalized" subTitle="security dashboard" image="Dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
}
