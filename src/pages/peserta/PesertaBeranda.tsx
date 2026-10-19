import React from 'react';
import {
  Calendar,
  CheckSquare,
  BookOpen,
  ArrowRight,
  QrCode,
  FileText,
  AlertCircle,
  Building,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusStepper } from '../../components/ui/Stepper';
import { Card, KPICard } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PesertaBeranda: React.FC = () => {
  const {
    currentApplicant,
    tasks,
    logbooks,
    attendance,
    units,
    setCurrentView
  } = useApp();

  const assignedUnitObj = units.find(u => u.id === currentApplicant.assignedUnit);
  const todaysLogbook = logbooks.find(l => l.date === new Date().toISOString().split('T')[0]);
  const activeTasks = tasks.filter(t => t.status !== 'completed');
  const urgentTask = tasks.find(t => t.status === 'in_progress');

  return (
    <div className="space-y-6">
      {/* 1. Welcoming Hero Card */}
      <Card variant="standard" className="p-6 sm:p-8 bg-gradient-to-r from-[#0B2A4A] to-[#174E88] text-white relative overflow-hidden shadow-xl border-none">
        {/* Subtle background decoration */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-15 pointer-events-none"
          style={{ backgroundImage: 'url(/images/bg-balaikota-depok.jpg)' }}
        />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peserta Magang Aktif • Batch I 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
            Selamat Datang, {currentApplicant.fullName}!
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            Anda ditempatkan di <strong>{assignedUnitObj?.name || 'Fungsi IPDS'}</strong>. Tetap jaga kedisiplinan pengisian logbook harian dan presensi kedinasan tepat waktu.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="accent"
              size="sm"
              leftIcon={<QrCode className="w-4 h-4" />}
              onClick={() => setCurrentView('absensi')}
            >
              Presensi Masuk Hari Ini
            </Button>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<BookOpen className="w-4 h-4" />}
              onClick={() => setCurrentView('logbook')}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Tulis Logbook
            </Button>
          </div>
        </div>
      </Card>

      {/* 2. Alert Pindah Unit Otomatis (PRD 8.3) */}
      {currentApplicant.unitShifted && (
        <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-2xl flex items-start gap-3.5 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <div className="font-bold text-amber-900 font-heading text-sm">
              Informasi Pengalihan Unit Otomatis
            </div>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              {currentApplicant.shiftReason}
            </p>
          </div>
        </div>
      )}

      {/* 3. Status Tracker Stepper (PRD 9.1: Terkirim → Verifikasi → Seleksi → Penempatan → Magang → Selesai) */}
      <Card variant="standard" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Status Perjalanan Magang
            </h2>
            <p className="text-xs text-slate-500">
              Nomor Registrasi: <span className="font-mono font-semibold text-slate-700">{currentApplicant.registrationNumber}</span>
            </p>
          </div>
          <Badge status={currentApplicant.status} size="md" />
        </div>

        <StatusStepper currentStatus={currentApplicant.status} />
      </Card>

      {/* 4. Actionable "Langkah Berikutnya" & Quick Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Action Box */}
        <Card variant="standard" className="p-5 border-l-4 border-l-[#D9692B] flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#D9692B] uppercase tracking-wider">
              Aksi Prioritas Hari Ini
            </span>
            <h3 className="font-bold text-slate-900 font-heading text-sm">
              {todaysLogbook ? 'Tugas Proyek Sedang Berjalan' : 'Isi Logbook Aktivitas Harian'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {todaysLogbook
                ? 'Logbook hari ini telah tercatat. Lanjutkan pengerjaan tugas proyek visualisasi data kecamatan.'
                : 'Catat output pekerjaan dan kendala teknis Anda hari ini sebelum pukul 17.00 WIB.'}
            </p>
          </div>

          <Button
            variant={todaysLogbook ? 'outline' : 'primary'}
            size="sm"
            onClick={() => setCurrentView(todaysLogbook ? 'task' : 'logbook')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="mt-4"
          >
            {todaysLogbook ? 'Lihat Tugas' : 'Buka Form Logbook'}
          </Button>
        </Card>

        {/* Attendance Summary */}
        <Card variant="standard" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Kehadiran Bulan Ini
              </span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-heading">
                {attendance.filter(a => a.status === 'hadir').length}
              </span>
              <span className="text-xs text-slate-500 font-medium">Hari Hadir</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
                100% Tepat Waktu
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">1 Izin Kuliah</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('absensi')}
            className="mt-4 text-blue-600 justify-start px-0 hover:bg-transparent hover:text-blue-700"
          >
            Riwayat Presensi →
          </Button>
        </Card>

        {/* Task Widget */}
        <Card variant="standard" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tugas Berjalan
              </span>
              <CheckSquare className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-3xl font-extrabold text-slate-900 font-heading">
              {activeTasks.length}
            </div>
            <p className="text-xs text-slate-500 mt-1 truncate">
              {urgentTask ? urgentTask.title : 'Semua tugas telah diselesaikan'}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('task')}
            className="mt-4 text-blue-600 justify-start px-0 hover:bg-transparent hover:text-blue-700"
          >
            Buka Daftar Tugas →
          </Button>
        </Card>
      </div>

      {/* 5. Mentor & Unit Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="standard" className="p-6">
          <h3 className="text-sm font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600" />
            Unit Penempatan BPS
          </h3>
          <div className="space-y-2 text-xs">
            <div className="text-sm font-bold text-slate-800">
              {assignedUnitObj?.name}
            </div>
            <p className="text-slate-600 leading-relaxed">
              {assignedUnitObj?.description}
            </p>
            <div className="pt-2 text-slate-500">
              Lokasi: Gedung Dibaleka II Balai Kota Depok, Lantai 3 Ruang IPDS
            </div>
          </div>
        </Card>

        <Card variant="standard" className="p-6">
          <h3 className="text-sm font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            Pembimbing Lapangan
          </h3>
          <div className="space-y-2 text-xs">
            <div className="text-sm font-bold text-slate-800">
              Ir. Hendra Gunawan, S.Si., M.Stat.
            </div>
            <p className="text-slate-500">
              Ketua Tim Fungsional Pranata Komputer & Diseminasi Statistik
            </p>
            <div className="pt-2 flex items-center gap-4 text-slate-600">
              <span>NIP: 197805122002121003</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">Online di Kantor</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
