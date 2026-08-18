import { useState } from 'react';

interface VideoPlaceholderProps {
  src: string;
  className?: string;
  /**
   * Los navegadores solo permiten autoplay CON sonido si ya hubo interacción del usuario
   * en la página (por eso el video de portada, que se reproduce apenas carga Inicio, debe
   * ir muted). Resultados y Final se alcanzan después de jugar, así que pueden sonar.
   */
  muted?: boolean;
}

/**
 * Intenta reproducir el video real como fondo; si el archivo es un placeholder vacío
 * o falla la carga, cae a un bloque de color sólido con etiqueta.
 * [VIDEO A REEMPLAZAR] — sustituir el archivo referenciado por el definitivo.
 */
export function VideoPlaceholder({ src, className = '', muted = true }: VideoPlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-navy-800 border-2 border-dashed border-white/20 ${className}`}
      >
        <span className="text-xs uppercase tracking-widest text-white/50">[Video a reemplazar]</span>
      </div>
    );
  }

  return (
    <video
      className={`object-cover ${className}`}
      src={src}
      autoPlay
      loop
      muted={muted}
      playsInline
      onError={() => setHasError(true)}
    />
  );
}
