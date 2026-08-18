import { useCallback, useEffect, useRef, useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import { useGameContext } from '@/context/GameContext';
import { GAME_DURATION_SECONDS } from '@/lib/constants';
import { fetchAIConfig } from '@/services/api';
import { AIConfig } from '@/types/ai.types';
import { CharacterId } from '@/types/character.types';
import { ensureAIWins, useAIScore } from './useAIScore';
import { useNotifications } from './useNotifications';
import { TimerColorPhase, useTimer } from './useTimer';

const DEFAULT_AI_CONFIG: AIConfig = { growthFactor: 3, multiplier: 0.5 };

interface UseGameEngineOptions {
  characterId: CharacterId;
  onFinish: () => void;
}

interface UseGameEngineResult {
  secondsLeft: number;
  colorPhase: TimerColorPhase;
  isPulsing: boolean;
  playerScore: number;
  aiScore: number;
  activeNotification: ReturnType<typeof useNotifications>['activeNotification'];
  isReady: boolean;
  start: () => void;
  registerAnswer: (isCorrect: boolean) => void;
}

/** Motor de juego compartido por los 3 minijuegos: temporizador, score, IA y notificaciones. */
export function useGameEngine({ characterId, onFinish }: UseGameEngineOptions): UseGameEngineResult {
  const { score, setPlayerScore, setAiScore, notificationMode } = useGameContext();
  const { playSfx } = useAudio();
  const [aiConfig, setAiConfig] = useState<AIConfig>(DEFAULT_AI_CONFIG);
  const [isReady, setIsReady] = useState(false);
  const { activeNotification, notify } = useNotifications(notificationMode);

  // El score ya se reinicia en GameContext.selectCharacter (ver GamePage), así que aquí
  // solo se carga la configuración de IA correspondiente a este personaje.
  useEffect(() => {
    setIsReady(false);
    let cancelled = false;

    fetchAIConfig(characterId).then((config) => {
      if (cancelled) return;
      setAiConfig(config);
      setIsReady(true);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  // Refs "vivas": handleExpire es capturado una única vez por useTimer, así que lee estos
  // valores por referencia en vez de por closure para tener siempre el dato más reciente.
  const liveAiScoreRef = useRef(0);
  const playerScoreRef = useRef(score.player);
  playerScoreRef.current = score.player;

  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const handleExpire = useCallback(() => {
    setAiScore(ensureAIWins(liveAiScoreRef.current, playerScoreRef.current));
    onFinishRef.current();
  }, [setAiScore]);

  const timer = useTimer({ durationSeconds: GAME_DURATION_SECONDS, onExpire: handleExpire });
  const liveAiScore = useAIScore(aiConfig, timer.elapsedSeconds, score.player);
  liveAiScoreRef.current = liveAiScore;

  useEffect(() => {
    setAiScore(liveAiScore);
  }, [liveAiScore, setAiScore]);

  // Beep de cuenta regresiva en los últimos TIMER_DANGER_THRESHOLD segundos (uno por tick).
  useEffect(() => {
    if (timer.isPulsing) {
      playSfx('timer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.secondsLeft]);

  const registerAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isCorrect) {
        setPlayerScore((prev) => prev + 1);
        notify('correct');
        playSfx('correct');
      } else {
        notify('incorrect');
        playSfx('incorrect');
      }
    },
    [setPlayerScore, notify, playSfx]
  );

  return {
    secondsLeft: timer.secondsLeft,
    colorPhase: timer.colorPhase,
    isPulsing: timer.isPulsing,
    playerScore: score.player,
    aiScore: score.ai,
    activeNotification,
    isReady,
    start: timer.start,
    registerAnswer,
  };
}
