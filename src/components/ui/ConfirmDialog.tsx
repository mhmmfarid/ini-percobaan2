import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';
import { Button } from './Button';
import { useApp } from '../../context/AppContext';

export const ConfirmDialog: React.FC = () => {
  const { confirmDialog, closeConfirmDialog } = useApp();
  const [keywordInput, setKeywordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setKeywordInput('');
    setIsSubmitting(false);
    if (confirmDialog?.isDestructive) {
      // Focus safe button automatically
      setTimeout(() => cancelBtnRef.current?.focus(), 50);
    }
  }, [confirmDialog]);

  if (!confirmDialog) return null;

  const {
    title,
    message,
    confirmLabel = 'Konfirmasi',
    cancelLabel = 'Batal',
    isDestructive = false,
    requireKeyword,
    onConfirm,
    onCancel
  } = confirmDialog;

  const isKeywordValid = !requireKeyword || keywordInput.trim().toUpperCase() === requireKeyword.trim().toUpperCase();

  const handleConfirm = () => {
    if (!isKeywordValid) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm();
      setIsSubmitting(false);
      closeConfirmDialog();
    }, 400);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeConfirmDialog();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isDestructive) {
      handleCancel();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all scale-100"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-2xl shrink-0 ${
                isDestructive
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-[#E3EEF9] text-[#1D5FA8]'
              }`}
            >
              {isDestructive ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <Info className="w-6 h-6" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {title}
                </h3>
                {!isDestructive && (
                  <button
                    onClick={handleCancel}
                    className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {message}
              </div>

              {requireKeyword && (
                <div className="mt-4 p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl">
                  <p className="text-xs text-rose-800 font-medium mb-2">
                    Tindakan ini permanen. Ketik kata kunci <strong className="font-mono bg-rose-200/70 px-1.5 py-0.5 rounded text-rose-900">{requireKeyword}</strong> di bawah untuk melanjutkan:
                  </p>
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder={`Ketik "${requireKeyword}" di sini`}
                    className="w-full px-3 py-2 text-sm font-mono border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button
            ref={cancelBtnRef}
            variant="outline"
            size="md"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>

          <Button
            variant={isDestructive ? 'danger' : 'primary'}
            size="md"
            isLoading={isSubmitting}
            disabled={!isKeywordValid}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
