import React from 'react';
import { BarChart3, TrendingUp, Users, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import { Card, KPICard } from '../../components/ui/Card';

export const SuperAdminDashboardGlobal: React.FC = () => {
  const multiBatchComparison = [
    { batch: 'Batch I 2024', pendaftar: 94, diterima: 24, kelulusan: 24 },
    { batch: 'Batch II 2024', pendaftar: 112, diterima: 26, kelulusan: 26 },
    { batch: 'Batch I 2025', pendaftar: 125, diterima: 28, kelulusan: 27 },
    { batch: 'Batch II 2025', pendaftar: 138, diterima: 28, kelulusan: 28 },
    { batch: 'Batch I 2026', pendaftar: 142, diterima: 28, kelulusan: 28 }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Dashboard Eksekutif Lintas Periode (Global Analytics)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Analisis komparatif kinerja program magang BPS Kota Depok dari tahun 2024 hingga 2026.
        </p>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Alumni Magang"
          value="133"
          subtitle="Mahasiswa lulus tersertifikasi"
          icon={<Award className="w-5 h-5" />}
          accentColor="purple"
        />
        <KPICard
          title="Tingkat Kelulusan (Completion)"
          value="99.2%"
          subtitle="Tingkat retensi tertinggi"
          icon={<TrendingUp className="w-5 h-5" />}
          accentColor="emerald"
        />
        <KPICard
          title="Total Pelamar Kumulatif"
          value="611"
          subtitle="Dari 22 Perguruan Tinggi"
          icon={<Users className="w-5 h-5" />}
          accentColor="blue"
        />
        <KPICard
          title="Indeks Kepuasan Peserta"
          value="4.92"
          subtitle="Skala 5.0 (Sangat Baik)"
          icon={<ShieldCheck className="w-5 h-5" />}
          accentColor="terracotta"
        />
      </div>

      {/* Cross-batch Multi-year Chart */}
      <Card variant="standard" className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-sm text-slate-900 font-heading">
            Perbandingan Rasio Rekrutmen & Kelulusan Antar Batch (2024 - 2026)
          </h3>
          <p className="text-xs text-slate-500">
            Pertumbuhan volume animo pendaftar dan konsistensi daya tampung unit BPS Depok.
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={multiBatchComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="batch" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Legend />
              <Bar dataKey="pendaftar" name="Total Pelamar" fill="#1D5FA8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="diterima" name="Peserta Diterima" fill="#D9692B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="kelulusan" name="Lulus Bersertifikat" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
