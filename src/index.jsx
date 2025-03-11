// @ts-check

import { createRoot } from 'react-dom/client';
import React from 'react';
import init from './init.jsx';

const app = async () => {
  const container = document.getElementById('container');
  const root = createRoot(container);
  const vdom = await init();
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
