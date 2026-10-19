import { 
  UnitKerja, 
  BatchMagang, 
  Applicant, 
  AttendanceRecord, 
  TaskItem, 
  LogbookEntry, 
  EvaluationAspect, 
  AuditLog, 
  UserAccount, 
  SystemNotification 
} from '../types';

export const INITIAL_BATCH: BatchMagang = {
  id: 'batch-2026-1',
  code: 'BATCH-2026-I',
  name: 'Program Magang BPS Kota Depok - Batch I 2026',
  year: 2026,
  registrationStart: '2026-01-05',
  registrationEnd: '2026-01-28',
  internshipStart: '2026-02-02',
  internshipEnd: '2026-04-30',
  status: 'running',
  totalQuota: 28,
  totalRegistered: 142
};

export const INITIAL_UNITS: UnitKerja[] = [
  {
    id: 'unit-ipds',
    code: 'IPDS',
    name: 'Integrasi Pengolahan & Diseminasi Statistik',
    department: 'Fungsi IPDS',
    description: 'Pengembangan portal data statistik, dashboard visualisasi, otomatisasi scraping data, infografis Depok Dalam Angka, dan diseminasi publik.',
    quota: 6,
    filled: 5,
    isOpen: true,
    requirements: [
      'Menguasai Web/Mobile Development (React/Laravel/Python)',
      'Memahami UI/UX Design (Figma) atau Desain Infografis',
      'Familiar dengan database SQL dan pembersihan data'
    ],
    mentors: ['Ir. Hendra Gunawan, S.Si., M.Stat.', 'Ahmad Fauzi, S.Kom.']
  },
  {
    id: 'unit-sosial',
    code: 'SOSIAL',
    name: 'Fungsi Statistik Sosial',
    department: 'Fungsi Statistik Sosial',
    description: 'Pengolahan dan analisis Survei Sosial Ekonomi Nasional (Susenas), Survei Angkatan Kerja (Sakernas), kemiskinan, serta Indeks Pembangunan Manusia (IPM).',
    quota: 5,
    filled: 5, // Fully booked to demonstrate "Kuota Penuh" UI
    isOpen: true,
    requirements: [
      'Mahasiswa Statistika / Matematika / Ekonomi / Sosiologi',
      'Menguasai software olah data (R, SPSS, Stata, atau Python)',
      'Mampu menulis deskripsi analisis data sosial'
    ],
    mentors: ['Dra. Nurhayati, M.Si.']
  },
  {
    id: 'unit-nerwilis',
    code: 'NERWILIS',
    name: 'Neraca Wilayah & Analisis Statistik',
    department: 'Fungsi Nerwilis',
    description: 'Penyusunan Produk Domestik Regional Bruto (PDRB) Kota Depok, analisis input-output, serta indikator stabilitas pertumbuhan ekonomi makro wilayah.',
    quota: 5,
    filled: 3,
    isOpen: true,
    requirements: [
      'Mahasiswa Ilmu Ekonomi / Statistika / Manajemen Bisnis',
      'Memahami konsep dasar makroekonomi dan neraca daerah',
      'Kemampuan advanced Microsoft Excel & data reconciliation'
    ],
    mentors: ['Eko Prasetyo, S.E., M.E.']
  },
  {
    id: 'unit-distribusi',
    code: 'DISTRIBUSI',
    name: 'Fungsi Statistik Distribusi',
    department: 'Fungsi Statistik Distribusi',
    description: 'Pemantauan survei harga konsumen bulanan, penghitungan inflasi Kota Depok, statistik pariwisata, perhotelan, dan perdagangan domestik.',
    quota: 4,
    filled: 2,
    isOpen: true,
    requirements: [
      'Ketelitian tinggi dalam input dan validasi data harga',
      'Jurusan Statistika / Ekonomi Pembangunan / Akuntansi',
      'Kemampuan komunikasi untuk wawancara responden pedagang'
    ],
    mentors: ['Rina Kusuma Dewi, S.ST.']
  },
  {
    id: 'unit-produksi',
    code: 'PRODUKSI',
    name: 'Fungsi Statistik Produksi',
    department: 'Fungsi Statistik Produksi',
    description: 'Survei industri manufaktur besar/sedang di kawasan Cimanggis & Tapos, statistik pertanian perkotaan, konstruksi, dan energi.',
    quota: 4,
    filled: 3,
    isOpen: true,
    requirements: [
      'Statistika / Teknik Industri / Agribisnis / Geografi',
      'Pemahaman sampling frame dan verifikasi anomali data pabrik'
    ],
    mentors: ['Wahyu Wibowo, S.Stat.']
  },
  {
    id: 'unit-umum',
    code: 'UMUM',
    name: 'Subbagian Umum & Kehumasan',
    department: 'Subbagian Umum',
    description: 'Tata kelola persuratan dinas digital, kehumasan publik BPS Kota Depok, pengelolaan aset, dan administrasi perkantoran pimpinan.',
    quota: 4,
    filled: 2,
    isOpen: true,
    requirements: [
      'Administrasi Publik / Ilmu Komunikasi / Manajemen',
      'Keahlian copywriting media sosial pemerintah & protokoler'
    ],
    mentors: ['Siti Rahmawati, S.E.']
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-peserta-1',
    name: 'Mufarid Adnan',
    email: 'mufarid.adnan@student.ui.ac.id',
    role: 'peserta',
    status: 'active',
    unitId: 'unit-ipds',
    lastLogin: '18 Okt 2026, 09:15 WIB',
    isOnline: true
  },
  {
    id: 'usr-pembimbing-1',
    name: 'Ir. Hendra Gunawan, S.Si., M.Stat.',
    email: 'hendra.gunawan@bps.go.id',
    role: 'pembimbing',
    status: 'active',
    unitId: 'unit-ipds',
    lastLogin: '18 Okt 2026, 11:20 WIB',
    isOnline: true
  },
  {
    id: 'usr-admin-1',
    name: 'Siti Rahmawati, S.E.',
    email: 'siti.rahmawati@bps.go.id',
    role: 'admin',
    status: 'active',
    lastLogin: '18 Okt 2026, 08:30 WIB',
    isOnline: true
  },
  {
    id: 'usr-superadmin-1',
    name: 'Drs. Bambang Wicaksono, M.M.',
    email: 'bambang.w@bps.go.id',
    role: 'superadmin',
    status: 'active',
    lastLogin: '18 Okt 2026, 07:45 WIB',
    isOnline: true
  }
];

