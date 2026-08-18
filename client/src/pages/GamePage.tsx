import { lazy, Suspense, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import charactersData from '@/data/characters.json';
import { useGameContext } from '@/context/GameContext';
import { useBackgroundMusic } from '@/hooks/useAudioPlayer';
import { Character, CharacterId } from '@/types/character.types';

const BrisaGame = lazy(() => import('@/components/minigames/brisa/BrisaGame').then((m) => ({ default: m.BrisaGame })));
const RenataGame = lazy(() =>
  import('@/components/minigames/renata/RenataGame').then((m) => ({ default: m.RenataGame }))
);
const VictoriaGame = lazy(() =>
  import('@/components/minigames/victoria/VictoriaGame').then((m) => ({ default: m.VictoriaGame }))
);

const CHARACTERS = charactersData as Character[];
const VALID_IDS: CharacterId[] = ['brisa', 'renata', 'victoria'];

export function GamePage() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const { selectCharacter } = useGameContext();

  const isValid = VALID_IDS.includes(characterId as CharacterId);
  const character = CHARACTERS.find((c) => c.id === characterId);

  useBackgroundMusic(isValid ? character?.musicSrc ?? null : null);

  useEffect(() => {
    if (isValid) selectCharacter(characterId as CharacterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  if (!isValid || !character) {
    return <Navigate to="/" replace />;
  }

  function handleFinish() {
    navigate('/resultados');
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white/50">Cargando...</div>}>
        {character.id === 'brisa' && <BrisaGame onFinish={handleFinish} />}
        {character.id === 'renata' && <RenataGame onFinish={handleFinish} />}
        {character.id === 'victoria' && <VictoriaGame onFinish={handleFinish} />}
      </Suspense>
    </div>
  );
}
