import { CharacterId } from './character.types';

export type GamePhase = 'ready' | 'playing' | 'finished';

export type NotificationMode = 'visual' | 'incremental';

export type NotificationKind = 'correct' | 'incorrect' | null;

export interface ScoreState {
  player: number;
  ai: number;
}

/** Metadata de reclamación — personaje Brisa */
export interface ClaimItem {
  id: string;
  /** Nombre de archivo dentro de client/public/assets/brisa/ (sin ruta) — ver ChatBubble.tsx */
  image: string;
  /** [TEXTO A REEMPLAZAR] descripción de la reclamación, mostrada como mensaje de chat */
  description: string;
  answer: 'correcto' | 'incorrecto';
}

export type ApplicantDepartment = 'Sistemas' | 'Marketing' | 'Contabilidad' | 'Tienda';

export type ApplicantSex = 'M' | 'F';

/** Metadata de postulante — personaje Renata (tarjeta de perfil, sin fotografía) */
export interface ApplicantItem {
  id: string;
  /** [NOMBRE A REEMPLAZAR] — perfil ficticio de ejemplo */
  nombre: string;
  edad: number;
  sexo: ApplicantSex;
  lugar: string;
  carrera: string;
  universidad: string;
  department: ApplicantDepartment;
}

/** Metadata de ticket de caja — personaje Victoria (recibo ficticio, sin fotografía) */
export interface BoxItem {
  id: string;
  folio: number;
  sucursal: number;
  direccion: string;
  region: string;
  cajero: string;
  caja: number;
  gerente: string;
  /** null = monto ilegible/en blanco (ticket siempre incorrecto, sin importar la zona) */
  amount: number | null;
}

export interface GameContextValue {
  selectedCharacterId: CharacterId | null;
  selectCharacter: (id: CharacterId) => void;
  score: ScoreState;
  setPlayerScore: (updater: (prev: number) => number) => void;
  setAiScore: (value: number) => void;
  resetScore: () => void;
  notificationMode: NotificationMode;
  resetGame: () => void;
}