export const INITIAL_APPLICANT: Applicant = {
  id: 'app-001',
  userId: 'usr-peserta-1',
  registrationNumber: 'BPS-DPK/REG/2026/042',
  fullName: 'Mufarid Adnan',
  email: 'mufarid.adnan@student.ui.ac.id',
  phone: '081298765432',
  institution: 'Universitas Indonesia',
  major: 'Sistem Informasi & Ilmu Komputer',
  nim: '2106728190',
  gpa: 3.88,
  preferredUnit1: 'unit-sosial',
  preferredUnit2: 'unit-ipds',
  assignedUnit: 'unit-ipds',
  assignedMentorId: 'usr-pembimbing-1',
  status: 'active', // Placed & actively working
  submittedAt: '2026-01-14 14:20:00',
  unitShifted: true,
  shiftReason: 'Kuota Pilihan 1 (Statistik Sosial) telah terisi penuh oleh pelamar peringkat seleksi awal. Sistem otomatis mengalihkan penempatan ke Pilihan 2 (IPDS).',
  documents: [
    {
      id: 'doc-1',
      name: 'Kartu Tanda Penduduk (KTP)',
      type: 'ktp',
      fileName: 'KTP_Mufarid_Adnan.pdf',
      fileSize: '412 KB',
      status: 'verified',
      updatedAt: '2026-01-14 14:10'
    },
    {
      id: 'doc-2',
      name: 'Curriculum Vitae (CV) ATS',
      type: 'cv',
      fileName: 'CV_MufaridAdnan_2026.pdf',
      fileSize: '820 KB',
      status: 'verified',
      updatedAt: '2026-01-14 14:12'
    },
    {
      id: 'doc-3',
      name: 'Surat Pengantar Magang Kampus',
      type: 'surat_pengantar',
      fileName: 'Surat_Pengantar_UI_Fasilkom.pdf',
      fileSize: '1.2 MB',
      status: 'verified',
      updatedAt: '2026-01-14 14:15'
    },
    {
      id: 'doc-4',
      name: 'Transkrip Nilai Akademik Terakhir',
      type: 'transkrip',
      fileName: 'Transkrip_Akademik_Semester5.pdf',
      fileSize: '950 KB',
      status: 'verified',
      updatedAt: '2026-01-14 14:18'
    },
    {
      id: 'doc-5',
      name: 'Portofolio Project & Sertifikat',
      type: 'portfolio',
      fileName: 'Portfolio_Web_DataAnalysis.pdf',
      fileSize: '3.4 MB',
      status: 'verified',
      updatedAt: '2026-01-14 14:19'
    }
  ],
  skills: [
    { name: 'React / Next.js / TypeScript', level: 92 },
    { name: 'Laravel & RESTful API', level: 88 },
    { name: 'UI/UX Design & Tailwind CSS', level: 94 },
    { name: 'Python Data Visualization', level: 82 },
    { name: 'SQL & Database Modeling', level: 85 }
  ]
};

