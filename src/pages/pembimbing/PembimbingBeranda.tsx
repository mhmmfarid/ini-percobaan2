import React from 'react';
import {
  Users,
  BookOpen,
  CheckSquare,
  Award,
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, KPICard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const PembimbingBeranda: React.FC = () => {
  const { applicants, logbooks, tasks, setCurrentView } = useApp();

  const supervisedInterns = applicants.filter(a => a.assignedUnit === 'unit-ipds');
  const pendingLogbooks = logbooks.filter(l => l.status === 'pending');
  const activeTasks = tasks.filter(t => t.status === 'in_progress');

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Dashboard Pembimbing Lapangan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Selamat datang, <strong>Ir. Hendra Gunawan, S.Si., M.Stat.</strong> • Fungsi IPDS BPS Kota Depok
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<BookOpen className="w-4 h-4" />}
          onClick={() => setCurrentView('logbook-review')}
        >
          Review Logbook ({pendingLogbooks.length})
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Peserta Bimbingan"
          value={supervisedInterns.length}
          subtitle="Fungsi IPDS"
          icon={<Users className="w-5 h-5" />}
          accentColor="blue"
        />
        <KPICard
          title="Logbook Perlu Review"
          value={pendingLogbooks.length}
          subtitle="Entri harian baru"
          icon={<BookOpen className="w-5 h-5" />}
          accentColor="amber"
          onClick={() => setCurrentView('logbook-review')}
        />
        <KPICard
          title="Tugas Berjalan"
          value={activeTasks.length}
          subtitle="Sedang dikerjakan"
          icon={<CheckSquare className="w-5 h-5" />}
          accentColor="emerald"
        />
        <KPICard
          title="Rata-rata Skor Bimbingan"
          value="93.8"
          subtitle="Predikat Sangat Memuaskan"
          icon={<Award className="w-5 h-5" />}
          accentColor="purple"
        />
      </div>

      {/* Actionable "Perlu Tindakan" List */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 font-heading text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            Antrean Tindakan Pembimbing (Action Items)
          </h3>
          <span className="text-xs text-slate-400">Diperbarui otomatis</span>
        </div>

        <div className="space-y-3">
          {pendingLogbooks.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-900">{log.applicantName}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono text-slate-500">{log.date}</span>
                </div>
                <p className="text-slate-700 mt-1 line-clamp-1">
                  Kegiatan: {log.activity}
                </p>
              </div>

              <Button
                variant="accent"
                size="sm"
                onClick={() => setCurrentView('logbook-review')}
                className="shrink-0"
              >
                Tinjau & Verifikasi
              </Button>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-bold text-blue-900">
                Pemberian Nilai Akhir Evaluasi Batch I
              </div>
              <p className="text-slate-600 mt-0.5">
                Peserta Mufarid Adnan telah menyelesaikan seluruh tugas proyek dan siap dinilai pada 5 pilar kompetensi.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('evaluasi-penilaian')}
              className="shrink-0"
            >
              Buka Form Nilai
            </Button>
          </div>
        </div>
      </Card>

      {/* Supervised Interns Quick Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 font-heading text-sm">
            Daftar Peserta di Bawah Bimbingan Anda
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('peserta-bimbingan')}
            className="text-blue-600 text-xs"
          >
            Lihat Monitoring Lengkap →
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Nama Peserta</th>
                <th className="px-4 py-3">Universitas</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Presensi Bulan Ini</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {supervisedInterns.map((intern) => (
                <tr key={intern.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {intern.fullName}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {intern.institution}
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={intern.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-mono">
                    100% Hadir (18 Hari)
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentView('peserta-bimbingan')}
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
