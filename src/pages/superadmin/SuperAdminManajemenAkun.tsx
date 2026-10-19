import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Key,
  UserX,
  Trash2,
  Edit,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Role, UserAccount } from '../../types';

export const SuperAdminManajemenAkun: React.FC = () => {
  const { users, updateUserRole, toggleUserStatus, deleteUser, requestConfirm, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const handleResetPassword = (user: UserAccount) => {
    requestConfirm({
      title: 'Reset Kata Sandi Pengguna',
      message: `Kirim tautan reset kata sandi baru ke email resmi ${user.email}? Kata sandi sementara akan dibuat secara otomatis.`,
      confirmLabel: 'Reset Kata Sandi',
      onConfirm: () => {
        showToast('Tautan Reset Terkirim', `Email instruksi reset telah dikirim ke ${user.email}.`, 'success');
      }
    });
  };

  const handleToggleStatus = (user: UserAccount) => {
    const isDeactivating = user.status === 'active';
    requestConfirm({
      title: isDeactivating ? 'Nonaktifkan Akun Pengguna' : 'Aktifkan Kembali Akun',
      message: isDeactivating
        ? `Apakah Anda yakin ingin menonaktifkan akun ${user.name}? Pengguna tidak akan dapat login ke dalam sistem hingga diaktifkan kembali.`
        : `Aktifkan kembali akses akun ${user.name}?`,
      isDestructive: isDeactivating,
      confirmLabel: isDeactivating ? 'Nonaktifkan' : 'Aktifkan',
      onConfirm: () => {
        toggleUserStatus(user.id);
      }
    });
  };

  const handleDeleteUser = (user: UserAccount) => {
    requestConfirm({
      title: `Hapus Akun ${user.name}?`,
      message: `Tindakan ini permanen dan akan menghapus seluruh data login serta relasi sistem untuk akun ${user.name} (${user.email}).`,
      isDestructive: true,
      requireKeyword: 'HAPUS', // PRD 8.2: Wajib ketik kata kunci untuk aksi paling berisiko
      confirmLabel: 'Hapus Permanen',
      onConfirm: () => {
        deleteUser(user.id);
      }
    });
  };

  const handleChangeRole = (user: UserAccount, newRole: Role) => {
    requestConfirm({
      title: 'Ubah Hak Akses / Role',
      message: `Ubah hak akses pengguna ${user.name} dari ${user.role.toUpperCase()} menjadi ${newRole.toUpperCase()}?`,
      confirmLabel: 'Terapkan Role',
      onConfirm: () => {
        updateUserRole(user.id, newRole);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Manajemen Akun & Hak Akses Pengguna
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola seluruh akun peserta, pembimbing fungsional, admin kepegawaian, dan super administrator.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<UserPlus className="w-4 h-4" />}
          onClick={() => showToast('Tambah Akun Baru', 'Formulir pembuatan akun kedinasan dibuka.', 'info')}
        >
          Tambah Akun Pengguna
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card variant="standard" className="p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full bg-transparent focus:outline-none text-slate-800"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2 py-1 rounded-lg border border-slate-300 font-medium"
            >
              <option value="all">Semua Role</option>
              <option value="peserta">Peserta</option>
              <option value="pembimbing">Pembimbing</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1 rounded-lg border border-slate-300 font-medium"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Nama & Email</th>
                <th className="px-4 py-3">Role Akses</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Terakhir Login</th>
                <th className="px-4 py-3 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-[#1D5FA8] text-white flex items-center justify-center font-bold text-xs uppercase">
                          {user.name.substring(0, 2)}
                        </div>
                        {user.isOnline && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeRole(user, e.target.value as Role)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 bg-white cursor-pointer focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="peserta">Peserta</option>
                      <option value="pembimbing">Pembimbing</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        user.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-3.5 text-right space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      title="Reset Kata Sandi"
                      onClick={() => handleResetPassword(user)}
                    >
                      <Key className="w-3.5 h-3.5 text-slate-600" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      title={user.status === 'active' ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                      onClick={() => handleToggleStatus(user)}
                    >
                      <UserX className="w-3.5 h-3.5 text-amber-600" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      title="Hapus Akun Permanen"
                      className="hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    </Button>
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
