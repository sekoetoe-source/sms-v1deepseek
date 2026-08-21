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
  KeyRound,
  Mail
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
  const [email, setEmail] = useState('antonius.yudhabpurnomo@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
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

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('real');
      onClose();
    }, 500);
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

          {/* Quick Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-3 bg-white border-2 border-slate-200 hover:border-slate-400 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center gap-2.5 transition-all shadow-2xs hover:bg-slate-50 cursor-pointer active:scale-98"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="truncate">Masuk sebagai <strong className="text-slate-900">antonius.yudhabpurnomo@gmail.com</strong></span>
          </button>

          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-3 text-[10px] uppercase font-bold text-slate-400">atau login email &amp; NPSN</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Email Akun / Akun Auth</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="antonius.yudhabpurnomo@gmail.com"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">NPSN Satuan Pendidikan</label>
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
            <label className="font-bold text-slate-800 block mb-1">Kata Sandi</label>
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
                  <span>Mengautentikasi Akun Operator...</span>
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
            Terhubung ke server lokal Dapodik SMPN 99 Jakarta untuk verifikasi dokumen dan pelaporan resmi.
          </div>

        </form>

      </div>
    </div>
  );
};
