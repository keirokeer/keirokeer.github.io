import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import siteConfig from './config/settings';

const applyColorConfig = () => {
  const root = document.documentElement;
  const { colors } = siteConfig;
  
  if (colors.primaryButton) {
    root.style.setProperty('--btn-primary-normal', `var(--${colors.primaryButton.normal})`);
    root.style.setProperty('--btn-primary-hover', `var(--${colors.primaryButton.hover})`);
  }
  
  if (colors.platformButton) {
    root.style.setProperty('--btn-platform-hover', `var(--${colors.platformButton.hover})`);
  }
};

applyColorConfig();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
