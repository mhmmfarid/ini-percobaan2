import React, { useState } from 'react';
import { Calendar, Download, Filter, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminAbsensi: React.FC = () => {
  const { attendance, showToast } = useApp();
  const [filterUnit, setFilterUnit] = useState('all');
  const [search, setSearch] = useState('');

  const handleExport = () => {
    showToast('Export Excel Siap', 'File Rekapitulasi_Kehadiran_Magang_BPS_Depok.xlsx berhasil diunduh.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Rekapitulasi Presensi Seluruh Peserta Magang
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data rekam kedisiplinan harian, jam kedatangan, dan kepulangan di lingkungan Balai Kota Depok.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExport}
        >
          Export Rekap Excel
        </Button>
      </div>

      {/* Filter and Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Filter Unit:</span>
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
            >
              <option value="all">Semua Unit Kerja</option>
              <option value="unit-ipds">IPDS</option>
              <option value="unit-sosial">Statistik Sosial</option>
              <option value="unit-nerwilis">Nerwilis</option>
            </select>
          </div>

          <div className="text-slate-500 font-mono">
            Total Entri Presensi: {attendance.length} Hari
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Nama Peserta</th>
                <th className="px-4 py-3">Check-In</th>
                <th className="px-4 py-3">Check-Out</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Lokasi / Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {attendance.map((att) => (
                <tr key={att.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-slate-600">
                    {att.date}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-900">
                    {att.applicantName}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-700">
                    {att.checkInTime}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-700">
                    {att.checkOutTime || '-'}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        att.status === 'hadir'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {att.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 max-w-xs truncate">
                    {att.location} {att.notes ? `(${att.notes})` : ''}
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
