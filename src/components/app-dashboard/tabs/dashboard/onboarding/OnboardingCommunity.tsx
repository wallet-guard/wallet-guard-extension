import tutorialStyles from '../DashboardTab.module.css';
import React from 'react';
import { Text } from '@chakra-ui/react';
import { BsDiscord } from 'react-icons/bs';
import { CDN_URL_PROD } from '../../../../../lib/environment';

interface TutorialProps {
  step: number;
}

export function OnboardingCommunity(props: TutorialProps) {
  function getAnimation() {
    switch (props.step) {
      case 0:
      case 1:
        return `${tutorialStyles.waiting}`;
      case 2:
        return `${tutorialStyles.moveIn}`;
      default:
        return '';
    }
  }

  function joinDiscord() {
    chrome.tabs.create({ url: 'https://discord.gg/mvbtaJzXDP' });
  }

  return (
    <div className={`${tutorialStyles.slideEffect} ${getAnimation()}`}>
      <div className={tutorialStyles.tutorialContainer}>
        <div className="row" style={{ width: '95%' }}>
          <div className="col-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Text fontSize={'34px'} fontWeight="bold">
              Communities Protected
            </Text>
            <br />
            <Text fontSize="18px">
              We constantly update our allowlist, which proactively detects phishing attacks on hundreds of the top web3
              marketplaces, NFT projects, tools, and more.
            </Text>
            <br />
            <br />
            <div
              className={`${tutorialStyles.hover}`}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              onClick={joinDiscord}
            >
              <BsDiscord fontSize={'28px'} className={tutorialStyles.discord} />{' '}
              <Text marginLeft={'5px'} fontSize={'18px'} variant="link">
                Join our <span className={tutorialStyles.discord}>Discord</span> for community updates.
              </Text>
            </div>
          </div>
          <div className="col-6" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={`${CDN_URL_PROD}/extension-assets/CommunityLogos.png`} style={{ height: '350px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
