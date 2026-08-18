import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { CharacterId } from '@/types/character.types';
import { GameContextValue, NotificationMode, ScoreState } from '@/types/game.types';

const INITIAL_SCORE: ScoreState = { player: 0, ai: 0 };

// Modo de notificación activo por defecto. 'incremental' queda preparado para el futuro (ver useNotifications).
const DEFAULT_NOTIFICATION_MODE: NotificationMode = 'visual';

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [selectedCharacterId, setSelectedCharacterId] = useState<CharacterId | null>(null);
  const [score, setScore] = useState<ScoreState>(INITIAL_SCORE);
  const [notificationMode] = useState<NotificationMode>(DEFAULT_NOTIFICATION_MODE);

  const selectCharacter = useCallback((id: CharacterId) => {
    setSelectedCharacterId(id);
    setScore(INITIAL_SCORE);
  }, []);

  const setPlayerScore = useCallback((updater: (prev: number) => number) => {
    setScore((prev) => ({ ...prev, player: updater(prev.player) }));
  }, []);

  const setAiScore = useCallback((value: number) => {
    setScore((prev) => ({ ...prev, ai: value }));
  }, []);

  const resetScore = useCallback(() => {
    setScore(INITIAL_SCORE);
  }, []);

  const resetGame = useCallback(() => {
    setSelectedCharacterId(null);
    setScore(INITIAL_SCORE);
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      selectedCharacterId,
      selectCharacter,
      score,
      setPlayerScore,
      setAiScore,
      resetScore,
      notificationMode,
      resetGame,
    }),
    [selectedCharacterId, selectCharacter, score, setPlayerScore, setAiScore, resetScore, notificationMode, resetGame]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext debe usarse dentro de <GameProvider>');
  return ctx;
}
