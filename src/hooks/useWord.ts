import { useState, useCallback } from 'react';
import { paragraphs } from '../utils/paragraphs';

type LanguageType = 'python' | 'javascript' | 'c';

export const useWord = (selectedLanguage: LanguageType) => {
  // Keep track of which paragraph we're on
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  
// Function to get paragraphs based on selected language
const getParagraphsForLanguage = useCallback((language: LanguageType) => {
  switch (language) {
    case 'python':
      return paragraphs["python"];
    case 'javascript':
      return paragraphs["javascript"];
    case 'c':
      return paragraphs["c"];
    default:
      return paragraphs["python"]; // default fallback
  }
}, []);
  
  // Initialize with the first paragraph of selected language
  const [word, setWord] = useState<string>(() => {
    const paragraphs = getParagraphsForLanguage(selectedLanguage);
    return paragraphs[0] + ' ';
  });

  const [totalWord, setTotalWord] = useState<string>(word);

  const appendWord = useCallback((word: string) => {
    setTotalWord((prev) => prev + word);
  }, []);

  const eraseWord = useCallback((word: string) => {
    setTotalWord(word);
  }, []);

  const updateWord = useCallback(
    (erase = false) => {
      setWord(() => {
        const paragraphs = getParagraphsForLanguage(selectedLanguage);
        // Get next paragraph (cycle back to start if we reach the end)
        const nextIndex = (currentParagraphIndex + 1) % paragraphs.length;
        setCurrentParagraphIndex(nextIndex);
        
        const nextParagraph = paragraphs[nextIndex] + ' ';
        
        if (erase) eraseWord(nextParagraph);
        else appendWord(nextParagraph);
        
        return nextParagraph;
      });
    },
    [currentParagraphIndex, appendWord, eraseWord, selectedLanguage, getParagraphsForLanguage]
  );

  // Reset function for when language changes
  const resetWord = useCallback(() => {
    const paragraphs = getParagraphsForLanguage(selectedLanguage);
    setCurrentParagraphIndex(0);
    const firstParagraph = paragraphs[0] + ' ';
    setWord(firstParagraph);
    setTotalWord(firstParagraph);
  }, [selectedLanguage, getParagraphsForLanguage]);

  return {
    word,
    totalWord,
    updateWord,
    resetWord
  };
};

