import React from 'react';

interface PlantCellSvgProps {
  selectedId: string | null;
  onSelectOrganelle: (id: string) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

export const PlantCellSvg: React.FC<PlantCellSvgProps> = ({
  selectedId,
  onSelectOrganelle,
  hoveredId,
  setHoveredId,
}) => {
  const isSelected = (id: string) => selectedId === id;
  const isHovered = (id: string) => hoveredId === id;

  const getHighlightClass = (id: string) => {
    if (isSelected(id)) {
      return 'stroke-amber-300 stroke-[4px] filter drop-shadow-[0_0_14px_rgba(251,191,36,0.9)]';
    }
    if (isHovered(id)) {
      return 'stroke-white stroke-[3px] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]';
    }
    return 'transition-all duration-200 cursor-pointer hover:filter hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]';
  };

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto select-none">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full overflow-visible"
        aria-label="Interactive Plant Cell Cartoon Diagram"
      >
        <defs>
          {/* Plant cytoplasm gradient */}
          <radialGradient id="plantCytoGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#bbf7d0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0.98" />
          </radialGradient>

          {/* Plant Central Vacuole Gradient */}
          <radialGradient id="plantVacuoleGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </radialGradient>

          {/* Chloroplast disc gradient */}
          <linearGradient id="chloroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="60%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Nucleus gradient */}
          <radialGradient id="plantNucleusGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="70%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#6b21a8" />
          </radialGradient>

          {/* Mitochondria gradient */}
          <linearGradient id="plantMitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Cell wall texture pattern */}
          <pattern id="cellWallPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#15803d" />
            <line x1="0" y1="0" x2="20" y2="0" stroke="#166534" strokeWidth="2" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#166534" strokeWidth="2" />
            <line x1="10" y1="0" x2="10" y2="10" stroke="#166534" strokeWidth="2" />
            <line x1="0" y1="10" x2="0" y2="20" stroke="#166534" strokeWidth="2" />
            <line x1="20" y1="10" x2="20" y2="20" stroke="#166534" strokeWidth="2" />
          </pattern>
        </defs>

        {/* 1. CELL WALL (OUTER RIGID BOX - PLANT ONLY!) */}
        <g
          onClick={() => onSelectOrganelle('cell-wall')}
          onMouseEnter={() => setHoveredId('cell-wall')}
          onMouseLeave={() => setHoveredId(null)}
          className="cursor-pointer group"
        >
          {/* Thick outer wall */}
          <rect
            x="40"
            y="40"
            width="520"
            height="520"
            rx="45"
            fill="#15803d"
            stroke={isSelected('cell-wall') ? '#f59e0b' : '#14532d'}
            strokeWidth={isSelected('cell-wall') ? '16' : '10'}
            className="transition-all duration-300"
          />
          {/* Decorative brick pattern inlay */}
          <rect
            x="50"
            y="50"
            width="500"
            height="500"
            rx="36"
            fill="#16a34a"
            stroke="#22c55e"
            strokeWidth="3"
            opacity="0.9"
          />
        </g>

        {/* 2. CELL MEMBRANE (INNER THIN BORDER) */}
        <g
          onClick={() => onSelectOrganelle('cell-membrane')}
          onMouseEnter={() => setHoveredId('cell-membrane')}
          onMouseLeave={() => setHoveredId(null)}
          className="cursor-pointer"
        >
          <rect
            x="75"
            y="75"
            width="450"
            height="450"
            rx="28"
            fill="none"
            stroke={isSelected('cell-membrane') ? '#fbbf24' : '#0284c7'}
            strokeWidth={isSelected('cell-membrane') ? '10' : '6'}
            strokeDasharray={isHovered('cell-membrane') ? '8 4' : 'none'}
            className="transition-all duration-200"
          />
        </g>

        {/* 3. CYTOPLASM (Squishy green cushion fill) */}
        <g
          onClick={() => onSelectOrganelle('cytoplasm')}
          onMouseEnter={() => setHoveredId('cytoplasm')}
          onMouseLeave={() => setHoveredId(null)}
          className="cursor-pointer"
        >
          <rect
            x="81"
            y="81"
            width="438"
            height="438"
            rx="24"
            fill="url(#plantCytoGrad)"
            className={isSelected('cytoplasm') ? 'filter brightness-110' : ''}
          />
        </g>

