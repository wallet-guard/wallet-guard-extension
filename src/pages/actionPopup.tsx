import React from 'react';
import { createRoot } from 'react-dom/client';
import { ActionPopupContainer } from '../components/actionPopup/ActionPopupContainer';
import { ChakraProvider, theme } from '@chakra-ui/react';

const ActionPopup = () => {
  return <ActionPopupContainer />;
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ActionPopup />
    </ChakraProvider>
  </React.StrictMode>
);

// Requirements:
// 1. if simulationNeedsAction, display TAS popup UI
// 2. otherwise, show PDS screen
// 3. Working Chatweb3 tab
// 4. tutorial component
