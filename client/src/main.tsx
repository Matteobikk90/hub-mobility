import App from '@/app/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
