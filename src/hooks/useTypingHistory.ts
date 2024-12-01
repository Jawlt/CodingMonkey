import { useState, useCallback } from 'react';

export const useTypingHistory = () => {
  const [watchHistory, setWatchHistory] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completedTime, setCompletedTime] = useState<number>(0);

  const recordKeypress = useCallback((char: string) => {
    setWatchHistory(prev => prev + char);
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [startTime]);

  const finishTyping = useCallback(() => {
    if (startTime) {
      setCompletedTime(Date.now() - startTime);
    }
  }, [startTime]);

  const reset = useCallback(() => {
    setWatchHistory('');
    setStartTime(null);
    setCompletedTime(0);
  }, []);

  return {
    watchHistory,
    totalTime: startTime ? Date.now() - startTime : 0,
    completedTime,
    recordKeypress,
    finishTyping,
    reset
  };
};