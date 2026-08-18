import { motion } from 'framer-motion';

interface BrisaReplyBubbleProps {
  answer: 'correcto' | 'incorrecto';
}

const LABEL: Record<'correcto' | 'incorrecto', string> = {
  correcto: 'Reclamación válida',
  incorrecto: 'Reclamación inválida',
};

/** Respuesta saliente de Brisa (la decisión del jugador) dentro del chat. */
export function BrisaReplyBubble({ answer }: BrisaReplyBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="max-w-[85%] bg-navy-500 rounded-2xl rounded-tr-sm p-3 lg:p-5 self-end text-right"
    >
      <p className="text-sm lg:text-lg font-semibold text-white">{LABEL[answer]}</p>
    </motion.div>
  );
}
