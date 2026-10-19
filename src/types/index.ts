export type Role = 'peserta' | 'pembimbing' | 'admin' | 'superadmin' | 'guest';

export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'selection_passed'
  | 'selection_rejected'
  | 'placed'
  | 'active'
  | 'completed';

export type DocumentStatus = 'pending' | 'verified' | 'revision_required' | 'rejected';

export interface DocumentItem {
  id: string;
  name: string;
  type: 'ktp' | 'cv' | 'surat_pengantar' | 'transkrip' | 'portfolio' | 'foto';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  status: DocumentStatus;
  notes?: string;
  updatedAt: string;
}

export interface UnitKerja {
  id: string;
  code: string;
  name: string;
  department: string;
  description: string;
  quota: number;
  filled: number;
  isOpen: boolean;
  requirements: string[];
  mentors: string[];
}

export interface BatchMagang {
  id: string;
  code: string;
  name: string;
  year: number;
  registrationStart: string;
  registrationEnd: string;
  internshipStart: string;
  internshipEnd: string;
  status: 'upcoming' | 'open' | 'selection' | 'running' | 'completed';
  totalQuota: number;
  totalRegistered: number;
}

export interface Applicant {
  id: string;
  userId: string;
  registrationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string; // Universitas / Politeknik
  major: string; // Jurusan
  nim: string;
  gpa: number; // IPK
  preferredUnit1: string; // Unit ID
  preferredUnit2: string; // Unit ID
  assignedUnit?: string; // Unit ID
  assignedMentorId?: string;
  status: ApplicationStatus;
  submittedAt: string;
  unitShifted?: boolean; // Pindah otomatis unit 1 -> unit 2
  shiftReason?: string;
  documents: DocumentItem[];
  skills: { name: string; level: number }[];
}

export interface AttendanceRecord {
  id: string;
  applicantId: string;
  applicantName: string;
  unitId: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alpa';
  location: string;
  notes?: string;
}

export interface TaskItem {
  id: string;
  unitId: string;
  mentorId: string;
  applicantId: string;
  title: string;
  description: string;
  deadline: string;
  progress: number; // 0 - 100
  status: 'todo' | 'in_progress' | 'submitted' | 'completed';
  submissionFile?: string;
  submissionNote?: string;
  feedback?: string;
  score?: number; // 0 - 100
}

export interface LogbookEntry {
  id: string;
  applicantId: string;
  applicantName: string;
  unitId: string;
  date: string;
  activity: string;
  output: string;
  obstacle?: string;
  solution?: string;
  status: 'pending' | 'approved' | 'revision';
  mentorNote?: string;
  createdAt: string;
}

export interface EvaluationAspect {
  id: string;
  code: string;
  name: string;
  description: string;
  weight: number; // Percentage
  score?: number; // 0 - 100
}

export interface EvaluationRecord {
  id: string;
  applicantId: string;
  mentorId: string;
  aspects: EvaluationAspect[];
  finalScore: number;
  predicate: 'Sangat Memuaskan' | 'Memuaskan' | 'Baik' | 'Cukup' | 'Kurang';
  notes: string;
  evaluatedAt: string;
  certificateNumber?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: Role;
  action: string;
  targetObject: string;
  details: string;
  ipAddress: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  status: 'active' | 'inactive' | 'suspended';
  unitId?: string;
  lastLogin: string;
  isOnline: boolean;
}

export interface SystemNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  timestamp: string;
  isRead: boolean;
  link?: string;
}
