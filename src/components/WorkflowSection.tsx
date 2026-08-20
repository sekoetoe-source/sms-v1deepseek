import React from 'react';
import { UploadCloud, Cpu, Database, UserCheck, FileSpreadsheet } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      stepNumber: 'Langkah 1',
      title: 'Unggah Dokumen',
      description:
        'Foto atau scan Kartu Keluarga, Akta, atau Ijazah langsung dari perangkat Anda.',
      icon: UploadCloud,
      dotColor: 'bg-[#2563EB]',
      isCrucial: false,
      align: 'left',
    },
    {
      stepNumber: 'Langkah 2',
      title: 'Ekstraksi OCR AI',
      description:
        'Sistem membaca teks pada dokumen dan mengubahnya menjadi data digital secara otomatis.',
      icon: Cpu,
      dotColor: 'bg-[#2563EB]',
      isCrucial: false,
      align: 'right',
    },
    {
      stepNumber: 'Langkah 3',
      title: 'Pencocokan Master Data',
      description:
        'Data yang diekstrak dicocokkan dengan database siswa yang sudah ada untuk mencegah duplikasi.',
      icon: Database,
      dotColor: 'bg-[#2563EB]',
      isCrucial: false,
      align: 'left',
    },
    {
      stepNumber: 'Langkah 4 - Krusial',
      title: 'Verifikasi Operator',
      description:
        'Operator meninjau data hasil OCR dan membandingkannya dengan gambar dokumen asli (Side-by-side).',
      icon: UserCheck,
      dotColor: 'bg-amber-500',
      isCrucial: true,
      align: 'right',
    },
    {
      stepNumber: 'Langkah 5',
      title: 'Ekspor & Laporan',
      description:
        'Data yang terverifikasi siap diunduh dalam format Excel/PDF atau disiapkan untuk pelaporan eksternal.',
      icon: FileSpreadsheet,
      dotColor: 'bg-emerald-500',
      isCrucial: false,
      align: 'left',
    },
  ];

  return (
    <section
      id="workflow-section"
      className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12 sm:mb-16"
    >
      <div className="text-center mb-8">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#006b55]">
          PROSES OTOMASI DAPODIK
        </span>
        <h2
          id="workflow-headline"
          className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0b1c30] mt-1 mb-1.5"
        >
          Alur Kerja Cerdas SMS
        </h2>
        <p
          id="workflow-subheadline"
          className="text-xs sm:text-sm text-[#45464d] max-w-md mx-auto"
        >
          Pendekatan &quot;Human-in-the-Loop&quot; memastikan akurasi data 100%.
        </p>
      </div>

      {/* Compact 5-Step Process Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;

          return (
            <div
              key={idx}
              id={`workflow-step-${idx + 1}`}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between relative ${
                step.isCrucial
                  ? 'bg-amber-50/90 border-amber-300 shadow-xs ring-1 ring-amber-400/50'
                  : 'bg-white border-[#e2e8f0] shadow-2xs hover:shadow-xs hover:border-blue-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                      step.isCrucial
                        ? 'bg-amber-200/80 text-amber-900 border border-amber-300'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    step.isCrucial ? 'bg-amber-200/60 text-amber-800' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4
                  className={`font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold mb-1 ${
                    step.isCrucial ? 'text-amber-950' : 'text-[#0b1c30]'
                  }`}
                >
                  {step.title}
                </h4>

                <p
                  className={`text-[11px] leading-relaxed ${
                    step.isCrucial ? 'text-amber-900/90' : 'text-[#45464d]'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
