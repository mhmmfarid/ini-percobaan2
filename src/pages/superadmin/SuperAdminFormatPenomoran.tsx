import React, { useState } from 'react';
import { Hash, Eye, Save, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const SuperAdminFormatPenomoran: React.FC = () => {
  const { numberingFormat, setNumberingFormat, requestConfirm, showToast } = useApp();
  const [formatInput, setFormatInput] = useState(numberingFormat);

  const previewGenerated = formatInput
    .replace('{TAHUN}', '2026')
    .replace('{URUT}', '042')
    .replace('{UNIT}', 'IPDS');

  const handleSaveFormat = () => {
    requestConfirm({
      title: 'Ubah Format Penomoran Dokumen Resmi',
      message: `Perubahan format penomoran hanya akan berlaku untuk penerbitan nomor registrasi dan sertifikat berikutnya.\n\nFormat baru: ${formatInput}\nContoh hasil: ${previewGenerated}\n\nApakah Anda yakin ingin menerapkan perubahan ini?`,
      isDestructive: true,
      requireKeyword: 'FORMAT', // PRD 8.2: Wajib ketik kata kunci
      confirmLabel: 'Simpan Format',
      onConfirm: () => {
        setNumberingFormat(formatInput);
        showToast('Format Penomoran Disimpan', `Format aktif: ${formatInput}`, 'success');
      }
    });
  };

  const handleResetDefault = () => {
    setFormatInput('BPS-3276/MAGANG/{TAHUN}/{URUT}');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Format Penomoran Sertifikat & Registrasi
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Kustomisasi struktur tata kelola penomoran dokumen kedinasan resmi BPS Kota Depok.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <Card variant="standard" className="p-6 space-y-4">
          <h3 className="font-bold text-slate-900 font-heading text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-600" />
            Pola Struktur Format Penomoran
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Template Format Penomoran Sertifikat:
              </label>
              <input
                type="text"
                value={formatInput}
                onChange={(e) => setFormatInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-700 block">Variabel yang Tersedia:</span>
              <ul className="space-y-1 text-slate-600 font-mono text-[11px]">
                <li><strong className="text-blue-700">{'{TAHUN}'}</strong> : Tahun kalender berjalan (2026)</li>
                <li><strong className="text-blue-700">{'{URUT}'}</strong> : Nomor urut 3 digit (001, 002, 042)</li>
                <li><strong className="text-blue-700">{'{UNIT}'}</strong> : Kode unit kerja (IPDS, SOSIAL, dsb)</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={handleResetDefault}
            >
              Kembalikan Default
            </Button>

            <Button
              variant="accent"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSaveFormat}
            >
              Simpan & Terapkan
            </Button>
          </div>
        </Card>

        {/* Live Preview Display */}
        <Card variant="standard" className="p-6 space-y-4 bg-gradient-to-br from-slate-50 to-blue-50/50">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <h3 className="font-bold text-slate-900 font-heading text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              Pratinjau Langsung (Live Preview)
            </h3>
            <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-mono font-bold">
              REAL-TIME
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2">
            <span className="text-xs text-slate-400 font-medium">
              Contoh Hasil Nomor yang Akan Diterbitkan:
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-[#0B2A4A] tracking-wider py-2 bg-slate-50 rounded-xl border border-slate-100">
              {previewGenerated}
            </div>
            <p className="text-[11px] text-slate-500">
              Format ini dicetak pada bagian header dan kode QR E-Sertifikat BPS Kota Depok.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Perhatian: Sertifikat yang telah terbit sebelumnya tidak akan berubah agar tetap valid saat diverifikasi secara publik melalui kode QR.
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
