import React, { useState } from 'react';

interface BanyubiruLogoProps {
  banyubiruLogoUrl?: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BanyubiruLogo: React.FC<BanyubiruLogoProps> = ({ 
  banyubiruLogoUrl, 
  logoUrl,
  size = 'md',
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);

  // Default to SMPN 99 emblem logo as requested
  const targetUrl = logoUrl || banyubiruLogoUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJO8zuNAD9yXEqcvzF2069FJ-a-MOC3S8AFfLi_ydPe8MW3yBo8Ujzbpnu6PjE8ma0ji_QBHsS5ZyAOfI-TxcQADApxn5HydYOGhZH9jkW3FMX90SxRhT6mjmV9gruNPgEY8RTxGlGAwDi2HnHteKW3lz1iENxPZzCohbO_OlgY2A8D2Khc-DOohcvxW6FMVaHz0q8d7o3H3HafAa3jVHpCDbdbDpq8wz5jxRtJGqy37e0REy-CzH_cZFYbq3AP8fVw78';

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl p-1',
    md: 'w-10 h-10 rounded-2xl p-1.5',
    lg: 'w-12 h-12 rounded-2xl p-2'
  }[size];

  const emblemSvg = (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-0.5">
      {/* Blue Pentagon Emblem background */}
      <path 
        d="M50 6 L92 30 V72 L50 94 L8 72 V30 Z" 
        fill="#0284C7" 
        stroke="#00E5FF" 
        strokeWidth="2.5"
      />
      {/* Rainbow arch */}
      <path d="M20 44 C20 28 80 28 80 44" stroke="#EF4444" strokeWidth="4" fill="none" />
      <path d="M24 46 C24 33 76 33 76 46" stroke="#FFFFFF" strokeWidth="3" fill="none" />
      <path d="M28 48 C28 38 72 38 72 48" stroke="#EAB308" strokeWidth="3" fill="none" />
      
      {/* White Tut Wuri Handayani Monument */}
      <path d="M47 38 H53 V68 H47 Z" fill="#FFFFFF" />
      <path d="M42 68 H58 V72 H42 Z" fill="#FFFFFF" />
      
      {/* Yellow 9 9 Numbers */}
      <text x="32" y="66" fill="#FACC15" fontSize="16" fontWeight="bold" fontFamily="sans-serif">9</text>
      <text x="56" y="66" fill="#FACC15" fontSize="16" fontWeight="bold" fontFamily="sans-serif">9</text>
    </svg>
  );

  return (
    <div className={`bg-[#031534] border-2 border-[#00E5FF]/40 shadow-md overflow-hidden flex items-center justify-center flex-shrink-0 ${sizeClasses} ${className}`}>
      {!imageError ? (
        <img 
          src={targetUrl} 
          alt="Logo SMPN 99 Jakarta" 
          className="w-full h-full object-contain p-0.5"
          onError={() => setImageError(true)}
        />
      ) : (
        emblemSvg
      )}
    </div>
  );
};
