import { useState } from 'react';

interface ImagePlaceholderProps {
  label: string;
  colorHex?: string;
  className?: string;
  /** Ruta de la imagen real, si existe. Si falta o falla la carga, se muestra el bloque de color. */
  imageSrc?: string;
  /**
   * 'cover' (default) llena el marco recortando lo que no calce — ideal cuando el marco ya
   * respeta la proporción real de la imagen (p. ej. retratos 2:3).
   * 'contain' muestra la imagen completa sin recortar, con espacio vacío si la proporción no
   * coincide — ideal cuando las imágenes tienen proporciones variables o desconocidas.
   */
  objectFit?: 'cover' | 'contain';
}

/**
 * Muestra la imagen real cuando `imageSrc` carga correctamente; si no hay imagen o falla,
 * cae a un bloque de color sólido con etiqueta.
 * [IMAGEN A REEMPLAZAR] — mientras no exista un asset real en `imageSrc`.
 */
export function ImagePlaceholder({
  label,
  colorHex = '#1e3a8a',
  className = '',
  imageSrc,
  objectFit = 'cover',
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  if (imageSrc && !hasError) {
    return (
      <img
        src={imageSrc}
        alt={label}
        onError={() => setHasError(true)}
        className={`rounded-2xl ${objectFit === 'contain' ? 'object-contain bg-black/20' : 'object-cover'} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/30 text-center px-3 ${className}`}
      style={{ backgroundColor: colorHex }}
    >
      <span className="text-xs uppercase tracking-widest text-white/70">Imagen</span>
      <span className="text-sm font-semibold text-white">{label}</span>
    </div>
  );
}
