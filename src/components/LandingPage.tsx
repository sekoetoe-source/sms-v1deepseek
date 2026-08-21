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
import { SchoolProfile, Student, VerificationQueueItem } from '../types';
import { PRESET_SAMPLE_DOCS } from '../data/mockData';
import { BanyubiruLogo } from './BanyubiruLogo';
import { DashboardPreview } from './DashboardPreview';
import { ProblemSection } from './ProblemSection';
import { WorkflowSection } from './WorkflowSection';
import { HumanInTheLoopSection } from './HumanInTheLoopSection';
import { BentoFeaturesSection } from './BentoFeaturesSection';
import { CtaSection } from './CtaSection';
import { LiveSimulatorModal } from './LiveSimulatorModal';

interface LandingPageProps {
  onOpenWorkspace: (tab?: string, mode?: 'real' | 'dummy') => void;
  onOpenDemo: () => void;
  onOpenLogin: () => void;
  school: SchoolProfile;
  masterStudents: Student[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenWorkspace,
  onOpenDemo,
  onOpenLogin,
  school,
  masterStudents
}) => {
  // Interactive Simulator State
  const [activeSimulatorDoc, setActiveSimulatorDoc] = useState<number>(0);
  const [simStep, setSimStep] = useState<'idle' | 'scanning' | 'matched' | 'verified'>('matched');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState(false);
  const [selectedQueueItem, setSelectedQueueItem] = useState<VerificationQueueItem | null>(null);

  const handleOpenDemoModal = (item?: VerificationQueueItem) => {
    setSelectedQueueItem(item || null);
    setIsSimulatorModalOpen(true);
    onOpenDemo();
  };

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
      
      {/* 1. HERO SECTION (EcoGrant Style) */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-white border-b border-[#E6E6E6]">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none architectural-grid"></div>
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#134e4a]/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          {/* Top Green Pill Badge (EcoGrant Style) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-[#134e4a] text-xs font-bold border border-emerald-300 shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#00B894]" />
            <span>Platform Otomasi Administrasi Sekolah &amp; Dapodik Berbasis AI #1</span>
          </div>

          {/* Main Headline (EcoGrant Style: Large, Bold, High-Impact) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#0b1c30] tracking-tight font-display leading-[1.15] max-w-4xl mx-auto">
            Tulis Rekapitulasi &amp; Verifikasi Berkas Sekolah Berstandar Dapodik dalam{' '}
            <span className="text-[#006b55]">Hitungan Menit</span>, Bukan Hari.
          </h1>

          {/* Subheadline (EcoGrant Style) */}
          <p className="text-sm sm:text-base text-[#44474E] max-w-2xl mx-auto leading-relaxed">
            Hasilkan rekapitulasi presensi harian, verifikasi berkas fisik (Ijazah, KK, Akta), dan sinkronisasi Web Service Dapodik resmi secara otomatis menggunakan <strong>AI OCR Engine</strong> &amp; <strong>Dapodik Fuzzy Matcher</strong>.
          </p>

          {/* Centered Dual CTA Buttons (EcoGrant Style) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            
            {/* Primary CTA: Coba Gratis Sekarang -> Dummy Simulation */}
            <button 
              onClick={() => onOpenWorkspace('dashboard', 'dummy')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold bg-[#134e4a] hover:bg-[#0f766e] text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
            >
              <span>Coba Gratis Sekarang</span>
              <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA: Demo Interaktif */}
            <button 
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#0b1c30] border-2 border-slate-300 hover:border-slate-800 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-current text-[#134e4a]" />
              <span>Coba Demo Interaktif</span>
            </button>
          </div>

          {/* Operator Direct Link */}
          <div className="pt-2 text-xs text-slate-500">
            Sudah memiliki akun operator sekolah?{' '}
            <button 
              onClick={onOpenLogin}
              className="text-[#134e4a] font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Masuk ke Workspace Data Real</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Trust Indicators Banner */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#6C757D]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Web Service Dapodik (Port 5774)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ekspor Excel &amp; PDF 1-Klik</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standar Keamanan SAIF</span>
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

      {/* 2. DASHBOARD PREVIEW MOCKUP */}
      <div className="py-12 bg-[#F8F9FA]">
        <DashboardPreview onOpenVerification={handleOpenDemoModal} />
      </div>

      {/* 3. PROBLEM STATEMENT SECTION */}
      <ProblemSection />

      {/* 4. WORKFLOW SECTION */}
      <WorkflowSection />

      {/* 5. HUMAN-IN-THE-LOOP SECTION */}
      <HumanInTheLoopSection onOpenWorkspace={onOpenWorkspace} />

      {/* 6. BENTO FEATURES GRID */}
      <BentoFeaturesSection />

      {/* 7. FEATURE GRID SECTION */}
      <section id="fitur" className="py-12 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#006b55]">
              SOLUSI ADMINISTRASI MODERN
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#031534] tracking-tight font-display">
              Fitur Unggulan SMS Banyubiru
            </h2>
            <p className="text-xs sm:text-sm text-[#6C757D]">
              Dirancang khusus untuk membantu Sekolah Menengah Pertama (SMP) dalam mempercepat pengolahan berkas fisik tanpa risiko duplikasi data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            
            {/* Feature 1 */}
            <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#031534] text-[#00B894] flex items-center justify-center mb-3 shadow-2xs">
                  <ScanLine className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#031534] mb-1.5">
                  1. AI OCR Engine Pilihan
                </h3>
                <p className="text-xs text-[#6C757D] leading-relaxed">
                  Membaca formulir fisik, lembar absensi harian, dan surat izin tulisan tangan dengan konversi teks digital otomatis.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#E6E6E6] text-[11px] font-bold text-[#006b55]">
                ✓ Auto-rotate &amp; noise correction
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#031534] text-[#00E5FF] flex items-center justify-center mb-3 shadow-2xs">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#031534] mb-1.5">
                  2. Dapodik Fuzzy Matcher
                </h3>
                <p className="text-xs text-[#6C757D] leading-relaxed">
                  Menghubungkan teks hasil OCR secara otomatis dengan database resmi Dapodik untuk verifikasi NISN &amp; nama siswa.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#E6E6E6] text-[11px] font-bold text-[#006b55]">
                ✓ Toleransi ejaan &amp; pengetikan
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#031534] text-[#FFD000] flex items-center justify-center mb-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#031534] mb-1.5">
                  3. Verification Workspace
                </h3>
                <p className="text-xs text-[#6C757D] leading-relaxed">
                  Panel peninjauan layar ganda (*Dual Screen*) untuk operator memverifikasi atau mengoreksi data dalam hitungan detik.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#E6E6E6] text-[11px] font-bold text-[#006b55]">
                ✓ Human-in-the-loop review
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-5 rounded-xl border border-[#E6E6E6] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#031534] text-[#00B894] flex items-center justify-center mb-3 shadow-2xs">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#031534] mb-1.5">
                  4. Ekspor Excel &amp; Laporan PDF
                </h3>
                <p className="text-xs text-[#6C757D] leading-relaxed">
                  Menghasilkan berkas rekapitulasi Excel siap cetak dan laporan resmi ber-kop sekolah yang siap ditandatangani.
                </p>
              </div>
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

      {/* 8. CALL TO ACTION SECTION */}
      <CtaSection onOpenDemo={() => handleOpenDemoModal()} />

      {/* 9. FOOTER */}
      <footer className="bg-[#020b1a] text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
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

      {/* 10. INTERACTIVE OCR & DAPODIK VERIFICATION SIMULATOR MODAL */}
      <LiveSimulatorModal
        isOpen={isSimulatorModalOpen}
        onClose={() => setIsSimulatorModalOpen(false)}
        initialItem={selectedQueueItem}
      />

    </div>
  );
};
