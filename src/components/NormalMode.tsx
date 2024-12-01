import { useDetectDevice } from '../hooks/useDetectDevice';
import { useSystem } from '../hooks/useSystem';
import { useThemeContext } from '../hooks/useTheme';
import Countdown from './Countdown';
import Footer from './Footer';
import Header from './Header';
import ModalComponent from './Modal';
import ModalContent from './ModalContent';
import Restart from './Restart';
import TimeCategory from './TimeCategory';
import UserTyped from './UserTyped';
import WordContainer from './WordContainer';
import WordWrapper from './WordWrapper';
import MobileNotSupported from './MobileNotSupported';
import { useState } from 'react';
import LanguageSelect from './SimpleLanguageSelect';

function NormalMode() {
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

export default NormalMode;
