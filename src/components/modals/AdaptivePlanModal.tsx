import React, { useState, useEffect } from 'react';
import { X, Sparkles, Compass, Target, Calendar, CheckCircle2, Award, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { AdaptiveStudyPlan, UserProfile } from '../../types';

interface AdaptivePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onApplyPlan?: (plan: AdaptiveStudyPlan) => void;
}

export const AdaptivePlanModal: React.FC<AdaptivePlanModalProps> = ({
  isOpen,
  onClose,
  user,
  onApplyPlan,
}) => {
  const [targetExam, setTargetExam] = useState('IELTS Academic');
  const [targetScore, setTargetScore] = useState('Band 7.5');
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<AdaptiveStudyPlan | null>(null);

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

  const weakAreaOptions = [
    'IELTS Reading True/False/Not Given',
    'IELTS Reading Headings Matching',
    'IELTS Speaking Part 2 Long Turn',
    'IELTS Writing Task 2 Essay Structure',
    'English Grammar: Conditionals & Inversions',
    'Academic Collocations & Phrasal Verbs',
    'Matematika: Funksiyalar va Hosilalar',
    'Mantiqiy Deduksiya va Sillogizmlar',
  ];

  const toggleWeakArea = (area: string) => {
    setWeakAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/adaptive-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetExam,
          targetScore,
          weakSubjects: weakAreas,
          testHistorySummary: { mastery: user.overallMastery, rating: user.rating },
        }),
      });
      const data = await res.json();
      if (data.plan) {
        setGeneratedPlan(data.plan);
      }
    } catch (err) {
      console.error('Plan generation error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="adaptive-plan-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div id="adaptive-plan-modal-container" className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">Moslashuvchan (Adaptive) AI O'quv Yo'nalishi</h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-bold">
                  Gemini AI Powered
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">
                Sizning zaif mavzularingiz va maqsadingizga moslashtirilgan 4 haftalik shaxsiy reja
              </p>
            </div>
          </div>

          <button
            id="close-adaptive-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!generatedPlan ? (
            /* Setup Form */
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Maqsadli Imtihon
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium"
                  >
                    <option value="IELTS Academic">IELTS Academic (IDP / British Council)</option>
                    <option value="IELTS General Training">IELTS General Training</option>
                    <option value="WIUT / Westminster Math & English">Westminster (WIUT) Entrance</option>
                    <option value="Cambridge CEFR B2/C1">Cambridge CEFR B2/C1</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Kutilayotgan Natija (Score)
                  </label>
                  <select
                    value={targetScore}
                    onChange={(e) => setTargetScore(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium"
                  >
                    <option value="Band 7.0">Band 7.0 (Good Competence)</option>
                    <option value="Band 7.5">Band 7.5 (Top International Universities)</option>
                    <option value="Band 8.0+">Band 8.0+ (Superior Mastery)</option>
                    <option value="WIUT 85%+ Grant">Westminster 85%+ Grant Darajasi</option>
                  </select>
                </div>
              </div>

              {/* Weak Areas Checklist */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Qaysi mavzularda qiyinchilik sezasiz? (AI ularga ko'proq e'tibor qaratadi)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {weakAreaOptions.map((area) => {
                    const isSelected = weakAreas.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleWeakArea(area)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span>{area}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  id="generate-adaptive-plan-btn"
                  onClick={handleGeneratePlan}
                  disabled={isLoading}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 mx-auto disabled:opacity-50 transition"
                >
                  {isLoading ? (
                    <span>AI Shaxsiy Rejangizni Hisoblamoqda...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>4 Haftalik Shaxsiy Rejani Tuzish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Generated Roadmap View */
            <div className="space-y-6">
              {/* Summary Banner */}
              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase">
                    Shaxsiy O'quv Xaritasi
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {generatedPlan.targetExam} — {generatedPlan.targetScore}
                  </h3>
                  <p className="text-xs text-indigo-900/80 dark:text-indigo-200/80 mt-0.5">
                    {generatedPlan.aiAdvice}
                  </p>
                </div>

                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                >
                  Qayta sozlash
                </button>
              </div>

              {/* 4-Week Timeline */}
              <div className="space-y-4">
                {generatedPlan.weeklyRoadmap.map((week) => (
                  <div
                    key={week.weekNumber}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
                          {week.weekNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Hafta {week.weekNumber}: {week.focusTitle}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Haftalik {week.expectedHours} soat</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Asosiy Maqsadlar
                        </span>
                        <ul className="space-y-1">
                          {week.objectives.map((obj, oIdx) => (
                            <li key={oIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Tavsiya Qilingan Modullar
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {week.suggestedModules.map((mod, mIdx) => (
                            <span
                              key={mIdx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-[11px] text-slate-700 dark:text-slate-200 font-medium flex items-center gap-1"
                            >
                              <BookOpen className="w-3 h-3 text-indigo-500" />
                              <span>{mod}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <span className="text-xs text-slate-400">
            Darslar o'zlashtirilishi bilan reja avtomatik adaptatsiya qilinadi.
          </span>
          <button
            onClick={() => {
              if (generatedPlan && onApplyPlan) {
                onApplyPlan(generatedPlan);
              }
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition"
          >
            {generatedPlan ? "Rejani qabul qilish" : "Yopish"}
          </button>
        </div>
      </div>
    </div>
  );
};
