import React, { useState } from 'react';
import {
  Home,
  UserCheck,
  FileCheck,
  Calendar,
  CheckSquare,
  BookOpen,
  Award,
  Users,
  Settings,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Layers,
  FileText,
  ShieldAlert,
  Sliders,
  Hash,
  Activity,
  BarChart3,
  QrCode,
  FolderLock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BackgroundLayer } from './BackgroundLayer';
import { Badge } from '../ui/Badge';
import { Role } from '../../types';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    currentRole,
    currentUser,
    currentView,
    setCurrentView,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsCmdPaletteOpen,
    setCurrentRole,
    showToast
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  // Menus per role as defined in PRD Section 7.1
  const getMenuItems = () => {
    switch (currentRole) {
      case 'peserta':
        return [
          { id: 'beranda', label: 'Beranda', icon: Home },
          { id: 'pendaftaran', label: 'Pendaftaran Saya', icon: FileCheck },
          { id: 'profil', label: 'Profil & Dokumen', icon: Users },
          { id: 'absensi', label: 'Absensi QR', icon: QrCode },
          { id: 'task', label: 'Tugas & Proyek', icon: CheckSquare },
          { id: 'logbook', label: 'Logbook Harian', icon: BookOpen },
          { id: 'nilai', label: 'Evaluasi & Nilai', icon: Award },
          { id: 'sertifikat', label: 'E-Sertifikat', icon: FileText }
        ];

      case 'pembimbing':
        return [
          { id: 'beranda', label: 'Beranda Pembimbing', icon: Home },
          { id: 'peserta-bimbingan', label: 'Peserta Bimbingan', icon: Users },
          { id: 'absensi-bimbingan', label: 'Monitoring Absensi', icon: Calendar },
          { id: 'task-bimbingan', label: 'Kelola Tugas', icon: CheckSquare },
          { id: 'logbook-review', label: 'Review Logbook', icon: BookOpen },
          { id: 'evaluasi-penilaian', label: 'Evaluasi & Nilai', icon: Award }
        ];

      case 'admin':
        return [
          { id: 'beranda', label: 'Dashboard Admin', icon: Home },
          { id: 'verifikasi-berkas', label: 'Verifikasi Berkas', icon: FileCheck },
          { id: 'seleksi', label: 'Seleksi Peserta', icon: UserCheck },
          { id: 'penempatan', label: 'Penempatan Unit', icon: Layers },
          { id: 'kelola-peserta', label: 'Data Peserta', icon: Users },
          { id: 'batch-unit', label: 'Batch & Kuota Unit', icon: Sliders },
          { id: 'absensi-admin', label: 'Rekap Presensi', icon: Calendar },
          { id: 'laporan', label: 'Laporan Magang', icon: BarChart3 }
        ];

      case 'superadmin':
        return [
          { id: 'beranda', label: 'Dashboard Eksekutif', icon: Home },
          { id: 'verifikasi-berkas', label: 'Verifikasi Berkas', icon: FileCheck },
          { id: 'seleksi', label: 'Seleksi Peserta', icon: UserCheck },
          { id: 'batch-unit', label: 'Batch & Kuota Unit', icon: Sliders },
          { id: 'manajemen-akun', label: 'Manajemen Akun', icon: Settings },
          { id: 'role-akses', label: 'Role & Hak Akses', icon: FolderLock },
          { id: 'master-data', label: 'Master Data', icon: Layers },
          { id: 'format-penomoran', label: 'Format Penomoran', icon: Hash },
          { id: 'log-aktivitas', label: 'Log Aktivitas (Audit)', icon: Activity },
          { id: 'dashboard-global', label: 'Dashboard Global', icon: BarChart3 }
        ];

      default:
        return [{ id: 'beranda', label: 'Beranda', icon: Home }];
    }
  };

  const menuItems = getMenuItems();

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    setCurrentView('landing');
    showToast('Telah Keluar', 'Anda telah kembali ke halaman publik.', 'info');
  };

  return (
    <BackgroundLayer context="dashboard">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar (PRD: primary-900 #0B2A4A) */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0B2A4A] text-white shrink-0 border-r border-[#123B66] shadow-xl z-30">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-[#123B66] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1D5FA8] to-blue-400 p-2 flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="font-extrabold text-sm font-heading tracking-wide">
                BPS KOTA DEPOK
              </div>
              <div className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">
                Portal Magang
              </div>
            </div>
          </div>

          {/* User Badge Info in Sidebar */}
          <div className="px-4 py-3 mx-3 my-3 bg-[#123B66]/60 rounded-xl border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1D5FA8] flex items-center justify-center text-xs font-bold text-white uppercase shrink-0">
              {currentUser.name.substring(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate font-heading">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold">
                {currentRole}
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#D9692B] text-white shadow-md font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-[#123B66]/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[#123B66]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-rose-900/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Kembali ke Landing Page</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden flex"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSidebarOpen(false);
            }}
          >
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
            <div className="relative w-72 max-w-full bg-[#0B2A4A] text-white h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="p-4 border-b border-[#123B66] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">
                    BPS
                  </div>
                  <div className="font-bold text-sm font-heading">Sistem Magang</div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3">
                <div className="p-2.5 bg-[#123B66]/60 rounded-xl text-xs">
                  <div className="font-bold text-white truncate">{currentUser.name}</div>
                  <div className="text-[10px] text-amber-300 uppercase font-semibold">{currentRole}</div>
                </div>
              </div>

              <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#D9692B] text-white font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-[#123B66]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-[#123B66]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-300 hover:bg-rose-900/30 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Ke Landing Page</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
            {/* Left: Mobile hamburger & Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-400 capitalize">{currentRole}</span>
                <span>/</span>
                <span className="font-semibold text-slate-800 capitalize">
                  {currentView.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Right: Search (⌘K), Notifications, Profile */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Global Search Button ⌘K */}
              <button
                onClick={() => setIsCmdPaletteOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 text-xs font-medium transition-colors border border-slate-200/60"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">Cari apa saja...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-600 shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                  )}
                </button>

                {/* Notification Dropdown */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-900 font-heading">
                        Notifikasi Sistem
                      </div>
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-[#1D5FA8] hover:underline font-medium"
                      >
                        Tandai sudah dibaca
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-400">
                          Tidak ada notifikasi baru.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-xs ${
                              !n.isRead ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-bold text-slate-800">
                                {n.title}
                              </span>
                              <span className="text-[10px] text-slate-400 shrink-0">
                                {n.timestamp}
                              </span>
                            </div>
                            <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                              {n.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1D5FA8] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {currentUser.name.substring(0, 2)}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <div className="font-bold text-slate-900 truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {currentUser.email}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentView('profil');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700"
                    >
                      Profil Akun
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('landing');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600"
                    >
                      Keluar / Landing Page
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Content Scroll Container */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>

          {/* Mobile Bottom Navigation for Peserta (PRD Section 7: Beranda, Absensi, Task, Logbook, Profil) */}
          {currentRole === 'peserta' && (
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center justify-around py-2 px-1 shadow-lg">
              {[
                { id: 'beranda', label: 'Beranda', icon: Home },
                { id: 'absensi', label: 'Presensi', icon: QrCode },
                { id: 'task', label: 'Tugas', icon: CheckSquare },
                { id: 'logbook', label: 'Logbook', icon: BookOpen },
                { id: 'profil', label: 'Profil', icon: Users }
              ].map(({ id, label, icon: Icon }) => {
                const isActive = currentView === id;
                return (
                  <button
                    key={id}
                    onClick={() => setCurrentView(id)}
                    className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
                      isActive ? 'text-[#D9692B] font-bold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] mt-0.5">{label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </BackgroundLayer>
  );
};
