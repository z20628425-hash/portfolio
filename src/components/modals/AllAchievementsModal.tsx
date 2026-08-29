import React from 'react';
import { X, Star, Flame, GraduationCap, Trophy, Bolt, Book, CheckCircle2, Lock } from 'lucide-react';
import { Achievement } from '../../types';

interface AllAchievementsModalProps {
  achievements: Achievement[];
  onClose: () => void;
}

export const AllAchievementsModal: React.FC<AllAchievementsModalProps> = ({
  achievements,
  onClose,
}) => {
  const getIcon = (iconName: string, unlocked: boolean) => {
    const iconClass = unlocked ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500';
    switch (iconName) {
      case 'local_fire_department':
        return <Flame className={`w-7 h-7 ${iconClass}`} />;
      case 'school':
        return <GraduationCap className={`w-7 h-7 ${iconClass}`} />;
      case 'emoji_events':
        return <Trophy className={`w-7 h-7 ${iconClass}`} />;
      case 'bolt':
        return <Bolt className={`w-7 h-7 ${iconClass}`} />;
      case 'book':
        return <Book className={`w-7 h-7 ${iconClass}`} />;
      case 'star':
      default:
        return <Star className={`w-7 h-7 ${iconClass}`} />;
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="glass-modal rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-sky-900/10 flex flex-col max-h-[85vh] border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-sky-50/80 dark:bg-slate-800/80 border-b border-sky-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Barcha Yutuqlar</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {unlockedCount} / {achievements.length} ta ochilgan
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-sky-100/60 dark:hover:bg-slate-700/60 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                item.unlocked
                  ? 'glass-card border-sky-100 dark:border-slate-800 bg-white/90 dark:bg-slate-800/90 shadow-xs'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/60 opacity-60'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  item.unlocked ? 'bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800' : 'bg-slate-100 dark:bg-slate-800'
                }`}
              >
                {getIcon(item.icon, item.unlocked)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{item.title}</h4>
                  {item.unlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                {item.unlocked && item.unlockedDate && (
                  <p className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold mt-1">
                    Ochilgan vaqti: {item.unlockedDate}
                  </p>
                )}
                {!item.unlocked && item.progress && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1">
                    Jarayon: {item.progress}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
