import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Flame,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Sparkles,
  Shield,
  Zap,
  Gift,
  Crown
} from 'lucide-react';
import { StudyCalendarTask, UserProfile, DailyQuestItem } from '../../types';
import { INITIAL_DAILY_QUESTS, STREAK_MILESTONES } from '../../data/dailyQuestsData';

interface StudyCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserProfile;
  onRewardCoins?: (coins: number, xp: number) => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

export const StudyCalendarModal: React.FC<StudyCalendarModalProps> = ({
  isOpen,
  onClose,
  user,
  onRewardCoins,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'planner' | 'streak'>('planner');
  const [tasks, setTasks] = useState<StudyCalendarTask[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'test' | 'lesson' | 'review' | 'ielts'>('test');
  const [newDuration, setNewDuration] = useState(30);

  // Daily quests state
  const [dailyQuests, setDailyQuests] = useState<DailyQuestItem[]>(INITIAL_DAILY_QUESTS);
  const [claimedMilestones, setClaimedMilestones] = useState<number[]>([]);
  const [streakFrozen, setStreakFrozen] = useState(user?.streakFrozen || false);

  const currentStreak = user?.dailyStreak || 7;

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/planner/tasks')
      .then((res) => res.json())
      .then((data) => {
        if (data.tasks) setTasks(data.tasks);
      })
      .catch((err) => console.log('Tasks fetch error:', err));
  }, [isOpen]);

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

  const handleToggleTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/planner/tasks/${taskId}/toggle`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, completed: data.completed } : t))
        );
        if (data.completed && onRewardCoins) {
          onRewardCoins(20, 25);
        }
      }
    } catch (err) {
      console.log('Toggle task error:', err);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/planner/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          date: selectedDate,
          type: newType,
          durationMinutes: newDuration,
        }),
      });
      const data = await res.json();
      if (data.task) {
        setTasks((prev) => [...prev, data.task]);
        setNewTitle('');
        setIsAddingTask(false);
      }
    } catch (err) {
      console.log('Create task error:', err);
    }
  };

  const handleClaimQuest = (questId: string) => {
    const quest = dailyQuests.find((q) => q.id === questId);
    if (!quest || quest.completed) return;

    setDailyQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: true, current: q.target } : q))
    );

    if (onRewardCoins) {
      onRewardCoins(quest.rewardCoins, quest.rewardXP);
    }
  };

  const handleClaimMilestone = (days: number, rewardCoins: number, rewardXP: number) => {
    if (claimedMilestones.includes(days) || currentStreak < days) return;
    setClaimedMilestones((prev) => [...prev, days]);
    if (onRewardCoins) {
      onRewardCoins(rewardCoins, rewardXP);
    }
  };

  const toggleStreakFreeze = () => {
    if (!streakFrozen) {
      if ((user?.coins || 0) < 50) {
        alert("Streak muzlatgichi uchun 50 ta tanga kerak!");
        return;
      }
      if (onRewardCoins) onRewardCoins(-50, 0);
      setStreakFrozen(true);
      if (onUpdateUser) onUpdateUser({ streakFrozen: true });
    } else {
      setStreakFrozen(false);
      if (onUpdateUser) onUpdateUser({ streakFrozen: false });
    }
  };

  // Calendar 7-day strip centered on current week
  const today = new Date();
  const currentDays = [-3, -2, -1, 0, 1, 2, 3].map((offset) => {
    const d = new Date();
    d.setDate(today.getDate() + offset);
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'][d.getDay()],
      dayNum: d.getDate(),
      isToday: offset === 0,
    };
  });

  const selectedDateTasks = tasks.filter((t) => t.date === selectedDate);
  const completedCount = selectedDateTasks.filter((t) => t.completed).length;

  return (
    <div
      id="calendar-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5 bg-slate-900/70 backdrop-blur-md animate-fade-in"
    >
      <div
        id="calendar-modal-container"
        className="relative w-full max-w-3xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center text-2xl shadow-inner">
              📅
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase">
                <Flame className="w-3 h-3" />
                <span>N18: Streak & Challenge</span>
              </div>
              <h2 id="calendar-modal-title" className="text-base md:text-lg font-black text-white">
                O'quv Kalendari & 30-Kunlik Streak
              </h2>
            </div>
          </div>

          <button
            id="close-calendar-modal-btn"
            onClick={onClose}
            aria-label="Kalendar oynasini yopish"
            className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 p-1.5 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'planner'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Kunlik Rejalar & Vazifalar</span>
          </button>

          <button
            onClick={() => setActiveTab('streak')}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'streak'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>30-Kunlik Streak & Challenge ({currentStreak} Kun 🔥)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
          {/* TAB 1: PLANNER & TASKS */}
          {activeTab === 'planner' && (
            <div className="space-y-5 animate-fade-in">
              {/* 7-Day Horizontal Selector */}
              <div
                role="tablist"
                aria-label="Kunlar tanlovi"
                className="py-2 flex items-center justify-between gap-2 overflow-x-auto"
              >
                {currentDays.map((d) => {
                  const isSelected = selectedDate === d.dateStr;
                  const taskForDay = tasks.filter((t) => t.date === d.dateStr);
                  const hasIncomplete = taskForDay.some((t) => !t.completed);

                  return (
                    <button
                      key={d.dateStr}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedDate(d.dateStr)}
                      className={`flex-1 min-w-[55px] py-2 px-1.5 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-md scale-105'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold ${
                          isSelected ? 'text-emerald-100' : 'text-slate-400'
                        }`}
                      >
                        {d.dayName}
                      </span>
                      <span className="text-sm font-black">{d.dayNum}</span>
                      {taskForDay.length > 0 && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            hasIncomplete ? 'bg-amber-400' : 'bg-emerald-300'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedDate === new Date().toISOString().split('T')[0]
                      ? "Bugungi Vazifalar"
                      : `${selectedDate} sanasi vazifalari`}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {completedCount} / {selectedDateTasks.length} ta vazifa bajarildi
                  </p>
                </div>

                <button
                  id="add-task-btn"
                  onClick={() => setIsAddingTask(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Vazifa qo'shish</span>
                </button>
              </div>

              {/* Add Task Form */}
              {isAddingTask && (
                <form
                  onSubmit={handleCreateTask}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Yangi Vazifa</h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingTask(false)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Bekor qilish
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Masalan: IELTS Speaking 1 ta mavzu yozib olish..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Turi</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                      >
                        <option value="test">Test topshirish</option>
                        <option value="lesson">Dars o'rganish</option>
                        <option value="review">Spaced Repetition xatolar</option>
                        <option value="ielts">IELTS Practicum</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        Davomiyligi (daqiqa)
                      </label>
                      <input
                        type="number"
                        value={newDuration}
                        onChange={(e) => setNewDuration(Number(e.target.value))}
                        min={5}
                        max={180}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                  >
                    Rejaga kiritish
                  </button>
                </form>
              )}

              {/* Task List */}
              <div className="space-y-2.5">
                {selectedDateTasks.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-xs text-slate-500">Ushbu kun uchun reja belgilanmagan.</p>
                  </div>
                ) : (
                  selectedDateTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(task.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 ${
                        task.completed
                          ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-400'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="text-emerald-600 dark:text-emerald-400 shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </button>
                        <div>
                          <h4
                            className={`text-xs font-bold ${
                              task.completed
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                            <span className="capitalize">{task.type}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.durationMinutes} daqiqa
                            </span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          task.completed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {task.completed ? "Bajarildi" : "Kutilmoqda"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 30-DAY STREAK & DAILY QUESTS (N18) */}
          {activeTab === 'streak' && (
            <div className="space-y-6 animate-fade-in">
              {/* Streak Banner & Freeze Powerup */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-xl shadow-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner">
                    🔥
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase text-amber-100">
                      Doimiylik Ritmi
                    </span>
                    <h3 className="text-2xl font-black">{currentStreak} Kunlik Olovli Streak!</h3>
                    <p className="text-xs text-orange-100 mt-0.5">
                      Har kuni 3 ta topshiriqni bajaring va 30 kunlik afsonaviy sertifikatga erishing!
                    </p>
                  </div>
                </div>

                {/* Streak Freeze Button */}
                <button
                  onClick={toggleStreakFreeze}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center gap-2 shadow-md shrink-0 ${
                    streakFrozen
                      ? 'bg-sky-500 text-white hover:bg-sky-600'
                      : 'bg-white text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>{streakFrozen ? "Muzlatgich Faol (Himoyalangan) ❄️" : "Muzlatgich Olish (50 🪙)"}</span>
                </button>
              </div>

              {/* 30-Day Heatmap Progress Grid */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>30-Kunlik O'quv Xaritasi</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </h4>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {currentStreak} / 30 Kun
                  </span>
                </div>

                {/* 30 Days Grid */}
                <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                  {Array.from({ length: 30 }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const isCompleted = dayNum <= currentStreak;
                    const isCurrent = dayNum === currentStreak;
                    const isMilestone = [3, 7, 14, 21, 30].includes(dayNum);

                    return (
                      <div
                        key={dayNum}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border transition-all text-center ${
                          isCompleted
                            ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white border-orange-300 shadow-xs'
                            : isCurrent
                            ? 'bg-amber-100 dark:bg-amber-950 border-2 border-amber-500 text-amber-900 dark:text-amber-200'
                            : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] font-black">{dayNum}</span>
                        <span className="text-xs">
                          {dayNum === 30 ? '👑' : isMilestone ? '⭐' : isCompleted ? '🔥' : '·'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Today's 3 Daily Quests */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Bugungi 3 ta Kunlik Quest
                  </h4>
                  <span className="text-xs text-slate-500">
                    Barchasini bajaring va +100 Coins oling!
                  </span>
                </div>

                <div className="space-y-2.5">
                  {dailyQuests.map((quest) => (
                    <div
                      key={quest.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        quest.completed
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl shadow-xs">
                          {quest.icon}
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-slate-900 dark:text-white">
                            {quest.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {quest.description}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold">
                            <span className="text-amber-600 dark:text-amber-400">+{quest.rewardCoins} Tangalar 🪙</span>
                            <span className="text-sky-600 dark:text-sky-400">+{quest.rewardXP} XP ⭐</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        {quest.completed ? (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-black flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Bajarildi</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaimQuest(quest.id)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-xs transition-all active:scale-95"
                          >
                            Bajarish
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Streak Milestones Rewards Box */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Streak Bosqichlari va Maxsus Sovg'alar
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STREAK_MILESTONES.map((m) => {
                    const unlocked = currentStreak >= m.days;
                    const claimed = claimedMilestones.includes(m.days);

                    return (
                      <div
                        key={m.days}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                          claimed
                            ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-70'
                            : unlocked
                            ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border-amber-300 dark:border-amber-700 shadow-xs'
                            : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{m.icon}</span>
                          <div>
                            <h6 className="text-xs font-black text-slate-800 dark:text-white">{m.label}</h6>
                            <span className="text-[10px] text-amber-600 font-bold">
                              +{m.rewardCoins} 🪙 / +{m.rewardXP} XP
                            </span>
                          </div>
                        </div>

                        {claimed ? (
                          <span className="text-[11px] font-bold text-slate-400">Olingan</span>
                        ) : unlocked ? (
                          <button
                            onClick={() => handleClaimMilestone(m.days, m.rewardCoins, m.rewardXP)}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-xs"
                          >
                            Olish 🎁
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">{m.days} kun kerak</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-2 text-xs font-black text-orange-600 dark:text-orange-400">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>{currentStreak} Kunlik Streak Faol • Har kuni o'rganing!</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black shadow-md transition"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
