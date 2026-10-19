import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone, ExternalLink, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicFooter: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#07192C] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D5FA8] to-[#0B2A4A] p-2 flex items-center justify-center text-white shadow-md border border-white/20">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="font-extrabold text-white text-lg font-heading leading-tight">
                  Badan Pusat Statistik Kota Depok
                </div>
                <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold">
                  Republik Indonesia
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Sistem Informasi Manajemen Magang terpadu untuk mahasiswa dan akademisi. Mengembangkan talenta muda di bidang komputasi statistik, analisis data pembangunan, dan diseminasi informasi publik.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Server BPS Aktif
              </span>
              <span>•</span>
              <span>Tahun Anggaran 2026</span>
            </div>
          </div>

          {/* Col 2: Alamat & Kontak */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Kantor BPS Kota Depok
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Gedung Dibaleka II Balai Kota Depok Lantai 3, Jl. Margonda Raya No. 54, Kota Depok, Jawa Barat 16431</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>(021) 7720-3323</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>bps3276@bps.go.id</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Tautan Cepat */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Layanan Terkait
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('verifikasi-sertifikat')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Verifikasi E-Sertifikat
                </button>
              </li>
              <li>
                <a
                  href="https://depokkota.bps.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Portal Resmi BPS Kota Depok
                </a>
              </li>
              <li>
                <a
                  href="https://sirusa.bps.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Sistem Informasi Rujukan Statistik (SIRUSA)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Badan Pusat Statistik Kota Depok. Hak Cipta Dilindungi. Proyek: Mufarid Adnan (Rit).
          </div>
          <div className="flex items-center gap-6">
            <span>Privasi Data Peserta</span>
            <span>Syarat & Ketentuan</span>
            <span>Standar Pelayanan Publik</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
