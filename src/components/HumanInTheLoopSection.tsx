import React, { useState, useRef } from 'react';
import {
  ZoomIn,
  Check,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Upload,
  FileText,
  Maximize2,
  X,
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';

interface PresetDoc {
  id: string;
  type: 'KK' | 'Ijazah' | 'Akta' | 'Absensi';
  label: string;
  filename: string;
  fullName: string;
  nik: string;
  nisn?: string;
  confidence: number;
  ocrSnippet: string;
  headerTitle: string;
  subHeader: string;
  notes: string;
}

const PRESET_DOCS: PresetDoc[] = [
  {
    id: 'kk-1',
    type: 'KK',
    label: 'Kartu Keluarga',
    filename: 'KK_3174_Budi.pdf',
    fullName: 'BUDI SANTOSO',
    nik: '3174012345678901',
    confidence: 85,
    ocrSnippet: 'BUDI SANTOSO — NIK: 3174012345678901',
    headerTitle: 'REPUBLIK INDONESIA - KARTU KELUARGA',
    subHeader: 'No. 3174019283740001 • Prov. DKI Jakarta',
    notes: 'Tingkat keyakinan OCR: 85%. Mohon periksa kembali kesesuaian digit NIK.'
  },
  {
    id: 'ijazah-1',
    type: 'Ijazah',
    label: 'Ijazah Sekolah',
    filename: 'Ijazah_SMP_Siti.jpg',
    fullName: 'SITI NURHALIZA',
    nik: '3275098765432109',
    nisn: '0089123456',
    confidence: 96,
    ocrSnippet: 'SITI NURHALIZA — NISN: 0089123456',
    headerTitle: 'KEMENTERIAN PENDIDIKAN DAN KEBUDAYAAN',
    subHeader: 'IJAZAH SEKOLAH MENENGAH PERTAMA (SMP)',
    notes: 'Tingkat keyakinan OCR: 96%. Sesuai dengan data master Dapodik.'
  },
  {
    id: 'akta-1',
    type: 'Akta',
    label: 'Akta Kelahiran',
    filename: 'Akta_Rizky.pdf',
    fullName: 'AHMAD RIZKY PRATAMA',
    nik: '3171051203090002',
    confidence: 91,
    ocrSnippet: 'AHMAD RIZKY PRATAMA — NIK: 3171051203090002',
    headerTitle: 'KUTIPAN AKTA KELAHIRAN',
    subHeader: 'Dinas Kependudukan dan Pencatatan Sipil',
    notes: 'Tingkat keyakinan OCR: 91%. Nama dan tanggal lahir sesuai.'
  },
  {
    id: 'absensi-1',
    type: 'Absensi',
    label: 'Presensi Harian',
    filename: 'Absensi_Kelas8B_2026.pdf',
    fullName: 'MUHAMMAD RAFI',
    nik: '3175021405080003',
    nisn: '0098451201',
    confidence: 89,
    ocrSnippet: 'MUHAMMAD RAFI — KELAS 8B (HADIR)',
    headerTitle: 'LEMBAR PRESENSI HARIAN SISWA KELAS VIII-B',
    subHeader: 'SMP Negeri 1 Banyubiru • Semester Genap 2025/2026',
    notes: 'Tingkat keyakinan OCR: 89%. Kehadiran terdeteksi: HADIR.'
  }
];

interface HumanInTheLoopSectionProps {
  onOpenWorkspace?: (tab?: string) => void;
}

export const HumanInTheLoopSection: React.FC<HumanInTheLoopSectionProps> = ({ onOpenWorkspace }) => {
  const [activePreset, setActivePreset] = useState<PresetDoc>(PRESET_DOCS[0]);
  const [fullName, setFullName] = useState(PRESET_DOCS[0].fullName);
  const [nik, setNik] = useState(PRESET_DOCS[0].nik);
  const [nameConfirmed, setNameConfirmed] = useState(false);
  const [nikConfirmed, setNikConfirmed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [customFile, setCustomFile] = useState<{ name: string; previewUrl?: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePresetChange = (preset: PresetDoc) => {
    setActivePreset(preset);
    setFullName(preset.fullName);
    setNik(preset.nik);
    setNameConfirmed(false);
    setNikConfirmed(false);
    setIsSaved(false);
    setCustomFile(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomFile({ name: file.name, previewUrl: url });
      
      // Auto-extract mock OCR name from filename or preset
      const mockName = file.name.replace(/\.[^/.]+$/, '').replace(/[_|-]/g, ' ').toUpperCase();
      setFullName(mockName.length > 3 ? mockName : 'SISWA BARU TERVERIFIKASI');
      setNik('3174' + Math.floor(100000000000 + Math.random() * 900000000000));
      setNameConfirmed(false);
      setNikConfirmed(false);
      setIsSaved(false);
      
      showToast(`Berkas ${file.name} berhasil diunggah dan dipindai OCR`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSave = () => {
    if (!fullName.trim()) {
      showToast('Nama Lengkap tidak boleh kosong.');
      return;
    }
    if (nik.trim().length < 16) {
      showToast('NIK harus berupa 16 digit angka.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setNameConfirmed(true);
      setNikConfirmed(true);
      setIsSaved(true);
      setIsSaving(false);
      showToast('Data berhasil diverifikasi & dicocokkan ke database Dapodik!');
    }, 600);
  };

  const handleReset = () => {
    setNameConfirmed(false);
    setNikConfirmed(false);
    setIsSaved(false);
    setFullName(activePreset.fullName);
    setNik(activePreset.nik);
    showToast('Status verifikasi telah direset.');
  };

  const isNikValid = nik.trim().length === 16 && /^\d+$/.test(nik);

  return (
    <section
      id="human-in-the-loop-section"
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 sm:mb-16 relative"
    >
      {/* Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-500/40 text-xs font-semibold animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-[#eff4ff] rounded-2xl p-5 sm:p-7 border border-[#c6c6cd] shadow-xs overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#006b55]">
            PENINJAUAN GANDA OPERATOR
          </span>
          <h2
            id="hitl-headline"
            className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0b1c30] mt-1 mb-1.5"
          >
            Human-in-the-Loop Verification
          </h2>
          <p
            id="hitl-subheadline"
            className="text-xs sm:text-sm text-[#45464d] max-w-lg mx-auto"
          >
            AI membaca cepat, manusia memastikan akurat. Tampilan berdampingan untuk verifikasi mudah &amp; presisi tinggi.
          </p>

          {/* Interactive Document Switcher Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs font-semibold text-[#45464d] mr-1">
              Sampel Dokumen:
            </span>
            {PRESET_DOCS.map((doc) => (
              <button
                key={doc.id}
                onClick={() => handlePresetChange(doc)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activePreset.id === doc.id && !customFile
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {doc.label}
              </button>
            ))}

            {/* Custom File Upload Option */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                customFile
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-300'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{customFile ? 'Berkas Kustom Aktif' : 'Unggah Berkas Sendiri'}</span>
            </button>
          </div>
        </div>

        {/* Side-by-side verification container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Document View (Left Panel) */}
          <div
            id="document-view-panel"
            className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0b1c30]">
                  Dokumen Asli
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  ({customFile ? customFile.name : activePreset.filename})
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  title="Perbesar / Mode Detail"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium ${
                    isZoomed
                      ? 'bg-blue-600 text-white'
                      : 'text-[#45464d] hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>{isZoomed ? 'Perkecil' : 'Perbesar'}</span>
                </button>
              </div>
            </div>

            {/* Simulated Document Preview with OCR Bounding Box */}
            <div
              className={`flex-1 bg-slate-100 rounded-lg flex items-center justify-center min-h-[320px] sm:min-h-[360px] border border-dashed border-[#c6c6cd] relative overflow-hidden transition-all select-none ${
                isZoomed ? 'scale-105 shadow-inner duration-200' : ''
              }`}
            >
              {/* Document Paper Texture & Elements */}
              <div className="absolute inset-0 bg-white p-6 opacity-90 flex flex-col justify-between">
                
                {/* Header of document */}
                <div className="border-b-2 border-slate-300 pb-3 text-center">
                  <div className="font-bold text-[11px] tracking-wide text-slate-800 uppercase">
                    {activePreset.headerTitle}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {activePreset.subHeader}
                  </div>
                </div>

                {/* Document Mock Rows */}
                <div className="space-y-2.5 pt-2 text-[11px] text-slate-700">
                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded border border-slate-200">
                    <span className="font-medium text-slate-500">Nama Lengkap Siswa :</span>
                    <span className="font-bold font-mono text-slate-900">{fullName || '---'}</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded border border-slate-200">
                    <span className="font-medium text-slate-500">Nomor Induk Kependudukan :</span>
                    <span className="font-bold font-mono text-slate-900">{nik || '---'}</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded border border-slate-200">
                    <span className="font-medium text-slate-500">Status Validasi :</span>
                    <span className="font-semibold text-emerald-700">
                      {isSaved ? 'TERVERIFIKASI & SIAP DAPODIK' : 'MENUNGGU KONFIRMASI OPERATOR'}
                    </span>
                  </div>
                </div>

                {/* Table lines simulation */}
                <div className="mt-4 border border-slate-300 rounded p-2 space-y-1.5 bg-slate-50/50">
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold border-b pb-1">
                    <span>Kolom Data</span>
                    <span>Status Nilai</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded"></div>
                  <div className="h-2 w-5/6 bg-slate-200 rounded"></div>
                  <div className="h-2 w-4/6 bg-slate-200 rounded"></div>
                </div>

                {/* Footer seal / signature mock */}
                <div className="flex justify-between items-end pt-2 text-[9px] text-slate-400">
                  <span>Dicetak resmi oleh Sistem Administrasi Sekolah</span>
                  <span className="font-mono">Security Hash: #B79A-2026</span>
                </div>
              </div>

              {/* OCR Detection Box overlay */}
              <div className="absolute inset-x-6 top-14 bottom-14 border-2 border-blue-500 rounded-lg bg-blue-500/10 flex flex-col items-center justify-center p-4 backdrop-blur-[1px] shadow-sm">
                <div className="bg-white/95 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md border border-blue-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Area Terdeteksi (OCR)</span>
                </div>
                <div className="mt-3 text-center bg-white/95 px-3.5 py-2 rounded-lg text-[11px] text-[#0b1c30] font-mono border border-blue-200 max-w-xs shadow-sm">
                  <span className="font-bold text-blue-900">{fullName}</span>
                  <div className="text-[10px] text-slate-600 mt-0.5">NIK: {nik}</div>
                </div>
              </div>
            </div>

            {/* Zoom In Full Screen Inspection Option */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Resolusi Ekstraksi: <strong>300 DPI (High Clarity)</strong></span>
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isZoomed ? 'Kembali' : 'Perbesar Kanvas'}</span>
              </button>
            </div>
          </div>

          {/* Data Form View (Right Panel) */}
          <div
            id="data-extraction-form-panel"
            className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3 mb-4">
                <span className="text-sm font-bold text-[#0b1c30]">
                  Data Terekstrak
                </span>
                {isSaved ? (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] rounded uppercase font-bold tracking-wider flex items-center gap-1 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    TERVERIFIKASI
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] rounded uppercase font-bold tracking-wider border border-amber-200">
                    PERLU KONFIRMASI
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {/* Full Name Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#45464d] mb-1.5 flex justify-between items-center">
                    <span>Nama Lengkap</span>
                    <span className="text-[10px] text-slate-400">Dapat diedit langsung</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setNameConfirmed(false);
                        setIsSaved(false);
                      }}
                      placeholder="Masukkan nama lengkap siswa"
                      className={`flex-1 border rounded-lg px-3 py-2 text-sm outline-none transition-all font-medium ${
                        nameConfirmed
                          ? 'border-emerald-400 bg-emerald-50/40 text-emerald-950'
                          : 'border-[#c6c6cd] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-[#0b1c30]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setNameConfirmed(!nameConfirmed)}
                      title={nameConfirmed ? 'Batal konfirmasi nama' : 'Konfirmasi nama sesuai'}
                      className={`p-2 rounded-lg border transition-all cursor-pointer ${
                        nameConfirmed
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* NIK Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#45464d] mb-1.5 flex justify-between items-center">
                    <span>NIK (Nomor Induk Kependudukan)</span>
                    <span className={`text-[10px] font-mono ${isNikValid ? 'text-emerald-600' : 'text-amber-600 font-bold'}`}>
                      {nik.length}/16 Digit
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nik}
                      maxLength={16}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setNik(val);
                        setNikConfirmed(false);
                        setIsSaved(false);
                      }}
                      placeholder="16 Digit NIK"
                      className={`flex-1 border rounded-lg px-3 py-2 text-sm outline-none font-mono transition-all ${
                        nikConfirmed
                          ? 'border-emerald-400 bg-emerald-50/40 text-emerald-950 font-medium'
                          : !isNikValid
                          ? 'border-amber-400 bg-amber-50/70 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-[#0b1c30]'
                          : 'border-[#c6c6cd] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-[#0b1c30]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setNikConfirmed(!nikConfirmed)}
                      title={nikConfirmed ? 'Batal konfirmasi NIK' : 'Konfirmasi NIK sesuai'}
                      className={`p-2 rounded-lg border transition-all cursor-pointer ${
                        nikConfirmed
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Confidence Warning / Status */}
                  {!isSaved && (
                    <div className="flex items-start gap-1.5 text-xs text-amber-800 bg-amber-50/90 border border-amber-200 rounded-md p-2 mt-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                      <span>
                        Tingkat keyakinan OCR: <strong>{activePreset.confidence}%</strong>. {!isNikValid ? 'Digit NIK belum lengkap (wajib 16 digit).' : activePreset.notes}
                      </span>
                    </div>
                  )}
                </div>

                {/* Verification Result Banner */}
                {isSaved && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 text-xs text-emerald-950 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Data Siswa Berhasil Diverifikasi!</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Siswa <strong>{fullName}</strong> (NIK: <code className="font-mono font-semibold">{nik}</code>) telah divalidasi dan siap dimasukkan ke dalam antrean sinkronisasi Dapodik.
                    </p>
                    {onOpenWorkspace && (
                      <button
                        type="button"
                        onClick={() => onOpenWorkspace('documents')}
                        className="mt-1 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>Lihat Dokumen di Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-[#e2e8f0] mt-6 flex gap-2">
              <button
                id="btn-simpan-verifikasi"
                type="button"
                disabled={isSaving}
                onClick={handleSave}
                className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-[#2563EB] hover:bg-blue-700 active:scale-98 text-white'
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan &amp; Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isSaved ? 'Data Telah Terverifikasi (Klik untuk Update)' : 'Simpan & Verifikasi'}</span>
                  </>
                )}
              </button>

              {isSaved && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset simulasi"
                  className="px-3 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
