import { RepeatIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { FiBell, FiBellOff } from 'react-icons/fi';
import { supportedWallets, WalletType } from '../../../../lib/config/supportedWallets';
import { AlertHandler } from '../../../../lib/helpers/chrome/alertHandler';
import localStorageHelpers from '../../../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../../../lib/helpers/chrome/localStorageKeys';
import { Settings, WG_DEFAULT_SETTINGS } from '../../../../lib/settings';
import { AlertDetail } from '../../../../models/Alert';
import { WalletInfo } from '../../../../models/VersionChecker';
import { checkAllWalletsAndCreateAlerts } from '../../../../services/http/versionService';
import { Feedback } from '../../../common/Feedback';
import AlertsTable, { sortByCreatedAt } from '../alerts/AlertsTable';
import { ChecklistItem } from './subComponents/ChecklistItem';
import GoodStandingComponent from './subComponents/GoodStanding';
import UnreadAlertComponent from './subComponents/UnreadAlertWarning';
import styles from '../../../../styles.module.css';
import tutorialStyles from './DashboardTab.module.css';
import { OnboardingWelcome } from './onboarding/OnboardingWelcome';
import { OnboardingSimulation } from './onboarding/OnboardingSimulation';
import { OnboardingCommunity } from './onboarding/OnboardingCommunity';
import { OnboardingPhishing } from './onboarding/OnboardingPhishing';
import { posthog } from 'posthog-js';

export function DashboardTab() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [canRefresh, setCanRefresh] = useState(true);
  const [alertsHistory, setAlertsHistory] = useState<AlertDetail[]>([]);
  const [unreadAlerts, setUnreadAlerts] = useState<AlertDetail[]>([]);
  const [settings, setSettings] = useState<Settings>(WG_DEFAULT_SETTINGS);
  const [tutorialComplete, setTutorialComplete] = useState<boolean>(true);
  const [tutorialStep, setTutorialStep] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const LAST_TUTORIAL_INDEX = 3;

  function completeTutorial() {
    setTutorialComplete(true);
    chrome.storage.local.set({ [WgKeys.TutorialComplete]: true });
  }

  useEffect(() => {
    getVersionFromLocalStorage();

    AlertHandler.clearNotifications();
    AlertHandler.getAllAlerts().then((_alertsFeed) => setAlertsHistory(_alertsFeed));
    AlertHandler.removeAllUnreadAlerts().then((alerts) => {
      chrome.action.getUserSettings().then((settings) => {
        setUnreadAlerts(alerts);
        posthog.capture('visit dashboard', { alertsCount: alerts.length, isPinned: settings.isOnToolbar });
      });
    });
    localStorageHelpers.get<boolean>(WgKeys.TutorialComplete).then((res) => {
      if (res !== true) {
        setTutorialComplete(false);
      } else {
        setTutorialComplete(true);
      }
    });
  }, []);

  useEffect(() => {
    getSettingsFromLocalstorage();
    async function getSettingsFromLocalstorage() {
      const data = await localStorageHelpers.get<Settings>(WgKeys.Settings);
      if (data) {
        setSettings(data);
      }
    }
  }, []);

  function goToTutorialStep(index: number) {
    setTutorialStep(index);
  }

  function nextTutorialStep() {
    if (tutorialStep === LAST_TUTORIAL_INDEX) {
      completeTutorial();
    }
    setTutorialStep((step) => step + 1);
  }

  function getTutorialText() {
    switch (tutorialStep) {
      case 0:
        return 'Get Started';
      case 1:
        return 'Next';
      case 2:
        return 'Next';
      case 3:
        return 'LFG!';
    }
  }

  function toggleNotifications() {
    const newSettings: Settings = {
      ...settings,
      walletVersionNotifications: !settings.walletVersionNotifications,
    };

    setSettings(newSettings);
    chrome.storage.local.set({ settings: newSettings });
  }

  function openGuide() {
    chrome.tabs.create({
      url: 'https://medium.com/@walletguardofficial/how-to-update-browser-extensions-e61b1138cf7e',
    });
  }

  async function getVersionFromLocalStorage() {
    const requests: Promise<WalletInfo | null>[] = [];
    const supportedWalletKeys = Object.keys(supportedWallets) as WalletType[];

    function getDefaultWalletInfo(i: number): WalletInfo {
      return {
        name: supportedWalletKeys[i],
        lastCheckedAt: 0,
        latestVersion: 'n/a',
        localVersion: 'n/a',
      };
    }

    supportedWalletKeys.forEach(async (walletName) => {
      requests.push(localStorageHelpers.get<WalletInfo>(walletName as WgKeys));
    });

    let output = (await Promise.all(requests)) as WalletInfo[];

    // in case any return null
    output = output.map((wallet, i) => {
      if (!wallet) {
        wallet = getDefaultWalletInfo(i);
      }
      return wallet;
    });

    setWalletInfo(output);
  }

  async function checkWallets() {
    setCanRefresh(false);
    setTimeout(() => {
      setCanRefresh(true);
    }, 4000);
    setLoading(true);

    await checkAllWalletsAndCreateAlerts();
    await getVersionFromLocalStorage();
    setLoading(false);
  }

  return (
    <div className="container">
      <Modal isOpen={!tutorialComplete} onClose={onClose} size="5xl" motionPreset="slideInBottom">
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent className={tutorialStyles.modal} justifyContent={'center'}>
          <ModalBody>
            <Tabs index={tutorialStep} onChange={goToTutorialStep}>
              <TabList>
                <Tab>
                  <b>Welcome</b>
                </Tab>
                <Tab>
                  <b>Phishing Protection</b>
                </Tab>
                <Tab>
                  <b>
                    Transaction Simulation{' '}
                    <Badge pl="1" fontSize="13px" colorScheme="green">
                      New
                    </Badge>
                  </b>
                </Tab>
                <Tab>
                  <b>Community</b>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <OnboardingWelcome step={tutorialStep} />
                </TabPanel>
                <TabPanel>
                  <OnboardingPhishing step={tutorialStep} />
                </TabPanel>
                <TabPanel>
                  <OnboardingSimulation step={tutorialStep} />
                </TabPanel>
                <TabPanel>
                  <OnboardingCommunity step={tutorialStep} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter justifyContent={'space-between'}>
            <Button
              size="sm"
              onClick={() => goToTutorialStep(tutorialStep - 1)}
              style={{ backgroundColor: 'blackAlpha', color: 'white' }}
              visibility={tutorialStep === 0 ? 'hidden' : 'visible'}
            >
              Previous
            </Button>

            <Button
              size="sm"
              autoFocus
              style={{ backgroundColor: 'white', color: 'black' }}
              onClick={nextTutorialStep}
              className={tutorialStyles.continue}
            >
              {getTutorialText()}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="row" style={{ paddingTop: '5%' }}>
        <div className="col-12">
          <div className="card" style={{ backgroundColor: '#121212' }}>
            <div className="card-body" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
              <div className="row align-items-center">
                <div style={{ paddingLeft: '80px' }} className="col-md-12 col-lg-8">
                  {unreadAlerts.length > 0 ? (
                    <UnreadAlertComponent type={unreadAlerts[0].category} warningsCount={unreadAlerts.length} />
                  ) : (
                    <GoodStandingComponent />
                  )}
                </div>

                <div className="col-md-12 col-lg-4" style={{ justifyContent: 'center' }}>
                  <img
                    src={
                      unreadAlerts.length > 0
                        ? 'images/wg_logos/Logo-Large-Transparent-Alert.png'
                        : 'images/wg_logos/Logo-Large-Transparent.png'
                    }
                    alt="Wallet Guard logo"
                    style={{ marginLeft: '70px' }}
                    width={150}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-5">
        <div className="col-12 pb-1">
          <div className="card h-100" style={{ backgroundColor: '#121212' }}>
            <div className="card-body">
              <div className="row pb-3 align-items-center" style={{ justifyContent: 'space-between' }}>
                <div className="row align-items-center">
                  <Heading as="h3" size="md" paddingLeft={'40px'}>
                    Wallet Versions
                  </Heading>
                </div>

                <div className="row align-items-center" style={{ paddingRight: '40px' }}>
                  <Tooltip
                    placement="top"
                    variant={'default'}
                    label={`Turn ${settings.walletVersionNotifications ? 'off' : 'on'} wallet version notifications`}
                  >
                    <div style={{ marginLeft: '10px' }} className={styles.hover} onClick={toggleNotifications}>
                      {settings.walletVersionNotifications ? (
                        <FiBell fontSize={'22px'} />
                      ) : (
                        <FiBellOff fontSize={'22px'} />
                      )}
                    </div>
                  </Tooltip>
                  <Button disabled={!canRefresh} colorScheme={'gray'} onClick={checkWallets} variant="link">
                    <Tooltip label={'Refresh Data'} placement="top" variant={'default'}>
                      <RepeatIcon boxSize={'22px'} />
                    </Tooltip>
                  </Button>
                  <Button size="md" onClick={openGuide} color="green.200" variant="solid">
                    Extension Update Guide
                  </Button>
                </div>
              </div>

              <Skeleton isLoaded={!loading}>
                <div className="row">
                  {walletInfo.map((wallet) => {
                    return <ChecklistItem key={wallet.name} walletInfo={wallet} />;
                  })}
                </div>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>

      <div className="row pb-5 pt-5">
        <div className="col-12">
          <div className="card" style={{ backgroundColor: '#121212' }}>
            <div className="card-body">
              <Heading as="h3" size="md" pb={4} paddingLeft={'10px'}>
                Recent Alerts
              </Heading>

              <AlertsTable
                alertsHistory={alertsHistory.sort(sortByCreatedAt).slice(0, 4)}
                parentComponent={'Dashboard'}
                unreadAlerts={unreadAlerts}
              />
            </div>
          </div>
        </div>
      </div>
      <Feedback />
    </div>
  );
}
