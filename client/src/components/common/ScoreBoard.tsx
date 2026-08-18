import { motion } from 'framer-motion';

interface ScoreBoardProps {
  playerScore: number;
  aiScore: number;
}

export function ScoreBoard({ playerScore, aiScore }: ScoreBoardProps) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white/5 rounded-2xl px-4 py-3 lg:px-6 lg:py-4 border border-white/10">
      <ScoreTile label="Tú" score={playerScore} accentClass="text-white" />
      <div className="text-white/40 font-bold text-lg lg:text-2xl">VS</div>
      <ScoreTile label="IA" score={aiScore} accentClass="text-danger" />
    </div>
  );
}

function ScoreTile({ label, score, accentClass }: { label: string; score: number; accentClass: string }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-xs lg:text-sm uppercase tracking-wide text-white/50">{label}</span>
      <motion.span
        key={score}
        initial={{ scale: 1.3, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        className={`text-2xl lg:text-4xl font-bold tabular-nums ${accentClass}`}
      >
        {score}
      </motion.span>
    </div>
  );
}
