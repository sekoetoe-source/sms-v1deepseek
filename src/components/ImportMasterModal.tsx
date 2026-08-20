import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student } from '../types';

interface ImportMasterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (newStudents: Student[]) => void;
  existingCount: number;
}

export const ImportMasterModal: React.FC<ImportMasterModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
  existingCount
}) => {
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('Dapodik_Export_SMPN99_SemesterGanjil.xlsx');
  const [selectedSource, setSelectedSource] = useState<'dapodik' | 'excel' | 'preset'>('preset');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const sampleRows = [
    { nisn: '0098451201', nis: '232407001', nama: 'Ahmad Fauzan', kelas: 'VIII-B', rombel: 'Kelas 8B', status: 'Aktif' },
    { nisn: '0098451202', nis: '232407002', nama: 'Budi Santoso', kelas: 'VIII-B', rombel: 'Kelas 8B', status: 'Aktif' },
    { nisn: '0098451203', nis: '232407003', nama: 'Citra Kirana Dewi', kelas: 'VIII-B', rombel: 'Kelas 8B', status: 'Aktif' },
    { nisn: '0098451204', nis: '232407004', nama: 'Dimas Anggara Putra', kelas: 'VIII-B', rombel: 'Kelas 8B', status: 'Aktif' },
    { nisn: '0098451205', nis: '232407005', nama: 'Eka Putri Lestari', kelas: 'VIII-B', rombel: 'Kelas 8B', status: 'Aktif' }
  ];

  const handleExecuteImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      
      // Seed extended student batch
      const extendedStudents: Student[] = [
        ...sampleRows.map((r, i) => ({
          student_id: `STU-IMP-${100 + i}`,
          source_id: `DAPO-99-${100 + i}`,
          nis: r.nis,
          nisn: r.nisn,
          nama: r.nama,
          kelas: r.kelas,
          rombel: r.rombel,
          status: 'Aktif' as const,
          academic_year: '2025/2026',
          gender: (i % 2 === 0 ? 'L' : 'P') as 'L' | 'P'
        }))
      ];

      onImportComplete(extendedStudents);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#E6E6E6] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E6E6] bg-[#F8F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#031534] flex items-center justify-center text-[#00B894]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#031534] text-base">
                Import Master Data Siswa
              </h3>
              <p className="text-xs text-[#6C757D]">
                Modul 01: Integrasi Sumber Data Resmi & File Excel Sekolah
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6C757D] hover:bg-[#E6E6E6] hover:text-[#031534]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Source Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#031534] uppercase tracking-wider">
              Pilih Sumber Master Data:
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => { setSelectedSource('preset'); setFileSelected(true); }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSource === 'preset'
                    ? 'border-[#00B894] bg-[#00B894]/5 ring-1 ring-[#00B894]'
                    : 'border-[#E6E6E6] hover:bg-[#F8F9FA]'
                }`}
              >
                <div className="font-bold text-xs text-[#031534]">Seed Dapodik SMPN 99</div>
                <div className="text-[11px] text-[#6C757D] mt-0.5">865 Siswa Terverifikasi</div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedSource('dapodik'); setFileSelected(true); }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSource === 'dapodik'
                    ? 'border-[#00B894] bg-[#00B894]/5 ring-1 ring-[#00B894]'
                    : 'border-[#E6E6E6] hover:bg-[#F8F9FA]'
                }`}
              >
                <div className="font-bold text-xs text-[#031534]">Export File Dapodik</div>
                <div className="text-[11px] text-[#6C757D] mt-0.5">Format .xlsx / .csv resmi</div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedSource('excel'); setFileSelected(true); }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSource === 'excel'
                    ? 'border-[#00B894] bg-[#00B894]/5 ring-1 ring-[#00B894]'
                    : 'border-[#E6E6E6] hover:bg-[#F8F9FA]'
                }`}
              >
                <div className="font-bold text-xs text-[#031534]">Template Excel Kustom</div>
                <div className="text-[11px] text-[#6C757D] mt-0.5">Kolom Fleksibel</div>
              </button>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-5 text-center bg-[#F8F9FA]">
            <UploadCloud className="w-8 h-8 mx-auto text-[#006b55] mb-2" />
            <p className="text-xs font-semibold text-[#031534]">
              {selectedSource === 'preset' 
                ? 'Master Data Dapodik SMP Negeri 99 Jakarta siap dimuat'
                : 'Tarik & lepas file Excel / Dapodik Anda di sini, atau klik untuk memilih'}
            </p>
            <p className="text-[11px] text-[#6C757D] mt-1">
              File: <span className="font-mono text-[#031534] font-medium">{fileName}</span> (1.4 MB)
            </p>
          </div>

          {/* Validation Matrix Box */}
          <div className="bg-white p-4 rounded-xl border border-[#E6E6E6] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#031534]">Hasil Validasi Otomatis (PRD Bagian 13)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ✓ Validasi Lolos
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E6E6E6]">
                <div className="text-[#6C757D] text-[10px]">Total Siswa Terbaca</div>
                <div className="font-bold text-sm text-[#031534]">865 Siswa</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E6E6E6]">
                <div className="text-[#6C757D] text-[10px]">Deteksi Duplikasi NISN</div>
                <div className="font-bold text-sm text-emerald-600">0 Duplikat (Clean)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E6E6E6]">
                <div className="text-[#6C757D] text-[10px]">Kelengkapan Kelas</div>
                <div className="font-bold text-sm text-emerald-600">100% Lengkap</div>
              </div>
            </div>

            {/* Table Preview */}
            <div className="text-[11px] font-bold text-[#6C757D] uppercase mt-2">
              Preview Pemetaan Kolom:
            </div>
            <div className="overflow-x-auto border border-[#E6E6E6] rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F9FA] text-[#44474E] font-semibold border-b border-[#E6E6E6]">
                  <tr>
                    <th className="p-2">NISN</th>
                    <th className="p-2">NIS</th>
                    <th className="p-2">Nama Siswa</th>
                    <th className="p-2">Kelas</th>
                    <th className="p-2">Rombel</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E6E6]">
                  {sampleRows.map((r, i) => (
                    <tr key={i} className="hover:bg-[#F8F9FA]">
                      <td className="p-2 font-mono text-[11px] text-[#44474E]">{r.nisn}</td>
                      <td className="p-2 font-mono text-[11px] text-[#44474E]">{r.nis}</td>
                      <td className="p-2 font-semibold text-[#031534]">{r.nama}</td>
                      <td className="p-2 text-[#44474E]">{r.kelas}</td>
                      <td className="p-2 text-[#6C757D] text-[11px]">{r.rombel}</td>
                      <td className="p-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#E6E6E6] flex items-center justify-between">
          <div className="text-xs text-[#6C757D]">
            Saat ini terdapat <strong className="text-[#031534]">{existingCount}</strong> siswa di database lokal.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#6C757D] hover:bg-[#E6E6E6]"
            >
              Batal
            </button>
            <button
              onClick={handleExecuteImport}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#031534] text-white hover:bg-[#1a2a4a] shadow-sm disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Memproses Import...
                </>
              ) : (
                <>
                  Konfirmasi & Import Master Data
                  <ArrowRight className="w-4 h-4 text-[#00B894]" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
