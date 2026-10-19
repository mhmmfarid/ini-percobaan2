import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  FileText,
  Briefcase,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FormWizardStepper } from '../../components/ui/Stepper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { KuotaBar } from '../../components/ui/KuotaBar';

export const PesertaPendaftaran: React.FC = () => {
  const {
    units,
    currentApplicant,
    submitNewApplication,
    requestConfirm,
    setCurrentView
  } = useApp();

  const [step, setStep] = useState(1);
  const [quotaWarningUnit, setQuotaWarningUnit] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: currentApplicant.fullName || 'Mufarid Adnan',
    email: currentApplicant.email || 'mufarid.adnan@student.ui.ac.id',
    phone: currentApplicant.phone || '081298765432',
    nik: '3276011408020005',
    address: 'Jl. Margonda Raya No. 100, Beji, Kota Depok',
    institution: currentApplicant.institution || 'Universitas Indonesia',
    major: currentApplicant.major || 'Sistem Informasi & Ilmu Komputer',
    nim: currentApplicant.nim || '2106728190',
    gpa: currentApplicant.gpa || 3.88,
    preferredUnit1: currentApplicant.preferredUnit1 || 'unit-ipds',
    preferredUnit2: currentApplicant.preferredUnit2 || 'unit-nerwilis'
  });

  const [uploadedDocs, setUploadedDocs] = useState([
    { name: 'KTP', file: 'KTP_Mufarid_Adnan.pdf', size: '412 KB' },
    { name: 'Curriculum Vitae ATS', file: 'CV_MufaridAdnan_2026.pdf', size: '820 KB' },
    { name: 'Surat Pengantar Magang Kampus', file: 'Surat_Pengantar_UI_Fasilkom.pdf', size: '1.2 MB' },
    { name: 'Transkrip Nilai Akademik', file: 'Transkrip_Akademik_Semester5.pdf', size: '950 KB' },
    { name: 'Portofolio Project', file: 'Portfolio_Web_DataAnalysis.pdf', size: '3.4 MB' }
  ]);

  const unit1Obj = units.find(u => u.id === formData.preferredUnit1);
  const unit2Obj = units.find(u => u.id === formData.preferredUnit2);

  const handleUnit1Change = (unitId: string) => {
    const selected = units.find(u => u.id === unitId);
    if (selected && selected.filled >= selected.quota) {
      setQuotaWarningUnit(selected.name);
    } else {
      setQuotaWarningUnit(null);
    }
    setFormData(prev => ({ ...prev, preferredUnit1: unitId }));
  };

  const handleFinalSubmit = () => {
    requestConfirm({
      title: 'Konfirmasi Pengiriman Berkas Pendaftaran',
      message: `Mohon pastikan seluruh data Anda sudah benar:\n\n• Data Diri: ${formData.fullName} (${formData.institution})\n• Dokumen: 5 berkas lengkap\n• Pilihan 1: ${unit1Obj?.name}\n• Pilihan 2: ${unit2Obj?.name}\n\nPERINGATAN: Berkas yang telah dikirim akan dikunci dan diverifikasi oleh Panitia Seleksi BPS Kota Depok. Apakah Anda yakin ingin mengirim lamaran?`,
      confirmLabel: 'Ya, Kirim Lamaran',
      cancelLabel: 'Periksa Kembali',
      onConfirm: () => {
        submitNewApplication({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          institution: formData.institution,
          major: formData.major,
          nim: formData.nim,
          gpa: Number(formData.gpa),
          preferredUnit1: formData.preferredUnit1,
          preferredUnit2: formData.preferredUnit2
        });
        setCurrentView('beranda');
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Pendaftaran Program Magang BPS Kota Depok
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Lengkapi seluruh form data diri, unggah dokumen persyaratan resmi, dan pilih unit kerja penempatan.
        </p>
      </div>

      {/* Stepper */}
      <Card variant="standard" className="p-5">
        <FormWizardStepper
          steps={['Data Diri', 'Akademik', 'Dokumen', 'Pilih Unit & Submit']}
          currentStep={step}
          onStepClick={(s) => setStep(s)}
        />
      </Card>

      {/* Pop Up / Alert Kuota Penuh (PRD 8.3) */}
      {quotaWarningUnit && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-800">
              <span className="font-bold text-rose-900 text-sm block">
                Peringatan: Kuota Unit {quotaWarningUnit} Telah Penuh!
              </span>
              Jika Anda tetap memilih unit ini, sistem akan otomatis mengalihkan berkas Anda ke Unit Pilihan 2 saat proses penempatan. Kami sarankan memilih unit lain yang masih memiliki sisa kuota.
            </div>
          </div>
          <button
            onClick={() => setQuotaWarningUnit(null)}
            className="text-xs text-rose-600 hover:underline font-semibold"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Step Content */}
      <Card variant="standard" className="p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              1. Identitas & Data Diri Calon Peserta
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Nama Lengkap Sesuai KTP *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Nomor Induk Kependudukan (NIK) *
                </label>
                <input
                  type="text"
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Alamat Email Aktif *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Nomor WhatsApp / HP *
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Alamat Domisili Saat Ini *
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Lanjut ke Data Akademik
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              2. Latar Belakang Akademik & Kompetensi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Perguruan Tinggi / Universitas *
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Program Studi / Jurusan *
                </label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Nomor Induk Mahasiswa (NIM) *
                </label>
                <input
                  type="text"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Indeks Prestasi Kumulatif (IPK Terakhir) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  max="4.00"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Sebelumnya
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Lanjut ke Unggah Dokumen
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              3. Unggah Berkas Dokumen Persyaratan Resmi
            </h3>

            <div className="space-y-3">
              {uploadedDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1D5FA8] flex items-center justify-center shrink-0">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {doc.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {doc.file} ({doc.size})
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                    ✓ Terunggah
                  </span>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-700">
                Tarik & letakkan file tambahan di sini, atau klik untuk memilih file
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Format PDF, Maksimal 5 MB per berkas
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Sebelumnya
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(4)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Lanjut ke Pemilihan Unit
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-600" />
              4. Pemilihan Unit Kerja & Review Akhir
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Unit Pilihan 1 */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Unit Prioritas Pilihan 1 *
                </label>
                <select
                  value={formData.preferredUnit1}
                  onChange={(e) => handleUnit1Change(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} {u.filled >= u.quota ? '(KUOTA PENUH)' : `(Sisa ${u.quota - u.filled})`}
                    </option>
                  ))}
                </select>

                {unit1Obj && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-2">
                    <KuotaBar filled={unit1Obj.filled} total={unit1Obj.quota} showDetails={true} />
                  </div>
                )}
              </div>

              {/* Unit Pilihan 2 */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Unit Cadangan Pilihan 2 * (Pindah Otomatis)
                </label>
                <select
                  value={formData.preferredUnit2}
                  onChange={(e) => setFormData({ ...formData, preferredUnit2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} (Sisa {u.quota - u.filled})
                    </option>
                  ))}
                </select>

                {unit2Obj && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-2">
                    <KuotaBar filled={unit2Obj.filled} total={unit2Obj.quota} showDetails={true} />
                  </div>
                )}
              </div>
            </div>

            {/* Checklist Review Card */}
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs space-y-2">
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600" />
                Ketentuan Pengiriman & Pindah Unit Otomatis:
              </div>
              <p className="text-blue-800 leading-relaxed">
                Apabila kuota pada Unit Prioritas 1 telah terisi penuh oleh pelamar dengan skor seleksi di atas batas, sistem secara otomatis akan memproses penempatan Anda ke Unit Prioritas 2 tanpa menggugurkan kepesertaan Anda.
              </p>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Sebelumnya
              </Button>

              <Button
                variant="accent"
                size="lg"
                onClick={handleFinalSubmit}
                rightIcon={<CheckCircle2 className="w-4 h-4" />}
                className="shadow-md"
              >
                Kirim Berkas Pendaftaran
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
