import React from 'react';
import {
  Award,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const PesertaSertifikat: React.FC = () => {
  const { currentApplicant, getSampleCertificateNumber, setCurrentView, showToast } = useApp();
  const certNumber = getSampleCertificateNumber();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    showToast('Mengunduh Sertifikat PDF', `File Sertifikat_${currentApplicant.fullName.replace(/\s+/g, '_')}.pdf siap diunduh.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            E-Sertifikat Kelulusan Resmi BPS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sertifikat resmi bertanda tangan elektronik dan dilengkapi kode QR verifikasi publik.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Printer className="w-4 h-4" />}
            onClick={handlePrint}
          >
            Cetak Dokumen
          </Button>

          <Button
            variant="accent"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleDownloadPdf}
            className="shadow-sm"
          >
            Unduh PDF Resmi
          </Button>
        </div>
      </div>

      {/* Official Certificate Canvas Container */}
      <div className="bg-slate-200 p-4 sm:p-8 rounded-3xl overflow-x-auto flex justify-center">
        <div className="w-[820px] min-w-[820px] bg-white rounded-xl shadow-2xl p-10 relative border-8 border-double border-[#0B2A4A] text-slate-800">
          {/* Subtle watermark logo in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <Building2 className="w-96 h-96 text-[#0B2A4A]" />
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-1 border-b-2 border-[#0B2A4A]/20 pb-5">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1D5FA8] to-[#0B2A4A] p-2 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-8 h-8 text-amber-300" />
              </div>
            </div>

            <div className="text-xs font-bold tracking-[0.25em] text-[#0B2A4A] uppercase font-heading">
              BADAN PUSAT STATISTIK KOTA DEPOK
            </div>
            <div className="text-[11px] text-slate-500 tracking-wider uppercase font-semibold">
              REPUBLIK INDONESIA
            </div>

            <h2 className="text-2xl font-black font-heading tracking-wider text-[#0B2A4A] pt-3 uppercase">
              SERTIFIKAT MAGANG KERJA
            </h2>
            <div className="text-xs font-mono font-bold text-slate-600">
              NOMOR: {certNumber}
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center my-8 space-y-4">
            <p className="text-xs text-slate-500 italic">
              Kepala Badan Pusat Statistik Kota Depok menerangkan bahwa:
            </p>

            <div className="py-2">
              <div className="text-2xl font-black text-[#0B2A4A] font-heading underline decoration-amber-500 decoration-2 underline-offset-8">
                {currentApplicant.fullName}
              </div>
              <div className="text-xs text-slate-600 font-mono mt-2">
                NIM: {currentApplicant.nim} • {currentApplicant.institution}
              </div>
            </div>

            <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
              Telah menyelesaikan Program Praktik Kerja Lapangan / Magang Mandiri pada unit:
            </p>

            <div className="text-base font-bold text-[#1D5FA8] font-heading">
              Integrasi Pengolahan dan Diseminasi Statistik (IPDS)
            </div>

            <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
              Dilaksanakan terhitung sejak tanggal 02 Februari 2026 sampai dengan 30 April 2026 di Kantor Badan Pusat Statistik Kota Depok dengan predikat hasil evaluasi:
            </p>

            <div className="inline-block bg-[#E3EEF9] text-[#1D5FA8] font-black text-sm px-5 py-2 rounded-xl border border-[#1D5FA8]/30 font-heading uppercase tracking-wide">
              SANGAT MEMUASKAN (SKOR: 93.6)
            </div>
          </div>

          {/* Certificate Footer: Signatures & QR */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-3 items-end text-xs">
            {/* QR verification */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-white border border-slate-300 p-1.5 rounded-lg shadow-xs shrink-0 flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
              <div className="text-[10px] text-slate-500 space-y-0.5">
                <div className="font-bold text-slate-700">Scan QR untuk verifikasi</div>
                <div>ID: <span className="font-mono font-semibold">042-2026</span></div>
                <div className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Valid BPS RI
                </div>
              </div>
            </div>

            {/* Seal / Cap Resmi */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-[#1D5FA8]/40 flex items-center justify-center text-[9px] text-[#1D5FA8] font-bold uppercase rotate-12">
                Cap Dinas BPS Depok
              </div>
            </div>

            {/* Digital Signature Kepala BPS */}
            <div className="text-right space-y-1">
              <div className="text-[11px] text-slate-500">
                Depok, 30 April 2026
              </div>
              <div className="text-[11px] font-semibold text-slate-700">
                Kepala BPS Kota Depok
              </div>
              <div className="py-1">
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold inline-block">
                  [TTE BSrE BSSN Tersertifikasi]
                </span>
              </div>
              <div className="font-bold text-slate-900 font-heading text-xs">
                Drs. Bambang Wicaksono, M.M.
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                NIP. 196811201994011001
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Link Banner */}
      <Card variant="standard" className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-50">
        <span className="text-slate-600">
          Uji keabsahan nomor sertifikat ini di halaman publik verifikasi:
        </span>
        <Button
          variant="outline"
          size="sm"
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          onClick={() => setCurrentView('verifikasi-sertifikat')}
        >
          Buka Halaman Cek Sertifikat
        </Button>
      </Card>
    </div>
  );
};
