import React from 'react';

interface CardProps {
  variant?: 'standard' | 'glass' | 'glass-dark' | 'outline' | 'flat';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'standard',
  children,
  className = '',
  onClick
}) => {
  const variantStyles = {
    standard: 'bg-white border border-slate-200/90 shadow-xs hover:shadow-sm rounded-2xl',
    glass: 'card-glass rounded-2xl',
    'glass-dark': 'card-glass-dark rounded-2xl text-white',
    outline: 'border border-slate-200 bg-transparent rounded-2xl',
    flat: 'bg-slate-50 border border-slate-100 rounded-2xl'
  };

  return (
    <div
      onClick={onClick}
      className={`transition-all duration-200 ${variantStyles[variant]} ${
        onClick ? 'cursor-pointer hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  accentColor?: 'blue' | 'terracotta' | 'emerald' | 'amber' | 'purple';
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = 'blue',
  onClick
}) => {
  const accentClasses = {
    blue: 'bg-[#E3EEF9] text-[#1D5FA8]',
    terracotta: 'bg-[#FBE9DD] text-[#D9692B]',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <Card
      variant="standard"
      className="p-5 flex flex-col justify-between"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
            {value}
          </div>
        </div>
        <div className={`p-3 rounded-xl shrink-0 ${accentClasses[accentColor]}`}>
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{subtitle}</span>
          {trend && (
            <span
              className={`font-semibold ${
                trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
