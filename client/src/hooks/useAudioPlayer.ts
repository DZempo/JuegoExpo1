import { useEffect } from 'react';
import { useAudio } from '@/context/AudioContext';

/** Reproduce la música de fondo indicada mientras el componente está montado. */
export function useBackgroundMusic(src: string | null): void {
  const { playBackgroundMusic, stopBackgroundMusic } = useAudio();

  useEffect(() => {
    if (!src) return;
    playBackgroundMusic(src);
    return () => stopBackgroundMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
}
