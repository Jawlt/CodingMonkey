import { useDropdown } from '../hooks/useDropdown';
import { useThemeContext } from '../hooks/useTheme';
import ThemeDropdown from './ThemeDropdown';
import { theme } from '../utils';
import { UserCircle } from 'lucide-react';

const UserProfile = () => {
  const { dropdownRef, isOpen, toggleDropdown } = useDropdown();
  const { systemTheme, setTheme } = useThemeContext();

  return (
    <>
      <div className='flex rounded-md font-mono'>
        <div className='relative' ref={dropdownRef}>
          <button
            type='button'
            className={`inline-flex h-full items-center justify-center rounded-md border-0 px-2 outline-0`}
            style={{
              backgroundColor: systemTheme.background.primary,
              border: `${systemTheme.text.secondary}`,
            }}
            onClick={() => toggleDropdown()}
          >
            <UserCircle className="userProfile" size={40} style={{ color: systemTheme.text.title }} />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ml-3 h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>

          <div
            className='absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md shadow-lg'
            style={{
              backgroundColor: systemTheme.background.secondary,
              border: `1px solid ${systemTheme.text.secondary}`,
              display: isOpen ? 'block' : 'none',
            }}
          >
            <ul
            className="divide-y divide-slate-400 p-2"
            style={{ color: systemTheme.text.title }}
          >
            {/* User Information */}
            <li className="py-2">
              <div className="flex items-center justify-center">
                <p className="font-smal center">UserID: CodingMonkey</p>
              </div>
            </li>
            <li className="py-2">
              <div className="flex items-center justify-center">
                <p className="font-small">Highscore: 50</p>
              </div>
            </li>
            <li className="py-2">
              <div className="text-center">
                <p className="font-small underline">Session High</p>
                <p className="font-small">Score: 58</p>
                <p className="font-small">WPM: 39</p>
                <p className="font-small">Accuracy: 89%</p>
              </div>
            </li>
            <li className="py-2">
              <div className="flex items-center justify-center">
                <ThemeDropdown />
              </div>
            </li>
            <li className="py-2 flex items-center justify-center">
              <button className="logout">
                <p className="font-small hover:underline">Logout</p>
              </button>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
