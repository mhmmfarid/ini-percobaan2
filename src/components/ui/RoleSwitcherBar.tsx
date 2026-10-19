import React from 'react';
import { UserCheck, Shield, Award, User, Globe, FileSearch, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

export const RoleSwitcherBar: React.FC = () => {
  const { currentRole, setCurrentRole, currentView, setCurrentView, currentUser, showToast } = useApp();

  const roles: { role: Role; label: string; icon: React.ReactNode; color: string }[] = [
    { role: 'peserta', label: 'Peserta', icon: <User className="w-3.5 h-3.5" />, color: 'hover:text-blue-600' },
    { role: 'pembimbing', label: 'Pembimbing', icon: <UserCheck className="w-3.5 h-3.5" />, color: 'hover:text-emerald-600' },
    { role: 'admin', label: 'Admin BPS', icon: <Award className="w-3.5 h-3.5" />, color: 'hover:text-amber-600' },
    { role: 'superadmin', label: 'Super Admin', icon: <Shield className="w-3.5 h-3.5" />, color: 'hover:text-purple-600' }
  ];

  const handleRoleSelect = (r: Role) => {
    setCurrentRole(r);
    if (currentView === 'landing' || currentView === 'verifikasi-sertifikat') {
      setCurrentView('beranda');
    }
    showToast(`Beralih ke Role: ${r.toUpperCase()}`, `Masuk sebagai ${r === 'peserta' ? 'Mufarid Adnan' : r === 'pembimbing' ? 'Ir. Hendra Gunawan' : r === 'admin' ? 'Siti Rahmawati' : 'Drs. Bambang Wicaksono'}`, 'info');
  };

  const resetAllData = () => {
    localStorage.clear();
    showToast('Data Sistem Direset', 'Memuat kembali konfigurasi default.', 'info');
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <aside aria-label="Demo role switcher" className="bg-[#07192C] text-slate-300 text-xs py-2 px-3 sm:px-6 border-b border-slate-700/60 sticky top-0 z-40 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold text-white tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-heading">BPS KOTA DEPOK</span>
          <span className="hidden sm:inline bg-blue-900/60 text-blue-300 text-[10px] px-2 py-0.5 rounded-full border border-blue-700/50">
            PORTAL MAGANG 2026
          </span>
        </div>

        {/* View mode buttons */}
        <div className="h-4 w-px bg-slate-700 hidden md:block" />

        <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-700/80">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              currentView === 'landing'
                ? 'bg-[#1D5FA8] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Landing Page</span>
          </button>

          <button
            onClick={() => setCurrentView('verifikasi-sertifikat')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              currentView === 'verifikasi-sertifikat'
                ? 'bg-[#1D5FA8] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSearch className="w-3 h-3" />
            <span>Cek Sertifikat</span>
          </button>
        </div>
      </div>

      {/* Role Switcher tabs */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-slate-400 hidden lg:inline">
          Simulasi Role:
        </span>

        <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
          {roles.map(({ role, label, icon }) => {
            const isActive = currentRole === role && currentView !== 'landing' && currentView !== 'verifikasi-sertifikat';
            return (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#D9692B] text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                {icon}
                <span className="capitalize">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Direct Download for VS Code */}
        <a
          href="/sistem-magang-bps-depok.zip"
          download="sistem-magang-bps-depok.zip"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors ml-1"
          title="Download semua file source code untuk dibuka di VS Code"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Unduh Kode (.ZIP)</span>
          <span className="sm:hidden">ZIP</span>
        </a>

        {/* Reset button */}
        <button
          onClick={resetAllData}
          title="Reset data demo ke awal"
          className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors ml-0.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
