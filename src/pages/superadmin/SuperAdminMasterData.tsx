import React, { useState } from 'react';
import {
  Layers,
  Award,
  FileText,
  Building,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EvaluationAspect } from '../../types';

export const SuperAdminMasterData: React.FC = () => {
  const { evaluationAspects, units, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'aspek' | 'dokumen' | 'unit'>('aspek');

  const [aspects, setAspects] = useState<EvaluationAspect[]>(evaluationAspects);

  const totalWeight = aspects.reduce((sum, a) => sum + (Number(a.weight) || 0), 0);
  const isWeightValid = totalWeight === 100;

  const handleAspectWeightChange = (id: string, weight: number) => {
    setAspects(prev => prev.map(a => a.id === id ? { ...a, weight } : a));
  };

  const handleSaveAspects = () => {
    if (!isWeightValid) {
      showToast('Gagal Menyimpan', 'Total bobot aspek evaluasi harus tepat berjumlah 100%.', 'danger');
      return;
    }
    showToast('Master Aspek Disimpan', 'Konfigurasi bobot 100% telah diperbarui.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Master Data Sistem & Konfigurasi Parameter
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Kelola master pilar aspek evaluasi, bobot nilai, jenis dokumen wajib, dan struktur unit organisasi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        {[
          { id: 'aspek', label: 'Aspek Evaluasi & Bobot', icon: Award },
          { id: 'dokumen', label: 'Jenis Dokumen Wajib', icon: FileText },
          { id: 'unit', label: 'Divisi Unit Kerja', icon: Building }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
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

      {/* Tab 1: Aspek Evaluasi & Bobot with 100% Indicator */}
      {activeTab === 'aspek' && (
        <div className="space-y-6">
          {/* Total Weight Validator Banner (PRD 9.4: Indikator total bobot harus 100% — merah jika tidak!) */}
          <Card
            variant="standard"
            className={`p-5 flex items-center justify-between border-2 ${
              isWeightValid
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                : 'bg-rose-50/80 border-rose-400 text-rose-900 animate-pulse'
            }`}
          >
            <div className="flex items-center gap-3">
              {isWeightValid ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
              )}
              <div>
                <div className="font-extrabold text-sm font-heading">
                  {isWeightValid
                    ? 'Total Bobot Valid: Tepat 100%'
                    : `Total Bobot Tidak Valid: ${totalWeight}% (Harus 100%)`}
                </div>
                <div className="text-xs mt-0.5">
                  {isWeightValid
                    ? 'Seluruh aspek memenuhi kriteria kalkulasi nilai akhir sertifikat.'
                    : 'Mohon sesuaikan persentase bobot masing-masing aspek agar berjumlah 100%.'}
                </div>
              </div>
            </div>

            <div className="text-2xl font-black font-mono">
              {totalWeight}%
            </div>
          </Card>

          {/* Aspects Table */}
          <Card variant="standard" className="p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Kode</th>
                    <th className="px-4 py-3">Nama Aspek Pilar</th>
                    <th className="px-4 py-3">Deskripsi Indikator</th>
                    <th className="px-4 py-3 text-center">Bobot (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {aspects.map((asp) => (
                    <tr key={asp.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-700">
                        {asp.code}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-900 text-sm">
                        {asp.name}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 max-w-md">
                        {asp.description}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <div className="inline-flex items-center gap-1">
                          <input
                            type="number"
                            min="5"
                            max="60"
                            value={asp.weight}
                            onChange={(e) => handleAspectWeightChange(asp.id, Number(e.target.value))}
                            className="w-16 px-2 py-1 text-center font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          />
                          <span className="font-bold text-slate-500">%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button
                variant="accent"
                size="md"
                leftIcon={<Save className="w-4 h-4" />}
                disabled={!isWeightValid}
                onClick={handleSaveAspects}
              >
                Simpan Konfigurasi Bobot
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Dokumen */}
      {activeTab === 'dokumen' && (
        <Card variant="standard" className="p-6 space-y-4">
          <h3 className="font-bold text-slate-900 font-heading text-sm">
            Daftar Jenis Berkas Dokumen Wajib
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { code: 'KTP', name: 'Kartu Tanda Penduduk / Identitas Mahasiswa', req: 'Wajib' },
              { code: 'CV', name: 'Curriculum Vitae (ATS Friendly Format)', req: 'Wajib' },
              { code: 'SURAT_PENGANTAR', name: 'Surat Pengantar Magang Kampus / Dekanat', req: 'Wajib' },
              { code: 'TRANSKRIP', name: 'Transkrip Nilai Akademik Terakhir (Min IPK 3.00)', req: 'Wajib' },
              { code: 'PORTFOLIO', name: 'Portofolio Project & Sertifikat Kompetensi', req: 'Opsional Penunjang' }
            ].map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{d.name}</div>
                  <div className="font-mono text-slate-400 text-[11px]">{d.code}</div>
                </div>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {d.req}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: Unit */}
      {activeTab === 'unit' && (
        <Card variant="standard" className="p-6 space-y-4">
          <h3 className="font-bold text-slate-900 font-heading text-sm">
            Daftar Divisi Unit Kerja Teknis BPS Kota Depok
          </h3>
          <div className="space-y-2 text-xs">
            {units.map((u) => (
              <div key={u.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{u.name}</div>
                  <div className="text-slate-500">{u.department}</div>
                </div>
                <div className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded font-bold">
                  Kapasitas: {u.quota} Kursi
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
