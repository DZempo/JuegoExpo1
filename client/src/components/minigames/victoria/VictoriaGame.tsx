import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { NotificationBubble } from '@/components/common/NotificationBubble';
import { ScoreBoard } from '@/components/common/ScoreBoard';
import { Timer } from '@/components/common/Timer';
import boxes from '@/data/victoria/boxes.json';
import { useGameEngine } from '@/hooks/useGameEngine';
import { GAME_DURATION_SECONDS } from '@/lib/constants';
import { pickRandomIndex } from '@/lib/random';
import { BoxItem } from '@/types/game.types';
import { DraggableBox } from './DraggableBox';
import { LockZone } from './LockZone';

const BOXES = boxes as BoxItem[];

interface VictoriaGameProps {
  onFinish: () => void;
}

export function VictoriaGame({ onFinish }: VictoriaGameProps) {
  const [phase, setPhase] = useState<'intro' | 'playing'>('intro');
  const [boxIndex, setBoxIndex] = useState(() => pickRandomIndex(BOXES.length));
  const engine = useGameEngine({ characterId: 'victoria', onFinish });

  const currentBox = BOXES[boxIndex];

  function handleStart() {
    setPhase('playing');
    engine.start();
  }

  function handleDrop(isCorrect: boolean) {
    engine.registerAnswer(isCorrect);
    setBoxIndex((prev) => pickRandomIndex(BOXES.length, prev));
  }

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 lg:gap-8 flex-1 px-6 text-center">
        <p className="text-lg lg:text-2xl font-semibold">Desbloquea las cajas con un monto mayor a $5000</p>
        <Button onClick={handleStart}>Comenzar</Button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col flex-1 px-4 lg:px-8 pb-4 lg:pb-8 gap-4 lg:gap-6">
      <NotificationBubble kind={engine.activeNotification} />

      <div className="pt-4 lg:pt-8 flex flex-col gap-3 lg:gap-4 max-w-2xl w-full mx-auto">
        <ScoreBoard playerScore={engine.playerScore} aiScore={engine.aiScore} />
        <Timer
          secondsLeft={engine.secondsLeft}
          durationSeconds={GAME_DURATION_SECONDS}
          colorPhase={engine.colorPhase}
          isPulsing={engine.isPulsing}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4 lg:gap-6 max-w-2xl w-full mx-auto">
        <LockZone kind="unlock" className="h-24 lg:h-36" onDropBox={handleDrop} />

        <div className="flex-1 flex items-center justify-center">
          <DraggableBox key={currentBox.id} box={currentBox} />
        </div>

        <LockZone kind="lock" className="h-24 lg:h-36" onDropBox={handleDrop} />
      </div>
    </div>
  );
}
