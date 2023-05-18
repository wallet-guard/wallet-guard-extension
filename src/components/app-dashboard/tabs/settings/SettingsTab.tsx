import { Heading, Switch } from '@chakra-ui/react';
import posthog from 'posthog-js';
import React, { useEffect, useState } from 'react';
import localStorageHelpers from '../../../../lib/helpers/chrome/localStorage';
import { WgKeys } from '../../../../lib/helpers/chrome/localStorageKeys';
import { Settings, SettingsKey, WG_DEFAULT_SETTINGS } from '../../../../lib/settings';
import { Feedback } from '../../../common/Feedback';

export function SettingsTab() {
  const [settings, setSettings] = useState<Settings>(WG_DEFAULT_SETTINGS);

  useEffect(() => {
    getSettingsFromLocalstorage();
    async function getSettingsFromLocalstorage() {
      const data = await localStorageHelpers.get<Settings>(WgKeys.Settings);
      if (data) {
        setSettings(data);
      }
    }
  }, []);

  function onSwitchUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    let key = e.target.id as SettingsKey;
    let value = e.target.checked;

    const newSettings: Settings = {
      ...settings,
      [key]: value,
    };

    posthog.capture('change settings', { newSettings });
    setSettings(newSettings);
    chrome.storage.local.set({ settings: newSettings });
  }

  return (
    <>
      <div className="container">
        <div className="row" style={{ paddingTop: '10%' }}>
          <div className="col">
            <div>
              <Heading as="h2" size="lg">
                Settings
              </Heading>
            </div>
          </div>
        </div>

        <div className="row pt-5">
          <div className="col-lg-12 col-xl-6 pt-1 pb-1">
            <div className="card h-100" style={{ backgroundColor: '#121212', minWidth: '460px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-8 pb-1" style={{ fontSize: '22px' }}>
                    <b>Phishing Detection</b>
                  </div>

                  <div className="col-4 text-right">
                    <Switch
                      colorScheme={'green'}
                      id={'phishingDetectionEnabled' as SettingsKey}
                      pl={'10px'}
                      isChecked={settings.phishingDetectionEnabled}
                      onChange={onSwitchUpdate}
                    ></Switch>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <p style={{ fontSize: '18px' }}>
                      We let you know when you're about to visit a website that was suspected to be a phishing attempt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-xl-6 pt-1 pb-1 pl-0">
            <div className="card h-100" style={{ backgroundColor: '#121212', minWidth: '460px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-8 pb-1" style={{ fontSize: '22px' }}>
                    <b>Transaction Simulation</b>
                  </div>

                  <div className="col-4 text-right">
                    <Switch
                      colorScheme={'green'}
                      id={'simulationEnabled' as SettingsKey}
                      pl={'10px'}
                      isChecked={settings.simulationEnabled}
                      onChange={onSwitchUpdate}
                    ></Switch>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <p style={{ fontSize: '18px' }}>
                      Transaction Simulations allow you to see exactly what is coming in and out of your wallet before
                      you complete your transaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-2">
          <div className="col-lg-12 col-xl-6 pt-1 pb-1">
            <div className="card h-100" style={{ backgroundColor: '#121212', minWidth: '460px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-8 pb-1" style={{ fontSize: '22px' }}>
                    <b>Malicious Extension Detection</b>
                  </div>

                  <div className="col-4 text-right">
                    <Switch
                      colorScheme={'green'}
                      id={'maliciousExtensionDetection' as SettingsKey}
                      pl={'10px'}
                      isChecked={settings.maliciousExtensionDetection}
                      onChange={onSwitchUpdate}
                    ></Switch>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <p style={{ fontSize: '18px' }}>
                      Wallet Guard will automatically disable unpacked extensions installed on your browser, which is a
                      common way to spread malware.
                    </p>
                  </div>
                  <div className="col-12">
                    <p style={{ fontStyle: 'italic', fontSize: '16px' }} className="text-muted pt-2">
                      TIP: If you are an extensions developer you may want this disabled
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-xl-6 pt-1 pb-1 pl-0">
            <div className="card h-100" style={{ backgroundColor: '#121212', minWidth: '460px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-9 pb-1" style={{ fontSize: '22px' }}>
                    <b className="pr-1">Wallet Version Alerts</b>
                  </div>

                  <div className="col-3 text-right">
                    <Switch
                      size={'md'}
                      colorScheme={'green'}
                      id={'walletVersionNotifications' as SettingsKey}
                      pl={'10px'}
                      isChecked={settings.walletVersionNotifications}
                      onChange={onSwitchUpdate}
                    ></Switch>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <p style={{ fontSize: '18px' }}>Receive notifications when one of your wallets goes out-of-date.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Feedback />
      </div>
    </>
  );
}
