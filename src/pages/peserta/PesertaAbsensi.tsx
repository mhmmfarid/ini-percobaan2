import React, { useState } from 'react';
import {
  QrCode,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Download,
  Camera,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const PesertaAbsensi: React.FC = () => {
  const { attendance, recordAttendance, showToast } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'scanning' | 'success'>('idle');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecord = attendance.find(a => a.date === todayStr);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanStep('scanning');

    // Simulate authentic QR camera scanning
    setTimeout(() => {
      setScanStep('success');
      setTimeout(() => {
        setIsScanning(false);
        setScanStep('idle');
        recordAttendance('hadir', 'Gedung Dibaleka II Balai Kota Depok Lantai 3 (Ruang IPDS)');
      }, 1000);
    }, 2000);
  };

  const handleExport = () => {
    showToast('Export Presensi Berhasil', 'File Rekap_Presensi_BPS_Depok_2026.xlsx telah diunduh.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Presensi Kedinasan Digital BPS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Scan barcode QR harian di lobi kantor BPS Kota Depok atau monitor ruang kerja untuk check-in & check-out.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExport}
        >
          Export Presensi Excel
        </Button>
      </div>

      {/* Main QR Scanner & Today's Status Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner Action Card */}
        <Card variant="standard" className="p-6 text-center space-y-4 flex flex-col justify-between items-center bg-gradient-to-b from-white to-slate-50">
          <div className="space-y-2 w-full">
            <span className="text-xs font-bold text-[#1D5FA8] uppercase tracking-wider block">
              Pemindaian Presensi
            </span>
            <h3 className="font-bold text-slate-900 font-heading text-lg">
              Kamera Scan QR Presensi
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pastikan berada di radius Gedung Balaikota Depok saat memindai QR dinas.
            </p>
          </div>

          {/* Scanner Simulation Viewfinder */}
          {isScanning ? (
            <div className="relative w-56 h-56 rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-4 border-2 border-blue-500 shadow-2xl">
              {/* Scan beam */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce" />
              
              <Camera className="w-10 h-10 text-white/50 mb-2 animate-pulse" />
              <span className="text-xs font-bold text-white font-mono">
                {scanStep === 'scanning' ? 'Mendeteksi Kode QR...' : 'Kode Valid! Memproses...'}
              </span>
              <span className="text-[10px] text-slate-400 mt-1">
                Lokasi: Balai Kota Depok
              </span>
            </div>
          ) : (
            <div className="w-48 h-48 rounded-2xl bg-blue-50 border-2 border-dashed border-[#1D5FA8]/30 flex flex-col items-center justify-center p-4">
              <QrCode className="w-20 h-20 text-[#1D5FA8] stroke-[1.5]" />
              <span className="text-[11px] font-semibold text-[#1D5FA8] mt-2">
                Arahkan ke QR Barcode
              </span>
            </div>
          )}

          <Button
            variant={todayRecord?.checkOutTime ? 'secondary' : 'accent'}
            size="lg"
            isLoading={isScanning}
            leftIcon={<Camera className="w-4 h-4" />}
            onClick={handleStartScan}
            className="w-full shadow-md"
          >
            {todayRecord ? (todayRecord.checkOutTime ? 'Presensi Hari Ini Selesai' : 'Scan Check-Out Pulang') : 'Scan Presensi Masuk'}
          </Button>
        </Card>

        {/* Today's Status Details */}
        <Card variant="standard" className="lg:col-span-2 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status Presensi Hari Ini
                </span>
                <div className="text-base font-bold text-slate-900 font-heading mt-0.5">
                  {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              <Badge
                variant={todayRecord ? 'success' : 'warning'}
                size="md"
              >
                {todayRecord ? (todayRecord.checkOutTime ? 'Hadir Lengkap' : 'Sedang Bekerja (Check-In)') : 'Belum Presensi'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Waktu Check-In:</span>
                </div>
                <div className="text-xl font-bold font-mono text-slate-900">
                  {todayRecord?.checkInTime || '-'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{todayRecord?.location || 'Balai Kota Depok'}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Waktu Check-Out:</span>
                </div>
                <div className="text-xl font-bold font-mono text-slate-900">
                  {todayRecord?.checkOutTime || 'Belum Check-Out'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Batas jam dinas: 16.00 WIB
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Presensi dicatat secara geotagging terintegrasi sistem kepegawaian BPS Kota Depok. Keterlambatan lebih dari 30 menit akan mempengaruhi bobot evaluasi kedisiplinan kerja.
            </span>
          </div>
        </Card>
      </div>

      {/* Monthly Attendance Table & Calendar View */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            Riwayat Presensi Bulan Ini
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Total Kehadiran: {attendance.length} Hari
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Check-In</th>
                <th className="px-4 py-3">Check-Out</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Lokasi / Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {attendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {rec.date}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700">
                    {rec.checkInTime}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700">
                    {rec.checkOutTime || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        rec.status === 'hadir'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : rec.status === 'izin'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {rec.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {rec.location} {rec.notes && `(${rec.notes})`}
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
