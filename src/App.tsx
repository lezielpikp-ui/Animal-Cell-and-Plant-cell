import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { LearnMode } from './components/LearnMode';
import { QuizChallenge } from './components/QuizChallenge';
import { MatchUpGame } from './components/MatchUpGame';
import { ReferenceTable } from './components/ReferenceTable';
import { CompareView } from './components/CompareView';
import { soundManager } from './utils/audio';
import { CellType } from './types/cell';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [learnCellType, setLearnCellType] = useState<CellType>('animal');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
    if (next) soundManager.playPop();
  };

  const handleToggleSpeech = () => {
    const next = !speechEnabled;
    setSpeechEnabled(next);
    soundManager.speechEnabled = next;
    if (next) {
      soundManager.speak('Read-aloud voice enabled!');
    } else {
      soundManager.stopSpeaking();
    }
  };

  const handleStartLearn = (cellType: CellType) => {
    setLearnCellType(cellType);
    setCurrentTab('learn');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        speechEnabled={speechEnabled}
        onToggleSpeech={handleToggleSpeech}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 pb-16">
        {currentTab === 'home' && (
          <HomeScreen
            onStartLearn={handleStartLearn}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'learn' && (
          <LearnMode
            initialCellType={learnCellType}
            onNavigateToQuiz={() => setCurrentTab('quiz')}
            onNavigateToCompare={() => setCurrentTab('compare')}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizChallenge onLearnMore={() => setCurrentTab('learn')} />
        )}

        {currentTab === 'match' && <MatchUpGame />}

        {currentTab === 'table' && <ReferenceTable />}

        {currentTab === 'compare' && (
          <CompareView
            onLearnAnimal={() => handleStartLearn('animal')}
            onLearnPlant={() => handleStartLearn('plant')}
          />
        )}
      </main>

      {/* Primary Science Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-300">
            Cell Explorer 🔬 Living Cells Learning Game for Primary Scientists
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-400">
            <span>No login required</span>
            <span>·</span>
            <span>Works smoothly on tablets, Chromebooks &amp; laptops</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Cell Wall &amp; Chloroplasts = Plant Only! 🌿</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
