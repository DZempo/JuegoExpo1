import localAiConfig from '@/data/aiConfig.json';
import localCharacters from '@/data/characters.json';
import localFinalTexts from '@/data/finalTexts.json';
import { API_BASE_URL } from '@/lib/constants';
import { AIConfig, FinalText } from '@/types/ai.types';
import { Character, CharacterId } from '@/types/character.types';

const FETCH_TIMEOUT_MS = 2000;

async function safeFetchJson<T>(url: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // Backend no disponible: se recurre a los datos mock locales.
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchCharacters(): Promise<Character[]> {
  const local = localCharacters as Character[];
  const remote = await safeFetchJson<Array<{ id: CharacterId; name: string; role: string; colorHex: string }>>(
    `${API_BASE_URL}/characters`
  );

  if (!remote) return local;

  return local.map((character) => {
    const override = remote.find((item) => item.id === character.id);
    return override ? { ...character, ...override } : character;
  });
}

export async function fetchAIConfig(characterId: CharacterId): Promise<AIConfig> {
  const remote = await safeFetchJson<AIConfig>(`${API_BASE_URL}/ai-config/${characterId}`);
  if (remote) return remote;

  const local = localAiConfig as Record<CharacterId, AIConfig>;
  return local[characterId];
}

export async function fetchFinalText(characterId: CharacterId): Promise<FinalText> {
  const remote = await safeFetchJson<FinalText>(`${API_BASE_URL}/final-text/${characterId}`);
  if (remote) return remote;

  const local = localFinalTexts as Record<CharacterId, FinalText>;
  return local[characterId];
}
