import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';

const GamePage = lazy(() => import('@/pages/GamePage').then((m) => ({ default: m.GamePage })));
const ResultsPage = lazy(() => import('@/pages/ResultsPage').then((m) => ({ default: m.ResultsPage })));
const FinalPage = lazy(() => import('@/pages/FinalPage').then((m) => ({ default: m.FinalPage })));

function RouteFallback() {
  return <div className="flex-1 flex items-center justify-center text-white/50">Cargando...</div>;
}

export function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/juego/:characterId" element={<GamePage />} />
        <Route path="/resultados" element={<ResultsPage />} />
        <Route path="/final" element={<FinalPage />} />
      </Routes>
    </Suspense>
  );
}
