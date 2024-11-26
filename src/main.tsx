import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UrlProvider } from './contexts/UrlContextProvider';

import './i18n';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App';

const basename = import.meta.env.MODE === 'production' ? '/url-shortner-ui' : '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <UrlProvider>
        <App />
      </UrlProvider>
    </BrowserRouter>
  </StrictMode>
);
