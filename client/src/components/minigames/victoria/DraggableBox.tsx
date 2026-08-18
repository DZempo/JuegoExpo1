import { useDrag } from 'react-dnd';
import { BOX_DRAG_TYPE } from '@/lib/dragTypes';
import { BoxItem } from '@/types/game.types';
import { TicketCard } from './TicketCard';

interface DraggableBoxProps {
  box: BoxItem;
}

export function DraggableBox({ box }: DraggableBoxProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: BOX_DRAG_TYPE,
    item: { amount: box.amount },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={dragRef}
      className="cursor-grab active:cursor-grabbing touch-none select-none"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <TicketCard ticket={box} />
    </div>
  );
}
