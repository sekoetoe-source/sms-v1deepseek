import React, { useState } from 'react';
import {
  Database,
  Shield,
  FileCheck,
  Search,
  Users,
  GraduationCap,
} from 'lucide-react';
import { StudentMasterRecord } from '../types';

export const BentoFeaturesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Siswa' | 'Guru'>('Siswa');

  const sampleStudents: StudentMasterRecord[] = [
    {
      id: '1',
      nisn: '0081293841',
      nik: '3174012345678901',
      nama: 'Ahmad Fauzi Pratama',
      kelas: 'X-MIPA 1',
      jenisKelamin: 'L',
      statusDapodik: 'Sinkron',
      dokumenLengkap: true,
    },
    {
      id: '2',
      nisn: '0089481920',
      nik: '3275098765432109',
      nama: 'Siti Nurhaliza',
      kelas: 'X-MIPA 1',
      jenisKelamin: 'P',
      statusDapodik: 'Sinkron',
      dokumenLengkap: true,
    },
    {
      id: '3',
      nisn: '0078192841',
      nik: '3171051203090002',
      nama: 'Budi Santoso',
      kelas: 'X-IPS 2',
      jenisKelamin: 'L',
      statusDapodik: 'Perlu Verifikasi',
      dokumenLengkap: false,
    },
    {
      id: '4',
      nisn: '0091823741',
      nik: '3276081928374619',
      nama: 'Zahra Anindya Putri',
      kelas: 'XI-MIPA 3',
      jenisKelamin: 'P',
      statusDapodik: 'Sinkron',
      dokumenLengkap: true,
    },
  ];

  const filteredStudents = sampleStudents.filter(
    (s) =>
      s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery) ||
      s.nik.includes(searchQuery)
  );

  return (
    <section
      id="features-bento-section"
      className="px-4 sm:px-6 max-w-5xl mx-auto mb-12 sm:mb-16"
    >
      <div className="text-center mb-8">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#006b55]">
          INFRASTRUKTUR DATA HANDAL
        </span>
        <h2
          id="bento-headline"
          className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0b1c30] mt-1"
        >
          Platform Solid untuk Administrasi Sekolah
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Card (Col Span 2) - Manajemen Master Data Terpusat */}
        <div
          id="bento-card-master-data"
          className="md:col-span-2 bg-white border border-[#e2e8f0] rounded-xl p-6 flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-2xs">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#0b1c30] mb-2">
              Manajemen Master Data Terpusat
            </h3>
            <p className="text-sm text-[#45464d] leading-relaxed mb-4">
              Kelola data siswa, guru, dan tenaga kependidikan dalam satu repositori terstruktur. Mudah dicari, mudah difilter, dan siap diekspor kapan saja.
            </p>
          </div>

          {/* Interactive Data Table Visualizer */}
          <div className="mt-4 bg-slate-50/90 rounded-lg border border-[#e2e8f0] p-3 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('Siswa')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'Siswa'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Data Siswa (865)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('Guru')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'Guru'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    Data Guru (48)
                  </span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama / NISN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-slate-200 rounded-md pl-7 pr-2.5 py-1 text-xs outline-none focus:border-blue-500 w-full sm:w-44"
                />
              </div>
            </div>

            {/* Micro Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-200">
                    <th className="pb-1.5 font-semibold">NISN</th>
                    <th className="pb-1.5 font-semibold">Nama Siswa</th>
                    <th className="pb-1.5 font-semibold">Kelas</th>
                    <th className="pb-1.5 font-semibold">Status Dapodik</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-1.5 font-mono text-slate-600">{item.nisn}</td>
                      <td className="py-1.5 font-medium text-slate-800">{item.nama}</td>
                      <td className="py-1.5 text-slate-600">{item.kelas}</td>
                      <td className="py-1.5">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            item.statusDapodik === 'Sinkron'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {item.statusDapodik}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Small Card 1 (Dark) - Keamanan Berlapis */}
        <div
          id="bento-card-keamanan"
          className="bg-[#0f172a] text-white border border-[#1e293b] rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-all group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#1e293b] text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold mb-2">
              Keamanan Berlapis
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Akses berbasis peran (Role-based access). Hanya operator berwenang yang dapat mengubah data final.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Audit Log 256-bit Encrypted</span>
          </div>
        </div>

        {/* Small Card 2 - Siap untuk Dapodik */}
        <div
          id="bento-card-dapodik"
          className="bg-white border border-[#e2e8f0] rounded-xl p-6 flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#0b1c30] mb-2">
              Siap untuk Dapodik
            </h3>
            <p className="text-sm text-[#45464d] leading-relaxed">
              Format ekspor data disesuaikan untuk mempermudah sinkronisasi dengan sistem pelaporan kementerian.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-mono text-slate-600 font-semibold border border-slate-200">
              .XLSX
            </span>
            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-mono text-slate-600 font-semibold border border-slate-200">
              .CSV
            </span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-mono font-semibold border border-blue-100">
              Dapodik Sync API
            </span>
          </div>
        </div>

        {/* Large Card Bottom (Col Span 2) - Validasi Silang Otomatis */}
        <div
          id="bento-card-validasi-silang"
          className="md:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 flex flex-col justify-center items-start shadow-xs hover:border-blue-200 transition-all"
        >
          <span className="px-3 py-1 bg-white text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider mb-3.5 border border-blue-200 shadow-2xs">
            Akurasi Tinggi
          </span>
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold mb-2 text-blue-950">
            Validasi Silang Otomatis
          </h3>
          <p className="text-sm text-blue-900/80 max-w-xl leading-relaxed">
            Sistem secara cerdas mendeteksi inkonsistensi data antar dokumen (misal: beda nama di KK dan Akta) dan menyorotnya untuk diperiksa operator.
          </p>
        </div>
      </div>
    </section>
  );
};
