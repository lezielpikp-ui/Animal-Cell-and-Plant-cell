import React from 'react';
import { Sparkles, ArrowRight, BookOpen, HelpCircle, Puzzle, Table2, Layers, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { NavTab } from './Header';

interface HomeScreenProps {
  onStartLearn: (cellType: 'animal' | 'plant') => void;
  onNavigate: (tab: NavTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartLearn, onNavigate }) => {
  const handleAnimalClick = () => {
    soundManager.playPop();
    soundManager.speak("Animal Cell! Let's explore soft and flexible animal cells!");
    onStartLearn('animal');
  };

  const handlePlantClick = () => {
    soundManager.playPop();
    soundManager.speak("Plant Cell! Let's explore sturdy plant cells with green chloroplasts and cell walls!");
    onStartLearn('plant');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Hero Welcome Banner */}
      <div className="relative text-center space-y-4 overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/80 via-slate-800/40 to-slate-900/60 border border-slate-700 p-6 sm:p-10 shadow-2xl">
        {/* Playful background decorative blurs */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold tracking-wide">
          <Sparkles className="w-4 h-4 animate-bounce text-amber-400" />
          <span>Interactive Science Lab for Primary Scientists</span>
        </div>

        {/* Bright, colourful title */}
        <h1 className="font-['Fredoka',sans-serif] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent drop-shadow-md">
          Cell Explorer! 🔬
        </h1>

        {/* Exact Short Welcome Quote Required */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl font-medium text-slate-200 leading-relaxed">
          &ldquo;Hi Scientist! Let’s explore the amazing parts that make up living cells — and what each one does!&rdquo;
        </p>

        {/* Quick highlight banner: Plant only preview */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
            <span className="text-emerald-400">🌿</span>
            <span className="font-semibold text-white">Cell Wall</span> &amp; <span className="font-semibold text-white">Chloroplasts</span> = Plant Only!
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
            <span className="text-amber-400">⚡</span>
            <span>Learn every organelle by its fun nickname</span>
          </span>
        </div>
      </div>

      {/* Two Big Animated Cell Choice Buttons */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold text-white">
            Choose Your Cell to Explore:
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Tap either cell to jump into the interactive cartoon diagram!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* ANIMAL CELL BUTTON */}
          <button
            onClick={handleAnimalClick}
            className="group relative overflow-hidden rounded-3xl p-6 sm:p-8 text-left transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/20 active:scale-[0.98] border-2 border-sky-400/40 hover:border-sky-400 bg-gradient-to-br from-sky-950/70 via-slate-900 to-indigo-950/80 cursor-pointer"
          >
            {/* Ambient corner glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl group-hover:bg-sky-400/30 transition-all pointer-events-none" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                  <span>Flexible &amp; Round</span>
                </div>
                <h3 className="font-['Fredoka',sans-serif] text-3xl sm:text-4xl font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
                  Animal Cell 🐶
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Inside animals and humans! Round, squishy, and flexible with NO cell wall. Controls everything with a mighty Nucleus.
                </p>
              </div>

              {/* Cartoon Animal Cell Graphic Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-sky-500/20 border border-sky-400/40 p-2 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                  <ellipse cx="50" cy="50" rx="42" ry="38" fill="#38bdf8" opacity="0.85" stroke="#0284c7" strokeWidth="4" />
                  <circle cx="50" cy="50" r="18" fill="#9333ea" stroke="#6b21a8" strokeWidth="3" />
                  <circle cx="53" cy="52" r="7" fill="#4a044e" />
                  <ellipse cx="68" cy="35" rx="8" ry="5" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
                  <ellipse cx="32" cy="65" rx="8" ry="5" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
                  <circle cx="65" cy="68" r="6" fill="#3b82f6" />
                </svg>
              </div>
            </div>

            {/* Organelles Preview list */}
            <div className="mt-6 pt-4 border-t border-sky-800/40 flex items-center justify-between">
              <div className="text-xs text-sky-200/80 space-x-1">
                <span className="font-medium">Includes:</span>
                <span>Nucleus · Mitochondria · Cell Membrane · Cytoplasm · Vacuoles</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center font-bold group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* PLANT CELL BUTTON */}
          <button
            onClick={handlePlantClick}
            className="group relative overflow-hidden rounded-3xl p-6 sm:p-8 text-left transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/20 active:scale-[0.98] border-2 border-emerald-400/40 hover:border-emerald-400 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-teal-950/80 cursor-pointer"
          >
            {/* Ambient corner glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-400/30 transition-all pointer-events-none" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <span>Stiff &amp; Boxy Shape</span>
                </div>
                <h3 className="font-['Fredoka',sans-serif] text-3xl sm:text-4xl font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                  Plant Cell 🌿
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Inside trees, flowers, and grass! Packed with a tough Cell Wall, green Chloroplast solar panels, and a giant water vacuole.
                </p>
              </div>

              {/* Cartoon Plant Cell Graphic Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 p-2 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-inner">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                  {/* Thick wall */}
                  <rect x="8" y="8" width="84" height="84" rx="14" fill="#15803d" stroke="#166534" strokeWidth="4" />
                  <rect x="15" y="15" width="70" height="70" rx="10" fill="#86efac" stroke="#0284c7" strokeWidth="2" />
                  {/* Big vacuole */}
                  <ellipse cx="50" cy="55" rx="22" ry="18" fill="#3b82f6" opacity="0.9" />
                  {/* Chloroplasts */}
                  <ellipse cx="30" cy="30" rx="9" ry="6" fill="#10b981" stroke="#065f46" strokeWidth="1.5" />
                  <ellipse cx="70" cy="35" rx="9" ry="6" fill="#10b981" stroke="#065f46" strokeWidth="1.5" />
                  <circle cx="32" cy="65" r="10" fill="#9333ea" />
                </svg>
              </div>
            </div>

            {/* Organelles Preview list */}
            <div className="mt-6 pt-4 border-t border-emerald-800/40 flex items-center justify-between">
              <div className="text-xs text-emerald-200/80 space-x-1">
                <span className="font-semibold text-emerald-300">Special Parts:</span>
                <span>Cell Wall 🏰 · Chloroplasts ☀️ · Giant Vacuole 💧</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Exciting Game Modes & Features Grid */}
      <div className="space-y-4">
        <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold text-white flex items-center gap-2">
          <span>More Exciting Challenges</span>
          <span className="text-amber-400">✨</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Quiz Challenge */}
          <button
            onClick={() => {
              soundManager.playPop();
              onNavigate('quiz');
            }}
            className="group p-5 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-sky-400 hover:bg-slate-800 text-left transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                🏆
              </div>
              <h4 className="font-['Fredoka',sans-serif] font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                10-Q Quiz Challenge
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Test your knowledge with 10 questions! Instant feedback: &ldquo;Great job! ✅&rdquo; or &ldquo;Try again 💡&rdquo;.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-400 group-hover:underline">
              <span>Start Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Match-Up Game */}
          <button
            onClick={() => {
              soundManager.playPop();
              onNavigate('match');
            }}
            className="group p-5 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-purple-400 hover:bg-slate-800 text-left transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                🧩
              </div>
              <h4 className="font-['Fredoka',sans-serif] font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                Match-Up Game
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Match each cell part to its cool nickname and job! Supports drag-and-drop or tap-to-match.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:underline">
              <span>Play Match-Up</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Quick Reference Table */}
          <button
            onClick={() => {
              soundManager.playPop();
              onNavigate('table');
            }}
            className="group p-5 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-amber-400 hover:bg-slate-800 text-left transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                📋
              </div>
              <h4 className="font-['Fredoka',sans-serif] font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                Reference Table
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean study chart with organelle names, nicknames, jobs, and clear &ldquo;(plant only)&rdquo; labels.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:underline">
              <span>View Table</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Compare Animal vs Plant */}
          <button
            onClick={() => {
              soundManager.playPop();
              onNavigate('compare');
            }}
            className="group p-5 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-rose-400 hover:bg-slate-800 text-left transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                ⚖️
              </div>
              <h4 className="font-['Fredoka',sans-serif] font-bold text-lg text-white group-hover:text-rose-300 transition-colors">
                Spot the Difference
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                See animal and plant cells side by side to quickly master what they share and how they differ!
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rose-400 group-hover:underline">
              <span>Compare Cells</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
