import React, { useState } from 'react';
import { ORGANELLES } from '../data/cellData';
import { Organelle } from '../types/cell';
import { soundManager } from '../utils/audio';
import { Volume2, Search, Filter, Sparkles, Printer, CheckCircle2 } from 'lucide-react';

export const ReferenceTable: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'both' | 'plant-only'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOrganelles = ORGANELLES.filter((item) => {
    if (filterType === 'both' && item.foundIn !== 'both') return false;
    if (filterType === 'plant-only' && item.foundIn !== 'plant-only') return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.nickname.toLowerCase().includes(q) ||
        item.shortFunction.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSpeakRow = (item: Organelle) => {
    soundManager.speak(
      `${item.name}. Known as The ${item.nickname}. ${item.shortFunction}. ${
        item.foundIn === 'plant-only' ? 'Found only in plant cells.' : 'Found in both plant and animal cells.'
      }`
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Table Header Card */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
            <span>📋 Primary Science Reference</span>
          </div>
          <h2 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold text-white">
            Cell Parts Quick Reference Table
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Easy study guide with cell organelle names, nicknames, functions, and clear plant-only tags.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors flex items-center gap-2 text-xs font-bold shrink-0 cursor-pointer"
          title="Print or Save Reference Sheet"
        >
          <Printer className="w-4 h-4" />
          <span>Print Guide</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-800/60 border border-slate-700 p-3 rounded-2xl">
        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search organelle or nickname..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => {
              soundManager.playPop();
              setFilterType('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterType === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            All Parts ({ORGANELLES.length})
          </button>
          <button
            onClick={() => {
              soundManager.playPop();
              setFilterType('both');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterType === 'both'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            Found in Both 🐶🌿
          </button>
          <button
            onClick={() => {
              soundManager.playPop();
              setFilterType('plant-only');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterType === 'plant-only'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            Plant Only 🌿
          </button>
        </div>
      </div>

      {/* Clean, Easy-Read Table */}
      <div className="overflow-x-auto rounded-3xl border-2 border-slate-700 bg-slate-800/90 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-700 text-xs font-extrabold uppercase tracking-wider text-slate-300">
              <th className="py-4 px-4 sm:px-6">Cell Part (Organelle)</th>
              <th className="py-4 px-4 sm:px-6">Nickname</th>
              <th className="py-4 px-4 sm:px-6">Function / What It Does</th>
              <th className="py-4 px-4 sm:px-6">Found In</th>
              <th className="py-4 px-4 text-center">Audio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60 text-sm">
            {filteredOrganelles.map((organelle) => {
              const isPlantOnly = organelle.foundIn === 'plant-only';

              return (
                <tr
                  key={organelle.id}
                  className={`transition-colors hover:bg-slate-750/50 ${
                    isPlantOnly ? 'bg-emerald-950/20' : ''
                  }`}
                >
                  {/* Organelle Name & Icon */}
                  <td className="py-4 px-4 sm:px-6 font-bold text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                        {organelle.emoji}
                      </div>
                      <div>
                        <div className="font-['Fredoka',sans-serif] text-base sm:text-lg flex items-center gap-1.5">
                          <span>{organelle.name}</span>
                        </div>
                        {organelle.pronunciation && (
                          <div className="text-[11px] text-slate-400 italic font-normal">
                            ({organelle.pronunciation})
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Nickname with Consistent Phrasing */}
                  <td className="py-4 px-4 sm:px-6">
                    <span className="font-['Fredoka',sans-serif] font-bold text-base text-amber-300 flex items-center gap-1">
                      <span>⭐</span>
                      <span>{organelle.nickname}</span>
                    </span>
                  </td>

                  {/* Function with exact format */}
                  <td className="py-4 px-4 sm:px-6 text-slate-200">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-100 leading-snug">
                        <strong>The {organelle.nickname}</strong> — {organelle.shortFunction}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed hidden sm:block">
                        {organelle.fullDescription}
                      </p>
                    </div>
                  </td>

                  {/* Found In Column with "(plant only)" label */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    {isPlantOnly ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold tracking-wide">
                        <span>🌿</span>
                        <span>(plant only)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 bg-slate-700/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>Both Cells</span>
                      </span>
                    )}
                  </td>

                  {/* Audio Listen Button */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleSpeakRow(organelle)}
                      className="p-2 rounded-xl bg-slate-700 hover:bg-amber-400 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                      title="Read aloud"
                      aria-label={`Listen to description of ${organelle.name}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Note at bottom */}
      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div className="space-y-1">
          <strong className="text-white block font-bold">Scientist Memory Trick:</strong>
          <p>
            Remember: <strong>Cell Wall</strong> (like a castle wall 🏰) and <strong>Chloroplasts</strong> (solar panels ☀️) are found <strong>ONLY in plant cells</strong>! Plants make their own food and stand tall, while animal cells need to be soft and flexible!
          </p>
        </div>
      </div>
    </div>
  );
};
