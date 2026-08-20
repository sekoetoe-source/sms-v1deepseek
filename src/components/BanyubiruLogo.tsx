import React, { useState } from 'react';

interface BanyubiruLogoProps {
  banyubiruLogoUrl?: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BanyubiruLogo: React.FC<BanyubiruLogoProps> = ({ 
  banyubiruLogoUrl, 
  size = 'md',
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);

  // Default to Banyubiru Digital Services logo URL
  const targetUrl = banyubiruLogoUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfmbXYOYq3g1iSHP98eNxY2qkfRsivX4ioYt8vlctnDVL5FJlRPoS7LZdFlNRNAVlrrzFYQjEKKN6VZn0vw_cRj2lSS5iFBvCiEcL6QdQ5VfDy1l_StC_u345yNc_PrW1PlxbpCbO9gt_jdR6dxtD3U1rFQcMgdlO1K-AB4nsqKkGIzYflXYsN2ffmznEuVR5fzYuOr7-LUN3C2dh1EdBcnEaxSDAqtgdOH_TzDDQozQc2EZfUd65-a1pI2LXNQ2gJu-k';

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl p-1',
    md: 'w-10 h-10 rounded-2xl p-1.5',
    lg: 'w-12 h-12 rounded-2xl p-2'
  }[size];

  const banyubiruRibbonSvg = (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-0.5">
      <defs>
        <linearGradient id="banyubiruGradGlow" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="50%" stopColor="#0088FF" />
          <stop offset="100%" stopColor="#0044CC" />
        </linearGradient>
      </defs>
      
      {/* Pixel accent blocks on left */}
      <rect x="18" y="32" width="7" height="7" rx="1.5" fill="#00E5FF" opacity="0.9" />
      <rect x="27" y="41" width="7" height="7" rx="1.5" fill="#00E5FF" opacity="0.8" />
      <rect x="18" y="50" width="7" height="7" rx="1.5" fill="#00E5FF" opacity="0.75" />
      <rect x="27" y="59" width="6" height="6" rx="1" fill="#0088FF" opacity="0.85" />

      {/* Ribbon 3D B shape */}
      <path 
        d="M38 22 H66 C78 22 86 28 86 38 C86 46 79 51 71 53 C82 56 88 63 88 74 C88 85 78 90 64 90 H38 C34 90 32 88 32 84 V28 C32 24 34 22 38 22 Z M46 32 V46 H64 C70 46 74 43 74 39 C74 35 70 32 64 32 H46 Z M46 56 V80 H65 C72 80 76 76 76 68 C76 60 72 56 65 56 H46 Z" 
        fill="url(#banyubiruGradGlow)" 
      />
    </svg>
  );

  return (
    <div className={`bg-[#031534] border-2 border-[#00E5FF]/60 shadow-lg shadow-[#00E5FF]/20 overflow-hidden flex items-center justify-center flex-shrink-0 ${sizeClasses} ${className}`}>
      {!imageError ? (
        <img 
          src={targetUrl} 
          alt="Logo Banyubiru Digital Services" 
          className="w-full h-full object-contain p-0.5"
          onError={() => setImageError(true)}
        />
      ) : (
        banyubiruRibbonSvg
      )}
    </div>
  );
};
