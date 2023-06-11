import tutorialStyles from '../DashboardTab.module.css';
import React from 'react';
import { List, ListItem, ListIcon, Text } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import { CDN_URL_PROD } from '../../../../../lib/environment';

interface TutorialProps {
  step: number;
}

export function OnboardingPhishing(props: TutorialProps) {
  function getAnimation() {
    switch (props.step) {
      case 0:
        return `${tutorialStyles.waiting}`;
      case 1:
        return `${tutorialStyles.moveIn}`;
      case 2:
        return `${tutorialStyles.moveOut}`;
      case 3:
        return `${tutorialStyles.moveOut}`;
      default:
        return '';
    }
  }

  if (props.step !== 1) {
    return <></>;
  }

  return (
    <div className={`${tutorialStyles.slideEffect} ${getAnimation()}`}>
      <div className={tutorialStyles.tutorialContainer}>
        <div className="row" style={{ width: '95%', marginTop: '50px' }}>
          <div className="col-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Text fontSize={'34px'} fontWeight="bold">
              Phishing Protection
            </Text>
            <Text fontSize="16px">Our machine learning algorithms detect...</Text>
            <br />

            <List spacing={3}>
              <ListItem className={tutorialStyles.slideRightFirst} fontSize={'18px'}>
                <ListIcon as={MdCheckCircle} color="#30DE9A" />
                Recently created websites
              </ListItem>
              <ListItem className={tutorialStyles.slideRightSecond} fontSize={'18px'}>
                <ListIcon as={MdCheckCircle} color="#30DE9A" />
                Known phishing scams
              </ListItem>
              <ListItem className={tutorialStyles.slideRightThird} fontSize={'18px'}>
                <ListIcon as={MdCheckCircle} color="#30DE9A" />
                Impersonation attempts on popular web3 sites
              </ListItem>
            </List>

            <br />
          </div>
          <div className="col-6" style={{ paddingLeft: 0 }}>
            <img src={`${CDN_URL_PROD}/extension-assets/PhishingDetection.gif`} style={{ borderRadius: '15px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
