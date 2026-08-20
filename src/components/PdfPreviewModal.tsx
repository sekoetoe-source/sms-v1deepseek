import React from 'react';
import { X, Download, Printer, FileText, CheckCircle2 } from 'lucide-react';
import { SchoolDocument, ExtractedRecord, SchoolProfile } from '../types';
import { exportToPDF } from '../utils/exportUtils';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: SchoolDocument | null;
  records: ExtractedRecord[];
  school: SchoolProfile;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  document,
  records,
  school,
}) => {
  if (!isOpen || !document) return null;

  const verifiedRecords = records.filter(r => r.isVerified && !r.isRejected);
  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownloadPdf = () => {
    exportToPDF(document, records, school);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="pdf-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="pdf-modal-card"
        className="bg-[#1E293B] rounded-2xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="bg-[#0F172A] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  Pratinjau Dokumen Resmi PDF
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready to Export
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {document.title} • {verifiedRecords.length} Record Terverifikasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-[#00B894] text-slate-950 hover:bg-[#00a383] transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh File PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable A4 Document Paper Container */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-slate-900/90 flex justify-center">
          
          {/* A4 Paper Document Preview Canvas */}
          <div className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-12 shadow-2xl font-serif flex flex-col justify-between rounded-xs border border-slate-200 print:p-0 print:shadow-none">
            
            <div>
              {/* Kop Surat Header */}
              <div className="text-center font-sans space-y-1 pb-2">
                <h1 className="font-extrabold text-xl sm:text-2xl text-black tracking-tight uppercase">
                  {school.name}
                </h1>
                <p className="text-xs text-gray-800">
                  {school.address}
                </p>
                <p className="text-xs text-gray-800">
                  Telp. {school.phone || '021.4891456'} Fax. {school.fax || '47881356'}
                </p>
                <p className="text-xs text-gray-800">
                  Email: {school.email || 'smpn99dki@yahoo.co.id'} | Website: {school.website || 'https://smpn99jkt.sch.id'}
                </p>
              </div>

              {/* Double Header Border Line */}
              <div className="my-3 space-y-0.5">
                <div className="h-[2.5px] bg-black w-full"></div>
                <div className="h-[0.8px] bg-black w-full"></div>
              </div>

              {/* Document Title Header */}
              <div className="text-center font-sans my-6 space-y-1">
                <h2 className="font-extrabold text-sm sm:text-base text-black uppercase tracking-wide">
                  LAPORAN REKAPITULASI DOKUMEN ADMINISTRASI SISWA
                </h2>
                <p className="text-xs italic text-gray-700">
                  Jenis: {document.documentType} — Tahun Pelajaran {school.academicYear}
                </p>
              </div>

              {/* Metadata Info Row */}
              <div className="font-sans text-xs flex flex-wrap justify-between gap-4 mb-6 leading-relaxed">
                <div className="space-y-1">
                  <p><strong>Nama Dokumen :</strong> {document.title}</p>
                  <p><strong>Tanggal Berkas :</strong> {verifiedRecords[0]?.rawDate || '20/08/2026'}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p><strong>Tanggal Cetak :</strong> {todayStr}</p>
                  <p><strong>Total Siswa :</strong> {verifiedRecords.length} Record Terverifikasi</p>
                </div>
              </div>

              {/* Data Table */}
              <div className="font-sans overflow-x-auto mb-8">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#031534] text-white font-bold uppercase">
                      <th className="p-2.5 w-10 text-center">NO</th>
                      <th className="p-2.5 w-28">NISN</th>
                      <th className="p-2.5">NAMA LENGKAP SISWA</th>
                      <th className="p-2.5 w-20 text-center">KELAS</th>
                      <th className="p-2.5 w-24">STATUS</th>
                      <th className="p-2.5">KETERANGAN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border-b border-gray-200">
                    {verifiedRecords.map((rec, idx) => {
                      const student = rec.matchedStudent;
                      const nama = rec.editedFields?.nama || student?.nama || rec.rawName;
                      const kelas = rec.editedFields?.kelas || student?.kelas || rec.rawClass;
                      const status = rec.editedFields?.status || rec.rawStatus;
                      const catatan = rec.editedFields?.catatan || rec.rawNotes || '-';

                      return (
                        <tr key={rec.id} className={idx % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'}>
                          <td className="p-2.5 text-center font-medium text-gray-700">{idx + 1}</td>
                          <td className="p-2.5 font-mono text-gray-800">{student?.nisn || '-'}</td>
                          <td className="p-2.5 font-medium text-black">{nama}</td>
                          <td className="p-2.5 text-center font-medium text-gray-800">{kelas}</td>
                          <td className="p-2.5">
                            <span className={`font-bold ${
                              status.toLowerCase().includes('izin') ? 'text-sky-600' :
                              status.toLowerCase().includes('sakit') ? 'text-amber-600' :
                              status.toLowerCase().includes('alpa') || status.toLowerCase().includes('terlambat') ? 'text-rose-600' : 'text-gray-900'
                            }`}>
                              {status}
                            </span>
                          </td>
                          <td className="p-2.5 text-gray-700">{catatan}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Signature Block */}
              <div className="font-sans text-xs pt-4 flex justify-between items-start">
                {/* Left Operator Sign */}
                <div className="space-y-1">
                  <p>Petugas Operator SMS,</p>
                  <p className="font-bold">Sistem Manajemen Sekolah</p>
                  <div className="h-16"></div>
                  <p className="font-bold underline">{school.operatorName}</p>
                  <p className="text-gray-600">NIP. {school.operatorNip || '19890415 201502 1 002'}</p>
                </div>

                {/* Right Headmaster Sign */}
                <div className="space-y-1 text-right">
                  <p>Jakarta, {todayStr}</p>
                  <p>Mengetahui,</p>
                  <p className="font-bold">Kepala {school.name}</p>
                  <div className="h-16"></div>
                  <p className="font-bold underline">{school.headmasterName}</p>
                  <p className="text-gray-600">NIP. {school.headmasterNip}</p>
                </div>
              </div>

            </div>

            {/* Document Footer Note */}
            <div className="font-sans text-[10px] text-gray-400 text-center pt-8 border-t border-gray-100 mt-12">
              Dokumen ini dihasilkan secara otomatis melalui SMS Banyubiru - Sistem Manajemen Sekolah | Master Data Terverifikasi
            </div>

          </div>

        </div>

        {/* Modal Bottom Control Footer */}
        <div className="bg-[#0F172A] px-6 py-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00B894]" />
            <span>Kop Surat &amp; Tanda Tangan Resmi SMP NEGERI 99 JAKARTA</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
