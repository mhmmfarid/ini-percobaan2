import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  FileCheck,
  Upload,
  MessageSquare,
  Award,
  ChevronRight,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TaskItem } from '../../types';

export const PesertaTask: React.FC = () => {
  const { tasks, updateTaskProgress, showToast } = useApp();
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(tasks[0] || null);
  const [sliderValue, setSliderValue] = useState<number>(tasks[0]?.progress || 0);
  const [submissionNote, setSubmissionNote] = useState('');

  const handleSelectTask = (task: TaskItem) => {
    setSelectedTask(task);
    setSliderValue(task.progress);
    setSubmissionNote(task.submissionNote || '');
  };

  const handleSaveProgress = () => {
    if (!selectedTask) return;
    updateTaskProgress(selectedTask.id, sliderValue, submissionNote);
    setSelectedTask(prev => prev ? { ...prev, progress: sliderValue, submissionNote } : null);
  };

  const handleUploadFile = () => {
    showToast('File Hasil Tugas Diunggah', 'File project-v1.zip berhasil diunggah.', 'success');
    if (selectedTask) {
      setSelectedTask(prev => prev ? { ...prev, submissionFile: 'project-v1.zip' } : null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Penugasan & Proyek Magang
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pantau instruksi kerja, perbarui progres berkala, dan kirimkan hasil proyek sebelum batas akhir penugasan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List (Left 1 col) */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Daftar Tugas ({tasks.length})
          </div>

          {tasks.map((task) => {
            const isSelected = selectedTask?.id === task.id;
            const isNearDeadline = task.deadline.includes('2026-10-24') || task.deadline.includes('2026-10-25');

            return (
              <Card
                key={task.id}
                variant="standard"
                onClick={() => handleSelectTask(task)}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#1D5FA8] border-transparent bg-blue-50/40'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-xs font-semibold flex items-center gap-1 ${
                        isNearDeadline ? 'text-rose-600 font-bold' : 'text-slate-500'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{task.deadline}</span>
                    </span>

                    <Badge
                      variant={
                        task.status === 'completed'
                          ? 'success'
                          : task.status === 'submitted'
                          ? 'info'
                          : isNearDeadline
                          ? 'danger'
                          : 'primary'
                      }
                      size="sm"
                    >
                      {task.status === 'completed'
                        ? 'Selesai'
                        : task.status === 'submitted'
                        ? 'Menunggu Review'
                        : `${task.progress}%`}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                    {task.title}
                  </h3>

                  {/* Progress track */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        task.status === 'completed' ? 'bg-emerald-500' : 'bg-[#1D5FA8]'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Task Detail Panel (Right 2 cols) */}
        {selectedTask ? (
          <Card variant="standard" className="lg:col-span-2 p-6 space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">
                  ID Penugasan: {selectedTask.id}
                </span>
                <div className="flex items-center gap-2">
                  {selectedTask.score && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Nilai: {selectedTask.score}/100
                    </span>
                  )}
                  <Badge status={selectedTask.status} size="md" />
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                {selectedTask.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span>Deadline: <strong className="text-slate-800">{selectedTask.deadline}</strong></span>
                <span>•</span>
                <span>Pembimbing: <strong className="text-slate-800">Ir. Hendra Gunawan</strong></span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Instruksi Tugas:
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {selectedTask.description}
              </p>
            </div>

            {/* Interactive Progress Slider */}
            <div className="space-y-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Update Progres Pengerjaan Anda:</span>
                <span className="font-mono text-base text-[#1D5FA8]">{sliderValue}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full accent-[#1D5FA8] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Baru Dimulai (0%)</span>
                <span>Separuh (50%)</span>
                <span>Rampung (100%)</span>
              </div>
            </div>

            {/* Submission Note */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Catatan Hasil / Tautan Repositori / Penjelasan:
              </label>
              <textarea
                rows={3}
                value={submissionNote}
                onChange={(e) => setSubmissionNote(e.target.value)}
                placeholder="Tuliskan ringkasan modul atau kendala teknis yang diselesaikan..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload File */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-700 font-medium">
                  {selectedTask.submissionFile || 'Belum ada file diunggah'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Upload className="w-3.5 h-3.5" />}
                onClick={handleUploadFile}
              >
                Pilih Berkas Lampiran
              </Button>
            </div>

            {/* Mentor Feedback (if any) */}
            {selectedTask.feedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  Feedback Mentor (Ir. Hendra Gunawan):
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  "{selectedTask.feedback}"
                </p>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="md"
                rightIcon={<Send className="w-4 h-4" />}
                onClick={handleSaveProgress}
              >
                Simpan & Kirim Progres
              </Button>
            </div>
          </Card>
        ) : (
          <div className="lg:col-span-2 p-12 text-center text-slate-400">
            Pilih salah satu tugas di samping untuk melihat rincian instruksi.
          </div>
        )}
      </div>
    </div>
  );
};
