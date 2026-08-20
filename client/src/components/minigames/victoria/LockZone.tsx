import { motion } from 'framer-motion';

export type LockZoneKind = 'unlock' | 'lock';

interface LockZoneProps {
  kind: LockZoneKind;
  className?: string;
  onSelect: (kind: LockZoneKind) => void;
}

const LABELS: Record<LockZoneKind, string> = {
  unlock: 'Desbloquear',
  lock: 'No Aplica',
};

/** Área de decisión: el jugador la presiona para resolver el ticket actual. */
export function LockZone({ kind, className = '', onSelect }: LockZoneProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(kind)}
      className={`w-full flex items-center justify-center text-center font-bold text-lg lg:text-3xl rounded-2xl border-2 border-white/30 bg-navy-800/70 touch-manipulation select-none transition-colors hover:bg-navy-700 active:bg-navy-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${className}`}
    >
      {LABELS[kind]}
    </motion.button>
  );
}