        {/* 4. LARGE CENTRAL VACUOLE (MASSIVE IN PLANT CELL) */}
        <g
          onClick={() => onSelectOrganelle('vacuole')}
          onMouseEnter={() => setHoveredId('vacuole')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('vacuole')}`}
        >
          <path
            d="M 230 150 C 360 140, 440 180, 460 300 C 480 410, 410 470, 290 480 C 180 490, 150 410, 160 310 C 170 200, 180 160, 230 150 Z"
            fill="url(#plantVacuoleGrad)"
            stroke="#1d4ed8"
            strokeWidth="5"
            opacity="0.9"
          />
          {/* Water reflection ripples */}
          <path
            d="M 240 200 Q 300 180 370 210"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 260 230 Q 320 220 350 240"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />
          <text
            x="310"
            y="325"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="16"
            fontWeight="bold"
            className="pointer-events-none drop-shadow"
          >
            💧 CENTRAL VACUOLE
          </text>
          <text
            x="310"
            y="348"
            textAnchor="middle"
            fill="#e0f2fe"
            fontSize="12"
            fontWeight="bold"
            className="pointer-events-none drop-shadow"
          >
            (Giant Water Storage!)
          </text>
        </g>

        {/* 5. NUCLEUS (Pushed slightly to the side by big vacuole) */}
        <g
          onClick={() => onSelectOrganelle('nucleus')}
          onMouseEnter={() => setHoveredId('nucleus')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('nucleus')}`}
        >
          <circle
            cx="175"
            cy="175"
            r="65"
            fill="url(#plantNucleusGrad)"
            stroke="#581c87"
            strokeWidth="5"
          />
          {/* Nucleolus */}
          <circle cx="185" cy="185" r="22" fill="#4a044e" stroke="#fae8ff" strokeWidth="2" />
          <circle cx="190" cy="180" r="5" fill="#ffffff" opacity="0.6" />
          <text
            x="175"
            y="152"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="13"
            fontWeight="bold"
            className="pointer-events-none drop-shadow"
          >
            NUCLEUS
          </text>
        </g>

        {/* 6. ENDOPLASMIC RETICULUM (around nucleus) */}
        <g
          onClick={() => onSelectOrganelle('endoplasmic-reticulum')}
          onMouseEnter={() => setHoveredId('endoplasmic-reticulum')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('endoplasmic-reticulum')}`}
        >
          <path
            d="M 125 125 Q 110 160 115 200 Q 120 240 135 255"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 140 105 Q 180 90 220 100"
            fill="none"
            stroke="#d97706"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>

        {/* 7. CHLOROPLAST 1 (Top Right - PLANT ONLY!) */}
        <g
          onClick={() => onSelectOrganelle('chloroplast')}
          onMouseEnter={() => setHoveredId('chloroplast')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('chloroplast')}`}
        >
          <g transform="translate(420, 125) rotate(20)">
            {/* Oval disc */}
            <ellipse cx="0" cy="0" rx="42" ry="24" fill="url(#chloroGrad)" stroke="#065f46" strokeWidth="3.5" />
            {/* Thylakoid stacks (green coin stacks) */}
            <g stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round">
              <line x1="-24" y1="-8" x2="-14" y2="-8" />
              <line x1="-24" y1="0" x2="-14" y2="0" />
              <line x1="-24" y1="8" x2="-14" y2="8" />

              <line x1="-5" y1="-10" x2="5" y2="-10" />
              <line x1="-5" y1="-2" x2="5" y2="-2" />
              <line x1="-5" y1="6" x2="5" y2="6" />

              <line x1="14" y1="-8" x2="24" y2="-8" />
              <line x1="14" y1="0" x2="24" y2="0" />
              <line x1="14" y1="8" x2="24" y2="8" />
            </g>
          </g>
        </g>

        {/* CHLOROPLAST 2 (Bottom Left - PLANT ONLY!) */}
        <g
          onClick={() => onSelectOrganelle('chloroplast')}
          onMouseEnter={() => setHoveredId('chloroplast')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('chloroplast')}`}
        >
          <g transform="translate(130, 430) rotate(-25)">
            <ellipse cx="0" cy="0" rx="42" ry="24" fill="url(#chloroGrad)" stroke="#065f46" strokeWidth="3.5" />
            <g stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round">
              <line x1="-24" y1="-8" x2="-14" y2="-8" />
              <line x1="-24" y1="0" x2="-14" y2="0" />
              <line x1="-24" y1="8" x2="-14" y2="8" />

              <line x1="-5" y1="-10" x2="5" y2="-10" />
              <line x1="-5" y1="-2" x2="5" y2="-2" />
              <line x1="-5" y1="6" x2="5" y2="6" />

              <line x1="14" y1="-8" x2="24" y2="-8" />
              <line x1="14" y1="0" x2="24" y2="0" />
              <line x1="14" y1="8" x2="24" y2="8" />
            </g>
          </g>
        </g>

        {/* CHLOROPLAST 3 (Bottom Right - PLANT ONLY!) */}
        <g
          onClick={() => onSelectOrganelle('chloroplast')}
          onMouseEnter={() => setHoveredId('chloroplast')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('chloroplast')}`}
        >
          <g transform="translate(450, 440) rotate(35)">
            <ellipse cx="0" cy="0" rx="42" ry="24" fill="url(#chloroGrad)" stroke="#065f46" strokeWidth="3.5" />
            <g stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round">
              <line x1="-20" y1="-5" x2="-10" y2="-5" />
              <line x1="-20" y1="3" x2="-10" y2="3" />
              <line x1="-2" y1="-7" x2="8" y2="-7" />
              <line x1="-2" y1="1" x2="8" y2="1" />
              <line x1="16" y1="-5" x2="26" y2="-5" />
              <line x1="16" y1="3" x2="26" y2="3" />
            </g>
          </g>
        </g>

        {/* 8. MITOCHONDRIA (Plant Mitochondria) */}
        <g
          onClick={() => onSelectOrganelle('mitochondria')}
          onMouseEnter={() => setHoveredId('mitochondria')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('mitochondria')}`}
        >
          <g transform="translate(450, 270) rotate(-45)">
            <rect
              x="-22"
              y="-44"
              width="44"
              height="88"
              rx="22"
              fill="url(#plantMitoGrad)"
              stroke="#c2410c"
              strokeWidth="3.5"
            />
            <path
              d="M -12 -26 Q 12 -26 12 -13 Q -12 -13 -12 0 Q 12 0 12 13 Q -12 13 -12 26"
              fill="none"
              stroke="#ffedd5"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* 9. GOLGI BODY */}
        <g
          onClick={() => onSelectOrganelle('golgi-body')}
          onMouseEnter={() => setHoveredId('golgi-body')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('golgi-body')}`}
        >
          <g transform="translate(190, 390) rotate(10)">
            <path d="M -35 -12 Q 0 -24 35 -12" fill="none" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
            <path d="M -30 0 Q 0 -12 30 0" fill="none" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
            <path d="M -25 12 Q 0 0 25 12" fill="none" stroke="#be123c" strokeWidth="6" strokeLinecap="round" />
            <circle cx="40" cy="-14" r="4.5" fill="#fb7185" />
            <circle cx="-38" cy="4" r="4" fill="#fb7185" />
          </g>
        </g>

        {/* 10. RIBOSOMES */}
        <g
          onClick={() => onSelectOrganelle('ribosomes')}
          onMouseEnter={() => setHoveredId('ribosomes')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('ribosomes')}`}
        >
          <circle cx="110" cy="280" r="4" fill="#db2777" />
          <circle cx="125" cy="295" r="4" fill="#db2777" />
          <circle cx="105" cy="310" r="4" fill="#db2777" />

          <circle cx="310" cy="115" r="4" fill="#db2777" />
          <circle cx="325" cy="125" r="4" fill="#db2777" />
          <circle cx="340" cy="110" r="4" fill="#db2777" />
        </g>

        {/* INTERACTIVE PINS */}
        <g className="pointer-events-none">
          {/* Cell Wall Tag */}
          <circle
            cx="60"
            cy="60"
            r={isSelected('cell-wall') ? '10' : '6'}
            fill={isSelected('cell-wall') ? '#fbbf24' : '#ffffff'}
            stroke="#15803d"
            strokeWidth="2.5"
            className="animate-pulse"
          />

          {/* Chloroplast Tag */}
          <circle
            cx="420"
            cy="125"
            r={isSelected('chloroplast') ? '10' : '6'}
            fill={isSelected('chloroplast') ? '#fbbf24' : '#ffffff'}
            stroke="#047857"
            strokeWidth="2"
          />
        </g>
      </svg>

      {/* Floating Plant-Only Notice */}
      <div className="absolute top-2 right-2 bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-emerald-200 pointer-events-none shadow-lg flex items-center gap-2">
        <span className="text-sm">🌿</span>
        <span>
          <strong className="text-white">Cell Wall</strong> &{' '}
          <strong className="text-white">Chloroplasts</strong> are Plant Only!
        </span>
      </div>

      <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 pointer-events-none flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Tap any plant organelle to explore!</span>
      </div>
    </div>
  );
};
