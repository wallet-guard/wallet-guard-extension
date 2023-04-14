import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import SimpleSidebar from '../components/app-dashboard/layout/Sidebar';
import AlertsTab from '../components/app-dashboard/tabs/alerts/AlertsTab';
import { DashboardTab } from '../components/app-dashboard/tabs/dashboard/DashboardTab';
import ExtensionsTab from '../components/app-dashboard/tabs/extensions/ExtensionsTab';
import { SettingsTab } from '../components/app-dashboard/tabs/settings/SettingsTab';
import { PageContext } from '../lib/context/context';
import { useNavigation } from '../lib/hooks/useNavigation';
import theme from '../lib/theme';
import posthog from 'posthog-js';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export function Dashboard() {
  const pageData = useNavigation();

  useEffect(() => {
    posthog.init('phc_rb7Dd9nqkBMJYCCh7MQWpXtkNqIGUFdCZbUThgipNQD', {
      api_host: 'https://app.posthog.com',
      persistence: 'localStorage',
      autocapture: false,
      capture_pageleave: false,
    });

    Sentry.init({
      dsn: 'https://d6ac9c557b4c4eee8b1d4224528f52b3@o4504402373640192.ingest.sentry.io/4504402378293248',
      integrations: [new BrowserTracing()],
    });

    const urlSearchParams = new URLSearchParams(window.location.search);
    const source = urlSearchParams.get('source');

    if (process.env.NODE_ENV === 'production' && source === 'install') {
      const uid = posthog.get_distinct_id();
      posthog.capture('install');
      chrome.runtime.setUninstallURL('https://walletguard.app/uninstall?id=' + uid);
    }

    posthog.capture('open dashboard', { source });
  }, []);

  function getCurrentView() {
    switch (pageData.currentPage) {
      case 'dashboard':
        return <DashboardTab />;
      case 'settings':
        return <SettingsTab />;
      case 'extensions':
        return <ExtensionsTab />;
      case 'alerts':
        return <AlertsTab />;
      default:
        return <DashboardTab />;
    }
  }

  return (
    <>
      <PageContext.Provider value={pageData}>
        <SimpleSidebar>{getCurrentView()}</SimpleSidebar>
      </PageContext.Provider>
    </>
  );
}
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Dashboard />
    </ChakraProvider>
  </React.StrictMode>
);
