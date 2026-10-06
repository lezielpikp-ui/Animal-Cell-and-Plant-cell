import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, ORGANELLES } from '../data/cellData';
import { QuizQuestion } from '../types/cell';
import { soundManager } from '../utils/audio';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Sparkles, Award, ArrowRight, Lightbulb } from 'lucide-react';

interface QuizChallengeProps {
  onLearnMore?: () => void;
}

export const QuizChallenge: React.FC<QuizChallengeProps> = ({ onLearnMore }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [attemptsOnCurrent, setAttemptsOnCurrent] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const targetOrganelle = ORGANELLES.find((o) => o.id === currentQ.organelleId);

  const handleSelectOption = (option: string) => {
    if (isAnswered && isCorrect) return; // already got it right

    setSelectedAnswer(option);
    const correct = option === currentQ.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      soundManager.playCorrect();
      if (attemptsOnCurrent === 0) {
        setScore((prev) => prev + 1);
      }
      setFeedbackText('Great job! ✅');
      soundManager.speak(`Great job! That is correct. ${currentQ.explanation}`);
    } else {
      soundManager.playWrong();
      setAttemptsOnCurrent((prev) => prev + 1);
      const nicknameHint = targetOrganelle ? targetOrganelle.nickname.toLowerCase() : 'this special part';
      const promptFeedback = `Try again — it’s ${nicknameHint}! 💡`;
      setFeedbackText(promptFeedback);
      soundManager.speak(promptFeedback);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPop();
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setAttemptsOnCurrent(0);
      setFeedbackText('');
    } else {
      // Quiz complete!
      setShowResults(true);
      soundManager.playFanfare();
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 300);
    } catch {
      // Confetti fallback
    }
  };

  const handleRestart = () => {
    soundManager.playPop();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setShowResults(false);
    setAttemptsOnCurrent(0);
    setFeedbackText('');
  };

  const handleSpeakQuestion = () => {
    soundManager.speak(
      `${currentQ.question}. Your choices are: ${currentQ.options.join(', ')}`
    );
  };

  const getScoreMessage = (finalScore: number, total: number) => {
    const ratio = finalScore / total;
    if (ratio === 1) {
      return {
        title: `${finalScore}/${total} — Master Cell Biologist! 🏆`,
        subtitle: "Incredible! You got every single question right! You're a true Cell Genius!",
        badgeColor: 'text-amber-300 bg-amber-400/20 border-amber-400/40',
      };
    }
    if (ratio >= 0.8) {
      return {
        title: `${finalScore}/${total} — You’re a Cell Expert! 🎉`,
        subtitle: "Awesome work, Scientist! You know cell parts and nicknames super well!",
        badgeColor: 'text-emerald-300 bg-emerald-400/20 border-emerald-400/40',
      };
    }
    if (ratio >= 0.6) {
      return {
        title: `${finalScore}/${total} — Great Job, Explorer! 🌟`,
        subtitle: 'You are on your way to becoming a cell master. Give it one more try to get a 10/10!',
        badgeColor: 'text-sky-300 bg-sky-400/20 border-sky-400/40',
      };
    }
    return {
      title: `${finalScore}/${total} — Good Effort! Keep Exploring! 🔬`,
      subtitle: 'Cells have a lot of cool parts! Check out Learn Mode to brush up on nicknames, then try again.',
      badgeColor: 'text-purple-300 bg-purple-400/20 border-purple-400/40',
    };
  };

  const finalSummary = getScoreMessage(score, QUIZ_QUESTIONS.length);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {!showResults ? (
        <div className="space-y-6">
          {/* Header Bar: Progress & Stars */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Quiz Challenge
                </span>
                <span className="font-['Fredoka',sans-serif] font-bold text-lg text-white">
                  Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
              </div>
            </div>

            {/* Score Star Counter */}
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <span className="text-amber-400 text-lg">⭐</span>
              <span className="text-sm font-extrabold text-white">
                Score: {score} / {currentIndex + (isCorrect ? 1 : 0)}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient question glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Question Text */}
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold text-white leading-snug">
                {currentQ.question}
              </h2>
              <button
                onClick={handleSpeakQuestion}
                className="p-2.5 rounded-xl bg-slate-700 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition-colors shrink-0 shadow-sm"
                title="Read question out loud"
                aria-label="Read question"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Hint alert if they need a gentle push */}
            {attemptsOnCurrent > 0 && !isCorrect && (
              <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl p-3 flex items-center gap-2.5 text-xs text-amber-200 animate-bounce">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Hint:</strong> {currentQ.hint}
                </span>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isRightAnswer = option === currentQ.correctAnswer;

                let btnStyles =
                  'bg-slate-900/80 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-slate-500';

                if (isAnswered) {
                  if (isSelected && isCorrect) {
                    btnStyles = 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/30 scale-[1.02]';
                  } else if (isSelected && !isCorrect) {
                    btnStyles = 'bg-rose-600/80 border-rose-400 text-white shake';
                  } else if (isCorrect && isRightAnswer) {
                    btnStyles = 'bg-emerald-600/80 border-emerald-400 text-white';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className={`p-4 rounded-2xl border-2 font-bold text-base sm:text-lg transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98 ${btnStyles}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white/90">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </span>

                    {/* Icon status */}
                    {isAnswered && isSelected && isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-white shrink-0 animate-scale" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Notice */}
            {isAnswered && (
              <div
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 transition-all ${
                  isCorrect
                    ? 'bg-emerald-950/70 border-emerald-500/70 text-emerald-200 shadow-lg'
                    : 'bg-amber-950/70 border-amber-500/70 text-amber-200'
                }`}
              >
                <div className="text-2xl">{isCorrect ? '✅' : '💡'}</div>
                <div className="space-y-1">
                  <div className="font-['Fredoka',sans-serif] text-lg font-bold">
                    {feedbackText}
                  </div>
                  {isCorrect && (
                    <p className="text-xs sm:text-sm text-emerald-300/90 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  )}
                  {!isCorrect && (
                    <p className="text-xs text-amber-300/90">
                      Pick another answer! You can do it!
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Next / Submit Button */}
            {isCorrect && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-base shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentIndex + 1 === QUIZ_QUESTIONS.length ? 'See Final Score 🎉' : 'Next Question'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Final Score & Celebration Screen */
        <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6 relative overflow-hidden">
          {/* Confetti celebration icon */}
          <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center text-5xl shadow-inner animate-bounce">
            🎉
          </div>

          <div className="space-y-2">
            <div
              className={`inline-block px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wider ${finalSummary.badgeColor}`}
            >
              Quiz Completed!
            </div>
            {/* Required Final Score with fun message */}
            <h2 className="font-['Fredoka',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {finalSummary.title}
            </h2>
            <p className="max-w-md mx-auto text-slate-300 text-base sm:text-lg">
              {finalSummary.subtitle}
            </p>
          </div>

          {/* Score breakdown metrics */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-center">
              <span className="text-xs text-slate-400 font-bold block uppercase">Correct Answers</span>
              <span className="font-['Fredoka',sans-serif] text-3xl font-bold text-emerald-400">
                {score} / 10
              </span>
            </div>
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-center">
              <span className="text-xs text-slate-400 font-bold block uppercase">Accuracy</span>
              <span className="font-['Fredoka',sans-serif] text-3xl font-bold text-amber-400">
                {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Quiz Again</span>
            </button>

            {onLearnMore && (
              <button
                onClick={onLearnMore}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Back to Learn Mode</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
