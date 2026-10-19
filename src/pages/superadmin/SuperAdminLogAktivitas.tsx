import React, { useState } from 'react';
import { Activity, Search, Filter, Clock, User, ShieldCheck, Eye, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AuditLog } from '../../types';

export const SuperAdminLogAktivitas: React.FC = () => {
  const { auditLogs } = useApp();
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = auditLogs.filter(log =>
    log.userName.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.targetObject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Log Aktivitas & Jejak Audit (Audit Trail)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Rekaman kronologis setiap perubahan status, pengalihan unit otomatis, verifikasi berkas, dan mutasi data oleh pengguna.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari user, aksi, atau objek..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Waktu & Tanggal</th>
                <th className="px-4 py-3">Pengguna & Role</th>
                <th className="px-4 py-3">Jenis Aksi</th>
                <th className="px-4 py-3">Objek Sasaran</th>
                <th className="px-4 py-3">Alamat IP</th>
                <th className="px-4 py-3 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-slate-500">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900">{log.userName}</div>
                    <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700">
                    {log.targetObject}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">
                    {log.ipAddress}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedLog(log)}
                    >
                      Lihat
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Rincian Log Aktivitas #{selectedLog.id}
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Waktu Pencatatan:</span>
                <span className="font-mono font-bold text-slate-900">{selectedLog.timestamp} WIB</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Pelaku Aksi:</span>
                <span className="font-bold text-slate-900">{selectedLog.userName} ({selectedLog.userRole.toUpperCase()})</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Uraian / Detail Mutasi:</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {selectedLog.details}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block">Jejak IP Address & Perangkat:</span>
                <span className="font-mono text-slate-600">{selectedLog.ipAddress} (Jaringan Lokal BPS Depok)</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedLog(null)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
