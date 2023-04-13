import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
const ActionPopup = () => {
  return <h1>Hello world</h1>;
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ActionPopup />
  </React.StrictMode>
);
