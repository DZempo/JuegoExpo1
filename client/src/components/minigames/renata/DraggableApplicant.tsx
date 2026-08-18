import { useDrag } from 'react-dnd';
import { APPLICANT_DRAG_TYPE } from '@/lib/dragTypes';
import { ApplicantItem } from '@/types/game.types';
import { ApplicantCard } from './ApplicantCard';

interface DraggableApplicantProps {
  applicant: ApplicantItem;
}

export function DraggableApplicant({ applicant }: DraggableApplicantProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: APPLICANT_DRAG_TYPE,
    item: { department: applicant.department },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={dragRef}
      className="cursor-grab active:cursor-grabbing touch-none select-none"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <ApplicantCard applicant={applicant} />
    </div>
  );
}
