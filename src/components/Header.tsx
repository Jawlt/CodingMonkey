import { useThemeContext } from '../hooks/useTheme';
import Tooltip from './Tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './assets/logo.svg';
import UserProfile from './user-profile';
       
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { systemTheme } = useThemeContext();


  return (
    <header
      className="flex w-full max-w-6xl self-center items-center justify-between py-2"
      style={{
        color: systemTheme.text.title,
      }}
    >
      <div className="flex items-center gap-3" >
        <div>
          <img src={Logo} alt="Logo" width="75" height="75" />
        </div>
        <div>
          <h1 className="font-mono text-2xl font-bold lg:text-3xl">
            CodingMonkey.
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-4">
          <Tooltip tooltipId="modes">
            <div
              className={`font-mono text-2xl lg:text-3xl hover:underline mr-4 cursor-pointer ${
                location.pathname === '/modes' || location.pathname === '/' ? 'font-bold underline' : ''
              }`}
              onClick={() => navigate('/modes')}
            >
              Modes
            </div>
          </Tooltip>
          <Tooltip tooltipId="leaderboard">
            <div
              className={`font-mono text-2xl lg:text-3xl hover:underline cursor-pointer ${
                location.pathname === '/leaderboard' ? 'font-bold underline' : ''
              }`}
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