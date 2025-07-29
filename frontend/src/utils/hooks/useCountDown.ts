import { useEffect, useRef, useState } from 'react';

export const useCountDown: (
  total: number,
  ms?: number
) => {
  counter: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  startCountDown: boolean;
} = (total: number, ms: number = 1000) => {
  const [counter, setCountDown] = useState(total);
  const [startCountDown, setStartCountDown] = useState(false);

  const intervalId = useRef<NodeJS.Timeout>();
  const start: () => void = () => setStartCountDown(true);
  const pause: () => void = () => setStartCountDown(false);
  const reset: () => void = () => {
    clearInterval(intervalId.current);
    setStartCountDown(false);
    setCountDown(total);
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      startCountDown && counter > 0 && setCountDown(counter => counter - 1);
    }, ms);
    // Clear interval when count to zero
    if (counter === 0) {
      clearInterval(intervalId.current);
      reset();
    }
    // Clear interval when unmount
    return () => clearInterval(intervalId.current);
  }, [startCountDown, counter, ms, reset]);

  return { counter, start, pause, reset, startCountDown };
};
