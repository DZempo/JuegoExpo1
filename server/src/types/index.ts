export type CharacterId = 'brisa' | 'renata' | 'victoria';

export interface CharacterSummary {
  id: CharacterId;
  name: string;
  role: string;
  colorHex: string;
}

export interface AIConfig {
  growthFactor: number;
  multiplier: number;
}

export interface FinalText {
  title: string;
  description: string;
}
