import { useEffect, useRef, useState } from 'react';
import { getPreloadableImageUrls } from '@/lib/assets';

export interface ImagePreloadProgress {
  /** Imágenes ya descargadas (o fallidas: se cuentan igual para no bloquear el progreso). */
  loaded: number;
  total: number;
  isComplete: boolean;
}

/**
 * Descarga todas las imágenes del juego una sola vez al arrancar la app, para que el
 * navegador las sirva desde caché en cada partida en vez de pedirlas de nuevo.
 *
 * Mantiene una referencia a cada Image() en un módulo para que el recolector de basura
 * no descarte la decodificación mientras la app viva (importante en modo kiosco).
 */
const preloadedImages: HTMLImageElement[] = [];
let hasStartedPreload = false;

export function useImagePreloader(): ImagePreloadProgress {
  const urlsRef = useRef<string[]>(getPreloadableImageUrls());
  const [loaded, setLoaded] = useState(0);
  const total = urlsRef.current.length;

  useEffect(() => {
    // Solo se precarga una vez por sesión, aunque el hook se vuelva a montar.
    if (hasStartedPreload) {
      setLoaded(total);
      return;
    }
    hasStartedPreload = true;

    let cancelled = false;

    urlsRef.current.forEach((url) => {
      const image = new Image();
      preloadedImages.push(image);

      // Una imagen rota no debe dejar el progreso atorado: cuenta igual que una cargada.
      const markDone = () => {
        if (cancelled) return;
        setLoaded((prev) => prev + 1);
      };

      image.onload = markDone;
      image.onerror = markDone;
      image.src = url;
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loaded, total, isComplete: loaded >= total };
}
