import React, { useState, useEffect, useMemo } from 'react';
import { Search, Users, Briefcase, FileText, CheckSquare, Award, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommandPalette: React.FC = () => {
  const {
    isCmdPaletteOpen,
    setIsCmdPaletteOpen,
    applicants,
    units,
    tasks,
    logbooks,
    setCurrentView,
    setCurrentApplicant
  } = useApp();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isCmdPaletteOpen) {
      setSearch('');
    }
  }, [isCmdPaletteOpen]);

  // Results grouped
  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return {
        peserta: applicants.slice(0, 3),
        units: units.slice(0, 3),
        tasks: tasks.slice(0, 2)
      };
    }

    return {
      peserta: applicants.filter(
        a => a.fullName.toLowerCase().includes(q) || a.registrationNumber.toLowerCase().includes(q) || a.institution.toLowerCase().includes(q)
      ),
      units: units.filter(
        u => u.name.toLowerCase().includes(q) || u.code.toLowerCase().includes(q)
      ),
      tasks: tasks.filter(
        t => t.title.toLowerCase().includes(q)
      )
    };
  }, [search, applicants, units, tasks]);

  if (!isCmdPaletteOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCmdPaletteOpen(false);
      }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari peserta, nomor registrasi, unit kerja, tugas, sertifikat... (Esc untuk batal)"
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsCmdPaletteOpen(false)}
            className="text-xs bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded text-slate-600 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="p-3 overflow-y-auto divide-y divide-slate-100 space-y-3">
          {/* Group 1: Peserta */}
          {results.peserta.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                Peserta Magang
              </div>
              <div className="space-y-1">
                {results.peserta.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentApplicant(p);
                      setCurrentView('profil');
                      setIsCmdPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors text-left group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                        {p.fullName}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="font-mono text-slate-400">{p.registrationNumber}</span>
                        <span>•</span>
                        <span>{p.institution}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Unit Kerja */}
          {results.units.length > 0 && (
            <div className="pt-2">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                Unit Kerja BPS Depok
              </div>
              <div className="space-y-1">
                {results.units.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentView('batch-unit');
                      setIsCmdPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors text-left group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-amber-700">
                        {u.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {u.filled} dari {u.quota} kuota terisi
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {u.code}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 3: Tasks */}
          {results.tasks.length > 0 && (
            <div className="pt-2">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                Penugasan & Proyek
              </div>
              <div className="space-y-1">
                {results.tasks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentView('task');
                      setIsCmdPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors text-left group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-sm font-medium text-slate-800 truncate group-hover:text-emerald-700">
                        {t.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        Deadline: {t.deadline} • Progres: {t.progress}%
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 shrink-0">
                      Lihat →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.peserta.length === 0 && results.units.length === 0 && results.tasks.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm">
              Tidak ada data yang cocok dengan "{search}".
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Gunakan <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono shadow-xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono shadow-xs">↓</kbd> untuk navigasi</span>
          <span>Tekan <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono shadow-xs">ESC</kbd> untuk menutup</span>
        </div>
      </div>
    </div>
  );
};
