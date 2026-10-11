import React from 'react';

export type FlagCountryCode = 'US' | 'EU' | 'GB' | 'LU' | 'MT';

interface CircularFlagProps {
  code: FlagCountryCode | string;
  className?: string;
  size?: number;
}

export const CircularFlag: React.FC<CircularFlagProps> = ({
  code,
  className = "w-6 h-6",
  size
}) => {
  const normalized = (code || '').toUpperCase();
  const style = size ? { width: size, height: size } : undefined;

  switch (normalized) {
    case 'US':
    case 'USA':
    case 'USD':
      return (
        <div
          style={style}
          className={`relative rounded-full overflow-hidden shrink-0 shadow-md ring-1 ring-white/20 select-none ${className}`}
          title="United States"
        >
          <svg viewBox="0 0 36 36" className="w-full h-full block">
            <rect width="36" height="36" fill="#B22234" />
            {/* White stripes */}
            <rect y="2.77" width="36" height="2.77" fill="#FFFFFF" />
            <rect y="8.31" width="36" height="2.77" fill="#FFFFFF" />
            <rect y="13.85" width="36" height="2.77" fill="#FFFFFF" />
            <rect y="19.38" width="36" height="2.77" fill="#FFFFFF" />
            <rect y="24.92" width="36" height="2.77" fill="#FFFFFF" />
            <rect y="30.46" width="36" height="2.77" fill="#FFFFFF" />
            {/* Blue canton */}
            <rect width="16" height="19.38" fill="#3C3B6E" />
            {/* Stars grid */}
            <g fill="#FFFFFF" fontSize="3" fontFamily="sans-serif">
              <circle cx="3.2" cy="3.5" r="0.9" />
              <circle cx="8" cy="3.5" r="0.9" />
              <circle cx="12.8" cy="3.5" r="0.9" />
              <circle cx="5.6" cy="6.8" r="0.9" />
              <circle cx="10.4" cy="6.8" r="0.9" />
              <circle cx="3.2" cy="10" r="0.9" />
              <circle cx="8" cy="10" r="0.9" />
              <circle cx="12.8" cy="10" r="0.9" />
              <circle cx="5.6" cy="13.2" r="0.9" />
              <circle cx="10.4" cy="13.2" r="0.9" />
              <circle cx="3.2" cy="16.2" r="0.9" />
              <circle cx="8" cy="16.2" r="0.9" />
              <circle cx="12.8" cy="16.2" r="0.9" />
            </g>
          </svg>
        </div>
      );

    case 'EU':
    case 'EUR':
      return (
        <div
          style={style}
          className={`relative rounded-full overflow-hidden shrink-0 shadow-md ring-1 ring-white/20 select-none ${className}`}
          title="European Union"
        >
          <svg viewBox="0 0 36 36" className="w-full h-full block">
            <rect width="36" height="36" fill="#003399" />
            {/* 12 Yellow Stars in a Circle */}
            <g fill="#FFCC00" transform="translate(18, 18)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const r = 11;
                const cx = r * Math.sin(rad);
                const cy = -r * Math.cos(rad);
                return (
                  <polygon
                    key={angle}
                    points="0,-1.4 0.4,-0.4 1.4,-0.4 0.6,0.2 0.9,1.2 0,0.6 -0.9,1.2 -0.6,0.2 -1.4,-0.4 -0.4,-0.4"
                    transform={`translate(${cx.toFixed(2)}, ${cy.toFixed(2)})`}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      );

    case 'GB':
    case 'UK':
    case 'GBP':
      return (
        <div
          style={style}
          className={`relative rounded-full overflow-hidden shrink-0 shadow-md ring-1 ring-white/20 select-none ${className}`}
          title="United Kingdom"
        >
          <svg viewBox="0 0 36 36" className="w-full h-full block">
            <clipPath id="uk-circle">
              <circle cx="18" cy="18" r="18" />
            </clipPath>
            <g clipPath="url(#uk-circle)">
              {/* Blue field */}
              <rect width="36" height="36" fill="#012169" />
              {/* White diagonal cross (St Andrew) */}
              <line x1="0" y1="0" x2="36" y2="36" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="36" y1="0" x2="0" y2="36" stroke="#FFFFFF" strokeWidth="6" />
              {/* Red diagonal cross (St Patrick) */}
              <line x1="0" y1="0" x2="36" y2="36" stroke="#C8102E" strokeWidth="2" />
              <line x1="36" y1="0" x2="0" y2="36" stroke="#C8102E" strokeWidth="2" />
              {/* White St George Cross */}
              <rect x="13.5" y="0" width="9" height="36" fill="#FFFFFF" />
              <rect x="0" y="13.5" width="36" height="9" fill="#FFFFFF" />
              {/* Red St George Cross */}
              <rect x="15.5" y="0" width="5" height="36" fill="#C8102E" />
              <rect x="0" y="15.5" width="36" height="5" fill="#C8102E" />
            </g>
          </svg>
        </div>
      );

    case 'LU':
    case 'LUX':
      return (
        <div
          style={style}
          className={`relative rounded-full overflow-hidden shrink-0 shadow-md ring-1 ring-white/20 select-none ${className}`}
          title="Luxembourg"
        >
          <svg viewBox="0 0 36 36" className="w-full h-full block">
            <rect width="36" height="12" fill="#EA141D" />
            <rect y="12" width="36" height="12" fill="#FFFFFF" />
            <rect y="24" width="36" height="12" fill="#00A1DE" />
          </svg>
        </div>
      );

    case 'MT':
    case 'MLT':
      return (
        <div
          style={style}
          className={`relative rounded-full overflow-hidden shrink-0 shadow-md ring-1 ring-white/20 select-none ${className}`}
          title="Malta"
        >
          <svg viewBox="0 0 36 36" className="w-full h-full block">
            <rect width="18" height="36" fill="#FFFFFF" />
            <rect x="18" width="18" height="36" fill="#CF142B" />
            {/* George Cross Symbol */}
            <circle cx="6" cy="6" r="3" fill="#A5ACAF" />
            <rect x="5.2" y="3.5" width="1.6" height="5" fill="#E2E5E7" />
            <rect x="3.5" y="5.2" width="5" height="1.6" fill="#E2E5E7" />
          </svg>
        </div>
      );

    default:
      return (
        <div
          style={style}
          className={`relative rounded-full overflow-hidden shrink-0 bg-neutral-800 border border-white/20 flex items-center justify-center font-bold text-xs text-white ${className}`}
        >
          {normalized.slice(0, 2)}
        </div>
      );
  }
};
