import tutorialStyles from '../DashboardTab.module.css';
import React from 'react';
import { List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import { CDN_URL_PROD } from '../../../../../lib/environment';

interface TutorialProps {
  step: number;
}

export function OnboardingSimulation(props: TutorialProps) {
  function getAnimation() {
    switch (props.step) {
      case 0:
        return `${tutorialStyles.waiting}`;
      case 1:
        return `${tutorialStyles.waiting}`;
      case 2:
        return `${tutorialStyles.moveIn}`;
      case 3:
        return `${tutorialStyles.moveOut}`;
      default:
        return '';
    }
  }

  return (
    <div className={`${tutorialStyles.slideEffect} ${getAnimation()}`}>
      <div className={tutorialStyles.tutorialContainer}>
        <div className="row" style={{ width: '95%', marginTop: '50px' }}>
          <div className="col-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Text fontSize={'34px'} fontWeight="bold">
              Transaction Simulation
            </Text>
            <Text fontSize="16px">Transact with confidence using valuable insights such as...</Text>
            <br />

            <List spacing={3}>
              <ListItem className={tutorialStyles.slideRightFirst} fontSize={'18px'}>
                <ListIcon as={MdCheckCircle} color="#30DE9A" />
                Human readable transactions
              </ListItem>
              <ListItem className={tutorialStyles.slideRightSecond} fontSize={'18px'}>
                <ListIcon as={MdCheckCircle} color="#30DE9A" />
                Malicious signatures, such as set approval for all
              </ListItem>
              <ListItem className={tutorialStyles.slideRightThird} fontSize={'18px'}>
                <ListIcon as={MdCheckCircle} color="#30DE9A" />
                Alerts when a transaction may be fraudulent
              </ListItem>
            </List>

            <br />
          </div>
          <div className="col-6" style={{ paddingLeft: 0 }}>
            <img src={`${CDN_URL_PROD}/extension-assets/SimulationExample.gif`} style={{ borderRadius: '15px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
