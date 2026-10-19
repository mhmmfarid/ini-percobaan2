import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  Clock,
  Award,
  FileCheck,
  TrendingUp,
  Filter,
  CheckCircle2,
  Calendar,
  Building2,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Card, KPICard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminDashboard: React.FC = () => {
  const { batch, units, applicants, setCurrentView } = useApp();
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('batch-2026-1');

  // Trend data
  const registrationTrends = [
    { month: 'Okt 2025', count: 18 },
    { month: 'Nov 2025', count: 42 },
    { month: 'Des 2025', count: 85 },
    { month: 'Jan 2026', count: 142 }
  ];

  const universityDistribution = [
    { name: 'Univ. Indonesia (UI)', count: 48 },
    { name: 'Univ. Gunadarma', count: 34 },
    { name: 'Polstat STIS', count: 26 },
    { name: 'IPB University', count: 20 },
    { name: 'Politeknik Negeri Jakarta', count: 14 }
  ];

  const unitQuotaData = units.map(u => ({
    name: u.code,
    terisi: u.filled,
    kuota: u.quota
  }));

  const COLORS = ['#1D5FA8', '#D9692B', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4'];

  return (
    <div className="space-y-6">
      {/* Top Header with Batch Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Dashboard Manajemen BPS Kota Depok
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ringkasan metrik rekrutmen, penempatan unit, dan pemantauan kinerja magang.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter Batch:</span>
            <select
              value={selectedBatchFilter}
              onChange={(e) => setSelectedBatchFilter(e.target.value)}
              className="bg-transparent font-bold text-[#1D5FA8] focus:outline-none cursor-pointer"
            >
              <option value="batch-2026-1">Batch I - Tahun 2026 (Aktif)</option>
              <option value="batch-2025-2">Batch II - Tahun 2025</option>
              <option value="batch-2025-1">Batch I - Tahun 2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* 6 KPI Cards (PRD Section 9.3) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <KPICard
          title="Total Pendaftar"
          value={batch.totalRegistered}
          subtitle="+14% dari batch lalu"
          icon={<Users className="w-4 h-4" />}
          accentColor="blue"
        />
        <KPICard
          title="Peserta Aktif"
          value={28}
          subtitle="100% Kuota Terisi"
          icon={<UserCheck className="w-4 h-4" />}
          accentColor="emerald"
        />
        <KPICard
          title="Menunggu Seleksi"
          value={5}
          subtitle="Verifikasi berkas"
          icon={<Clock className="w-4 h-4" />}
          accentColor="amber"
          onClick={() => setCurrentView('verifikasi-berkas')}
        />
        <KPICard
          title="Selesai Magang"
          value={64}
          subtitle="Alumni 2025"
          icon={<CheckCircle2 className="w-4 h-4" />}
          accentColor="purple"
        />
        <KPICard
          title="Rata-rata Nilai"
          value="92.4"
          subtitle="Sangat Memuaskan"
          icon={<Award className="w-4 h-4" />}
          accentColor="blue"
        />
        <KPICard
          title="Presensi Kedinasan"
          value="98.6%"
          subtitle="Tingkat Disiplin"
          icon={<TrendingUp className="w-4 h-4" />}
          accentColor="terracotta"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Area Chart */}
        <Card variant="standard" className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                Tren Pendaftar Masuk per Bulan
              </h3>
              <p className="text-xs text-slate-500">Pertumbuhan pelamar Batch I 2026</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              ↑ 142 Pelamar
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrends}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D5FA8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1D5FA8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#1D5FA8" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* University Distribution Bar Chart */}
        <Card variant="standard" className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                Distribusi Asal Kampus Pendaftar
              </h3>
              <p className="text-xs text-slate-500">5 Universitas pengirim terbanyak</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={universityDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" width={110} stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#D9692B" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Unit Quotas Capacity Overview */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 font-heading">
              Kapasitas & Alokasi Kuota per Unit Kerja
            </h3>
            <p className="text-xs text-slate-500">Perbandingan kuota terisi vs total kapasitas</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('batch-unit')}
          >
            Kelola Kuota Unit →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map((unit) => {
            const isFull = unit.filled >= unit.quota;
            return (
              <div key={unit.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{unit.name}</span>
                  <span className="font-mono text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {unit.code}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Terisi: <strong className="text-slate-900 font-mono">{unit.filled}/{unit.quota}</strong></span>
                  <span className={isFull ? 'text-rose-600 font-bold' : 'text-emerald-600 font-semibold'}>
                    {isFull ? 'PENUH' : `Sisa ${unit.quota - unit.filled}`}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isFull ? 'bg-rose-600' : 'bg-[#1D5FA8]'}`}
                    style={{ width: `${(unit.filled / unit.quota) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
