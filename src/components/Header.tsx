import React, { useState } from 'react';
import { Search, Gift, Coins, Sparkles, Bell, Globe, Trophy, ShieldCheck, Sun, Moon } from 'lucide-react';
import { UserProfile, LanguageType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  user: UserProfile;
  lang?: LanguageType;
  setLang?: (lang: LanguageType) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenRewards?: () => void;
  onOpenNotifications?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAdmin?: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenSearch,
  onOpenProfile,
  onOpenRewards,
  onOpenNotifications,
  onOpenLeaderboard,
  onOpenAdmin,
  unreadCount = 2,
}) => {
  const { lang, setLang, translate: t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const hasGoldFrame = user.inventory?.includes('gold_frame');
  const hasCrown = user.inventory?.includes('ielts_gg_crown');
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full z-40 flex justify-between items-center px-3 md:px-8 h-16 bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border-b border-sky-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xs transition-colors duration-200">
      <div className="flex items-center gap-2 md:gap-3">
        <button 
          onClick={onOpenProfile}
          className={`relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden transition-transform active:scale-95 focus:outline-hidden ${
            hasGoldFrame
              ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-white dark:ring-offset-slate-900 shadow-md shadow-amber-500/20'
              : 'border-2 border-sky-400 dark:border-sky-500 shadow-xs'
          }`}
          title="Profilga o'tish"
        >
          <img 
            src={user.avatarUrl} 
            alt={user.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
            }}
          />
        </button>

        <div className="flex items-center gap-1 cursor-pointer" onClick={onOpenProfile}>
          <h1 className="font-black text-base md:text-xl tracking-tight bg-gradient-to-r from-sky-900 via-sky-700 to-blue-600 dark:from-sky-300 dark:via-sky-400 dark:to-blue-400 bg-clip-text text-transparent hover:opacity-90">
            Prezent Prep Hub
          </h1>
          {hasCrown && <span className="text-sm md:text-base" title="IELTS Master Crown">🎓</span>}
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Day / Night Mode Switcher Button */}
        <button
          id="theme-toggle-header-btn"
          onClick={toggleTheme}
          aria-label={isDark ? t("dayMode") : t("nightMode")}
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 active:scale-95 transition-all flex items-center justify-center border border-slate-200/80 dark:border-slate-700 shadow-xs"
          title={isDark ? `${t("dayMode")} (Light)` : `${t("nightMode")} (Dark)`}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200/60 dark:border-slate-700"
            title="Tilni o'zgartirish (i18n)"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span className="uppercase">{lang}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-50 animate-fade-in text-xs font-bold">
              <button
                onClick={() => {
                  setLang('uz');
                  setShowLangMenu(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-sky-50 dark:hover:bg-slate-700 flex items-center justify-between ${lang === 'uz' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>🇺🇿 O'zbek</span>
              </button>
              <button
                onClick={() => {
                  setLang('ru');
                  setShowLangMenu(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-sky-50 dark:hover:bg-slate-700 flex items-center justify-between ${lang === 'ru' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>🇷🇺 Русский</span>
              </button>
              <button
                onClick={() => {
                  setLang('en');
                  setShowLangMenu(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-sky-50 dark:hover:bg-slate-700 flex items-center justify-between ${lang === 'en' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>🇬🇧 English</span>
              </button>
            </div>
          )}
        </div>

        {/* Leaderboard Trigger */}
        {onOpenLeaderboard && (
          <button
            onClick={onOpenLeaderboard}
            className="p-2 rounded-full text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 active:scale-95 transition-all shadow-2xs"
            title="Leaderboard / Reyting"
          >
            <Trophy className="w-4 h-4 fill-amber-500 text-amber-500" />
          </button>
        )}

        {/* Admin Trigger (Visible for Admin Users) */}
        {onOpenAdmin && user.role === 'admin' && (
          <button
            onClick={onOpenAdmin}
            className="px-2.5 py-1.5 rounded-full text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 active:scale-95 transition-all shadow-2xs font-extrabold text-xs flex items-center gap-1"
            title="Admin Panel"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden md:inline">Admin</span>
          </button>
        )}

        {/* Coins & Game Badge */}
        {onOpenRewards && (
          <button
            onClick={onOpenRewards}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border border-amber-300/80 dark:border-amber-600/60 text-amber-950 dark:text-amber-300 text-xs font-black shadow-2xs hover:scale-105 transition-all"
            title="Omad Charxpalagi va Tangalar"
          >
            <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-pulse" />
            <span>🪙 {user.coins || 0}</span>
          </button>
        )}

        {/* Notifications Bell */}
        {onOpenNotifications && (
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all border border-transparent dark:border-slate-700"
            title="Bildirishnomalar"
          >
            <Bell className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white dark:border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-full text-slate-600 dark:text-slate-200 bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-200/60 dark:border-slate-700 active:scale-95 transition-all flex items-center justify-center shadow-xs"
          title="Qidirish"
        >
          <Search className="w-4 h-4 text-sky-700 dark:text-sky-400" />
        </button>
      </div>
    </header>
  );
};


