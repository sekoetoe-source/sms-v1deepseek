import { Student, SchoolDocument, SchoolProfile, AuditLog } from '../types';

export const INITIAL_SCHOOL_PROFILE: SchoolProfile = {
  name: 'SMP Negeri 99 Jakarta',
  npsn: '20102589',
  accreditation: 'A (Unggul)',
  address: 'Jl. Utan Kayu Raya No. 45, Matraman',
  subdistrict: 'Matraman',
  city: 'Jakarta Timur',
  province: 'DKI Jakarta',
  postalCode: '13120',
  headmasterName: 'Drs. H. Bambang Suprayitno, M.Pd.',
  headmasterNip: '19680512 199303 1 004',
  operatorName: 'Antonius Yudha B. Purnomo, S.Kom.',
  operatorNip: '19890415 201502 1 002',
  academicYear: '2025/2026',
  semester: 'Ganjil',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJO8zuNAD9yXEqcvzF2069FJ-a-MOC3S8AFfLi_ydPe8MW3yBo8Ujzbpnu6PjE8ma0ji_QBHsS5ZyAOfI-TxcQADApxn5HydYOGhZH9jkW3FMX90SxRhT6mjmV9gruNPgEY8RTxGlGAwDi2HnHteKW3lz1iENxPZzCohbO_OlgY2A8D2Khc-DOohcvxW6FMVaHz0q8d7o3H3HafAa3jVHpCDbdbDpq8wz5jxRtJGqy37e0REy-CzH_cZFYbq3AP8fVw78',
  dkiLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Coat_of_arms_of_Jakarta.svg/500px-Coat_of_arms_of_Jakarta.svg.png',
  banyubiruLogoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfmbXYOYq3g1iSHP98eNxY2qkfRsivX4ioYt8vlctnDVL5FJlRPoS7LZdFlNRNAVlrrzFYQjEKKN6VZn0vw_cRj2lSS5iFBvCiEcL6QdQ5VfDy1l_StC_u345yNc_PrW1PlxbpCbO9gt_jdR6dxtD3U1rFQcMgdlO1K-AB4nsqKkGIzYflXYsN2ffmznEuVR5fzYuOr7-LUN3C2dh1EdBcnEaxSDAqtgdOH_TzDDQozQc2EZfUd65-a1pI2LXNQ2gJu-k'
};

