import styled from 'styled-components';
import { useThemeContext } from '../hooks/useTheme';
import { useAuth0 } from '@auth0/auth0-react';
import { BsQuestionCircle } from 'react-icons/bs';
import { BsKeyboardFill } from 'react-icons/bs';
import { useThemeContext } from '../hooks/useTheme';
import Tooltip from './Tooltip';
import ThemeDropdown from './ThemeDropdown';
import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.svg';
import UserProfile from './user-profile';
       
const Header = () => {
  const navigate = useNavigate();
  const { systemTheme } = useThemeContext();

  return (

    <header
      className="flex items-center justify-between py-2"
      style={{
        color: systemTheme.text.title,
      }}
    >
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" width="75" height="75" />
        <h1 className="font-mono text-2xl font-bold lg:text-3xl">
          CodingMonkey.
        </h1>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex gap-4">
          <Tooltip tooltipId="modes">
            <div
              className="font-mono text-2xl lg:text-3xl hover:underline"
              onClick={() => navigate('/modes')}
            >
              Modes
            </div>
          </Tooltip>
          <Tooltip tooltipId="leaderboard">
            <div
              className="font-mono text-2xl lg:text-3xl hover:underline"
              onClick={() => navigate('/leaderboard')}
            >
              Leaderboard
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex gap-4">
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;