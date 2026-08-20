import React from 'react';
import { 
  Building2, 
  ChevronRight, 
  Layers, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SchoolProfile } from '../types';
import { BanyubiruLogo, BanyubiruBrandLogo } from './BanyubiruLogo';

interface NavbarProps {
  currentView: 'landing' | 'workspace';
  onNavigate: (view: 'landing' | 'workspace', tab?: string) => void;
  school: SchoolProfile;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  school,
  onOpenDemo 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E6E6E6] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Left */}
        <div className="flex items-center">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0 bg-[#020b1a] px-3.5 py-2 rounded-xl border border-[#00E5FF]/40 shadow-2xs group-hover:border-[#00E5FF] group-hover:shadow-[0_0_12px_rgba(0,229,255,0.25)] transition-all"
          >
            <img 
              src={school.banyubiruLogoUrl} 
              alt="Logo 3D Banyubiru" 
              className="h-6 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" 
            />
            <BanyubiruBrandLogo size="sm" />
          </button>
        </div>

        {/* Navigation Links for Landing */}
        {currentView === 'landing' ? (
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-[#031534]">
            <a href="#fitur" className="hover:text-[#006b55] transition-colors py-1">Fitur</a>
            <a href="#workflow-section" className="hover:text-[#006b55] transition-colors py-1">Cara Kerja</a>
            <a href="#human-in-the-loop-section" className="hover:text-[#006b55] transition-colors flex items-center gap-1.5 py-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00B894]" />
              Demo Interaktif
            </a>
            <a href="#features-bento-section" className="hover:text-[#006b55] transition-colors py-1">Keunggulan</a>
            <a href="#faq" className="hover:text-[#006b55] transition-colors py-1">FAQ</a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Mode Workspace Operasional
            </span>
          </div>
        )}

        {/* Actions Right */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'landing' ? (
            <>
              <button 
                onClick={onOpenDemo}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#031534] hover:bg-[#EDEEEF] transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#006b55]" />
                Demo Video
              </button>
              <button 
                onClick={() => onNavigate('workspace', 'dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#031534] text-white hover:bg-[#006b55] transition-all shadow-2xs hover:shadow active:scale-95 whitespace-nowrap"
              >
                <span>Masuk ke Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00B894]" />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#44474E] hover:bg-[#EDEEEF] border border-[#E6E6E6] transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                Halaman Utama
              </button>
              <button 
                onClick={() => onNavigate('workspace', 'documents')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#F97316] text-white hover:bg-[#ea580c] transition-colors shadow-2xs"
              >
                + Upload Dokumen
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};
