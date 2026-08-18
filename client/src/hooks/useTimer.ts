import { useCallback, useEffect, useRef, useState } from 'react';
import { TIMER_DANGER_THRESHOLD, TIMER_WARNING_THRESHOLD } from '@/lib/constants';

export type TimerColorPhase = 'green' | 'yellow' | 'red';

interface UseTimerOptions {
  durationSeconds: number;
  onExpire: () => void;
  autoStart?: boolean;
}

interface UseTimerResult {
  secondsLeft: number;
  elapsedSeconds: number;
  colorPhase: TimerColorPhase;
  isPulsing: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer({ durationSeconds, onExpire, autoStart = false }: UseTimerOptions): UseTimerResult {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsRunning(false);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(durationSeconds);
  }, [durationSeconds]);

  const colorPhase: TimerColorPhase =
    secondsLeft <= TIMER_DANGER_THRESHOLD ? 'red' : secondsLeft <= TIMER_WARNING_THRESHOLD ? 'yellow' : 'green';

  return {
    secondsLeft,
    elapsedSeconds: durationSeconds - secondsLeft,
    colorPhase,
    isPulsing: secondsLeft <= TIMER_DANGER_THRESHOLD && secondsLeft > 0,
    start,
    pause,
    reset,
  };
}
