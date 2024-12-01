import styled from 'styled-components';
import { useThemeContext } from '../hooks/useTheme';
import { useAuth0 } from '@auth0/auth0-react';
import { BsQuestionCircle } from 'react-icons/bs';
import { BsKeyboardFill } from 'react-icons/bs';

import Tooltip from './Tooltip';
import ThemeDropdown from './ThemeDropdown';

type HeaderProps = {
  restart: () => void;
  openAboutModal: (str: string) => void;
  closeAboutModal: (str: string) => void;
};

const StyledSvg = styled.svg`
  width: 50px;
  height: 50px;
  color: ${({ theme }) => theme.text.title};
`;

const Header = ({ restart, openAboutModal }: HeaderProps) => {
  const { logout } = useAuth0();
  const { systemTheme } = useThemeContext();

  return (
    <header className='flex items-center justify-between py-8'>
      <div
        className='flex cursor-pointer items-center gap-3'
        style={{
          color: systemTheme.text.title,
        }}
      >
        <StyledSvg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='-680 -1030 300 180'
          theme={systemTheme}
        >
          <g>
            <path
              d='M -430 -910 L -430 -910 C -424.481 -910 -420 -905.519 -420 -900 L -420 -900 C -420 -900 C -420 -894.481 -424.481 -890 -430 -890'
              fill='currentColor'
            ></path>
            <path
              d='M -570 -910 L -510 -910 C -504.481 -910 -500 -905.519 -500 -900 L -500 -900 C -500 -900 C -500 -894.481 -504.481 -890 -510 -890'
              fill='currentColor'
            ></path>
            <path
              d='M -590 -970 L -590 -970 C -584.481 -970 -580 -965.519 -580 -960 L -580 -940 C -580 -940 C -580 -934.481 -584.481 -930 -590 -930'
              fill='currentColor'
            ></path>
            <path
              d='M -639.991 -960.515 C -639.72 -976.836 -626.385 -990 -610 -990 L -610 -990 C -602.32 -990 -595.31 -987.31 -590 -982.85'
              fill='currentColor'
            ></path>
            <path
              d='M -460 -930 L -460 -900 C -460 -894.481 -464.481 -890 -470 -890 L -470 -890 C -475.519 -890 -480 -894.481 -480 -900'
              fill='currentColor'
            ></path>
            <path
              d='M -470 -990 L -430 -990 C -424.481 -990 -420 -985.519 -420 -980 L -420 -980 C -420 -980 C -420 -974.481 -424.481 -970 -430 -970'
              fill='currentColor'
            ></path>
            <path
              d='M -630 -910 L -610 -910 C -604.481 -910 -600 -905.519 -600 -900 L -600 -900 C -600 -900 C -600 -894.481 -604.481 -890 -610 -890'
              fill='currentColor'
            ></path>
            <path
              d='M -515 -990 L -510 -990 C -504.481 -990 -500 -985.519 -500 -980 L -500 -980 C -500 -980 C -500 -974.481 -504.481 -970 -510 -970'
              fill='currentColor'
            ></path>
            <path
              d='M -660 -910 L -680 -910 L -680 -980 C -680 -1007.596 -657.596 -1030 -630 -1030 L -590 -1030'
              fill='currentColor'
            ></path>
          </g>
        </StyledSvg>
        <h1
          className={`font-mono text-2xl font-bold hover:underline lg:text-3xl`}
        >
          CodingMonkey.
        </h1>
        <Tooltip tooltipId='keyboard'>
          <div
            className='ml-4'
            onClick={() => {
              restart();
            }}
            data-tooltip-id='keyboard'
            data-tooltip-content='Restart'
          >
            <BsKeyboardFill className='text-2xl lg:text-3xl ' />
          </div>
        </Tooltip>
      </div>
      <div className='flex gap-4'>
        <ThemeDropdown />
        <button
          onClick={() => logout()}
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: systemTheme.background.secondary,
          }}
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;