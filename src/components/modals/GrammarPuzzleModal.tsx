import React, { useState } from 'react';
import {
  X,
  Puzzle,
  Heart,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  Lightbulb,
  Award,
  Flame,
  Volume2
} from 'lucide-react';
import { UserProfile, GrammarPuzzleItem } from '../../types';
import { GRAMMAR_PUZZLE_LIST } from '../../data/grammarPuzzleData';

interface GrammarPuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onAddRewards: (coins: number, xp: number) => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

export const GrammarPuzzleModal: React.FC<GrammarPuzzleModalProps> = ({
  isOpen,
  onClose,
  user,
  onAddRewards,
  onUpdateUser,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    return GRAMMAR_PUZZLE_LIST[0].scrambledWords
      ? [...GRAMMAR_PUZZLE_LIST[0].scrambledWords].sort(() => 0.5 - Math.random())
      : [];
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentPuzzle = GRAMMAR_PUZZLE_LIST[currentIndex];

  const handleSelectWord = (word: string, wordIdx: number) => {
    if (isAnswerChecked) return;
    setSelectedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, idx) => idx !== wordIdx));
  };

  const handleUnselectWord = (word: string, wordIdx: number) => {
    if (isAnswerChecked) return;
    setAvailableWords((prev) => [...prev, word]);
    setSelectedWords((prev) => prev.filter((_, idx) => idx !== wordIdx));
  };

  const resetCurrentWordOrder = () => {
    if (currentPuzzle.scrambledWords) {
      setSelectedWords([]);
      setAvailableWords([...currentPuzzle.scrambledWords].sort(() => 0.5 - Math.random()));
    }
  };

  const checkWordOrderAnswer = () => {
    if (selectedWords.length === 0 || isAnswerChecked) return;
    const userBuiltSentence = selectedWords.join(' ').trim();
    // Normalize punctuation
    const normalize = (str: string) => str.replace(/\s+/g, ' ').trim().toLowerCase();
    const correct = normalize(userBuiltSentence) === normalize(currentPuzzle.correctSentence);

    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 50);
      onAddRewards(25, 40);
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      if (newHearts <= 0) {
        setGameOver(true);
      }
    }
  };

  const checkFillBlankAnswer = (optIndex: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(optIndex);
    const correct = optIndex === currentPuzzle.correctOptionIndex;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 50);
      onAddRewards(25, 40);
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      if (newHearts <= 0) {
        setGameOver(true);
      }
    }
  };

  const handleNextPuzzle = () => {
    if (currentIndex + 1 < GRAMMAR_PUZZLE_LIST.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setIsAnswerChecked(false);
      setIsCorrect(null);
      setSelectedOption(null);
      setSelectedWords([]);
      if (GRAMMAR_PUZZLE_LIST[nextIdx].scrambledWords) {
        setAvailableWords([...GRAMMAR_PUZZLE_LIST[nextIdx].scrambledWords!].sort(() => 0.5 - Math.random()));
      }
    } else {
      setGameCompleted(true);
      onAddRewards(100, 200);
      if (onUpdateUser) {
        onUpdateUser({
          grammarStars: (user.grammarStars || 0) + 5,
        });
      }
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setHearts(3);
    setScore(0);
    setGameOver(false);
    setGameCompleted(false);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setSelectedOption(null);
    setSelectedWords([]);
    if (GRAMMAR_PUZZLE_LIST[0].scrambledWords) {
      setAvailableWords([...GRAMMAR_PUZZLE_LIST[0].scrambledWords!].sort(() => 0.5 - Math.random()));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="grammar-puzzle-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div className="glass-modal rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-indigo-500/30 dark:border-indigo-900/50 bg-white dark:bg-slate-900 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl shadow-inner">
              🧩
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase">
                <Sparkles className="w-3 h-3" />
                <span>N19: Grammatika Puzzle</span>
              </div>
              <h2 id="grammar-puzzle-title" className="text-lg md:text-xl font-black text-white flex items-center gap-2">
                Grammar Lab & Gap-Fill
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Game Over Screen */}
          {gameOver ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="text-5xl">💔</div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">Jonlaringiz Tugadi!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Xavotir olmang! Xatolar - o'rganishning eng yaxshi usuli. Qayta urinib ko'ring!
              </p>
              <div className="pt-3">
                <button
                  onClick={restartGame}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta Boshlash (3 Jon)</span>
                </button>
              </div>
            </div>
          ) : gameCompleted ? (
            /* Victory / Complete Screen */
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20">
                👑
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">Grammatika Ustasi!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Barcha {GRAMMAR_PUZZLE_LIST.length} ta murakkab grammatika pazzllarini muvaffaqiyatli yakunladingiz!
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 max-w-xs mx-auto">
                <span className="text-xs font-bold text-slate-500 block">Jami Ball</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{score} Ball</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={restartGame}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs shadow-md transition-all"
                >
                  Yana Mashq Qilish
                </button>
              </div>
            </div>
          ) : (
            /* Active Puzzle Playing View */
            <div className="space-y-4 animate-fade-in">
              {/* Level & Lives Bar */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-2.5 py-1 rounded-xl">
                    Puzzle {currentIndex + 1} / {GRAMMAR_PUZZLE_LIST.length}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Mavzu: <strong className="text-slate-800 dark:text-white">{currentPuzzle.topic}</strong>
                  </span>
                </div>

                {/* Hearts / Lives indicator */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((h) => (
                    <Heart
                      key={h}
                      className={`w-5 h-5 transition-all ${
                        h <= hearts ? 'text-rose-500 fill-rose-500 scale-100' : 'text-slate-300 dark:text-slate-600 scale-90'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Puzzle Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {currentPuzzle.prompt}
                  </span>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {currentPuzzle.level.toUpperCase()}
                  </span>
                </div>

                {/* 1. WORD ORDER INTERFACE */}
                {currentPuzzle.type === 'word_order' && (
                  <div className="space-y-4">
                    {/* User Sentence Construction Drop Area */}
                    <div className="min-h-[70px] p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/90 border-2 border-dashed border-indigo-200 dark:border-slate-700 flex flex-wrap items-center gap-2">
                      {selectedWords.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">
                          Quyidagi so'zlarni ketma-ketlikda bosing...
                        </span>
                      ) : (
                        selectedWords.map((word, idx) => (
                          <button
                            key={idx}
                            disabled={isAnswerChecked}
                            onClick={() => handleUnselectWord(word, idx)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs hover:bg-indigo-700 transition-all flex items-center gap-1 active:scale-95"
                          >
                            <span>{word}</span>
                          </button>
                        ))
                      )}
                    </div>

                    {/* Scrambled Available Word Chips */}
                    <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      {availableWords.map((word, idx) => (
                        <button
                          key={idx}
                          disabled={isAnswerChecked}
                          onClick={() => handleSelectWord(word, idx)}
                          className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                        >
                          {word}
                        </button>
                      ))}
                    </div>

                    {/* Word Order Action Buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={resetCurrentWordOrder}
                        disabled={isAnswerChecked || selectedWords.length === 0}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors flex items-center gap-1 disabled:opacity-40"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Tozalash</span>
                      </button>

                      {!isAnswerChecked ? (
                        <button
                          onClick={checkWordOrderAnswer}
                          disabled={selectedWords.length === 0}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xs shadow-md transition-all"
                        >
                          Tekshirish
                        </button>
                      ) : (
                        <button
                          onClick={handleNextPuzzle}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs shadow-md transition-all flex items-center gap-1"
                        >
                          <span>Keyingi Puzzle</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. FILL IN THE BLANK INTERFACE */}
                {currentPuzzle.type === 'fill_blank' && (
                  <div className="space-y-4">
                    {/* Sentence with blank */}
                    <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/90 border border-indigo-200 dark:border-slate-700">
                      <p className="text-sm md:text-base font-bold text-slate-800 dark:text-white leading-relaxed">
                        {currentPuzzle.sentenceWithBlank}
                      </p>
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentPuzzle.options?.map((opt, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrectOpt = idx === currentPuzzle.correctOptionIndex;
                        let btnStyle = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:border-indigo-400";

                        if (isAnswerChecked) {
                          if (isCorrectOpt) {
                            btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-black";
                          } else if (isSelected) {
                            btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 font-black";
                          } else {
                            btnStyle = "opacity-50 border-slate-200 dark:border-slate-700";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={isAnswerChecked}
                            onClick={() => checkFillBlankAnswer(idx)}
                            className={`p-3 rounded-xl border text-left text-xs md:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswerChecked && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            {isAnswerChecked && isSelected && !isCorrectOpt && <XCircle className="w-4 h-4 text-rose-600" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next button for fill blank */}
                    {isAnswerChecked && (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={handleNextPuzzle}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs shadow-md transition-all flex items-center gap-1"
                        >
                          <span>Keyingi Puzzle</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation Banner when answered */}
                {isAnswerChecked && (
                  <div
                    className={`p-4 rounded-2xl border text-xs font-medium space-y-1.5 animate-fade-in ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black">
                      <Lightbulb className="w-4 h-4" />
                      <span>{isCorrect ? "To'g'ri Javob! 🎉 (+50 Ball)" : "Grammatika Qoidasi:"}</span>
                    </div>
                    <p className="leading-relaxed">{currentPuzzle.ruleExplanation}</p>
                    <div className="pt-1 text-[11px] opacity-90">
                      <strong>To'g'ri gap:</strong> "{currentPuzzle.correctSentence}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