export const INITIAL_STUDENTS: Student[] = [
  {
    student_id: 'STU-001',
    source_id: 'DAPO-99-001',
    nis: '232407001',
    nisn: '0098451201',
    nama: 'Ahmad Fauzan',
    kelas: 'VIII-B',
    rombel: 'Kelas 8B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.'
  },
  {
    student_id: 'STU-002',
    source_id: 'DAPO-99-002',
    nis: '232407002',
    nisn: '0098451202',
    nama: 'Budi Santoso',
    kelas: 'VIII-B',
    rombel: 'Kelas 8B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.'
  },
  {
    student_id: 'STU-003',
    source_id: 'DAPO-99-003',
    nis: '232407003',
    nisn: '0098451203',
    nama: 'Citra Kirana Dewi',
    kelas: 'VIII-B',
    rombel: 'Kelas 8B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.'
  },
  {
    student_id: 'STU-004',
    source_id: 'DAPO-99-004',
    nis: '232407004',
    nisn: '0098451204',
    nama: 'Dimas Anggara Putra',
    kelas: 'VIII-B',
    rombel: 'Kelas 8B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.'
  },
  {
    student_id: 'STU-005',
    source_id: 'DAPO-99-005',
    nis: '232407005',
    nisn: '0098451205',
    nama: 'Eka Putri Lestari',
    kelas: 'VIII-B',
    rombel: 'Kelas 8B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.'
  },
  {
    student_id: 'STU-006',
    source_id: 'DAPO-99-006',
    nis: '232407006',
    nisn: '0098451206',
    nama: 'Fajar Nugraha',
    kelas: 'VIII-A',
    rombel: 'Kelas 8A',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Drs. Supriyadi'
  },
  {
    student_id: 'STU-007',
    source_id: 'DAPO-99-007',
    nis: '232407007',
    nisn: '0098451207',
    nama: 'Gita Gutawa Wardani',
    kelas: 'VIII-A',
    rombel: 'Kelas 8A',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Drs. Supriyadi'
  },
  {
    student_id: 'STU-008',
    source_id: 'DAPO-99-008',
    nis: '232407008',
    nisn: '0098451208',
    nama: 'Hafiz Pratama',
    kelas: 'VIII-C',
    rombel: 'Kelas 8C',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Siti Rahmah, S.Pd.'
  },
  {
    student_id: 'STU-009',
    source_id: 'DAPO-99-009',
    nis: '232407009',
    nisn: '0098451209',
    nama: 'Indah Permatasari',
    kelas: 'VII-A',
    rombel: 'Kelas 7A',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Ahmad Zaki, S.Pd.'
  },
  {
    student_id: 'STU-010',
    source_id: 'DAPO-99-010',
    nis: '232407010',
    nisn: '0098451210',
    nama: 'Joko Widodo Prasetyo',
    kelas: 'VII-A',
    rombel: 'Kelas 7A',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Ahmad Zaki, S.Pd.'
  },
  {
    student_id: 'STU-011',
    source_id: 'DAPO-99-011',
    nis: '232407011',
    nisn: '0098451211',
    nama: 'Kurniawan Dwi Yulianto',
    kelas: 'VII-B',
    rombel: 'Kelas 7B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Eni Kurniawati, M.Pd.'
  },
  {
    student_id: 'STU-012',
    source_id: 'DAPO-99-012',
    nis: '232407012',
    nisn: '0098451212',
    nama: 'Laila Majnun',
    kelas: 'VII-B',
    rombel: 'Kelas 7B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Eni Kurniawati, M.Pd.'
  },
  {
    student_id: 'STU-013',
    source_id: 'DAPO-99-013',
    nis: '232407013',
    nisn: '0098451213',
    nama: 'Muhammad Rizki Pratama',
    kelas: 'IX-A',
    rombel: 'Kelas 9A',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Budi Santoso, S.Pd.'
  },
  {
    student_id: 'STU-014',
    source_id: 'DAPO-99-014',
    nis: '232407014',
    nisn: '0098451214',
    nama: 'Nabila Syakieb',
    kelas: 'IX-A',
    rombel: 'Kelas 9A',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Budi Santoso, S.Pd.'
  },
  {
    student_id: 'STU-015',
    source_id: 'DAPO-99-015',
    nis: '232407015',
    nisn: '0098451215',
    nama: 'Oki Setiana Dewi',
    kelas: 'IX-B',
    rombel: 'Kelas 9B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Rina Kusuma, S.Pd.'
  },
  {
    student_id: 'STU-016',
    source_id: 'DAPO-99-016',
    nis: '232407016',
    nisn: '0098451216',
    nama: 'Pandu Wijaya Kusuma',
    kelas: 'IX-B',
    rombel: 'Kelas 9B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Rina Kusuma, S.Pd.'
  },
  {
    student_id: 'STU-017',
    source_id: 'DAPO-99-017',
    nis: '232407017',
    nisn: '0098451217',
    nama: 'Qori Sandioriva',
    kelas: 'VIII-C',
    rombel: 'Kelas 8C',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Siti Rahmah, S.Pd.'
  },
  {
    student_id: 'STU-018',
    source_id: 'DAPO-99-018',
    nis: '232407018',
    nisn: '0098451218',
    nama: 'Rian D’Masiv Ramadhan',
    kelas: 'VIII-B',
    rombel: 'Kelas 8B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.'
  },
  {
    student_id: 'STU-019',
    source_id: 'DAPO-99-019',
    nis: '232407019',
    nisn: '0098451219',
    nama: 'Siti Nurhaliza',
    kelas: 'VIII-B',
    rombel: 'Kelas 8B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.'
  },
  {
    student_id: 'STU-020',
    source_id: 'DAPO-99-020',
    nis: '232407020',
    nisn: '0098451220',
    nama: 'Taufik Hidayat',
    kelas: 'VII-C',
    rombel: 'Kelas 7C',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'H. Ruslan, S.Pd.'
  },
  {
    student_id: 'STU-021',
    source_id: 'DAPO-99-021',
    nis: '232407021',
    nisn: '0098451221',
    nama: 'Umar Wirahadikusumah',
    kelas: 'IX-C',
    rombel: 'Kelas 9C',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Drs. Hendro W.'
  },
  {
    student_id: 'STU-022',
    source_id: 'DAPO-99-022',
    nis: '232407022',
    nisn: '0098451222',
    nama: 'Vina Panduwinata',
    kelas: 'VII-A',
    rombel: 'Kelas 7A',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Ahmad Zaki, S.Pd.'
  },
  {
    student_id: 'STU-023',
    source_id: 'DAPO-99-023',
    nis: '232407023',
    nisn: '0098451223',
    nama: 'Wahyu Hidayatullah',
    kelas: 'VIII-A',
    rombel: 'Kelas 8A',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'L',
    wali_kelas: 'Drs. Supriyadi'
  },
  {
    student_id: 'STU-024',
    source_id: 'DAPO-99-024',
    nis: '232407024',
    nisn: '0098451224',
    nama: 'Zaskia Adya Mecca',
    kelas: 'IX-B',
    rombel: 'Kelas 9B',
    status: 'Aktif',
    academic_year: '2025/2026',
    gender: 'P',
    wali_kelas: 'Rina Kusuma, S.Pd.'
  }
];

