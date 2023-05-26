import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWeb3Tab } from '../components/app-dashboard/tabs/chatweb3/components/Chat/ChatWeb3Tab';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../lib/theme';

export const ChatWeb3Page = () => {
  return (
    <>
      <ChatWeb3Tab />
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ChatWeb3Page />
    </ChakraProvider>
  </React.StrictMode>
);
