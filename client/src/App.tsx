import { BrowserRouter } from 'react-router-dom';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { AudioProvider } from '@/context/AudioContext';
import { GameProvider } from '@/context/GameContext';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { AppRouter } from '@/router/AppRouter';

export function App() {
  // Descarga todas las imágenes del juego al arrancar, para que cada partida las tome
  // de la caché del navegador en vez de volver a pedirlas.
  useImagePreloader();

  return (
    <BrowserRouter>
      <GameProvider>
        <AudioProvider>
          <MobileFrame>
            <AppRouter />
          </MobileFrame>
        </AudioProvider>
      </GameProvider>
    </BrowserRouter>
  );
}
