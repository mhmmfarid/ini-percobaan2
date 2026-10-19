import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/ui/RoleSwitcherBar';
import { Toast } from './components/ui/Toast';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { CommandPalette } from './components/ui/CommandPalette';
import { AppLayout } from './components/layout/AppLayout';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { VerifikasiSertifikatPage } from './pages/public/VerifikasiSertifikatPage';

// Peserta pages
import { PesertaBeranda } from './pages/peserta/PesertaBeranda';
import { PesertaPendaftaran } from './pages/peserta/PesertaPendaftaran';
import { PesertaProfilDokumen } from './pages/peserta/PesertaProfilDokumen';
import { PesertaAbsensi } from './pages/peserta/PesertaAbsensi';
import { PesertaTask } from './pages/peserta/PesertaTask';
import { PesertaLogbook } from './pages/peserta/PesertaLogbook';
import { PesertaNilai } from './pages/peserta/PesertaNilai';
import { PesertaSertifikat } from './pages/peserta/PesertaSertifikat';

// Pembimbing pages
import { PembimbingBeranda } from './pages/pembimbing/PembimbingBeranda';
import { PembimbingPeserta } from './pages/pembimbing/PembimbingPeserta';
import { PembimbingLogbook } from './pages/pembimbing/PembimbingLogbook';
import { PembimbingEvaluasi } from './pages/pembimbing/PembimbingEvaluasi';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVerifikasiBerkas } from './pages/admin/AdminVerifikasiBerkas';
import { AdminSeleksi } from './pages/admin/AdminSeleksi';
import { AdminBatchUnit } from './pages/admin/AdminBatchUnit';
import { AdminAbsensi } from './pages/admin/AdminAbsensi';
import { AdminLaporan } from './pages/admin/AdminLaporan';

// Super Admin pages
import { SuperAdminManajemenAkun } from './pages/superadmin/SuperAdminManajemenAkun';
import { SuperAdminRoleAkses } from './pages/superadmin/SuperAdminRoleAkses';
import { SuperAdminMasterData } from './pages/superadmin/SuperAdminMasterData';
import { SuperAdminFormatPenomoran } from './pages/superadmin/SuperAdminFormatPenomoran';
import { SuperAdminLogAktivitas } from './pages/superadmin/SuperAdminLogAktivitas';
import { SuperAdminDashboardGlobal } from './pages/superadmin/SuperAdminDashboardGlobal';

const MainRouter: React.FC = () => {
  const { currentView, currentRole } = useApp();

  // 1. Standalone Public Views
  if (currentView === 'landing') {
    return (
      <>
        <RoleSwitcherBar />
        <LandingPage />
      </>
    );
  }

  if (currentView === 'verifikasi-sertifikat') {
    return (
      <>
        <RoleSwitcherBar />
        <VerifikasiSertifikatPage />
      </>
    );
  }

  // 2. Authenticated Portal Layout (AppLayout)
  const renderPortalView = () => {
    // Peserta views
    if (currentRole === 'peserta') {
      switch (currentView) {
        case 'beranda':
          return <PesertaBeranda />;
        case 'pendaftaran':
          return <PesertaPendaftaran />;
        case 'profil':
          return <PesertaProfilDokumen />;
        case 'absensi':
          return <PesertaAbsensi />;
        case 'task':
          return <PesertaTask />;
        case 'logbook':
          return <PesertaLogbook />;
        case 'nilai':
          return <PesertaNilai />;
        case 'sertifikat':
          return <PesertaSertifikat />;
        default:
          return <PesertaBeranda />;
      }
    }

    // Pembimbing views
    if (currentRole === 'pembimbing') {
      switch (currentView) {
        case 'beranda':
          return <PembimbingBeranda />;
        case 'peserta-bimbingan':
          return <PembimbingPeserta />;
        case 'absensi-bimbingan':
          return <AdminAbsensi />;
        case 'task-bimbingan':
          return <PesertaTask />;
        case 'logbook-review':
          return <PembimbingLogbook />;
        case 'evaluasi-penilaian':
          return <PembimbingEvaluasi />;
        default:
          return <PembimbingBeranda />;
      }
    }

    // Admin views
    if (currentRole === 'admin') {
      switch (currentView) {
        case 'beranda':
          return <AdminDashboard />;
        case 'verifikasi-berkas':
          return <AdminVerifikasiBerkas />;
        case 'seleksi':
        case 'penempatan':
          return <AdminSeleksi />;
        case 'kelola-peserta':
          return <PembimbingPeserta />;
        case 'batch-unit':
          return <AdminBatchUnit />;
        case 'absensi-admin':
          return <AdminAbsensi />;
        case 'laporan':
          return <AdminLaporan />;
        default:
          return <AdminDashboard />;
      }
    }

    // Super Admin views
    if (currentRole === 'superadmin') {
      switch (currentView) {
        case 'beranda':
          return <AdminDashboard />;
        case 'verifikasi-berkas':
          return <AdminVerifikasiBerkas />;
        case 'seleksi':
          return <AdminSeleksi />;
        case 'batch-unit':
          return <AdminBatchUnit />;
        case 'manajemen-akun':
          return <SuperAdminManajemenAkun />;
        case 'role-akses':
          return <SuperAdminRoleAkses />;
        case 'master-data':
          return <SuperAdminMasterData />;
        case 'format-penomoran':
          return <SuperAdminFormatPenomoran />;
        case 'log-aktivitas':
          return <SuperAdminLogAktivitas />;
        case 'dashboard-global':
          return <SuperAdminDashboardGlobal />;
        default:
          return <AdminDashboard />;
      }
    }

    return <PesertaBeranda />;
  };

  return (
    <>
      <RoleSwitcherBar />
      <AppLayout>
        {renderPortalView()}
      </AppLayout>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
      <Toast />
      <ConfirmDialog />
      <CommandPalette />
    </AppProvider>
  );
}
