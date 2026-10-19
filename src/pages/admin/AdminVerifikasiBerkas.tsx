import React, { useState } from 'react';
import {
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  X,
  FileText,
  User,
  GraduationCap,
  ExternalLink,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Applicant, DocumentItem } from '../../types';

export const AdminVerifikasiBerkas: React.FC = () => {
  const { applicants, updateDocumentStatus, updateApplicantStatus, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(applicants[0] || null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(applicants[0]?.documents[0] || null);

  const filteredApplicants = applicants.filter(a =>
    a.fullName.toLowerCase().includes(search.toLowerCase()) ||
    a.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
    a.institution.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenDrawer = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setPreviewDoc(applicant.documents[0] || null);
    setDrawerOpen(true);
  };

  const handleSetDocStatus = (docId: string, status: 'verified' | 'revision_required' | 'rejected') => {
    if (!selectedApplicant) return;
    const note = status === 'revision_required' ? 'Mohon scan ulang dengan resolusi lebih tajam.' : undefined;
    updateDocumentStatus(selectedApplicant.id, docId, status, note);

    setSelectedApplicant(prev => {
      if (!prev) return null;
      return {
        ...prev,
        documents: prev.documents.map(d => d.id === docId ? { ...d, status, notes: note } : d)
      };
    });
  };

  const handleApproveAllApplicant = () => {
    if (!selectedApplicant) return;
    updateApplicantStatus(selectedApplicant.id, 'verified');
    showToast('Seluruh Berkas Terverifikasi', `${selectedApplicant.fullName} siap lanjut ke tahap Seleksi.`, 'success');
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Verifikasi & Validasi Berkas Pelamar
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Periksa keaslian dokumen KTP, CV, Surat Pengantar Kampus, dan Transkrip Nilai pendaftar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama / no registrasi..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <Card variant="standard" className="p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">No. Registrasi</th>
                <th className="px-4 py-3">Nama Lengkap & Kampus</th>
                <th className="px-4 py-3">IPK</th>
                <th className="px-4 py-3">Status Berkas</th>
                <th className="px-4 py-3">Kelengkapan</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredApplicants.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => handleOpenDrawer(app)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-900">
                    {app.registrationNumber}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900 text-sm">
                      {app.fullName}
                    </div>
                    <div className="text-[11px] text-slate-500">{app.institution} • {app.major}</div>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-emerald-700">
                    {app.gpa.toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge status={app.status} size="sm" />
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">
                    {app.documents.filter(d => d.status === 'verified').length} / {app.documents.length} Terverifikasi
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                    >
                      Buka Verifikasi
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Verification Drawer (PRD 9.3: Drawer detail: data diri, pratinjau dokumen di panel, ubah status per dokumen, catatan) */}
      {drawerOpen && selectedApplicant && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Topbar */}
            <div className="p-5 border-b border-slate-200 bg-[#0B2A4A] text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-heading">
                  Verifikasi Berkas: {selectedApplicant.fullName}
                </h3>
                <div className="text-xs text-blue-200 font-mono">
                  {selectedApplicant.registrationNumber} • {selectedApplicant.institution}
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Panel: Left List & Actions | Right Document Preview */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left Column: Documents List & Actions */}
              <div className="w-full lg:w-1/2 p-6 overflow-y-auto space-y-4 border-r border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Daftar Berkas Persyaratan (Klik untuk melihat preview):
                </div>

                <div className="space-y-3">
                  {selectedApplicant.documents.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setPreviewDoc(doc)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        previewDoc?.id === doc.id
                          ? 'border-[#1D5FA8] bg-blue-50/60 ring-1 ring-[#1D5FA8]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {doc.name}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {doc.fileName || 'file.pdf'}
                          </span>
                        </div>
                        <Badge status={doc.status} size="sm" />
                      </div>

                      {/* Action buttons per document */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDocStatus(doc.id, 'verified');
                          }}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold rounded-md border border-emerald-200"
                        >
                          ✓ Valid
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDocStatus(doc.id, 'revision_required');
                          }}
                          className="px-2 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 text-[11px] font-semibold rounded-md border border-amber-200"
                        >
                          Revisi
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDocStatus(doc.id, 'rejected');
                          }}
                          className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[11px] font-semibold rounded-md border border-rose-200"
                        >
                          Tolak
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                    variant="accent"
                    size="md"
                    onClick={handleApproveAllApplicant}
                    className="w-full shadow-md"
                  >
                    Setujui & Loloskan ke Tahap Seleksi
                  </Button>
                </div>
              </div>

              {/* Right Column: High Fidelity Document Preview Panel */}
              <div className="w-full lg:w-1/2 p-6 bg-slate-100 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Pratinjau Dokumen</span>
                    <span className="font-mono text-slate-400">{previewDoc?.fileName}</span>
                  </div>

                  {/* Document Simulated Viewer */}
                  <div className="bg-white rounded-2xl shadow-md border border-slate-300 p-6 aspect-3/4 flex flex-col justify-between text-slate-800 text-xs">
                    <div className="space-y-4">
                      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                        <div className="font-bold text-sm text-[#0B2A4A] uppercase font-heading">
                          {previewDoc?.name}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          TERDAFTAR
                        </span>
                      </div>

                      <div className="space-y-2 text-slate-600">
                        <p><strong>Nama Pemilik:</strong> {selectedApplicant.fullName}</p>
                        <p><strong>Perguruan Tinggi:</strong> {selectedApplicant.institution}</p>
                        <p><strong>NIM:</strong> {selectedApplicant.nim}</p>
                        <p><strong>Tanggal Unggah:</strong> {previewDoc?.updatedAt || '2026-01-14'}</p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 italic text-[11px] leading-relaxed">
                        Tampilan dokumen simulasi resmi. Format berkas memenuhi standar verifikasi keabsahan stempel dekanat dan tanda tangan sah pimpinan perguruan tinggi.
                      </div>
                    </div>

                    <div className="text-center text-[11px] text-slate-400 font-mono border-t border-slate-100 pt-3">
                      Sistem Verifikasi Digital BPS Kota Depok 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
