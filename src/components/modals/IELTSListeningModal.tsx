import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2, Play, Pause, RotateCcw, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import { IELTSListeningSection } from '../../types';
import { initialIELTSListeningSections } from '../../data/mockData';

interface IELTSListeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCoins?: (coins: number, xp: number) => void;
}

export const IELTSListeningModal: React.FC<IELTSListeningModalProps> = ({
  isOpen,
  onClose,
  onRewardCoins,
}) => {
  const [sections] = useState<IELTSListeningSection[]>(initialIELTSListeningSections);
  const [selectedSection, setSelectedSection] = useState<IELTSListeningSection>(initialIELTSListeningSections[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePlayToggle = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Play audio simulation using SpeechSynthesis or tone
      if ('speechSynthesis' in window && currentTime === 0) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(selectedSection.audioScript);
        utterance.rate = playbackSpeed;
        utterance.lang = 'en-GB';
        utterance.onend = () => {
          setIsPlaying(false);
          setCurrentTime(selectedSection.audioDurationSeconds);
        };
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    }
  };

  const handleResetAudio = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSelectAnswer = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    selectedSection.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
    if (onRewardCoins) {
      onRewardCoins(correctCount * 30, correctCount * 40);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = Math.floor(sec % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div id="ielts-listening-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div id="ielts-listening-modal-container" className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                IELTS Listening Moduli (Real Audio Test)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audio yozuvni tinglang va berilgan savollarga javob bering
              </p>
            </div>
          </div>
          <button
            id="close-listening-modal-btn"
            onClick={() => {
              handleResetAudio();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section Selector */}
          <div className="flex gap-2 pb-2 overflow-x-auto border-b border-slate-100 dark:border-slate-800">
            {sections.map((sec) => (
              <button
                key={sec.id}
                id={`listening-sec-tab-${sec.id}`}
                onClick={() => {
                  handleResetAudio();
                  setSelectedSection(sec);
                  setUserAnswers({});
                  setIsSubmitted(false);
                  setScore(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSection.id === sec.id
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Section {sec.id}: {sec.title.split(':')[1]?.trim() || sec.title}
              </button>
            ))}
          </div>

          {/* Audio Player Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/20">
                  Section {selectedSection.id} Official Track
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{selectedSection.title}</h3>
                <p className="text-xs text-indigo-200/80 mt-0.5">{selectedSection.description}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  id="listening-play-btn"
                  onClick={handlePlayToggle}
                  className="w-12 h-12 rounded-2xl bg-white text-indigo-900 font-bold flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-indigo-900" /> : <Play className="w-5 h-5 fill-indigo-900 translate-x-0.5" />}
                </button>
                <button
                  id="listening-reset-btn"
                  onClick={handleResetAudio}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                  title="Qayta boshlash"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  id="listening-speed-btn"
                  onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 0.8 : 1))}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
                >
                  {playbackSpeed}x Tezlik
                </button>
                <button
                  id="listening-toggle-script-btn"
                  onClick={() => setShowScript(!showScript)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    showScript ? 'bg-indigo-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {showScript ? 'Skriptni yopish' : 'Audio Skript'}
                </button>
              </div>
            </div>

            {/* Simulated Animated Audio Wave */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-1.5 h-10">
              {[...Array(28)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-indigo-400 animate-pulse' : 'bg-white/20'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (Math.sin(i * 0.8 + currentTime) + 1) * 16 + 8)}px` : '6px',
                  }}
                />
              ))}
            </div>

            {/* Audio Script Reveal */}
            {showScript && (
              <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-indigo-100 font-mono whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {selectedSection.audioScript}
              </div>
            )}
          </div>

          {/* Question List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Savollar ({selectedSection.questions.length} ta savol)
              </h4>
              <span className="text-xs text-slate-500">
                {Object.keys(userAnswers).length} / {selectedSection.questions.length} ta belgilandi
              </span>
            </div>

            {selectedSection.questions.map((q, qIndex) => {
              const selectedOption = userAnswers[q.id];
              const isCorrect = selectedOption === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  id={`listening-question-card-${q.id}`}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {qIndex + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
                        {q.question}
                      </p>

                      {q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const isThisSelected = selectedOption === optIdx;
                            const isThisCorrect = q.correctAnswer === optIdx;

                            let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300';

                            if (isSubmitted) {
                              if (isThisCorrect) {
                                btnStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-bold';
                              } else if (isThisSelected) {
                                btnStyle = 'border-rose-500 bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200';
                              }
                            } else if (isThisSelected) {
                              btnStyle = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold';
                            }

                            return (
                              <button
                                key={optIdx}
                                id={`listening-opt-${q.id}-${optIdx}`}
                                disabled={isSubmitted}
                                onClick={() => handleSelectAnswer(q.id, optIdx)}
                                className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle} hover:scale-[1.01]`}
                              >
                                <span className="font-bold mr-2 text-slate-400">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation if submitted */}
                      {isSubmitted && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          )}
                          <span>
                            <strong>Tushuntirish:</strong> {q.explanation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Result Card */}
          {isSubmitted && score !== null && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Listening Section Natijasi: {score} / {selectedSection.questions.length} to'g'ri!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Taxminiy IELTS Listening Band: <strong>{score >= 3 ? '7.5' : score === 2 ? '6.5' : '5.5'}</strong> (+{score * 30} tanga va +{score * 40} XP berildi!)
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => {
              handleResetAudio();
              setUserAnswers({});
              setIsSubmitted(false);
              setScore(null);
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            Qayta topshirish
          </button>

          {!isSubmitted ? (
            <button
              id="submit-listening-btn"
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md disabled:opacity-50 transition"
            >
              Javoblarni tekshirish
            </button>
          ) : (
            <button
              onClick={() => {
                handleResetAudio();
                onClose();
              }}
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
