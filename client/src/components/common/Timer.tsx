import { motion } from 'framer-motion';
import { TimerColorPhase } from '@/hooks/useTimer';

interface TimerProps {
  secondsLeft: number;
  durationSeconds: number;
  colorPhase: TimerColorPhase;
  isPulsing: boolean;
}

const COLOR_CLASSES: Record<TimerColorPhase, string> = {
  green: 'bg-success',
  yellow: 'bg-warning',
  red: 'bg-danger',
};

export function Timer({ secondsLeft, durationSeconds, colorPhase, isPulsing }: TimerProps) {
  const progress = Math.max(0, Math.min(1, secondsLeft / durationSeconds));

  return (
    <motion.div
      animate={isPulsing ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={isPulsing ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : undefined}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs lg:text-sm uppercase tracking-wide text-white/50">Tiempo</span>
        <span className={`text-sm lg:text-lg font-bold tabular-nums ${isPulsing ? 'text-danger' : 'text-white'}`}>
          {secondsLeft}s
        </span>
      </div>
      <div className="h-3 lg:h-4 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${COLOR_CLASSES[colorPhase]}`}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
