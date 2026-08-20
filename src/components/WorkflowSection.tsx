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
      className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto mb-24 sm:mb-28"
    >
      <div className="text-center mb-12">
        <h2
          id="workflow-headline"
          className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1c30] mb-3"
        >
          Alur Kerja Cerdas SMS
        </h2>
        <p
          id="workflow-subheadline"
          className="text-sm sm:text-base text-[#45464d] max-w-lg mx-auto"
        >
          Pendekatan &quot;Human-in-the-Loop&quot; memastikan akurasi 100%.
        </p>
      </div>

      <div className="relative border-l-2 border-blue-200 ml-4 md:ml-0 md:left-1/2 md:-translate-x-[1px] space-y-8 md:space-y-12">
        {steps.map((step, idx) => {
          const isLeft = step.align === 'left';
          const Icon = step.icon;

          return (
            <div
              key={idx}
              id={`workflow-step-${idx + 1}`}
              className={`relative pl-8 md:pl-0 w-full md:w-1/2 ${
                isLeft
                  ? 'md:pr-10 md:text-right md:mr-auto'
                  : 'md:ml-auto md:pl-10 md:text-left'
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-[-9px] ${
                  isLeft ? 'md:left-auto md:right-[-9px]' : 'md:left-[-9px]'
                } top-2 w-4 h-4 rounded-full ${step.dotColor} ring-4 ring-white shadow-xs z-10`}
              ></div>

              {/* Step Card */}
              <div
                className={`p-5 rounded-xl border transition-all ${
                  step.isCrucial
                    ? 'bg-amber-50/90 border-amber-300 shadow-sm'
                    : 'bg-white border-[#e2e8f0] shadow-xs hover:shadow-md hover:border-blue-200'
                }`}
              >
                <div
                  className={`flex items-center gap-2 mb-2 ${
                    isLeft ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-semibold rounded ${
                      step.isCrucial
                        ? 'bg-amber-200/80 text-amber-900 border border-amber-300'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      step.isCrucial ? 'text-amber-700' : 'text-blue-600'
                    }`}
                  />
                </div>

                <h4
                  className={`font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold mb-1.5 ${
                    step.isCrucial ? 'text-amber-950' : 'text-[#0b1c30]'
                  }`}
                >
                  {step.title}
                </h4>

                <p
                  className={`text-sm leading-relaxed ${
                    step.isCrucial ? 'text-amber-900/90' : 'text-[#45464d]'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
