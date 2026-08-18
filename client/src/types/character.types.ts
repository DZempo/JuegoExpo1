export type CharacterId = 'brisa' | 'renata' | 'victoria';

export interface Character {
  id: CharacterId;
  /** [NOMBRE A REEMPLAZAR] */
  name: string;
  /** [TEXTO A REEMPLAZAR] rol/cargo mostrado bajo el nombre */
  role: string;
  colorHex: string;
  /** [IMAGEN A REEMPLAZAR] ruta de la imagen de personaje (carrusel + pantalla final) */
  image: string;
  /** [AUDIO A REEMPLAZAR] música de fondo del minijuego de este personaje */
  musicSrc: string;
  /** [VIDEO A REEMPLAZAR] fondo de la pantalla de Resultados, uno distinto por personaje */
  resultsVideoSrc: string;
}
