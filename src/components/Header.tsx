import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, HelpCircle, Puzzle, Table2, Layers, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type NavTab = 'home' | 'learn' | 'quiz' | 'match' | 'table' | 'compare';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
  speechEnabled,
  onToggleSpeech,
}) => {
  const handleNav = (tab: NavTab) => {
    soundManager.playPop();
    onSelectTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-emerald-400 to-sky-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🔬
            </div>
          </div>
          <div>
            <div className="font-['Fredoka',sans-serif] font-bold text-lg sm:text-xl tracking-wide bg-gradient-to-r from-amber-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent flex items-center gap-1.5">
              Cell Explorer
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Primary Science Adventure</p>
          </div>
        </button>

        {/* Navigation buttons */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'home'
                ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden md:inline">Home</span>
          </button>

          <button
            onClick={() => handleNav('learn')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'learn'
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Learn Mode</span>
          </button>

          <button
            onClick={() => handleNav('match')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'match'
                ? 'bg-purple-500 text-white shadow-sm shadow-purple-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Match-Up</span>
          </button>

          <button
            onClick={() => handleNav('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'quiz'
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Quiz (10 Qs)</span>
          </button>

          <button
            onClick={() => handleNav('table')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'table'
                ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Table2 className="w-4 h-4" />
            <span className="hidden sm:inline">Reference</span>
            <span className="sm:hidden">Table</span>
          </button>

          <button
            onClick={() => handleNav('compare')}
            className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
              currentTab === 'compare'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Compare Animal vs Plant cells"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden lg:inline">Compare</span>
          </button>
        </nav>

        {/* Audio toggles */}
        <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
          <button
            onClick={onToggleSpeech}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
              speechEnabled
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
            title={speechEnabled ? 'Read-aloud Voice: ON' : 'Read-aloud Voice: OFF'}
            aria-label="Toggle voice narration"
          >
            <span className="text-sm">🗣️</span>
          </button>

          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
              soundEnabled
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/60'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
            title={soundEnabled ? 'Game Sounds: ON' : 'Game Sounds: MUTED'}
            aria-label="Toggle sound effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
