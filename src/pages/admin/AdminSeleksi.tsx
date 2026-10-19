import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Filter,
  Users,
  Building,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { KuotaBar } from '../../components/ui/KuotaBar';
import { Applicant } from '../../types';

export const AdminSeleksi: React.FC = () => {
  const { applicants, units, updateApplicantStatus, shiftApplicantUnit, requestConfirm, showToast } = useApp();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [unitFilter, setUnitFilter] = useState('all');

  const filteredApplicants = applicants.filter(a => {
    if (unitFilter === 'all') return true;
    return a.preferredUnit1 === unitFilter || a.assignedUnit === unitFilter;
  });

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredApplicants.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplicants.map(a => a.id));
    }
  };

  const handleBulkApprove = () => {
    if (selectedIds.length === 0) return;
    requestConfirm({
      title: 'Konfirmasi Kelulusan Seleksi Massal',
      message: `Setujui kelulusan seleksi untuk ${selectedIds.length} pelamar terpilih? Status mereka akan dialihkan ke Lolos Seleksi & Penempatan.`,
      confirmLabel: 'Ya, Luluskan Semua',
      onConfirm: () => {
        selectedIds.forEach(id => updateApplicantStatus(id, 'selection_passed'));
        showToast('Seleksi Massal Berhasil', `${selectedIds.length} pelamar lolos seleksi.`, 'success');
        setSelectedIds([]);
      }
    });
  };

  const handleManualShift = (applicant: Applicant) => {
    const targetUnit = applicant.preferredUnit2 || 'unit-ipds';
    const targetUnitObj = units.find(u => u.id === targetUnit);
    requestConfirm({
      title: 'Pindahkan Unit Penempatan Pelamar',
      message: `Alihkan ${applicant.fullName} dari Unit Pilihan 1 ke ${targetUnitObj?.name}?`,
      confirmLabel: 'Alihkan Sekarang',
      onConfirm: () => {
        shiftApplicantUnit(applicant.id, targetUnit, 'Pengalihan manual oleh administrator.');
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Seleksi & Pengalihan Unit Otomatis
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Penetapan kelulusan berdasarkan skor portofolio, IPK, serta mekanisme auto-shift unit pilihan 1 ke pilihan 2 jika kuota terpenuhi.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 animate-in fade-in">
            <span className="text-xs font-bold text-slate-700 font-mono">
              {selectedIds.length} Terpilih
            </span>
            <Button
              variant="accent"
              size="sm"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={handleBulkApprove}
            >
              Setujui Massal
            </Button>
          </div>
        )}
      </div>

      {/* Quota Strip per Unit */}
      <Card variant="standard" className="p-5 space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Status Ketersediaan Kuota Real-Time per Unit:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {units.map((u) => (
            <div key={u.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold text-slate-800">
                <span>{u.name}</span>
                <span className="font-mono text-slate-500">{u.filled}/{u.quota}</span>
              </div>
              <KuotaBar filled={u.filled} total={u.quota} showDetails={false} />
            </div>
          ))}
        </div>
      </Card>

      {/* Applicants Selection Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="text-xs font-semibold text-[#1D5FA8] hover:underline"
            >
              {selectedIds.length === filteredApplicants.length ? 'Batal Pilih Semua' : 'Pilih Semua'}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Filter Unit:</span>
            <select
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
            >
              <option value="all">Semua Unit</option>
              {units.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-3 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredApplicants.length}
                    onChange={handleSelectAll}
                    className="rounded text-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3">Nama Lengkap & NIM</th>
                <th className="px-4 py-3">IPK</th>
                <th className="px-4 py-3">Pilihan Unit 1 → 2</th>
                <th className="px-4 py-3">Unit Ditempatkan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredApplicants.map((app) => {
                const isSelected = selectedIds.includes(app.id);
                const unit1 = units.find(u => u.id === app.preferredUnit1);
                const unit2 = units.find(u => u.id === app.preferredUnit2);
                const assigned = units.find(u => u.id === app.assignedUnit);

                return (
                  <tr
                    key={app.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <td className="px-3 py-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(app.id)}
                        className="rounded text-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 text-sm">
                        {app.fullName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {app.institution} • {app.nim}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-emerald-700">
                      {app.gpa.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-medium text-slate-700">{unit1?.code}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-500">{unit2?.code}</span>
                      </div>
                      {app.unitShifted && (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold block mt-0.5">
                          ⚡ Pindah Otomatis ke Pilihan 2
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#1D5FA8]">
                      {assigned?.name || 'Belum Ditentukan'}
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge status={app.status} size="sm" />
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManualShift(app)}
                      >
                        Pindah Unit
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateApplicantStatus(app.id, 'selection_passed')}
                      >
                        Luluskan
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
