import { useEffect } from 'react';
import { useAudio } from '@/context/AudioContext';
import { ENABLE_BACKGROUND_MUSIC } from '@/lib/constants';

/**
 * Reproduce la música de fondo indicada mientras el componente está montado.
 * Controlado por ENABLE_BACKGROUND_MUSIC (client/src/lib/constants.ts) — en false no suena
 * nada, pero no borra ni desconecta los archivos de música.
 */
export function useBackgroundMusic(src: string | null): void {
  const { playBackgroundMusic, stopBackgroundMusic } = useAudio();

  useEffect(() => {
    if (!src || !ENABLE_BACKGROUND_MUSIC) return;
    playBackgroundMusic(src);
    return () => stopBackgroundMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
}
