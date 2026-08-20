import { motion } from 'framer-motion';
import { ApplicantDepartment } from '@/types/game.types';

interface DepartmentZoneProps {
  department: ApplicantDepartment;
  className?: string;
  onSelect: (department: ApplicantDepartment) => void;
}

/** Área de departamento: el jugador la presiona para clasificar al postulante actual. */
export function DepartmentZone({ department, className = '', onSelect }: DepartmentZoneProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(department)}
      className={`flex items-center justify-center text-center font-bold text-base lg:text-2xl rounded-2xl border-2 border-white/30 bg-navy-800/70 p-2 touch-manipulation select-none transition-colors hover:bg-navy-700 active:bg-navy-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${className}`}
    >
      {department}
    </motion.button>
  );
}
