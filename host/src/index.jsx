import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

function sendMessage(channel, data) {
  window.electronAPI.sendMessage(channel, data);
}

function onMessage(channel, callback) {
  window.electronAPI.onMessage(channel, callback);
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { sendMessage, onMessage };