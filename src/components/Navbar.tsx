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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Left */}
        <div className="flex items-center gap-3.5">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group focus:outline-none shrink-0 bg-[#020b1a] px-3.5 py-1.5 rounded-xl border border-[#00E5FF]/40 shadow-xs group-hover:border-[#00E5FF] group-hover:shadow-[0_0_12px_rgba(0,229,255,0.25)] transition-all"
          >
            <img 
              src={school.banyubiruLogoUrl} 
              alt="Logo 3D Banyubiru" 
              className="h-7 w-auto object-contain rounded-md group-hover:scale-105 transition-transform" 
            />
            <BanyubiruBrandLogo size="sm" />
          </button>
        </div>

        {/* Navigation Links for Landing */}
        {currentView === 'landing' ? (
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-[#44474E]">
            <a href="#fitur" className="hover:text-[#006b55] transition-colors">Fitur</a>
            <a href="#workflow-section" className="hover:text-[#006b55] transition-colors">Cara Kerja</a>
            <a href="#human-in-the-loop-section" className="hover:text-[#006b55] transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00B894]" />
              Demo Interaktif
            </a>
            <a href="#features-bento-section" className="hover:text-[#006b55] transition-colors">Keunggulan</a>
            <a href="#faq" className="hover:text-[#006b55] transition-colors">FAQ</a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Mode Workspace Operasional
            </span>
          </div>
        )}

        {/* Actions Right */}
        <div className="flex items-center gap-2.5">
          {currentView === 'landing' ? (
            <>
              <button 
                onClick={onOpenDemo}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#031534] hover:bg-[#EDEEEF] transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#006b55]" />
                Demo Video
              </button>
              <button 
                onClick={() => onNavigate('workspace', 'dashboard')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold bg-[#031534] text-white hover:bg-[#1a2a4a] transition-all shadow-xs hover:shadow active:scale-95 whitespace-nowrap"
              >
                Masuk ke Workspace
                <ArrowRight className="w-3.5 h-3.5 text-[#00B894]" />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#44474E] hover:bg-[#EDEEEF] border border-[#E6E6E6] transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                Halaman Utama
              </button>
              <button 
                onClick={() => onNavigate('workspace', 'documents')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#F97316] text-white hover:bg-[#ea580c] transition-colors shadow-sm"
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
