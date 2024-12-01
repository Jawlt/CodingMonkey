import { MdCenterFocusStrong } from 'react-icons/md';

type WordWrapperProps = {
  children: React.ReactNode;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  restart: () => void; 
};

const WordWrapper = ({ focused, setFocused, restart, children }: WordWrapperProps) => {
  return (
    <div
      className={`relative mt-5 focus:border-0 focus:border-none focus:outline-none ${
        focused ? 'blur-none' : 'cursor-pointer blur-md'
      } `}
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        restart(); // Call restart when losing focus
      }}
    >
      {children}
    </div>
  );
};

export default WordWrapper;