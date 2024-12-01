import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ThemeProvider from './context/ThemeContext.tsx';
import { Auth0Provider } from '@auth0/auth0-react';
import Leaderboard from './components/Leaderboard.tsx';
import Modes from './components/Modes.tsx';
import NormalMode from './components/NormalMode.tsx';

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >    
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/modes" element={<Modes />} />
            <Route path="/modes/normalmode" element={<NormalMode />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
