import React, { useState } from 'react';
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Calendar,
  Brain,
  Languages,
  Lock,
  Search,
  GraduationCap,
  Award,
  Calculator,
  Clock,
  Sparkles,
  History,
  CheckCircle,
  Flame,
  Headphones,
  BookOpen
} from 'lucide-react';
import { TestItem, RecentResult, TestHistoryRecord, UserProfile } from '../../types';

interface TestsScreenProps {
  user: UserProfile;
  tests: TestItem[];
  recentResults: RecentResult[];
  overallMastery: number;
  testHistory?: TestHistoryRecord[];
  onStartTest: (test: TestItem) => void;
  onOpenIELTSListening?: () => void;
  onOpenIELTSReading?: () => void;
  onOpenSubscription?: () => void;
}

export const TestsScreen: React.FC<TestsScreenProps> = ({
  user,
  tests,
  recentResults,
  overallMastery,
  testHistory = [],
  onStartTest,
  onOpenIELTSListening,
  onOpenIELTSReading,
  onOpenSubscription,
}) => {
  const { translate: t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'available' | 'history'>('available');

  const getTestIcon = (iconName: string) => {
    switch (iconName) {
      case 'psychology':
        return <Brain className="w-7 h-7 text-sky-600" />;
      case 'language':
        return <Languages className="w-7 h-7 text-blue-600" />;
      case 'calculate':
        return <Calculator className="w-7 h-7 text-emerald-600" />;
      case 'school':
        return <GraduationCap className="w-7 h-7 text-sky-600" />;
      case 'lock':
        return <Lock className="w-7 h-7 text-slate-400" />;
      case 'calendar_today':
      default:
        return <Calendar className="w-7 h-7 text-sky-600" />;
    }
  };

  const categories = ['Barchasi', 'English Core', 'Mantiq', 'Algebra & Math', 'Mock Imtihon'];

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'Barchasi') return true;
    if (selectedCategory === 'English Core') return test.subject.includes('English');
    if (selectedCategory === 'Mantiq') return test.subject.includes('Mantiq') || test.subject.includes('Logic');
    if (selectedCategory === 'Algebra & Math') return test.subject.includes('Algebra') || test.subject.includes('Math') || test.subject.includes('Matematika');
    if (selectedCategory === 'Mock Imtihon') return test.id.includes('mock') || test.title.includes('Mock') || test.title.includes('Imtihon');

    return true;
  });

  return (
    <div className="pt-20 pb-32 px-4 max-w-lg mx-auto md:max-w-2xl space-y-8">
      {/* Top Banner / Stat Highlights */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Testlar & Imtihonlar</h2>
          <span className="text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{tests.filter(t => !t.isLocked || user.isPremium).length} ta tayyor</span>
          </span>
        </div>

        {/* IELTS Full Section Exam Modules N5 & N6 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenIELTSListening}
            className="p-4 rounded-3xl bg-gradient-to-br from-indigo-600 to-sky-600 text-white shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-left group flex flex-col justify-between h-36 border border-indigo-400/40"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
                IELTS Audio
              </span>
            </div>
            <div>
              <h4 className="text-base font-extrabold">Listening Test (N5)</h4>
              <p className="text-xs text-indigo-100 font-medium">30 daqiqa • Skript & Avto-ball</p>
            </div>
          </button>

          <button
            onClick={onOpenIELTSReading}
            className="p-4 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-left group flex flex-col justify-between h-36 border border-amber-300/40"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
                IELTS Reading
              </span>
            </div>
            <div>
              <h4 className="text-base font-extrabold">Reading Test (N6)</h4>
              <p className="text-xs text-amber-100 font-medium">60 daqiqa • Passage & Timer</p>
            </div>
          </button>
        </div>

        {/* Recent Results Graph Card */}
        <div className="glass-card rounded-3xl p-6 shadow-xl shadow-sky-900/5 border border-sky-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                Umumiy O'zlashtirish
              </p>
              <p className="text-4xl font-extrabold text-sky-600 dark:text-sky-400 mt-0.5">
                {overallMastery}%
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" />
                <span>+12% rivojlanish</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 mt-1">Haftalik natijalar</p>
            </div>
          </div>

          {/* 3D-Style Progress Chart */}
          <div className="flex items-end justify-between h-32 gap-2 md:gap-4 pt-6 pb-1">
            {recentResults.map((res) => (
              <div key={res.day} className="flex-1 bg-sky-50/70 dark:bg-slate-800 rounded-t-2xl border border-sky-100 dark:border-slate-700 relative h-full flex items-end">
                <div
                  className={`progress-3d-bar w-full rounded-t-2xl transition-all duration-1000 ${
                    res.isCurrent ? 'bg-gradient-to-t from-sky-600 to-blue-500 shadow-md shadow-sky-600/30' : 'bg-sky-400/35 dark:bg-sky-500/25'
                  }`}
                  style={{ height: `${res.percentage}%` }}
                />
                <span
                  className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] ${
                    res.isCurrent ? 'text-sky-700 dark:text-sky-300 font-extrabold' : 'text-slate-400 dark:text-slate-500 font-medium'
                  }`}
                >
                  {res.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main View Tab Toggle */}
      <div className="flex bg-slate-200/70 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('available')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'available' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Mavjud Testlar</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'history' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Test Tarixi ({testHistory.length})</span>
        </button>
      </div>

      {activeTab === 'available' ? (
        <>
          {/* Search & Categories Filter */}
          <section className="space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Test nomi yoki fanni qidirish..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-sky-200/80 dark:border-slate-700 outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20'
                        : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-sky-100 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tests List */}
          <section className="space-y-3">
            {filteredTests.length === 0 ? (
              <div className="glass-card rounded-3xl p-8 text-center border border-sky-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 space-y-2">
                <p className="font-bold text-sm text-slate-700 dark:text-slate-200">Siz qidirgan test topilmadi</p>
                <p className="text-xs text-slate-400">Boshqa kalit so'z yoki toifani tanlab ko'ring.</p>
              </div>
            ) : (
              filteredTests.map((test) => {
                const questionsCount = test.questions && test.questions.length > 0 ? test.questions.length : test.questionsCount;
                const isEffectivelyLocked = test.isLocked && !user.isPremium;

                if (isEffectivelyLocked) {
                  return (
                    <div
                      key={test.id}
                      onClick={onOpenSubscription}
                      className="glass-card rounded-3xl p-5 flex items-center gap-4 opacity-75 border border-amber-200 dark:border-amber-800/70 bg-amber-50/30 dark:bg-amber-950/20 cursor-pointer hover:bg-amber-50/50 dark:hover:bg-amber-950/40 transition-colors"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-500 dark:text-amber-400 flex-shrink-0">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 truncate">
                          {test.title}
                        </h3>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                          {test.lockedReason || 'Qulflangan. Ochish uchun Premium oling.'}
                        </p>
                      </div>
                      <div className="text-xs font-bold text-amber-600 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 border border-amber-200 dark:border-amber-700 px-3 py-1.5 rounded-full flex items-center gap-1">
                        PRO oling
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={test.id}
                    className="glass-card glass-card-hover rounded-3xl p-5 flex items-center gap-4 border border-sky-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 group shadow-sm transition-all"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-200/70 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                      {getTestIcon(test.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800 px-2 py-0.5 rounded-md">
                          {test.subject}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 truncate">
                        {test.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          {test.durationMinutes} daqiqa (Pauza mavjud)
                        </span>
                        <span>•</span>
                        <span>{questionsCount} ta savol</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onStartTest(test)}
                      className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold active:scale-95 transition-all shadow-md shadow-sky-600/25 border border-white/20 flex-shrink-0"
                    >
                      Boshlash
                    </button>
                  </div>
                );
              })
            )}
          </section>
        </>
      ) : (
        /* Test History List */
        <section className="space-y-3">
          {testHistory.length === 0 ? (
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-slate-800 text-center space-y-2">
              <History className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="font-bold text-slate-700 dark:text-slate-200">Hali hech qanday test topshirilmagan</p>
              <p className="text-xs text-slate-400">Testlarni topshirib, natija va statistikangizni shu yerda kuzatib boring!</p>
            </div>
          ) : (
            testHistory.map((item) => (
              <div key={item.id} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-800">
                      {item.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.testTitle}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    To'g'ri: <strong className="text-slate-800 dark:text-slate-200">{item.correctCount}/{item.totalQuestions}</strong> • Vaqt: {Math.round(item.timeSpentSeconds / 60)} daq
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-lg font-black ${item.scorePercent >= 80 ? 'text-emerald-600 dark:text-emerald-400' : item.scorePercent >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {item.scorePercent}%
                  </div>
                  <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5 justify-end">
                    <Flame className="w-3 h-3 fill-amber-500" /> +{item.xpEarned} XP
                  </span>
                </div>
              </div>
            ))
          )}
        </section>
      )}
    </div>
  );
};
