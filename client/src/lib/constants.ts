import { CharacterId } from '@/types/character.types';

// Música de fondo (portada/final + música por personaje durante el minijuego). Cambiar a
// true para reactivarla — los efectos de sonido (correcto/incorrecto/timer) no dependen de esto.
export const ENABLE_BACKGROUND_MUSIC = false;

export const GAME_DURATION_SECONDS = 30;
export const TIMER_WARNING_THRESHOLD = 15; // <=15s -> amarillo
export const TIMER_DANGER_THRESHOLD = 10; // <=10s -> rojo + pulse
export const FINAL_SCREEN_DURATION_SECONDS = 15;

export const API_BASE_URL = 'http://localhost:4000/api';

export function localRecordKey(characterId: CharacterId): string {
  return `seria:record:${characterId}`;
}

export const ROUTES = {
  home: '/',
  game: (characterId: CharacterId | string = ':characterId') => `/juego/${characterId}`,
  results: '/resultados',
  final: '/final',
} as const;
