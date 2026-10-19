import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, ShieldCheck, ArrowLeft, Award, Calendar, Building, User, QrCode } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';

export const VerifikasiSertifikatPage: React.FC = () => {
  const { setCurrentView, getSampleCertificateNumber } = useApp();
  const sampleNum = getSampleCertificateNumber();

  const [certInput, setCertInput] = useState(sampleNum);
  const [hasSearched, setHasSearched] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;

    setHasSearched(true);
    // Check if input matches standard pattern
    if (
      certInput.trim().toUpperCase().includes('BPS') ||
      certInput.trim().toUpperCase().includes('042') ||
      certInput.trim().toUpperCase().includes('2026')
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#07192C]">
      {/* Background photo + dark blue overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center filter blur-xs"
        style={{ backgroundImage: 'url(/images/bg-balaikota-depok.jpg)' }}
      />
      <div className="absolute inset-0 z-0 bg-[#0B2A4A]/85 backdrop-blur-md" />

      {/* Top Header */}
      <header className="relative z-10 p-6 flex items-center justify-between max-w-5xl mx-auto w-full">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Landing Page</span>
        </button>

        <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Portal Verifikasi Resmi BPS Kota Depok</span>
        </div>
      </header>

      {/* Main Glass Card */}
      <main className="relative z-10 max-w-xl mx-auto w-full px-4 py-8">
        <div className="card-glass rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40">
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#1D5FA8] to-[#0B2A4A] flex items-center justify-center text-white shadow-lg">
              <Award className="w-7 h-7 text-amber-300" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Verifikasi Keaslian E-Sertifikat
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Masukkan Nomor Registrasi / Kode ID Sertifikat yang tertera di bawah QR Code dokumen Anda.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-3 mb-6">
            <div className="relative">
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="Contoh: BPS-3276/MAGANG/2026/042"
                className="w-full px-4 py-3 text-sm font-mono font-semibold rounded-xl border border-slate-300 bg-white/90 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D5FA8] shadow-inner"
              />
              <button
                type="button"
                onClick={() => setCertInput(sampleNum)}
                className="absolute right-3 top-3 text-[11px] font-mono text-[#1D5FA8] hover:underline"
              >
                Gunakan Contoh
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<Search className="w-4 h-4" />}
              className="w-full shadow-md"
            >
              Cek Validitas Sertifikat
            </Button>
          </form>

          {/* Result Area */}
          {hasSearched && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              {isValid ? (
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-emerald-900 font-heading">
                        SERTIFIKAT RESMI & VALID
                      </div>
                      <div className="text-xs text-emerald-700">
                        Terdaftar di Pangkalan Data BPS Kota Depok
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 rounded-xl p-4 border border-emerald-100 text-xs space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Nama Peserta:
                      </span>
                      <span className="font-bold text-slate-900">Mufarid Adnan</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" /> Instansi / Kampus:
                      </span>
                      <span className="font-semibold text-slate-800">Universitas Indonesia</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Unit Penempatan:</span>
                      <span className="font-semibold text-slate-800">Integrasi Pengolahan & Diseminasi (IPDS)</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Periode Batch:
                      </span>
                      <span className="font-semibold text-slate-800">Batch I - Tahun 2026</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Predikat Evaluasi:</span>
                      <span className="font-extrabold text-[#1D5FA8] bg-blue-50 px-2 py-0.5 rounded">
                        Sangat Memuaskan (A)
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-500">Nomor Sertifikat:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {certInput}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-800 text-center font-medium">
                    Ditandatangani secara digital oleh Kepala BPS Kota Depok menggunakan sertifikasi elektronik BSrE BSSN.
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center space-y-2">
                  <XCircle className="w-10 h-10 text-rose-500 mx-auto" />
                  <h3 className="font-bold text-rose-900 font-heading text-sm">
                    Sertifikat Tidak Ditemukan
                  </h3>
                  <p className="text-xs text-rose-700">
                    Nomor "{certInput}" tidak tercatat pada basis data sertifikasi BPS Kota Depok. Pastikan nomor dimasukkan dengan benar.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-xs text-slate-400">
        © 2026 Badan Pusat Statistik Kota Depok • Balai Kota Depok Lantai 3
      </footer>
    </div>
  );
};
