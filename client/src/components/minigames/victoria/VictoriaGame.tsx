import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { GameSidebar } from '@/components/common/GameSidebar';
import { NotificationBubble } from '@/components/common/NotificationBubble';
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

      <div className="flex-1 flex flex-row items-stretch justify-between gap-4 lg:gap-6">
        <LockZone kind="unlock" className="w-32 lg:w-48" onDropBox={handleDrop} />

        <div className="flex-1 flex items-center justify-center">
          <DraggableBox key={currentBox.id} box={currentBox} />
        </div>

        <LockZone kind="lock" className="w-32 lg:w-48" onDropBox={handleDrop} />
      </div>
    </div>
  );
}
