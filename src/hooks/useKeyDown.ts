import { useState, useEffect, useCallback } from 'react';

import { useCursorPosition } from './useCursorPosition';
import { isAllowedCode } from '../utils';

type TypingState = 'idle' | 'start' | 'typing';

export const useKeyDown = (active: boolean) => {
  const [typingState, setTypingState] = useState<TypingState>('idle');
  const [charTyped, setCharTyped] = useState<string>('');
  const [totalCharacterTyped, setTotalCharacterTyped] = useState<string>('');

  const { cursorPosition, updateCursorPosition, resetCursorPointer } =
    useCursorPosition();
    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        const { key, code } = event;
    
        if (!active) return;
    
        // Handle Backspace
        if (key === 'Backspace') {
          if (charTyped.length > 0 && cursorPosition > 0) {
            setCharTyped((prev) => prev.slice(0, charTyped.length - 1));
            setTotalCharacterTyped((prev) =>
              prev.slice(0, totalCharacterTyped.length - 1)
            );
            updateCursorPosition('decrease');
          }
          return;
        }
    
        // Handle Enter key like Space
        if (key === 'Enter') {
          setCharTyped((prev) => prev + ' ');
          setTotalCharacterTyped((prev) => prev + ' ');
          updateCursorPosition('increase');
          return;
        }
    
        // Handle Tab key
        if (key === 'Tab') {
          event.preventDefault();
          const tabCharacter = '    ';
          setCharTyped((prev) => prev + tabCharacter);
          setTotalCharacterTyped((prev) => prev + tabCharacter);
          updateCursorPosition('increase');
          return;
        }
    
        // Check for printable characters
        if (isPrintableChar(key)) {
          if (typingState === 'idle') {
            setTypingState('start');
          }
    
          setCharTyped((prev) => prev + key);
          setTotalCharacterTyped((prev) => prev + key);
          updateCursorPosition('increase');
        }
      },
      [
        active,
        charTyped.length,
        cursorPosition,
        updateCursorPosition,
        typingState,
        totalCharacterTyped,
      ]
    );
    
    
    // Helper function to check if a character is printable
    const isPrintableChar = (key: string): boolean => {
      return (
        key.length === 1 || // Single character
        (key.startsWith('Arrow') && key.length > 5) || // Special characters like brackets, parentheses
        ['Tab', 'Enter', 'Backspace'].includes(key)
      );
    };

  const resetCharTyped = useCallback(() => {
    setCharTyped('');
  }, [setCharTyped]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return {
    charTyped,
    totalCharacterTyped,
    setTotalCharacterTyped,
    cursorPosition,
    resetCharTyped,
    resetCursorPointer,
    typingState,
    setTypingState,
  };
};
