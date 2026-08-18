import { useEffect, useState } from 'react';

interface UseAutoResetResult {
  secondsLeft: number;
}

/** Cuenta regresiva que ejecuta onComplete una única vez al llegar a 0 (pantalla Final). */
export function useAutoReset(durationSeconds: number, onComplete: () => void): UseAutoResetResult {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete();
      return;
    }

    const timeoutId = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  return { secondsLeft };
}
