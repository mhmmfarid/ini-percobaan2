import React, { useState } from 'react';
import {
  Sliders,
  Plus,
  Edit2,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  Building,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { KuotaBar } from '../../components/ui/KuotaBar';
import { UnitKerja } from '../../types';

export const AdminBatchUnit: React.FC = () => {
  const { batch, units, setUnits, setBatch, showToast } = useApp();
  const [editingUnit, setEditingUnit] = useState<UnitKerja | null>(null);
  const [newQuota, setNewQuota] = useState<number>(5);

  const handleEditQuota = (unit: UnitKerja) => {
    setEditingUnit(unit);
    setNewQuota(unit.quota);
  };

  const handleSaveQuota = () => {
    if (!editingUnit) return;
    setUnits(prev => prev.map(u => u.id === editingUnit.id ? { ...u, quota: newQuota } : u));
    showToast('Kuota Unit Diperbarui', `Kuota ${editingUnit.name} diubah menjadi ${newQuota} kursi.`, 'success');
    setEditingUnit(null);
  };

  const handleToggleUnitOpen = (unitId: string) => {
    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, isOpen: !u.isOpen } : u));
    showToast('Status Unit Berubah', undefined, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Manajemen Periode Batch & Kuota Unit Kerja
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Atur kapasitas daya tampung masing-masing divisi teknis BPS Kota Depok dan masa pembukaan rekrutmen.
        </p>
      </div>

      {/* Batch Overview Card */}
      <Card variant="standard" className="p-6 bg-gradient-to-r from-[#0B2A4A] to-[#123B66] text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                {batch.code}
              </span>
              <Badge variant="success" size="sm">
                Sedang Berjalan (Active)
              </Badge>
            </div>
            <h2 className="text-xl font-bold font-heading text-white">
              {batch.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200 pt-1">
              <span>Pendaftaran: {batch.registrationStart} s.d {batch.registrationEnd}</span>
              <span>•</span>
              <span>Pelaksanaan Magang: {batch.internshipStart} s.d {batch.internshipEnd}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-[11px] text-blue-200 uppercase">Total Kapasitas</div>
              <div className="text-2xl font-black font-heading text-white">
                {units.reduce((s, u) => s + u.quota, 0)} Kursi
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => {
          const isFull = unit.filled >= unit.quota;

          return (
            <Card key={unit.id} variant="standard" className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs bg-[#E3EEF9] text-[#1D5FA8] px-2 py-0.5 rounded">
                    {unit.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleUnitOpen(unit.id)}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        unit.isOpen
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {unit.isOpen ? 'Buka' : 'Tutup'}
                    </button>
                    {isFull && <Badge variant="quota-full" size="sm">Penuh</Badge>}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 font-heading">
                    {unit.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {unit.department}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {unit.description}
                </p>

                <div className="text-[11px] text-slate-500">
                  <strong>Pembimbing ASN:</strong> {unit.mentors.join(', ')}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <KuotaBar filled={unit.filled} total={unit.quota} showDetails={true} />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500">
                    Batas Kuota: <strong className="font-mono text-slate-900">{unit.quota}</strong>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                    onClick={() => handleEditQuota(unit)}
                  >
                    Ubah Kuota
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Edit Quota Modal */}
      {editingUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Ubah Batas Kuota Unit
            </h3>
            <p className="text-xs text-slate-500">
              Ubah kuota maksimal untuk <strong>{editingUnit.name}</strong>.
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Jumlah Kuota Kursi Baru:
              </label>
              <input
                type="number"
                min={editingUnit.filled}
                max={20}
                value={newQuota}
                onChange={(e) => setNewQuota(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-mono font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-400 block">
                Minimal {editingUnit.filled} kursi (jumlah yang saat ini sudah terisi).
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingUnit(null)}
              >
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Save className="w-4 h-4" />}
                onClick={handleSaveQuota}
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
