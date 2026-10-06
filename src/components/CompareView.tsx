import React from 'react';
import { ORGANELLES } from '../data/cellData';
import { soundManager } from '../utils/audio';
import { Check, X, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

interface CompareViewProps {
  onLearnAnimal?: () => void;
  onLearnPlant?: () => void;
}

export const CompareView: React.FC<CompareViewProps> = ({ onLearnAnimal, onLearnPlant }) => {
  const plantOnlyParts = ORGANELLES.filter((o) => o.foundIn === 'plant-only');
  const sharedParts = ORGANELLES.filter((o) => o.foundIn === 'both');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 shadow-xl text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-400/20 text-rose-300 text-xs font-bold mb-1">
          <span>⚖️ Spot the Difference</span>
        </div>
        <h2 className="font-['Fredoka',sans-serif] text-3xl sm:text-4xl font-bold text-white">
          Animal Cell vs. Plant Cell
        </h2>
        <p className="max-w-2xl mx-auto text-sm text-slate-300">
          How do these two types of cells compare? See what they share and what makes plant cells unique!
        </p>
      </div>

      {/* Side-by-Side Cell Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Animal Cell Card */}
        <div className="bg-slate-800 border-2 border-sky-500/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🐶</span>
              <div>
                <h3 className="font-['Fredoka',sans-serif] font-bold text-2xl text-white">Animal Cell</h3>
                <span className="text-xs text-sky-300 font-semibold">Found in all animals and humans</span>
              </div>
            </div>
            {onLearnAnimal && (
              <button
                onClick={onLearnAnimal}
                className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-transform active:scale-95 cursor-pointer"
              >
                Explore Diagram
              </button>
            )}
          </div>

          <div className="space-y-2 text-sm text-slate-200">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Shape:</strong> Flexible, round, irregular (no stiff wall).
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Outer Layer:</strong> Only a soft, flexible Cell Membrane.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 flex items-start gap-2.5">
              <span className="text-rose-400 font-bold">✕</span>
              <div>
                <strong className="text-rose-300">NO Cell Wall:</strong> Cannot be stiff.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 flex items-start gap-2.5">
              <span className="text-rose-400 font-bold">✕</span>
              <div>
                <strong className="text-rose-300">NO Chloroplasts:</strong> Cannot make food from sunshine; must eat!
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 flex items-start gap-2.5">
              <span className="text-sky-400 font-bold">💧</span>
              <div>
                <strong className="text-white">Vacuoles:</strong> Small and temporary.
              </div>
            </div>
          </div>
        </div>

        {/* Plant Cell Card */}
        <div className="bg-slate-800 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌿</span>
              <div>
                <h3 className="font-['Fredoka',sans-serif] font-bold text-2xl text-white">Plant Cell</h3>
                <span className="text-xs text-emerald-300 font-semibold">Found in trees, flowers, grasses</span>
              </div>
            </div>
            {onLearnPlant && (
              <button
                onClick={onLearnPlant}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-transform active:scale-95 cursor-pointer"
              >
                Explore Diagram
              </button>
            )}
          </div>

          <div className="space-y-2 text-sm text-slate-200">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Shape:</strong> Stiff, rectangular or box-shaped.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-400/50 flex items-start gap-2.5">
              <span className="text-emerald-300 font-bold">⭐</span>
              <div>
                <strong className="text-emerald-300">Has Cell Wall (Plant Only!):</strong> Tough cellulose armour!
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-400/50 flex items-start gap-2.5">
              <span className="text-emerald-300 font-bold">⭐</span>
              <div>
                <strong className="text-emerald-300">Has Chloroplasts (Plant Only!):</strong> Green solar panels that make sugar!
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
              <span className="text-sky-300 font-bold">💧</span>
              <div>
                <strong className="text-white">Giant Central Vacuole:</strong> Huge water tank that keeps the plant tall.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Inner Membrane:</strong> Has Cell Membrane inside the Cell Wall.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Venn Diagram Summary View */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold text-white text-center">
          Venn Comparison: What is Shared vs. Plant Only?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Shared Column */}
          <div className="p-5 rounded-2xl bg-sky-950/40 border border-sky-500/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤝</span>
              <h4 className="font-['Fredoka',sans-serif] font-bold text-lg text-sky-300">
                Shared By Both
              </h4>
            </div>
            <p className="text-xs text-slate-300">
              Both animal and plant cells need these essential organelles:
            </p>
            <div className="space-y-1.5 pt-1">
              {sharedParts.map((item) => (
                <div
                  key={item.id}
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs font-semibold text-white flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </span>
                  <span className="text-[11px] text-amber-300 font-normal">
                    {item.nickname}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Plant Only Column */}
          <div className="p-5 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500 space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <h4 className="font-['Fredoka',sans-serif] font-bold text-lg text-emerald-300">
                Plant Only Special!
              </h4>
            </div>
            <p className="text-xs text-emerald-200">
              Only plant cells have these 2 superhero parts:
            </p>
            <div className="space-y-2 pt-1">
              {plantOnlyParts.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-400 text-xs font-bold text-white shadow-md space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm">
                      <span>{item.emoji}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded">
                      Plant Only
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200 font-normal">
                    ⭐ The {item.nickname}
                  </p>
                  <p className="text-[11px] text-slate-300 font-normal">
                    {item.shortFunction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaway Column */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h4 className="font-['Fredoka',sans-serif] font-bold text-lg text-amber-300">
                  Key Takeaway
                </h4>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Why don&apos;t animal cells have a cell wall or chloroplasts?
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  🐾 <strong>Animals move!</strong> If animals had rigid cell walls, they would be stiff like wood and couldn&apos;t run, bend, or jump.
                </p>
                <p>
                  🍽️ <strong>Animals eat!</strong> Animals don&apos;t need chloroplasts to make sugar from the sun because they eat food to get energy.
                </p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  soundManager.speak(
                    "Remember: Plant cells have a tough Cell Wall and green Chloroplasts. Animals do not have them so they can move flexibly!"
                  );
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-transform active:scale-95 cursor-pointer"
              >
                🔊 Listen to Scientist Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
