import { createContext, ReactNode, useCallback, useContext, useMemo, useRef } from 'react';

export type SfxName = 'correct' | 'incorrect' | 'timer';

interface AudioContextValue {
  playBackgroundMusic: (src: string) => void;
  stopBackgroundMusic: () => void;
  playSfx: (name: SfxName) => void;
}

const SFX_SRC: Record<SfxName, string> = {
  correct: '/assets/audio/correct.mp3',
  incorrect: '/assets/audio/incorrect.mp3',
  timer: '/assets/audio/timer.mp3',
};

const AudioCtx = createContext<AudioContextValue | null>(null);

/** Reproduce con manejo de error silencioso: los archivos son placeholders y pueden estar vacíos/ausentes. */
function safePlay(audio: HTMLAudioElement) {
  audio.currentTime = 0;
  audio.play().catch(() => {
    // TODO: reemplazar por audio real. Se ignora el error de reproducción del placeholder.
  });
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const sfxRefs = useRef<Partial<Record<SfxName, HTMLAudioElement>>>({});

  const playBackgroundMusic = useCallback((src: string) => {
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current = null;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    bgAudioRef.current = audio;
    safePlay(audio);
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    bgAudioRef.current?.pause();
    bgAudioRef.current = null;
  }, []);

  const playSfx = useCallback((name: SfxName) => {
    let audio = sfxRefs.current[name];
    if (!audio) {
      audio = new Audio(SFX_SRC[name]);
      audio.volume = 0.7;
      sfxRefs.current[name] = audio;
    }
    safePlay(audio);
  }, []);

  const value = useMemo(
    () => ({ playBackgroundMusic, stopBackgroundMusic, playSfx }),
    [playBackgroundMusic, stopBackgroundMusic, playSfx]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio debe usarse dentro de <AudioProvider>');
  return ctx;
}