export const INITIAL_ALL_APPLICANTS: Applicant[] = [
  INITIAL_APPLICANT,
  {
    id: 'app-002',
    userId: 'usr-p2',
    registrationNumber: 'BPS-DPK/REG/2026/043',
    fullName: 'Annisa Putri Maharani',
    email: 'annisa.putri@gunadarma.ac.id',
    phone: '085712349876',
    institution: 'Universitas Gunadarma',
    major: 'Teknik Informatika',
    nim: '50421098',
    gpa: 3.75,
    preferredUnit1: 'unit-ipds',
    preferredUnit2: 'unit-umum',
    assignedUnit: 'unit-ipds',
    assignedMentorId: 'usr-pembimbing-1',
    status: 'active',
    submittedAt: '2026-01-15 10:11:00',
    unitShifted: false,
    documents: [
      { id: 'd2-1', name: 'KTP', type: 'ktp', fileName: 'ktp_annisa.pdf', fileSize: '340 KB', status: 'verified', updatedAt: '2026-01-15' },
      { id: 'd2-2', name: 'CV', type: 'cv', fileName: 'cv_annisa.pdf', fileSize: '650 KB', status: 'verified', updatedAt: '2026-01-15' },
      { id: 'd2-3', name: 'Surat Pengantar', type: 'surat_pengantar', fileName: 'surat_ug.pdf', fileSize: '1.1 MB', status: 'verified', updatedAt: '2026-01-15' }
    ],
    skills: [{ name: 'React', level: 85 }, { name: 'Python', level: 80 }]
  },
  {
    id: 'app-003',
    userId: 'usr-p3',
    registrationNumber: 'BPS-DPK/REG/2026/044',
    fullName: 'Dimas Bagas Satrio',
    email: 'dimas.bagas@ipb.ac.id',
    phone: '081377889900',
    institution: 'IPB University',
    major: 'Statistika & Sains Data',
    nim: 'G1401211029',
    gpa: 3.92,
    preferredUnit1: 'unit-sosial',
    preferredUnit2: 'unit-nerwilis',
    assignedUnit: 'unit-sosial',
    status: 'active',
    submittedAt: '2026-01-16 16:45:00',
    unitShifted: false,
    documents: [
      { id: 'd3-1', name: 'KTP', type: 'ktp', fileName: 'ktp_dimas.pdf', fileSize: '400 KB', status: 'verified', updatedAt: '2026-01-16' },
      { id: 'd3-2', name: 'CV', type: 'cv', fileName: 'cv_dimas.pdf', fileSize: '700 KB', status: 'verified', updatedAt: '2026-01-16' }
    ],
    skills: [{ name: 'R & RStudio', level: 95 }, { name: 'Machine Learning', level: 88 }]
  },
  {
    id: 'app-004',
    userId: 'usr-p4',
    registrationNumber: 'BPS-DPK/REG/2026/045',
    fullName: 'Siti Aisyah Azzahra',
    email: 'aisyah.zahra@polstat.stis.ac.id',
    phone: '081900223344',
    institution: 'Politeknik Statistika STIS',
    major: 'Komputasi Statistik',
    nim: '212011400',
    gpa: 3.84,
    preferredUnit1: 'unit-sosial',
    preferredUnit2: 'unit-ipds',
    assignedUnit: 'unit-ipds',
    status: 'active',
    submittedAt: '2026-01-18 09:20:00',
    unitShifted: true,
    shiftReason: 'Kuota Unit Statistik Sosial telah penuh, dialihkan ke IPDS.',
    documents: [
      { id: 'd4-1', name: 'KTP', type: 'ktp', fileName: 'ktp_aisyah.pdf', fileSize: '320 KB', status: 'verified', updatedAt: '2026-01-18' }
    ],
    skills: [{ name: 'Python', level: 90 }]
  },
  {
    id: 'app-005',
    userId: 'usr-p5',
    registrationNumber: 'BPS-DPK/REG/2026/046',
    fullName: 'Farhan Maulana Hakim',
    email: 'farhan.m@pnj.ac.id',
    phone: '081299887766',
    institution: 'Politeknik Negeri Jakarta (PNJ)',
    major: 'Manajemen Keuangan Perbankan',
    nim: '2004312010',
    gpa: 3.65,
    preferredUnit1: 'unit-nerwilis',
    preferredUnit2: 'unit-distribusi',
    status: 'under_review',
    submittedAt: '2026-01-20 13:00:00',
    documents: [
      { id: 'd5-1', name: 'KTP', type: 'ktp', fileName: 'ktp_farhan.pdf', fileSize: '310 KB', status: 'revision_required', notes: 'Scan KTP terpotong bagian NIK, mohon unggah ulang yang jelas.', updatedAt: '2026-01-21' },
      { id: 'd5-2', name: 'CV', type: 'cv', fileName: 'cv_farhan.pdf', fileSize: '540 KB', status: 'verified', updatedAt: '2026-01-20' }
    ],
    skills: [{ name: 'Financial Modeling', level: 85 }]
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    unitId: 'unit-ipds',
    mentorId: 'usr-pembimbing-1',
    applicantId: 'app-001',
    title: 'Pengembangan Dashboard Interaktif Publikasi BPS Depok Dalam Angka 2026',
    description: 'Rancang UI dan implementasikan halaman visualisasi data demografi penduduk Kota Depok menggunakan React dan Tailwind CSS dengan basis data publikasi BPS terkini.',
    deadline: '2026-10-24', // Soon
    progress: 75,
    status: 'in_progress',
    submissionFile: 'dashboard-depok-v1.zip',
    submissionNote: 'Modul piramida penduduk dan filter kecamatan telah selesai diintegrasikan.',
    feedback: 'Visualisasi sangat rapi. Pastikan palet warna konsisten dengan pedoman brand BPS RI.',
    score: 92
  },
  {
    id: 'task-2',
    unitId: 'unit-ipds',
    mentorId: 'usr-pembimbing-1',
    applicantId: 'app-001',
    title: 'Otomatisasi Validasi & Pembersihan Tabel Excel Hasil Survei Harga Konsumen',
    description: 'Buat skrip pembersih format dan pendeteksi pencilan (outlier) untuk data survei mingguan pedagang pasar tradisional.',
    deadline: '2026-10-28',
    progress: 40,
    status: 'in_progress'
  },
  {
    id: 'task-3',
    unitId: 'unit-ipds',
    mentorId: 'usr-pembimbing-1',
    applicantId: 'app-001',
    title: 'Desain Banner & Infografis Rilis Berita Resmi Statistik (BRS) Inflasi',
    description: 'Siapkan aset visual infografis feed Instagram & banner website ukuran 1080x1080 dan 1920x1080.',
    deadline: '2026-10-15',
    progress: 100,
    status: 'completed',
    submissionFile: 'infografis-brs-okt.pdf',
    submissionNote: 'File revisi sesuai arahan tata letak BPS Jabar telah selesai.',
    feedback: 'Sangat baik, langsung disetujui untuk dipublikasikan pada media sosial resmi.',
    score: 96
  }
];

