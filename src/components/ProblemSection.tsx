import React from 'react';
import { TimerReset, AlertCircle, FolderX } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      id: 'problem-waktu-terbuang',
      icon: TimerReset,
      iconBg: 'bg-red-50 text-red-600 border border-red-100',
      title: 'Waktu Terbuang',
      description:
        'Berjam-jam dihabiskan hanya untuk entry data manual ke sistem sekolah.',
    },
    {
      id: 'problem-rentan-kesalahan',
      icon: AlertCircle,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      title: 'Rentan Kesalahan',
      description:
        'Salah ketik NIK atau NISN yang berakibat fatal pada pelaporan Dapodik.',
    },
    {
      id: 'problem-arsip-tercecer',
      icon: FolderX,
      iconBg: 'bg-slate-100 text-slate-600 border border-slate-200',
      title: 'Arsip Tercecer',
      description:
        'Dokumen fisik sulit dicari kembali saat dibutuhkan untuk verifikasi silang.',
    },
  ];

  return (
    <section
      id="problem-statement-section"
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 sm:mb-16"
    >
      <div className="text-center mb-6">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#006b55]">
          TANTANGAN FISIK
        </span>
        <h2
          id="problem-headline"
          className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0b1c30] mt-1 mb-2"
        >
          Input Manual Memperlambat Kinerja
        </h2>
        <p
          id="problem-subheadline"
          className="text-xs sm:text-sm text-[#45464d] max-w-xl mx-auto leading-relaxed"
        >
          Tinggalkan proses mengetik ulang data siswa dari kertas. Biarkan sistem yang membaca, Anda yang memvalidasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={item.id}
              className="p-6 bg-white border border-[#e2e8f0] rounded-xl shadow-xs text-center hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg sm:text-xl font-bold text-[#0b1c30] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
