import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWeb3Tab } from '../components/chatweb3/components/Chat/ChatWeb3Tab';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChatWeb3Tab />
  </React.StrictMode>
);
