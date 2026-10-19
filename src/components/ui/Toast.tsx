import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-white/95 text-slate-800',
    warning: 'border-amber-200 bg-white/95 text-slate-800',
    danger: 'border-rose-200 bg-white/95 text-slate-800',
    info: 'border-sky-200 bg-white/95 text-slate-800'
  };

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-300">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md ${borders[toast.type]}`}
      >
        {icons[toast.type]}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 font-heading">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
