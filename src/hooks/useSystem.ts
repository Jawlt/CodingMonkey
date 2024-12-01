import { useCallback, useState } from 'react';

import { useCountdown } from './useCountdown';
import { useKeyDown } from './useKeyDown';
import { useLocalStorage } from './useLocalStorage';
import { useModal } from './useModal';
import { useWord } from './useWord';

import {
  calculateAccuracy,
  calculateErrorPercentage,
  calculateWPM,
} from '../utils';

import type { Results } from '../types';
import type { HistoryType } from '../types';

export const useSystem = () => {
  const [results, setResults] = useState<Results>({
    accuracy: 0,
    wpm: 0,
    cpm: 0,
    error: 0,
  });

  const [history, setHistory] = useState<HistoryType>({
    wordHistory: '',
    typedHistory: '',
  });

  const { setLocalStorageValue, getLocalStorageValue } = useLocalStorage();
  const [wordContainerFocused, setWordContainerFocused] = useState(false);
  const [time, setTime] = useState(() => getLocalStorageValue('time') || 15000);
  const { countdown, resetCountdown, startCountdown } = useCountdown(time);
  const { word, updateWord, totalWord } = useWord();
  const {
    charTyped,
    typingState,
    cursorPosition,
    totalCharacterTyped,
    resetCharTyped,
    resetCursorPointer,
    setTotalCharacterTyped,
    setTypingState,
  } = useKeyDown(wordContainerFocused);
  const { modalIsOpen, aboutModal, openModal, closeModal } = useModal();

  const restartTest = useCallback(() => {
    resetCountdown();
    updateWord(true);
    resetCursorPointer();
    resetCharTyped();
    setTypingState('idle');
    setTotalCharacterTyped('');
  }, [
    resetCountdown,
    updateWord,
    resetCursorPointer,
    resetCharTyped,
    setTypingState,
    setTotalCharacterTyped,
  ]);

  const checkCharacter = useCallback(
    (index: number) => {
      if (charTyped[index] === word[index]) {
        return true;
      } else {
        return false;
      }
    },
    [charTyped, word]
  );

  if (word.length === charTyped.length) {
    updateWord();
    resetCharTyped();
    resetCursorPointer();
  }

  if (typingState === 'start') {
    startCountdown();
    setTypingState('typing');
  }

  const saveTestResult = async (testData: {
    wpm: number;
    cpm: number;
    accuracy: number;
    error: number;
    watchHistory: string;
    fullString: string;
    score: number;
  }) => {
    try {
      const response = await fetch('http://localhost:3000/api/test-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (!response.ok) {
        throw new Error('Failed to save test result');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving test result:', error);
      throw error;
    }
  };

  // Calculate score based on WPM, accuracy, and error rate
  const calculateScore = (wpm: number, accuracy: number, error: number) => {
    // This is a sample scoring formula - adjust as needed
    return Math.round((wpm * (accuracy / 100) * (1 - error / 100)));
  };

  if (countdown === 0) {
    (async () => {  // Create an immediately invoked async function
      const { accuracy } = calculateAccuracy(totalWord, totalCharacterTyped);
      const { wpm, cpm } = calculateWPM(totalCharacterTyped, accuracy, time);
      const error = calculateErrorPercentage(accuracy);
  
      console.log('Test completed with values:', { wpm, cpm, accuracy, error });
  
      const watchHistory = JSON.stringify({
        timestamp: new Date().toISOString(),
        duration: time,
        wordsTyped: totalCharacterTyped.split(' ').length,
      });
  
      const fullString = totalWord;
      const calculatedScore = calculateScore(wpm, accuracy, error);
  
      const testData = {
        wpm,
        cpm,
        accuracy,
        error,
        watchHistory,
        fullString,
        score: calculatedScore
      };
  
      console.log('Attempting to save test data:', testData);
  
      try {
        const result = await saveTestResult(testData);
        console.log('Save result:', result);
      } catch (err) {
        console.error('Error saving test:', err);
      }
  
      setResults({
        accuracy,
        wpm,
        cpm,
        error,
      });
  
      setHistory({
        wordHistory: totalWord,
        typedHistory: totalCharacterTyped,
      });
  
      openModal('result');
      restartTest();
    })();  // Immediately invoke the async function
  }
  

  return {
    charTyped,
    countdown,
    cursorPosition,
    modalIsOpen,
    aboutModal,
    results,
    time,
    history,
    word,
    wordContainerFocused,
    setWordContainerFocused,
    setTime,
    resetCountdown,
    setLocalStorageValue,
    updateWord,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
  };
};
