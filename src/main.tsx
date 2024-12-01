import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ThemeProvider from './context/ThemeContext.tsx';
import Leaderboard from './components/Leaderboard.tsx';
import Modes from './components/Modes.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/modes" element={<Modes />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
