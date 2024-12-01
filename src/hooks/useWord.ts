import { useState, useCallback } from 'react';
import { paragraphs } from '../utils/paragraphs';

export const useWord = () => {
  // Keep track of which paragraph we're on
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  
  // Initialize with the first paragraph
  const [word, setWord] = useState<string>(
    () => paragraphs[0] + ' '
  );
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
        // Get next paragraph (cycle back to start if we reach the end)
        const nextIndex = (currentParagraphIndex + 1) % paragraphs.length;
        setCurrentParagraphIndex(nextIndex);
        
        const nextParagraph = paragraphs[nextIndex] + ' ';
        
        if (erase) eraseWord(nextParagraph);
        else appendWord(nextParagraph);
        
        return nextParagraph;
      });
    },
    [currentParagraphIndex, appendWord, eraseWord]
  );

  return {
    word,
    totalWord,
    updateWord,
  };
};
