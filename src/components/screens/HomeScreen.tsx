import React, { useState } from 'react';
import { useLanguage } from "../../contexts/LanguageContext";
import schoolCampusImg from '../../assets/images/school_campus_hero_1787287724631.jpg';
import {
  BookOpen,
  Lightbulb,
  Clock,
  Sparkles,
  Plus,
  ChevronRight,
  Award,
  GraduationCap,
  Gift,
  Coins,
  ShieldCheck,
  Users,
  Share2,
  Headphones,
  FileSpreadsheet,
  Brain,
  Crown,
  Calendar,
  MessageSquare,
  MessageCircle,
  Compass,
  Download,
  MapPin,
  Play
} from 'lucide-react';
import { UserProfile, Course, TestItem, TabType } from '../../types';

interface HomeScreenProps {
  user: UserProfile;
  courses: Course[];
  tests: TestItem[];
  onSelectCourse: (course: Course) => void;
  onStartTest: (test: TestItem) => void;
  onTabChange: (tab: TabType) => void;
  onOpenAITutor: () => void;
  onOpenRewards?: () => void;
  onOpenReferral?: () => void;
  onOpenIELTSListening?: () => void;
  onOpenIELTSReading?: () => void;
  onOpenSpacedRepetition?: () => void;
  onOpenSubscription?: () => void;
  onOpenForum?: () => void;
  onOpenTeacherChat?: () => void;
  onOpenAdaptivePlan?: () => void;
  onOpenStudyCalendar?: () => void;
  onOpenExportProgress?: () => void;
  onOpenDuelBattle?: () => void;
  onOpenGrammarPuzzle?: () => void;
  onOpenVocabMatch?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  courses,
  tests,
  onSelectCourse,
  onStartTest,
  onTabChange,
  onOpenAITutor,
  onOpenRewards,
  onOpenReferral,
  onOpenIELTSListening,
  onOpenIELTSReading,
  onOpenSpacedRepetition,
  onOpenSubscription,
  onOpenForum,
  onOpenTeacherChat,
  onOpenAdaptivePlan,
  onOpenStudyCalendar,
  onOpenExportProgress,
  onOpenDuelBattle,
  onOpenGrammarPuzzle,
  onOpenVocabMatch,
}) => {
  const { translate: t } = useLanguage();
  const [is3DMaktabModalOpen, setIs3DMaktabModalOpen] = useState(false);

  const englishCourse = courses.find((c) => c.id === 'english-core') || courses[0];
  const logicCourse = courses.find((c) => c.id === 'mantiq') || courses[2];
  const firstAvailableTest = tests.find((t) => !t.isLocked) || tests[0];

  return (
    <div className="pt-20 pb-32 px-4 max-w-lg mx-auto md:max-w-3xl space-y-6">
      {/* Welcome & Progress Section */}
      <section className="glass-card rounded-3xl p-5 md:p-6 shadow-xl shadow-sky-900/5 border border-sky-100 dark:border-slate-800 relative overflow-hidden bg-white/90 dark:bg-slate-900/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100/80 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-[11px] font-extrabold border border-sky-200 dark:border-sky-800">
              <GraduationCap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Prep Hub Maktabi • Level 5</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              {t("greeting")}{user.name}! 👋
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-medium">
              Xush kelibsiz! Bugungi o'qish va bilim olish jarayoningizni davom ettiramizmi?
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:justify-end">
            <span className="text-xs font-black text-sky-700 dark:text-sky-300 bg-sky-100/90 dark:bg-sky-950/80 px-2.5 py-1 rounded-xl border border-sky-200 dark:border-sky-800 shadow-xs">
              {user.dailyGoalProgress}% Kunlik Maqsad
            </span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800 shadow-xs">
              ⭐ {user.xp} XP
            </span>
            <span className="text-xs font-black text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/60 px-2.5 py-1 rounded-xl border border-amber-300 dark:border-amber-700 flex items-center gap-1 shadow-xs">
              🪙 {user.coins || 0} Tangalar
            </span>
            {user.isPremium && (
              <span className="text-xs font-black text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/80 px-2.5 py-1 rounded-xl border border-orange-300 dark:border-orange-800 flex items-center gap-1 shadow-xs">
                👑 PRO VIP
              </span>
            )}
          </div>
        </div>

        {/* Featured Real School Campus Banner */}
        <div
          onClick={() => setIs3DMaktabModalOpen(true)}
          className="relative group cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-sky-200/60 dark:border-slate-700 bg-slate-900 transition-all duration-500 hover:shadow-xl hover:border-sky-400 select-none"
        >
          {/* Background Realistic Campus Image */}
          <div className="relative aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] w-full overflow-hidden">
            <img
              src={schoolCampusImg}
              alt="Prezent Prep Hub Maktab Kampusi"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Cinematic Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-sky-950/10 transition-colors duration-500" />
            
            {/* Top Right Floating Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-[10px] font-black text-white border border-white/20 shadow-md flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Ochiq Kampus</span>
              </span>
            </div>

            {/* Bottom Scrim Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/90 backdrop-blur-md text-amber-950 font-black text-[10px] uppercase shadow-sm">
                  <MapPin className="w-3 h-3 text-amber-950" />
                  <span>Prezent Prep Hub • Bosh Maktab Kampusi</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-white tracking-tight drop-shadow-md">
                  Zamonaviy Bilim Maskani & Raqamli Akademiya
                </h3>
                <p className="text-[11px] md:text-xs text-slate-200 line-clamp-1 max-w-md drop-shadow">
                  IELTS 8.5+, Milliy Sertifikat va Prezident Maktabi imtihonlariga tayyorgarlik markazi
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIs3DMaktabModalOpen(true);
                }}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs shadow-md border border-white/30 flex items-center gap-1.5 transform group-hover:scale-105 active:scale-95 transition-all"
              >
                <span>🏛️ Kampusni Ko'rish</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Launchpad: N1-N20 Key Power Tools */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Tezkor O'quv Asboblari (N1–N20)
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Spaced Repetition (N7) */}
          <button
            id="launch-flashcards-btn"
            onClick={onOpenSpacedRepetition}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-purple-900/50 shadow-sm hover:shadow-md hover:border-purple-300 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">SM-2 Flashcards</h4>
            <p className="text-[10px] text-slate-400">Takrorlash algoritmi</p>
          </button>

          {/* IELTS Listening (N5) */}
          <button
            id="launch-listening-btn"
            onClick={onOpenIELTSListening}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/50 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">IELTS Listening</h4>
            <p className="text-[10px] text-slate-400">Audio test & skript</p>
          </button>

          {/* IELTS Reading (N6) */}
          <button
            id="launch-reading-btn"
            onClick={onOpenIELTSReading}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-amber-900/50 shadow-sm hover:shadow-md hover:border-amber-300 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">IELTS Reading</h4>
            <p className="text-[10px] text-slate-400">Academic passage</p>
          </button>

          {/* Adaptive AI Plan (N18) */}
          <button
            id="launch-adaptive-plan-btn"
            onClick={onOpenAdaptivePlan}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900/50 shadow-sm hover:shadow-md hover:border-teal-300 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">Moslashuvchan Reja</h4>
            <p className="text-[10px] text-slate-400">4 haftalik yo'nalish</p>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Study Calendar & Planner (N20) */}
          <button
            id="launch-calendar-btn"
            onClick={onOpenStudyCalendar}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/50 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">O'quv Kalendari</h4>
            <p className="text-[10px] text-slate-400">Kunlik vazifalar</p>
          </button>

          {/* Student Forum (N16) */}
          <button
            id="launch-forum-btn"
            onClick={onOpenForum}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-cyan-100 dark:border-cyan-900/50 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">Talabalar Forumi</h4>
            <p className="text-[10px] text-slate-400">Savol & muhokama</p>
          </button>

          {/* Teacher Mentorship (N17) */}
          <button
            id="launch-teacher-chat-btn"
            onClick={onOpenTeacherChat}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900/50 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">Ustoz bilan Chat</h4>
            <p className="text-[10px] text-slate-400">Jonli maslahat</p>
          </button>

          {/* Export Data & Certificate (N19) */}
          <button
            id="launch-export-btn"
            onClick={onOpenExportProgress}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-400 transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">Natijalar Eksporti</h4>
            <p className="text-[10px] text-slate-400">CSV & Sertifikat</p>
          </button>
        </div>
      </section>

      {/* PRO Subscription Banner (N9) */}
      {!user.isPremium && (
        <section
          onClick={onOpenSubscription}
          className="group cursor-pointer relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-5 shadow-lg shadow-orange-500/20 border border-amber-300 hover:shadow-xl transition-all active:scale-[0.99] text-white flex items-center justify-between gap-4"
        >
          <div className="space-y-1.5 z-10 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 border border-white/30 text-[11px] font-black backdrop-blur-md uppercase tracking-wide">
              <Crown className="w-3.5 h-3.5 text-amber-200" />
              <span>Cheksiz Tayyorgarlik</span>
            </div>
            <h3 className="text-lg font-black text-white">Prezent Prep Hub PRO Obunasi 👑</h3>
            <p className="text-xs text-amber-100 font-medium">
              Cheksiz IELTS AI Speaking, Listening audio, adaptiv reja va ustoz tekshiruvi! (Payme, Click, Uzum)
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
            <Crown className="w-6 h-6 text-white" />
          </div>
        </section>
      )}

      {/* IELTS AI Practicum Special Banner */}
      <section className="p-5 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-lg border border-sky-400/30 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider bg-white/10 px-2 py-0.5 rounded-md border border-white/20">
            YANGI MODULE
          </span>
          <h3 className="text-base font-black">IELTS AI Examiner Practicum</h3>
          <p className="text-xs text-sky-100 font-medium">Speaking va Writing bo'yicha Gemini AI yordamida real Band Score oling!</p>
        </div>
        <button
          onClick={onOpenAITutor}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-2xl shadow-md transition-all shrink-0 hover:scale-105 active:scale-95"
        >
          Mashq Qilish 🚀
        </button>
      </section>

      {/* Gamification & Arena Suite (1v1 Duel, Grammar Puzzle, Vocab Match, Streak) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
              ⚔️ Bilimlar Arenasi & Mini-O'yinlar
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-black text-[10px] uppercase animate-pulse">
              Yangi
            </span>
          </div>
          <button
            onClick={onOpenRewards}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 flex items-center gap-0.5"
          >
            <span>Barchasi</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 1. 1v1 Quiz Battle Duel */}
          <div
            onClick={onOpenDuelBattle}
            className="group cursor-pointer p-4 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-rose-600 text-white shadow-lg shadow-rose-500/20 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-between gap-3 border border-rose-300/30"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
                1v1 PvP Duel
              </span>
              <h4 className="text-sm font-black flex items-center gap-1.5">
                <span>Bilimlar Jangi (Quiz Duel)</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h4>
              <p className="text-[11px] text-rose-100 line-clamp-1">
                Bot yoki o'quvchi bilan 5 raundli real-time quiz jangi!
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
              ⚔️
            </div>
          </div>

          {/* 2. Grammar Puzzle Modal */}
          <div
            onClick={onOpenGrammarPuzzle}
            className="group cursor-pointer p-4 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-between gap-3 border border-indigo-400/30"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
                Grammatika Puzzle
              </span>
              <h4 className="text-sm font-black flex items-center gap-1.5">
                <span>Gap Tuzish & Bo'sh Joylar</span>
                <span className="text-xs">🧩</span>
              </h4>
              <p className="text-[11px] text-indigo-100 line-clamp-1">
                So'zlarni to'g'ri ketma-ketlikda terib grammatikani o'rganing.
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
              🧩
            </div>
          </div>

          {/* 3. Vocabulary Match Game */}
          <div
            onClick={onOpenVocabMatch || onOpenRewards}
            className="group cursor-pointer p-4 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-between gap-3 border border-emerald-400/30"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
                Memory Match
              </span>
              <h4 className="text-sm font-black flex items-center gap-1.5">
                <span>So'z Boyligi Match (IELTS)</span>
                <span className="text-xs">🎴</span>
              </h4>
              <p className="text-[11px] text-emerald-100 line-clamp-1">
                6 ta inglizcha so'z va o'zbekcha ma'nosini tezroq bog'lang!
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
              🎴
            </div>
          </div>

          {/* 4. 30-Day Streak & Daily Quests */}
          <div
            onClick={onOpenStudyCalendar}
            className="group cursor-pointer p-4 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-between gap-3 border border-amber-300/30"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-md">
                30-Kunlik Streak
              </span>
              <h4 className="text-sm font-black flex items-center gap-1.5">
                <span>Kunlik Challenge & Quests</span>
                <span className="text-xs">🔥</span>
              </h4>
              <p className="text-[11px] text-amber-100 line-clamp-1">
                {user.dailyStreak || 7} kunlik olovli doimiylik • 3 ta topshiriq!
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
              🔥
            </div>
          </div>
        </div>
      </section>

      {/* Gamification & Lucky Fortune Wheel Banner */}
      <section
        onClick={onOpenRewards}
        className="group cursor-pointer relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 shadow-lg shadow-amber-500/25 border border-amber-300 hover:shadow-xl transition-all active:scale-[0.99] text-white flex items-center justify-between gap-4"
      >
        <div className="space-y-1.5 z-10 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 border border-white/30 text-[11px] font-black backdrop-blur-md uppercase tracking-wide">
            <Coins className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
            <span>O'yin, Omad Charxpalagi & Tangalar</span>
          </div>
          <h3 className="text-lg font-black text-white">Intellekt O'yini & Kunlik Sovg'alar 🎉</h3>
          <p className="text-xs text-amber-100 font-medium">
            Charxpalakni aylantiring, 30s tezkor o'yin o'ynang va VIP ramkalar yutib oling!
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
          <Gift className="w-6 h-6 text-white" />
        </div>
      </section>

      {/* Refer-a-Friend Banner */}
      <section
        onClick={onOpenReferral}
        className="group cursor-pointer relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-5 shadow-lg shadow-indigo-600/20 border border-purple-400/30 hover:shadow-xl transition-all active:scale-[0.99] text-white flex items-center justify-between gap-4"
      >
        <div className="space-y-1.5 z-10 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 border border-white/30 text-[11px] font-black backdrop-blur-md uppercase tracking-wide">
            <Users className="w-3.5 h-3.5 text-purple-200" />
            <span>Do'stlarni Taklif Qiling & Sovg'a Oling</span>
          </div>
          <h3 className="text-lg font-black text-white">Har Bir Do'st Uchun +150 Tangalar + 200 XP! 🎁</h3>
          <p className="text-xs text-purple-100 font-medium">
            Do'stingizni taklif qiling — ikkalangiz ham +150 Tangalar va +1 Bepul Spin yutib oling!
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
          <Share2 className="w-6 h-6 text-white" />
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="space-y-4">
        {/* English Core Card */}
        <div
          onClick={() => onSelectCourse(englishCourse)}
          className="group cursor-pointer relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-blue-600 rounded-3xl p-6 h-48 flex flex-col justify-between shadow-xl shadow-sky-500/20 border border-sky-300/40 hover:shadow-2xl hover:shadow-sky-500/30 transition-all active:scale-[0.98]"
        >
          <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-white/20 text-white rounded-2xl border border-white/30 backdrop-blur-md shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="bg-white/20 text-white border border-white/30 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
              Core
            </span>
          </div>
          <div className="z-10">
            <h3 className="text-xl font-bold text-white mb-0.5">English Core</h3>
            <p className="text-sm text-sky-100 font-medium">24 ta yangi mavzu</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20 scale-125 pointer-events-none group-hover:scale-135 transition-transform duration-500 text-white">
            <BookOpen className="w-36 h-36" />
          </div>
        </div>

        {/* Logic Card */}
        <div
          onClick={() => onSelectCourse(logicCourse)}
          className="group cursor-pointer relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-700 rounded-3xl p-6 h-48 flex flex-col justify-between shadow-xl shadow-indigo-500/20 border border-blue-400/40 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all active:scale-[0.98]"
        >
          <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-white/20 text-white rounded-2xl border border-white/30 backdrop-blur-md shadow-xs">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="bg-white/20 text-white border border-white/30 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
              Intellekt
            </span>
          </div>
          <div className="z-10">
            <h3 className="text-xl font-bold text-white mb-0.5">Mantiqiy masalalar</h3>
            <p className="text-sm text-indigo-100 font-medium">15 ta masala yechildi</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20 scale-125 pointer-events-none group-hover:scale-135 transition-transform duration-500 text-white">
            <Lightbulb className="w-36 h-36" />
          </div>
        </div>

        {/* Online Tests Card */}
        <div
          onClick={() => onStartTest(firstAvailableTest)}
          className="group cursor-pointer relative overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700 rounded-3xl p-6 h-48 flex flex-col justify-between shadow-xl shadow-cyan-500/20 border border-cyan-300/40 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all active:scale-[0.98]"
        >
          <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-white/20 text-white rounded-2xl border border-white/30 backdrop-blur-md shadow-xs">
              <Clock className="w-6 h-6" />
            </div>
            <span className="bg-white text-sky-800 text-xs font-bold px-3.5 py-1 rounded-full shadow-md shadow-sky-900/10">
              Jonli
            </span>
          </div>
          <div className="z-10">
            <h3 className="text-xl font-bold text-white mb-0.5">Onlayn testlar</h3>
            <p className="text-sm text-cyan-100 font-medium">Imtihonga tayyorgarlik</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20 scale-125 pointer-events-none group-hover:scale-135 transition-transform duration-500 text-white">
            <Clock className="w-36 h-36" />
          </div>
        </div>
      </section>

      {/* Progress Tracking Extra */}
      <section className="glass-card rounded-2xl p-5 border border-sky-100 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-200">Umumiy ko'rsatkich</h4>
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
            Keyingi daraja: {user.xp} XP
          </span>
        </div>
        <div className="w-full bg-sky-100/80 dark:bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-sky-200/50 dark:border-slate-700">
          <div
            className="bg-gradient-to-r from-sky-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out shadow-xs"
            style={{ width: `${Math.min(100, (user.xp / 1000) * 100)}%` }}
          />
        </div>
      </section>

      {/* Motivational Quote */}
      <footer className="pt-2 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-3 glass-card rounded-full border border-sky-100 dark:border-slate-800 shadow-xs">
          <Sparkles className="w-4 h-4 text-sky-500 dark:text-sky-400" />
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 italic font-medium">
            "Har bir qadam sizni muvaffaqiyatga yaqinlashtiradi."
          </p>
        </div>
      </footer>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={onOpenAITutor}
        className="fixed bottom-24 right-6 w-14 h-14 bg-sky-600 hover:bg-sky-500 text-white rounded-full shadow-2xl shadow-sky-600/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 border border-white/40"
        title="AI Yordamchi / Savol Berish"
        aria-label="AI Yordamchi"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* 3D Maktab Interactive Kampus Modal */}
      {is3DMaktabModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIs3DMaktabModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
        >
          <div className="glass-modal rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-sky-200/60 dark:border-sky-800/60 bg-white dark:bg-slate-900 flex flex-col max-h-[90vh]">
            {/* Modal Header with Campus Photo Background */}
            <div className="relative p-5 md:p-6 bg-slate-900 text-white overflow-hidden flex justify-between items-center border-b border-sky-400/30">
              {/* Photo Background */}
              <img
                src={schoolCampusImg}
                alt="Maktab"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-blue-900/85 to-indigo-950/95 pointer-events-none" />
              
              <div className="z-10 flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg p-2">
                  🏛️
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase shadow-sm">
                    <Sparkles className="w-3 h-3 text-amber-950" />
                    <span>Level 5 • Grand Scholar Kampus</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5 drop-shadow">
                    Prep Hub Smart Kampus
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIs3DMaktabModalOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors z-10 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-4 flex-1">
              {/* Status Banner */}
              <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50/60 dark:from-slate-800/90 dark:to-indigo-950/40 rounded-2xl border border-sky-200/80 dark:border-sky-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sky-900 dark:text-sky-300 font-black text-sm">
                    <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <span>Talaba Profili & Kampus Ruxsati</span>
                  </div>
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                    Aktiv • Level 5
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Xush kelibsiz, <strong>{user.name}</strong>! Prezent Prep Hub virtual 3D kampusida barcha interaktiv laboratoriyalar, kutubxonalar va AI o'qituvchilar sizning ixtiyoringizda.
                </p>
              </div>

              {/* Campus Zones / Wings Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Kampus Bo'limlari & Korpuslar
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Wing 1: AI Examiner & Speaking Lab */}
                  <div
                    onClick={() => {
                      setIs3DMaktabModalOpen(false);
                      if (onOpenAITutor) onOpenAITutor();
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-850 border border-sky-200 dark:border-slate-700 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      🤖
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors">
                        AI Sinfxona & Repetitor
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        24/7 savol-javob, Speaking tahlil va grammatika
                      </p>
                    </div>
                  </div>

                  {/* Wing 2: Spaced Repetition Library */}
                  <div
                    onClick={() => {
                      setIs3DMaktabModalOpen(false);
                      if (onOpenSpacedRepetition) onOpenSpacedRepetition();
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/50 dark:from-slate-800 dark:to-slate-850 border border-purple-200 dark:border-slate-700 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      📚
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                        Raqamli Kutubxona
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        SM-2 algoritmli flashcardlar va lug'at boyligi
                      </p>
                    </div>
                  </div>

                  {/* Wing 3: IELTS Mock & Test Lab */}
                  <div
                    onClick={() => {
                      setIs3DMaktabModalOpen(false);
                      onTabChange('tests');
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-850 border border-indigo-200 dark:border-slate-700 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      🧪
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        Test & Imtihon Markazi
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Timed mock testlar, Listening va Reading simulyatori
                      </p>
                    </div>
                  </div>

                  {/* Wing 4: Lucky Wheel & Rewards */}
                  <div
                    onClick={() => {
                      setIs3DMaktabModalOpen(false);
                      if (onOpenRewards) onOpenRewards();
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-slate-800 dark:to-slate-850 border border-amber-200 dark:border-slate-700 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      🎡
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                        Omad Charxpalagi & Sovg'alar
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Kunlik tangalar, XP bonuslari va yutuqlar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    setIs3DMaktabModalOpen(false);
                    if (onOpenRewards) onOpenRewards();
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs md:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Gift className="w-4 h-4" />
                  <span>Omad Charxpalagini Aylantirish</span>
                </button>
                <button
                  onClick={() => setIs3DMaktabModalOpen(false)}
                  className="py-3 px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs md:text-sm transition-all"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
