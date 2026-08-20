import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Download,
  Check,
  RotateCcw,
  ArrowRight,
  Database,
  Building,
  Layers,
} from 'lucide-react';
import { VerificationQueueItem } from '../types';

interface LiveSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: VerificationQueueItem | null;
}

export const LiveSimulatorModal: React.FC<LiveSimulatorModalProps> = ({
  isOpen,
  onClose,
  initialItem,
}) => {
  const [selectedDocType, setSelectedDocType] = useState<'KK' | 'Ijazah' | 'Akta'>('KK');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [verifiedFields, setVerifiedFields] = useState<{ [key: string]: boolean }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const [formData, setFormData] = useState({
    namaLengkap: 'AHMAD FAUZI PRATAMA',
    nik: '3174012345678901',
    nisn: '0089123456',
    tempatLahir: 'JAKARTA',
    tanggalLahir: '12-05-2008',
    namaIbu: 'SITI AMINAH',
    namaAyah: 'BAMBANG HERMANTO',
    alamat: 'JL. CEMPAKA PUTIH TENGAH NO. 45, JAKARTA PUSAT',
  });

  useEffect(() => {
    if (initialItem) {
      if (initialItem.docType === 'Ijazah') {
        setSelectedDocType('Ijazah');
        setFormData({
          namaLengkap: initialItem.extractedData.namaLengkap,
          nik: initialItem.extractedData.nik,
          nisn: initialItem.extractedData.nisn || '0078234512',
          tempatLahir: initialItem.extractedData.tempatLahir || 'BEKASI',
          tanggalLahir: initialItem.extractedData.tanggalLahir || '21-08-2007',
          namaIbu: initialItem.extractedData.namaIbu || 'FATIMAH',
          namaAyah: initialItem.extractedData.namaAyah || 'HIDAYAT',
          alamat: initialItem.extractedData.alamat || 'JL. KRANJI INDAH BLOK B3, BEKASI',
        });
      } else {
        setSelectedDocType('KK');
        setFormData({
          namaLengkap: initialItem.extractedData.namaLengkap,
          nik: initialItem.extractedData.nik,
          nisn: initialItem.extractedData.nisn || '0089123456',
          tempatLahir: initialItem.extractedData.tempatLahir || 'JAKARTA',
          tanggalLahir: initialItem.extractedData.tanggalLahir || '12-05-2008',
          namaIbu: initialItem.extractedData.namaIbu || 'SITI AMINAH',
          namaAyah: initialItem.extractedData.namaAyah || 'BAMBANG HERMANTO',
          alamat: initialItem.extractedData.alamat || 'JL. CEMPAKA PUTIH NO. 45, JAKARTA PUSAT',
        });
      }
    }
  }, [initialItem]);

  const handleStartScan = (type: 'KK' | 'Ijazah' | 'Akta') => {
    setSelectedDocType(type);
    setIsScanning(true);
    setScanProgress(0);
    setIsCompleted(false);
    setVerifiedFields({});

    if (type === 'KK') {
      setFormData({
        namaLengkap: 'AHMAD FAUZI PRATAMA',
        nik: '3174012345678901',
        nisn: '0089123456',
        tempatLahir: 'JAKARTA',
        tanggalLahir: '12-05-2008',
        namaIbu: 'SITI AMINAH',
        namaAyah: 'BAMBANG HERMANTO',
        alamat: 'JL. CEMPAKA PUTIH TENGAH NO. 45, JAKARTA PUSAT',
      });
    } else if (type === 'Ijazah') {
      setFormData({
        namaLengkap: 'SITI NURHALIZA',
        nik: '3275098765432109',
        nisn: '0078234512',
        tempatLahir: 'BEKASI',
        tanggalLahir: '21-08-2007',
        namaIbu: 'FATIMAH',
        namaAyah: 'HIDAYAT',
        alamat: 'JL. KRANJI INDAH BLOK B3, BEKASI',
      });
    } else {
      setFormData({
        namaLengkap: 'AHMAD RIZKY PRATAMA',
        nik: '3171051203090002',
        nisn: '0098765432',
        tempatLahir: 'JAKARTA',
        tanggalLahir: '03-09-2009',
        namaIbu: 'RATNA SARI',
        namaAyah: 'HENDRA PRATAMA',
        alamat: 'JL. RAWAMANGUN MUKA NO. 18, JAKARTA TIMUR',
      });
    }

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const toggleFieldVerify = (field: string) => {
    setVerifiedFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFinalVerify = () => {
    setIsCompleted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      id="simulator-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="simulator-modal-card"
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0b1c30] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg font-bold">
                Simulator OCR &amp; Verifikasi SMS
              </h3>
              <p className="text-xs text-slate-300">
                Alur Operasional Human-in-the-Loop &amp; Sinkronisasi Dapodik
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#f8f9ff]">
          {/* Top selection bar */}
          <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#0b1c30]">
                Pilih Dokumen Uji Coba:
              </span>
              <div className="flex gap-1.5">
                {(['KK', 'Ijazah', 'Akta'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleStartScan(type)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedDocType === type
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {type === 'KK'
                        ? 'Kartu Keluarga'
                        : type === 'Ijazah'
                        ? 'Ijazah Siswa'
                        : 'Akta Lahir'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Model AI: OCR Vision Multi-Field Engine</span>
            </div>
          </div>

          {/* Side-by-Side Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Document Preview (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-xl p-4 flex flex-col shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                  Visual Dokumen Asli
                </span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-mono rounded">
                  Format: PDF / JPEG
                </span>
              </div>

              {/* Interactive Paper Simulation */}
              <div className="bg-slate-100 rounded-lg p-4 relative min-h-[360px] flex flex-col justify-between border border-dashed border-slate-300 overflow-hidden">
                {/* Paper Header */}
                <div className="bg-white p-4 rounded shadow-2xs space-y-3 relative">
                  <div className="text-center border-b pb-2">
                    <div className="h-3 w-32 bg-slate-800/80 rounded mx-auto mb-1"></div>
                    <div className="h-2 w-48 bg-slate-400 rounded mx-auto"></div>
                  </div>

                  <div className="space-y-2 text-[10px] font-mono text-slate-600">
                    <div className="p-1 bg-blue-50/80 border border-blue-200 rounded flex justify-between items-center">
                      <span className="font-semibold text-blue-900">Nama:</span>
                      <span className="font-bold text-blue-950">{formData.namaLengkap}</span>
                    </div>
                    <div className="p-1 bg-amber-50/80 border border-amber-200 rounded flex justify-between items-center">
                      <span className="font-semibold text-amber-900">NIK:</span>
                      <span className="font-bold text-amber-950">{formData.nik}</span>
                    </div>
                    <div className="p-1 bg-slate-50 border rounded flex justify-between items-center">
                      <span>NISN:</span>
                      <span>{formData.nisn}</span>
                    </div>
                    <div className="p-1 bg-slate-50 border rounded flex justify-between items-center">
                      <span>TTL:</span>
                      <span>{formData.tempatLahir}, {formData.tanggalLahir}</span>
                    </div>
                    <div className="p-1 bg-slate-50 border rounded flex justify-between items-center">
                      <span>Ibu Kandung:</span>
                      <span>{formData.namaIbu}</span>
                    </div>
                  </div>

                  {/* Scanning Laser Animation */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[1px] flex flex-col items-center justify-center">
                      <div className="w-full h-1 bg-blue-600 shadow-[0_0_12px_#2563eb] animate-pulse"></div>
                      <span className="bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full mt-4 shadow-lg flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 animate-spin" />
                        Mengekstrak Teks ({scanProgress}%)...
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Confidence: <strong>94.2%</strong></span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Siap Validasi
                  </span>
                </div>
              </div>
            </div>

            {/* Extracted Form & Master Sync (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#e2e8f0] rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                      Ekstraksi Field &amp; Verifikasi Operator
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Klik ikon centang untuk verifikasi
                  </span>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Nama Lengkap Siswa (Sesuai Akta/KK)
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={formData.namaLengkap}
                        onChange={(e) =>
                          setFormData({ ...formData, namaLengkap: e.target.value })
                        }
                        className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-blue-500 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => toggleFieldVerify('namaLengkap')}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          verifiedFields['namaLengkap']
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* NIK */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      NIK Siswa (16 Digit)
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={formData.nik}
                        onChange={(e) =>
                          setFormData({ ...formData, nik: e.target.value })
                        }
                        className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => toggleFieldVerify('nik')}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          verifiedFields['nik']
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* NISN */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      NISN Siswa
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={formData.nisn}
                        onChange={(e) =>
                          setFormData({ ...formData, nisn: e.target.value })
                        }
                        className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => toggleFieldVerify('nisn')}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          verifiedFields['nisn']
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* TTL */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      value={formData.tempatLahir}
                      onChange={(e) =>
                        setFormData({ ...formData, tempatLahir: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Tanggal Lahir (DD-MM-YYYY)
                    </label>
                    <input
                      type="text"
                      value={formData.tanggalLahir}
                      onChange={(e) =>
                        setFormData({ ...formData, tanggalLahir: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  {/* Mother Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Nama Ibu Kandung (Krusial untuk Validasi Dapodik)
                    </label>
                    <input
                      type="text"
                      value={formData.namaIbu}
                      onChange={(e) =>
                        setFormData({ ...formData, namaIbu: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>

                {/* Validation Status Notice */}
                {isCompleted ? (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Data berhasil divalidasi 100% dan dicocokkan ke skema Dapodik!
                      </span>
                    </div>
                    <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      SINKRON
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 p-2.5 bg-blue-50/80 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      Sistem mendeteksi kecocokan 1 record pada master data sekolah.
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleFinalVerify}
                    className="bg-[#2563EB] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-blue-700 active:scale-98 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCompleted ? 'Update Data' : 'Simpan &amp; Sinkronkan'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartScan(selectedDocType)}
                    className="bg-white border border-slate-200 text-slate-700 px-3 py-2.5 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Scan Ulang</span>
                  </button>
                </div>

                {isCompleted && (
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => alert(`Berhasil mengekspor format Dapodik (.xlsx) untuk ${formData.namaLengkap}`)}
                      className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Ekspor Dapodik (.xlsx)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
