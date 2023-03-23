import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWeb3Core } from '../components/app-dashboard/tabs/chatweb3/Chatweb3Core';
import Home from '../components/app-dashboard/tabs/chatweb3/temp/pages';

const ChatWeb3Page = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChatWeb3Page />
  </React.StrictMode>
);
