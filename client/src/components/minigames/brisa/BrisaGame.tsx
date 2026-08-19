import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/common/Button';
import { GameSidebar } from '@/components/common/GameSidebar';
import { NotificationBubble } from '@/components/common/NotificationBubble';
import { useGameEngine } from '@/hooks/useGameEngine';
import claims from '@/data/brisa/claims.json';
import { GAME_DURATION_SECONDS } from '@/lib/constants';
import { pickRandomIndex } from '@/lib/random';
import { ClaimItem } from '@/types/game.types';
import { BrisaReplyBubble } from './BrisaReplyBubble';
import { ChatBubble } from './ChatBubble';

const CLAIMS = claims as ClaimItem[];

type ClaimAnswer = 'correcto' | 'incorrecto';

interface ChatRound {
  claim: ClaimItem;
  playerAnswer: ClaimAnswer | null;
}

interface BrisaGameProps {
  onFinish: () => void;
}

export function BrisaGame({ onFinish }: BrisaGameProps) {
  const [phase, setPhase] = useState<'intro' | 'playing'>('intro');
  const [rounds, setRounds] = useState<ChatRound[]>([]);
  const engine = useGameEngine({ characterId: 'brisa', onFinish });
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [rounds.length]);

  function handleStart() {
    const firstIndex = pickRandomIndex(CLAIMS.length);
    currentIndexRef.current = firstIndex;
    setPhase('playing');
    setRounds([{ claim: CLAIMS[firstIndex], playerAnswer: null }]);
    engine.start();
  }

  function handleAnswer(answer: ClaimAnswer) {
    const current = rounds[rounds.length - 1];
    if (!current || current.playerAnswer) return;

    engine.registerAnswer(answer === current.claim.answer);

    const nextIndex = pickRandomIndex(CLAIMS.length, currentIndexRef.current);
    currentIndexRef.current = nextIndex;
    const nextClaim = CLAIMS[nextIndex];
    setRounds([...rounds.slice(0, -1), { ...current, playerAnswer: answer }, { claim: nextClaim, playerAnswer: null }]);
  }

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 lg:gap-8 flex-1 px-6 text-center">
        <p className="text-lg lg:text-2xl font-semibold">Valida las siguientes imágenes de los empleados</p>
        <p className="text-white/60 lg:text-lg">¿Listo?</p>
        <Button onClick={handleStart}>Comenzar</Button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 min-h-0 px-4 lg:px-8 py-4 lg:py-8 gap-4 lg:gap-6">
      <NotificationBubble kind={engine.activeNotification} />

      <GameSidebar
        playerScore={engine.playerScore}
        aiScore={engine.aiScore}
        secondsLeft={engine.secondsLeft}
        durationSeconds={GAME_DURATION_SECONDS}
        colorPhase={engine.colorPhase}
        isPulsing={engine.isPulsing}
      />

      <div className="flex-1 min-h-0 flex flex-col gap-3 lg:gap-4">
        <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto bg-navy-900/60 rounded-2xl p-3 lg:p-6 border border-white/10">
          {rounds.map((round, index) => (
            <div key={index} className="flex flex-col gap-3">
              <ChatBubble claimId={round.claim.id} image={round.claim.image} description={round.claim.description} />
              {round.playerAnswer && <BrisaReplyBubble answer={round.playerAnswer} />}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          <Button
            variant="secondary"
            className="border-success text-success touch-manipulation"
            onClick={() => handleAnswer('correcto')}
          >
            Reclamación válida
          </Button>
          <Button
            variant="secondary"
            className="border-danger text-danger touch-manipulation"
            onClick={() => handleAnswer('incorrecto')}
          >
            Reclamación inválida
          </Button>
        </div>
      </div>
    </div>
  );
}
