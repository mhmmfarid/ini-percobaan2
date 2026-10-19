import React from 'react';
import { ApplicationStatus, DocumentStatus } from '../../types';

interface BadgeProps {
  variant?: 
    | 'default' 
    | 'primary' 
    | 'success' 
    | 'warning' 
    | 'danger' 
    | 'info' 
    | 'quota-full'
    | 'neutral';
  status?: ApplicationStatus | DocumentStatus | string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  status,
  size = 'md',
  children,
  className = '',
  dot = true
}) => {
  let resolvedVariant = variant || 'default';
  let label = children;

  if (status) {
    switch (status) {
      case 'submitted':
      case 'pending':
        resolvedVariant = 'neutral';
        label = label || 'Menunggu Verifikasi';
        break;
      case 'under_review':
        resolvedVariant = 'warning';
        label = label || 'Sedang Ditinjau';
        break;
      case 'verified':
        resolvedVariant = 'success';
        label = label || 'Terverifikasi';
        break;
      case 'selection_passed':
        resolvedVariant = 'success';
        label = label || 'Lolos Seleksi';
        break;
      case 'placed':
        resolvedVariant = 'primary';
        label = label || 'Ditempatkan';
        break;
      case 'active':
        resolvedVariant = 'success';
        label = label || 'Magang Aktif';
        break;
      case 'completed':
        resolvedVariant = 'primary';
        label = label || 'Selesai Magang';
        break;
      case 'revision_required':
      case 'revision':
        resolvedVariant = 'warning';
        label = label || 'Perlu Revisi';
        break;
      case 'rejected':
      case 'selection_rejected':
        resolvedVariant = 'danger';
        label = label || 'Ditolak';
        break;
      default:
        break;
    }
  }

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-[#E3EEF9] text-[#1D5FA8] border-[#1D5FA8]/30 font-medium',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 font-medium',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
    info: 'bg-sky-50 text-sky-700 border-sky-200 font-medium',
    'quota-full': 'bg-rose-600 text-white border-rose-700 shadow-sm font-semibold',
    neutral: 'bg-slate-100 text-slate-700 border-slate-300'
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-[#1D5FA8]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    'quota-full': 'bg-white animate-pulse',
    neutral: 'bg-slate-400'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${sizeStyles[size]} ${variantStyles[resolvedVariant]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[resolvedVariant]}`} />
      )}
      <span>{label}</span>
    </span>
  );
};
