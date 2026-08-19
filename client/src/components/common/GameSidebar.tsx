import { TimerColorPhase } from '@/hooks/useTimer';
import { ScoreBoard } from './ScoreBoard';
import { Timer } from './Timer';

interface GameSidebarProps {
  playerScore: number;
  aiScore: number;
  secondsLeft: number;
  durationSeconds: number;
  colorPhase: TimerColorPhase;
  isPulsing: boolean;
}

/** Panel lateral de los minijuegos: agrupa ScoreBoard + Timer para dejar todo el ancho restante al contenido. */
export function GameSidebar({
  playerScore,
  aiScore,
  secondsLeft,
  durationSeconds,
  colorPhase,
  isPulsing,
}: GameSidebarProps) {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 w-40 lg:w-56 shrink-0">
      <ScoreBoard playerScore={playerScore} aiScore={aiScore} />
      <Timer secondsLeft={secondsLeft} durationSeconds={durationSeconds} colorPhase={colorPhase} isPulsing={isPulsing} />
    </div>
  );
}
