import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { NotificationBubble } from '@/components/common/NotificationBubble';
import { ScoreBoard } from '@/components/common/ScoreBoard';
import { Timer } from '@/components/common/Timer';
import applicants from '@/data/renata/applicants.json';
import { useGameEngine } from '@/hooks/useGameEngine';
import { GAME_DURATION_SECONDS } from '@/lib/constants';
import { pickRandomIndex } from '@/lib/random';
import { ApplicantDepartment, ApplicantItem } from '@/types/game.types';
import { ApplicantCard } from './ApplicantCard';
import { DepartmentZone } from './DepartmentZone';

const APPLICANTS = applicants as ApplicantItem[];

const DEPARTMENTS: ApplicantDepartment[] = ['Sistemas', 'Marketing', 'Contabilidad', 'Tienda'];

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

  function handleSelectDepartment(department: ApplicantDepartment) {
    engine.registerAnswer(department === currentApplicant.department);
    setApplicantIndex((prev) => pickRandomIndex(APPLICANTS.length, prev));
  }

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 lg:gap-8 flex-1 px-6 text-center">
        <p className="text-lg lg:text-2xl font-semibold">Organiza a los postulantes lo más rápido que puedas</p>
        <p className="text-white/60 lg:text-lg">Presiona el área a la que pertenece cada postulante</p>
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

      <div className="flex-1 flex items-center justify-center max-w-3xl w-full mx-auto">
        <ApplicantCard key={currentApplicant.id} applicant={currentApplicant} />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:gap-6 max-w-3xl w-full mx-auto">
        {DEPARTMENTS.map((department) => (
          <DepartmentZone
            key={department}
            department={department}
            className="h-20 lg:h-28"
            onSelect={handleSelectDepartment}
          />
        ))}
      </div>
    </div>
  );
}
