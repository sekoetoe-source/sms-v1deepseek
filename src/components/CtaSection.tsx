import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onOpenDemo: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenDemo }) => {
  return (
    <section
      id="cta-section"
      className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto mb-24 sm:mb-28"
    >
      <div
        id="cta-card-container"
        className="bg-[#0b1c30] rounded-2xl p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-xl border border-slate-800"
      >
        {/* Background decorative glowing element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-[#2563EB] blur-[100px] opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-400 blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2
            id="cta-headline"
            className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight"
          >
            Tingkatkan Efisiensi Administrasi Sekolah Anda
          </h2>

          <p
            id="cta-subheadline"
            className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-normal"
          >
            Jadilah pionir digitalisasi pendidikan. Coba Sistem Manajemen Sekolah hari ini dan rasakan bedanya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="btn-cta-coba-sms"
              onClick={onOpenDemo}
              className="bg-[#2563EB] text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-blue-600 active:scale-98 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Coba SMS Sekarang</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
