import React from 'react';
import { Award, CheckCircle2, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const PesertaNilai: React.FC = () => {
  const { evaluationAspects, setCurrentView } = useApp();

  const totalFinalScore = evaluationAspects.reduce((sum, item) => {
    return sum + ((item.score || 0) * (item.weight / 100));
  }, 0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
          Evaluasi Kinerja & Nilai Akhir
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Penilaian komprehensif oleh pembimbing lapangan berdasarkan 5 pilar kompetensi kedinasan BPS Kota Depok.
        </p>
      </div>

      {/* Big Score Summary Banner */}
      <Card variant="standard" className="p-6 sm:p-8 bg-gradient-to-r from-[#0B2A4A] to-[#1D5FA8] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border-none">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hasil Evaluasi Akhir Magang</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading">
            Predikat: Sangat Memuaskan (A)
          </h2>
          <p className="text-xs text-blue-100 max-w-md leading-relaxed">
            Selamat! Nilai akumulatif Anda memenuhi kualifikasi predikat kehormatan tertinggi dan sertifikat resmi telah diterbitkan.
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
          <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center">
            <span className="text-[11px] text-blue-200 font-bold uppercase tracking-wider block">
              FINAL SCORE
            </span>
            <span className="text-4xl sm:text-5xl font-black font-heading text-white">
              {totalFinalScore.toFixed(1)}
            </span>
            <span className="text-xs text-emerald-300 font-bold block mt-1">
              Skala 100.0
            </span>
          </div>

          <Button
            variant="accent"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => setCurrentView('sertifikat')}
            className="shadow-md"
          >
            Lihat E-Sertifikat
          </Button>
        </div>
      </Card>

      {/* Aspects Breakdown Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          Rincian Bobot & Penilaian Aspek
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Pilar Aspek Kompetensi</th>
                <th className="px-4 py-3 text-center">Bobot</th>
                <th className="px-4 py-3 text-center">Skor (0-100)</th>
                <th className="px-4 py-3 text-right">Nilai Tertimbang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {evaluationAspects.map((asp, idx) => {
                const weighted = ((asp.score || 0) * (asp.weight / 100)).toFixed(2);
                return (
                  <tr key={asp.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3.5 text-slate-400 font-mono">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 text-sm">
                        {asp.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {asp.description}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono font-bold text-slate-700">
                      {asp.weight}%
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {asp.score}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-extrabold text-[#1D5FA8] text-sm">
                      {weighted}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="border-t-2 border-slate-200 bg-slate-50 font-bold text-xs">
              <tr>
                <td colSpan={2} className="px-4 py-3.5 text-slate-900">
                  TOTAL AKUMULASI (100% BOBOT)
                </td>
                <td className="px-4 py-3.5 text-center font-mono">
                  100%
                </td>
                <td className="px-4 py-3.5 text-center text-slate-400">-</td>
                <td className="px-4 py-3.5 text-right font-mono font-black text-lg text-[#1D5FA8]">
                  {totalFinalScore.toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
};