export const INITIAL_LOGBOOKS: LogbookEntry[] = [
  {
    id: 'log-01',
    applicantId: 'app-001',
    applicantName: 'Mufarid Adnan',
    unitId: 'unit-ipds',
    date: '2026-10-18',
    activity: 'Penyusunan komponen layout portal dan sinkronisasi dataset statistik kecamatan Beji & Sukmajaya.',
    output: 'Kode komponen React modular dan dokumentasi API mock telah rampung.',
    obstacle: 'Perbedaan format penamaan kode wilayah BPS 2024 vs 2026 pada kolom tertentu.',
    solution: 'Membuat script mapping translasi master kode desa/kelurahan otomatis.',
    status: 'pending',
    createdAt: '2026-10-18 16:30'
  },
  {
    id: 'log-02',
    applicantId: 'app-001',
    applicantName: 'Mufarid Adnan',
    unitId: 'unit-ipds',
    date: '2026-10-17',
    activity: 'Diskusi koordinasi mingguan bersama Tim Fungsi IPDS terkait standardisasi metadata statistik sektoral.',
    output: 'Notulensi teknis integrasi metadata portal Satu Data Depok.',
    obstacle: 'Belum ada panduan baku dari OPD dinas luar.',
    solution: 'Menggunakan template rekomendasi BPS Pusat (Simdasi).',
    status: 'approved',
    mentorNote: 'Bagus. Teruskan ke tahap pengujian prototype.',
    createdAt: '2026-10-17 17:00'
  },
  {
    id: 'log-03',
    applicantId: 'app-001',
    applicantName: 'Mufarid Adnan',
    unitId: 'unit-ipds',
    date: '2026-10-16',
    activity: 'Eksplorasi modul pemetaan spasial GIS sebaran UMKM di Sawangan.',
    output: 'Draft peta leaflet terintegrasi koordinat.',
    obstacle: 'File geojson ukuran 12 MB membuat rendering lambat.',
    solution: 'Perlu kompresi geometri atau simplify polygon.',
    status: 'revision',
    mentorNote: 'Tolong sertakan tangkapan layar peta dan metrik kompresinya sebelum disetujui.',
    createdAt: '2026-10-16 16:45'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    applicantId: 'app-001',
    applicantName: 'Mufarid Adnan',
    unitId: 'unit-ipds',
    date: '2026-10-18',
    checkInTime: '07:42 WIB',
    checkOutTime: '16:45 WIB',
    status: 'hadir',
    location: 'Kantor BPS Kota Depok - Gedung Dibaleka II Lt. 3'
  },
  {
    id: 'att-02',
    applicantId: 'app-001',
    applicantName: 'Mufarid Adnan',
    unitId: 'unit-ipds',
    date: '2026-10-17',
    checkInTime: '07:51 WIB',
    checkOutTime: '17:02 WIB',
    status: 'hadir',
    location: 'Kantor BPS Kota Depok - Ruang IPDS'
  },
  {
    id: 'att-03',
    applicantId: 'app-001',
    applicantName: 'Mufarid Adnan',
    unitId: 'unit-ipds',
    date: '2026-10-16',
    checkInTime: '07:38 WIB',
    checkOutTime: '16:35 WIB',
    status: 'hadir',
    location: 'Kantor BPS Kota Depok - Ruang Rapat Utama'
  },
  {
    id: 'att-04',
    applicantId: 'app-001',
    applicantName: 'Mufarid Adnan',
    unitId: 'unit-ipds',
    date: '2026-10-15',
    checkInTime: '08:00 WIB',
    checkOutTime: '16:50 WIB',
    status: 'hadir',
    location: 'Kantor BPS Kota Depok - Lab Komputer'
  },
  {
    id: 'att-05',
    applicantId: 'app-001',
    applicantName: 'Mufarid Adnan',
    unitId: 'unit-ipds',
    date: '2026-10-14',
    checkInTime: '-',
    status: 'izin',
    location: '-',
    notes: 'Mengikuti ujian tengah semester (UTS) di Kampus UI Depok.'
  }
];

