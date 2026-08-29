import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, XCircle, Award, Clock, ArrowRight, RotateCcw, Pause, Play, Sparkles, Loader2 } from 'lucide-react';
import { TestItem, TestQuestion } from '../../types';

interface TestRunnerModalProps {
  test: TestItem;
  onClose: () => void;
  onCompleteTest: (scorePercent: number, xpEarned: number) => void;
}

export const TestRunnerModal: React.FC<TestRunnerModalProps> = ({
  test,
  onClose,
  onCompleteTest,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explainingQuestionId, setExplainingQuestionId] = useState<string | null>(null);
  const [aiExplanations, setAiExplanations] = useState<Record<string, any>>({});

  const handleAskAIExplanation = async (q: TestQuestion, idx: number) => {
    const userAns = selectedAnswers[idx];
    setExplainingQuestionId(q.id);
    try {
      const res = await fetch('/api/gemini/explain-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          options: q.options,
          selectedAnswerIndex: userAns,
          correctAnswerIndex: q.correctAnswer,
          subject: test.subject,
        }),
      });
      const data = await res.json();
      if (data.explanation) {
        setAiExplanations((prev) => ({ ...prev, [q.id]: data.explanation }));
      }
    } catch (e) {
      console.error('Ask AI error:', e);
    } finally {
      setExplainingQuestionId(null);
    }
  };

  const questions: TestQuestion[] = test.questions;
  const currentQ = questions[currentQuestionIndex];

  // Timer countdown
  useEffect(() => {
    if (isFinished || isPaused || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, isPaused, timeLeft]);

  const handleSelectOption = (optionIndex: number) => {
    if (isFinished) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsFinished(true);
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percent = Math.round((correctCount / questions.length) * 100);
    const xpEarned = Math.round((percent / 100) * 50) + 10;
    return { correctCount, percent, xpEarned };
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const results = isFinished ? calculateResults() : null;

  return (
    <div
      id="test-runner-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-runner-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
    >
      <div id="test-runner-modal-container" className="glass-modal rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-sky-900/10 flex flex-col max-h-[90vh] border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-sky-50/80 dark:bg-slate-800/80 border-b border-sky-100 dark:border-slate-800">
          <div>
            <h3 id="test-runner-modal-title" className="font-bold text-lg text-slate-800 dark:text-white">{test.title}</h3>
            <p className="text-xs text-slate-500">{test.subject}</p>
          </div>
          <div className="flex items-center gap-2">
            {!isFinished && (
              <button
                id="toggle-pause-test-btn"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Taymerni davom ettirish" : "Taymerni to'xtatib turish (Pauza)"}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                  isPaused
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700 animate-pulse'
                    : 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-800 hover:bg-sky-200 dark:hover:bg-sky-900'
                }`}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" /> : <Pause className="w-3.5 h-3.5" aria-hidden="true" />}
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span aria-live="off">{formatTime(timeLeft)}</span>
                {isPaused && <span className="text-[10px] uppercase font-extrabold ml-0.5">(Pauza)</span>}
              </button>
            )}
            <button
              id="close-test-runner-btn"
              onClick={onClose}
              aria-label="Testni yopish"
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-sky-100/60 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Paused Banner */}
            {isPaused && (
              <div role="alert" className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <Pause className="w-4 h-4 text-amber-600 flex-shrink-0" aria-hidden="true" />
                  <span>Test vaqti to'xtatib turildi. Bemalol o'ylab oling.</span>
                </div>
                <button
                  id="resume-paused-test-btn"
                  onClick={() => setIsPaused(false)}
                  aria-label="Testni davom ettirish"
                  className="px-3 py-1 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 flex-shrink-0 ml-2"
                >
                  Davom etish
                </button>
              </div>
            )}

            {/* Progress Bar */}
            <div role="region" aria-label="Test jarayoni" className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Savol {currentQuestionIndex + 1} / {questions.length}</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Test yakunlanish foizi"
                className="w-full bg-sky-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-sky-200/50 dark:border-slate-700"
              >
                <div
                  className="bg-gradient-to-r from-sky-500 to-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Box */}
            <div className="space-y-4" role="group" aria-labelledby="current-test-question-text">
              <h4 id="current-test-question-text" className="text-base md:text-lg font-bold text-slate-800 dark:text-white leading-relaxed">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div role="radiogroup" aria-labelledby="current-test-question-text" className="space-y-2.5">
                {currentQ.options.map((opt, optionIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === optionIdx;
                  return (
                    <button
                      key={optionIdx}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectOption(optionIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm ${
                        isSelected
                          ? 'bg-sky-100/90 dark:bg-sky-950/60 border-sky-400 dark:border-sky-600 text-sky-900 dark:text-sky-100 font-semibold shadow-xs'
                          : 'glass-card border-sky-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-sky-50/70 dark:hover:bg-slate-800/70'
                      }`}
                    >
                      <span className="flex-1 pr-3">{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-sky-500 bg-sky-600' : 'border-slate-300 dark:border-slate-600'
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Results View */
          <div role="region" aria-label="Test natijalari" className="p-6 overflow-y-auto space-y-6 flex-1 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-md shadow-sky-900/5" aria-hidden="true">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white">Test Yakunlandi!</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Siz {questions.length} ta savoldan {results?.correctCount} tasiga to'g'ri javob berdingiz.
              </p>
            </div>

            {/* Score Pill */}
            <div className="glass-card p-5 rounded-3xl border border-sky-100 dark:border-slate-800 flex justify-around items-center shadow-xs">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold">Natija</p>
                <p className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                  {results?.percent}%
                </p>
              </div>
              <div className="w-[1px] h-10 bg-sky-100 dark:bg-slate-800" aria-hidden="true" />
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold">Qozonilgan XP</p>
                <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  +{results?.xpEarned} XP
                </p>
              </div>
            </div>

            {/* Explanations Toggle */}
            <button
              id="toggle-explanations-btn"
              onClick={() => setShowExplanation(!showExplanation)}
              aria-expanded={showExplanation}
              aria-controls="test-runner-explanations-list"
              className="text-xs text-sky-600 dark:text-sky-400 font-bold underline cursor-pointer hover:text-sky-500"
            >
              {showExplanation ? "Tushuntirishlarni yashirish" : "Savollar tahlilini ko'rish"}
            </button>

            {showExplanation && (
              <div id="test-runner-explanations-list" role="list" aria-label="Savollar tahlili ro'yxati" className="space-y-4 text-left pt-2 border-t border-sky-100 dark:border-slate-800">
                {questions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      role="listitem"
                      className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                        isCorrect ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300' : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        )}
                        <span className="font-bold text-slate-800 dark:text-white">
                          {idx + 1}. {q.question}
                        </span>
                      </div>
                      <p className="pl-6 text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-500 dark:text-slate-400">Sizning javobingiz:</strong>{' '}
                        {userAns !== undefined ? q.options[userAns] : "Javob berilmadi"}
                      </p>
                      {!isCorrect && (
                        <p className="pl-6 text-emerald-700 dark:text-emerald-400 font-medium">
                          <strong>To'g'ri javob:</strong> {q.options[q.correctAnswer]}
                        </p>
                      )}
                      <div className="pl-6 pt-1 flex items-center justify-between">
                        <p className="text-slate-500 dark:text-slate-400 italic">
                          💡 {q.explanation}
                        </p>
                        <button
                          onClick={() => handleAskAIExplanation(q, idx)}
                          disabled={explainingQuestionId === q.id}
                          aria-label={`Savol ${idx + 1} uchun AI tahlilini olish`}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold hover:bg-sky-200 transition text-[11px]"
                        >
                          {explainingQuestionId === q.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
                              <span>Tahlil qilinmoqda...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                              <span>AI Tahlili</span>
                            </>
                          )}
                        </button>
                      </div>

                      {aiExplanations[q.id] && (
                        <div role="region" aria-label={`Savol ${idx + 1} AI tahlili`} className="mt-2 p-3 rounded-xl bg-white/90 dark:bg-slate-900 border border-sky-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 space-y-1.5 animate-in fade-in">
                          <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400 font-bold text-[11px]">
                            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Gemini Chuqur Tahlili:</span>
                          </div>
                          <p className="text-[11px] text-slate-700 dark:text-slate-300">
                            <strong>Bosqichma-bosqich:</strong> {aiExplanations[q.id].stepByStep}
                          </p>
                          <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                            <strong>Qoida & Formula:</strong> {aiExplanations[q.id].ruleOrFormula}
                          </p>
                          <p className="text-[11px] text-amber-700 dark:text-amber-400">
                            <strong>🎯 Imtihon Maslahati:</strong> {aiExplanations[q.id].examTip}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="p-4 bg-sky-50/80 dark:bg-slate-800/80 border-t border-sky-100 dark:border-slate-800 flex justify-end gap-3">
          {!isFinished ? (
            <button
              id="next-question-btn"
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              aria-label={currentQuestionIndex === questions.length - 1 ? 'Testni yakunlash' : 'Keyingi savolga o\'tish'}
              className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-sky-600/25 border border-white/30"
            >
              <span>{currentQuestionIndex === questions.length - 1 ? 'Testni Yakunlash' : 'Keyingi Savol'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              id="finish-test-save-btn"
              onClick={() => {
                if (results) {
                  onCompleteTest(results.percent, results.xpEarned);
                }
                onClose();
              }}
              aria-label="Natijalarni saqlash va testdan chiqish"
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-sky-600/25 border border-white/30"
            >
              <span>Saqlash va Chiqish</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
