import { motion } from 'framer-motion';
import { useDrop } from 'react-dnd';
import { APPLICANT_DRAG_TYPE } from '@/lib/dragTypes';
import { ApplicantDepartment } from '@/types/game.types';

interface DropZoneProps {
  department: ApplicantDepartment;
  className?: string;
  onDropApplicant: (isCorrect: boolean) => void;
}

export function DropZone({ department, className = '', onDropApplicant }: DropZoneProps) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: APPLICANT_DRAG_TYPE,
    drop: (item: { department: ApplicantDepartment }) => {
      onDropApplicant(item.department === department);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <motion.div
      ref={dropRef}
      animate={{ scale: isOver ? 1.08 : 1 }}
      className={`flex items-center justify-center text-center font-bold text-base lg:text-2xl rounded-2xl border-2 border-dashed border-white/30 bg-navy-800/70 p-2 ${
        isOver ? 'border-white bg-navy-700' : ''
      } ${className}`}
    >
      {department}
    </motion.div>
  );
}
