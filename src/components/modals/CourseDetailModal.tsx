import React, { useState } from 'react';
import { X, CheckCircle2, BookOpen, Clock, ChevronDown, ChevronUp, Sparkles, Award, HelpCircle, Check, AlertCircle } from 'lucide-react';
import { Course } from '../../types';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
  onToggleModuleComplete: (courseId: string, moduleId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onToggleModuleComplete,
}) => {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    course.modules[0]?.id || null
  );

  // Track quiz selections per module
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResult, setShowQuizResult] = useState<Record<string, boolean>>({});

  const handleSelectQuizOption = (moduleId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [moduleId]: optionIndex }));
    setShowQuizResult((prev) => ({ ...prev, [moduleId]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-slate-900/50 backdrop-blur-md">
      <div className="glass-modal rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl shadow-sky-900/20 flex flex-col max-h-[92vh] border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 dark:from-sky-700 dark:via-blue-800 dark:to-indigo-900 border-b border-sky-300/30 flex justify-between items-start text-white relative">
          <div className="z-10 space-y-1">
            <span className="text-[11px] font-extrabold text-white bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{course.category} • Interaktiv Kitob</span>
            </span>
            <h3 className="text-2xl font-extrabold text-white">{course.title}</h3>
            <p className="text-xs text-sky-100 max-w-md font-medium leading-relaxed">{course.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors flex-shrink-0 z-10"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course overall progress bar */}
        <div className="px-6 py-3.5 bg-sky-50/90 dark:bg-slate-800/90 border-b border-sky-100 dark:border-slate-800 flex items-center gap-4">
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>O'zlashtirish Darajasi</span>
              </span>
              <span className="text-sky-600 dark:text-sky-400 font-extrabold">{course.progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-sky-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5 border border-sky-200/60 dark:border-slate-600">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modules List - Interactive Book View */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Darslik Boblari va Mazmuni ({course.modules.length})</span>
            </h4>
            <span className="text-[11px] text-sky-700 dark:text-sky-300 font-bold bg-sky-100/80 dark:bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
              Har bir darslikda nazariya + amaliyot
            </span>
          </div>

          {course.modules.map((mod, index) => {
            const isExpanded = expandedModuleId === mod.id;
            const quizAnswer = selectedAnswers[mod.id];
            const isQuizAnswered = showQuizResult[mod.id];
            const isAnswerCorrect = mod.quiz && quizAnswer === mod.quiz.correctAnswer;

            return (
              <div
                key={mod.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  mod.completed
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300/80 dark:border-emerald-800 shadow-xs'
                    : isExpanded
                    ? 'bg-white dark:bg-slate-800 border-sky-300 dark:border-sky-600 shadow-md ring-2 ring-sky-500/10'
                    : 'bg-white dark:bg-slate-800/90 border-sky-100 dark:border-slate-700 hover:border-sky-200 dark:hover:border-slate-600 shadow-2xs'
                }`}
              >
                {/* Module Summary Header */}
                <div
                  onClick={() =>
                    setExpandedModuleId(isExpanded ? null : mod.id)
                  }
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-sky-50/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleModuleComplete(course.id, mod.id);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                        mod.completed
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                          : 'border-2 border-slate-300 dark:border-slate-600 text-transparent hover:border-sky-500 hover:text-sky-500'
                      }`}
                      title={mod.completed ? "Bajarilgan deb belgilangan" : "Bajarildi deb belgilash"}
                    >
                      <CheckCircle2 className="w-5 h-5 fill-current" />
                    </button>
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <span>{index + 1}. {mod.title}</span>
                        {mod.completed && (
                          <span className="text-[10px] bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                            Tugallangan
                          </span>
                        )}
                      </h5>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        <span className="flex items-center gap-1 text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/70 px-2 py-0.5 rounded-md border border-sky-100 dark:border-sky-800">
                          <Clock className="w-3 h-3" />
                          {mod.duration}
                        </span>
                        <span>O'qish kitob bobi</span>
                      </div>
                    </div>
                  </div>

                  {isExpanded ? (
                    <div className="p-1 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-300 rounded-full">
                      <ChevronUp className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-1 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 rounded-full">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Expanded Rich Book Chapter View */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-sky-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 bg-gradient-to-b from-white via-sky-50/30 to-white dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800">
                    {/* Chapter Introduction */}
                    <div className="bg-sky-50/80 dark:bg-sky-950/50 p-3.5 rounded-2xl border border-sky-200/80 dark:border-sky-800 space-y-1">
                      <span className="font-bold text-sky-800 dark:text-sky-300 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                        <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        Mavzu Xulosasi
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{mod.content}</p>
                    </div>

                    {/* Textbook Theory Rules */}
                    {mod.theoryRules && mod.theoryRules.length > 0 && (
                      <div className="space-y-2 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-sky-100 dark:border-slate-700 shadow-2xs">
                        <h6 className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          Darslik Nazariyasi va Qoidalar
                        </h6>
                        <ul className="space-y-2">
                          {mod.theoryRules.map((rule, rIdx) => (
                            <li key={rIdx} className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Worked Example */}
                    {mod.workedExample && (
                      <div className="bg-amber-50/80 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-800 space-y-2">
                        <span className="font-extrabold text-amber-900 dark:text-amber-200 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          Amaliy Misol va Yechim
                        </span>
                        <div className="space-y-1 text-slate-800 dark:text-slate-200">
                          <p className="font-bold text-amber-950 dark:text-amber-100">❓ Masala: {mod.workedExample.problem}</p>
                          <p className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800/60 font-medium text-slate-700 dark:text-slate-300">
                            ✅ <strong className="text-amber-900 dark:text-amber-300">Yechimi:</strong> {mod.workedExample.solution}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Interactive Self-Check Quiz */}
                    {mod.quiz && (
                      <div className="bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-950/40 dark:to-sky-950/40 p-4 rounded-2xl border border-indigo-200/80 dark:border-indigo-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-900 dark:text-indigo-200 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                            <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            Bilimni Mustahkamlash (O'zingizni Tekshiring)
                          </span>
                          <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
                            Interaktiv Test
                          </span>
                        </div>

                        <p className="font-extrabold text-slate-800 dark:text-slate-100 text-xs leading-relaxed">
                          {mod.quiz.question}
                        </p>

                        <div className="grid grid-cols-1 gap-2">
                          {mod.quiz.options.map((opt, oIdx) => {
                            const isSelected = quizAnswer === oIdx;
                            const isCorrectOpt = oIdx === mod.quiz!.correctAnswer;

                            let btnStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-400 hover:bg-sky-50/50 dark:hover:bg-slate-700";
                            if (isQuizAnswered) {
                              if (isCorrectOpt) {
                                btnStyle = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-xs";
                              } else if (isSelected && !isCorrectOpt) {
                                btnStyle = "bg-rose-500 text-white border-rose-600 font-bold";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectQuizOption(mod.id, oIdx)}
                                className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isQuizAnswered && isCorrectOpt && <Check className="w-4 h-4 flex-shrink-0" />}
                                {isQuizAnswered && isSelected && !isCorrectOpt && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {isQuizAnswered && (
                          <div className={`p-3 rounded-xl border text-xs font-medium space-y-1 ${
                            isAnswerCorrect ? 'bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800' : 'bg-amber-100/90 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                          }`}>
                            <div className="flex items-center gap-1.5 font-extrabold">
                              {isAnswerCorrect ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-600" />
                                  <span>Barakalla! To'g'ri javob berdingiz (+20 XP)!</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-4 h-4 text-amber-600" />
                                  <span>Tahlil va tushuntirish:</span>
                                </>
                              )}
                            </div>
                            <p>{mod.quiz.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Final Mastery Assurance Banner & Completion Button */}
                    <div className="pt-2 space-y-2">
                      <div className="bg-sky-100/70 dark:bg-sky-950/50 p-3 rounded-2xl border border-sky-200 dark:border-sky-800 flex items-center gap-2 text-sky-900 dark:text-sky-200 text-xs font-bold">
                        <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>Mavzu nazariyasi va amaliyotini o'rganib bo'ldingizmi? Tugallang va reytingingizni oshiring!</span>
                      </div>

                      <button
                        onClick={() => onToggleModuleComplete(course.id, mod.id)}
                        className={`w-full py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 ${
                          mod.completed
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/25 active:scale-[0.99]'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {mod.completed
                            ? "Mavzuni qayta belgilash"
                            : "Mavzuni mukammal yakunladim (+20 XP)"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
