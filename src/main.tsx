import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/atkinson-hyperlegible-next/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@fontsource-variable/bricolage-grotesque/wght.css';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

