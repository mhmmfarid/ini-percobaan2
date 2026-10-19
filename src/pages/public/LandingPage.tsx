import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Sparkles,
  BarChart,
  FileCheck,
  Layers,
  HelpCircle,
  Building2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { KuotaBar } from '../../components/ui/KuotaBar';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { PublicFooter } from '../../components/layout/PublicFooter';

export const LandingPage: React.FC = () => {
  const { batch, units, setCurrentView, setCurrentRole } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const totalFilled = units.reduce((acc, u) => acc + u.filled, 0);
  const totalCapacity = units.reduce((acc, u) => acc + u.quota, 0);
  const remainingSeats = Math.max(0, totalCapacity - totalFilled);

  const handleOpenRegistration = () => {
    setCurrentRole('peserta');
    setCurrentView('pendaftaran');
  };

  const handleOpenLogin = () => {
    setCurrentRole('peserta');
    setCurrentView('beranda');
  };

  const faqs = [
    {
      q: 'Siapa saja yang berhak mendaftar Program Magang BPS Kota Depok?',
      a: 'Mahasiswa aktif D4/S1 minimal semester 5 dari perguruan tinggi terakreditasi, terutama program studi Statistika, Sains Data, Ilmu Komputer, Sistem Informasi, Matematika, Ekonomi, dan Administrasi Publik.'
    },
    {
      q: 'Bagaimana jika unit pilihan prioritas pertama saya sudah penuh?',
      a: 'Sistem Magang BPS Kota Depok memiliki mekanisme Pindah Unit Otomatis (Auto Shift). Jika kuota Pilihan 1 telah penuh, berkas pendaftaran Anda akan langsung dipertimbangkan untuk Pilihan 2 tanpa harus mendaftar ulang.'
    },
    {
      q: 'Berapa lama durasi magang dan apakah mendapatkan sertifikat resmi?',
      a: 'Durasi magang berlangsung selama 3 bulan penuh. Peserta yang menyelesaikan masa magang dengan evaluasi memuaskan akan diterbitkan E-Sertifikat resmi ber-barcode verifikasi unik dari Kepala BPS Kota Depok.'
    },
    {
      q: 'Apakah pelaksanaan magang dilakukan secara WFO atau Hybrid?',
      a: 'Magang dilaksanakan secara luring (WFO) di Kantor BPS Kota Depok, Gedung Dibaleka II Balai Kota Depok Lantai 3, dengan jam kerja kedinasan Senin–Jumat 07.30–16.00 WIB.'
    },
    {
      q: 'Dokumen apa saja yang wajib disiapkan saat pendaftaran?',
      a: 'KTP, Curriculum Vitae (CV), Surat Pengantar Magang Resmi dari Fakultas/Dekanat, Transkrip Nilai Akademik Terakhir (IPK min 3.00), dan Portofolio penunjang (opsional).'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-[#1D5FA8] selection:text-white">
      <PublicNavbar />

      {/* 1. HERO SECTION (PRD 3.1: Full photo Balaikota + directional dark-blue gradient) */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#07192C]">
        {/* Balaikota photo background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-100"
          style={{ backgroundImage: 'url(/images/bg-balaikota-depok.jpg)' }}
        />
        {/* Gradient overlay: from-[#0B2A4A]/90 via-[#0B2A4A]/70 to-[#0B2A4A]/40 */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B2A4A]/95 via-[#0B2A4A]/80 to-[#0B2A4A]/35" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#07192C] via-transparent to-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-blue-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Program Magang Resmi • BPS Kota Depok {batch.year}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.15] text-white">
              Kembangkan Kompetensi Data di Jantung Statistik Kota Depok
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Bergabunglah bersama Badan Pusat Statistik Kota Depok. Pelajari metodologi survei nasional, olah data makro pembangunan daerah, dan bangun portofolio berdampak nyata bersama para statistisi ahli.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ExternalLink className="w-4 h-4" />}
                onClick={handleOpenRegistration}
                className="shadow-xl"
              >
                Daftar Sekarang
              </Button>

              <a href="#alur">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md"
                >
                  Lihat Alur Seleksi
                </Button>
              </a>
            </div>

            {/* Quick KPI Strip at Bottom of Hero */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg border-t border-white/15">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="text-[11px] text-blue-200 font-medium uppercase tracking-wider">
                  Batch Aktif
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-white mt-0.5">
                  Batch I
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="text-[11px] text-blue-200 font-medium uppercase tracking-wider">
                  Sisa Kuota
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-amber-300 mt-0.5">
                  {remainingSeats} Kursi
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="text-[11px] text-blue-200 font-medium uppercase tracking-wider">
                  Batas Daftar
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-white mt-0.5">
                  28 Jan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SYSTEM ANNOUNCEMENT BANNER IF SEATS ARE LOW */}
      {remainingSeats <= 10 && (
        <div className="bg-amber-500 text-slate-900 py-3 px-4 font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-inner">
          <AlertTriangle className="w-4 h-4 shrink-0 text-slate-900" />
          <span>
            Pemberitahuan: Kuota pendaftaran Batch I tersisa <strong>{remainingSeats} kursi</strong>. Segera kirim berkas pendaftaran sebelum kuota habis!
          </span>
        </div>
      )}

      {/* 3. TENTANG PROGRAM */}
      <section id="tentang" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1D5FA8] uppercase tracking-wider">
                <Building2 className="w-4 h-4" /> Tentang BPS Kota Depok
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                Penyedia Data Statistik Tepercaya untuk Pembangunan Kota Depok
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Badan Pusat Statistik (BPS) Kota Depok adalah lembaga pemerintah non-kementerian yang bertugas menyelenggarakan kegiatan statistik dasar, menghitung angka kemiskinan, inflasi daerah, Indeks Pembangunan Manusia (IPM), serta Produk Domestik Regional Bruto (PDRB).
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Melalui program magang ini, kami membuka kesempatan berharga bagi akademisi dan mahasiswa berprestasi untuk terjun langsung dalam siklus data statistik: mulai dari perancangan kuesioner, pembersihan data (data cleansing), komputasi spasial, hingga diseminasi informasi publik.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Bimbingan 1-on-1 Mentor Ahli</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Sertifikat Resmi Ber-QR</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-video sm:aspect-4/3 relative">
                <img
                  src="/images/bg-balaikota-depok.jpg"
                  alt="Balaikota Depok"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xs uppercase font-semibold tracking-wider text-amber-300">
                      Lokasi Kedinasan
                    </div>
                    <div className="text-lg font-bold font-heading">
                      Gedung Balaikota Depok & Dibaleka II
                    </div>
                    <div className="text-xs text-slate-200 mt-1">
                      Jl. Margonda Raya No. 54, Kota Depok, Jawa Barat
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEUNTUNGAN MAGANG */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#D9692B] uppercase tracking-wider">
              Mengapa Memilih Kami?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Keuntungan Mengikuti Program Magang BPS Depok
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Pengalaman kerja nyata yang diakui secara nasional dengan kurikulum terstruktur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="standard" className="p-6 space-y-4 hover:border-blue-300">
              <div className="w-12 h-12 rounded-2xl bg-[#E3EEF9] text-[#1D5FA8] flex items-center justify-center">
                <BarChart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 font-heading">
                Akses Data Riil Pemkot
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Terlibat langsung dalam pengolahan data riil survei statistik, inflasi bulanan, dan agregasi makro Kota Depok.
              </p>
            </Card>

            <Card variant="standard" className="p-6 space-y-4 hover:border-blue-300">
              <div className="w-12 h-12 rounded-2xl bg-[#FBE9DD] text-[#D9692B] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 font-heading">
                E-Sertifikat Terverifikasi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sertifikat kelulusan resmi bertanda tangan digital Kepala BPS dengan barcode verifikasi unik anti pemalsuan.
              </p>
            </Card>

            <Card variant="standard" className="p-6 space-y-4 hover:border-blue-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 font-heading">
                Mentoring Pranata Komputer
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dibimbing langsung oleh Aparatur Sipil Negara (ASN) fungsional Statistisi dan Pranata Komputer BPS.
              </p>
            </Card>

            <Card variant="standard" className="p-6 space-y-4 hover:border-blue-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 font-heading">
                Konversi SKS & Portofolio
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mendukung konversi SKS mata kuliah magang universitas serta portofolio nyata untuk karir di industri data.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. TIMELINE */}
      <section id="timeline" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#1D5FA8] uppercase tracking-wider">
              Jadwal Kegiatan
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Timeline Pelaksanaan Batch I - 2026
            </h2>
            <p className="text-slate-600 text-sm">
              Pastikan Anda mencatat tanggal-tanggal penting agar tidak tertinggal tahapan seleksi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                date: '05 - 28 Jan 2026',
                title: 'Pendaftaran Online',
                desc: 'Pengisian biodata & unggah berkas portofolio',
                status: 'Selesai'
              },
              {
                date: '29 - 31 Jan 2026',
                title: 'Verifikasi & Seleksi',
                desc: 'Review berkas & uji kecocokan unit kerja',
                status: 'Selesai'
              },
              {
                date: '02 Feb 2026',
                title: 'Onboarding & Penempatan',
                desc: 'Pengarahan pimpinan & penyerahan ke mentor',
                status: 'Selesai'
              },
              {
                date: 'Feb - Apr 2026',
                title: 'Masa Magang & Evaluasi',
                desc: 'Pengerjaan proyek riil, logbook, & sertifikasi',
                status: 'Aktif Berjalan'
              }
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
                <div className="text-xs font-bold font-mono text-[#D9692B] mb-1">
                  {t.date}
                </div>
                <h4 className="font-bold text-base text-slate-900 font-heading mb-1.5">
                  {t.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {t.desc}
                </p>
                <Badge
                  variant={i === 3 ? 'warning' : 'success'}
                  size="sm"
                >
                  {t.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PERSYARATAN */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 space-y-2">
              <span className="text-xs font-bold text-[#D9692B] uppercase tracking-wider">
                Kualifikasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Persyaratan Calon Peserta Magang
              </h2>
            </div>

            <div className="space-y-3">
              {[
                'Mahasiswa aktif D4/S1 dari Perguruan Tinggi Negeri atau Swasta terakreditasi.',
                'Telah menempuh minimal 80 SKS atau berada di semester 5 ke atas.',
                'Memiliki Indeks Prestasi Kumulatif (IPK) minimal 3.00 dari skala 4.00.',
                'Mendapatkan Surat Rekomendasi/Pengantar Magang Resmi dari Fakultas atau Dekanat.',
                'Bersedia mengikuti program magang secara penuh waktu (Senin - Jumat) di Balai Kota Depok.',
                'Memiliki integritas tinggi, bersedia menjaga kerahasiaan data responden BPS.'
              ].map((req, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5 shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-sm text-slate-700 leading-relaxed font-medium">
                    {req}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. UNIT YANG TERSEDIA & KUOTA (PRD 5.1 & 8.3) */}
      <section id="unit" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#1D5FA8] uppercase tracking-wider">
              Penempatan Kerja
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Unit Kerja Tersedia & Status Kuota
            </h2>
            <p className="text-slate-600 text-sm">
              Pilih 2 unit kerja yang sesuai minat dan latar belakang keilmuan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => {
              const isFull = unit.filled >= unit.quota;

              return (
                <Card
                  key={unit.id}
                  variant="standard"
                  className={`p-6 flex flex-col justify-between transition-all ${
                    isFull ? 'bg-slate-50/70 border-slate-300' : 'hover:border-blue-400'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-xs font-bold bg-[#E3EEF9] text-[#1D5FA8] px-2.5 py-1 rounded-lg">
                        {unit.code}
                      </span>

                      {isFull ? (
                        <Badge variant="quota-full" size="sm">
                          KUOTA PENUH
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">
                          Tersedia
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-slate-900 font-heading">
                        {unit.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {unit.department}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {unit.description}
                    </p>

                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Kompetensi Diutamakan:
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {unit.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Kuota bar */}
                  <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
                    <KuotaBar filled={unit.filled} total={unit.quota} />

                    <Button
                      variant={isFull ? 'outline' : 'primary'}
                      size="sm"
                      disabled={isFull}
                      onClick={handleOpenRegistration}
                      className="w-full"
                    >
                      {isFull ? 'Kuota Penuh — Pilih Unit Lain' : 'Pilih Unit Ini'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ALUR PENDAFTARAN */}
      <section id="alur" className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#D9692B] uppercase tracking-wider">
              Panduan Pelamar
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Alur Pendaftaran & Seleksi Magang
            </h2>
            <p className="text-slate-600 text-sm">
              Proses transparan, cepat, dan terotomatisasi secara digital.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Registrasi Akun',
                desc: 'Buat akun dengan email universitas Anda'
              },
              {
                step: '02',
                title: 'Isi Biodata & CV',
                desc: 'Lengkapi profil akademik dan portofolio'
              },
              {
                step: '03',
                title: 'Pilih 2 Unit Kerja',
                desc: 'Tentukan unit prioritas 1 dan prioritas 2'
              },
              {
                step: '04',
                title: 'Verifikasi Berkas',
                desc: 'Pengecekan keaslian berkas oleh Admin'
              },
              {
                step: '05',
                title: 'Pengumuman & Mulai',
                desc: 'Mendapatkan mentor dan QR presensi dinas'
              }
            ].map((st, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-mono text-2xl font-black text-[#1D5FA8]/30">
                  {st.step}
                </span>
                <h4 className="font-bold text-sm text-slate-900 font-heading">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold text-[#1D5FA8] uppercase tracking-wider">
              Pertanyaan Umum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 text-sm hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. CTA DAFTAR (PRD 5.1: Primary-900 block with subtle photo in back, big accent button) */}
      <section className="relative py-20 bg-[#0B2A4A] text-white overflow-hidden">
        {/* Subtle background photo */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-15 filter blur-xs"
          style={{ backgroundImage: 'url(/images/bg-balaikota-depok.jpg)' }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B2A4A] via-[#0B2A4A]/90 to-[#07192C]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pendaftaran Batch I Tahun 2026</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white">
            Siap Mengasah Kemampuan Data di BPS Kota Depok?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Daftarkan diri Anda hari ini. Kuota terbatas untuk memastikan intensitas bimbingan dan kualitas proyek yang Anda hasilkan.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ExternalLink className="w-4 h-4" />}
              onClick={handleOpenRegistration}
              className="shadow-2xl"
            >
              Daftar Magang Sekarang
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleOpenLogin}
              className="text-white border-white/30 hover:bg-white/10"
            >
              Sudah Punya Akun? Masuk Portal
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
