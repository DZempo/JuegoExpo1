import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { GameSidebar } from '@/components/common/GameSidebar';
import { NotificationBubble } from '@/components/common/NotificationBubble';
import applicants from '@/data/renata/applicants.json';
import { useGameEngine } from '@/hooks/useGameEngine';
import { GAME_DURATION_SECONDS } from '@/lib/constants';
import { pickRandomIndex } from '@/lib/random';
import { ApplicantItem } from '@/types/game.types';
import { DraggableApplicant } from './DraggableApplicant';
import { DropZone } from './DropZone';

const APPLICANTS = applicants as ApplicantItem[];

interface RenataGameProps {
  onFinish: () => void;
}

export function RenataGame({ onFinish }: RenataGameProps) {
  const [phase, setPhase] = useState<'intro' | 'playing'>('intro');
  const [applicantIndex, setApplicantIndex] = useState(() => pickRandomIndex(APPLICANTS.length));
  const engine = useGameEngine({ characterId: 'renata', onFinish });

  const currentApplicant = APPLICANTS[applicantIndex];

  function handleStart() {
    setPhase('playing');
    engine.start();
  }

  function handleDrop(isCorrect: boolean) {
    engine.registerAnswer(isCorrect);
    setApplicantIndex((prev) => pickRandomIndex(APPLICANTS.length, prev));
  }

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 lg:gap-8 flex-1 px-6 text-center">
        <p className="text-lg lg:text-2xl font-semibold">Organiza a los postulantes lo más rápido que puedas</p>
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

      <div className="relative flex-1 grid grid-cols-4 grid-rows-1 gap-3 lg:gap-6">
        <DropZone department="Sistemas" onDropApplicant={handleDrop} />
        <DropZone department="Marketing" onDropApplicant={handleDrop} />
        <DropZone department="Contabilidad" onDropApplicant={handleDrop} />
        <DropZone department="Tienda" onDropApplicant={handleDrop} />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <DraggableApplicant key={currentApplicant.id} applicant={currentApplicant} />
          </div>
        </div>
      </div>
    </div>
  );
}
