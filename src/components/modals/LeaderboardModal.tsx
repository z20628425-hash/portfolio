import React, { useState } from 'react';
import { X, Trophy, Medal, Crown, Flame, Star, Sparkles, Search, UserCheck } from 'lucide-react';
import { LeaderboardUser } from '../../types';

interface LeaderboardModalProps {
  leaderboard: LeaderboardUser[];
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ leaderboard, onClose }) => {
  const [filter, setFilter] = useState<'overall' | 'weekly' | 'ielts'>('overall');

  return (
    <div
      id="leaderboard-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leaderboard-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5 bg-slate-900/60 backdrop-blur-md animate-fade-in"
    >
      <div id="leaderboard-modal-container" className="glass-modal rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/25" aria-hidden="true">
              <Trophy className="w-6 h-6 text-yellow-200 fill-yellow-200" />
            </div>
            <div>
              <h2 id="leaderboard-modal-title" className="text-lg md:text-xl font-extrabold flex items-center gap-2">
                Peshsafolar Reytingi <Sparkles className="w-4 h-4 text-yellow-200 fill-yellow-200" aria-hidden="true" />
              </h2>
              <p className="text-xs text-amber-100 font-medium">Barcha fanlar va imtihonlar bo'yicha top o'quvchilar</p>
            </div>
          </div>
          <button
            id="close-leaderboard-modal-btn"
            onClick={onClose}
            aria-label="Reyting oynasini yopish"
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Filters */}
        <div role="tablist" aria-label="Reyting toifalari" className="flex bg-slate-100 dark:bg-slate-800 p-1.5 mx-4 mt-4 rounded-2xl shrink-0">
          <button
            id="leaderboard-tab-overall"
            role="tab"
            aria-selected={filter === 'overall'}
            onClick={() => setFilter('overall')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'overall' ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🏆 Umumiy Reyting
          </button>
          <button
            id="leaderboard-tab-weekly"
            role="tab"
            aria-selected={filter === 'weekly'}
            onClick={() => setFilter('weekly')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'weekly' ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🔥 Haftalik Aktivlik
          </button>
          <button
            id="leaderboard-tab-ielts"
            role="tab"
            aria-selected={filter === 'ielts'}
            onClick={() => setFilter('ielts')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'ielts' ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🇬🇧 IELTS & Core
          </button>
        </div>

        {/* Top 3 Podium Cards */}
        <div role="region" aria-label="Top 3 o'rinlar" className="px-4 pt-4 grid grid-cols-3 gap-2 shrink-0">
          {leaderboard.slice(0, 3).map((user, idx) => {
            const podiumStyles = [
              { bg: 'from-amber-100 to-yellow-50 dark:from-amber-950/60 dark:to-yellow-950/40 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200', crownColor: 'text-amber-500 fill-amber-500', label: '1-o\'rin' },
              { bg: 'from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-850 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200', crownColor: 'text-slate-400 fill-slate-400', label: '2-o\'rin' },
              { bg: 'from-amber-800/10 to-orange-100/50 dark:from-amber-950/40 dark:to-orange-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200', crownColor: 'text-amber-700 fill-amber-700', label: '3-o\'rin' },
            ][idx];

            return (
              <div
                key={user.id}
                id={`leaderboard-podium-${user.id}`}
                className={`p-3 rounded-2xl bg-gradient-to-b ${podiumStyles.bg} border flex flex-col items-center text-center relative shadow-xs`}
              >
                <Crown className={`w-5 h-5 absolute -top-2.5 ${podiumStyles.crownColor}`} aria-hidden="true" />
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-xs mt-1 mb-1.5"
                />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">{podiumStyles.label}</span>
                <p className="text-xs font-extrabold truncate w-full text-slate-900 dark:text-white">{user.name}</p>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 mt-0.5">{user.xp} XP</span>
              </div>
            );
          })}
        </div>

        {/* Leaderboard List */}
        <div role="list" aria-label="Boshqa o'quvchilar ro'yxati" className="p-4 overflow-y-auto space-y-2 flex-1">
          {leaderboard.slice(3).map((user) => (
            <div
              key={user.id}
              id={`leaderboard-item-${user.id}`}
              role="listitem"
              className={`p-3 rounded-2xl flex items-center justify-between border transition-all ${
                user.isCurrentUser
                  ? 'bg-sky-50 dark:bg-sky-950/50 border-sky-300 dark:border-sky-700 shadow-sm ring-2 ring-sky-400/20'
                  : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700/60 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs ${
                    user.isCurrentUser ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  #{user.rank}
                </span>
                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                    {user.isCurrentUser && (
                      <span className="text-[10px] bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 font-extrabold px-1.5 py-0.5 rounded-md">
                        Siz
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{user.subject}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1 justify-end">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" aria-hidden="true" /> {user.xp} XP
                </span>
                <p className="text-[10px] text-slate-400 font-bold">{user.mastery}% O'zlashtirish</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
