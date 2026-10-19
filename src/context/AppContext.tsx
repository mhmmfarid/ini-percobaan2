import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  UserAccount,
  Applicant,
  UnitKerja,
  BatchMagang,
  AttendanceRecord,
  TaskItem,
  LogbookEntry,
  EvaluationAspect,
  AuditLog,
  SystemNotification
} from '../types';
import {
  INITIAL_BATCH,
  INITIAL_UNITS,
  INITIAL_USERS,
  INITIAL_ALL_APPLICANTS,
  INITIAL_TASKS,
  INITIAL_LOGBOOKS,
  INITIAL_ATTENDANCE,
  INITIAL_EVALUATION_ASPECTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

export interface ToastItem {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  message?: string;
}

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  requireKeyword?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface AppContextType {
  // Navigation & Auth
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentUser: UserAccount;
  currentView: string;
  setCurrentView: (view: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register' | 'forgot';
  setAuthMode: (mode: 'login' | 'register' | 'forgot') => void;

  // Data
  batch: BatchMagang;
  setBatch: React.Dispatch<React.SetStateAction<BatchMagang>>;
  units: UnitKerja[];
  setUnits: React.Dispatch<React.SetStateAction<UnitKerja[]>>;
  applicants: Applicant[];
  currentApplicant: Applicant;
  setCurrentApplicant: React.Dispatch<React.SetStateAction<Applicant>>;
  tasks: TaskItem[];
  logbooks: LogbookEntry[];
  attendance: AttendanceRecord[];
  evaluationAspects: EvaluationAspect[];
  users: UserAccount[];
  auditLogs: AuditLog[];
  notifications: SystemNotification[];

  // Settings
  numberingFormat: string;
  setNumberingFormat: (fmt: string) => void;
  getSampleCertificateNumber: () => string;

  // Actions
  toast: ToastItem | null;
  showToast: (title: string, message?: string, type?: ToastItem['type']) => void;
  dismissToast: () => void;
  confirmDialog: ConfirmDialogOptions | null;
  requestConfirm: (options: ConfirmDialogOptions) => void;
  closeConfirmDialog: () => void;
  isCmdPaletteOpen: boolean;
  setIsCmdPaletteOpen: (open: boolean) => void;

  // Specific Business Methods
  submitNewApplication: (appData: Partial<Applicant>) => boolean;
  recordAttendance: (status: 'hadir' | 'izin' | 'sakit' | 'alpa', location?: string, notes?: string) => void;
  addLogbook: (activity: string, output: string, obstacle?: string, solution?: string) => void;
  reviewLogbook: (id: string, status: 'approved' | 'revision', note?: string) => void;
  updateTaskProgress: (taskId: string, progress: number, note?: string) => void;
  reviewTask: (taskId: string, score: number, feedback: string) => void;
  updateApplicantStatus: (appId: string, status: Applicant['status'], note?: string) => void;
  shiftApplicantUnit: (appId: string, newUnitId: string, reason: string) => void;
  updateDocumentStatus: (appId: string, docId: string, status: 'verified' | 'revision_required' | 'rejected', notes?: string) => void;
  saveEvaluation: (appId: string, aspects: EvaluationAspect[], notes: string) => void;
  updateUserRole: (userId: string, newRole: Role) => void;
  toggleUserStatus: (userId: string) => void;
  deleteUser: (userId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('peserta');
  const [currentView, setCurrentView] = useState<string>('landing'); // 'landing' | 'dashboard' | 'pendaftaran' etc.
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Persistence
  const [batch, setBatch] = useState<BatchMagang>(() => {
    const saved = localStorage.getItem('bps_batch');
    return saved ? JSON.parse(saved) : INITIAL_BATCH;
  });

  const [units, setUnits] = useState<UnitKerja[]>(() => {
    const saved = localStorage.getItem('bps_units');
    return saved ? JSON.parse(saved) : INITIAL_UNITS;
  });

  const [applicants, setApplicants] = useState<Applicant[]>(() => {
    const saved = localStorage.getItem('bps_applicants');
    return saved ? JSON.parse(saved) : INITIAL_ALL_APPLICANTS;
  });

  const [currentApplicant, setCurrentApplicant] = useState<Applicant>(() => {
    return applicants[0];
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('bps_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [logbooks, setLogbooks] = useState<LogbookEntry[]>(() => {
    const saved = localStorage.getItem('bps_logbooks');
    return saved ? JSON.parse(saved) : INITIAL_LOGBOOKS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('bps_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [evaluationAspects, setEvaluationAspects] = useState<EvaluationAspect[]>(() => {
    const saved = localStorage.getItem('bps_eval_aspects');
    return saved ? JSON.parse(saved) : INITIAL_EVALUATION_ASPECTS;
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('bps_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('bps_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('bps_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [numberingFormat, setNumberingFormat] = useState<string>('BPS-3276/MAGANG/{TAHUN}/{URUT}');
  const [toast, setToast] = useState<ToastItem | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogOptions | null>(null);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState<boolean>(false);

  // Sync current user based on current role
  const currentUser: UserAccount = users.find(u => u.role === currentRole) || users[0];

  // Save to localStorage when states update
  useEffect(() => {
    localStorage.setItem('bps_units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('bps_applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem('bps_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('bps_logbooks', JSON.stringify(logbooks));
  }, [logbooks]);

  useEffect(() => {
    localStorage.setItem('bps_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('bps_users', JSON.stringify(users));
  }, [users]);

  // Toast auto-hide
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Hotkey ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, message?: string, type: ToastItem['type'] = 'success') => {
    setToast({ id: Date.now().toString(), title, message, type });
  };

  const dismissToast = () => setToast(null);

  const requestConfirm = (options: ConfirmDialogOptions) => {
    setConfirmDialog(options);
  };

  const closeConfirmDialog = () => {
    setConfirmDialog(null);
  };

  const getSampleCertificateNumber = () => {
    const year = new Date().getFullYear().toString();
    return numberingFormat
      .replace('{TAHUN}', year)
      .replace('{URUT}', '042')
      .replace('{UNIT}', 'IPDS');
  };

  // Submit Application
  const submitNewApplication = (appData: Partial<Applicant>): boolean => {
    // Check if unit 1 is full
    const unit1 = units.find(u => u.id === appData.preferredUnit1);
    let shifted = false;
    let assignedUnit = appData.preferredUnit1;
    let shiftReason = undefined;

    if (unit1 && unit1.filled >= unit1.quota) {
      // Automatic shift to preferredUnit2
      shifted = true;
      assignedUnit = appData.preferredUnit2;
      const unit2 = units.find(u => u.id === appData.preferredUnit2);
      shiftReason = `Kuota ${unit1.name} telah terpenuhi. Berkas dialihkan secara otomatis ke Pilihan 2 (${unit2?.name || 'Unit Alternatif'}).`;
    }

    const regNum = `BPS-DPK/REG/2026/${String(applicants.length + 1).padStart(3, '0')}`;
    const newApplicant: Applicant = {
      id: `app-${Date.now()}`,
      userId: currentUser.id,
      registrationNumber: regNum,
      fullName: appData.fullName || currentUser.name,
      email: appData.email || currentUser.email,
      phone: appData.phone || '081234567890',
      institution: appData.institution || 'Universitas Indonesia',
      major: appData.major || 'Sistem Informasi',
      nim: appData.nim || '2106728190',
      gpa: appData.gpa || 3.85,
      preferredUnit1: appData.preferredUnit1 || 'unit-ipds',
      preferredUnit2: appData.preferredUnit2 || 'unit-nerwilis',
      assignedUnit: assignedUnit,
      status: 'submitted',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      unitShifted: shifted,
      shiftReason: shiftReason,
      documents: appData.documents || currentApplicant.documents,
      skills: appData.skills || currentApplicant.skills
    };

    setApplicants(prev => [newApplicant, ...prev]);
    setCurrentApplicant(newApplicant);

    // Update unit quota
    setUnits(prev => prev.map(u => {
      if (u.id === assignedUnit) {
        return { ...u, filled: Math.min(u.quota, u.filled + 1) };
      }
      return u;
    }));

    // Add Audit Log
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userName: newApplicant.fullName,
      userRole: 'peserta',
      action: 'SUBMIT_APPLICATION',
      targetObject: `Application ${regNum}`,
      details: shifted ? `Pendaftaran berhasil dikirim. Catatan: Pindah unit otomatis ke Pilihan 2.` : 'Pendaftaran berhasil dikirim.',
      ipAddress: '127.0.0.1'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    showToast('Pendaftaran Berhasil Dikirim!', `Nomor Registrasi: ${regNum}`, 'success');

    if (shifted) {
      // Add notification for shifted unit
      const shiftNotif: SystemNotification = {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        title: 'Pengalihan Otomatis Unit Pilihan 2',
        message: shiftReason || 'Dialihkan ke pilihan 2 karena kuota unit pilihan 1 penuh.',
        type: 'warning',
        timestamp: 'Baru saja',
        isRead: false
      };
      setNotifications(prev => [shiftNotif, ...prev]);
    }

    return true;
  };

  // Record Attendance
  const recordAttendance = (status: 'hadir' | 'izin' | 'sakit' | 'alpa', location = 'Kantor BPS Kota Depok', notes?: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const nowTimeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const existing = attendance.find(a => a.applicantId === currentApplicant.id && a.date === todayStr);

    if (existing) {
      if (!existing.checkOutTime) {
        setAttendance(prev => prev.map(a => a.id === existing.id ? { ...a, checkOutTime: nowTimeStr } : a));
        showToast('Presensi Check-Out Berhasil!', `Waktu: ${nowTimeStr}`, 'success');
      } else {
        showToast('Presensi Lengkap', 'Anda telah melakukan check-in dan check-out hari ini.', 'info');
      }
      return;
    }

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      applicantId: currentApplicant.id,
      applicantName: currentApplicant.fullName,
      unitId: currentApplicant.assignedUnit || 'unit-ipds',
      date: todayStr,
      checkInTime: nowTimeStr,
      status,
      location,
      notes
    };

    setAttendance(prev => [newRecord, ...prev]);
    showToast('Presensi Check-In Berhasil!', `Waktu: ${nowTimeStr} di ${location}`, 'success');
  };

  // Logbook
  const addLogbook = (activity: string, output: string, obstacle?: string, solution?: string) => {
    const newEntry: LogbookEntry = {
      id: `log-${Date.now()}`,
      applicantId: currentApplicant.id,
      applicantName: currentApplicant.fullName,
      unitId: currentApplicant.assignedUnit || 'unit-ipds',
      date: new Date().toISOString().split('T')[0],
      activity,
      output,
      obstacle,
      solution,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setLogbooks(prev => [newEntry, ...prev]);
    showToast('Logbook Terkirim', 'Menunggu review dari pembimbing lapangan.', 'success');
  };

  const reviewLogbook = (id: string, status: 'approved' | 'revision', note?: string) => {
    setLogbooks(prev => prev.map(l => l.id === id ? { ...l, status, mentorNote: note } : l));
    showToast(status === 'approved' ? 'Logbook Disetujui' : 'Catatan Revisi Terkirim', note, status === 'approved' ? 'success' : 'warning');
    
    // Notify participant
    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      userId: currentApplicant.userId,
      title: status === 'approved' ? 'Logbook Disetujui' : 'Logbook Memerlukan Revisi',
      message: note || (status === 'approved' ? 'Logbook Anda telah diverifikasi oleh pembimbing.' : 'Mohon perbaiki catatan logbook.'),
      type: status === 'approved' ? 'success' : 'warning',
      timestamp: 'Baru saja',
      isRead: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Tasks
  const updateTaskProgress = (taskId: string, progress: number, note?: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const newStatus = progress === 100 ? 'submitted' : progress > 0 ? 'in_progress' : 'todo';
        return {
          ...t,
          progress,
          status: newStatus,
          submissionNote: note || t.submissionNote
        };
      }
      return t;
    }));
    showToast('Progress Tugas Diperbarui', `Progres sekarang ${progress}%`, 'info');
  };

  const reviewTask = (taskId: string, score: number, feedback: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          score,
          feedback,
          status: 'completed',
          progress: 100
        };
      }
      return t;
    }));
    showToast('Penilaian Tugas Selesai', `Nilai ${score} dan evaluasi tersimpan.`, 'success');
  };

  // Applicant Status (Admin)
  const updateApplicantStatus = (appId: string, status: Applicant['status'], note?: string) => {
    setApplicants(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    showToast('Status Lamaran Diperbarui', `Status peserta telah diubah ke ${status}.`, 'info');
  };

  const shiftApplicantUnit = (appId: string, newUnitId: string, reason: string) => {
    const targetUnit = units.find(u => u.id === newUnitId);
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          assignedUnit: newUnitId,
          unitShifted: true,
          shiftReason: reason
        };
      }
      return a;
    }));
    showToast('Unit Berhasil Dialihkan', `Peserta dipindahkan ke ${targetUnit?.name}`, 'warning');
  };

  const updateDocumentStatus = (appId: string, docId: string, status: 'verified' | 'revision_required' | 'rejected', notes?: string) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        const updatedDocs = a.documents.map(d => d.id === docId ? { ...d, status, notes } : d);
        return { ...a, documents: updatedDocs };
      }
      return a;
    }));
    showToast('Status Dokumen Diperbarui', `Status: ${status}`, 'success');
  };

  // Evaluation
  const saveEvaluation = (appId: string, aspects: EvaluationAspect[], notes: string) => {
    const totalWeightedScore = aspects.reduce((sum, item) => sum + ((item.score || 0) * (item.weight / 100)), 0);
    showToast('Evaluasi Berhasil Disimpan', `Skor Akhir: ${totalWeightedScore.toFixed(1)}`, 'success');
  };

  // Users & Roles (Super Admin)
  const updateUserRole = (userId: string, newRole: Role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    showToast('Role Akun Berhasil Diubah', `Role baru: ${newRole.toUpperCase()}`, 'success');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'inactive' : 'active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    showToast('Status Akun Berubah', undefined, 'info');
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast('Akun Berhasil Dihapus', undefined, 'danger');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('Semua notifikasi ditandai dibaca', undefined, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        currentView,
        setCurrentView,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        batch,
        setBatch,
        units,
        setUnits,
        applicants,
        currentApplicant,
        setCurrentApplicant,
        tasks,
        logbooks,
        attendance,
        evaluationAspects,
        users,
        auditLogs,
        notifications,
        numberingFormat,
        setNumberingFormat,
        getSampleCertificateNumber,
        toast,
        showToast,
        dismissToast,
        confirmDialog,
        requestConfirm,
        closeConfirmDialog,
        isCmdPaletteOpen,
        setIsCmdPaletteOpen,
        submitNewApplication,
        recordAttendance,
        addLogbook,
        reviewLogbook,
        updateTaskProgress,
        reviewTask,
        updateApplicantStatus,
        shiftApplicantUnit,
        updateDocumentStatus,
        saveEvaluation,
        updateUserRole,
        toggleUserStatus,
        deleteUser,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
