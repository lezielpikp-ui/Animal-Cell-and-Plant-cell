import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MATCH_ITEMS } from '../data/cellData';
import { MatchPair } from '../types/cell';
import { soundManager } from '../utils/audio';
import { Sparkles, RotateCcw, Check, ArrowRight, Lightbulb, Trophy } from 'lucide-react';

interface TrioState {
  organelleId: string;
  matchedNickname: boolean;
  matchedFunction: boolean;
}

export const MatchUpGame: React.FC = () => {
  // We can take a set of 5 items per round so young students aren't overwhelmed,
  // or cycle through rounds!
  const [round, setRound] = useState<number>(1);
  const itemsPerRound = 5;

  const getRoundItems = (r: number): MatchPair[] => {
    const startIndex = ((r - 1) * itemsPerRound) % MATCH_ITEMS.length;
    let selected = MATCH_ITEMS.slice(startIndex, startIndex + itemsPerRound);
    if (selected.length < itemsPerRound) {
      selected = selected.concat(MATCH_ITEMS.slice(0, itemsPerRound - selected.length));
    }
    return selected;
  };

  const [activeItems, setActiveItems] = useState<MatchPair[]>(() => getRoundItems(1));
  const [shuffledNicknames, setShuffledNicknames] = useState<{ id: string; text: string; organelleId: string }[]>([]);
  const [shuffledFunctions, setShuffledFunctions] = useState<{ id: string; text: string; organelleId: string }[]>([]);

  // Selected state for tap-to-match & drag-and-drop
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);
  const [selectedNickname, setSelectedNickname] = useState<string | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  // Solved map: organelleId -> { nicknameId, functionId }
  const [solved, setSolved] = useState<Record<string, { nickname: boolean; func: boolean }>>({});
  const [isRoundFinished, setIsRoundFinished] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<{ type: 'nickname' | 'function'; id: string; organelleId: string } | null>(null);

  // Initialize round items
  useEffect(() => {
    initRound(round);
  }, [round]);

  const initRound = (r: number) => {
    const roundList = getRoundItems(r);
    setActiveItems(roundList);

    // Shuffle nicknames
    const nicks = roundList.map((item) => ({
      id: `nick-${item.id}`,
      text: item.nickname,
      organelleId: item.organelleId,
    })).sort(() => Math.random() - 0.5);

    // Shuffle functions
    const funcs = roundList.map((item) => ({
      id: `func-${item.id}`,
      text: item.functionText,
      organelleId: item.organelleId,
    })).sort(() => Math.random() - 0.5);

    setShuffledNicknames(nicks);
    setShuffledFunctions(funcs);

    const initialSolved: Record<string, { nickname: boolean; func: boolean }> = {};
    roundList.forEach((item) => {
      initialSolved[item.organelleId] = { nickname: false, func: false };
    });
    setSolved(initialSolved);
    setIsRoundFinished(false);
    setSelectedOrganelle(null);
    setSelectedNickname(null);
    setSelectedFunction(null);
  };

  // Check if all items in current round are fully matched
  useEffect(() => {
    if (activeItems.length === 0) return;
    const allDone = activeItems.every(
      (item) => solved[item.organelleId]?.nickname && solved[item.organelleId]?.func
    );
    if (allDone && Object.keys(solved).length > 0) {
      setIsRoundFinished(true);
      soundManager.playFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [solved, activeItems]);

  // Handle Nickname selection / placement
  const handleSelectNickname = (nick: { id: string; text: string; organelleId: string }) => {
    soundManager.playPop();

    // If an organelle is already selected, try to match it!
    if (selectedOrganelle) {
      if (selectedOrganelle === nick.organelleId) {
        // Correct match!
        soundManager.playCorrect();
        soundManager.speak(`Great match! ${nick.text}`);
        setSolved((prev) => ({
          ...prev,
          [selectedOrganelle]: {
            ...prev[selectedOrganelle],
            nickname: true,
          },
        }));
        setSelectedNickname(null);
      } else {
        // Wrong match
        soundManager.playWrong();
        soundManager.speak('Oops, try matching with the right cell part!');
      }
    } else {
      setSelectedNickname((prev) => (prev === nick.id ? null : nick.id));
    }
  };

  // Handle Function selection / placement
  const handleSelectFunction = (func: { id: string; text: string; organelleId: string }) => {
    soundManager.playPop();

    if (selectedOrganelle) {
      if (selectedOrganelle === func.organelleId) {
        soundManager.playCorrect();
        soundManager.speak('Super job! Function matched!');
        setSolved((prev) => ({
          ...prev,
          [selectedOrganelle]: {
            ...prev[selectedOrganelle],
            func: true,
          },
        }));
        setSelectedFunction(null);
      } else {
        soundManager.playWrong();
        soundManager.speak('Try again — check the job description!');
      }
    } else {
      setSelectedFunction((prev) => (prev === func.id ? null : func.id));
    }
  };

  // Handle selecting an organelle slot
  const handleSelectOrganelleSlot = (organelleId: string) => {
    soundManager.playPop();

    // If nickname was queued up
    if (selectedNickname) {
      const nickObj = shuffledNicknames.find((n) => n.id === selectedNickname);
      if (nickObj && nickObj.organelleId === organelleId) {
        soundManager.playCorrect();
        setSolved((prev) => ({
          ...prev,
          [organelleId]: { ...prev[organelleId], nickname: true },
        }));
        setSelectedNickname(null);
        return;
      } else {
        soundManager.playWrong();
      }
    }

    // If function was queued up
    if (selectedFunction) {
      const funcObj = shuffledFunctions.find((f) => f.id === selectedFunction);
      if (funcObj && funcObj.organelleId === organelleId) {
        soundManager.playCorrect();
        setSolved((prev) => ({
          ...prev,
          [organelleId]: { ...prev[organelleId], func: true },
        }));
        setSelectedFunction(null);
        return;
      } else {
        soundManager.playWrong();
      }
    }

    setSelectedOrganelle((prev) => (prev === organelleId ? null : organelleId));
  };

  // Drag and drop support
  const handleDragStart = (
    e: React.DragEvent,
    type: 'nickname' | 'function',
    id: string,
    organelleId: string
  ) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type, id, organelleId }));
    setDraggedItem({ type, id, organelleId });
  };

  const handleDropOnOrganelle = (e: React.DragEvent, targetOrganelleId: string) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      const data = JSON.parse(dataStr);

      if (data.organelleId === targetOrganelleId) {
        soundManager.playCorrect();
        if (data.type === 'nickname') {
          setSolved((prev) => ({
            ...prev,
            [targetOrganelleId]: { ...prev[targetOrganelleId], nickname: true },
          }));
        } else {
          setSolved((prev) => ({
            ...prev,
            [targetOrganelleId]: { ...prev[targetOrganelleId], func: true },
          }));
        }
      } else {
        soundManager.playWrong();
      }
    } catch {
      // Drag parse fallback
    }
    setDraggedItem(null);
  };

  const handleNextRound = () => {
    soundManager.playPop();
    setRound((r) => r + 1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-400/20 text-purple-300 text-xs font-bold mb-2">
            <span>🧩 Round {round}</span>
          </div>
          <h2 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            Match-Up Game: Part ➡️ Nickname ➡️ Function
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Drag cards into the matching slots, or tap an organelle and tap its matching card!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => initRound(round)}
            className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Shuffle & Reset Round"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Round</span>
          </button>
        </div>
      </div>

      {/* Touch & Tap instruction helper */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-base">💡</span>
          <span>
            {selectedOrganelle ? (
              <span className="text-amber-300 font-bold">
                Selected: {activeItems.find((i) => i.organelleId === selectedOrganelle)?.organelleName}! Now tap its Nickname or Function!
              </span>
            ) : selectedNickname || selectedFunction ? (
              <span className="text-sky-300 font-bold">
                Card selected! Now tap the cell part it belongs to.
              </span>
            ) : (
              <span>Tap a cell part first, then tap its matching nickname and function below.</span>
            )}
          </span>
        </div>
      </div>

      {/* Main Matching Grid: Organelle Target Rows */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
          Cell Parts Targets:
        </h3>

        <div className="space-y-3">
          {activeItems.map((item) => {
            const isOrganelleSelected = selectedOrganelle === item.organelleId;
            const hasNickname = solved[item.organelleId]?.nickname;
            const hasFunc = solved[item.organelleId]?.func;
            const isComplete = hasNickname && hasFunc;

            return (
              <div
                key={item.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropOnOrganelle(e, item.organelleId)}
                onClick={() => handleSelectOrganelleSlot(item.organelleId)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col md:flex-row items-center gap-4 ${
                  isComplete
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md'
                    : isOrganelleSelected
                    ? 'bg-slate-800 border-amber-400 shadow-lg ring-2 ring-amber-400/40'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                }`}
              >
                {/* 1. Organelle Name Column */}
                <div className="w-full md:w-52 shrink-0 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {item.emoji}
                  </div>
                  <div>
                    <div className="font-['Fredoka',sans-serif] font-bold text-lg text-white flex items-center gap-1.5">
                      <span>{item.organelleName}</span>
                      {item.isPlantOnly && <span title="Plant only!">🌿</span>}
                    </div>
                    {item.isPlantOnly && (
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        (Plant Only)
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Nickname Slot */}
                <div className="flex-1 w-full">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Nickname Slot</span>
                    {hasNickname && <span className="text-emerald-400 font-bold">✓ Matched</span>}
                  </div>
                  {hasNickname ? (
                    <div className="p-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-200 font-bold text-sm flex items-center gap-2">
                      <span>⭐</span>
                      <span>{item.nickname}</span>
                    </div>
                  ) : (
                    <div
                      className={`p-2.5 rounded-xl border border-dashed text-xs text-center font-medium transition-colors ${
                        isOrganelleSelected
                          ? 'border-amber-400/70 bg-amber-400/5 text-amber-300'
                          : 'border-slate-600 bg-slate-900/50 text-slate-400'
                      }`}
                    >
                      Drop or Tap matching Nickname
                    </div>
                  )}
                </div>

                {/* 3. Function Slot */}
                <div className="flex-[1.5] w-full">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Function Slot</span>
                    {hasFunc && <span className="text-emerald-400 font-bold">✓ Matched</span>}
                  </div>
                  {hasFunc ? (
                    <div className="p-2.5 rounded-xl bg-sky-400/20 border border-sky-400/40 text-sky-200 text-xs sm:text-sm font-medium flex items-center gap-2">
                      <span>🎯</span>
                      <span>{item.functionText}</span>
                    </div>
                  ) : (
                    <div
                      className={`p-2.5 rounded-xl border border-dashed text-xs text-center font-medium transition-colors ${
                        isOrganelleSelected
                          ? 'border-sky-400/70 bg-sky-400/5 text-sky-300'
                          : 'border-slate-600 bg-slate-900/50 text-slate-400'
                      }`}
                    >
                      Drop or Tap matching Function
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Cards Pool to Drag or Click */}
      {!isRoundFinished && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700/80">
          {/* Nicknames Pool */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
              <span>⭐ Available Nicknames:</span>
            </h4>
            <div className="space-y-2">
              {shuffledNicknames
                .filter((n) => !solved[n.organelleId]?.nickname)
                .map((nick) => {
                  const isSelected = selectedNickname === nick.id;
                  return (
                    <div
                      key={nick.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'nickname', nick.id, nick.organelleId)}
                      onClick={() => handleSelectNickname(nick)}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all cursor-grab active:cursor-grabbing flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                          : 'bg-slate-800/90 hover:bg-slate-750 text-amber-200 border-slate-700 hover:border-amber-400/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🏷️</span>
                        <span>{nick.text}</span>
                      </span>
                      <span className="text-xs opacity-70">Tap / Drag</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Functions Pool */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-sky-400 tracking-wider flex items-center gap-1.5">
              <span>🎯 Available Functions:</span>
            </h4>
            <div className="space-y-2">
              {shuffledFunctions
                .filter((f) => !solved[f.organelleId]?.func)
                .map((func) => {
                  const isSelected = selectedFunction === func.id;
                  return (
                    <div
                      key={func.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'function', func.id, func.organelleId)}
                      onClick={() => handleSelectFunction(func)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-grab active:cursor-grabbing flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-400 text-slate-950 border-sky-300 font-bold shadow-md scale-102'
                          : 'bg-slate-800/90 hover:bg-slate-750 text-sky-100 border-slate-700 hover:border-sky-400/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>⚙️</span>
                        <span>{func.text}</span>
                      </span>
                      <span className="text-xs opacity-70 shrink-0 ml-2">Tap / Drag</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Round Finished Celebratory Banner */}
      {isRoundFinished && (
        <div className="bg-gradient-to-r from-emerald-900/80 via-slate-800 to-sky-900/80 border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl animate-fade-in">
          <div className="text-4xl">🎉 🏆 🌟</div>
          <h3 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold text-white">
            Round {round} Completed! You Matched Them All!
          </h3>
          <p className="text-slate-200 text-sm max-w-md mx-auto">
            You know your cell parts, their fun nicknames, and their functions like a true scientist!
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleNextRound}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Play Next Round 🚀</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => initRound(round)}
              className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Replay This Round</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
