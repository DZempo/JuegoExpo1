import { motion } from 'framer-motion';
import { ImagePlaceholder } from './ImagePlaceholder';

export interface CarouselItem {
  id: string;
  name: string;
  colorHex: string;
  image?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  activeIndex: number;
  direction: 1 | -1;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (id: string) => void;
}

/** Carrusel infinito: activeIndex/direction los controla el padre (índice circular con módulo). */
export function Carousel({ items, activeIndex, direction, onPrev, onNext, onSelect }: CarouselProps) {
  const activeItem = items[activeIndex];

  return (
    <div className="flex items-center justify-center gap-4 lg:gap-8 w-full">
      <ArrowButton label="Anterior" onClick={onPrev} icon="←" />

      <motion.div
        key={activeItem.id}
        initial={{ x: direction * 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-56 lg:w-80"
      >
        <button
          type="button"
          onClick={() => onSelect(activeItem.id)}
          className="w-full flex flex-col items-center gap-3 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-2xl"
        >
          {/* Relación 2:3 = proporción real de las imágenes de personaje (1024x1536), para mostrarlas completas sin recortar */}
          <ImagePlaceholder
            label={activeItem.name}
            colorHex={activeItem.colorHex}
            imageSrc={activeItem.image}
            className="w-full aspect-[2/3]"
          />
          <span className="text-lg lg:text-2xl font-bold">{activeItem.name}</span>
        </button>
      </motion.div>

      <ArrowButton label="Siguiente" onClick={onNext} icon="→" />
    </div>
  );
}

function ArrowButton({ label, onClick, icon }: { label: string; onClick: () => void; icon: string }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-11 h-11 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/20 text-xl lg:text-3xl font-bold shrink-0 touch-manipulation"
    >
      {icon}
    </motion.button>
  );
}