export const INITIAL_DOCUMENTS: SchoolDocument[] = [
  {
    document_id: 'DOC-2026-08-001',
    title: 'Daftar Ketidakhadiran Harian Kelas VIII-B',
    originalFilename: 'Absensi_Kelas_8B_20Agustus2026.jpg',
    documentType: 'Daftar Ketidakhadiran',
    uploadTimestamp: '2026-08-20 07:48',
    uploader: 'Yudha (Operator)',
    status: 'Needs Review',
    confidenceAvg: 93,
    recordsCount: 4,
    verifiedCount: 1,
    previewUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop',
    rawText: `DAFTAR KETIDAKHADIRAN SISWA
SMP NEGERI 99 JAKARTA
Hari/Tgl: Rabu, 20 Agustus 2026
Kelas: VIII-B

1. Ahmad Fausan | VIII-B | Sakit (Surat Dokter)
2. Budi Santoso | VIII-B | Izin (Acara Keluarga)
3. Citra Kirana | VIII-B | Alpa
4. Rian D Masiv | VIII-B | Sakit

Mengetahui: Wali Kelas VIII-B (Dra. Hj. Nurhayati)`,
    records: [
      {
        id: 'REC-001',
        lineNo: 1,
        rawOcrText: '1. Ahmad Fausan | VIII-B | Sakit (Surat Dokter)',
        rawName: 'Ahmad Fausan',
        rawClass: 'VIII-B',
        rawStatus: 'Sakit',
        rawDate: '20/08/2026',
        rawNotes: 'Surat Dokter terlampir',
        matchedStudentId: 'STU-001',
        matchedStudent: INITIAL_STUDENTS[0],
        confidence: 96,
        confidenceCategory: 'High Confidence',
        isVerified: false,
        alternativeCandidates: [
          { student: INITIAL_STUDENTS[0], confidence: 96 },
          { student: INITIAL_STUDENTS[5], confidence: 62 }
        ]
      },
      {
        id: 'REC-002',
        lineNo: 2,
        rawOcrText: '2. Budi Santoso | VIII-B | Izin (Acara Keluarga)',
        rawName: 'Budi Santoso',
        rawClass: 'VIII-B',
        rawStatus: 'Izin',
        rawDate: '20/08/2026',
        rawNotes: 'Acara keluarga',
        matchedStudentId: 'STU-002',
        matchedStudent: INITIAL_STUDENTS[1],
        confidence: 100,
        confidenceCategory: 'High Confidence',
        isVerified: true,
        verifiedBy: 'Yudha (Operator)',
        verifiedAt: '2026-08-20 07:54'
      },
      {
        id: 'REC-003',
        lineNo: 3,
        rawOcrText: '3. Citra Kirana | VIII-B | Alpa',
        rawName: 'Citra Kirana',
        rawClass: 'VIII-B',
        rawStatus: 'Alpa',
        rawDate: '20/08/2026',
        rawNotes: 'Tanpa keterangan',
        matchedStudentId: 'STU-003',
        matchedStudent: INITIAL_STUDENTS[2],
        confidence: 91,
        confidenceCategory: 'Medium Confidence',
        isVerified: false,
        alternativeCandidates: [
          { student: INITIAL_STUDENTS[2], confidence: 91 },
          { student: INITIAL_STUDENTS[6], confidence: 54 }
        ]
      },
      {
        id: 'REC-004',
        lineNo: 4,
        rawOcrText: '4. Rian D Masiv | VIII-B | Sakit',
        rawName: 'Rian D Masiv',
        rawClass: 'VIII-B',
        rawStatus: 'Sakit',
        rawDate: '20/08/2026',
        rawNotes: 'Demam',
        matchedStudentId: 'STU-018',
        matchedStudent: INITIAL_STUDENTS[17],
        confidence: 88,
        confidenceCategory: 'Medium Confidence',
        isVerified: false,
        alternativeCandidates: [
          { student: INITIAL_STUDENTS[17], confidence: 88 }
        ]
      }
    ]
  },
  {
    document_id: 'DOC-2026-08-002',
    title: 'Surat Izin & Sakit Mingguan Kelas VII & IX',
    originalFilename: 'Rekap_Izin_Kelas7_9.pdf',
    documentType: 'Surat Izin / Sakit',
    uploadTimestamp: '2026-08-19 13:20',
    uploader: 'Siti Rahmah (Tata Usaha)',
    status: 'Verified',
    confidenceAvg: 97,
    recordsCount: 3,
    verifiedCount: 3,
    previewUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
    rawText: `REKAP SURAT MASUK KETIDAKHADIRAN
1. Muhammad Rizki P. (IX-A) - Izin Lomba OSN Matematika
2. Laila Majnun (VII-B) - Sakit
3. Dimas Anggara (VIII-B) - Izin Keperluan Mendesak`,
    records: [
      {
        id: 'REC-005',
        lineNo: 1,
        rawOcrText: '1. Muhammad Rizki P. (IX-A) - Izin Lomba OSN Matematika',
        rawName: 'Muhammad Rizki P.',
        rawClass: 'IX-A',
        rawStatus: 'Izin',
        rawDate: '19/08/2026',
        rawNotes: 'Lomba OSN Matematika Tingkat Kota',
        matchedStudentId: 'STU-013',
        matchedStudent: INITIAL_STUDENTS[12],
        confidence: 94,
        confidenceCategory: 'Medium Confidence',
        isVerified: true,
        verifiedBy: 'Siti Rahmah',
        verifiedAt: '2026-08-19 13:45'
      },
      {
        id: 'REC-006',
        lineNo: 2,
        rawOcrText: '2. Laila Majnun (VII-B) - Sakit',
        rawName: 'Laila Majnun',
        rawClass: 'VII-B',
        rawStatus: 'Sakit',
        rawDate: '19/08/2026',
        rawNotes: 'Surat dokter',
        matchedStudentId: 'STU-012',
        matchedStudent: INITIAL_STUDENTS[11],
        confidence: 100,
        confidenceCategory: 'High Confidence',
        isVerified: true,
        verifiedBy: 'Siti Rahmah',
        verifiedAt: '2026-08-19 13:46'
      },
      {
        id: 'REC-007',
        lineNo: 3,
        rawOcrText: '3. Dimas Anggara (VIII-B) - Izin Keperluan Mendesak',
        rawName: 'Dimas Anggara',
        rawClass: 'VIII-B',
        rawStatus: 'Izin',
        rawDate: '19/08/2026',
        rawNotes: 'Keperluan keluarga mendesak',
        matchedStudentId: 'STU-004',
        matchedStudent: INITIAL_STUDENTS[3],
        confidence: 96,
        confidenceCategory: 'High Confidence',
        isVerified: true,
        verifiedBy: 'Siti Rahmah',
        verifiedAt: '2026-08-19 13:47'
      }
    ]
  },
  {
    document_id: 'DOC-2026-08-003',
    title: 'Catatan Pelanggaran Kedisiplinan Upacara',
    originalFilename: 'Pelanggaran_Upacara_18Agustus.png',
    documentType: 'Catatan Pelanggaran',
    uploadTimestamp: '2026-08-18 09:15',
    uploader: 'Yudha (Operator)',
    status: 'Verified',
    confidenceAvg: 95,
    recordsCount: 2,
    verifiedCount: 2,
    previewUrl: 'https://images.unsplash.com/photo-1584697964190-705b893683f1?q=80&w=1200&auto=format&fit=crop',
    rawText: `CATATAN KETERTIBAN UPACARA BENDERA
1. Fajar Nugraha - VIII-A - Terlambat 15 menit
2. Taufik Hidayat - VII-C - Tidak mengenakan dasi & topi lengkap`,
    records: [
      {
        id: 'REC-008',
        lineNo: 1,
        rawOcrText: '1. Fajar Nugraha - VIII-A - Terlambat 15 menit',
        rawName: 'Fajar Nugraha',
        rawClass: 'VIII-A',
        rawStatus: 'Terlambat',
        rawDate: '18/08/2026',
        rawNotes: 'Terlambat 15 menit karena ban bocor',
        matchedStudentId: 'STU-006',
        matchedStudent: INITIAL_STUDENTS[5],
        confidence: 100,
        confidenceCategory: 'High Confidence',
        isVerified: true,
        verifiedBy: 'Yudha (Operator)',
        verifiedAt: '2026-08-18 09:30'
      },
      {
        id: 'REC-009',
        lineNo: 2,
        rawOcrText: '2. Taufik Hidayat - VII-C - Atribut Tidak Lengkap',
        rawName: 'Taufik Hidayat',
        rawClass: 'VII-C',
        rawStatus: 'Pelanggaran Atribut',
        rawDate: '18/08/2026',
        rawNotes: 'Tidak memakai topi dan dasi sekolah',
        matchedStudentId: 'STU-020',
        matchedStudent: INITIAL_STUDENTS[19],
        confidence: 100,
        confidenceCategory: 'High Confidence',
        isVerified: true,
        verifiedBy: 'Yudha (Operator)',
        verifiedAt: '2026-08-18 09:32'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-08-20 07:54',
    operator: 'Antonius Yudha',
    action: 'Verifikasi Record Siswa',
    targetDocument: 'Daftar Ketidakhadiran Harian Kelas VIII-B',
    beforeValue: 'Pending',
    afterValue: 'Verified (Budi Santoso - VIII-B)',
    type: 'verification'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-08-20 07:51',
    operator: 'Sistem OCR AI',
    action: 'Student Fuzzy Matching Selesai',
    targetDocument: 'Daftar Ketidakhadiran Harian Kelas VIII-B',
    beforeValue: 'Raw OCR Text (4 Baris)',
    afterValue: '4 Record terekstrak (100% kandidat ditemukan)',
    type: 'match'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-08-20 07:49',
    operator: 'Sistem OCR AI',
    action: 'Ekstraksi OCR Berhasil',
    targetDocument: 'Absensi_Kelas_8B_20Agustus2026.jpg',
    beforeValue: 'Image Uploaded (1.4 MB)',
    afterValue: 'Raw text generated',
    type: 'ocr'
  },
  {
    id: 'LOG-004',
    timestamp: '2026-08-20 07:48',
    operator: 'Antonius Yudha',
    action: 'Upload Dokumen Baru',
    targetDocument: 'Daftar Ketidakhadiran Harian Kelas VIII-B',
    type: 'ocr'
  },
  {
    id: 'LOG-005',
    timestamp: '2026-08-19 14:10',
    operator: 'Antonius Yudha',
    action: 'Export Laporan Excel (.xlsx)',
    targetDocument: 'Surat Izin & Sakit Mingguan Kelas VII & IX',
    afterValue: 'Rekap_Absensi_SMPN99_2026-08-19.xlsx',
    type: 'export'
  },
  {
    id: 'LOG-006',
    timestamp: '2026-08-19 07:42',
    operator: 'Antonius Yudha',
    action: 'Import Master Data Siswa Dapodik',
    beforeValue: 'Database Kosong',
    afterValue: '865 Data Siswa SMP Negeri 99 Berhasil Diimpor',
    type: 'import'
  }
];

export const PRESET_SAMPLE_DOCS = [
  {
    title: 'Daftar Absensi Kelas VIII-B (Tulisan Tangan Guru)',
    type: 'Daftar Ketidakhadiran' as const,
    filename: 'Absensi_VIII-B_TulisanTangan.jpg',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop',
    rawText: `DAFTAR KETIDAKHADIRAN KELAS VIII-B
Tanggal: 20 Agustus 2026

1. Ahmad Fausan - VIII-B - Sakit (Surat Dokter)
2. Siti Nurhalizah - VIII-B - Izin (Pernikahan Kakak)
3. Kurniawan Dwi Y. - VIII-B - Alpa
4. Eka Putri - VIII-B - Izin Keperluan Keluarga`
  },
  {
    title: 'Surat Keterangan Sakit & Dispensasi OSN',
    type: 'Surat Izin / Sakit' as const,
    filename: 'Dispensasi_OSN_IX-A.pdf',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
    rawText: `SURAT DISPENSASI SISWA
SMP NEGERI 99 JAKARTA
Nomor: 421.3/089/SMPN99/2026

Memberikan izin dispensasi belajar kepada:
1. M. Rizky Pratama - Kelas IX-A - Izin Pelatihan OSN
2. Nabila Syakieb - Kelas IX-A - Izin Lomba Pidato Bahasa Inggris`
  },
  {
    title: 'Rekap Catatan Pelanggaran Kedisiplinan',
    type: 'Catatan Pelanggaran' as const,
    filename: 'Pelanggaran_TataTertib_19Agustus.jpg',
    image: 'https://images.unsplash.com/photo-1584697964190-705b893683f1?q=80&w=1200&auto=format&fit=crop',
    rawText: `LEMBAR KEDISIPLINAN TATA TERTIB
1. Joko Widodo Prasetyo - VII-A - Terlambat Masuk Sekolah (Pukul 07.25)
2. Wahyu Hidayat - VIII-A - Tidak Memakai Seragam Olahraga Sesuai Jadwal`
  }
];
