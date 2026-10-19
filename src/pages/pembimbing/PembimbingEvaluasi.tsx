import React, { useState } from 'react';
import { Award, CheckCircle2, Save, User, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EvaluationAspect } from '../../types';

export const PembimbingEvaluasi: React.FC = () => {
  const { evaluationAspects, saveEvaluation, currentApplicant, showToast } = useApp();
  const [aspectScores, setAspectScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    evaluationAspects.forEach(a => {
      initial[a.id] = a.score || 90;
    });
    return initial;
  });

  const [mentorNotes, setMentorNotes] = useState(
    'Peserta Mufarid Adnan menunjukkan kinerja luar biasa dalam perancangan arsitektur data portal magang BPS Kota Depok. Memiliki inisiatif tinggi dan ketelitian kalkulasi statistik yang sangat baik.'
  );

  const calculateFinalScore = () => {
    return evaluationAspects.reduce((sum, asp) => {
      const score = aspectScores[asp.id] || 0;
      return sum + (score * (asp.weight / 100));
    }, 0);
  };

  const finalScore = calculateFinalScore();

  const getPredicate = (score: number) => {
    if (score >= 90) return { label: 'Sangat Memuaskan (A)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 80) return { label: 'Memuaskan (B+)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (score >= 70) return { label: 'Baik (B)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Cukup (C)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const predicate = getPredicate(finalScore);

  const handleScoreChange = (id: string, val: number) => {
    setAspectScores(prev => ({ ...prev, [id]: val }));
  };

  const handleSave = () => {
    const updatedAspects: EvaluationAspect[] = evaluationAspects.map(a => ({
      ...a,
      score: aspectScores[a.id]
    }));
    saveEvaluation(currentApplicant.id, updatedAspects, mentorNotes);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Lembar Evaluasi Akhir Magang
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Penilaian pembimbing lapangan terhadap kinerja dan capaian kompetensi peserta bimbingan.
        </p>
      </div>

      {/* Target Intern Card */}
      <Card variant="standard" className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#1D5FA8] text-white flex items-center justify-center font-bold text-lg font-heading">
            {currentApplicant.fullName.substring(0, 2)}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 font-heading">
              {currentApplicant.fullName}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              NIM: {currentApplicant.nim} • {currentApplicant.institution}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500">Unit: <strong>IPDS</strong></span>
          <span>•</span>
          <span className="text-slate-500">Batch: <strong>Batch I 2026</strong></span>
        </div>
      </Card>

      {/* Real-time Score Calculator Banner */}
      <Card variant="standard" className="p-6 bg-gradient-to-r from-[#0B2A4A] to-[#1D5FA8] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border-none">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kalkulasi Real-Time Nilai Akhir</span>
          </div>
          <h2 className="text-xl font-bold font-heading">
            Predikat Sementara: {predicate.label}
          </h2>
          <p className="text-xs text-blue-100 max-w-md">
            Skor dihitung otomatis berdasarkan rumus akumulasi bobot 5 pilar kompetensi.
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-[11px] text-blue-200 font-bold uppercase tracking-wider block">
            TOTAL SCORE
          </span>
          <span className="text-4xl sm:text-5xl font-black font-heading text-white">
            {finalScore.toFixed(1)}
          </span>
          <span className="text-xs text-amber-300 block font-mono font-semibold mt-1">
            / 100.0
          </span>
        </div>
      </Card>

      {/* Aspects Input Form */}
      <Card variant="standard" className="p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
          Formulir Penilaian 5 Pilar Kompetensi
        </h3>

        <div className="space-y-6">
          {evaluationAspects.map((asp) => {
            const currentVal = aspectScores[asp.id] || 90;
            const weighted = (currentVal * (asp.weight / 100)).toFixed(2);

            return (
              <div key={asp.id} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 font-heading">
                        {asp.name}
                      </span>
                      <span className="text-xs font-bold text-[#1D5FA8] bg-blue-100/70 px-2 py-0.5 rounded">
                        Bobot: {asp.weight}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {asp.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-500">Tertimbang: <strong className="text-blue-700 font-mono">{weighted}</strong></span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentVal}
                      onChange={(e) => handleScoreChange(asp.id, Number(e.target.value))}
                      className="w-16 px-2.5 py-1.5 text-center font-mono font-bold text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={currentVal}
                  onChange={(e) => handleScoreChange(asp.id, Number(e.target.value))}
                  className="w-full accent-[#1D5FA8] cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        {/* Mentor Narrative Review */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Ulasan Naratif & Rekomendasi Karir dari Pembimbing:
          </label>
          <textarea
            rows={4}
            value={mentorNotes}
            onChange={(e) => setMentorNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Button */}
        <div className="pt-3 flex justify-end">
          <Button
            variant="accent"
            size="lg"
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSave}
            className="shadow-md"
          >
            Simpan & Kunci Evaluasi
          </Button>
        </div>
      </Card>
    </div>
  );
};
