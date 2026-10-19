import React, { useState } from 'react';
import {
  Users,
  Search,
  Calendar,
  CheckSquare,
  BookOpen,
  Award,
  ChevronRight,
  X,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Applicant } from '../../types';

export const PembimbingPeserta: React.FC = () => {
  const { applicants, attendance, tasks, logbooks, setCurrentView } = useApp();
  const [selectedIntern, setSelectedIntern] = useState<Applicant | null>(applicants[0] || null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'absensi' | 'task' | 'logbook' | 'evaluasi'>('absensi');

  const supervisedInterns = applicants.filter(a => a.assignedUnit === 'unit-ipds' || a.id === 'app-001');

  const handleOpenDetail = (intern: Applicant) => {
    setSelectedIntern(intern);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Monitoring Peserta Bimbingan
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pantau seluruh aktivitas presensi, pengerjaan tugas, rekapitulasi logbook harian, dan evaluasi peserta.
        </p>
      </div>

      {/* Interns Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total {supervisedInterns.length} Mahasiswa Bimbingan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Nama Lengkap & NIM</th>
                <th className="px-4 py-3">Perguruan Tinggi</th>
                <th className="px-4 py-3">Unit Penempatan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Presensi Hadir</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {supervisedInterns.map((intern) => (
                <tr key={intern.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900 text-sm">
                      {intern.fullName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      NIM: {intern.nim}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700">
                    <div>{intern.institution}</div>
                    <div className="text-[11px] text-slate-400">{intern.major}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md text-[11px]">
                      IPDS
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge status={intern.status} size="sm" />
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 font-mono">
                    18 Hari (100%)
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenDetail(intern)}
                    >
                      Buka Monitoring
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Monitoring Drawer (PRD 9.2: Satu tampilan monitoring dengan tab Absensi, Task, Logbook, Evaluasi) */}
      {drawerOpen && selectedIntern && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 bg-[#0B2A4A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-white flex items-center justify-center font-bold font-heading">
                  {selectedIntern.fullName.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-base font-heading">
                    {selectedIntern.fullName}
                  </h3>
                  <div className="text-xs text-blue-200">
                    {selectedIntern.institution} • {selectedIntern.nim}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Monitoring Tabs */}
            <div className="flex border-b border-slate-200 px-6 gap-4 bg-slate-50 text-xs font-semibold">
              {[
                { id: 'absensi', label: 'Absensi', icon: Calendar },
                { id: 'task', label: 'Tugas', icon: CheckSquare },
                { id: 'logbook', label: 'Logbook', icon: BookOpen },
                { id: 'evaluasi', label: 'Evaluasi', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-1.5 py-3 border-b-2 transition-colors ${
                    activeTab === id
                      ? 'border-[#D9692B] text-[#D9692B]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeTab === 'absensi' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Presensi Terkini Peserta
                  </div>
                  {attendance.map((att) => (
                    <div key={att.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{att.date}</div>
                        <div className="text-slate-500 font-mono mt-0.5">
                          In: {att.checkInTime} • Out: {att.checkOutTime || '-'}
                        </div>
                      </div>
                      <Badge variant={att.status === 'hadir' ? 'success' : 'warning'} size="sm">
                        {att.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'task' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Penugasan Mahasiswa
                  </div>
                  {tasks.map((t) => (
                    <div key={t.id} className="p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{t.title}</span>
                        <Badge status={t.status} size="sm" />
                      </div>
                      <p className="text-slate-600 line-clamp-2">{t.description}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Deadline: {t.deadline}</span>
                        <span>Progres: {t.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'logbook' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Entri Logbook Harian
                  </div>
                  {logbooks.map((log) => (
                    <div key={log.id} className="p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{log.date}</span>
                        <Badge status={log.status} size="sm" />
                      </div>
                      <p className="text-slate-700 font-medium">{log.activity}</p>
                      <div className="text-[11px] text-slate-500">Output: {log.output}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'evaluasi' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <span className="font-bold text-emerald-900 block text-sm">
                      Hasil Akhir: Sangat Memuaskan (93.6 / 100)
                    </span>
                    <p className="text-emerald-700 mt-1">
                      Peserta dinilai sangat adaptif dalam pengolahan data statistik dan memiliki integritas kedisiplinan yang tinggi.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setDrawerOpen(false);
                      setCurrentView('evaluasi-penilaian');
                    }}
                  >
                    Buka Lembar Penilaian Lengkap
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
