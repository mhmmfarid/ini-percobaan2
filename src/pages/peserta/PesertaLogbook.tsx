import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const PesertaLogbook: React.FC = () => {
  const { logbooks, addLogbook, currentApplicant } = useApp();
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [activity, setActivity] = useState('');
  const [output, setOutput] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [solution, setSolution] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim() || !output.trim()) return;

    addLogbook(activity, output, obstacle, solution);
    setActivity('');
    setOutput('');
    setObstacle('');
    setSolution('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Logbook Harian Kegiatan Magang
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Wajib diisi setiap hari kerja kedinasan sebelum pukul 17.00 WIB untuk diverifikasi oleh pembimbing lapangan.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowModal(true)}
          className="shadow-sm"
        >
          Tulis Logbook Hari Ini
        </Button>
      </div>

      {/* Logbook Timeline / List */}
      <div className="space-y-4">
        {logbooks.map((entry) => (
          <Card key={entry.id} variant="standard" className="p-5 sm:p-6 space-y-4 hover:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1D5FA8] flex items-center justify-center font-bold text-xs shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 font-heading">
                    {entry.date}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Dicatat: {entry.createdAt} WIB
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    entry.status === 'approved'
                      ? 'success'
                      : entry.status === 'revision'
                      ? 'warning'
                      : 'neutral'
                  }
                  size="sm"
                >
                  {entry.status === 'approved'
                    ? 'Disetujui Pembimbing'
                    : entry.status === 'revision'
                    ? 'Perlu Revisi'
                    : 'Menunggu Verifikasi'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider block">
                  Uraian Kegiatan / Pekerjaan:
                </span>
                <p className="text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70 font-medium">
                  {entry.activity}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider block">
                  Output / Hasil Nyata:
                </span>
                <p className="text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70 font-medium">
                  {entry.output}
                </p>
              </div>
            </div>

            {(entry.obstacle || entry.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                {entry.obstacle && (
                  <div className="text-amber-800 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                    <strong className="block text-amber-900 mb-0.5">Kendala:</strong>
                    {entry.obstacle}
                  </div>
                )}
                {entry.solution && (
                  <div className="text-emerald-800 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/60">
                    <strong className="block text-emerald-900 mb-0.5">Solusi:</strong>
                    {entry.solution}
                  </div>
                )}
              </div>
            )}

            {/* Mentor feedback if any */}
            {entry.mentorNote && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                  entry.status === 'revision'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Catatan Pembimbing:</strong> {entry.mentorNote}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Modal Tulis Logbook */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Tulis Logbook Aktivitas Harian
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Tutup ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Uraian Kegiatan Kerja Hari Ini *
                </label>
                <textarea
                  rows={3}
                  required
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="Deskripsikan pekerjaan, survei, atau analisis yang dilakukan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Output / Hasil yang Diperoleh *
                </label>
                <textarea
                  rows={2}
                  required
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  placeholder="Misal: Laporan analisis bab 2 selesai, tabel inflasi dibersihkan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Kendala Teknis (Opsional)
                  </label>
                  <input
                    type="text"
                    value={obstacle}
                    onChange={(e) => setObstacle(e.target.value)}
                    placeholder="Contoh: Format excel rusak"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Solusi Dilakukan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Contoh: Menggunakan script python"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  Kirim Logbook
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
