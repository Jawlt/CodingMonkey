import React from 'react';
import Header from './Header';
import { useThemeContext } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

const Modes: React.FC = () => {
  const { systemTheme } = useThemeContext();
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col min-h-screen w-full px-4 lg:px-20"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl self-center mt-[10%]">
        {/* Normal Mode Card */}
        <div
          className="p-6 rounded-lg shadow-lg text-center"
          style={{
            backgroundColor: systemTheme.background.secondary,
            color: systemTheme.text.primary,
          }}
        >
          <div className="mb-2">
            <i
              className="fas fa-keyboard text-3xl"
              style={{ color: systemTheme.text.title }}
            ></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Normal</h3>
          <p className="mb-4">Classic typing experience with standard coding.</p>
          <button
            className="px-4 py-2 rounded-lg hover:opacity-90" onClick={() => navigate('/modes/normalmode')}
            style={{
              backgroundColor: systemTheme.text.title,
              color: systemTheme.background.secondary,
            }} 
          >
            Start Normal Mode
          </button>
        </div>

        {/* Random Mode Card */}
        <div
          className="p-6 rounded-lg shadow-lg text-center"
          style={{
            backgroundColor: systemTheme.background.secondary,
            color: systemTheme.text.primary,
          }}
        >
          <div className="mb-2">
            <i
              className="fas fa-random text-3xl"
              style={{ color: systemTheme.text.title }}
            ></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Random</h3>
          <p className="mb-4">Challenge yourself with randomized players.</p>
          <button
            className="px-4 py-2 rounded-lg hover:opacity-90"
            style={{
              backgroundColor: systemTheme.text.title,
              color: systemTheme.background.secondary,
            }}
          >
            Start Random Mode
          </button>
        </div>

        {/* Custom Mode Card */}
        <div
          className="p-6 rounded-lg shadow-lg text-center"
          style={{
            backgroundColor: systemTheme.background.secondary,
            color: systemTheme.text.primary,
          }}
        >
          <div className="mb-2">
            <i
              className="fas fa-cogs text-3xl"
              style={{ color: systemTheme.text.title }}
            ></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Custom</h3>
          <p className="mb-4">
            Create your own party and verse each other.
          </p>
          <button
            className="px-4 py-2 rounded-lg hover:opacity-90"
            style={{
              backgroundColor: systemTheme.text.title,
              color: systemTheme.background.secondary,
            }}
          >
            Start Custom Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modes;
