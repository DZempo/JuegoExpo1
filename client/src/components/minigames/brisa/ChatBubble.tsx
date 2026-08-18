import { motion } from 'framer-motion';
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder';

interface ChatBubbleProps {
  claimId: string;
  image: string;
  description: string;
}

const BRISA_ASSETS_BASE = '/assets/brisa/';

/** claims.json guarda solo el nombre de archivo (p. ej. "img002.jpeg"); aquí se arma la ruta pública real. */
function resolveClaimImageSrc(image: string): string {
  return image.startsWith('/') || image.startsWith('http') ? image : `${BRISA_ASSETS_BASE}${image}`;
}

/** Mensaje entrante del chat: imagen de la reclamación + descripción del empleado. */
export function ChatBubble({ claimId, image, description }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="max-w-[85%] bg-white/10 rounded-2xl rounded-tl-sm p-3 lg:p-5 self-start"
    >
      <ImagePlaceholder
        label={`Reclamación #${claimId}`}
        colorHex="#1e40af"
        imageSrc={resolveClaimImageSrc(image)}
        objectFit="contain"
        className="w-full h-48 lg:h-72"
      />
      <p className="mt-2 lg:mt-4 text-sm lg:text-lg text-white/80">{description}</p>
    </motion.div>
  );
}
