export type GtkJenis = 
  | 'Kepala Sekolah'
  | 'Guru Mata Pelajaran' 
  | 'Guru Kelas' 
  | 'Guru BK' 
  | 'Tenaga Kependidikan / Administrasi';

export interface GtkStaff {
  gtk_id: string;
  source_id: string; // Dapodik UUID or NUPTK
  nama: string;
  nuptk?: string;
  nip?: string;
  jenis_ptk: GtkJenis;
  status_kepegawaian: string; // e.g. PNS, PPPK, GTY, Honor Sekolah
  gender: 'L' | 'P';
  pendidikan_terakhir?: string;
  status: 'Aktif' | 'Nonaktif';
  email?: string;
}

export type StudentStatus = 'Aktif' | 'Nonaktif' | 'Mutasi' | 'Lulus';

export interface Student {
  student_id: string;
  source_id: string; // e.g. Dapodik UUID or NISN
  nis: string;
  nisn: string;
  nama: string;
  kelas: string;
  rombel: string;
  status: StudentStatus;
  academic_year: string;
  gender: 'L' | 'P';
  tempat_lahir?: string;
  tanggal_lahir?: string;
  wali_kelas?: string;
}

export type DocumentType = 
  | 'Daftar Ketidakhadiran' 
  | 'Surat Izin / Sakit' 
  | 'Catatan Pelanggaran' 
  | 'Daftar Prestasi Siswa'
  | 'Formulir Kegiatan Siswa';

export type ProcessingStatus = 
  | 'Uploaded' 
  | 'Processing' 
  | 'Extracted' 
  | 'Needs Review' 
  | 'Verified' 
  | 'Exported';

export type MatchConfidenceCategory = 'High Confidence' | 'Medium Confidence' | 'Low Confidence' | 'Manual Match' | 'Unmatched';

export interface ExtractedRecord {
  id: string;
  lineNo: number;
  rawOcrText: string;
  rawName: string;
  rawClass: string;
  rawStatus: string;
  rawDate: string;
  rawNotes?: string;
  
  // Matching fields
  matchedStudentId?: string;
  matchedStudent?: Student;
  confidence: number; // 0 to 100
  confidenceCategory: MatchConfidenceCategory;
  alternativeCandidates?: { student: Student; confidence: number }[];
  
  // Human in the loop verification
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  isRejected?: boolean;
  editedFields?: {
    nama?: string;
    kelas?: string;
    status?: string;
    catatan?: string;
  };
}

export interface SchoolDocument {
  document_id: string;
  title: string;
  originalFilename: string;
  documentType: DocumentType;
  uploadTimestamp: string;
  uploader: string;
  status: ProcessingStatus;
  confidenceAvg: number;
  recordsCount: number;
  verifiedCount: number;
  previewUrl: string;
  rawText: string;
  records: ExtractedRecord[];
  notes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  targetDocument?: string;
  beforeValue?: string;
  afterValue?: string;
  type: 'import' | 'ocr' | 'match' | 'verification' | 'export' | 'system';
}

export interface SchoolProfile {
  name: string;
  npsn: string;
  accreditation: string;
  address: string;
  subdistrict: string;
  city: string;
  province: string;
  postalCode: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  headmasterName: string;
  headmasterNip: string;
  operatorName: string;
  operatorNip?: string;
  academicYear: string;
  semester: string;
  logoUrl: string;
  dkiLogoUrl: string;
  banyubiruLogoUrl: string;
}
