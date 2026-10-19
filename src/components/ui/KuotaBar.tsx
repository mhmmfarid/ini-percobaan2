import React from 'react';
import { Users, AlertCircle } from 'lucide-react';
import { Badge } from './Badge';

interface KuotaBarProps {
  filled: number;
  total: number;
  unitName?: string;
  showDetails?: boolean;
  className?: string;
}

export const KuotaBar: React.FC<KuotaBarProps> = ({
  filled,
  total,
  unitName,
  showDetails = true,
  className = ''
}) => {
  const percentage = Math.min(100, Math.round((filled / Math.max(1, total)) * 100));
  const isFull = filled >= total;
  const isNearFull = !isFull && percentage >= 80;

  let barColor = 'bg-[#1D5FA8]';
  if (isFull) {
    barColor = 'bg-rose-600';
  } else if (isNearFull) {
    barColor = 'bg-amber-500';
  }

  return (
    <div className={`w-full ${className}`}>
      {showDetails && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Kuota Terisi:</span>
            <span className="font-bold text-slate-900 font-mono">
              {filled} / {total}
            </span>
          </div>

          <div>
            {isFull ? (
              <Badge variant="quota-full" size="sm" dot={true}>
                KUOTA PENUH
              </Badge>
            ) : isNearFull ? (
              <span className="text-amber-600 font-semibold text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Sisa {total - filled} kursi
              </span>
            ) : (
              <span className="text-slate-500 font-medium">
                Tersisa {total - filled} kursi
              </span>
            )}
          </div>
        </div>
      )}

      {/* Progress track */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isFull && showDetails && (
        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1 font-medium">
          <AlertCircle className="w-3 h-3 shrink-0" />
          Unit tidak dapat dipilih sebagai prioritas 1. Pelamar dapat memilih unit lain.
        </p>
      )}
    </div>
  );
};
