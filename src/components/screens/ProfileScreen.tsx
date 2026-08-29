import React from 'react';
import {
  Award,
  Clock,
  Star,
  Flame,
  GraduationCap,
  Trophy,
  ChevronRight,
  User as UserIcon,
  Bell,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Zap,
  Gift,
  Coins,
  FileText,
  Mic,
  Users,
  Crown,
  Download,
  Calendar,
  MessageSquare,
  MessageCircle,
  Brain,
  Compass,
  Sun,
  Moon
} from 'lucide-react';
import { UserProfile, Achievement } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

interface ProfileScreenProps {
  user: UserProfile;
  achievements: Achievement[];
  onOpenAccountModal: () => void;
  onOpenNotificationModal: () => void;
  onOpenSupportModal: () => void;
  onOpenAllAchievements: () => void;
  onOpenRewards?: () => void;
  onOpenCertificate?: () => void;
  onOpenAITutor?: () => void;
  onOpenReferral?: () => void;
  onOpenSubscription?: () => void;
  onOpenExportProgress?: () => void;
  onOpenStudyCalendar?: () => void;
  onOpenForum?: () => void;
  onOpenTeacherChat?: () => void;
  onOpenAdaptivePlan?: () => void;
  onOpenSpacedRepetition?: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  achievements,
  onOpenAccountModal,
  onOpenNotificationModal,
  onOpenSupportModal,
  onOpenAllAchievements,
  onOpenRewards,
  onOpenCertificate,
  onOpenAITutor,
  onOpenReferral,
  onOpenSubscription,
  onOpenExportProgress,
  onOpenStudyCalendar,
  onOpenForum,
  onOpenTeacherChat,
  onOpenAdaptivePlan,
  onOpenSpacedRepetition,
  onLogout,
}) => {
  const { translate: t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const hasGoldFrame = user.inventory?.includes('gold_frame');
  const hasCrown = user.inventory?.includes('ielts_gg_crown');
  const hasCert = user.inventory?.includes('cert_voucher');
  const hasSpeakingPass = user.inventory?.includes('speaking_pass');
  const hasBoost = user.inventory?.includes('double_xp_boost') || user.inventory?.includes('2x_xp_boost');

  const getAchievementIcon = (iconName: string, unlocked: boolean) => {
    const iconClass = unlocked ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-600';
    switch (iconName) {
      case 'local_fire_department':
        return <Flame className={`w-8 h-8 ${iconClass}`} />;
      case 'school':
        return <GraduationCap className={`w-8 h-8 ${iconClass}`} />;
      case 'emoji_events':
        return <Trophy className={`w-8 h-8 ${iconClass}`} />;
      case 'bolt':
        return <Zap className={`w-8 h-8 ${iconClass}`} />;
      case 'star':
      default:
        return <Star className={`w-8 h-8 ${iconClass}`} />;
    }
  };

  return (
    <div className="pt-20 pb-32 px-4 max-w-lg mx-auto md:max-w-2xl space-y-6">
      {/* Profile Header Section */}
      <section className="flex flex-col items-center pt-2 text-center">
        <div className="relative group cursor-pointer" onClick={onOpenAccountModal}>
          <div className="absolute inset-0 bg-sky-300 dark:bg-sky-600 blur-2xl opacity-50 dark:opacity-30 group-hover:opacity-70 transition-opacity rounded-full" />
          <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full p-1 shadow-xl transition-all ${
            hasGoldFrame
              ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 ring-4 ring-amber-300 dark:ring-amber-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-amber-500/30'
              : 'bg-gradient-to-tr from-sky-400 via-blue-500 to-sky-300 shadow-sky-900/10'
          }`}>
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
              }}
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-sky-600 rounded-full p-1 shadow-md text-white border border-white dark:border-slate-900">
            <CheckCircle2 className="w-5 h-5 fill-sky-600 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            {user.name}
          </h2>
          {hasCrown && (
            <span className="text-2xl" title="IELTS GG Master Crown VIP">🎓</span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="px-3.5 py-1 bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 font-bold text-xs rounded-full">
            {user.rank}
          </span>
          <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {user.xp} XP
          </span>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 rounded-3xl border border-sky-100 dark:border-slate-800 flex flex-col items-center text-center shadow-xs">
          <Award className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-1" />
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Reyting
          </span>
          <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
            #{user.rating}
          </span>
        </div>

        <div
          onClick={onOpenRewards}
          className="glass-card p-4 rounded-3xl border border-amber-200/70 dark:border-amber-800/60 bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-800/80 dark:to-slate-900/80 flex flex-col items-center text-center shadow-xs cursor-pointer hover:scale-102 transition-transform"
        >
          <span className="text-lg mb-0.5">🪙</span>
          <span className="text-[10px] font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            Tangalar
          </span>
          <span className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
            {user.coins || 0}
          </span>
        </div>

        <div className="glass-card p-4 rounded-3xl border border-sky-100 dark:border-slate-800 flex flex-col items-center text-center shadow-xs">
          <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-1" />
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Vaqt
          </span>
          <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
            {user.studyTimeSeconds}s
          </span>
        </div>
      </section>

      {/* Theme Switcher Quick Card (Tongi / Tungi Rejim) */}
      <section className="glass-card p-4 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${isDark ? 'bg-amber-950/70 text-amber-300 border border-amber-800' : 'bg-sky-100 text-sky-600 border border-sky-200'}`}>
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-500" />}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {isDark ? t("nightMode") : t("dayMode")}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {isDark ? "Ko'zni asrovchi qorong'u rejim faol" : "Yorqin qulay kunduzgi rejim faol"}
            </div>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors focus:outline-hidden ${
            isDark ? 'bg-sky-600' : 'bg-slate-300'
          }`}
          title={t("themeToggle")}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform flex items-center justify-center text-[10px] ${
              isDark ? 'translate-x-7' : 'translate-x-1'
            }`}
          >
            {isDark ? '🌙' : '☀️'}
          </span>
        </button>
      </section>

      {/* My Gifts & VIP Inventory Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-500" />
            Mening Sovg'alarim & VIP Buyumlar
          </h3>
          <button
            onClick={onOpenRewards}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-500 text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>Do'kon</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {hasCert && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-md border border-amber-300 dark:border-amber-600 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-xl flex-shrink-0">
                  📜
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">Prep Hub Rasmiy Sertifikati</h4>
                  <p className="text-[11px] text-amber-100">Xalqaro standartdagi muhrlangan hujjat</p>
                </div>
              </div>

              <button
                onClick={onOpenCertificate}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 text-amber-900 dark:text-amber-300 font-black text-xs hover:bg-amber-50 dark:hover:bg-slate-800 transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0 active:scale-95 border border-amber-200 dark:border-amber-700"
              >
                <FileText className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Ochish</span>
              </button>
            </div>
          )}

          {hasGoldFrame && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800 flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">👑</span>
                <div>
                  <div className="font-extrabold text-amber-950 dark:text-amber-100">Oltin Bilimdon Ramkasi</div>
                  <div className="text-[10px] text-amber-700 dark:text-amber-400">Profil atrofida oltin nurlanish FAOL</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 rounded-lg text-[10px] font-black border border-amber-300 dark:border-amber-700">
                FAOL
              </span>
            </div>
          )}

          {hasCrown && (
            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between text-xs font-bold text-purple-900 dark:text-purple-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🎓</span>
                <div>
                  <div className="font-extrabold text-purple-950 dark:text-purple-100">IELTS GG Master Crown</div>
                  <div className="text-[10px] text-purple-700 dark:text-purple-400">Ismingiz yonida toji nishoni FAOL</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-purple-200 dark:bg-purple-900/80 text-purple-900 dark:text-purple-200 rounded-lg text-[10px] font-black border border-purple-300 dark:border-purple-700">
                FAOL
              </span>
            </div>
          )}

          {hasSpeakingPass && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-between text-xs font-bold text-rose-900 dark:text-rose-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🎙️</span>
                <div>
                  <div className="font-extrabold text-rose-950 dark:text-rose-100">Cheksiz AI Speaking Pass</div>
                  <div className="text-[10px] text-rose-700 dark:text-rose-400">AI Examiner bilan muloqot tayyor</div>
                </div>
              </div>
              <button
                onClick={onOpenAITutor}
                className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-[11px] font-black hover:bg-rose-500 shadow-xs flex items-center gap-1 active:scale-95"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>AI Speaking</span>
              </button>
            </div>
          )}

          {hasBoost && (
            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-center justify-between text-xs font-bold text-sky-900 dark:text-sky-200">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">⚡</span>
                <div>
                  <div className="font-extrabold text-sky-950 dark:text-sky-100">24 Soat 2x XP Boost</div>
                  <div className="text-[10px] text-sky-700 dark:text-sky-400">Barcha mashqlardan 2x ko'p XP beriladi</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-sky-200 dark:bg-sky-900/80 text-sky-900 dark:text-sky-200 rounded-lg text-[10px] font-black border border-sky-300 dark:border-sky-700">
                FAOL (2x XP)
              </span>
            </div>
          )}

          {(!user.inventory || user.inventory.length === 0) && (
            <div
              onClick={onOpenRewards}
              className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-dashed border-amber-300 dark:border-amber-800 text-center space-y-1.5 cursor-pointer hover:bg-amber-100/50 dark:hover:bg-amber-950/50 transition-colors"
            >
              <div className="text-xs font-black text-amber-900 dark:text-amber-200">Hali sovg'a sotib olmadingizmi?</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tangalaringizni VIP ramkalar, rasmiy sertifikat va boosterlarga almashtiring!
              </p>
              <button className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-white font-black text-xs rounded-xl shadow-xs">
                Sovg'alar Do'koniga O'tish 🛍️
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Yutuqlar</h3>
          <button
            onClick={onOpenAllAchievements}
            className="text-sky-600 dark:text-sky-400 hover:text-sky-500 text-xs font-bold hover:underline"
          >
            Barchasi
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              onClick={onOpenAllAchievements}
              className="min-w-[96px] flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div
                className={`w-16 h-16 rounded-2xl glass-card border border-sky-100 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${
                  !item.unlocked ? 'opacity-40 grayscale' : ''
                }`}
              >
                {getAchievementIcon(item.icon, item.unlocked)}
              </div>
              <span
                className={`text-xs font-medium text-center line-clamp-1 ${
                  item.unlocked ? 'text-slate-700 dark:text-slate-200 font-semibold' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Settings List */}
      <section className="glass-card rounded-3xl overflow-hidden border border-sky-100 dark:border-slate-800 shadow-xl shadow-sky-900/5">
        {/* PRO Subscription */}
        <button
          onClick={onOpenSubscription}
          className="w-full flex items-center justify-between p-5 hover:bg-orange-50/80 dark:hover:bg-orange-950/30 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <Crown className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>Prezent Prep Hub PRO</span>
                {user.isPremium ? (
                  <span className="text-[10px] font-black bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-800">
                    FAOL 👑
                  </span>
                ) : (
                  <span className="text-[10px] font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800">
                    CHEKSIZ IMKONIYAT
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500">Cheksiz AI Speaking, Listening va testlar</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        {/* Adaptive Plan */}
        <button
          onClick={onOpenAdaptivePlan}
          className="w-full flex items-center justify-between p-5 hover:bg-teal-50/70 dark:hover:bg-teal-950/30 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-base font-semibold text-slate-800 dark:text-slate-100">Moslashuvchan O'quv Rejasi (N18)</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">Shaxsiy 4 haftalik yo'nalish xaritasi</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        {/* Study Calendar */}
        <button
          onClick={onOpenStudyCalendar}
          className="w-full flex items-center justify-between p-5 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-base font-semibold text-slate-800 dark:text-slate-100">O'quv Kalendari & Rejalashtirgich (N20)</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">Kunlik maqsad va rejalashtirilgan mashqlar</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        {/* Spaced Repetition Flashcards */}
        <button
          onClick={onOpenSpacedRepetition}
          className="w-full flex items-center justify-between p-5 hover:bg-purple-50/70 dark:hover:bg-purple-950/30 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-base font-semibold text-slate-800 dark:text-slate-100">SM-2 Spaced Repetition Lug'at (N7)</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">Flashcardlar orqali so'zlarni mustahkamlash</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        {/* Forum */}
        <button
          onClick={onOpenForum}
          className="w-full flex items-center justify-between p-5 hover:bg-cyan-50/70 dark:hover:bg-cyan-950/30 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <MessageSquare className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-base font-semibold text-slate-800 dark:text-slate-100">Talabalar Forumi & Muhokamalar (N16)</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">IELTS va imtihon tajribalari bilan bo'lishish</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        {/* Teacher Chat */}
        <button
          onClick={onOpenTeacherChat}
          className="w-full flex items-center justify-between p-5 hover:bg-blue-50/70 dark:hover:bg-blue-950/30 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-base font-semibold text-slate-800 dark:text-slate-100">Ustoz / Repetitor bilan Jonli Chat (N17)</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">Writing va Speaking insholarini tekshirtirish</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        {/* Export Data & Certificate */}
        <button
          onClick={onOpenExportProgress}
          className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <Download className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-base font-semibold text-slate-800 dark:text-slate-100">Natijalar & Sertifikatlarni Yuklash (N19)</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">CSV/JSON hisobot va PDF rasmiy sertifikat</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        <button
          onClick={onOpenAccountModal}
          className="w-full flex items-center justify-between p-5 hover:bg-sky-50/70 dark:hover:bg-slate-800/60 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <UserIcon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-sky-600 transition-colors" />
            <span className="text-base font-semibold text-slate-800 dark:text-slate-100">Account sozlamalari</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        <button
          onClick={onOpenReferral}
          className="w-full flex items-center justify-between p-5 hover:bg-amber-50/80 dark:hover:bg-amber-950/30 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <Users className="w-5 h-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
            <div>
              <div className="text-base font-bold text-slate-800 dark:text-slate-100">Do'stlarni Taklif Qilish</div>
              <div className="text-xs text-amber-600 dark:text-amber-400 font-extrabold">+150 Tangalar & +200 XP har bir do'st uchun! 🎁</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        <button
          onClick={onOpenNotificationModal}
          className="w-full flex items-center justify-between p-5 hover:bg-sky-50/70 dark:hover:bg-slate-800/60 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-sky-600 transition-colors" />
            <span className="text-base font-semibold text-slate-800 dark:text-slate-100">Notification</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        <button
          onClick={onOpenSupportModal}
          className="w-full flex items-center justify-between p-5 hover:bg-sky-50/70 dark:hover:bg-slate-800/60 transition-colors text-left group"
        >
          <div className="flex items-center gap-4">
            <HelpCircle className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-sky-600 transition-colors" />
            <span className="text-base font-semibold text-slate-800 dark:text-slate-100">Support & Yordam</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
        </button>

        <div className="h-[1px] bg-sky-100 dark:bg-slate-800 mx-5" />

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-5 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left group text-rose-600 dark:text-rose-400"
        >
          <div className="flex items-center gap-4">
            <LogOut className="w-5 h-5 text-rose-500" />
            <span className="text-base font-semibold text-rose-600 dark:text-rose-400">Chiqish</span>
          </div>
        </button>
      </section>
    </div>
  );
};

