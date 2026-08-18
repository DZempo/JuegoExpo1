import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';
import { VideoPlaceholder } from '@/components/common/VideoPlaceholder';
import { useGameContext } from '@/context/GameContext';
import { useAutoReset } from '@/hooks/useAutoReset';
import { useBackgroundMusic } from '@/hooks/useAudioPlayer';
import charactersData from '@/data/characters.json';
import { FINAL_SCREEN_DURATION_SECONDS } from '@/lib/constants';
import { fetchFinalText } from '@/services/api';
import { FinalText } from '@/types/ai.types';
import { Character } from '@/types/character.types';

const CHARACTERS = charactersData as Character[];

export function FinalPage() {
  const navigate = useNavigate();
  const { selectedCharacterId, resetGame } = useGameContext();
  const [finalText, setFinalText] = useState<FinalText | null>(null);

  const character = CHARACTERS.find((c) => c.id === selectedCharacterId);

  useBackgroundMusic('/assets/audio/music.mp3');

  useEffect(() => {
    if (!selectedCharacterId) return;
    setFinalText(null);
    fetchFinalText(selectedCharacterId).then(setFinalText);
  }, [selectedCharacterId]);

  const { secondsLeft } = useAutoReset(FINAL_SCREEN_DURATION_SECONDS, () => {
    resetGame();
    navigate('/');
  });

  if (!selectedCharacterId || !character) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative flex-1 flex flex-col">
      <VideoPlaceholder src="/assets/video/final.mp4" className="absolute inset-0 w-full h-full" muted={false} />
      <div className="absolute inset-0 bg-navy-950/70" />

      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 lg:gap-10 px-6 text-center">
        <ImagePlaceholder
          label={character.name}
          colorHex={character.colorHex}
          imageSrc={character.image}
          className="w-48 lg:w-64 aspect-[2/3]"
        />

        <div className="flex flex-col gap-2 max-w-xs lg:max-w-md">
          <h2 className="text-xl lg:text-3xl font-bold">{finalText?.title ?? 'Cargando texto final...'}</h2>
          <p className="text-white/70 lg:text-lg">{finalText?.description ?? ''}</p>
        </div>

        <p className="text-xs lg:text-sm text-white/40">Reinicio automático en {secondsLeft}s</p>
      </div>
    </div>
  );
}
