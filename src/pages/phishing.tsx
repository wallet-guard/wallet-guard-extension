import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import posthog from 'posthog-js';
import { toUnicode } from 'punycode';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { TwitterShareButton } from 'react-share';
import { BrowserMessageType, ProceedAnywayMessageType } from '../lib/helpers/chrome/messageHandler';
import { openDashboard } from '../lib/helpers/linkHelper';
import { standardizeUrl } from '../lib/helpers/util';
import theme from '../lib/theme';
import styles from '../styles.module.css';
import * as Sentry from '@sentry/react';
import { WarningType } from '../models/simulation/Transaction';

export function PhishingWarning() {
  const [isFalsePositive, setIsFalsePositive] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const safeUrl = queryParams.get('safe') || 'null';
  const proceedAnywayUrl = queryParams.get('proceed') || 'null';
  const reason: WarningType | string = queryParams.get('reason') || 'null';
  const mappedSafeUrl = safeUrl ? `https://${safeUrl}` : 'null';
  const isConfirmedPhishing = reason === WarningType.Blocklisted;
  const logoSrc = 'images/wg_logos/Logo-phishing-protection.png';
  const warningText = getWarningText();

  useEffect(() => {
    posthog.init('phc_rb7Dd9nqkBMJYCCh7MQWpXtkNqIGUFdCZbUThgipNQD', {
      api_host: 'https://app.posthog.com',
      persistence: 'localStorage',
      autocapture: false,
      capture_pageleave: false,
      disable_session_recording: true,
    });

    Sentry.init({
      dsn: 'https://d6ac9c557b4c4eee8b1d4224528f52b3@o4504402373640192.ingest.sentry.io/4504402378293248',
      integrations: [new Sentry.BrowserTracing()],
    });
    posthog.capture('show phishing screen', { phishingWebsite: proceedAnywayUrl, reason });
  }, []);

  function openSafeLink() {
    posthog.capture('open safe link', { mappedSafeUrl });
    chrome.tabs.update({ url: mappedSafeUrl });
  }

  function handleFalsePositiveCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    posthog.capture('permanently unblock url', { falsePositiveUrl: proceedAnywayUrl });
    setIsFalsePositive(value);
  }

  function openProceedAnyway() {
    posthog.capture('proceed anyway', { proceedAnywayUrl, reason });
    chrome.runtime.sendMessage({
      type: BrowserMessageType.ProceedAnyway,
      url: proceedAnywayUrl,
      permanent: true,
    } as ProceedAnywayMessageType);
  }

  function getLabel(): React.ReactNode {
    return (
      <span>
        <span>The url you clicked on is </span>
        <strong>{toUnicode(standardizeUrl(proceedAnywayUrl))}.</strong>
        <span> We've identified punycode characters, which is a common form of phishing attack</span>
      </span>
    );
  }

  function getWarningText() {
    if (isConfirmedPhishing) {
      return (
        <>
          <Text variant={'muted'} fontSize={'lg'}>
            The website ({proceedAnywayUrl}) you're trying to visit is on our{' '}
            <strong>confirmed phishing blocklist</strong>
          </Text>
        </>
      );
    } else if (reason === WarningType.Drainer) {
      return (
        <>
          <Text variant={'muted'} fontSize={'lg'}>
            The website ({proceedAnywayUrl}) you're trying to visit is a <strong>suspected wallet drainer.</strong>
          </Text>
        </>
      );
    } else if (reason === WarningType.RecentlyCreated) {
      return (
        <>
          <Text variant={'muted'} fontSize={'lg'}>
            The website ({proceedAnywayUrl}) you're trying to visit might be a phishing attempt.
          </Text>
          <Text variant={'muted'} fontSize={'lg'}>
            <strong>It was recently created and has low trust.</strong> If you proceed, please use caution.
          </Text>
        </>
      );
    } else if (reason === WarningType.Homoglyph) {
      return (
        <>
          <Text style={{ whiteSpace: 'nowrap' }} variant={'muted'} fontSize={'lg'}>
            The website{' '}
            <strong>
              <Tooltip placement="top" label={getLabel()} variant={'default'}>
                <div style={{ display: 'inline-block' }} className={styles.hover}>
                  ({proceedAnywayUrl} <BsQuestionCircleFill size={'14'} color="white" style={{ display: 'inline' }} />)
                </div>
              </Tooltip>{' '}
            </strong>
            you're trying to visit contains punycode and is likely a phishing attempt.
          </Text>

          <Text variant={'muted'} fontSize={'lg'}>
            There's a strong chance this website is trying to impersonate <strong>{safeUrl}</strong>
          </Text>
        </>
      );
    } else if (reason === WarningType.Malware) {
      return (
        <Text variant={'muted'} fontSize={'lg'}>
          The website ({proceedAnywayUrl}) you're trying to visit{' '}
          <strong>contains malware, phishing, or unwanted software.</strong>
        </Text>
      );
    } else if (!isConfirmedPhishing && safeUrl !== 'null') {
      return (
        <>
          <Text variant={'muted'} fontSize={'lg'}>
            The website ({proceedAnywayUrl}) you're trying to visit might be a phishing attempt.
          </Text>
          <Text variant={'muted'} fontSize={'lg'}>
            We think you might be looking for <strong>{safeUrl}</strong>
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text variant={'muted'} fontSize={'lg'}>
            The website ({proceedAnywayUrl}) you're trying to visit might be a phishing attempt.
          </Text>
        </>
      );
    }
  }

  return (
    <div style={{ background: 'black' }}>
      <div className={styles.center}>
        <VStack spacing={'4'} alignItems="flex-start">
          <WarningTwoIcon
            boxSize={'100px'}
            color={reason === WarningType.RecentlyCreated ? 'yellow.400' : 'red.400'}
            mr={3}
          />
          <Heading as="h4">This website might be harmful</Heading>
          {warningText}

          <Stack pt="80px" direction="row" spacing="6">
            {safeUrl !== 'null' && (
              <Button onClick={openSafeLink} variant="primary" rightIcon={<CheckIcon />}>
                <Link>Go to {safeUrl}</Link>
              </Button>
            )}
            {safeUrl === 'null' && (
              <Button
                onClick={() => openDashboard('phishing_page_my_dashboard')}
                variant="primary"
                rightIcon={<CheckIcon />}
              >
                My Dashboard
              </Button>
            )}
            <Button variant="link" onClick={openProceedAnyway}>
              Proceed anyway
            </Button>
          </Stack>
          <Tooltip
            variant={'default'}
            label="Disclaimer: We are still in BETA and expect false positives to
              happen. If you believe this website is safe, let us know by
              checking this box."
            placement="bottom-end"
          >
            <Box pl={'10px'}>
              <Checkbox colorScheme="green" onChange={handleFalsePositiveCheckbox} pt="10px">
                Click here to let us know if this is a false positive
              </Checkbox>
            </Box>
          </Tooltip>
          <div style={{ paddingLeft: '10px' }}>
            <TwitterShareButton
              url={'https://walletguard.app'}
              title={
                'Wallet Guard just protected me from a phishing attack! This is a reminder to always stay security conscious when clicking on links. Check them out at'
              }
              via={'wallet_guard'}
            >
              <a style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faTwitter} size="lg" style={{ marginRight: '10px' }} />
                <b> If you found this helpful, click this to share on twitter! </b>
              </a>
            </TwitterShareButton>
          </div>
          <Image pt={'100px'} src={logoSrc} />
        </VStack>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PhishingWarning />
    </ChakraProvider>
  </React.StrictMode>
);
