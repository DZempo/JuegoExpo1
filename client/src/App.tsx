import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { BrowserRouter } from 'react-router-dom';
import { AppFrame } from '@/components/layout/AppFrame';
import { AudioProvider } from '@/context/AudioContext';
import { GameProvider } from '@/context/GameContext';
import { AppRouter } from '@/router/AppRouter';

// TouchBackend soporta tanto pantallas táctiles (kiosco/tablet) como mouse (enableMouseEvents),
// a diferencia de HTML5Backend que solo funciona con eventos de mouse/drag nativos del navegador.
const DND_BACKEND_OPTIONS = { enableMouseEvents: true };

export function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AudioProvider>
          <DndProvider backend={TouchBackend} options={DND_BACKEND_OPTIONS}>
            <AppFrame>
              <AppRouter />
            </AppFrame>
          </DndProvider>
        </AudioProvider>
      </GameProvider>
    </BrowserRouter>
  );
}
