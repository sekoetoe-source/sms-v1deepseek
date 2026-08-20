import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  FileSpreadsheet, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Search, 
  Database,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchWorkspace: () => void;
}

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({ 
  isOpen, 
  onClose,
  onLaunchWorkspace 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setProgress(0);
      return;
    }

    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((step) => {
              if (step >= 6) {
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                setIsPlaying(false);
                return 6;
              }
              return step + 1;
            });
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    }

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const steps = [
    { num: 1, title: 'Upload Dokumen', desc: 'Foto dokumen daftar siswa tidak hadir diupload oleh operator.' },
    { num: 2, title: 'OCR Scanning', desc: 'Engine OCR AI memindai karakter teks tulisan tangan/cetak.' },
    { num: 3, title: 'Ekstraksi Field', desc: 'Sistem mengenali field Nama, Kelas, Status, dan Keterangan.' },
    { num: 4, title: 'Pencocokan Master', desc: 'Sistem mencocokkan hasil OCR dengan Master Siswa (Dapodik).' },
    { num: 5, title: 'Human Verification', desc: 'Operator meninjau dan mengonfirmasi hasil dengan satu klik.' },
    { num: 6, title: 'Export Excel & PDF', desc: 'Data terstruktur siap diunduh ke format resmi sekolah.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-[#E6E6E6] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E6E6] bg-[#F8F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#031534] flex items-center justify-center text-[#00B894]">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-[#031534] text-base">
                Simulasi Alur Dokumen-ke-Data (PRD SMS v1.0)
              </h3>
              <p className="text-xs text-[#6C757D]">
                Alur otomatisasi administrasi sekolah SMP Negeri 99 Jakarta
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6C757D] hover:bg-[#E6E6E6] hover:text-[#031534] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="px-6 py-3 bg-[#FFFFFF] border-b border-[#E6E6E6] grid grid-cols-6 gap-2">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => {
                setCurrentStep(s.num);
                setProgress(0);
              }}
              className={`text-left p-2 rounded-lg transition-all ${
                currentStep === s.num 
                  ? 'bg-[#031534] text-white shadow-sm' 
                  : currentStep > s.num
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-[#F8F9FA] text-[#6C757D]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>0{s.num}</span>
                {currentStep > s.num ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                )}
              </div>
              <div className="text-[10px] font-medium truncate mt-0.5">
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Simulation Screen */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F8F9FA] min-h-[320px]">
          
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <div className="bg-white p-6 rounded-xl border border-[#E6E6E6] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#006b55] bg-[#00B894]/10 px-2.5 py-1 rounded">
                  Langkah 1: Input Dokumen
                </span>
                <span className="text-xs text-[#6C757D]">File: Absensi_Kelas_8B_20Agustus.jpg</span>
              </div>
              <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center bg-[#F8F9FA]">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#031534]/5 flex items-center justify-center text-[#031534] mb-3">
                  <FileText className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-[#031534] text-sm">Foto Berkas Daftar Ketidakhadiran Masuk</h4>
                <p className="text-xs text-[#6C757D] max-w-md mx-auto mt-1">
                  Dokumen fisik tulisan tangan/cetak dari wali kelas VIII-B siap diproses oleh pipeline SMS.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#006b55] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Dokumen Valid (1.2 MB) • Resolusi Cukup
                </div>
              </div>
            </div>
          )}

          {/* Step 2: OCR Scanning */}
          {currentStep === 2 && (
            <div className="bg-white p-6 rounded-xl border border-[#E6E6E6] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  Langkah 2: Optical Character Recognition (OCR)
                </span>
                <span className="text-xs text-[#6C757D]">Scanning Engine Active</span>
              </div>
              
              <div className="relative bg-[#031534] text-white p-6 rounded-xl font-mono text-xs overflow-hidden shadow-inner">
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00B894] to-transparent animate-scan-line"></div>
                <div className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> [OCR ENGINE RUNNING] Memindai baris per baris...
                </div>
                <p className="text-slate-300">RAW_BUFFER: "DAFTAR KETIDAKHADIRAN SMPN 99 JAKARTA"</p>
                <p className="text-slate-300">LINE_1: "1. Ahmad Fausan | VIII-B | Skt (Surat Dokter)"</p>
                <p className="text-slate-300">LINE_2: "2. Budi Santoso | VIII-B | Izin"</p>
                <p className="text-slate-300">LINE_3: "3. Citra Kirana | VIII-B | Alpa"</p>
                <div className="mt-3 pt-3 border-t border-slate-700 text-amber-300 text-[11px]">
                  ✓ 3 Baris entri data siswa berhasil dideteksi.
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Data Extraction */}
          {currentStep === 3 && (
            <div className="bg-white p-6 rounded-xl border border-[#E6E6E6] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  Langkah 3: Transformasi Raw Text Menjadi Field
                </span>
                <span className="text-xs text-[#6C757D]">Field Normalizer</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#E6E6E6]">
                  <div className="text-[11px] font-bold text-[#6C757D] uppercase mb-2">Sebelumnya (Raw OCR):</div>
                  <code className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded block border border-rose-200 font-mono">
                    "Ahmad Fausan VIII B Skt"
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200">
                  <div className="text-[11px] font-bold text-[#006b55] uppercase mb-2">Hasil Ekstraksi Terstruktur:</div>
                  <div className="text-xs space-y-1 font-medium text-[#031534]">
                    <div><strong>Nama:</strong> Ahmad Fausan</div>
                    <div><strong>Kelas:</strong> VIII-B</div>
                    <div><strong>Status:</strong> Sakit</div>
                    <div><strong>Tanggal:</strong> 20/08/2026</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Student Matching */}
          {currentStep === 4 && (
            <div className="bg-white p-6 rounded-xl border border-[#E6E6E6] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded border border-purple-200">
                  Langkah 4: Pencocokan Master Data (Dapodik)
                </span>
                <span className="text-xs text-[#6C757D]">Fuzzy Matching Engine</span>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E6E6E6] flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#6C757D]">Nama pada Dokumen (OCR Typo):</div>
                  <div className="font-bold text-sm text-[#031534]">"Ahmad Fausan" (VIII-B)</div>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-[#00B894]" />
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-300 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#006b55]" />
                    <span className="font-bold text-xs text-emerald-800">Kandidat Terpilih:</span>
                    <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      96% Match
                    </span>
                  </div>
                  <div className="font-bold text-sm text-[#031534] mt-1">Ahmad Fauzan</div>
                  <div className="text-xs text-[#6C757D]">NISN: 0098451201 • Kelas VIII-B</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Verification */}
          {currentStep === 5 && (
            <div className="bg-white p-6 rounded-xl border border-[#E6E6E6] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Langkah 5: Human-in-the-Loop Verification
                </span>
                <span className="text-xs text-[#6C757D]">Operator Approval</span>
              </div>

              <div className="border border-emerald-400 bg-emerald-50/40 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#031534]">Ahmad Fauzan — VIII-B</h5>
                    <p className="text-xs text-emerald-800">Status: Sakit (Surat Dokter) • Terverifikasi oleh Operator</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-sm">
                  Terkonfirmasi
                </button>
              </div>
              <p className="text-xs text-[#6C757D] text-center italic">
                "AI membantu membaca dan mencocokkan. Manusia tetap mengonfirmasi data." (Prinsip PRD 21)
              </p>
            </div>
          )}

          {/* Step 6: Export */}
          {currentStep === 6 && (
            <div className="bg-white p-6 rounded-xl border border-[#E6E6E6] shadow-sm space-y-4 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#031534]">
                Pipeline Selesai! Data Siap Diekspor
              </h4>
              <p className="text-xs text-[#6C757D] max-w-md mx-auto">
                Data telah resmi terverifikasi dan dapat diunduh langsung sebagai file spreadsheet Excel maupun Laporan Resmi PDF ber-Kop Sekolah.
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E6E6E6] flex items-center gap-2.5">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <div className="text-left text-xs">
                    <div className="font-bold text-[#031534]">Excel (.xlsx)</div>
                    <div className="text-[10px] text-[#6C757D]">Untuk Rekap & Formula</div>
                  </div>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E6E6E6] flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-rose-600" />
                  <div className="text-left text-xs">
                    <div className="font-bold text-[#031534]">Laporan PDF (.pdf)</div>
                    <div className="text-[10px] text-[#6C757D]">Kop Surat & TTD Kepala Sekolah</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-[#FFFFFF] border-t border-[#E6E6E6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F8F9FA] hover:bg-[#E6E6E6] text-[#031534] border border-[#E6E6E6]"
            >
              {isPlaying ? 'Jeda Otomatis' : 'Putar Otomatis'}
            </button>
            <button
              onClick={() => {
                setCurrentStep(1);
                setProgress(0);
                setIsPlaying(true);
              }}
              className="inline-flex items-center gap-1 text-xs text-[#6C757D] hover:text-[#031534]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ulangi Simulasi
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#6C757D] hover:bg-[#F8F9FA]"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchWorkspace();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#031534] text-white hover:bg-[#1a2a4a] transition-all shadow-sm"
            >
              Buka Workspace Sekarang
              <ArrowRight className="w-3.5 h-3.5 text-[#00B894]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
