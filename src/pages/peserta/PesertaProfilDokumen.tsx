import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PesertaProfilDokumen: React.FC = () => {
  const { currentApplicant, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'personal' | 'akademik' | 'kompetensi' | 'dokumen'>('personal');

  const handleReupload = (docName: string) => {
    showToast('Unggah Berkas Baru', `File baru untuk ${docName} berhasil diunggah dan status diubah ke Menunggu Verifikasi.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Profile Summary */}
      <Card variant="standard" className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1D5FA8] to-[#0B2A4A] text-white flex items-center justify-center font-heading font-black text-2xl shadow-lg shrink-0">
          {currentApplicant.fullName.substring(0, 2)}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              {currentApplicant.fullName}
            </h1>
            <Badge status={currentApplicant.status} size="sm" />
          </div>

          <p className="text-xs sm:text-sm text-slate-500">
            {currentApplicant.institution} • {currentApplicant.major}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-600">
            <span>No. Reg: <strong className="font-mono text-slate-800">{currentApplicant.registrationNumber}</strong></span>
            <span>•</span>
            <span>NIM: <strong className="font-mono text-slate-800">{currentApplicant.nim}</strong></span>
            <span>•</span>
            <span>IPK: <strong className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">{currentApplicant.gpa.toFixed(2)}</strong></span>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        {[
          { id: 'personal', label: 'Data Pribadi', icon: User },
          { id: 'akademik', label: 'Akademik', icon: GraduationCap },
          { id: 'kompetensi', label: 'Kompetensi & Skill', icon: Sparkles },
          { id: 'dokumen', label: 'Status Dokumen Berkas', icon: FileText }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === id
                ? 'border-[#D9692B] text-[#D9692B]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Personal */}
      {activeTab === 'personal' && (
        <Card variant="standard" className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Nama Lengkap</span>
              <div className="text-sm font-bold text-slate-800">{currentApplicant.fullName}</div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Alamat Email</span>
              <div className="text-sm font-bold text-slate-800">{currentApplicant.email}</div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Nomor Telepon / WhatsApp</span>
              <div className="text-sm font-bold text-slate-800">{currentApplicant.phone}</div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Nomor Induk Kependudukan (NIK)</span>
              <div className="text-sm font-mono font-bold text-slate-800">3276011408020005</div>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-400 block mb-1">Domisili Tinggal</span>
              <div className="text-sm font-bold text-slate-800">Jl. Margonda Raya No. 100, Kel. Kemiri Muka, Kec. Beji, Kota Depok, Jawa Barat 16423</div>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 2: Akademik */}
      {activeTab === 'akademik' && (
        <Card variant="standard" className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Perguruan Tinggi</span>
              <div className="text-sm font-bold text-slate-800">{currentApplicant.institution}</div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Fakultas / Departemen</span>
              <div className="text-sm font-bold text-slate-800">Fakultas Ilmu Komputer</div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Program Studi</span>
              <div className="text-sm font-bold text-slate-800">{currentApplicant.major}</div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Nomor Induk Mahasiswa (NIM)</span>
              <div className="text-sm font-mono font-bold text-slate-800">{currentApplicant.nim}</div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Indeks Prestasi Kumulatif (IPK)</span>
              <div className="text-xl font-mono font-black text-emerald-700">{currentApplicant.gpa.toFixed(2)} / 4.00</div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Semester Tempuh</span>
              <div className="text-sm font-bold text-slate-800">Semester 6 (Telah Lulus 102 SKS)</div>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Kompetensi Skill Bars */}
      {activeTab === 'kompetensi' && (
        <Card variant="standard" className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-heading mb-2">
            Penguasaan Keahlian & Perangkat Analisis
          </h3>

          <div className="space-y-4">
            {currentApplicant.skills.map((skill, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>{skill.name}</span>
                  <span className="font-mono text-[#1D5FA8]">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-[#1D5FA8] to-[#2575C8] h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 4: Dokumen & Status Verifikasi */}
      {activeTab === 'dokumen' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {currentApplicant.documents.map((doc) => (
              <Card key={doc.id} variant="standard" className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D5FA8] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {doc.name}
                      </h4>
                      <Badge status={doc.status} size="sm" />
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {doc.fileName || 'berkas.pdf'} • {doc.fileSize || '500 KB'} • Terakhir diperbarui: {doc.updatedAt}
                    </div>

                    {doc.notes && (
                      <div className="mt-2 text-xs p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>Catatan Tim Verifikator: {doc.notes}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    onClick={() => showToast('Pratinjau Dokumen', `Membuka ${doc.fileName || doc.name}`, 'info')}
                  >
                    Pratinjau
                  </Button>

                  {doc.status === 'revision_required' && (
                    <Button
                      variant="accent"
                      size="sm"
                      leftIcon={<Upload className="w-3.5 h-3.5" />}
                      onClick={() => handleReupload(doc.name)}
                    >
                      Unggah Ulang
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
