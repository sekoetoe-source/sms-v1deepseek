import React from 'react';
import {
  Lock,
  TrendingUp,
  Clock,
  Filter,
  FileText,
  CheckCircle2,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { VerificationQueueItem } from '../types';

interface DashboardPreviewProps {
  onOpenVerification: (item?: VerificationQueueItem) => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  onOpenVerification,
}) => {
  const queueItems: VerificationQueueItem[] = [
    {
      id: 'doc-1',
      fileName: 'Kartu Keluarga_Ahmad.pdf',
      docType: 'KK',
      uploadedAt: 'Diunggah 10 menit lalu',
      status: 'pending',
      confidence: 85,
      extractedData: {
        namaLengkap: 'AHMAD FAUZI',
        nik: '3174012345678901',
        nisn: '0089123456',
        tempatLahir: 'JAKARTA',
        tanggalLahir: '12-05-2008',
        namaIbu: 'SITI AMINAH',
        namaAyah: 'BAMBANG HERMANTO',
        alamat: 'JL. CEMPAKA PUTIH NO. 45, JAKARTA PUSAT',
      },
    },
    {
      id: 'doc-2',
      fileName: 'Ijazah_Siti.jpg',
      docType: 'Ijazah',
      uploadedAt: 'Diverifikasi oleh Budi (Operator)',
      status: 'verified',
      verifiedBy: 'Budi (Operator)',
      confidence: 98,
      extractedData: {
        namaLengkap: 'SITI NURHALIZA',
        nik: '3275098765432109',
        nisn: '0078234512',
        tempatLahir: 'BEKASI',
        tanggalLahir: '21-08-2007',
        namaIbu: 'FATIMAH',
        namaAyah: 'HIDAYAT',
        alamat: 'JL. KRANJI INDAH BLOK B3, BEKASI',
      },
    },
  ];

  return (
    <section
      id="dashboard-preview-section"
      className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-10 sm:mb-14 relative"
    >
      <div
        id="mac-browser-window"
        className="glass-card rounded-xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] overflow-hidden relative z-10 border border-[#c6c6cd]"
      >
        {/* Mac UI Header */}
        <div
          id="mac-window-topbar"
          className="bg-[#eff4ff] border-b border-[#e2e8f0] px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div
            id="browser-url-pill"
            className="text-xs font-medium text-[#45464d] flex items-center gap-1 bg-white/80 px-3 py-1 rounded-md border border-[#e2e8f0]"
          >
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>sms.sekolah.id</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Metrics Grid */}
        <div
          id="dashboard-metrics-grid"
          className="p-5 sm:p-6 bg-white grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {/* Metric 1 */}
          <div
            id="metric-card-total-siswa"
            className="p-4 border border-[#e2e8f0] rounded-lg bg-[#ffffff] flex flex-col justify-center shadow-2xs hover:border-blue-200 transition-colors"
          >
            <span className="text-xs font-medium text-[#45464d] mb-1">
              Total Siswa Terdata
            </span>
            <span className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#0b1c30]">
              865
            </span>
            <div className="mt-2 flex items-center gap-1 text-emerald-600 text-xs font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>+12 minggu ini</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div
            id="metric-card-dokumen-proses"
            className="p-4 border border-[#e2e8f0] rounded-lg bg-[#ffffff] flex flex-col justify-center shadow-2xs hover:border-blue-200 transition-colors"
          >
            <span className="text-xs font-medium text-[#45464d] mb-1">
              Dokumen Diproses
            </span>
            <span className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#0b1c30]">
              32
            </span>
            <div className="mt-2 flex items-center gap-1 text-[#45464d] text-xs font-medium">
              <Clock className="w-4 h-4" />
              <span>Hari ini</span>
            </div>
          </div>

          {/* Metric 3 (Action Required) */}
          <div
            id="metric-card-perlu-verifikasi"
            className="p-4 border border-red-200 rounded-lg bg-red-50/80 flex flex-col justify-center shadow-2xs"
          >
            <span className="text-xs font-semibold text-red-800 mb-1">
              Perlu Verifikasi Operator
            </span>
            <span className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-red-900">
              7
            </span>
            <button
              id="btn-tinjau-sekarang-metric"
              onClick={() => onOpenVerification(queueItems[0])}
              className="mt-2 bg-white border border-red-200 text-red-700 px-3 py-1 rounded text-xs font-semibold w-fit hover:bg-red-100/80 hover:border-red-300 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <span>Tinjau Sekarang</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Table Preview */}
        <div id="dashboard-queue-table" className="border-t border-[#e2e8f0] bg-white">
          <div className="px-5 py-3.5 border-b border-[#e2e8f0] bg-slate-50/80 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-[#0b1c30]">
              Antrean Verifikasi Terbaru
            </h3>
            <div className="flex items-center gap-1 text-slate-400 hover:text-slate-600 cursor-pointer">
              <Filter className="w-4 h-4" />
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Row 1 */}
            <div
              id="queue-item-row-1"
              onClick={() => onOpenVerification(queueItems[0])}
              className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg hover:shadow-sm hover:border-blue-300 bg-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100/90 flex items-center justify-center text-blue-700 shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#0b1c30] group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                    <span>{queueItems[0].fileName}</span>
                    <Eye className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-xs text-[#45464d]">{queueItems[0].uploadedAt}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] font-bold rounded uppercase tracking-wider shrink-0 border border-amber-200">
                Menunggu Tinjauan
              </span>
            </div>

            {/* Row 2 */}
            <div
              id="queue-item-row-2"
              onClick={() => onOpenVerification(queueItems[1])}
              className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg hover:shadow-sm hover:border-green-300 bg-white transition-all cursor-pointer opacity-75 hover:opacity-100 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100/90 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#0b1c30]">
                    {queueItems[1].fileName}
                  </p>
                  <p className="text-xs text-[#45464d]">{queueItems[1].uploadedAt}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase tracking-wider shrink-0 border border-emerald-200">
                Selesai
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative radial gradient behind mockup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/40 via-blue-50/20 to-transparent -z-10 blur-3xl pointer-events-none"></div>
    </section>
  );
};
