import React, { useState } from 'react';

interface SchoolLogoProps {
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Smp99LogoSvg: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer Pentagon Border */}
    <path 
      d="M250 15 L480 160 L390 470 L110 470 L20 160 Z" 
      fill="#0088E8" 
      stroke="#031534" 
      strokeWidth="14" 
      strokeLinejoin="round" 
    />
    <path 
      d="M250 25 L470 165 L383 460 L117 460 L30 165 Z" 
      fill="#0088E8" 
      stroke="#FFFFFF" 
      strokeWidth="6" 
      strokeLinejoin="round" 
    />

    {/* Curved Text Arc: SEKOLAH MENENGAH PERTAMA NEGERI */}
    <path id="textArcTop" d="M 65,190 A 210,210 0 0,1 435,190" fill="none" />
    <text fill="#FFFFFF" fontSize="21" fontWeight="bold" letterSpacing="1.5">
      <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
        SEKOLAH MENENGAH PERTAMA NEGERI
      </textPath>
    </text>

    {/* Outer Red Ring / Arch */}
    <path d="M 75 250 C 75 120 425 120 425 250 C 425 310 75 310 75 250 Z" stroke="#DC2626" strokeWidth="12" fill="none" />
    
    {/* Rainbow Arch */}
    <path d="M 105 240 C 105 140 395 140 395 240" stroke="#DC2626" strokeWidth="16" fill="none" strokeLinecap="round" />
    <path d="M 121 242 C 121 155 379 155 379 242" stroke="#FFFFFF" strokeWidth="14" fill="none" />
    <path d="M 135 244 C 135 170 365 170 365 244" stroke="#DC2626" strokeWidth="12" fill="none" />

    {/* Yellow Crowns/Wings on sides */}
    <path d="M 95 240 L 145 225 L 130 255 L 155 265 Z" fill="#FFD500" stroke="#031534" strokeWidth="3" />
    <path d="M 405 240 L 355 225 L 370 255 L 345 265 Z" fill="#FFD500" stroke="#031534" strokeWidth="3" />

    {/* Open Book behind Monas */}
    <path d="M 180 170 C 215 160 245 175 250 185 C 255 175 285 160 320 170 V 250 C 285 240 255 255 250 260 C 245 255 215 240 180 250 Z" fill="#FFFFFF" stroke="#031534" strokeWidth="6" />
    {/* Page Lines */}
    <path d="M 195 185 H 235 M 195 200 H 235 M 195 215 H 235 M 195 230 H 235" stroke="#031534" strokeWidth="3" />
    <path d="M 265 185 H 305 M 265 200 H 305 M 265 215 H 305 M 265 230 H 305" stroke="#031534" strokeWidth="3" />

    {/* Monumen Nasional (Monas) Obelisk */}
    {/* Shaft */}
    <path d="M 235 140 L 230 340 H 270 L 265 140 Z" fill="#E5E7EB" stroke="#031534" strokeWidth="5" />
    {/* Top Flame */}
    <path d="M 250 95 C 235 115 240 135 250 140 C 260 135 265 115 250 95 Z" fill="#FFD500" stroke="#DC2626" strokeWidth="4" />
    {/* Base Pedestal */}
    <path d="M 205 340 L 195 360 H 305 L 295 340 Z" fill="#D1D5DB" stroke="#031534" strokeWidth="5" />
    <path d="M 180 360 L 165 400 H 335 L 320 360 Z" fill="#E5E7EB" stroke="#031534" strokeWidth="5" />
    <path d="M 210 400 A 40 40 0 0 1 290 400 Z" fill="#031534" />

    {/* Big Yellow Numbers 99 */}
    <text x="140" y="325" fill="#FFD500" stroke="#031534" strokeWidth="6" fontSize="110" fontWeight="900" fontFamily="sans-serif">9</text>
    <text x="270" y="325" fill="#FFD500" stroke="#031534" strokeWidth="6" fontSize="110" fontWeight="900" fontFamily="sans-serif">9</text>

    {/* Bottom Text: JAKARTA */}
    <text x="250" y="442" fill="#FFFFFF" fontSize="38" fontWeight="900" textAnchor="middle" letterSpacing="6" fontFamily="sans-serif">
      JAKARTA
    </text>
  </svg>
);

export const SchoolLogo: React.FC<SchoolLogoProps> = ({ 
  logoUrl, 
  size = 'md',
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }[size];

  return (
    <div className={`flex items-center justify-center flex-shrink-0 ${sizeClasses} ${className}`}>
      {logoUrl && !imageError ? (
        <img 
          src={logoUrl} 
          alt="Logo SMPN 99 Jakarta" 
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <Smp99LogoSvg />
      )}
    </div>
  );
};
