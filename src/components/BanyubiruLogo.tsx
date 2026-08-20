import React, { useState } from 'react';

interface BanyubiruLogoProps {
  banyubiruLogoUrl?: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const BanyubiruLogoSvg: React.FC<{ className?: string; showText?: boolean }> = ({ 
  className = "w-full h-full",
  showText = false
}) => (
  <svg viewBox="0 0 800 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* 3D Ribbon Gradients */}
      <linearGradient id="ribbonTopGrad" x1="250" y1="40" x2="520" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="50%" stopColor="#00A3FF" />
        <stop offset="100%" stopColor="#0052D4" />
      </linearGradient>

      <linearGradient id="ribbonBottomGrad" x1="270" y1="180" x2="540" y2="340" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0052D4" />
        <stop offset="50%" stopColor="#0088FF" />
        <stop offset="100%" stopColor="#00E5FF" />
      </linearGradient>

      {/* Shine Highlight */}
      <linearGradient id="ribbonShine" x1="400" y1="40" x2="480" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Dynamic Pixel Accent Blocks on Left */}
    <rect x="200" y="140" width="22" height="22" rx="4" fill="#0088FF" opacity="0.9" />
    <rect x="230" y="115" width="18" height="18" rx="3.5" fill="#00E5FF" opacity="0.85" />
    <rect x="245" y="145" width="26" height="26" rx="5" fill="#00E5FF" opacity="0.95" />
    <rect x="215" y="180" width="32" height="32" rx="6" fill="#00E5FF" />
    <rect x="260" y="195" width="20" height="20" rx="4" fill="#0088FF" opacity="0.9" />
    <rect x="235" y="230" width="18" height="18" rx="3.5" fill="#00E5FF" opacity="0.8" />

    {/* Ribbon 3D B Shape Upper Loop */}
    <path 
      d="M 320 40 H 510 C 585 40 635 85 635 150 C 635 210 580 250 500 255 L 340 160 H 500 C 535 160 555 145 555 125 C 555 105 535 95 500 95 H 320 Z" 
      fill="url(#ribbonTopGrad)" 
    />
    
    {/* Ribbon 3D B Shape Lower Loop */}
    <path 
      d="M 340 160 L 500 255 C 590 260 645 305 645 375 C 645 445 585 490 490 490 H 320 C 310 490 305 480 305 470 V 380 C 305 370 310 360 320 360 H 490 C 530 360 560 345 560 315 C 560 285 530 270 490 270 H 320 Z" 
      fill="url(#ribbonBottomGrad)" 
    />

    {/* Shine Highlight Overlay */}
    <path d="M 320 40 H 510 C 585 40 635 85 635 150 C 635 170 620 190 600 205 Z" fill="url(#ribbonShine)" opacity="0.4" />

    {showText && (
      <>
        {/* Brand Text: BANYUBIRU */}
        <g fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="76" letterSpacing="12">
          <text x="50" y="440">B</text>
          
          {/* Custom Letter A with Cyan Triangle Accent */}
          <g transform="translate(115, 375)">
            <path d="M 5 65 L 35 0 L 65 65 H 48 L 35 34 L 22 65 Z" fill="#FFFFFF" />
            <polygon points="35,38 23,65 47,65" fill="#00E5FF" />
          </g>

          <text x="195" y="440">NYUBIRU</text>
        </g>

        {/* Tagline: — DIGITAL SERVICES — */}
        <g fill="#00E5FF" fontFamily="sans-serif" fontWeight="700" fontSize="26" letterSpacing="10">
          <line x1="60" y1="485" x2="190" y2="485" stroke="#00E5FF" strokeWidth="3" />
          <text x="215" y="493">DIGITAL SERVICES</text>
          <line x1="610" y1="485" x2="740" y2="485" stroke="#00E5FF" strokeWidth="3" />
        </g>
      </>
    )}
  </svg>
);

export const BanyubiruLogo: React.FC<BanyubiruLogoProps> = ({ 
  banyubiruLogoUrl, 
  size = 'md',
  className = '',
  showText = false
}) => {
  const [imageError, setImageError] = useState(false);

  // Default to Banyubiru Digital Services official logo URL
  const targetUrl = banyubiruLogoUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfmbXYOYq3g1iSHP98eNxY2qkfRsivX4ioYt8vlctnDVL5FJlRPoS7LZdFlNRNAVlrrzFYQjEKKN6VZn0vw_cRj2lSS5iFBvCiEcL6QdQ5VfDy1l_StC_u345yNc_PrW1PlxbpCbO9gt_jdR6dxtD3U1rFQcMgdlO1K-AB4nsqKkGIzYflXYsN2ffmznEuVR5fzYuOr7-LUN3C2dh1EdBcnEaxSDAqtgdOH_TzDDQozQc2EZfUd65-a1pI2LXNQ2gJu-k';

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl p-1',
    md: 'w-10 h-10 rounded-2xl p-1.5',
    lg: 'w-14 h-14 rounded-2xl p-2',
    xl: 'w-20 h-20 rounded-3xl p-3'
  }[size];

  return (
    <div className={`bg-[#031534] border-2 border-[#00E5FF]/60 shadow-lg shadow-[#00E5FF]/20 overflow-hidden flex items-center justify-center flex-shrink-0 ${sizeClasses} ${className}`}>
      {!imageError ? (
        <img 
          src={targetUrl} 
          alt="Logo Banyubiru Digital Services" 
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <BanyubiruLogoSvg showText={showText} />
      )}
    </div>
  );
};
