import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  FileSpreadsheet, 
  FileText, 
  UploadCloud, 
  Database, 
  ShieldCheck, 
  ChevronDown, 
  Clock, 
  Layers, 
  ScanLine, 
  Check, 
  Cpu, 
  School,
  Building2,
  Users,
  Search,
  Zap,
  RotateCcw,
  Star,
  Award,
  ChevronRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { SchoolProfile, Student } from '../types';
import { PRESET_SAMPLE_DOCS } from '../data/mockData';
import { BanyubiruLogo } from './BanyubiruLogo';

interface LandingPageProps {
  onOpenWorkspace: (tab?: string) => void;
  onOpenDemo: () => void;
  school: SchoolProfile;
  masterStudents: Student[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenWorkspace,
  onOpenDemo,
  school,
  masterStudents
}) => {
  // Interactive Simulator State
  const [activeSimulatorDoc, setActiveSimulatorDoc] = useState<number>(0);
  const [simStep, setSimStep] = useState<'idle' | 'scanning' | 'matched' | 'verified'>('matched');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const sampleDoc = PRESET_SAMPLE_DOCS[activeSimulatorDoc];

  const handleSimulateScan = (docIndex: number) => {
    setActiveSimulatorDoc(docIndex);
    setSimStep('scanning');
    setTimeout(() => {
      setSimStep('matched');
    }, 900);
  };

  const faqList = [
    {
      q: 'Bagaimana cara SMS Banyubiru terhubung dengan Web Service Dapodik?',
      a: 'SMS Banyubiru memanfaatkan konektor REST API bawaan dari aplikasi Dapodik sekolah (port 5774). Anda cukup mengisikan Host IP, NPSN Sekolah, dan Web Service Key yang tertera di menu Pengaturan Aplikasi Dapodik Anda.'
    },
    {
      q: 'Apakah dokumen fisik yang buram atau difoto miring tetap bisa dibaca?',
      a: 'Ya. Engine AI OCR kami dilengkapi dengan auto-perspective correction, noise reduction, dan binarization sehingga tulisan tangan atau cetakan pada fisik absensi tetap dapat diekstrak dengan akurasi hingga 99.4%.'
    },
    {
      q: 'Bagaimana jika nama siswa di lembar fisik tidak sama persis dengan Dapodik?',
      a: 'Algoritma Fuzzy Match kami akan menghitung kemiripan string nama, NISN, dan kelas. Hasilnya dikategorikan dalam High, Medium, dan Low Confidence. Operator dapat memverifikasi atau melakukan pencocokan manual dalam 1-klik.'
    },
    {
      q: 'Format ekspor laporan apa saja yang didukung?',
      a: 'Data terverifikasi dapat langsung diekspor ke format Excel (.xlsx) resmi laporan bulanan sekolah serta dokumen Laporan PDF yang siap dicetak dan ditandatangani Kepala Sekolah.'
    },
    {
      q: 'Apakah data sekolah dan siswa aman di SMS Banyubiru?',
      a: 'Keamanan adalah prioritas utama kami. Aplikasi berjalan di lingkungan jaringan lokal sekolah Anda, sepenuhnya mematuhi standar SAIF (Secure AI Framework) dan regulasi privasi data pendidikan.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-body selection:bg-[#00B894]/20 selection:text-[#031534]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-white border-b border-[#E6E6E6]">
        {/* Subtle Architectural Grid Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none architectural-grid"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Hero Left Text & Controls */}
            <div className="lg:w-7/12 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B894]/10 text-[#006b55] text-xs font-bold border border-[#00B894]/25 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#00B894]" />
                Platform Otomasi Administrasi Sekolah & Web Service Dapodik
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#031534] tracking-tight font-display leading-[1.12]">
                Otomatisasi Administrasi Sekolah & <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#006b55] via-[#00B894] to-[#0284c7] bg-clip-text text-transparent">
                  Rekonsiliasi Dapodik Presisi
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#44474E] max-w-2xl leading-relaxed">
                Transformasi berkas fisik absensi harian, surat izin/sakit, dan catatan disiplin siswa menjadi data terverifikasi secara instan menggunakan <strong>AI OCR Engine</strong> &amp; <strong>Dapodik Fuzzy Matcher</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button 
                  onClick={() => onOpenWorkspace('dashboard')}
                  className="bg-[#FFD000] hover:bg-[#e6bb00] text-[#031534] font-extrabold text-sm px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 group"
                >
                  <span>Masuk ke Workspace Operasional</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={onOpenDemo}
                  className="bg-white text-[#031534] border-2 border-[#031534] rounded-xl font-bold text-sm px-6 py-4 hover:bg-[#F8F9FA] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current text-[#006b55]" />
                  <span>Lihat Demo Video</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E6E6E6] flex flex-wrap items-center gap-6 text-xs text-[#6C757D]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00B894]" />
                  <span>Langsung Sinkron Web Service Dapodik</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00B894]" />
                  <span>Ekspor Excel &amp; PDF 1-Klik</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00B894]" />
                  <span>Standar Keamanan SAIF</span>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Diagram & Graphic */}
            <div className="lg:w-5/12 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/20 via-[#00B894]/20 to-[#031534]/10 blur-3xl rounded-3xl -z-10"></div>
              
              <div className="bg-white p-6 shadow-2xl border border-[#E6E6E6] relative rounded-2xl space-y-5">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-[#E6E6E6] pb-3">
                  <div className="flex items-center gap-2.5">
                    <BanyubiruLogo logoUrl={school.logoUrl} banyubiruLogoUrl={school.banyubiruLogoUrl} size="sm" />
                    <div>
                      <span className="font-bold text-xs text-[#031534] block">SMS Banyubiru Engine</span>
                      <span className="text-[10px] text-[#6C757D]">OCR AI + Dapodik Matcher</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Aktif
                  </span>
                </div>

                {/* Workflow Architecture Visual Diagram */}
                <div className="space-y-3 bg-[#F8F9FA] p-4 rounded-xl border border-[#CBD5E1]">
                  
                  {/* Step A: Document Input */}
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#E6E6E6] shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-[#031534]/10 flex items-center justify-center text-[#031534]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#031534]">Lembar Absensi Fisik (Foto/Scan)</div>
                        <div className="text-[10px] text-[#6C757D]">Dokumen Absensi Kelas VIII-B</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#006b55] font-bold">100% Read</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center my-1 text-[#00B894]">
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </div>

                  {/* Step B: OCR + Dapodik Matching */}
                  <div className="flex items-center justify-between bg-[#031534] text-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-[#00B894] flex items-center justify-center text-[#031534]">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">AI OCR &amp; Dapodik Matcher</div>
                        <div className="text-[10px] text-emerald-300">Port 5774 • Token Verified</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-[#00B894]/20 text-[#00B894] px-2 py-0.5 rounded font-mono font-bold">Matched</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center my-1 text-[#00B894]">
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </div>

                  {/* Step C: Master Data Ready */}
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-emerald-300 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#031534]">Master Data Terverifikasi</div>
                        <div className="text-[10px] text-[#6C757D]">Siap Diunduh ke Excel / PDF</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
                  </div>

                </div>

                {/* Floating Metric Pill */}
                <div className="flex items-center justify-between text-xs pt-1 text-[#6C757D]">
                  <span>Akurasi Pencocokan NISN: <strong className="text-[#031534]">99.4%</strong></span>
                  <span className="text-emerald-700 font-bold">{masterStudents.length} Siswa Dapodik</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. KEY STATS BANNER */}
      <section className="bg-[#031534] text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00E5FF] font-display">99.4%</div>
              <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Akurasi Ekstraksi OCR</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FFD000] font-display">&lt; 30 Detik</div>
              <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Proses per Dokumen</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#00B894] font-display">{masterStudents.length}+</div>
              <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Siswa Terintegrasi Dapodik</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-display">5.5 Jam</div>
              <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Waktu Dihemat / Minggu</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURE GRID SECTION */}
      <section id="fitur" className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#006b55]">
              SOLUSI ADMINISTRASI MODERN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031534] tracking-tight font-display">
              Fitur Unggulan SMS Banyubiru
            </h2>
            <p className="text-sm sm:text-base text-[#6C757D]">
              Dirancang khusus untuk membantu Sekolah Menengah Pertama (SMP) dalam mempercepat pengolahan berkas fisik tanpa risiko duplikasi data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#031534] text-[#00B894] flex items-center justify-center">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#031534]">
                1. AI OCR Engine Pilihan
              </h3>
              <p className="text-xs text-[#6C757D] leading-relaxed">
                Membaca formulir fisik, lembar absensi harian, dan surat izin tulisan tangan dengan konversi teks digital otomatis.
              </p>
              <div className="pt-2 border-t border-[#E6E6E6] text-[11px] font-bold text-[#006b55]">
                ✓ Auto-rotate &amp; noise correction
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#031534] text-[#00E5FF] flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#031534]">
                2. Dapodik Fuzzy Matcher
              </h3>
              <p className="text-xs text-[#6C757D] leading-relaxed">
                Menghubungkan teks hasil OCR secara otomatis dengan database resmi Dapodik untuk verifikasi NISN &amp; nama siswa.
              </p>
              <div className="pt-2 border-t border-[#E6E6E6] text-[11px] font-bold text-[#006b55]">
                ✓ Toleransi ejaan &amp; pengetikan
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#031534] text-[#FFD000] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#031534]">
                3. Verification Workspace
              </h3>
              <p className="text-xs text-[#6C757D] leading-relaxed">
                Panel peninjauan layar ganda (*Dual Screen*) untuk operator memverifikasi atau mengoreksi data dalam hitungan detik.
              </p>
              <div className="pt-2 border-t border-[#E6E6E6] text-[11px] font-bold text-[#006b55]">
                ✓ Human-in-the-loop review
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#031534] text-[#00B894] flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#031534]">
                4. Ekspor Excel &amp; Laporan PDF
              </h3>
              <p className="text-xs text-[#6C757D] leading-relaxed">
                Menghasilkan berkas rekapitulasi Excel siap cetak dan laporan resmi ber-kop sekolah yang siap ditandatangani.
              </p>
              <div className="pt-2 border-t border-[#E6E6E6] text-[11px] font-bold text-[#006b55]">
                ✓ Format resmi Permendikbud
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE SIMULATOR SECTION */}
      <section id="simulator" className="py-20 bg-white border-y border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#006b55]">
              DEMO INTERAKTIF
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031534] tracking-tight font-display">
              Uji Coba Alur Kerja Ekstraksi
            </h2>
            <p className="text-sm text-[#6C757D]">
              Pilih sampel dokumen administrasi di bawah ini untuk melihat bagaimana AI OCR dan Dapodik Matcher bekerja secara otomatis.
            </p>
          </div>

          {/* Sample Document Selector */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PRESET_SAMPLE_DOCS.map((doc, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateScan(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeSimulatorDoc === idx
                    ? 'bg-[#031534] text-white border-[#031534] shadow-md'
                    : 'bg-[#F8F9FA] text-[#44474E] border-[#E6E6E6] hover:bg-white'
                }`}
              >
                <FileText className="w-4 h-4 text-[#00B894]" />
                <span>{doc.title}</span>
              </button>
            ))}
          </div>

          {/* Simulator Visual Box */}
          <div className="bg-[#F8F9FA] rounded-2xl border border-[#CBD5E1] p-6 shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Left Document Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#031534]">
                  <span>Fisik Berkas Masukan</span>
                  <span className="text-[#006b55] bg-emerald-100 px-2 py-0.5 rounded text-[10px]">{sampleDoc.type}</span>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-[#CBD5E1] h-56 bg-slate-900 flex items-center justify-center">
                  <img 
                    src={sampleDoc.image} 
                    alt={sampleDoc.title}
                    className="w-full h-full object-cover opacity-80" 
                  />
                  {simStep === 'scanning' && (
                    <div className="absolute inset-0 bg-[#00B894]/20 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="w-full h-1 bg-[#00E5FF] shadow-lg animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Extraction Result */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#031534]">
                  <span>Hasil Ekstraksi &amp; Matching Dapodik</span>
                  <span className="text-emerald-700 font-mono text-[10px] font-bold">Conf: 98%</span>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-[#E6E6E6] space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#E6E6E6] pb-2">
                    <span className="text-[#6C757D]">Nama Terbaca:</span>
                    <strong className="text-[#031534]">Ahmad Fauzan</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#E6E6E6] pb-2">
                    <span className="text-[#6C757D]">NISN Dapodik:</span>
                    <strong className="font-mono text-[#006b55]">0098451201</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#E6E6E6] pb-2">
                    <span className="text-[#6C757D]">Kelas / Rombel:</span>
                    <strong className="text-[#031534]">VIII-B (Kelas 8B)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Status Dokumen:</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      ✓ Valid &amp; Sinkron Dapodik
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenWorkspace('verification')}
                  className="w-full py-3 bg-[#006b55] hover:bg-[#005241] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Buka di Ruang Verifikasi Operator</span>
                  <ArrowRight className="w-4 h-4 text-[#00B894]" />
                </button>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#006b55]">
              ULASAN PENGGUNA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031534] tracking-tight font-display">
              Dipercaya Oleh Tim Sekolah
            </h2>
            <p className="text-sm text-[#6C757D]">
              Pengalaman nyata dari Kepala Sekolah dan Operator Dapodik dalam mengolah berkas harian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#44474E] italic leading-relaxed">
                "Sebelum ada SMS Banyubiru, tim kami menghabiskan waktu berjam-jam memasukkan absensi 24 kelas secara manual. Sekarang berkas difoto, otomatis cocok dengan Dapodik, dan laporan rekap selesai dalam hitungan menit."
              </p>
              <div className="pt-2 border-t border-[#E6E6E6] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#031534] text-white font-bold flex items-center justify-center text-xs">
                  BS
                </div>
                <div>
                  <div className="text-xs font-bold text-[#031534]">{school.headmasterName}</div>
                  <div className="text-[10px] text-[#6C757D]">Kepala {school.name}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#44474E] italic leading-relaxed">
                "Koneksi langsung ke Web Service Dapodik sangat membantu. Tidak ada lagi kesalahan pengetikan NISN atau duplikasi data siswa saat rekapitulasi semester."
              </p>
              <div className="pt-2 border-t border-[#E6E6E6] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006b55] text-white font-bold flex items-center justify-center text-xs">
                  AY
                </div>
                <div>
                  <div className="text-xs font-bold text-[#031534]">{school.operatorName}</div>
                  <div className="text-[10px] text-[#6C757D]">Operator Dapodik Sekolah</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E6E6] shadow-xs space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#44474E] italic leading-relaxed">
                "Ekspor laporan Excel dan PDF 1-klik memudahkan koordinasi dengan wali kelas dan dinas pendidikan. Sangat praktis dan efisien!"
              </p>
              <div className="pt-2 border-t border-[#E6E6E6] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00B894] text-[#031534] font-bold flex items-center justify-center text-xs">
                  NH
                </div>
                <div>
                  <div className="text-xs font-bold text-[#031534]">Dra. Hj. Nurhayati, M.Pd.</div>
                  <div className="text-[10px] text-[#6C757D]">Wali Kelas VIII-B</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 bg-white border-t border-[#E6E6E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#006b55]">
              TANYA JAWAB (FAQ)
            </span>
            <h2 className="text-3xl font-extrabold text-[#031534] tracking-tight font-display">
              Pertanyaan Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-[#E6E6E6] rounded-xl overflow-hidden bg-[#F8F9FA] transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-sm text-[#031534] flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#006b55] transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-4 text-xs text-[#44474E] leading-relaxed border-t border-[#E6E6E6]/60 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="py-16 bg-[#031534] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none architectural-grid"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00E5FF]">
            SIAP MEMULAI TRANSFORMASI DIGITAL?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display leading-snug">
            Otomatiskan Administrasi Berkas Sekolah Anda Hari Ini
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Hubungkan berkas fisik dengan Web Service Dapodik secara instan tanpa mengetik ulang.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenWorkspace('dashboard')}
              className="bg-[#FFD000] hover:bg-[#e6bb00] text-[#031534] font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>Masuk ke Workspace Operasional</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenDemo}
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-4 rounded-xl transition-all"
            >
              Lihat Demo Interaktif
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#020b1a] text-white px-6 sm:px-12 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BanyubiruLogo logoUrl={school.logoUrl} banyubiruLogoUrl={school.banyubiruLogoUrl} size="md" />
              <div>
                <span className="font-bold text-lg text-white block">SMS Banyubiru</span>
                <span className="text-[10px] text-slate-400">Banyubiru Digital Services</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sistem Manajemen Sekolah modern untuk administrasi yang lebih efisien, terstruktur, dan terintegrasi Dapodik.
            </p>
            <p className="text-[11px] text-slate-400">
              © 2026 SMS by Banyubiru Digital Services. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">Produk</span>
            <a href="#fitur" className="text-xs text-slate-300 hover:text-white transition-colors">Fitur Utama</a>
            <a href="#simulator" className="text-xs text-slate-300 hover:text-white transition-colors">Demo Interaktif</a>
            <a href="#faq" className="text-xs text-slate-300 hover:text-white transition-colors">Tanya Jawab (FAQ)</a>
          </div>

          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">Integrasi</span>
            <span className="text-xs text-slate-300">Web Service Dapodik (Port 5774)</span>
            <span className="text-xs text-slate-300">Ekspor Format Excel (.xlsx)</span>
            <span className="text-xs text-slate-300">Laporan Resmi PDF</span>
          </div>

          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">Sekolah Aktif</span>
            <span className="text-xs font-bold text-white">{school.name}</span>
            <span className="text-xs text-slate-300">NPSN: {school.npsn}</span>
            <span className="text-xs text-slate-300">{school.city}, {school.province}</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
