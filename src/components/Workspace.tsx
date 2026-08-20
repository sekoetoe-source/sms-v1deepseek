import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle2, 
  Users, 
  FileSpreadsheet, 
  History, 
  Settings, 
  UploadCloud, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  Check, 
  X, 
  Edit3, 
  RotateCw, 
  Sparkles, 
  Eye, 
  Download, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Database,
  GraduationCap,
  Clock,
  Zap,
  Building2,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  SchoolProfile, 
  Student, 
  SchoolDocument, 
  ExtractedRecord, 
  AuditLog, 
  DocumentType,
  ProcessingStatus
} from '../types';
import { exportToExcel, exportToPDF, exportMasterStudentsToExcel } from '../utils/exportUtils';
import { SchoolLogo } from './SchoolLogo';
import { matchStudentAgainstMaster } from '../utils/fuzzyMatch';
import { PRESET_SAMPLE_DOCS } from '../data/mockData';
import { ManualMatchModal } from './ManualMatchModal';
import { PdfPreviewModal } from './PdfPreviewModal';

interface WorkspaceProps {
  initialTab?: string;
  school: SchoolProfile;
  setSchool: React.Dispatch<React.SetStateAction<SchoolProfile>>;
  masterStudents: Student[];
  setMasterStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  documents: SchoolDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<SchoolDocument[]>>;
  auditLogs: AuditLog[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
  onOpenImportModal: () => void;
  onBackToLanding: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  initialTab = 'dashboard',
  school,
  setSchool,
  masterStudents,
  setMasterStudents,
  documents,
  setDocuments,
  auditLogs,
  setAuditLogs,
  onOpenImportModal,
  onBackToLanding
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  
  // Document Center State
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.document_id || '');
  const [docFilterType, setDocFilterType] = useState<string>('ALL');
  const [isProcessingOcr, setIsProcessingOcr] = useState<boolean>(false);
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadDocType, setUploadDocType] = useState<DocumentType>('Daftar Ketidakhadiran');

  // Verification Workspace State
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{ nama: string; kelas: string; status: string; catatan: string }>({
    nama: '',
    kelas: '',
    status: '',
    catatan: ''
  });
  const [manualMatchRecord, setManualMatchRecord] = useState<ExtractedRecord | null>(null);

  // Master Data Tab State
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [studentClassFilter, setStudentClassFilter] = useState<string>('ALL');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState<boolean>(false);
  const [newStudentData, setNewStudentData] = useState<Partial<Student>>({
    nama: '',
    nisn: '',
    nis: '',
    kelas: 'VIII-B',
    rombel: 'Kelas 8B',
    gender: 'L',
    status: 'Aktif'
  });

  // AI Studio Chat Assistant State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; timestamp: string }>>([
    {
      sender: 'ai',
      text: `Halo ${school.operatorName}! Saya AI Assistant SMS Banyubiru yang terhubung langsung dengan Master Data ${school.name} (NPSN: ${school.npsn}) dan Web Service Dapodik. Ada yang bisa saya bantu terkait absensi, verifikasi NISN, atau pembuatan laporan hari ini?`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');

  const handleSendChat = (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim()) return;

    const userTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newMessages = [
      ...chatMessages,
      { sender: 'user' as const, text: textToSend, timestamp: userTime }
    ];
    setChatMessages(newMessages);
    setInputPrompt('');

    // Generate Smart AI Reply
    setTimeout(() => {
      let aiReply = '';
      const query = textToSend.toLowerCase();

      if (query.includes('dapodik') || query.includes('koneksi') || query.includes('sync')) {
        aiReply = `✅ **Status Integrasi Web Service Dapodik:**\n- **Host IP**: http://localhost:5774 (Aktif)\n- **NPSN**: ${school.npsn} (${school.name})\n- **Web Service Key**: X0yne1xUh0lKe7t\n- **Total Siswa Terkoneksi**: ${masterStudents.length} Siswa (Guru: 48, PTK: 12).\nSemua data sinkron dengan database lokal sekolah.`;
      } else if (query.includes('siswa') || query.includes('jumlah') || query.includes('total') || query.includes('statistik')) {
        aiReply = `📊 **Statistik Master Data Siswa:**\n- Total Siswa Terdaftar: **${masterStudents.length} Siswa**\n- Status Aktif: **100%**\n- Kelas dengan Jumlah Siswa Terbanyak: **Class VIII-B (36 Siswa)**\n- Akurasi Pencocokan NISN: **99.4%**`;
      } else if (query.includes('laporan') || query.includes('rekap') || query.includes('kepala sekolah')) {
        aiReply = `📄 **Draf Rekapitulasi Laporan Administrasi:**\n- **Nama Sekolah**: ${school.name}\n- **Kepala Sekolah**: ${school.headmasterName} (NIP: ${school.headmasterNip})\n- **Tahun Pelajaran**: ${school.academicYear} (${school.semester})\n- **Status Verifikasi**: 100% Terverifikasi Operator (${school.operatorName}).\n\nAnda dapat mengunduh berkas Laporan PDF / Excel resmi ber-Kop Surat di menu **Data Terstruktur & Ekspor**.`;
      } else {
        aiReply = `🤖 **Analisis AI SMS Banyubiru:**\nPermintaan Anda ("${textToSend}") telah diproses terhadap database ${school.name}. Berkas absensi harian dan verifikasi NISN siap diekspor. Pilih menu **Ruang Verifikasi** untuk peninjauan ganda atau **Ekspor PDF/Excel** untuk dokumen resmi.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai' as const,
          text: aiReply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  // Export Tab State
  const [exportDocFilter, setExportDocFilter] = useState<string>('ALL');

  // PDF Preview Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [pdfTargetDocument, setPdfTargetDocument] = useState<SchoolDocument | null>(null);

  const handleOpenPdfPreview = (docToPreview?: SchoolDocument) => {
    const target = docToPreview || activeDocument;
    if (!target) return;
    setPdfTargetDocument(target);
    setIsPdfModalOpen(true);
  };

  // Currently active document object
  const activeDocument = useMemo(() => {
    return documents.find(d => d.document_id === selectedDocId) || documents[0];
  }, [documents, selectedDocId]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const totalDocs = documents.length;
    const totalRecords = documents.reduce((acc, d) => acc + d.records.length, 0);
    const verifiedRecords = documents.reduce((acc, d) => acc + d.records.filter(r => r.isVerified && !r.isRejected).length, 0);
    const needsReviewDocs = documents.filter(d => d.status === 'Needs Review').length;
    const activeStudents = masterStudents.filter(s => s.status === 'Aktif').length;
    
    // Time saved calculation (avg 6 minutes per physical document manual entry vs 30 seconds OCR verify)
    const hoursSaved = ((totalDocs * 5.5) / 60).toFixed(1);

    return {
      totalDocs,
      totalRecords,
      verifiedRecords,
      needsReviewDocs,
      activeStudents,
      hoursSaved
    };
  }, [documents, masterStudents]);

  // Handle Quick Upload from Preset or Custom
  const handleUploadDocument = (presetIndex?: number) => {
    setIsProcessingOcr(true);
    
    setTimeout(() => {
      let title = uploadTitle || 'Daftar Ketidakhadiran Baru';
      let docType = uploadDocType;
      let rawText = '';
      let previewUrl = 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop';
      let parsedLines: { rawName: string; rawClass: string; rawStatus: string; rawNotes: string }[] = [];

      if (presetIndex !== undefined) {
        const preset = PRESET_SAMPLE_DOCS[presetIndex];
        title = preset.title;
        docType = preset.type;
        rawText = preset.rawText;
        previewUrl = preset.image;

        if (presetIndex === 0) {
          parsedLines = [
            { rawName: 'Ahmad Fausan', rawClass: 'VIII-B', rawStatus: 'Sakit', rawNotes: 'Surat Dokter' },
            { rawName: 'Siti Nurhalizah', rawClass: 'VIII-B', rawStatus: 'Izin', rawNotes: 'Pernikahan Kakak' },
            { rawName: 'Kurniawan Dwi Y.', rawClass: 'VIII-B', rawStatus: 'Alpa', rawNotes: 'Tanpa Keterangan' },
            { rawName: 'Eka Putri', rawClass: 'VIII-B', rawStatus: 'Izin', rawNotes: 'Keperluan Keluarga' }
          ];
        } else if (presetIndex === 1) {
          parsedLines = [
            { rawName: 'M. Rizky Pratama', rawClass: 'IX-A', rawStatus: 'Dispensasi', rawNotes: 'Pelatihan OSN' },
            { rawName: 'Nabila Syakieb', rawClass: 'IX-A', rawStatus: 'Dispensasi', rawNotes: 'Lomba Pidato B. Inggris' }
          ];
        } else {
          parsedLines = [
            { rawName: 'Joko Widodo Prasetyo', rawClass: 'VII-A', rawStatus: 'Terlambat', rawNotes: 'Pukul 07.25' },
            { rawName: 'Wahyu Hidayat', rawClass: 'VIII-A', rawStatus: 'Pelanggaran', rawNotes: 'Seragam tidak sesuai' }
          ];
        }
      } else {
        parsedLines = [
          { rawName: 'Dimas Anggara', rawClass: 'VIII-B', rawStatus: 'Izin', rawNotes: 'Keperluan Keluarga' },
          { rawName: 'Gita Gutawa', rawClass: 'VIII-A', rawStatus: 'Sakit', rawNotes: 'Demam' }
        ];
        rawText = `DOKUMEN ADMINISTRASI BARU\n1. Dimas Anggara - VIII-B - Izin\n2. Gita Gutawa - VIII-A - Sakit`;
      }

      // Generate Extracted Records with Fuzzy Matching
      const newRecords: ExtractedRecord[] = parsedLines.map((line, idx) => {
        const matchResult = matchStudentAgainstMaster(line.rawName, line.rawClass, masterStudents);
        return {
          id: `REC-NEW-${Date.now()}-${idx}`,
          lineNo: idx + 1,
          rawOcrText: `${idx + 1}. ${line.rawName} | ${line.rawClass} | ${line.rawStatus}`,
          rawName: line.rawName,
          rawClass: line.rawClass,
          rawStatus: line.rawStatus,
          rawDate: new Date().toLocaleDateString('id-ID'),
          rawNotes: line.rawNotes,
          matchedStudentId: matchResult.matchedStudent?.student_id,
          matchedStudent: matchResult.matchedStudent,
          confidence: matchResult.confidence,
          confidenceCategory: matchResult.confidenceCategory,
          alternativeCandidates: matchResult.alternativeCandidates,
          isVerified: matchResult.confidence >= 95, // Auto-flag high confidence or pending
          verifiedBy: matchResult.confidence >= 95 ? school.operatorName : undefined,
          verifiedAt: matchResult.confidence >= 95 ? new Date().toISOString().slice(0, 16).replace('T', ' ') : undefined
        };
      });

      const newDocId = `DOC-${Date.now().toString().slice(-4)}`;
      const avgConf = Math.round(newRecords.reduce((a, b) => a + b.confidence, 0) / newRecords.length);

      const newDoc: SchoolDocument = {
        document_id: newDocId,
        title,
        originalFilename: `${title.replace(/\s+/g, '_')}.jpg`,
        documentType: docType,
        uploadTimestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        uploader: school.operatorName,
        status: newRecords.every(r => r.isVerified) ? 'Verified' : 'Needs Review',
        confidenceAvg: avgConf,
        recordsCount: newRecords.length,
        verifiedCount: newRecords.filter(r => r.isVerified).length,
        previewUrl,
        rawText,
        records: newRecords
      };

      setDocuments(prev => [newDoc, ...prev]);
      setSelectedDocId(newDocId);
      setIsProcessingOcr(false);
      setUploadTitle('');

      // Add to Audit Log
      const newLog: AuditLog = {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        operator: school.operatorName,
        action: 'Upload & Ekstraksi OCR',
        targetDocument: title,
        afterValue: `${newRecords.length} record diproses (${avgConf}% confidence)`,
        type: 'ocr'
      };
      setAuditLogs(prev => [newLog, ...prev]);

      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      setActiveTab('verification');
    }, 1200);
  };

  // Verification Handlers
  const handleVerifyRecord = (recordId: string) => {
    if (!activeDocument) return;

    setDocuments(prev => prev.map(doc => {
      if (doc.document_id !== activeDocument.document_id) return doc;

      const updatedRecords = doc.records.map(rec => {
        if (rec.id === recordId) {
          return {
            ...rec,
            isVerified: true,
            isRejected: false,
            verifiedBy: school.operatorName,
            verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
          };
        }
        return rec;
      });

      const verifiedCount = updatedRecords.filter(r => r.isVerified && !r.isRejected).length;
      const allVerified = verifiedCount === updatedRecords.length;

      return {
        ...doc,
        records: updatedRecords,
        verifiedCount,
        status: allVerified ? 'Verified' : 'Needs Review'
      };
    }));

    // Audit log
    setAuditLogs(prev => [
      {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        operator: school.operatorName,
        action: 'Verifikasi Record Siswa',
        targetDocument: activeDocument.title,
        afterValue: `ID: ${recordId} (Verified)`,
        type: 'verification'
      },
      ...prev
    ]);
  };

  const handleVerifyAllRecords = () => {
    if (!activeDocument) return;

    setDocuments(prev => prev.map(doc => {
      if (doc.document_id !== activeDocument.document_id) return doc;

      const updatedRecords = doc.records.map(rec => ({
        ...rec,
        isVerified: true,
        isRejected: false,
        verifiedBy: school.operatorName,
        verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      }));

      return {
        ...doc,
        records: updatedRecords,
        verifiedCount: updatedRecords.length,
        status: 'Verified'
      };
    }));

    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });

    // Audit log
    setAuditLogs(prev => [
      {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        operator: school.operatorName,
        action: 'Verifikasi Seluruh Record Dokumen (Bulk)',
        targetDocument: activeDocument.title,
        afterValue: `${activeDocument.records.length} Record Terverifikasi`,
        type: 'verification'
      },
      ...prev
    ]);
  };

  const handleRejectRecord = (recordId: string) => {
    if (!activeDocument) return;

    setDocuments(prev => prev.map(doc => {
      if (doc.document_id !== activeDocument.document_id) return doc;

      const updatedRecords = doc.records.map(rec => {
        if (rec.id === recordId) {
          return {
            ...rec,
            isVerified: false,
            isRejected: true
          };
        }
        return rec;
      });

      return {
        ...doc,
        records: updatedRecords,
        verifiedCount: updatedRecords.filter(r => r.isVerified && !r.isRejected).length
      };
    }));
  };

  const handleSaveEditRecord = (recordId: string) => {
    if (!activeDocument) return;

    setDocuments(prev => prev.map(doc => {
      if (doc.document_id !== activeDocument.document_id) return doc;

      const updatedRecords = doc.records.map(rec => {
        if (rec.id === recordId) {
          return {
            ...rec,
            editedFields: { ...editFormData },
            isVerified: true,
            verifiedBy: school.operatorName,
            verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
          };
        }
        return rec;
      });

      return {
        ...doc,
        records: updatedRecords,
        verifiedCount: updatedRecords.filter(r => r.isVerified && !r.isRejected).length
      };
    }));

    setEditingRecordId(null);
  };

  const handleSelectCandidateStudent = (recordId: string, student: Student) => {
    if (!activeDocument) return;

    setDocuments(prev => prev.map(doc => {
      if (doc.document_id !== activeDocument.document_id) return doc;

      const updatedRecords = doc.records.map(rec => {
        if (rec.id === recordId) {
          return {
            ...rec,
            matchedStudentId: student.student_id,
            matchedStudent: student,
            confidence: 100,
            confidenceCategory: 'Manual Match' as const,
            isVerified: true,
            verifiedBy: school.operatorName,
            verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
          };
        }
        return rec;
      });

      return {
        ...doc,
        records: updatedRecords,
        verifiedCount: updatedRecords.filter(r => r.isVerified && !r.isRejected).length
      };
    }));
  };

  // Add new student to master
  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentData.nama || !newStudentData.nisn) {
      alert('Nama Siswa dan NISN wajib diisi.');
      return;
    }

    const created: Student = {
      student_id: `STU-${Date.now().toString().slice(-4)}`,
      source_id: `DAPO-MANUAL-${Date.now().toString().slice(-4)}`,
      nis: newStudentData.nis || `2324${Math.floor(100000 + Math.random() * 900000)}`,
      nisn: newStudentData.nisn,
      nama: newStudentData.nama,
      kelas: newStudentData.kelas || 'VIII-B',
      rombel: newStudentData.rombel || 'Kelas 8B',
      status: (newStudentData.status as any) || 'Aktif',
      academic_year: school.academicYear,
      gender: (newStudentData.gender as any) || 'L',
      wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.'
    };

    setMasterStudents(prev => [created, ...prev]);
    setIsAddStudentOpen(false);
    setNewStudentData({ nama: '', nisn: '', nis: '', kelas: 'VIII-B', rombel: 'Kelas 8B', gender: 'L', status: 'Aktif' });
    
    // Add audit log
    setAuditLogs(prev => [
      {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        operator: school.operatorName,
        action: 'Tambah Siswa Baru ke Master Data',
        afterValue: `${created.nama} (${created.kelas})`,
        type: 'import'
      },
      ...prev
    ]);
  };

  // Classes list for filter
  const allClasses = useMemo(() => {
    const set = new Set(masterStudents.map(s => s.kelas));
    return ['ALL', ...Array.from(set).sort()];
  }, [masterStudents]);

  // Filtered master students
  const filteredMasterStudents = useMemo(() => {
    return masterStudents.filter(s => {
      const matchQ = s.nama.toLowerCase().includes(studentSearch.toLowerCase()) ||
                     s.nisn.includes(studentSearch) ||
                     s.nis.includes(studentSearch);
      const matchC = studentClassFilter === 'ALL' || s.kelas === studentClassFilter;
      return matchQ && matchC;
    });
  }, [masterStudents, studentSearch, studentClassFilter]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col font-body">
      
      {/* Top Workspace Bar */}
      <div className="bg-[#031534] text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shadow-sm">
        
        {/* Left School Context */}
        <div className="flex items-center gap-3">
          <img 
            src={school.logoUrl} 
            alt={school.name} 
            className="w-8 h-8 object-contain rounded-md bg-white/10 p-1"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white tracking-tight">
                {school.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00B894]/20 text-[#00B894] border border-[#00B894]/30">
                T.P. {school.academicYear} ({school.semester})
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              NPSN: {school.npsn} • Akreditasi: {school.accreditation} • Operator: <strong className="text-white">{school.operatorName}</strong>
            </p>
          </div>
        </div>

        {/* Right Action Switcher */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToLanding}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            ← Kembali ke Landing Page
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#F97316] text-white hover:bg-[#ea580c] transition-colors shadow-xs"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            + Upload Dokumen Baru
          </button>
        </div>

      </div>

      {/* Main Tab Navigation */}
      <div className="bg-white border-b border-[#E6E6E6] sticky top-16 z-30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar">
          <nav className="flex space-x-1 sm:space-x-2 py-2">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-[#031534] text-white shadow-xs'
                  : 'text-[#44474E] hover:bg-[#F8F9FA] hover:text-[#031534]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('ai_chat')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'ai_chat'
                  ? 'bg-[#031534] text-white shadow-xs border border-[#00E5FF]/40'
                  : 'text-[#44474E] hover:bg-[#F8F9FA] hover:text-[#031534]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#00E5FF] animate-pulse" />
              <span>AI Studio Assistant</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                Live Chat
              </span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'bg-[#031534] text-white shadow-xs'
                  : 'text-[#44474E] hover:bg-[#F8F9FA] hover:text-[#031534]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Pusat Dokumen & OCR</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-800">
                {documents.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('verification')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'verification'
                  ? 'bg-[#031534] text-white shadow-xs'
                  : 'text-[#44474E] hover:bg-[#F8F9FA] hover:text-[#031534]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#00B894]" />
              <span>Ruang Verifikasi (Dual Screen)</span>
              {metrics.needsReviewDocs > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold animate-pulse">
                  {metrics.needsReviewDocs} Perlu Review
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('master')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'master'
                  ? 'bg-[#031534] text-white shadow-xs'
                  : 'text-[#44474E] hover:bg-[#F8F9FA] hover:text-[#031534]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Master Data Siswa</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-800">
                {masterStudents.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'export'
                  ? 'bg-[#031534] text-white shadow-xs'
                  : 'text-[#44474E] hover:bg-[#F8F9FA] hover:text-[#031534]'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Data Terstruktur & Ekspor</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'bg-[#031534] text-white shadow-xs'
                  : 'text-[#44474E] hover:bg-[#F8F9FA] hover:text-[#031534]'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Audit Trail</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-[#031534] text-white shadow-xs'
                  : 'text-[#44474E] hover:bg-[#F8F9FA] hover:text-[#031534]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Profil Sekolah</span>
            </button>

          </nav>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD                                         */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Header Greeting & Time Saved Banner */}
            <div className="bg-gradient-to-r from-[#031534] via-[#091b3a] to-[#006b55] text-white p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 architectural-grid"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Sistem Operasional Aktif • Siap Memproses Dokumen
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                    Selamat Datang, {school.operatorName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    Panel otomasi data administrasi {school.name}. Tinjau hasil ekstraksi OCR dan verifikasi data siswa secara cepat.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center sm:text-right min-w-[200px]">
                  <div className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
                    Estimasi Waktu Dihemat
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-0.5">
                    {metrics.hoursSaved} Jam
                  </div>
                  <div className="text-[10px] text-slate-300">
                    Berdasarkan {metrics.totalDocs} dokumen yang telah diproses
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6C757D] uppercase">Siswa Terdaftar</span>
                  <div className="w-8 h-8 rounded-lg bg-[#031534]/5 text-[#031534] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#031534] mt-2">
                  {metrics.activeStudents}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sinkron dengan Dapodik Sekolah
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6C757D] uppercase">Dokumen Diproses</span>
                  <div className="w-8 h-8 rounded-lg bg-[#006b55]/10 text-[#006b55] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#031534] mt-2">
                  {metrics.totalDocs} Berkas
                </div>
                <div className="text-[11px] text-[#6C757D] mt-1">
                  Total {metrics.totalRecords} baris record diekstrak
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6C757D] uppercase">Perlu Verifikasi</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-amber-600 mt-2">
                  {metrics.needsReviewDocs} Dokumen
                </div>
                <div className="text-[11px] text-amber-800 font-semibold mt-1">
                  Menunggu konfirmasi operator
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6C757D] uppercase">Record Terverifikasi</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-emerald-600 mt-2">
                  {metrics.verifiedRecords} / {metrics.totalRecords}
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                  Siap diunduh ke Excel / PDF
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Recent Documents Table */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-[#E6E6E6] shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E6E6E6] flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#031534]">
                      Dokumen Administrasi Terbaru
                    </h3>
                    <p className="text-xs text-[#6C757D]">
                      Antrean berkas absensi dan surat keterangan masuk
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className="text-xs font-bold text-[#006b55] hover:underline flex items-center gap-1"
                  >
                    Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F9FA] text-[#44474E] font-semibold border-b border-[#E6E6E6]">
                      <tr>
                        <th className="p-3">Nama Berkas & Tipe</th>
                        <th className="p-3">Waktu Upload</th>
                        <th className="p-3">Confidence</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E6E6]">
                      {documents.slice(0, 5).map(doc => (
                        <tr key={doc.document_id} className="hover:bg-[#F8F9FA]">
                          <td className="p-3">
                            <div className="font-bold text-[#031534]">{doc.title}</div>
                            <div className="text-[11px] text-[#6C757D]">{doc.documentType} • {doc.recordsCount} Siswa</div>
                          </td>
                          <td className="p-3 text-[#44474E] font-mono text-[11px]">
                            {doc.uploadTimestamp}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                              {doc.confidenceAvg}%
                            </span>
                          </td>
                          <td className="p-3">
                            {doc.status === 'Verified' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                ✓ Terverifikasi
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                ⏳ Perlu Review
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedDocId(doc.document_id);
                                setActiveTab('verification');
                              }}
                              className="px-3 py-1 bg-[#031534] text-white rounded text-[11px] font-bold hover:bg-[#1a2a4a] transition-colors"
                            >
                              Buka Verifikasi
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Col: Quick Upload & Shortcuts */}
              <div className="space-y-4">
                
                {/* Fast Preset Box */}
                <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-xs space-y-3">
                  <h4 className="font-bold text-xs text-[#031534] uppercase tracking-wider">
                    Proses Sampel Berkas Cepat (1-Klik)
                  </h4>
                  <p className="text-xs text-[#6C757D]">
                    Pilih skenario dokumen nyata untuk menjalankan OCR dan fuzzy matching langsung:
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleUploadDocument(0)}
                      disabled={isProcessingOcr}
                      className="w-full text-left p-3 rounded-lg border border-[#E6E6E6] hover:border-[#00B894] hover:bg-[#00B894]/5 transition-all text-xs flex items-center justify-between group disabled:opacity-50"
                    >
                      <div>
                        <div className="font-bold text-[#031534] group-hover:text-[#006b55]">
                          Absensi Harian Kelas VIII-B
                        </div>
                        <div className="text-[10px] text-[#6C757D]">Tulisan tangan wali kelas (4 siswa)</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#006b55] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                      onClick={() => handleUploadDocument(1)}
                      disabled={isProcessingOcr}
                      className="w-full text-left p-3 rounded-lg border border-[#E6E6E6] hover:border-[#00B894] hover:bg-[#00B894]/5 transition-all text-xs flex items-center justify-between group disabled:opacity-50"
                    >
                      <div>
                        <div className="font-bold text-[#031534] group-hover:text-[#006b55]">
                          Surat Izin & Dispensasi OSN
                        </div>
                        <div className="text-[10px] text-[#6C757D]">Dokumen ketidakhadiran resmi (2 siswa)</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#006b55] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                      onClick={() => handleUploadDocument(2)}
                      disabled={isProcessingOcr}
                      className="w-full text-left p-3 rounded-lg border border-[#E6E6E6] hover:border-[#00B894] hover:bg-[#00B894]/5 transition-all text-xs flex items-center justify-between group disabled:opacity-50"
                    >
                      <div>
                        <div className="font-bold text-[#031534] group-hover:text-[#006b55]">
                          Catatan Kedisiplinan Upacara
                        </div>
                        <div className="text-[10px] text-[#6C757D]">Keterlambatan siswa (2 siswa)</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#006b55] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>

                {/* Master Data Dapodik Sync Banner */}
                <div className="bg-emerald-50/70 p-5 rounded-xl border border-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <Database className="w-4 h-4 text-emerald-700" />
                    Master Data Siswa Terhubung
                  </div>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    Database lokal memiliki <strong className="text-emerald-950">{masterStudents.length} siswa</strong> aktif dari SMP Negeri 99 Jakarta.
                  </p>
                  <button
                    onClick={onOpenImportModal}
                    className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition-colors shadow-xs mt-1"
                  >
                    Import / Perbarui Data Dapodik
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: AI CHAT ASSISTANT (AI STUDIO / CHATGPT STYLE UI)      */}
        {/* ========================================================= */}
        {activeTab === 'ai_chat' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            
            {/* AI Studio Header Card */}
            <div className="bg-[#031534] text-white p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#006b55] text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6 fill-current text-white animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-lg text-white font-display">
                      AI Assistant Data Sekolah &amp; Dapodik
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30">
                      Gemini 1.5 Pro REST API
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Ketik pertanyaan alami seputar data siswa, absensi, atau status Web Service Dapodik ({school.name})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-mono text-emerald-300 font-bold">Dapodik Port 5774 Connected</span>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#6C757D] font-bold">Rekomendasi Pertanyaan:</span>
              <button 
                onClick={() => handleSendChat('Cek status integrasi Web Service Dapodik (Port 5774)')}
                className="px-3 py-1.5 rounded-full bg-white text-[#031534] border border-[#E6E6E6] hover:bg-[#F8F9FA] hover:border-[#00B894] font-medium transition-all shadow-2xs"
              >
                💡 Cek Web Service Dapodik
              </button>
              <button 
                onClick={() => handleSendChat('Berapa jumlah master siswa aktif di database?')}
                className="px-3 py-1.5 rounded-full bg-white text-[#031534] border border-[#E6E6E6] hover:bg-[#F8F9FA] hover:border-[#00B894] font-medium transition-all shadow-2xs"
              >
                💡 Tampilkan Statistik Siswa
              </button>
              <button 
                onClick={() => handleSendChat('Buatkan draf rekapitulasi laporan untuk Kepala Sekolah')}
                className="px-3 py-1.5 rounded-full bg-white text-[#031534] border border-[#E6E6E6] hover:bg-[#F8F9FA] hover:border-[#00B894] font-medium transition-all shadow-2xs"
              >
                💡 Draf Laporan Kepsek
              </button>
            </div>

            {/* Chat Box Conversation */}
            <div className="bg-white rounded-2xl border border-[#E6E6E6] shadow-sm overflow-hidden flex flex-col h-[520px]">
              
              {/* Message List */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F8F9FA]/50">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-[#031534] text-white'
                        : 'bg-gradient-to-tr from-[#006b55] to-[#00B894] text-white'
                    }`}>
                      {msg.sender === 'user' ? 'YOU' : <Sparkles className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[78%] rounded-2xl p-4 text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#031534] text-white rounded-tr-none'
                        : 'bg-white text-[#1A1A1A] border border-[#E6E6E6] rounded-tl-none space-y-2'
                    }`}>
                      <div className="whitespace-pre-line font-body">{msg.text}</div>
                      <div className={`text-[10px] text-right mt-1 ${msg.sender === 'user' ? 'text-slate-300' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 bg-white border-t border-[#E6E6E6]">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChat();
                  }}
                  className="flex items-center gap-3"
                >
                  <input 
                    type="text"
                    placeholder="Tanyakan sesuatu pada AI Assistant (contoh: Cek Dapodik, Rekap Siswa)..."
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#F8F9FA] border border-[#E6E6E6] rounded-xl text-xs focus:outline-none focus:border-[#00B894] focus:bg-white transition-all font-body"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#006b55] hover:bg-[#005241] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
                  >
                    <span>Kirim</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PUSAT DOKUMEN & OCR                                */}
        {/* ========================================================= */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            
            {/* Upload Area */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6E6E6] pb-4">
                <div>
                  <h3 className="font-bold text-base text-[#031534]">
                    Upload Dokumen Administrasi Baru
                  </h3>
                  <p className="text-xs text-[#6C757D]">
                    Format yang didukung: JPG, PNG, PDF (Scan dokumen atau foto tulisan tangan)
                  </p>
                </div>
                <span className="text-xs font-bold text-[#006b55] bg-[#00B894]/10 px-2.5 py-1 rounded">
                  Modul 02: Ingestion & OCR
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-[#031534] block mb-1">
                    Judul Dokumen / Nama Kegiatan:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rekap Absensi Harian Kelas 8B - 20 Agustus 2026"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full text-xs border border-[#E6E6E6] rounded-lg p-2.5 focus:outline-none focus:border-[#00B894]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#031534] block mb-1">
                    Kategori Dokumen:
                  </label>
                  <select
                    value={uploadDocType}
                    onChange={(e) => setUploadDocType(e.target.value as DocumentType)}
                    className="w-full text-xs border border-[#E6E6E6] rounded-lg p-2.5 focus:outline-none focus:border-[#00B894]"
                  >
                    <option value="Daftar Ketidakhadiran">Daftar Ketidakhadiran</option>
                    <option value="Surat Izin / Sakit">Surat Izin / Sakit</option>
                    <option value="Catatan Pelanggaran">Catatan Pelanggaran</option>
                    <option value="Daftar Prestasi Siswa">Daftar Prestasi Siswa</option>
                    <option value="Formulir Kegiatan Siswa">Formulir Kegiatan Siswa</option>
                  </select>
                </div>
              </div>

              {/* Drag & drop trigger */}
              <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center bg-[#F8F9FA] hover:bg-[#F1F5F9] transition-colors">
                <UploadCloud className="w-10 h-10 mx-auto text-[#006b55] mb-2" />
                <h4 className="font-bold text-sm text-[#031534]">
                  Tarik berkas foto/scan ke sini atau klik tombol di bawah
                </h4>
                <p className="text-xs text-[#6C757D] mt-1">
                  Engine OCR akan membaca baris teks secara otomatis dan mencari kecocokan data siswa.
                </p>

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={() => handleUploadDocument()}
                    disabled={isProcessingOcr}
                    className="px-5 py-2.5 bg-[#031534] text-white font-bold text-xs rounded-xl hover:bg-[#1a2a4a] transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessingOcr ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin text-[#00B894]" />
                        Menjalankan OCR AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#00B894]" />
                        Upload & Proses Dokumen Ini
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Document List Table */}
            <div className="bg-white rounded-2xl border border-[#E6E6E6] shadow-xs overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-[#E6E6E6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base text-[#031534]">
                    Daftar Semua Dokumen
                  </h3>
                  <p className="text-xs text-[#6C757D]">
                    {documents.length} dokumen tersimpan di repositori sekolah
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={docFilterType}
                    onChange={(e) => setDocFilterType(e.target.value)}
                    className="text-xs border border-[#E6E6E6] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00B894]"
                  >
                    <option value="ALL">Semua Jenis Dokumen</option>
                    <option value="Daftar Ketidakhadiran">Daftar Ketidakhadiran</option>
                    <option value="Surat Izin / Sakit">Surat Izin / Sakit</option>
                    <option value="Catatan Pelanggaran">Catatan Pelanggaran</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F9FA] text-[#44474E] font-semibold border-b border-[#E6E6E6]">
                    <tr>
                      <th className="p-3.5">ID & Nama Dokumen</th>
                      <th className="p-3.5">Tipe Dokumen</th>
                      <th className="p-3.5">Diunggah Oleh</th>
                      <th className="p-3.5">Record Siswa</th>
                      <th className="p-3.5">Confidence</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E6E6]">
                    {documents
                      .filter(d => docFilterType === 'ALL' || d.documentType === docFilterType)
                      .map(doc => (
                        <tr key={doc.document_id} className="hover:bg-[#F8F9FA]">
                          <td className="p-3.5">
                            <div className="font-bold text-sm text-[#031534]">{doc.title}</div>
                            <div className="text-[11px] text-[#6C757D] font-mono">{doc.originalFilename} • {doc.uploadTimestamp}</div>
                          </td>
                          <td className="p-3.5 text-[#44474E]">
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                              {doc.documentType}
                            </span>
                          </td>
                          <td className="p-3.5 text-[#44474E]">
                            {doc.uploader}
                          </td>
                          <td className="p-3.5 text-[#44474E]">
                            <span className="font-bold text-[#031534]">{doc.verifiedCount}</span> / {doc.recordsCount} Terverifikasi
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                              {doc.confidenceAvg}%
                            </span>
                          </td>
                          <td className="p-3.5">
                            {doc.status === 'Verified' ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                                <Check className="w-3 h-3" /> Terverifikasi
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-fit">
                                ⏳ Perlu Review
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSelectedDocId(doc.document_id);
                                  setActiveTab('verification');
                                }}
                                className="px-3 py-1.5 bg-[#031534] text-white rounded-lg text-xs font-bold hover:bg-[#1a2a4a] transition-all"
                              >
                                Verifikasi
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: RUANG VERIFIKASI (DUAL SCREEN)                     */}
        {/* ========================================================= */}
        {activeTab === 'verification' && (
          <div className="space-y-4">
            
            {/* Header Document Selector & Action Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E6E6] shadow-xs flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#031534] text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#00B894]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#031534]">
                      {activeDocument?.title || 'Pilih Dokumen'}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#031534]/5 text-[#031534]">
                      {activeDocument?.documentType}
                    </span>
                  </div>
                  <p className="text-xs text-[#6C757D]">
                    {activeDocument?.verifiedCount} dari {activeDocument?.recordsCount} baris terverifikasi • Confidence Rata-rata: <strong className="text-emerald-700">{activeDocument?.confidenceAvg}%</strong>
                  </p>
                </div>
              </div>

              {/* Document Dropdown Switcher */}
              <div className="flex items-center gap-2.5">
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="text-xs border border-[#E6E6E6] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00B894] font-medium"
                >
                  {documents.map(d => (
                    <option key={d.document_id} value={d.document_id}>
                      {d.title} ({d.status})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleVerifyAllRecords}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Konfirmasi Semua Baris
                </button>

                <button
                  onClick={() => handleOpenPdfPreview(activeDocument)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-all shadow-xs flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  Pratinjau PDF
                </button>
              </div>

            </div>

            {/* DUAL PANEL WORKSPACE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* LEFT PANEL: Document Image Viewer */}
              <div className="lg:col-span-5 bg-white rounded-xl border border-[#E6E6E6] shadow-xs flex flex-col overflow-hidden max-h-[750px]">
                
                {/* Viewer Top Bar */}
                <div className="px-4 py-2.5 border-b border-[#E6E6E6] bg-[#F8F9FA] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#031534] flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#006b55]" />
                    Pratinjau Dokumen Fisik
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setZoomLevel(prev => Math.max(50, prev - 15))}
                      className="p-1 rounded hover:bg-[#E6E6E6]"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[11px] px-1">{zoomLevel}%</span>
                    <button 
                      onClick={() => setZoomLevel(prev => Math.min(200, prev + 15))}
                      className="p-1 rounded hover:bg-[#E6E6E6]"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Viewer Canvas */}
                <div className="p-4 flex-1 overflow-auto bg-[#1A1A1A] flex items-center justify-center min-h-[360px]">
                  <div 
                    className="transition-transform duration-200 origin-center relative shadow-2xl rounded"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    <img 
                      src={activeDocument?.previewUrl} 
                      alt="Scanned Document"
                      className="max-w-full max-h-[500px] object-contain rounded border border-white/20"
                    />
                  </div>
                </div>

                {/* Raw OCR Text Drawer */}
                <div className="p-3 bg-[#031534] text-white text-[11px] font-mono border-t border-slate-700">
                  <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Transkrip Mentah OCR:
                  </div>
                  <div className="max-h-24 overflow-y-auto whitespace-pre-wrap text-slate-300 leading-relaxed text-[10px]">
                    {activeDocument?.rawText}
                  </div>
                </div>

              </div>

              {/* RIGHT PANEL: Extracted Records & Student Matcher */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E6E6E6] shadow-xs flex flex-col overflow-hidden max-h-[750px]">
                
                {/* Panel Header */}
                <div className="px-5 py-3 border-b border-[#E6E6E6] bg-[#F8F9FA] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-[#031534] uppercase tracking-wider">
                      Baris Rekord Terbaca ({activeDocument?.records.length || 0} Baris)
                    </h4>
                    <p className="text-[11px] text-[#6C757D]">
                      Tinjau hasil pencocokan nama siswa dengan Master Data (Dapodik)
                    </p>
                  </div>
                </div>

                {/* Records List */}
                <div className="p-4 overflow-y-auto flex-1 divide-y divide-[#E6E6E6] space-y-3">
                  {activeDocument?.records.map((rec) => {
                    const isEditing = editingRecordId === rec.id;
                    const student = rec.matchedStudent;

                    return (
                      <div 
                        key={rec.id}
                        className={`pt-3 rounded-xl p-3.5 transition-all ${
                          rec.isVerified 
                            ? 'bg-emerald-50/40 border border-emerald-200' 
                            : rec.isRejected
                            ? 'bg-rose-50/40 border border-rose-200 opacity-60'
                            : 'bg-white border border-[#E6E6E6] hover:border-amber-300'
                        }`}
                      >
                        {/* Edit Mode */}
                        {isEditing ? (
                          <div className="space-y-3 bg-[#F8F9FA] p-3 rounded-lg border border-[#E6E6E6]">
                            <div className="font-bold text-xs text-[#031534]">Koreksi Nilai Lapangan:</div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <label className="text-[10px] text-[#6C757D] block">Nama Siswa:</label>
                                <input 
                                  type="text" 
                                  value={editFormData.nama} 
                                  onChange={(e) => setEditFormData({ ...editFormData, nama: e.target.value })}
                                  className="w-full p-1.5 border rounded text-xs"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-[#6C757D] block">Kelas:</label>
                                <input 
                                  type="text" 
                                  value={editFormData.kelas} 
                                  onChange={(e) => setEditFormData({ ...editFormData, kelas: e.target.value })}
                                  className="w-full p-1.5 border rounded text-xs"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-[#6C757D] block">Status:</label>
                                <input 
                                  type="text" 
                                  value={editFormData.status} 
                                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                  className="w-full p-1.5 border rounded text-xs"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-[#6C757D] block">Catatan / Keterangan:</label>
                                <input 
                                  type="text" 
                                  value={editFormData.catatan} 
                                  onChange={(e) => setEditFormData({ ...editFormData, catatan: e.target.value })}
                                  className="w-full p-1.5 border rounded text-xs"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-1">
                              <button 
                                onClick={() => setEditingRecordId(null)}
                                className="px-3 py-1 text-xs text-[#6C757D] hover:bg-slate-200 rounded"
                              >
                                Batal
                              </button>
                              <button 
                                onClick={() => handleSaveEditRecord(rec.id)}
                                className="px-3 py-1 bg-[#031534] text-white text-xs font-bold rounded hover:bg-[#1a2a4a]"
                              >
                                Simpan Perubahan
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* View Mode */
                          <div>
                            
                            {/* Line Header */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                
                                {/* Matched Student Main Tag */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono text-xs text-[#6C757D] font-bold">
                                    #{rec.lineNo}
                                  </span>
                                  
                                  <span className="font-extrabold text-sm text-[#031534]">
                                    {rec.editedFields?.nama || student?.nama || rec.rawName}
                                  </span>

                                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#031534] text-white rounded">
                                    {rec.editedFields?.kelas || student?.kelas || rec.rawClass}
                                  </span>

                                  {/* Confidence Badge */}
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    rec.confidence >= 95 
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                                      : rec.confidence >= 80
                                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                                      : 'bg-rose-100 text-rose-800 border-rose-300'
                                  }`}>
                                    {rec.confidence}% Match
                                  </span>

                                  {rec.isVerified && (
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                                      <Check className="w-3 h-3" /> Terverifikasi
                                    </span>
                                  )}
                                </div>

                                {/* Raw OCR vs Matched Details */}
                                <div className="text-[11px] text-[#6C757D] space-y-0.5">
                                  <div>
                                    <span className="text-slate-400">Teks Dokumen Asli:</span>{' '}
                                    <span className="font-mono text-[#031534] bg-[#F8F9FA] px-1.5 py-0.5 rounded border border-[#E6E6E6]">
                                      "{rec.rawName}" ({rec.rawClass})
                                    </span>
                                  </div>
                                  
                                  {student && (
                                    <div className="text-[#031534]">
                                      <span>NISN: <strong className="font-mono">{student.nisn}</strong></span> • 
                                      <span> NIS: <strong className="font-mono">{student.nis}</strong></span> • 
                                      <span> Wali: {student.wali_kelas || '-'}</span>
                                    </div>
                                  )}
                                  
                                  <div className="pt-0.5">
                                    <span className="font-semibold text-[#031534]">Status:</span>{' '}
                                    <strong className="text-amber-800">{rec.editedFields?.status || rec.rawStatus}</strong> • 
                                    <span> Keterangan: {rec.editedFields?.catatan || rec.rawNotes || '-'}</span>
                                  </div>
                                </div>

                              </div>

                              {/* Action Buttons Right */}
                              <div className="flex items-center gap-1.5 shrink-0">
                                {!rec.isVerified && (
                                  <button
                                    onClick={() => handleVerifyRecord(rec.id)}
                                    className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                                    title="Konfirmasi Match"
                                  >
                                    <Check className="w-4 h-4" />
                                    <span className="hidden sm:inline">Setujui</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    setEditingRecordId(rec.id);
                                    setEditFormData({
                                      nama: rec.editedFields?.nama || student?.nama || rec.rawName,
                                      kelas: rec.editedFields?.kelas || student?.kelas || rec.rawClass,
                                      status: rec.editedFields?.status || rec.rawStatus,
                                      catatan: rec.editedFields?.catatan || rec.rawNotes || ''
                                    });
                                  }}
                                  className="p-1.5 bg-white border border-[#E6E6E6] hover:bg-[#F8F9FA] text-[#031534] rounded-lg text-xs font-medium"
                                  title="Edit Baris Ini"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => setManualMatchRecord(rec)}
                                  className="p-1.5 bg-white border border-[#E6E6E6] hover:bg-[#F8F9FA] text-[#006b55] rounded-lg text-xs font-medium"
                                  title="Pilih Siswa Manual dari Master Data"
                                >
                                  <Database className="w-3.5 h-3.5" />
                                </button>

                                {!rec.isVerified && (
                                  <button
                                    onClick={() => handleRejectRecord(rec.id)}
                                    className="p-1.5 bg-white border border-[#E6E6E6] hover:bg-rose-50 text-rose-600 rounded-lg text-xs"
                                    title="Tolak Baris Ini"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Alternative Match Candidates (If available) */}
                            {rec.alternativeCandidates && rec.alternativeCandidates.length > 0 && !rec.isVerified && (
                              <div className="mt-2 pt-2 border-t border-[#E6E6E6]/60 flex items-center gap-2 text-[11px]">
                                <span className="text-[#6C757D] font-medium">Kandidat Lain:</span>
                                {rec.alternativeCandidates.map(cand => (
                                  <button
                                    key={cand.student.student_id}
                                    onClick={() => handleSelectCandidateStudent(rec.id, cand.student)}
                                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 text-[#031534] font-medium transition-colors border border-slate-200 text-[10px]"
                                  >
                                    {cand.student.nama} ({cand.confidence}%)
                                  </button>
                                ))}
                              </div>
                            )}

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Quick Export Trigger */}
                <div className="px-5 py-3 bg-[#F8F9FA] border-t border-[#E6E6E6] flex items-center justify-between">
                  <span className="text-xs text-[#6C757D]">
                    {activeDocument?.records.filter(r => r.isVerified).length} data terverifikasi siap diekspor.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportToExcel(activeDocument, activeDocument.records, school)}
                      className="px-3 py-1.5 bg-white border border-emerald-400 text-emerald-800 hover:bg-emerald-50 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      Excel (.xlsx)
                    </button>
                    <button
                      onClick={() => exportToPDF(activeDocument, activeDocument.records, school)}
                      className="px-3 py-1.5 bg-white border border-rose-400 text-rose-800 hover:bg-rose-50 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-600" />
                      Laporan PDF
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: MASTER DATA SISWA                                  */}
        {/* ========================================================= */}
        {activeTab === 'master' && (
          <div className="space-y-6">
            
            {/* Master Header */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-[#031534]">
                    Master Data Siswa ({school.name})
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {masterStudents.length} Siswa Aktif
                  </span>
                </div>
                <p className="text-xs text-[#6C757D] mt-0.5">
                  Basis data siswa resmi sebagai referensi pencocokan OCR dan rekonsiliasi NISN
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => exportMasterStudentsToExcel(masterStudents, school)}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-[#E6E6E6] hover:bg-[#F8F9FA] text-[#031534] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  Export Excel
                </button>

                <button
                  onClick={onOpenImportModal}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#006b55] text-white hover:bg-emerald-800 transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <UploadCloud className="w-4 h-4" />
                  Import Dapodik / Excel
                </button>

                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#031534] text-white hover:bg-[#1a2a4a] transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  + Tambah Siswa
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E6E6] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D]" />
                <input
                  type="text"
                  placeholder="Cari nama siswa, NISN, atau NIS..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E6E6E6] rounded-lg focus:outline-none focus:border-[#00B894]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-[#6C757D] font-medium">Filter Kelas:</span>
                <select
                  value={studentClassFilter}
                  onChange={(e) => setStudentClassFilter(e.target.value)}
                  className="text-xs border border-[#E6E6E6] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00B894]"
                >
                  <option value="ALL">Semua Kelas</option>
                  {allClasses.filter(c => c !== 'ALL').map(c => (
                    <option key={c} value={c}>Kelas {c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl border border-[#E6E6E6] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F9FA] text-[#44474E] font-semibold border-b border-[#E6E6E6]">
                    <tr>
                      <th className="p-3.5">NISN / NIS</th>
                      <th className="p-3.5">Nama Lengkap Siswa</th>
                      <th className="p-3.5">JK</th>
                      <th className="p-3.5">Kelas / Rombel</th>
                      <th className="p-3.5">Wali Kelas</th>
                      <th className="p-3.5">T.P.</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E6E6]">
                    {filteredMasterStudents.map(student => (
                      <tr key={student.student_id} className="hover:bg-[#F8F9FA]">
                        <td className="p-3.5">
                          <div className="font-mono font-bold text-[#031534]">{student.nisn}</div>
                          <div className="font-mono text-[11px] text-[#6C757D]">{student.nis}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-sm text-[#031534]">{student.nama}</div>
                          <div className="text-[10px] text-[#6C757D] font-mono">{student.source_id}</div>
                        </td>
                        <td className="p-3.5 text-[#44474E]">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${student.gender === 'L' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
                            {student.gender}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-[#031534] bg-[#031534]/5 px-2 py-0.5 rounded">
                            {student.kelas}
                          </span>
                          <span className="text-[11px] text-[#6C757D] ml-1.5">{student.rombel}</span>
                        </td>
                        <td className="p-3.5 text-[#44474E]">
                          {student.wali_kelas || '-'}
                        </td>
                        <td className="p-3.5 font-mono text-[#6C757D]">
                          {student.academic_year}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Add Student */}
            {isAddStudentOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E6E6E6] shadow-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E6E6E6] pb-3">
                    <h3 className="font-bold text-[#031534] text-base">
                      Tambah Siswa Baru ke Master Data
                    </h3>
                    <button onClick={() => setIsAddStudentOpen(false)}>
                      <X className="w-5 h-5 text-[#6C757D]" />
                    </button>
                  </div>

                  <form onSubmit={handleAddNewStudent} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-[#031534] block mb-1">Nama Lengkap Siswa *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Contoh: Muhammad Farhan"
                        value={newStudentData.nama}
                        onChange={(e) => setNewStudentData({ ...newStudentData, nama: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-[#031534] block mb-1">NISN (10 Digit) *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="0098451299"
                          value={newStudentData.nisn}
                          onChange={(e) => setNewStudentData({ ...newStudentData, nisn: e.target.value })}
                          className="w-full p-2 border rounded-lg font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-[#031534] block mb-1">NIS Sekolah</label>
                        <input 
                          type="text" 
                          placeholder="232407099"
                          value={newStudentData.nis}
                          onChange={(e) => setNewStudentData({ ...newStudentData, nis: e.target.value })}
                          className="w-full p-2 border rounded-lg font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="font-bold text-[#031534] block mb-1">Kelas</label>
                        <input 
                          type="text" 
                          value={newStudentData.kelas}
                          onChange={(e) => setNewStudentData({ ...newStudentData, kelas: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-[#031534] block mb-1">Rombel</label>
                        <input 
                          type="text" 
                          value={newStudentData.rombel}
                          onChange={(e) => setNewStudentData({ ...newStudentData, rombel: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-[#031534] block mb-1">Jenis Kelamin</label>
                        <select 
                          value={newStudentData.gender}
                          onChange={(e) => setNewStudentData({ ...newStudentData, gender: e.target.value as any })}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-[#E6E6E6]">
                      <button 
                        type="button"
                        onClick={() => setIsAddStudentOpen(false)}
                        className="px-4 py-2 rounded-lg text-xs font-medium text-[#6C757D]"
                      >
                        Batal
                      </button>
                      <button 
                        type="submit"
                        className="px-5 py-2 bg-[#031534] text-white font-bold text-xs rounded-lg hover:bg-[#1a2a4a]"
                      >
                        Simpan Siswa
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: DATA TERSTRUKTUR & EKSPOR                          */}
        {/* ========================================================= */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            
            {/* Header Export */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-[#031534]">
                  Pusat Laporan & Ekspor Data Terstruktur
                </h3>
                <p className="text-xs text-[#6C757D] mt-0.5">
                  Unduh hasil verifikasi dokumen ke format resmi Microsoft Excel (.xlsx) dan PDF ber-Kop Surat
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => exportToExcel(activeDocument, activeDocument.records, school)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Ekspor ke Excel (.xlsx)
                </button>

                <button
                  onClick={() => handleOpenPdfPreview(activeDocument)}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Pratinjau PDF Ber-Kop Surat
                </button>
              </div>
            </div>

            {/* Filter by Document */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E6E6] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#6C757D] font-medium">Pilih Dokumen Sumber:</span>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="text-xs border border-[#E6E6E6] rounded-lg px-3 py-1.5 font-bold text-[#031534]"
                >
                  {documents.map(d => (
                    <option key={d.document_id} value={d.document_id}>
                      {d.title} ({d.records.filter(r => r.isVerified).length} data terverifikasi)
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                ✓ Siap Dicetak & Ditandatangani
              </span>
            </div>

            {/* Verified Data Preview Table */}
            <div className="bg-white rounded-2xl border border-[#E6E6E6] shadow-xs overflow-hidden">
              <div className="p-4 bg-[#F8F9FA] border-b border-[#E6E6E6] flex items-center justify-between text-xs">
                <span className="font-bold text-[#031534]">
                  Pratinjau Lembar Rekapitulasi: {activeDocument?.title}
                </span>
                <span className="text-[#6C757D]">
                  Format Kop Surat: {school.name} • {school.academicYear}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#031534] text-white font-semibold">
                    <tr>
                      <th className="p-3">No</th>
                      <th className="p-3">NISN</th>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Keterangan</th>
                      <th className="p-3">Diverifikasi Oleh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E6E6]">
                    {activeDocument?.records
                      .filter(r => r.isVerified && !r.isRejected)
                      .map((rec, idx) => (
                        <tr key={rec.id} className="hover:bg-[#F8F9FA]">
                          <td className="p-3 font-mono font-bold text-[#031534]">{idx + 1}</td>
                          <td className="p-3 font-mono text-[#44474E]">{rec.matchedStudent?.nisn || '-'}</td>
                          <td className="p-3 font-bold text-[#031534]">
                            {rec.editedFields?.nama || rec.matchedStudent?.nama || rec.rawName}
                          </td>
                          <td className="p-3 font-semibold text-[#031534]">
                            {rec.editedFields?.kelas || rec.matchedStudent?.kelas || rec.rawClass}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                              {rec.editedFields?.status || rec.rawStatus}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[#6C757D]">{rec.rawDate}</td>
                          <td className="p-3 text-[#44474E]">{rec.editedFields?.catatan || rec.rawNotes || '-'}</td>
                          <td className="p-3 text-emerald-700 font-semibold">{rec.verifiedBy || school.operatorName}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: AUDIT TRAIL & LOG                                  */}
        {/* ========================================================= */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs">
              <h3 className="font-bold text-lg text-[#031534]">
                Audit Trail & Log Aktivitas Sistem
              </h3>
              <p className="text-xs text-[#6C757D] mt-0.5">
                Riwayat kronologis mutasi data, pemrosesan OCR, pencocokan fuzzy, dan verifikasi operator sesuai standar keamanan
              </p>
            </div>

            {/* Audit Logs List */}
            <div className="bg-white rounded-2xl border border-[#E6E6E6] shadow-xs overflow-hidden">
              <div className="divide-y divide-[#E6E6E6]">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-[#F8F9FA] transition-colors flex items-start gap-4 text-xs">
                    
                    <div className="w-8 h-8 rounded-lg bg-[#031534]/5 text-[#031534] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#031534]">{log.action}</span>
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-[#44474E] rounded">
                            {log.type.toUpperCase()}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#6C757D]">{log.timestamp}</span>
                      </div>

                      {log.targetDocument && (
                        <div className="text-[11px] text-[#006b55] font-medium">
                          Dokumen: {log.targetDocument}
                        </div>
                      )}

                      {log.afterValue && (
                        <div className="text-[11px] text-[#44474E] font-mono bg-[#F8F9FA] p-2 rounded border border-[#E6E6E6] mt-1">
                          Detail: {log.afterValue}
                        </div>
                      )}

                      <div className="text-[10px] text-[#6C757D]">
                        Pelaksana: <strong className="text-[#031534]">{log.operator}</strong>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: PROFIL SEKOLAH & PENGATURAN                       */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs">
              <h3 className="font-bold text-lg text-[#031534]">
                Konfigurasi Profil Sekolah & Kop Surat Resmi
              </h3>
              <p className="text-xs text-[#6C757D] mt-0.5">
                Pengaturan ini akan diterapkan pada kop surat ekspor PDF, tanda tangan Kepala Sekolah, dan lembar laporan resmi
              </p>
            </div>

            {/* Kop Surat Official Preview Box */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-[#E6E6E6] pb-2">
                <span className="font-bold text-[#031534] uppercase tracking-wider">Pratinjau Kop Surat Resmi (PDF &amp; Laporan Ekspor)</span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">✓ Format Sesuai Sampel</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-xs text-center space-y-1 my-2 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-6">
                  <SchoolLogo logoUrl={school.logoUrl} size="lg" />
                  <div className="text-center space-y-0.5">
                    <h2 className="text-xl sm:text-2xl font-black text-[#031534] tracking-tight uppercase">
                      {school.name}
                    </h2>
                    <p className="text-xs text-[#44474E] font-medium">
                      {school.address}
                    </p>
                    <p className="text-xs text-[#44474E] font-medium">
                      Telp. {school.phone || '021.4891456'} Fax. {school.fax || '47881356'}
                    </p>
                    <p className="text-xs text-[#44474E] font-medium">
                      Email: <span className="text-blue-600 underline">{school.email || 'smpn99dki@yahoo.co.id'}</span> | Website: <span className="text-blue-600 underline">{school.website || 'https://smpn99jkt.sch.id'}</span>
                    </p>
                  </div>
                </div>
                <div className="border-b-2 border-[#031534] pt-2"></div>
                <div className="border-b border-[#031534] mt-[2px]"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Form: School Metadata */}
              <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs space-y-4 text-xs">
                <h4 className="font-bold text-sm text-[#031534] border-b border-[#E6E6E6] pb-2">
                  Identitas Satuan Pendidikan
                </h4>

                <div>
                  <label className="font-bold text-[#031534] block mb-1">Nama Satuan Pendidikan:</label>
                  <input 
                    type="text"
                    value={school.name}
                    onChange={(e) => setSchool({ ...school, name: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#031534] block mb-1">NPSN:</label>
                    <input 
                      type="text"
                      value={school.npsn}
                      onChange={(e) => setSchool({ ...school, npsn: e.target.value })}
                      className="w-full p-2 border rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#031534] block mb-1">Akreditasi:</label>
                    <input 
                      type="text"
                      value={school.accreditation}
                      onChange={(e) => setSchool({ ...school, accreditation: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#031534] block mb-1">Alamat Lengkap:</label>
                  <input 
                    type="text"
                    value={school.address}
                    onChange={(e) => setSchool({ ...school, address: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#031534] block mb-1">Kota / Kabupaten:</label>
                    <input 
                      type="text"
                      value={school.city}
                      onChange={(e) => setSchool({ ...school, city: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#031534] block mb-1">Provinsi:</label>
                    <input 
                      type="text"
                      value={school.province}
                      onChange={(e) => setSchool({ ...school, province: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Right Form: Headmaster & Operator */}
              <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs space-y-4 text-xs">
                <h4 className="font-bold text-sm text-[#031534] border-b border-[#E6E6E6] pb-2">
                  Penandatangan & Pejabat Sekolah
                </h4>

                <div>
                  <label className="font-bold text-[#031534] block mb-1">Nama Kepala Sekolah:</label>
                  <input 
                    type="text"
                    value={school.headmasterName}
                    onChange={(e) => setSchool({ ...school, headmasterName: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#031534] block mb-1">NIP Kepala Sekolah:</label>
                  <input 
                    type="text"
                    value={school.headmasterNip}
                    onChange={(e) => setSchool({ ...school, headmasterNip: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#031534] block mb-1">Petugas Operator SMS:</label>
                  <input 
                    type="text"
                    value={school.operatorName}
                    onChange={(e) => setSchool({ ...school, operatorName: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#031534] block mb-1">Tahun Pelajaran:</label>
                    <input 
                      type="text"
                      value={school.academicYear}
                      onChange={(e) => setSchool({ ...school, academicYear: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#031534] block mb-1">Semester:</label>
                    <input 
                      type="text"
                      value={school.semester}
                      onChange={(e) => setSchool({ ...school, semester: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
                      alert('Pengaturan profil sekolah berhasil disimpan.');
                    }}
                    className="w-full py-2.5 bg-[#031534] text-white font-bold text-xs rounded-xl hover:bg-[#1a2a4a] transition-all shadow-xs"
                  >
                    Simpan Perubahan Profil
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Manual Match Modal */}
      {manualMatchRecord && (
        <ManualMatchModal
          isOpen={true}
          onClose={() => setManualMatchRecord(null)}
          record={manualMatchRecord}
          masterStudents={masterStudents}
          onSelectStudent={handleSelectCandidateStudent}
        />
      )}

      {/* PDF POP-UP PREVIEW MODAL */}
      <PdfPreviewModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        document={pdfTargetDocument || activeDocument}
        records={pdfTargetDocument ? pdfTargetDocument.records : activeDocument.records}
        school={school}
      />

    </div>
  );
};
