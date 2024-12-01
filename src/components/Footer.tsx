import styled from 'styled-components';
import { BsGithub, BsTelegram, BsWhatsapp, BsCodeSlash } from 'react-icons/bs';

import { useThemeContext } from '../hooks/useTheme';

import Tooltip from './Tooltip';
import Social from './Social';

const StyledLink = styled.a`
  &:hover {
    color: ${({ theme }) => theme.text.title};
  }
`;

const Footer = () => {
  const { systemTheme } = useThemeContext();
  return (
    <footer className='mb-3 mt-auto'>
      <div className='flex items-center justify-center '>
        <Tooltip tooltipId='Github'>
          <Social
            url='https://github.com/Jawlt/WesternHackGroup'
            tooltipContent='Github'
            tooltipId='Github'
          >
            <BsGithub className='text-2xl' />
          </Social>
        </Tooltip>
      </div>
    </footer>
  );
};

export default Footer;
