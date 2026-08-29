import React from 'react';
import { Home, BookOpen, FileCheck, User } from 'lucide-react';
import { TabType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { translate: t } = useLanguage();

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('home'), icon: <Home className="w-5 h-5" /> },
    { id: 'courses', label: t('courses'), icon: <BookOpen className="w-5 h-5" /> },
    { id: 'tests', label: t('tests'), icon: <FileCheck className="w-5 h-5" /> },
    { id: 'profile', label: t('profile'), icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center px-4 py-2.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border-t border-x border-sky-100 dark:border-slate-800 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] rounded-t-3xl max-w-lg mx-auto md:max-w-2xl transition-colors duration-200">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300/80 dark:border-sky-700 rounded-full px-4 py-1.5 shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 px-3 py-1.5'
            }`}
          >
            <span className={isActive ? 'text-sky-700 dark:text-sky-300' : 'text-slate-400 dark:text-slate-500'}>
              {item.icon}
            </span>
            <span className={`text-[11px] mt-0.5 leading-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
