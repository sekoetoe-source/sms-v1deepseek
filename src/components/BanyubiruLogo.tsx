import React, { useState } from 'react';

interface BanyubiruLogoProps {
  banyubiruLogoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BanyubiruLogo: React.FC<BanyubiruLogoProps> = ({ 
  banyubiruLogoUrl, 
  size = 'md',
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg p-1',
    md: 'w-10 h-10 rounded-xl p-1.5',
    lg: 'w-12 h-12 rounded-2xl p-2'
  }[size];

  const svgIcon = (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="banyubiruGrad1" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
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
        fill="url(#banyubiruGrad1)" 
      />
    </svg>
  );

  return (
    <div className={`bg-[#031534] border border-[#00E5FF]/30 shadow-sm overflow-hidden flex items-center justify-center flex-shrink-0 ${sizeClasses} ${className}`}>
      {banyubiruLogoUrl && !imageError ? (
        <img 
          src={banyubiruLogoUrl} 
          alt="Banyubiru Digital Services" 
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        svgIcon
      )}
    </div>
  );
};
