import { AnimatePresence, motion } from 'framer-motion';
import { NotificationKind } from '@/types/game.types';

interface NotificationBubbleProps {
  kind: NotificationKind;
}

const CONTENT: Record<'correct' | 'incorrect', { text: string; className: string }> = {
  correct: { text: '¡Correcto!', className: 'bg-success' },
  incorrect: { text: 'Incorrecto', className: 'bg-danger' },
};

/** Burbuja de notificación con "estrés visual" (shake + flash) — modo 'visual' del sistema de notificaciones. */
export function NotificationBubble({ kind }: NotificationBubbleProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center z-30">
      <AnimatePresence>
        {kind && (
          <motion.div
            key={kind}
            initial={{ y: -30, opacity: 0, scale: 0.8 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              x: kind === 'incorrect' ? [0, -8, 8, -6, 6, 0] : 0,
            }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`px-5 py-2 lg:px-8 lg:py-3 rounded-full text-sm lg:text-xl font-bold shadow-xl ${CONTENT[kind].className}`}
          >
            {CONTENT[kind].text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
