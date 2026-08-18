import { ApplicantItem } from '@/types/game.types';
import { Silhouette } from './Silhouette';

interface ApplicantCardProps {
  applicant: ApplicantItem;
}

/** Tarjeta de perfil de postulante (sin fotografía) — reemplaza al placeholder de imagen. */
export function ApplicantCard({ applicant }: ApplicantCardProps) {
  return (
    <div className="flex flex-col items-center text-center bg-white text-navy-950 rounded-2xl border border-black/10 shadow-xl px-3 pt-4 pb-3 lg:px-5 lg:pt-6 lg:pb-4 w-40 lg:w-64">
      <Silhouette sexo={applicant.sexo} className="w-14 h-14 lg:w-20 lg:h-20" />
      <p className="mt-2 lg:mt-3 text-xs lg:text-base font-bold leading-tight">{applicant.nombre}</p>
      <p className="text-[10px] lg:text-sm text-navy-700/70 mb-2 lg:mb-3">
        {applicant.edad} años · {applicant.lugar}
      </p>
      <div className="w-full h-px bg-black/10 mb-2 lg:mb-3" />
      <dl className="w-full text-left text-[10px] lg:text-sm leading-snug lg:leading-normal">
        <div className="flex justify-between gap-2 py-0.5 lg:py-1">
          <dt className="text-navy-700/60 shrink-0">Carrera</dt>
          <dd className="font-medium text-right">{applicant.carrera}</dd>
        </div>
        <div className="flex justify-between gap-2 py-0.5 lg:py-1">
          <dt className="text-navy-700/60 shrink-0">Universidad</dt>
          <dd className="font-medium text-right">{applicant.universidad}</dd>
        </div>
      </dl>
    </div>
  );
}
