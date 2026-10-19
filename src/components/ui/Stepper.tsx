import React from 'react';
import { Check, Clock, FileCheck, Award, UserCheck, Briefcase } from 'lucide-react';
import { ApplicationStatus } from '../../types';

interface StatusStepperProps {
  currentStatus: ApplicationStatus;
  className?: string;
}

export const StatusStepper: React.FC<StatusStepperProps> = ({ currentStatus, className = '' }) => {
  const steps = [
    { id: 'submitted', label: 'Terkirim', desc: 'Berkas diterima sistem', icon: Clock },
    { id: 'verified', label: 'Verifikasi', desc: 'Uji keaslian berkas', icon: FileCheck },
    { id: 'selection_passed', label: 'Seleksi', desc: 'Review kompetensi', icon: UserCheck },
    { id: 'placed', label: 'Penempatan', desc: 'Alokasi unit & mentor', icon: Briefcase },
    { id: 'active', label: 'Magang', desc: 'Proses magang berjalan', icon: Award }
  ];

  const getStepState = (stepIndex: number) => {
    const statusOrder: Record<string, number> = {
      draft: 0,
      submitted: 1,
      under_review: 1,
      verified: 2,
      selection_passed: 3,
      selection_rejected: 2,
      placed: 4,
      active: 5,
      completed: 6
    };

    const currentOrder = statusOrder[currentStatus] ?? 1;

    if (currentOrder > stepIndex + 1) return 'completed';
    if (currentOrder === stepIndex + 1) return 'current';
    return 'upcoming';
  };

  return (
    <div className={`w-full overflow-x-auto pb-2 ${className}`}>
      <div className="flex items-center min-w-[620px] justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 -z-0" />

        {steps.map((step, idx) => {
          const state = getStepState(idx);
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center group w-28">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-sm ${
                  state === 'completed'
                    ? 'bg-[#1D5FA8] text-white ring-4 ring-[#E3EEF9]'
                    : state === 'current'
                    ? 'bg-[#D9692B] text-white ring-4 ring-[#FBE9DD] scale-110 shadow-md'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {state === 'completed' ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              <span
                className={`mt-2.5 text-xs font-heading font-bold ${
                  state === 'current'
                    ? 'text-[#D9692B]'
                    : state === 'completed'
                    ? 'text-[#0B2A4A]'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>

              <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 max-w-[110px]">
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface FormWizardStepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const FormWizardStepper: React.FC<FormWizardStepperProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />

        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isDone = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <button
              key={label}
              type="button"
              onClick={() => onStepClick && onStepClick(stepNum)}
              disabled={!onStepClick || (!isDone && !isCurrent)}
              className="relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-default"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isDone
                    ? 'bg-[#1D5FA8] text-white ring-2 ring-[#E3EEF9]'
                    : isCurrent
                    ? 'bg-[#D9692B] text-white ring-4 ring-[#FBE9DD] scale-105'
                    : 'bg-white border border-slate-300 text-slate-400'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : stepNum}
              </div>

              <span
                className={`mt-1.5 text-xs font-semibold ${
                  isCurrent
                    ? 'text-[#D9692B]'
                    : isDone
                    ? 'text-[#0B2A4A]'
                    : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
