import React from 'react';

interface AnimalCellSvgProps {
  selectedId: string | null;
  onSelectOrganelle: (id: string) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

export const AnimalCellSvg: React.FC<AnimalCellSvgProps> = ({
  selectedId,
  onSelectOrganelle,
  hoveredId,
  setHoveredId,
}) => {
  const isSelected = (id: string) => selectedId === id;
  const isHovered = (id: string) => hoveredId === id;

  const getHighlightClass = (id: string) => {
    if (isSelected(id)) {
      return 'stroke-amber-300 stroke-[4px] filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]';
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
        aria-label="Interactive Animal Cell Cartoon Diagram"
      >
        <defs>
          {/* Cytoplasm gradient */}
          <radialGradient id="animalCytoGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#7dd3fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
          </radialGradient>

          {/* Nucleus gradient */}
          <radialGradient id="nucleusGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="60%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#6b21a8" />
          </radialGradient>

          {/* Mitochondria gradient */}
          <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Vacuole gradient */}
          <radialGradient id="animalVacuoleGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </radialGradient>
        </defs>

        {/* 1. CELL MEMBRANE & CYTOPLASM (Flexible Outer Blob) */}
        <g
          onClick={() => onSelectOrganelle('cell-membrane')}
          onMouseEnter={() => setHoveredId('cell-membrane')}
          onMouseLeave={() => setHoveredId(null)}
          className="cursor-pointer group"
        >
          {/* Outer membrane ring */}
          <path
            d="M 300 45 C 445 40, 555 125, 550 270 C 545 425, 450 550, 310 555 C 160 560, 45 455, 45 305 C 45 150, 160 50, 300 45 Z"
            fill="none"
            stroke={isSelected('cell-membrane') ? '#f59e0b' : '#0284c7'}
            strokeWidth={isSelected('cell-membrane') ? '16' : '12'}
            strokeDasharray={isHovered('cell-membrane') ? '8 4' : 'none'}
            className="transition-all duration-300"
          />
        </g>

        {/* Cytoplasm (Inner Fill) */}
        <g
          onClick={() => onSelectOrganelle('cytoplasm')}
          onMouseEnter={() => setHoveredId('cytoplasm')}
          onMouseLeave={() => setHoveredId(null)}
          className="cursor-pointer"
        >
          <path
            d="M 300 52 C 438 48, 542 130, 538 270 C 533 418, 442 542, 308 546 C 168 550, 58 448, 58 305 C 58 158, 168 57, 300 52 Z"
            fill="url(#animalCytoGrad)"
            className={isSelected('cytoplasm') ? 'filter brightness-110 drop-shadow-inner' : ''}
          />
          {/* Cytoplasm friendly bubbles */}
          <circle cx="160" cy="180" r="14" fill="#ffffff" opacity="0.35" />
          <circle cx="190" cy="165" r="7" fill="#ffffff" opacity="0.45" />
          <circle cx="430" cy="400" r="16" fill="#ffffff" opacity="0.35" />
          <circle cx="455" cy="380" r="9" fill="#ffffff" opacity="0.45" />
          <circle cx="180" cy="440" r="12" fill="#ffffff" opacity="0.3" />
        </g>

        {/* 2. ENDOPLASMIC RETICULUM (around nucleus) */}
        <g
          onClick={() => onSelectOrganelle('endoplasmic-reticulum')}
          onMouseEnter={() => setHoveredId('endoplasmic-reticulum')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('endoplasmic-reticulum')}`}
        >
          {/* Folded membrane waves */}
          <path
            d="M 210 220 Q 180 250 200 290 Q 220 330 190 370 Q 160 410 210 420"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 195 240 Q 165 270 185 310 Q 205 350 175 390"
            fill="none"
            stroke="#d97706"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 225 210 Q 250 190 290 195 Q 330 200 350 180"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </g>

        {/* 3. NUCLEUS (Centre Big Boss) */}
        <g
          onClick={() => onSelectOrganelle('nucleus')}
          onMouseEnter={() => setHoveredId('nucleus')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('nucleus')}`}
        >
          {/* Outer nuclear envelope */}
          <circle
            cx="295"
            cy="295"
            r="82"
            fill="url(#nucleusGrad)"
            stroke="#581c87"
            strokeWidth="6"
          />
          {/* Nuclear pores (dots on border) */}
          <circle cx="295" cy="214" r="3.5" fill="#e9d5ff" />
          <circle cx="376" cy="295" r="3.5" fill="#e9d5ff" />
          <circle cx="295" cy="376" r="3.5" fill="#e9d5ff" />
          <circle cx="214" cy="295" r="3.5" fill="#e9d5ff" />
          <circle cx="238" cy="238" r="3.5" fill="#e9d5ff" />
          <circle cx="352" cy="352" r="3.5" fill="#e9d5ff" />
          
          {/* Chromatin threads (DNA squiggle) */}
          <path
            d="M 255 280 Q 275 260 295 285 Q 315 310 335 280"
            fill="none"
            stroke="#e9d5ff"
            strokeWidth="3.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />
          {/* Nucleolus (dark dense core) */}
          <circle cx="310" cy="310" r="30" fill="#4a044e" stroke="#fae8ff" strokeWidth="2.5" />
          <circle cx="318" cy="302" r="7" fill="#ffffff" opacity="0.5" />
          
          {/* Friendly label or face */}
          <text
            x="295"
            y="262"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="14"
            fontWeight="bold"
            className="pointer-events-none drop-shadow"
          >
            NUCLEUS
          </text>
        </g>

        {/* 4. MITOCHONDRIA 1 (Top Right) */}
        <g
          onClick={() => onSelectOrganelle('mitochondria')}
          onMouseEnter={() => setHoveredId('mitochondria')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('mitochondria')}`}
        >
          {/* Outer membrane capsule */}
          <g transform="translate(410, 170) rotate(-30)">
            <rect
              x="-28"
              y="-55"
              width="56"
              height="110"
              rx="28"
              fill="url(#mitoGrad)"
              stroke="#c2410c"
              strokeWidth="4"
            />
            {/* Cristae squiggly folds inside */}
            <path
              d="M -16 -35 Q 16 -35 16 -20 Q -16 -20 -16 -5 Q 16 -5 16 10 Q -16 10 -16 25 Q 16 25 16 40"
              fill="none"
              stroke="#ffedd5"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Energy sparkles */}
            <text x="0" y="5" textAnchor="middle" fontSize="16" fill="#fef08a" className="pointer-events-none font-bold">
              ⚡
            </text>
          </g>
        </g>

        {/* MITOCHONDRIA 2 (Bottom Left) */}
        <g
          onClick={() => onSelectOrganelle('mitochondria')}
          onMouseEnter={() => setHoveredId('mitochondria')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('mitochondria')}`}
        >
          <g transform="translate(180, 430) rotate(45)">
            <rect
              x="-24"
              y="-48"
              width="48"
              height="96"
              rx="24"
              fill="url(#mitoGrad)"
              stroke="#c2410c"
              strokeWidth="4"
            />
            <path
              d="M -14 -30 Q 14 -30 14 -15 Q -14 -15 -14 0 Q 14 0 14 15 Q -14 15 -14 30"
              fill="none"
              stroke="#ffedd5"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* 5. GOLGI BODY (Top Left) */}
        <g
          onClick={() => onSelectOrganelle('golgi-body')}
          onMouseEnter={() => setHoveredId('golgi-body')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('golgi-body')}`}
        >
          <g transform="translate(390, 410) rotate(-15)">
            {/* Curved stacked sacs */}
            <path d="M -45 -18 Q 0 -35 45 -18" fill="none" stroke="#f43f5e" strokeWidth="8" strokeLinecap="round" />
            <path d="M -40 -3 Q 0 -18 40 -3" fill="none" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
            <path d="M -35 12 Q 0 -3 35 12" fill="none" stroke="#be123c" strokeWidth="8" strokeLinecap="round" />
            <path d="M -28 26 Q 0 12 28 26" fill="none" stroke="#9f1239" strokeWidth="7" strokeLinecap="round" />
            {/* Vesicles pinching off */}
            <circle cx="55" cy="-22" r="6" fill="#fb7185" />
            <circle cx="48" cy="18" r="5" fill="#fb7185" />
            <circle cx="-52" cy="-10" r="5.5" fill="#fb7185" />
          </g>
        </g>

        {/* 6. VACUOLES (Small in animal cells) */}
        <g
          onClick={() => onSelectOrganelle('vacuole')}
          onMouseEnter={() => setHoveredId('vacuole')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('vacuole')}`}
        >
          {/* Small animal vacuole 1 */}
          <circle cx="340" cy="140" r="24" fill="url(#animalVacuoleGrad)" stroke="#1d4ed8" strokeWidth="3" />
          <path d="M 333 132 Q 338 126 345 129" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Small animal vacuole 2 */}
          <circle cx="445" cy="295" r="18" fill="url(#animalVacuoleGrad)" stroke="#1d4ed8" strokeWidth="2.5" />
          <circle cx="441" cy="290" r="4" fill="#ffffff" opacity="0.6" />
        </g>

        {/* 7. RIBOSOMES (Tiny protein builders scattered) */}
        <g
          onClick={() => onSelectOrganelle('ribosomes')}
          onMouseEnter={() => setHoveredId('ribosomes')}
          onMouseLeave={() => setHoveredId(null)}
          className={`cursor-pointer ${getHighlightClass('ribosomes')}`}
        >
          {/* Ribosome cluster 1 */}
          <circle cx="160" cy="270" r="4.5" fill="#db2777" />
          <circle cx="172" cy="282" r="4.5" fill="#db2777" />
          <circle cx="155" cy="295" r="4.5" fill="#db2777" />
          <circle cx="178" cy="262" r="4.5" fill="#db2777" />

          {/* Ribosome cluster 2 */}
          <circle cx="280" cy="420" r="4.5" fill="#db2777" />
          <circle cx="295" cy="435" r="4.5" fill="#db2777" />
          <circle cx="312" cy="418" r="4.5" fill="#db2777" />
          <circle cx="265" cy="438" r="4.5" fill="#db2777" />

          {/* Ribosome cluster 3 */}
          <circle cx="350" cy="210" r="4.5" fill="#db2777" />
          <circle cx="365" cy="222" r="4.5" fill="#db2777" />
          <circle cx="375" cy="205" r="4.5" fill="#db2777" />
        </g>

        {/* LABELS & INTERACTIVE PINS */}
        <g className="pointer-events-none">
          {/* Label Pin: Nucleus */}
          <circle
            cx="295"
            cy="295"
            r={isSelected('nucleus') ? '12' : '7'}
            fill={isSelected('nucleus') ? '#fbbf24' : '#ffffff'}
            stroke="#6b21a8"
            strokeWidth="2.5"
            className="animate-pulse"
          />

          {/* Label Pin: Mitochondria */}
          <circle
            cx="410"
            cy="170"
            r={isSelected('mitochondria') ? '10' : '6'}
            fill={isSelected('mitochondria') ? '#fbbf24' : '#ffffff'}
            stroke="#ea580c"
            strokeWidth="2"
          />

          {/* Label Pin: Cell Membrane */}
          <circle
            cx="110"
            cy="140"
            r={isSelected('cell-membrane') ? '10' : '6'}
            fill={isSelected('cell-membrane') ? '#fbbf24' : '#ffffff'}
            stroke="#0284c7"
            strokeWidth="2"
          />

          {/* Label Pin: Vacuole */}
          <circle
            cx="340"
            cy="140"
            r={isSelected('vacuole') ? '10' : '6'}
            fill={isSelected('vacuole') ? '#fbbf24' : '#ffffff'}
            stroke="#1d4ed8"
            strokeWidth="2"
          />
        </g>
      </svg>

      {/* Floating helper badges */}
      <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 pointer-events-none flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
        <span>Tap any organelle to explore!</span>
      </div>
    </div>
  );
};
