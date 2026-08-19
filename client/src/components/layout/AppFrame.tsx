import { ReactNode } from 'react';

interface AppFrameProps {
  children: ReactNode;
}

/** Shell responsive pensado exclusivamente para orientación horizontal (estilo kiosco/tótem). */
export function AppFrame({ children }: AppFrameProps) {
  return (
    <>
      <div className="app-shell">{children}</div>
      <div className="rotate-warning fixed inset-0 items-center justify-center bg-navy-950 text-center px-8 z-50">
        <p className="text-lg font-semibold">Gira tu dispositivo a orientación horizontal</p>
      </div>
    </>
  );
}
