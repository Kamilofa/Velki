import React from 'react';

interface WaveDividerProps {
  fillColor?: string;
  bgColor?: string;
  flip?: boolean;
  className?: string;
  showAfricanPattern?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fillColor = '#1F3D2E',
  bgColor = 'transparent',
  flip = false,
  className = '',
  showAfricanPattern = true,
}) => {
  return (
    <div className={`relative w-full overflow-hidden leading-none z-10 ${className}`} style={{ backgroundColor: bgColor }}>
      {showAfricanPattern && (
        <div className="w-full h-1.5 flex justify-center items-center overflow-hidden opacity-30">
          <svg className="w-full h-2" preserveAspectRatio="none" viewBox="0 0 1200 8">
            <pattern id="bogolan-band" width="24" height="8" patternUnits="userSpaceOnUse">
              <path d="M0,4 L6,0 L12,4 L18,8 L24,4" fill="none" stroke="#E67A2E" strokeWidth="1.5" />
              <circle cx="12" cy="4" r="1.5" fill="#1F3D2E" />
            </pattern>
            <rect width="1200" height="8" fill="url(#bogolan-band)" />
          </svg>
        </div>
      )}

      <svg
        className={`relative block w-full h-12 md:h-20 ${flip ? 'rotate-180' : ''}`}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`waterGrad-${flip ? 'flip' : 'norm'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="50%" stopColor={fillColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Back water wave */}
        <path
          d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,58.7C672,43,768,21,864,21.3C960,21,1056,43,1152,53.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="rgba(45, 212, 191, 0.25)"
        />

        {/* Front main wave */}
        <path
          d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,32,1152,32C1248,32,1344,53,1392,64L1440,75L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
