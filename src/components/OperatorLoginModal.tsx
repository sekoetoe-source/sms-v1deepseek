import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  User, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound
} from 'lucide-react';
import { SchoolProfile } from '../types';

interface OperatorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (mode: 'real') => void;
  school: SchoolProfile;
}

export const OperatorLoginModal: React.FC<OperatorLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  school
}) => {
  const [username, setUsername] = useState('operator.smpn99');
  const [password, setPassword] = useState('dapodik2026');
  const [npsn, setNpsn] = useState(school.npsn || '20102589');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('real');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#E6E6E6] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E6E6] bg-[#020b1a] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00B894]/20 border border-[#00B894]/40 flex items-center justify-center text-[#00B894]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Masuk Operator Sekolah
              </h3>
              <p className="text-[11px] text-slate-400">
                Akses Workspace Resmi &amp; Data Real Dapodik
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* School Badge Pill */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#031534] flex items-center justify-center text-white shrink-0 font-bold text-xs">
              99
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900 truncate">{school.name}</div>
              <div className="text-[11px] text-slate-500 font-mono">NPSN: {school.npsn} • {school.city}</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
              Data Real
            </span>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">NPSN / Identitas Satuan Pendidikan</label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={npsn}
                onChange={(e) => setNpsn(e.target.value)}
                placeholder="20102589"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Username Operator / NIP</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="operator.smpn99"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Kata Sandi Aplikasi</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#134e4a] hover:bg-[#0f766e] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memverifikasi Akses Operator...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Workspace Data Real</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300" />
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-1 text-[11px] text-slate-500">
            Masuk dengan kredensial operator sekolah resmi untuk mengelola arsip, verifikasi dokumen, dan sinkronisasi Web Service Dapodik secara langsung.
          </div>

        </form>

      </div>
    </div>
  );
};
