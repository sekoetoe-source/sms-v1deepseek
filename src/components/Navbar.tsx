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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Left */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#031534] via-[#091b3a] to-[#00B894] p-[2px] shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#031534] rounded-[10px] flex items-center justify-center text-white font-bold text-lg">
                <span className="text-[#00B894]">B</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#031534] text-lg tracking-tight font-display">
                  SMS Banyubiru
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#00B894]/10 text-[#006b55] border border-[#00B894]/20">
                  v1.0 MVP
                </span>
              </div>
              <p className="text-[11px] text-[#6C757D] font-medium leading-none">
                Sistem Manajemen Sekolah
              </p>
            </div>
          </button>

          {/* Active School Badge */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#E6E6E6] text-xs text-[#44474E]">
            <img 
              src={school.logoUrl} 
              alt={school.name} 
              className="w-5 h-5 object-contain"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <span className="font-semibold text-[#031534]">{school.name}</span>
            <span className="text-[#6C757D]">(NPSN: {school.npsn})</span>
          </div>
        </div>

        {/* Navigation Links for Landing */}
        {currentView === 'landing' ? (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44474E]">
            <a href="#fitur" className="hover:text-[#006b55] transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-[#006b55] transition-colors">Cara Kerja</a>
            <a href="#simulator" className="hover:text-[#006b55] transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00B894]" />
              Demo Interaktif
            </a>
            <a href="#perbandingan" className="hover:text-[#006b55] transition-colors">Keunggulan</a>
            <a href="#harga" className="hover:text-[#006b55] transition-colors">Harga</a>
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
        <div className="flex items-center gap-3">
          {currentView === 'landing' ? (
            <>
              <button 
                onClick={onOpenDemo}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-[#031534] hover:bg-[#EDEEEF] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#006b55]" />
                Demo Video
              </button>
              <button 
                onClick={() => onNavigate('workspace', 'dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#031534] text-white hover:bg-[#1a2a4a] transition-all shadow-sm hover:shadow active:scale-95"
              >
                Masuk ke Workspace
                <ArrowRight className="w-4 h-4 text-[#00B894]" />
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
