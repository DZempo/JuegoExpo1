import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselItem } from '@/components/common/Carousel';
import { VideoPlaceholder } from '@/components/common/VideoPlaceholder';
import { useGameContext } from '@/context/GameContext';
import { useBackgroundMusic } from '@/hooks/useAudioPlayer';
import { fetchCharacters } from '@/services/api';
import { CharacterId } from '@/types/character.types';

export function HomePage() {
  const navigate = useNavigate();
  const { selectCharacter } = useGameContext();
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useBackgroundMusic('/assets/audio/music.mp3');

  useEffect(() => {
    fetchCharacters().then((characters) => {
      setItems(characters.map((c) => ({ id: c.id, name: c.name, colorHex: c.colorHex, image: c.image })));
    });
  }, []);

  if (items.length === 0) {
    return <div className="flex-1 flex items-center justify-center text-white/50">Cargando personajes...</div>;
  }

  function goTo(offset: number) {
    setDirection(offset > 0 ? 1 : -1);
    setActiveIndex((prev) => (prev + offset + items.length) % items.length);
  }

  function handleSelect(id: string) {
    selectCharacter(id as CharacterId);
    navigate(`/juego/${id}`);
  }

  return (
    <div className="relative flex-1 flex flex-col">
      <VideoPlaceholder src="/assets/video/portada.mp4" className="absolute inset-0 w-full h-full opacity-30" />
      <div className="absolute inset-0 bg-navy-950/60" />

      <div className="relative flex-1 flex flex-col items-center justify-center gap-10 lg:gap-16 px-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl lg:text-4xl font-extrabold">Sé una IA por un día</h1>
          <p className="text-white/60 lg:text-lg">Selecciona tu personaje</p>
        </div>

        <Carousel
          items={items}
          activeIndex={activeIndex}
          direction={direction}
          onPrev={() => goTo(-1)}
          onNext={() => goTo(1)}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
