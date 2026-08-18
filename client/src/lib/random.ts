/** Índice aleatorio dentro de [0, length); evita repetir excludeIndex cuando hay más de un elemento. */
export function pickRandomIndex(length: number, excludeIndex?: number): number {
  if (length <= 1) return 0;

  let index = Math.floor(Math.random() * length);
  while (index === excludeIndex) {
    index = Math.floor(Math.random() * length);
  }
  return index;
}
