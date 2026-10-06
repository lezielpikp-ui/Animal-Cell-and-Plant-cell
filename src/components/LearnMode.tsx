import React, { useState, useEffect } from 'react';
import { ORGANELLES } from '../data/cellData';
import { Organelle, CellType } from '../types/cell';
import { AnimalCellSvg } from './Diagram/AnimalCellSvg';
import { PlantCellSvg } from './Diagram/PlantCellSvg';
import { soundManager } from '../utils/audio';
import { Volume2, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface LearnModeProps {
  initialCellType?: CellType;
  onNavigateToQuiz?: () => void;
  onNavigateToCompare?: () => void;
}

export const LearnMode: React.FC<LearnModeProps> = ({
  initialCellType = 'animal',
  onNavigateToQuiz,
  onNavigateToCompare,
}) => {
  const [currentCellType, setCurrentCellType] = useState<CellType>(initialCellType);
  const [selectedOrganelleId, setSelectedOrganelleId] = useState<string>('nucleus');
  const [hoveredOrganelleId, setHoveredOrganelleId] = useState<string | null>(null);

  // Sync if initial prop changes
  useEffect(() => {
    setCurrentCellType(initialCellType);
  }, [initialCellType]);

  const activeOrganelle = ORGANELLES.find((o) => o.id === selectedOrganelleId) || ORGANELLES[0];

  // Filter available organelles for currently viewed cell type
  const availableOrganelles = ORGANELLES.filter((o) => {
    if (currentCellType === 'animal') {
      return o.foundIn !== 'plant-only';
    }
    return true; // plant cells have all except any animal-only
  });

  const handleSelectOrganelle = (id: string) => {
    soundManager.playPop();
    setSelectedOrganelleId(id);
    const organelle = ORGANELLES.find((o) => o.id === id);
    if (organelle) {
      soundManager.speak(`${organelle.name}! ${organelle.nickname}: ${organelle.shortFunction}`);
    }
  };

  const handleCellTypeChange = (type: CellType) => {
    soundManager.playPop();
    setCurrentCellType(type);
    // If switching to animal cell and currently on plant-only part, switch to nucleus
    if (type === 'animal' && (selectedOrganelleId === 'cell-wall' || selectedOrganelleId === 'chloroplast')) {
      setSelectedOrganelleId('nucleus');
    }
  };

  const handleSpeakActive = () => {
    soundManager.speak(
      `${activeOrganelle.name}. Known as ${activeOrganelle.nickname}. ${activeOrganelle.shortFunction}. ${activeOrganelle.fullDescription}`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Controls: Cell Type Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/80 border border-slate-700 p-3 sm:p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-300">Viewing Cell:</span>
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => handleCellTypeChange('animal')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                currentCellType === 'animal'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>🐶 Animal Cell</span>
            </button>
            <button
              onClick={() => handleCellTypeChange('plant')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                currentCellType === 'plant'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>🌿 Plant Cell</span>
            </button>
          </div>
        </div>

        {/* Helpful Banner about Plant Only parts */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {currentCellType === 'plant' ? (
            <div className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="text-base">🌟</span>
              <span>
                <strong>Notice:</strong> Plant cells have a tough <strong>Cell Wall</strong> and green{' '}
                <strong>Chloroplasts</strong>!
              </span>
            </div>
          ) : (
            <div className="bg-sky-950/70 border border-sky-500/40 text-sky-300 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>
                Animal cells are soft &amp; flexible because they have <strong>NO cell wall</strong>!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-slate-800/40 border border-slate-700/80 rounded-3xl p-4 sm:p-6 backdrop-blur-sm shadow-xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-700/60 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {currentCellType === 'animal' ? '🐶' : '🌿'}
              </span>
              <h2 className="font-['Fredoka',sans-serif] font-bold text-xl text-white">
                {currentCellType === 'animal' ? 'Cartoon Animal Cell' : 'Cartoon Plant Cell'}
              </h2>
            </div>
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              Click any part!
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full flex justify-center py-2">
            {currentCellType === 'animal' ? (
              <AnimalCellSvg
                selectedId={selectedOrganelleId}
                onSelectOrganelle={handleSelectOrganelle}
                hoveredId={hoveredOrganelleId}
                setHoveredId={setHoveredOrganelleId}
              />
            ) : (
              <PlantCellSvg
                selectedId={selectedOrganelleId}
                onSelectOrganelle={handleSelectOrganelle}
                hoveredId={hoveredOrganelleId}
                setHoveredId={setHoveredOrganelleId}
              />
            )}
          </div>

          {/* Quick Clickable Buttons Grid underneath diagram */}
          <div className="w-full mt-4 pt-4 border-t border-slate-700/60">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Or Choose Part Directly:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {availableOrganelles.map((organelle) => {
                const isCurrent = organelle.id === selectedOrganelleId;
                const isPlantOnly = organelle.foundIn === 'plant-only';

                return (
                  <button
                    key={organelle.id}
                    onClick={() => handleSelectOrganelle(organelle.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md scale-105'
                        : isPlantOnly
                        ? 'bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 hover:bg-emerald-900/60'
                        : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{organelle.emoji}</span>
                    <span>{organelle.name}</span>
                    {isPlantOnly && <span className="text-[10px] text-emerald-300 font-bold">🌿</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Organelle Inspector Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            {/* Ambient decorative tint */}
            <div
              className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: activeOrganelle.color }}
            />

            {/* Top row: Title, Pronunciation, Audio */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-700/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{activeOrganelle.emoji}</span>
                  <div>
                    <h3 className="font-['Fredoka',sans-serif] font-bold text-2xl sm:text-3xl text-white">
                      {activeOrganelle.name}
                    </h3>
                    {activeOrganelle.pronunciation && (
                      <p className="text-xs text-slate-400 italic">
                        Sounds like: &ldquo;{activeOrganelle.pronunciation}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Read Aloud Button */}
              <button
                onClick={handleSpeakActive}
                className="p-2.5 rounded-xl bg-slate-700 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-bold"
                title="Hear explanation read aloud"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">Listen</span>
              </button>
            </div>

            {/* Organelle Nickname & Function - Required standard format */}
            <div className="my-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-2">
              <div className="text-xs uppercase tracking-wider font-extrabold text-amber-400 flex items-center gap-1.5">
                <span>⭐ NICKNAME</span>
              </div>
              <div className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-amber-300">
                {activeOrganelle.nickname}
              </div>
              <p className="text-sm font-medium text-slate-200 leading-relaxed pt-1 border-t border-slate-800">
                👉 <strong>The {activeOrganelle.nickname}</strong> — {activeOrganelle.shortFunction}
              </p>
            </div>

            {/* Found In badge (HIGHLIGHT PLANT ONLY!) */}
            <div className="mb-4">
              {activeOrganelle.foundIn === 'plant-only' ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border-2 border-emerald-500/70 text-emerald-200 flex items-start gap-3 shadow-md animate-pulse">
                  <span className="text-2xl">🌿</span>
                  <div className="space-y-0.5">
                    <p className="font-bold text-emerald-300 text-sm">
                      PLANT CELL SPECIALTY! (Plant Only)
                    </p>
                    <p className="text-xs text-emerald-200/90 leading-snug">
                      Animal cells DO NOT have this part! Only plant cells have {activeOrganelle.name}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 flex items-center gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>
                    Found in <strong>Both</strong> Animal and Plant cells!
                  </span>
                </div>
              )}
            </div>

            {/* Detailed Kid-Friendly Description */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                What it does inside the cell:
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-850 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                {activeOrganelle.fullDescription}
              </p>
            </div>

            {/* Fun Science Fact */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-2.5">
              <span className="text-base">💡</span>
              <div>
                <strong className="text-amber-300">Fun Fact: </strong>
                <span>{activeOrganelle.funFact}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Prompts */}
          <div className="flex items-center gap-3">
            {onNavigateToQuiz && (
              <button
                onClick={onNavigateToQuiz}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Take the Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onNavigateToCompare && (
              <button
                onClick={onNavigateToCompare}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">Compare Both</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
