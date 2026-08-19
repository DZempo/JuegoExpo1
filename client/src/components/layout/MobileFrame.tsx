import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
}

/** Shell responsive pensado exclusivamente para orientación vertical (estilo app móvil). */
export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <>
      <div className="app-shell">{children}</div>
      <div className="rotate-warning fixed inset-0 items-center justify-center bg-navy-950 text-center px-8 z-50">
        <p className="text-lg font-semibold">Gira tu dispositivo a orientación vertical</p>
      </div>
    </>
  );
}
