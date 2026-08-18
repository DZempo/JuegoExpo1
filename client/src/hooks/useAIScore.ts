import { useMemo } from 'react';
import { AIConfig } from '@/types/ai.types';

/**
 * iaScore = elapsedSeconds * growthFactor + playerScore * multiplier
 * Fórmula configurable desde backend (ver services/api.ts -> fetchAIConfig).
 */
export function useAIScore(config: AIConfig, elapsedSeconds: number, playerScore: number): number {
  return useMemo(() => {
    const raw = elapsedSeconds * config.growthFactor + playerScore * config.multiplier;
    return Math.round(raw * 10) / 10;
  }, [config, elapsedSeconds, playerScore]);
}

/** Garantiza que la IA nunca termine empatada o por debajo del jugador, sin verse como un valor fijo. */
export function ensureAIWins(aiScore: number, playerScore: number): number {
  if (aiScore > playerScore) return aiScore;
  const margin = 1 + Math.round(Math.random() * 3);
  return playerScore + margin;
}
