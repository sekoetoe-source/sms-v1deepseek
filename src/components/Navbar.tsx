import React from 'react';
import { 
  Building2, 
  ChevronRight, 
  Layers, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  LogIn
} from 'lucide-react';
import { SchoolProfile } from '../types';

interface NavbarProps {
  currentView: 'landing' | 'workspace';
  onNavigate: (view: 'landing' | 'workspace', tab?: string, mode?: 'real' | 'dummy') => void;
  school: SchoolProfile;
  onOpenDemo: () => void;
  onOpenLogin: () => void;
  workspaceMode?: 'real' | 'dummy';
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  school,
  onOpenDemo,
  onOpenLogin,
  workspaceMode = 'real'
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E6E6E6] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Left (EcoGrant Style) */}
        <div className="flex items-center">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group focus:outline-none shrink-0 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#020b1a] flex items-center justify-center p-1.5 shadow-2xs border border-[#00E5FF]/30 group-hover:border-[#00E5FF] transition-all">
              <img 
                src={school.banyubiruLogoUrl} 
                alt="Banyubiru Logo" 
                className="h-full w-auto object-contain rounded" 
              />
            </div>
            <div>
              <div className="flex items-center gap-1 font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-[#0b1c30] tracking-tight group-hover:text-[#134e4a] transition-colors leading-none">
                <span>Banyubiru</span>
                <span className="text-[#00B894]">.ai</span>
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#6C757D] block mt-1">
                SCHOOL DATA &amp; OCR ENGINE
              </span>
            </div>
          </button>
        </div>

        {/* Center Navigation Links (EcoGrant Style) */}
        {currentView === 'landing' ? (
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold text-[#0b1c30]">
            <a href="#features-bento-section" className="hover:text-[#134e4a] transition-colors py-1">
              Keunggulan
            </a>
            <a href="#fitur" className="hover:text-[#134e4a] transition-colors py-1">
              Modul Fitur
            </a>
            <a href="#workflow-section" className="hover:text-[#134e4a] transition-colors py-1">
              Cara Kerja
            </a>
            <a href="#problem-section" className="hover:text-[#134e4a] transition-colors py-1">
              Solusi Peran
            </a>
            <a href="#human-in-the-loop-section" className="hover:text-[#134e4a] transition-colors py-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00B894]" />
              <span>Live Simulator</span>
            </a>
            <a href="#faq" className="hover:text-[#134e4a] transition-colors py-1">
              FAQ
            </a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-3 text-xs">
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold border ${
              workspaceMode === 'real'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                workspaceMode === 'real' ? 'bg-emerald-600' : 'bg-amber-600'
              }`}></span>
              <span>{workspaceMode === 'real' ? 'Mode Data Real (Operator Sekolah)' : 'Mode Uji Coba Gratis (Data Dummy)'}</span>
            </span>
          </div>
        )}

        {/* Actions Right (EcoGrant Style: "Masuk" + "Coba Gratis →") */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'landing' ? (
            <>
              {/* Masuk (Operator Real Data Login) */}
              <button 
                onClick={onOpenLogin}
                className="text-xs font-extrabold text-[#0b1c30] hover:text-[#134e4a] px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Masuk
              </button>

              {/* Coba Gratis → (Forest Green EcoGrant Button for Dummy Simulation) */}
              <button 
                onClick={() => onNavigate('workspace', 'dashboard', 'dummy')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold bg-[#134e4a] hover:bg-[#0f766e] text-white transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <span>Coba Gratis</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#44474E] hover:bg-[#EDEEEF] border border-[#E6E6E6] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              <span>Halaman Depan</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
