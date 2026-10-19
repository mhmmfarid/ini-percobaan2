import React, { useState } from 'react';
import { BarChart3, Download, Printer, Filter, FileText, CheckCircle2, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminLaporan: React.FC = () => {
  const { applicants, batch, showToast } = useApp();
  const [reportType, setReportType] = useState('rekrutmen');

  const handleExportPdf = () => {
    showToast('Laporan PDF Siap', `Laporan_${reportType}_BPS_Depok.pdf telah diproses.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Laporan Eksekutif & Statistik Kedinasan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ekspor laporan formal untuk evaluasi pimpinan BPS Kota Depok dan arsip perguruan tinggi mitra.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Printer className="w-4 h-4" />}
            onClick={() => window.print()}
          >
            Cetak Laporan
          </Button>

          <Button
            variant="accent"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExportPdf}
          >
            Unduh Berkas PDF
          </Button>
        </div>
      </div>

      {/* Filter and Config */}
      <Card variant="standard" className="p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700">Jenis Laporan:</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 font-semibold text-slate-800"
          >
            <option value="rekrutmen">Laporan Seleksi & Rekrutmen Pelamar</option>
            <option value="penempatan">Laporan Penempatan Divisi Unit Kerja</option>
            <option value="kehadiran">Laporan Kedisiplinan & Presensi Harian</option>
            <option value="evaluasi">Laporan Nilai Akhir & Yudisium Magang</option>
          </select>
        </div>

        <div className="text-slate-500">
          Periode: <strong className="text-slate-800">{batch.name}</strong>
        </div>
      </Card>

      {/* Executive Report Preview Document */}
      <Card variant="standard" className="p-8 space-y-6 bg-white border border-slate-300 shadow-sm">
        {/* Header Dinas */}
        <div className="text-center border-b-2 border-slate-800 pb-5 space-y-1">
          <div className="text-sm font-extrabold text-slate-900 uppercase font-heading tracking-wider">
            BADAN PUSAT STATISTIK KOTA DEPOK
          </div>
          <div className="text-xs text-slate-600">
            Gedung Dibaleka II Balai Kota Depok Lantai 3, Jl. Margonda Raya No. 54 Depok 16431
          </div>
          <div className="text-xs font-mono text-slate-500">
            Telp: (021) 7720-3323 • Email: bps3276@bps.go.id
          </div>

          <h2 className="text-lg font-black font-heading text-slate-900 pt-3 uppercase tracking-wide">
            LAPORAN SELEKSI & PENEMPATAN PESERTA MAGANG
          </h2>
          <div className="text-xs font-mono font-semibold text-slate-600">
            NOMOR: LAP-01/BPS-3276/MAGANG/2026
          </div>
        </div>

        {/* Content Table */}
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span>Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>Total Pelamar Terdata: <strong>{applicants.length} Orang</strong></span>
          </div>

          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">No</th>
                <th className="p-2.5">No. Registrasi</th>
                <th className="p-2.5">Nama Lengkap</th>
                <th className="p-2.5">Perguruan Tinggi</th>
                <th className="p-2.5">Unit Penempatan</th>
                <th className="p-2.5">Status Akhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applicants.map((a, i) => (
                <tr key={a.id}>
                  <td className="p-2.5 font-mono">{i + 1}</td>
                  <td className="p-2.5 font-mono font-semibold">{a.registrationNumber}</td>
                  <td className="p-2.5 font-bold text-slate-900">{a.fullName}</td>
                  <td className="p-2.5 text-slate-600">{a.institution}</td>
                  <td className="p-2.5 font-semibold text-blue-800">{a.assignedUnit ? a.assignedUnit.replace('unit-', '').toUpperCase() : 'SELEKSI'}</td>
                  <td className="p-2.5 text-emerald-700 font-bold">LULUS / AKTIF</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Signature */}
        <div className="pt-8 flex justify-end text-xs">
          <div className="text-center space-y-1">
            <div className="text-slate-500">Kota Depok, 2026</div>
            <div className="font-semibold text-slate-800">Penanggung Jawab Magang BPS</div>
            <div className="h-14 flex items-center justify-center text-slate-300 italic">
              [Tanda Tangan & Cap Dinas]
            </div>
            <div className="font-bold text-slate-900 font-heading">
              Siti Rahmawati, S.E.
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              NIP. 198506142010122002
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
