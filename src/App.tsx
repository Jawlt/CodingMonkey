import { useDetectDevice } from './hooks/useDetectDevice';
import { useSystem } from './hooks/useSystem';
import { useThemeContext } from './hooks/useTheme';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

import Login from './components/Login';
import Countdown from './components/Countdown';
import Footer from './components/Footer';
import Header from './components/Header';
import ModalComponent from './components/Modal';
import ModalContent from './components/ModalContent';
import Restart from './components/Restart';
import TimeCategory from './components/TimeCategory';
import UserTyped from './components/UserTyped';
import WordContainer from './components/WordContainer';
import WordWrapper from './components/WordWrapper';
import MobileNotSupported from './components/MobileNotSupported';
import LanguageSelect from './components/SimpleLanguageSelect';

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { systemTheme } = useThemeContext();
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'c'>('python');
  const {
    charTyped,
    countdown,
    word,
    wordContainerFocused,
    modalIsOpen,
    aboutModal,
    history,
    time,
    results,
    resetCountdown,
    setLocalStorageValue,
    setWordContainerFocused,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
    setTime,
  } = useSystem(selectedLanguage);

  const isMobile = useDetectDevice();

  if (isLoading) {
    return (
      <div 
        className="h-screen w-full flex items-center justify-center"
        style={{
          backgroundColor: systemTheme.background.primary,
          color: systemTheme.text.primary,
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div
      className='h-screen w-full overflow-y-auto'
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <main
        className=' mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0'
        style={{}}
      >
        {isMobile ? (
          <MobileNotSupported />
        ) : (
          <>
            <Header />
            <TimeCategory
              time={time}
              setLocalStorage={setLocalStorageValue}
              setTime={setTime}
              restart={restartTest}
            />
            <div className="flex justify-between items-center w-full">
              <LanguageSelect
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              <Countdown countdown={countdown} reset={resetCountdown} />
            </div>

            <WordWrapper
              focused={wordContainerFocused}
              setFocused={setWordContainerFocused}
              restart={restartTest}  // Add this prop
            >
              <WordContainer word={word} selectedLanguage={selectedLanguage} />
              <UserTyped
                word={word}
                check={checkCharacter}
                charTyped={charTyped}
              />
            </WordWrapper>
            <Restart restart={restartTest} />
            <Footer />
            <ModalComponent
              type='result'
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
            >
              <ModalContent
                totalTime={time}
                results={results}
                history={history}
              />
            </ModalComponent>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
