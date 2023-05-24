import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWeb3Tab } from '../components/app-dashboard/tabs/chatweb3/components/Chat/ChatWeb3Tab';

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
    <ChatWeb3Page />
  </React.StrictMode>
);
