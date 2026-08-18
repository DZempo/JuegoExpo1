import { ApplicantSex } from '@/types/game.types';

interface SilhouetteProps {
  sexo: ApplicantSex;
  /** Clases Tailwind de ancho/alto del círculo (p. ej. "w-14 h-14 lg:w-20 lg:h-20"). */
  className?: string;
}

const INK = '#35404e';

/** Ícono de silueta original (sin fotografía) — un trazo distinto por sexo. El SVG llena su contenedor al 62%. */
export function Silhouette({ sexo, className = 'w-14 h-14' }: SilhouetteProps) {
  const bg = sexo === 'F' ? '#f7dbe8' : '#d7e6f7';

  return (
    <div
      className={`flex items-center justify-center rounded-full shrink-0 ${className}`}
      style={{ backgroundColor: bg }}
    >
      {sexo === 'F' ? (
        <svg viewBox="0 0 100 100" className="w-[62%] h-[62%]">
          <path d="M22 100 C22 76 34 62 50 62 C66 62 78 76 78 100 Z" fill={INK} />
          <path
            d="M50 18 C39 18 31 27 31 39 C31 46 33 52 37 56 C36 50 35 44 36 39 C39 41 44 42 48 40 C50 44 52 44 54 40 C58 42 63 41 66 39 C67 44 66 50 65 56 C69 52 71 46 71 39 C71 27 61 18 50 18 Z"
            fill={INK}
          />
          <path d="M34 42 C31 50 32 58 37 64 L36 46 Z" fill={INK} />
          <path d="M66 42 C69 50 68 58 63 64 L64 46 Z" fill={INK} />
        </svg>
      ) : (
        <svg viewBox="0 0 100 100" className="w-[62%] h-[62%]">
          <path d="M23 100 C23 75 35 60 50 60 C65 60 77 75 77 100 Z" fill={INK} />
          <circle cx="50" cy="38" r="17" fill={INK} />
          <path
            d="M33 36 C33 24 40 15 50 15 C60 15 67 24 67 36 C63 30 57 33 50 29 C43 33 37 30 33 36 Z"
            fill={INK}
          />
        </svg>
      )}
    </div>
  );
}
