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
  RotateCcw
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
  // Interactive Hero & Simulator State
  const [activeSimulatorDoc, setActiveSimulatorDoc] = useState<number>(0);
  const [simStep, setSimStep] = useState<'idle' | 'scanning' | 'matched' | 'verified'>('matched');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentPreset = PRESET_SAMPLE_DOCS[activeSimulatorDoc];

  const handleRunSimulator = () => {
    setSimStep('scanning');
    setTimeout(() => {
      setSimStep('matched');
    }, 1200);
  };

  const faqs = [
    {
      q: 'Apa itu SMS Banyubiru?',
      a: 'SMS (Sistem Manajemen Sekolah) adalah platform web cerdas yang mengubah dokumen administrasi fisik, foto, scan formulir, dan catatan harian sekolah menjadi data digital terstruktur melalui teknologi OCR, pencocokan master data siswa (Dapodik), dan verifikasi operator.'
    },
    {
      q: 'Apakah SMS menggantikan sistem Dapodik?',
      a: 'Tidak. SMS bukan pengganti Dapodik, melainkan lapisan operasional (operational layer) yang menghubungkan dokumen harian sekolah dengan database resmi Dapodik melalui import master data yang sah tanpa pengetikan manual.'
    },
    {
      q: 'Bagaimana sistem mencocokkan nama jika ada salah tulis atau typo pada dokumen?',
      a: 'SMS dilengkapi algoritma Student Fuzzy Matching cerdas yang membandingkan nama hasil OCR dengan Master Data Siswa. Sistem memberikan skor keyakinan (confidence score, misalnya 96%) dan menampilkan nama siswa yang tepat beserta kelas dan NISN untuk dikonfirmasi operator.'
    },
    {
      q: 'Format ekspor apa saja yang didukung?',
      a: 'SMS v1.0 secara resmi mendukung Microsoft Excel (.xlsx) untuk pengolahan formula dan rekap lanjutan, serta Dokumen Resmi PDF (.pdf) siap cetak lengkap dengan Kop Surat Sekolah, Nomor Berkas, dan kolom Tanda Tangan Kepala Sekolah.'
    },
    {
      q: 'Apakah SMS aman untuk data pribadi siswa?',
      a: 'Sangat aman. SMS mengadopsi prinsip Privacy-by-Design, least privilege access, dan audit trail lengkap. Data siswa hanya digunakan di lingkup internal sekolah dan tidak dipublikasikan ke publik.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-body selection:bg-[#00B894]/20 selection:text-[#031534]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-white grid-pattern border-b border-[#E6E6E6]">
        
        {/* Subtle architectural gradient glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#00B894]/10 via-[#031534]/5 to-transparent blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Hero Left Copy */}
            <div className="lg:w-7/12 space-y-7 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d8e2ff]/50 border border-[#b7c6ee] text-[#031534] text-xs font-semibold shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#006b55]">school</span>
                <span>Digunakan oleh 10+ sekolah</span>
                <span className="text-[#6C757D]">|</span>
                <span className="text-[#006b55] font-bold">Menghemat 50% waktu input data</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#031534] tracking-tight leading-[1.12] font-display">
                Dari Dokumen Menjadi Data. <br className="hidden sm:inline" />
                Dari Data Menjadi <span className="text-[#00B894] underline decoration-[#00B894]/30 decoration-wavy underline-offset-8">Keputusan.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-[#44474E] max-w-2xl leading-relaxed">
                SMS membantu sekolah mengubah daftar ketidakhadiran, formulir, dan dokumen administrasi lainnya menjadi data terstruktur — <strong>tanpa mengetik ulang</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button 
                  onClick={() => onOpenWorkspace('dashboard')}
                  className="bg-[#F97316] text-white rounded-xl font-semibold text-sm px-7 py-3.5 hover:bg-[#ea580c] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Mulai Uji Coba Gratis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={onOpenDemo}
                  className="bg-white text-[#031534] border border-[#031534] rounded-xl font-semibold text-sm px-6 py-3.5 hover:bg-[#F8F9FA] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current text-[#006b55]" />
                  <span>Lihat Demo Video</span>
                </button>
              </div>

            </div>

            {/* Hero Right Visual Glass Panel */}
            <div className="lg:w-5/12 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6dfad2]/30 via-[#d8e2ff]/40 to-[#00B894]/20 blur-3xl rounded-3xl -z-10"></div>
              
              <div className="glass-panel p-6 shadow-xl border border-white/80 relative rounded-2xl transition-all duration-500 hover:shadow-2xl">
                
                {/* Header widget */}
                <div className="flex justify-between items-center mb-5 border-b border-[#E6E6E6] pb-3">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-8 h-8 rounded-lg bg-[#00B894]/15 flex items-center justify-center text-[#006b55]">
                      <ScanLine className="w-4 h-4 text-[#006b55]" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#031534] block">
                        Ekstraksi Dokumen Otomatis
                      </span>
                      <span className="text-[10px] text-[#6C757D]">
                        Engine OCR + Dapodik Matcher
                      </span>
                    </div>
                  </div>
                  <span className="bg-[#00B894]/15 text-[#006b55] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B894] animate-pulse"></span>
                    Aktif
                  </span>
                </div>

                {/* Simulated Process Items */}
                <div className="space-y-3.5">
                  
                  {/* Step A: Reading */}
                  <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-xl border border-[#E6E6E6] shadow-xs">
                    <div className="w-10 h-10 bg-[#031534]/5 rounded-lg flex items-center justify-center text-[#031534]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#031534] truncate">
                          Absensi_Kelas_8B_20Agustus.jpg
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">100%</span>
                      </div>
                      <div className="w-full bg-[#E6E6E6] h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-[#00B894] h-full rounded-full w-full"></div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#00B894] shrink-0" />
                  </div>

                  {/* Step B: Structured Data Result */}
                  <div className="flex items-center gap-3.5 bg-gradient-to-br from-emerald-50/80 to-white p-3.5 rounded-xl border border-emerald-200 shadow-xs">
                    <div className="w-10 h-10 bg-emerald-600/10 rounded-lg flex items-center justify-center text-emerald-700">
                      <Database className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#031534]">
                        Data Terekstrak & Cocok
                      </div>
                      <div className="text-[11px] text-[#006b55] flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3 text-[#00B894]" />
                        98% Akurasi Pencocokan Siswa
                      </div>
                    </div>
                    <div className="px-2.5 py-1 bg-[#006b55] text-white rounded-md text-[10px] font-extrabold tracking-wider shadow-xs">
                      EXCEL & PDF
                    </div>
                  </div>

                  {/* Sample Extraction snippet */}
                  <div className="bg-[#F8F9FA] p-3 rounded-lg border border-[#E6E6E6] text-[11px] font-mono space-y-1">
                    <div className="flex justify-between text-[#6C757D]">
                      <span>OCR: "Ahmad Fausan"</span>
                      <span className="text-emerald-700 font-bold">Match: Ahmad Fauzan (96%)</span>
                    </div>
                    <div className="flex justify-between text-[#6C757D]">
                      <span>Kelas: VIII-B</span>
                      <span className="text-[#031534] font-semibold">Status: Sakit (Dokter)</span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    onClick={() => onOpenWorkspace('verification')}
                    className="w-full py-2.5 bg-[#031534] hover:bg-[#1a2a4a] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    Buka Panel Verifikasi Dual-Screen
                    <ArrowRight className="w-3.5 h-3.5 text-[#00B894]" />
                  </button>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THREE-PILLAR BENTO GRID ("One Platform. Zero seams.") */}
      <section id="fitur" className="py-20 bg-[#F8F9FA] border-b border-[#E6E6E6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006b55] bg-[#00B894]/10 px-3 py-1 rounded-full border border-[#00B894]/20">
              PLATFORM ARSITEKTUR KELAS INDUSTRI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031534] tracking-tight font-display">
              Satu Platform. <span className="text-[#006b55] italic font-serif">Tanpa Ketik Ulang.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#44474E] leading-relaxed">
              Sebagian besar aplikasi administrasi sekolah memaksa operator memasukkan kembali data yang sama. SMS Banyubiru mengintegrasikan dokumen fisik langsung dengan Master Siswa.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Pillar 1 */}
            <div className="bento-card p-6 sm:p-8 flex flex-col justify-between hover:border-[#00B894] transition-all hover:shadow-md group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#031534] text-[#00B894] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C757D] block mb-1">
                  MODUL 01 • MASTER DATA
                </span>
                <h3 className="text-xl font-bold text-[#031534] mb-3">
                  Data yang Selalu Sinkron & Mutakhir
                </h3>
                <p className="text-sm text-[#44474E] leading-relaxed">
                  Import langsung dari hasil export resmi Dapodik sekolah. NISN dan Identifier internal stabil mencegah duplikasi data siswa di seluruh kelas dan rombel.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E6E6E6] flex items-center justify-between text-xs font-bold text-[#006b55]">
                <span>Kelola 865+ Siswa</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bento-card p-6 sm:p-8 flex flex-col justify-between hover:border-[#00B894] transition-all hover:shadow-md group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#006b55] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C757D] block mb-1">
                  MODUL 02 & 03 • OCR & EXTRACTION
                </span>
                <h3 className="text-xl font-bold text-[#031534] mb-3">
                  Pencocokan Cerdas dengan Koreksi Typo
                </h3>
                <p className="text-sm text-[#44474E] leading-relaxed">
                  Engine AI mengenali tulisan tangan atau cetakan buruk, mengekstrak baris tabel, dan secara otomatis mencari kecocokan nama hingga 98% akurasi.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E6E6E6] flex items-center justify-between text-xs font-bold text-[#006b55]">
                <span>Fuzzy Match Scoring</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bento-card p-6 sm:p-8 flex flex-col justify-between hover:border-[#00B894] transition-all hover:shadow-md group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F97316] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C757D] block mb-1">
                  MODUL 04 & 05 • HUMAN IN THE LOOP
                </span>
                <h3 className="text-xl font-bold text-[#031534] mb-3">
                  Verifikasi Operator & Ekspor Resmi
                </h3>
                <p className="text-sm text-[#44474E] leading-relaxed">
                  Operator memegang kendali penuh melalui antarmuka split-screen. Setelah terverifikasi, data siap diunduh ke Excel (.xlsx) dan PDF dengan Kop Surat resmi.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E6E6E6] flex items-center justify-between text-xs font-bold text-[#006b55]">
                <span>Ekspor Terverifikasi</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE OCR SIMULATOR / PLAYGROUND */}
      <section id="simulator" className="py-20 bg-white border-b border-[#E6E6E6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#006b55] bg-[#00B894]/10 px-3 py-1 rounded-full">
                SIMULATOR INTERAKTIF
              </span>
              <h2 className="text-3xl font-extrabold text-[#031534] tracking-tight mt-2 font-display">
                Uji Coba Alur Ekstraksi Langsung
              </h2>
              <p className="text-sm text-[#44474E] mt-1">
                Pilih salah satu contoh dokumen sekolah nyata di bawah ini untuk melihat bagaimana SMS mencocokkan data:
              </p>
            </div>

            {/* Presets Selector */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {PRESET_SAMPLE_DOCS.map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveSimulatorDoc(idx);
                    handleRunSimulator();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeSimulatorDoc === idx
                      ? 'bg-[#031534] text-white shadow-sm'
                      : 'bg-[#F8F9FA] text-[#44474E] hover:bg-[#E6E6E6]'
                  }`}
                >
                  Contoh 0{idx + 1}: {doc.type}
                </button>
              ))}
            </div>
          </div>

          {/* Simulator Box */}
          <div className="bg-[#F8F9FA] rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Document Raw View */}
            <div className="lg:col-span-5 p-6 bg-[#031534] text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ScanLine className="w-4 h-4" /> Dokumen Masuk
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {currentPreset.filename}
                  </span>
                </div>

                <div className="relative bg-slate-900/80 p-4 rounded-xl border border-slate-700 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {simStep === 'scanning' && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00B894] to-transparent animate-scan-line"></div>
                  )}
                  {currentPreset.rawText}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                <button
                  onClick={handleRunSimulator}
                  disabled={simStep === 'scanning'}
                  className="px-4 py-2 bg-[#00B894] text-[#031534] hover:bg-emerald-400 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${simStep === 'scanning' ? 'animate-spin' : ''}`} />
                  {simStep === 'scanning' ? 'Memindai Teks...' : 'Pindai Ulang Dokumen Ini'}
                </button>
                <span className="text-[11px] text-slate-400">
                  {simStep === 'scanning' ? 'OCR Engine Running' : 'OCR Selesai (0.4s)'}
                </span>
              </div>
            </div>

            {/* Right: Extracted and Matched Table */}
            <div className="lg:col-span-7 p-6 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E6E6E6]">
                  <div>
                    <h4 className="font-bold text-sm text-[#031534]">
                      Hasil Pencocokan Master Siswa (Dapodik)
                    </h4>
                    <p className="text-xs text-[#6C757D]">
                      Pemeriksaan fuzzy matching terhadap 865 data siswa
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Confidence Rata-rata: 96%
                  </span>
                </div>

                {/* Simulated rows */}
                <div className="space-y-2.5">
                  {activeSimulatorDoc === 0 && (
                    <>
                      <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#031534]">Ahmad Fauzan</span>
                            <span className="text-[10px] font-bold bg-[#031534] text-white px-1.5 py-0.5 rounded">VIII-B</span>
                            <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded-full">
                              96% Match (Typo: "Fausan")
                            </span>
                          </div>
                          <div className="text-[11px] text-[#6C757D] mt-0.5">
                            Status: <strong className="text-amber-700">Sakit</strong> • Surat Dokter Terlampir
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Terverifikasi
                        </span>
                      </div>

                      <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#031534]">Siti Nurhaliza</span>
                            <span className="text-[10px] font-bold bg-[#031534] text-white px-1.5 py-0.5 rounded">VIII-B</span>
                            <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded-full">
                              98% Match (Typo: "Nurhalizah")
                            </span>
                          </div>
                          <div className="text-[11px] text-[#6C757D] mt-0.5">
                            Status: <strong className="text-blue-700">Izin</strong> • Pernikahan Kakak
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Terverifikasi
                        </span>
                      </div>

                      <div className="p-3 rounded-xl border border-[#E6E6E6] bg-[#F8F9FA] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#031534]">Kurniawan Dwi Yulianto</span>
                            <span className="text-[10px] font-bold bg-[#031534] text-white px-1.5 py-0.5 rounded">VII-B</span>
                            <span className="text-[10px] text-amber-800 font-semibold bg-amber-100 px-1.5 py-0.5 rounded-full">
                              89% Match (Singkatan "Y.")
                            </span>
                          </div>
                          <div className="text-[11px] text-[#6C757D] mt-0.5">
                            Status: <strong className="text-rose-700">Alpa</strong> • Tanpa Keterangan
                          </div>
                        </div>
                        <span className="text-xs font-bold text-amber-700">
                          Perlu Review
                        </span>
                      </div>
                    </>
                  )}

                  {activeSimulatorDoc === 1 && (
                    <>
                      <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#031534]">Muhammad Rizki Pratama</span>
                            <span className="text-[10px] font-bold bg-[#031534] text-white px-1.5 py-0.5 rounded">IX-A</span>
                            <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded-full">
                              94% Match
                            </span>
                          </div>
                          <div className="text-[11px] text-[#6C757D] mt-0.5">
                            Status: <strong className="text-blue-700">Dispensasi</strong> • Pelatihan OSN
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Terverifikasi
                        </span>
                      </div>

                      <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#031534]">Nabila Syakieb</span>
                            <span className="text-[10px] font-bold bg-[#031534] text-white px-1.5 py-0.5 rounded">IX-A</span>
                            <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded-full">
                              100% Match
                            </span>
                          </div>
                          <div className="text-[11px] text-[#6C757D] mt-0.5">
                            Status: <strong className="text-blue-700">Dispensasi</strong> • Lomba Pidato Bahasa Inggris
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Terverifikasi
                        </span>
                      </div>
                    </>
                  )}

                  {activeSimulatorDoc === 2 && (
                    <>
                      <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#031534]">Joko Widodo Prasetyo</span>
                            <span className="text-[10px] font-bold bg-[#031534] text-white px-1.5 py-0.5 rounded">VII-A</span>
                            <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded-full">
                              100% Match
                            </span>
                          </div>
                          <div className="text-[11px] text-[#6C757D] mt-0.5">
                            Pelanggaran: <strong className="text-rose-700">Terlambat Masuk</strong> • Pukul 07.25
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Terverifikasi
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Trigger to Workspace */}
              <div className="mt-6 pt-4 border-t border-[#E6E6E6] flex items-center justify-between">
                <span className="text-xs text-[#6C757D]">
                  Coba proses berkas asli Anda di workspace penuh.
                </span>
                <button
                  onClick={() => onOpenWorkspace('documents')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#031534] text-white text-xs font-bold rounded-lg hover:bg-[#1a2a4a] transition-all"
                >
                  Buka Dokumen Center
                  <ArrowRight className="w-3.5 h-3.5 text-[#00B894]" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. BEFORE & AFTER COMPARISON MATRIX (PRD Section 4 & Image 1 reference) */}
      <section id="perbandingan" className="py-20 bg-[#F8F9FA] border-b border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006b55] bg-[#00B894]/10 px-3 py-1 rounded-full">
              PERBANDINGAN EFISIENSI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031534] tracking-tight font-display">
              Apa yang Berubah Saat Anda Beralih ke SMS.
            </h2>
            <p className="text-sm text-[#44474E]">
              Perbedaan nyata antara cara manual konvensional dengan infrastruktur otomasi data sekolah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* Without SMS */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-rose-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-rose-100">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#031534]">
                  <span className="text-rose-600 italic font-serif">Tanpa</span> SMS Banyubiru
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#44474E]">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Operator harus mengetik ulang nama siswa satu per satu dari kertas fisik.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Rentan terjadi salah pengetikan nama atau salah memasukkan kelas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Sulit menghubungkan catatan harian dengan NISN resmi Dapodik.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Proses rekap bulanan memakan waktu berjam-jam menjelang rapat evaluasi.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Tidak ada audit log atas koreksi data yang pernah dilakukan.</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-rose-100 text-xs font-semibold text-rose-700">
                ⚠️ Waktu terbuang untuk administrasi manual: 4-6 jam/minggu
              </div>
            </div>

            {/* With SMS */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-emerald-400 shadow-md space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#00B894] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                Rekomendasi
              </div>

              <div className="flex items-center gap-2 pb-3 border-b border-emerald-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#031534]">
                  <span className="text-[#006b55] italic font-serif">Dengan</span> SMS Banyubiru
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#44474E]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Foto atau upload dokumen, OCR membaca dalam hitungan detik.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fuzzy matcher otomatis mencocokkan siswa walau ada salah tulis (96%+).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Langsung terhubung dengan database Master Siswa (NISN & NIS stabil).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ekspor 1-klik ke Microsoft Excel (.xlsx) dan PDF resmi ber-Kop Surat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Audit Trail merekam setiap aksi verifikasi dan pengubahan operator.</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-emerald-100 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00B894]" />
                Efisiensi meningkat hingga 50% waktu kerja operator
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. PRD ARCHITECTURAL PIPELINE (Section 9) */}
      <section id="cara-kerja" className="py-20 bg-white border-b border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006b55] bg-[#00B894]/10 px-3 py-1 rounded-full">
              PIPELINE DATA PRODUK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031534] tracking-tight font-display">
              Alur Kerja Terintegrasi (End-to-End)
            </h2>
            <p className="text-sm text-[#44474E]">
              Struktur data yang jelas memastikan akurasi dan integritas data sekolah dari berkas fisik hingga laporan resmi.
            </p>
          </div>

          {/* 6 Step Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            
            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E6E6E6] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#031534] text-white flex items-center justify-center mx-auto text-xs font-bold">
                1
              </div>
              <h4 className="font-bold text-xs text-[#031534]">Master Data</h4>
              <p className="text-[11px] text-[#6C757D]">Import Dapodik / Excel siswa sebagai referensi.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E6E6E6] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#031534] text-white flex items-center justify-center mx-auto text-xs font-bold">
                2
              </div>
              <h4 className="font-bold text-xs text-[#031534]">Upload Berkas</h4>
              <p className="text-[11px] text-[#6C757D]">Upload foto atau scan dokumen absensi/izin.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E6E6E6] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#006b55] text-white flex items-center justify-center mx-auto text-xs font-bold">
                3
              </div>
              <h4 className="font-bold text-xs text-[#031534]">OCR Engine</h4>
              <p className="text-[11px] text-[#6C757D]">Memindai teks dan mengekstrak field tabel.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E6E6E6] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#006b55] text-white flex items-center justify-center mx-auto text-xs font-bold">
                4
              </div>
              <h4 className="font-bold text-xs text-[#031534]">Fuzzy Match</h4>
              <p className="text-[11px] text-[#6C757D]">Pencocokan nama siswa dengan bobot akurasi.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E6E6E6] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#F97316] text-white flex items-center justify-center mx-auto text-xs font-bold">
                5
              </div>
              <h4 className="font-bold text-xs text-[#031534]">Verifikasi</h4>
              <p className="text-[11px] text-[#6C757D]">Operator mereview dan mengonfirmasi baris.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E6E6E6] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                6
              </div>
              <h4 className="font-bold text-xs text-[#031534]">Export</h4>
              <p className="text-[11px] text-[#6C757D]">Download Excel (.xlsx) & PDF siap cetak.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. TESTIMONIAL & CASE STUDY */}
      <section className="py-20 bg-[#F8F9FA] border-b border-[#E6E6E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E6E6E6] shadow-sm relative">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img 
                src={school.logoUrl} 
                alt="SMPN 99 Jakarta" 
                className="w-20 h-20 object-contain rounded-xl p-2 bg-[#F8F9FA] border border-[#E6E6E6]"
              />
              <div className="space-y-2 text-center sm:text-left">
                <p className="text-base sm:text-lg text-[#031534] font-medium italic">
                  "Sebelum menggunakan SMS Banyubiru, tim tata usaha harus memasukkan kembali daftar absen harian dari 24 kelas secara manual. Sekarang berkas difoto, dicocokkan otomatis dengan Dapodik, dan rekap bulanan selesai dalam hitungan menit."
                </p>
                <div className="pt-2">
                  <div className="font-bold text-sm text-[#031534]">Drs. H. Bambang Suprayitno, M.Pd.</div>
                  <div className="text-xs text-[#6C757D]">Kepala Sekolah SMP Negeri 99 Jakarta • DKI Jakarta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING & TIERS */}
      <section id="harga" className="py-20 bg-white border-b border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006b55] bg-[#00B894]/10 px-3 py-1 rounded-full">
              PAKET SEKOLAH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031534] tracking-tight font-display">
              Pilihan Akses Sesuai Kebutuhan Sekolah
            </h2>
            <p className="text-sm text-[#44474E]">
              Mulai dari uji coba gratis hingga implementasi multi-sekolah tingkat suku dinas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Free Trial */}
            <div className="bento-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#031534]">Uji Coba Pilot (Gratis)</h3>
                <p className="text-xs text-[#6C757D] mt-1">Untuk evaluasi alur kerja sekolah.</p>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-[#031534]">Rp 0</span>
                  <span className="text-xs text-[#6C757D]"> / 30 hari</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#44474E]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Hingga 100 dokumen OCR
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Import 1 Master Data Sekolah
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Ekspor Excel & PDF
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> 1 Akun Operator
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenWorkspace('dashboard')}
                className="w-full mt-8 py-2.5 bg-[#F8F9FA] hover:bg-[#E6E6E6] text-[#031534] font-bold text-xs rounded-xl border border-[#E6E6E6] transition-all"
              >
                Mulai Pilot Sekarang
              </button>
            </div>

            {/* School Regular (Highlighted) */}
            <div className="bento-card p-6 sm:p-8 flex flex-col justify-between border-2 border-[#00B894] shadow-lg relative">
              <div className="absolute top-0 right-0 bg-[#00B894] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
                Paling Diminati
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#031534]">Paket Satuan Sekolah</h3>
                <p className="text-xs text-[#6C757D] mt-1">Untuk SMP / SMA / SMK mandiri.</p>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-[#031534]">Rp 350.000</span>
                  <span className="text-xs text-[#6C757D]"> / bulan</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#44474E]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Unlimited Dokumen OCR
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Sinkronisasi Master Dapodik
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Ekspor Excel & PDF Kop Resmi
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Multi Operator & Wali Kelas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Full Audit Trail & Backup
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenWorkspace('dashboard')}
                className="w-full mt-8 py-2.5 bg-[#031534] hover:bg-[#1a2a4a] text-white font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                Pilih Paket Sekolah
              </button>
            </div>

            {/* Dinas / Multi-School */}
            <div className="bento-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#031534]">Suku Dinas & Yayasan</h3>
                <p className="text-xs text-[#6C757D] mt-1">Untuk konsorsium multi-sekolah.</p>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-[#031534]">Kustom</span>
                  <span className="text-xs text-[#6C757D]"> / tahunan</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#44474E]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Multi-School Workspace
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Integrasi API Server Dinas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Dashboard Agregat Wilayah
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00B894]" /> Dedicated Technical Support
                  </li>
                </ul>
              </div>
              <button
                onClick={() => alert('Silakan hubungi Banyubiru Digital Services: support@banyubiru.id')}
                className="w-full mt-8 py-2.5 bg-[#F8F9FA] hover:bg-[#E6E6E6] text-[#031534] font-bold text-xs rounded-xl border border-[#E6E6E6] transition-all"
              >
                Hubungi Kami
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-[#F8F9FA] border-b border-[#E6E6E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006b55] bg-[#00B894]/10 px-3 py-1 rounded-full">
              PERTANYAAN UMUM
            </span>
            <h2 className="text-3xl font-extrabold text-[#031534] tracking-tight font-display">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-sm text-[#031534] hover:bg-[#F8F9FA]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#6C757D] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-[#44474E] leading-relaxed border-t border-[#E6E6E6]/60 bg-[#F8F9FA]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. BOTTOM CALL TO ACTION (Image 1 reference banner) */}
      <section className="py-16 bg-[#031534] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 architectural-grid"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00B894]">
            MULAI TRANSFORMASI DIGITAL HARI INI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display leading-snug">
            Anda Tidak Perlu Memilih Antara Data Rapi & <br className="hidden sm:inline" />
            Menyelesaikan Tugas Pokok Sekolah.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Biarkan SMS Banyubiru bekerja di latar belakang mengolah berkas fisik menjadi data terverifikasi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenWorkspace('dashboard')}
              className="bg-[#00B894] hover:bg-emerald-400 text-[#031534] font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              Mulai Uji Coba Gratis Sekarang
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenDemo}
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
            >
              Lihat Demo Interaktif
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER (Matching Image 4) */}
      <footer className="bg-[#031534] text-white px-6 sm:px-12 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <BanyubiruLogo 
                banyubiruLogoUrl={school.banyubiruLogoUrl} 
                size="sm"
              />
              <span className="font-bold text-lg">SMS Banyubiru</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sistem Manajemen Sekolah modern untuk administrasi yang lebih efisien, terstruktur, dan terverifikasi.
            </p>
            <p className="text-[11px] text-slate-400">
              © 2026 SMS by Banyubiru Digital Services. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">Produk</span>
            <a href="#fitur" className="text-xs text-slate-300 hover:text-white transition-colors">Fitur</a>
            <a href="#cara-kerja" className="text-xs text-slate-300 hover:text-white transition-colors">Cara Kerja</a>
            <a href="#simulator" className="text-xs text-slate-300 hover:text-white transition-colors">Demo Interaktif</a>
            <a href="#harga" className="text-xs text-slate-300 hover:text-white transition-colors">Harga</a>
          </div>

          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">Perusahaan</span>
            <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">Tentang Kami</a>
            <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">SOP Keamanan Data</a>
          </div>

          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">Bantuan & Kontak</span>
            <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">Pusat Bantuan</a>
            <a href="#" className="text-xs text-slate-300 hover:text-white transition-colors">Hubungi Kami</a>
            <div className="pt-2 text-[11px] text-slate-400">
              Partner Pilot: <strong className="text-white">SMP Negeri 99 Jakarta</strong>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
