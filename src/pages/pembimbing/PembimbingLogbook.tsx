import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  User,
  MessageSquare,
  Clock,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LogbookEntry } from '../../types';

export const PembimbingLogbook: React.FC = () => {
  const { logbooks, reviewLogbook, showToast } = useApp();
  const [selectedLog, setSelectedLog] = useState<LogbookEntry | null>(logbooks[0] || null);
  const [mentorComment, setMentorComment] = useState('');

  const handleApprove = () => {
    if (!selectedLog) return;
    reviewLogbook(selectedLog.id, 'approved', mentorComment || 'Disetujui tanpa catatan.');
    setSelectedLog(prev => prev ? { ...prev, status: 'approved', mentorNote: mentorComment } : null);
    setMentorComment('');
  };

  const handleRequestRevision = () => {
    if (!selectedLog) return;
    if (!mentorComment.trim()) {
      showToast('Wajib Beri Catatan Revisi', 'Tuliskan alasan atau perbaikan yang diminta pada kolom komentar.', 'warning');
      return;
    }
    reviewLogbook(selectedLog.id, 'revision', mentorComment);
    setSelectedLog(prev => prev ? { ...prev, status: 'revision', mentorNote: mentorComment } : null);
    setMentorComment('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Review & Verifikasi Logbook Harian
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Tinjau uraian aktivitas, capaian output, dan kendala teknis yang dilaporkan peserta bimbingan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List of Logs */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Antrean Entri Logbook ({logbooks.length})
          </div>

          {logbooks.map((log) => {
            const isSelected = selectedLog?.id === log.id;

            return (
              <Card
                key={log.id}
                variant="standard"
                onClick={() => {
                  setSelectedLog(log);
                  setMentorComment(log.mentorNote || '');
                }}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#1D5FA8] border-transparent bg-blue-50/40'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {log.applicantName}
                    </span>
                    <Badge
                      variant={
                        log.status === 'approved'
                          ? 'success'
                          : log.status === 'revision'
                          ? 'warning'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {log.status === 'approved'
                        ? 'Disetujui'
                        : log.status === 'revision'
                        ? 'Perlu Revisi'
                        : 'Menunggu'}
                    </Badge>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{log.date}</span>
                    <span>•</span>
                    <span className="font-mono text-slate-400">{log.createdAt}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {log.activity}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Detail & Action Panel */}
        {selectedLog ? (
          <Card variant="standard" className="lg:col-span-2 p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">
                  ID: {selectedLog.id}
                </span>
                <Badge
                  variant={
                    selectedLog.status === 'approved'
                      ? 'success'
                      : selectedLog.status === 'revision'
                      ? 'warning'
                      : 'neutral'
                  }
                  size="md"
                >
                  {selectedLog.status === 'approved'
                    ? 'Disetujui'
                    : selectedLog.status === 'revision'
                    ? 'Perlu Revisi'
                    : 'Menunggu Review'}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-extrabold text-base text-slate-900 font-heading">
                  {selectedLog.applicantName}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-mono">
                  Tanggal Kegiatan: {selectedLog.date}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Uraian Pekerjaan / Kegiatan:
                </span>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-medium">
                  {selectedLog.activity}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Output / Hasil Konkret:
                </span>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-medium">
                  {selectedLog.output}
                </div>
              </div>

              {(selectedLog.obstacle || selectedLog.solution) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedLog.obstacle && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                      <strong className="block mb-0.5">Kendala:</strong>
                      {selectedLog.obstacle}
                    </div>
                  )}
                  {selectedLog.solution && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                      <strong className="block mb-0.5">Solusi:</strong>
                      {selectedLog.solution}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mentor Review Input */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Catatan / Masukan Pembimbing (Wajib jika meminta revisi):
              </label>
              <textarea
                rows={3}
                value={mentorComment}
                onChange={(e) => setMentorComment(e.target.value)}
                placeholder="Tuliskan arahan teknis, perbaikan data, atau saran metodologi..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<AlertTriangle className="w-4 h-4 text-amber-600" />}
                  onClick={handleRequestRevision}
                  className="text-amber-700 hover:bg-amber-50"
                >
                  Minta Revisi
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  onClick={handleApprove}
                >
                  Setujui Logbook
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="lg:col-span-2 p-12 text-center text-slate-400">
            Pilih entri logbook untuk memeriksa dan memverifikasi.
          </div>
        )}
      </div>
    </div>
  );
};
