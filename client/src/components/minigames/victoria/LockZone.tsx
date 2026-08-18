import { motion } from 'framer-motion';
import { useDrop } from 'react-dnd';
import { BOX_DRAG_TYPE } from '@/lib/dragTypes';

export type LockZoneKind = 'unlock' | 'lock';

interface LockZoneProps {
  kind: LockZoneKind;
  className?: string;
  onDropBox: (isCorrect: boolean) => void;
}

const LABELS: Record<LockZoneKind, string> = {
  unlock: 'Desbloquear',
  lock: 'No Aplica',
};

export function LockZone({ kind, className = '', onDropBox }: LockZoneProps) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: BOX_DRAG_TYPE,
    drop: (item: { amount: number | null }) => {
      // Un monto ilegible/en blanco no tiene zona correcta: siempre cuenta como incorrecto.
      if (item.amount === null) {
        onDropBox(false);
        return;
      }
      const shouldUnlock = item.amount > 5000;
      const isCorrect = kind === 'unlock' ? shouldUnlock : !shouldUnlock;
      onDropBox(isCorrect);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <motion.div
      ref={dropRef}
      animate={{ scale: isOver ? 1.05 : 1 }}
      className={`flex items-center justify-center text-center font-bold text-lg lg:text-3xl rounded-2xl border-2 border-dashed border-white/30 bg-navy-800/70 ${
        isOver ? 'border-white bg-navy-700' : ''
      } ${className}`}
    >
      {LABELS[kind]}
    </motion.div>
  );
}
