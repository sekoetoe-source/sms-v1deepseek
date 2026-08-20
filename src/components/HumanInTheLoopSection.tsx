import React, { useState } from 'react';
import {
  ZoomIn,
  Check,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const HumanInTheLoopSection: React.FC = () => {
  const [fullName, setFullName] = useState('BUDI SANTOSO');
  const [nik, setNik] = useState('3174012345678901');
  const [nameConfirmed, setNameConfirmed] = useState(false);
  const [nikConfirmed, setNikConfirmed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeDocType, setActiveDocType] = useState<'KK' | 'Ijazah' | 'Akta'>('KK');
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDocTypeChange = (type: 'KK' | 'Ijazah' | 'Akta') => {
    setActiveDocType(type);
    setIsSaved(false);
    if (type === 'KK') {
      setFullName('BUDI SANTOSO');
      setNik('3174012345678901');
    } else if (type === 'Ijazah') {
      setFullName('SITI NURHALIZA');
      setNik('3275098765432109');
    } else {
      setFullName('AHMAD RIZKY PRATAMA');
      setNik('3171051203090002');
    }
  };

  const handleSave = () => {
    setNameConfirmed(true);
    setNikConfirmed(true);
    setIsSaved(true);
  };

  const handleReset = () => {
    setNameConfirmed(false);
    setNikConfirmed(false);
    setIsSaved(false);
  };

  return (
    <section
      id="human-in-the-loop-section"
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 sm:mb-16"
    >
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
            Human-in-the-Loop
          </h2>
          <p
            id="hitl-subheadline"
            className="text-xs sm:text-sm text-[#45464d] max-w-lg mx-auto"
          >
            AI membaca cepat, manusia memastikan akurat. Tampilan berdampingan untuk verifikasi mudah.
          </p>

          {/* Interactive Document Switcher */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs font-semibold text-[#45464d] mr-1">
              Contoh Dokumen:
            </span>
            {(['KK', 'Ijazah', 'Akta'] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleDocTypeChange(type)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeDocType === type
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {type === 'KK' ? 'Kartu Keluarga' : type === 'Ijazah' ? 'Ijazah Sekolah' : 'Akta Kelahiran'}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-side verification container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document View (Left) */}
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
                  ({activeDocType === 'KK' ? 'KK_3174_Budi.pdf' : activeDocType === 'Ijazah' ? 'Ijazah_SMP_Siti.jpg' : 'Akta_Rizky.pdf'})
                </span>
              </div>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                title="Perbesar / Perkecil"
                className="p-1.5 rounded-lg text-[#45464d] hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
              >
                <ZoomIn className="w-4 h-4" />
                <span>{isZoomed ? 'Reset Zoom' : 'Perbesar'}</span>
              </button>
            </div>

            {/* Simulated Document Preview with OCR Bounding Box */}
            <div
              className={`flex-1 bg-slate-100 rounded-lg flex items-center justify-center min-h-[320px] sm:min-h-[360px] border border-dashed border-[#c6c6cd] relative overflow-hidden transition-all ${
                isZoomed ? 'scale-105 duration-200' : ''
              }`}
            >
              {/* Blurred Document Paper Texture */}
              <div className="absolute inset-0 bg-white p-6 opacity-85 select-none">
                {/* Header of document */}
                <div className="border-b-2 border-slate-300 pb-3 mb-4 text-center">
                  <div className="h-3.5 w-44 bg-slate-400 rounded mx-auto mb-1.5"></div>
                  <div className="h-2 w-32 bg-slate-300 rounded mx-auto"></div>
                </div>

                {/* Document Rows */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <div className="h-2.5 w-24 bg-slate-300 rounded"></div>
                    <div className="h-2.5 w-48 bg-slate-300 rounded font-mono text-[10px]"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-2.5 w-28 bg-slate-300 rounded"></div>
                    <div className="h-2.5 w-44 bg-slate-300 rounded"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-2.5 w-32 bg-slate-300 rounded"></div>
                    <div className="h-2.5 w-36 bg-slate-300 rounded"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-2.5 w-20 bg-slate-300 rounded"></div>
                    <div className="h-2.5 w-52 bg-slate-300 rounded"></div>
                  </div>
                </div>

                {/* Table lines simulation */}
                <div className="mt-6 border border-slate-300 rounded p-2 space-y-2">
                  <div className="h-2 w-full bg-slate-200 rounded"></div>
                  <div className="h-2 w-5/6 bg-slate-200 rounded"></div>
                  <div className="h-2 w-4/6 bg-slate-200 rounded"></div>
                </div>
              </div>

              {/* OCR Detection Box overlay */}
              <div className="absolute inset-x-6 top-16 bottom-16 border-2 border-blue-500 rounded-lg bg-blue-500/10 flex flex-col items-center justify-center p-4 backdrop-blur-[1px] shadow-sm animate-pulse-subtle">
                <div className="bg-white/95 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md border border-blue-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Area Terdeteksi (OCR)</span>
                </div>
                <div className="mt-3 text-center bg-white/90 px-3 py-1.5 rounded text-[11px] text-[#0b1c30] font-mono border border-blue-100 max-w-xs shadow-2xs">
                  <span className="font-semibold">{fullName}</span> — NIK: {nik}
                </div>
              </div>
            </div>
          </div>

          {/* Data Form View (Right) */}
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
                    Terverifikasi
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] rounded uppercase font-bold tracking-wider border border-amber-200">
                    Perlu Konfirmasi
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {/* Full Name Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#45464d] mb-1.5">
                    Nama Lengkap
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
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
                  <label className="block text-xs font-semibold text-[#45464d] mb-1.5">
                    NIK (Nomor Induk Kependudukan)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      className={`flex-1 border rounded-lg px-3 py-2 text-sm outline-none font-mono transition-all ${
                        nikConfirmed
                          ? 'border-emerald-400 bg-emerald-50/40 text-emerald-950 font-medium'
                          : 'border-[#c6c6cd] bg-amber-50/70 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 text-[#0b1c30]'
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
                  {!isSaved && (
                    <div className="flex items-start gap-1.5 text-xs text-amber-700 bg-amber-50/90 border border-amber-200 rounded-md p-2 mt-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>
                        Tingkat keyakinan OCR: <strong>85%</strong>. Mohon periksa kembali kesesuaian digit NIK.
                      </span>
                    </div>
                  )}
                </div>

                {isSaved && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Data siswa <strong>{fullName}</strong> berhasil divalidasi dan dicocokkan ke database induk Dapodik.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-[#e2e8f0] mt-6 flex gap-2">
              <button
                id="btn-simpan-verifikasi"
                type="button"
                onClick={handleSave}
                className="flex-1 bg-[#2563EB] text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSaved ? 'Data Telah Terverifikasi' : 'Simpan & Verifikasi'}</span>
              </button>

              {isSaved && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset simulasi"
                  className="px-3 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
