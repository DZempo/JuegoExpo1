import { BoxItem } from '@/types/game.types';

interface TicketCardProps {
  ticket: BoxItem;
}

function formatMoney(amount: number | null): string {
  if (amount === null) return '—';
  return `$${amount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Ticket de caja (recibo ficticio) — reemplaza al placeholder de imagen de las cajas de Victoria. */
export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div
      className="w-44 lg:w-72 bg-[#fdfaf3] text-[#2a2a26] border border-[#d8d5c8] rounded px-3.5 pt-4 pb-3.5 lg:px-6 lg:pt-7 lg:pb-6 text-center shadow-lg font-mono"
      style={{
        WebkitMaskImage:
          'radial-gradient(circle at 6px 4px, transparent 4px, black 4.5px), radial-gradient(circle at 6px calc(100% - 4px), transparent 4px, black 4.5px)',
        maskImage:
          'radial-gradient(circle at 6px 4px, transparent 4px, black 4.5px), radial-gradient(circle at 6px calc(100% - 4px), transparent 4px, black 4.5px)',
      }}
    >
      <div className="flex flex-col items-center mb-2 lg:mb-4">
        <div className="w-[52px] h-[52px] lg:w-[84px] lg:h-[84px] rounded-full bg-navy-800 flex items-center justify-center mb-1.5 lg:mb-2.5">
          <img src="/assets/victoria/Neto-Blanco.png" alt="neto" className="w-8 h-8 lg:w-14 lg:h-14 object-contain" />
        </div>
        <div className="font-sans font-extrabold text-[13px] lg:text-[21px] tracking-wide text-navy-800">neto</div>
        <div className="text-[8.5px] lg:text-[13px] tracking-[0.16em] text-[#6b6a63] uppercase">
          Despensa de calidad a bajos precios
        </div>
      </div>

      <div className="border-t border-dashed border-[#d8d5c8] my-2.5 lg:my-4" />

      <div className="text-[10.5px] lg:text-[16px] leading-[1.7] text-left">
        <div className="flex justify-between gap-2">
          <span className="text-[#6b6a63]">Sucursal</span>
          <span className="font-bold text-right">#{String(ticket.sucursal).padStart(4, '0')}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-[#6b6a63]">Dirección</span>
        </div>
        <div className="font-semibold text-[9.5px] lg:text-[14px] leading-[1.35] text-right">{ticket.direccion}</div>
        <div className="flex justify-between gap-2 mt-1.5">
          <span className="text-[#6b6a63]">Cajero</span>
          <span className="font-bold text-right">{ticket.cajero}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-[#6b6a63]">Caja</span>
          <span className="font-bold text-right">{ticket.caja}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-[#6b6a63]">Gerente</span>
          <span className="font-bold text-right">{ticket.gerente}</span>
        </div>
      </div>

      <div className="mt-2.5 lg:mt-4 pt-2 lg:pt-3 border-t border-dashed border-[#d8d5c8]">
        <div className="text-[9px] lg:text-[14px] tracking-[0.1em] text-[#6b6a63] uppercase">Monto total</div>
        <div
          className={`font-sans font-extrabold text-[18px] lg:text-[28px] ${
            ticket.amount === null ? 'text-[#c9c4b3]' : 'text-navy-800'
          }`}
        >
          {formatMoney(ticket.amount)}
        </div>
      </div>

      <div className="mt-2.5 lg:mt-4 text-[8px] lg:text-[12px] tracking-[0.08em] text-[#b6b2a3] uppercase">
        *** documento ficticio ***
      </div>
    </div>
  );
}
