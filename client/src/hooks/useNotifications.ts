import { useCallback, useRef, useState } from 'react';
import { NotificationKind, NotificationMode } from '@/types/game.types';

const VISIBLE_DURATION_MS = 900;

interface UseNotificationsResult {
  activeNotification: NotificationKind;
  notify: (kind: 'correct' | 'incorrect') => void;
}

export function useNotifications(mode: NotificationMode): UseNotificationsResult {
  const [activeNotification, setActiveNotification] = useState<NotificationKind>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback(
    (kind: 'correct' | 'incorrect') => {
      if (mode === 'incremental') {
        // TODO: implementar modo incremental (p. ej. contador acumulativo sin animación de estrés).
        return;
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveNotification(kind);
      timeoutRef.current = setTimeout(() => setActiveNotification(null), VISIBLE_DURATION_MS);
    },
    [mode]
  );

  return { activeNotification, notify };
}
