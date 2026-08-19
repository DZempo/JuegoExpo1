import { useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { ScoreBoard } from '@/components/common/ScoreBoard';
import { VideoPlaceholder } from '@/components/common/VideoPlaceholder';
import charactersData from '@/data/characters.json';
import { useGameContext } from '@/context/GameContext';
import { useLocalRecord } from '@/hooks/useLocalRecord';
import { Character } from '@/types/character.types';

const CHARACTERS = charactersData as Character[];

export function ResultsPage() {
  const navigate = useNavigate();
  const { selectedCharacterId, score } = useGameContext();
  const { record, updateRecord } = useLocalRecord(selectedCharacterId);
  const hasUpdatedRef = useRef(false);

  const character = CHARACTERS.find((c) => c.id === selectedCharacterId);

  useEffect(() => {
    if (hasUpdatedRef.current) return;
    hasUpdatedRef.current = true;
    updateRecord(score.player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedCharacterId || !character) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative flex-1 flex flex-col">
      <VideoPlaceholder src={character.resultsVideoSrc} className="absolute inset-0 w-full h-full" muted={false} />
      <div className="absolute inset-0 bg-navy-950/70" />

      <div className="relative flex-1 flex flex-col items-center justify-center gap-5 lg:gap-8 px-6 text-center">
        <h1 className="text-2xl lg:text-4xl font-extrabold">Resultados</h1>

        <div className="w-full max-w-md">
          <ScoreBoard playerScore={score.player} aiScore={score.ai} />
        </div>

        <p className="text-white/70 lg:text-xl">
          Récord personal: <span className="font-bold text-white">{Math.max(record, score.player)}</span>
        </p>

        <Button onClick={() => navigate('/final')}>Aceptar derrota</Button>
      </div>
    </div>
  );
}
