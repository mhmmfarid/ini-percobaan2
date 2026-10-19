import React, { useState } from 'react';
import { FolderLock, Check, Shield, Save, CheckSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface PermissionRow {
  id: string;
  feature: string;
  category: string;
  peserta: boolean;
  pembimbing: boolean;
  admin: boolean;
  superadmin: boolean;
}

export const SuperAdminRoleAkses: React.FC = () => {
  const { requestConfirm, showToast } = useApp();

  const [permissions, setPermissions] = useState<PermissionRow[]>([
    { id: 'p1', feature: 'Pendaftaran & Unggah Dokumen Mandiri', category: 'Pendaftaran', peserta: true, pembimbing: false, admin: false, superadmin: true },
    { id: 'p2', feature: 'Presensi Scan QR & Geolocation', category: 'Absensi', peserta: true, pembimbing: false, admin: true, superadmin: true },
    { id: 'p3', feature: 'Pengisian Logbook Harian', category: 'Logbook', peserta: true, pembimbing: false, admin: false, superadmin: true },
    { id: 'p4', feature: 'Review & Persetujuan Logbook', category: 'Logbook', peserta: false, pembimbing: true, admin: true, superadmin: true },
    { id: 'p5', feature: 'Pembuatan & Penilaian Tugas Proyek', category: 'Tugas', peserta: false, pembimbing: true, admin: true, superadmin: true },
    { id: 'p6', feature: 'Input Nilai Evaluasi Akhir 5 Aspek', category: 'Evaluasi', peserta: false, pembimbing: true, admin: true, superadmin: true },
    { id: 'p7', feature: 'Verifikasi Keabsahan Berkas Pendaftar', category: 'Seleksi', peserta: false, pembimbing: false, admin: true, superadmin: true },
    { id: 'p8', feature: 'Pindah Unit Otomatis & Penempatan', category: 'Seleksi', peserta: false, pembimbing: false, admin: true, superadmin: true },
    { id: 'p9', feature: 'Penerbitan E-Sertifikat Ber-QR Resmi', category: 'Sertifikasi', peserta: false, pembimbing: false, admin: true, superadmin: true },
    { id: 'p10', feature: 'Manajemen Akun & Reset Kata Sandi', category: 'Keamanan', peserta: false, pembimbing: false, admin: false, superadmin: true },
    { id: 'p11', feature: 'Perubahan Format Penomoran Sertifikat', category: 'Keamanan', peserta: false, pembimbing: false, admin: false, superadmin: true },
    { id: 'p12', feature: 'Akses Jejak Audit Log Aktivitas', category: 'Audit', peserta: false, pembimbing: false, admin: false, superadmin: true }
  ]);

  const handleToggle = (id: string, role: 'peserta' | 'pembimbing' | 'admin' | 'superadmin') => {
    setPermissions(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, [role]: !p[role] };
      }
      return p;
    }));
  };

  const handleSave = () => {
    requestConfirm({
      title: 'Simpan Matriks Hak Akses Role',
      message: 'Perubahan hak akses akan segera diterapkan ke seluruh sesi pengguna yang aktif.',
      confirmLabel: 'Terapkan Izin Akses',
      onConfirm: () => {
        showToast('Matriks Izin Disimpan', 'Konfigurasi hak akses role berhasil diperbarui.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Matriks Hak Akses & Perizinan Fitur (RBAC)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Konfigurasikan batas wewenang setiap level pengguna di seluruh modul sistem magang.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Simpan Matriks Akses
        </Button>
      </div>

      {/* Matrix Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Modul & Fitur Sistem</th>
                <th className="px-4 py-3 text-center">Peserta</th>
                <th className="px-4 py-3 text-center">Pembimbing</th>
                <th className="px-4 py-3 text-center">Admin</th>
                <th className="px-4 py-3 text-center">Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {permissions.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900">{row.feature}</div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">{row.category}</span>
                  </td>

                  {/* Peserta */}
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.peserta}
                      onChange={() => handleToggle(row.id, 'peserta')}
                      className="rounded text-[#1D5FA8] focus:ring-blue-400 cursor-pointer"
                    />
                  </td>

                  {/* Pembimbing */}
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.pembimbing}
                      onChange={() => handleToggle(row.id, 'pembimbing')}
                      className="rounded text-[#1D5FA8] focus:ring-blue-400 cursor-pointer"
                    />
                  </td>

                  {/* Admin */}
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.admin}
                      onChange={() => handleToggle(row.id, 'admin')}
                      className="rounded text-[#1D5FA8] focus:ring-blue-400 cursor-pointer"
                    />
                  </td>

                  {/* Super Admin */}
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.superadmin}
                      onChange={() => handleToggle(row.id, 'superadmin')}
                      className="rounded text-purple-600 focus:ring-purple-400 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
