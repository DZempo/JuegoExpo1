import charactersData from '@/data/characters.json';
import claimsData from '@/data/brisa/claims.json';
import { Character } from '@/types/character.types';
import { ClaimItem } from '@/types/game.types';

const BRISA_ASSETS_BASE = '/assets/brisa/';

/** Logo mostrado dentro del ticket de Victoria (ver TicketCard.tsx). */
export const NETO_LOGO_SRC = '/assets/victoria/Neto-Blanco.png';

/** claims.json guarda solo el nombre de archivo (p. ej. "img002.jpeg"); aquí se arma la ruta pública real. */
export function resolveClaimImageSrc(image: string): string {
  return image.startsWith('/') || image.startsWith('http') ? image : `${BRISA_ASSETS_BASE}${image}`;
}

/**
 * Todas las imágenes que la app puede llegar a mostrar durante una partida.
 * Se usa para precargarlas al inicio (ver useImagePreloader) y que no se descarguen
 * en cada ronda/minijuego. Renata y Victoria no tienen fotos: sus tarjetas son
 * HTML/SVG, salvo el logo del ticket.
 */
export function getPreloadableImageUrls(): string[] {
  const characterImages = (charactersData as Character[]).map((character) => character.image);
  const brisaClaimImages = (claimsData as ClaimItem[]).map((claim) => resolveClaimImageSrc(claim.image));

  return Array.from(new Set([...characterImages, ...brisaClaimImages, NETO_LOGO_SRC]));
}