export const INITIAL_EVALUATION_ASPECTS: EvaluationAspect[] = [
  {
    id: 'asp-1',
    code: 'DISIPLIN',
    name: 'Integritas & Kedisiplinan Kerja',
    description: 'Kehadiran tepat waktu, ketaatan pada SOP BPS, etika kerja kantor pemerintah.',
    weight: 20,
    score: 95
  },
  {
    id: 'asp-2',
    code: 'KOMPETENSI',
    name: 'Kompetensi Teknis & Pemecahan Masalah',
    description: 'Kualitas penguasaan teknologi, logika olah data, dan akurasi hasil analisis.',
    weight: 35,
    score: 94
  },
  {
    id: 'asp-3',
    code: 'INISIATIF',
    name: 'Inisiatif & Inovasi Kerja',
    description: 'Kemampuan menyampaikan gagasan pembaruan, responsif terhadap instruksi baru.',
    weight: 20,
    score: 92
  },
  {
    id: 'asp-4',
    code: 'KOMUNIKASI',
    name: 'Kerjasama Tim & Komunikasi Efektif',
    description: 'Kolaborasi antar divisi dan kejelasan presentasi hasil tugas.',
    weight: 15,
    score: 90
  },
  {
    id: 'asp-5',
    code: 'TANGGUNG_JAWAB',
    name: 'Ketepatan Waktu & Tanggung Jawab Output',
    description: 'Kelengkapan dan ketepatan penyelesaian task serta pelaporan logbook harian.',
    weight: 10,
    score: 96
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-aud-1',
    timestamp: '2026-10-18 11:24:05',
    userName: 'Ir. Hendra Gunawan, S.Si., M.Stat.',
    userRole: 'pembimbing',
    action: 'APPROVE_LOGBOOK',
    targetObject: 'Logbook #log-02 (Mufarid Adnan)',
    details: 'Menyetujui entri logbook kegiatan sinkronisasi metadata.',
    ipAddress: '10.32.76.14'
  },
  {
    id: 'log-aud-2',
    timestamp: '2026-10-18 09:12:44',
    userName: 'Siti Rahmawati, S.E.',
    userRole: 'admin',
    action: 'AUTO_SHIFT_UNIT',
    targetObject: 'Applicant #app-001',
    details: 'Pengalihan otomatis Pilihan 1 (Sosial) ke Pilihan 2 (IPDS) karena batas kuota terpenuhi.',
    ipAddress: '10.32.76.02'
  },
  {
    id: 'log-aud-3',
    timestamp: '2026-10-17 14:05:19',
    userName: 'Drs. Bambang Wicaksono, M.M.',
    userRole: 'superadmin',
    action: 'UPDATE_NUMBERING_FORMAT',
    targetObject: 'Format Penomoran Sertifikat',
    details: 'Mengubah format penomoran sertifikat menjadi: BPS-3276/MAGANG/{TAHUN}/{URUT}',
    ipAddress: '10.32.76.01'
  },
  {
    id: 'log-aud-4',
    timestamp: '2026-10-16 10:18:32',
    userName: 'Siti Rahmawati, S.E.',
    userRole: 'admin',
    action: 'VERIFY_DOCUMENT',
    targetObject: 'Document #doc-3 (Surat Pengantar UI)',
    details: 'Verifikasi berkas persyaratan lolos uji keaslian stempel dekanat.',
    ipAddress: '10.32.76.02'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    userId: 'usr-peserta-1',
    title: 'Pengalihan Otomatis Unit Pilihan 2',
    message: 'Kuota unit Statistik Sosial telah terpenuhi. Berkas Anda otomatis dialihkan dan diterima pada unit pilihan ke-2: IPDS.',
    type: 'warning',
    timestamp: '1 hari yang lalu',
    isRead: false
  },
  {
    id: 'notif-2',
    userId: 'usr-peserta-1',
    title: 'Feedback Tugas dari Pembimbing',
    message: 'Pembimbing telah memberikan ulasan pada tugas: Pengembangan Dashboard Interaktif.',
    type: 'info',
    timestamp: '3 jam yang lalu',
    isRead: false
  },
  {
    id: 'notif-3',
    userId: 'usr-peserta-1',
    title: 'Catatan Revisi Logbook',
    message: 'Logbook tanggal 16 Oktober memerlukan lampiran tangkapan layar sebelum disetujui.',
    type: 'warning',
    timestamp: '2 hari yang lalu',
    isRead: true
  }
];
