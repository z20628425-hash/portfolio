import React, { useState, useEffect } from 'react';
import { X, BookOpen, Clock, CheckCircle2, AlertCircle, Sparkles, Award } from 'lucide-react';
import { IELTSReadingPassage } from '../../types';
import { initialIELTSReadingPassages } from '../../data/mockData';

interface IELTSReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCoins?: (coins: number, xp: number) => void;
}

export const IELTSReadingModal: React.FC<IELTSReadingModalProps> = ({
  isOpen,
  onClose,
  onRewardCoins,
}) => {
  const [passages] = useState<IELTSReadingPassage[]>(initialIELTSReadingPassages);
  const [selectedPassage, setSelectedPassage] = useState<IELTSReadingPassage>(initialIELTSReadingPassages[0]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60); // 20 min timer per passage
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen || !isTimerRunning || timeLeft <= 0 || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning, timeLeft, isSubmitted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectAnswer = (qId: number, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    selectedPassage.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
    setIsTimerRunning(false);
    if (onRewardCoins) {
      onRewardCoins(correctCount * 35, correctCount * 45);
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div id="ielts-reading-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div id="ielts-reading-modal-container" className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                IELTS Academic Reading Moduli
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Matnni diqqat bilan o'qing va savollarga javob bering ({selectedPassage.wordCount} so'z)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold border border-amber-200 dark:border-amber-900/40">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            <button
              id="close-reading-modal-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Passage Tabs */}
        <div className="flex gap-2 px-6 py-2 bg-slate-100/50 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800">
          {passages.map((p) => (
            <button
              key={p.id}
              id={`reading-tab-${p.id}`}
              onClick={() => {
                setSelectedPassage(p);
                setUserAnswers({});
                setIsSubmitted(false);
                setScore(null);
                setTimeLeft(20 * 60);
                setIsTimerRunning(true);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedPassage.id === p.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {p.title.split(':')[0]} ({p.questions.length} savol)
            </button>
          ))}
        </div>

        {/* 2-Column Split Content: Left = Passage, Right = Questions */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
          
          {/* Passage Column */}
          <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh] lg:max-h-full">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                Academic Passage {selectedPassage.id}
              </span>
              <span className="text-xs text-slate-400 font-mono">{selectedPassage.wordCount} words</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {selectedPassage.title}
            </h3>

            <div className="prose dark:prose-invert text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif space-y-3 whitespace-pre-line bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
              {selectedPassage.passageText}
            </div>
          </div>

          {/* Questions Column */}
          <div className="p-6 overflow-y-auto space-y-5 max-h-[60vh] lg:max-h-full bg-slate-50/30 dark:bg-slate-900/20">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Savollar ({selectedPassage.questions.length} ta)
              </h4>
              <span className="text-xs text-slate-500">
                {Object.keys(userAnswers).length} / {selectedPassage.questions.length} belgilandi
              </span>
            </div>

            {selectedPassage.questions.map((q, qIdx) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  id={`reading-question-box-${q.id}`}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 mb-3">
                        {q.question}
                      </p>

                      {q.options && (
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isThisSelected = selectedOpt === optIdx;
                            const isThisCorrect = q.correctAnswer === optIdx;

                            let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300';

                            if (isSubmitted) {
                              if (isThisCorrect) {
                                btnStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-bold';
                              } else if (isThisSelected) {
                                btnStyle = 'border-rose-500 bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200';
                              }
                            } else if (isThisSelected) {
                              btnStyle = 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 font-semibold';
                            }

                            return (
                              <button
                                key={optIdx}
                                id={`reading-opt-${q.id}-${optIdx}`}
                                disabled={isSubmitted}
                                onClick={() => handleSelectAnswer(q.id, optIdx)}
                                className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all ${btnStyle} hover:scale-[1.005] flex items-center gap-2`}
                              >
                                <span className="w-5 h-5 rounded-md bg-white/40 dark:bg-black/20 flex items-center justify-center text-[10px] font-bold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation */}
                      {isSubmitted && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          )}
                          <span>
                            <strong>Izoh:</strong> {q.explanation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isSubmitted && score !== null && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1.5">
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Reading Passage Natijasi: {score} / {selectedPassage.questions.length} to'g'ri!
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Taxminiy IELTS Reading Band: <strong>{score === 3 ? '8.0' : score === 2 ? '7.0' : '6.0'}</strong> (+{score * 35} tanga, +{score * 45} XP)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => {
              setUserAnswers({});
              setIsSubmitted(false);
              setScore(null);
              setTimeLeft(20 * 60);
              setIsTimerRunning(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            Qayta topshirish
          </button>

          {!isSubmitted ? (
            <button
              id="submit-reading-btn"
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md disabled:opacity-50 transition"
            >
              Javoblarni tasdiqlash
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
            >
              Tugatish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
