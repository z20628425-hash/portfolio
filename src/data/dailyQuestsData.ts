import { DailyQuestItem } from '../types';

export const INITIAL_DAILY_QUESTS: DailyQuestItem[] = [
  {
    id: 'dq_1',
    title: "So'z Boyligi Match O'yini",
    description: "Kunlik Vocabulary Match o'yinida kamida 4 juftlikni to'g'ri toping",
    category: 'vocab',
    current: 0,
    target: 4,
    unit: 'juftlik',
    rewardCoins: 40,
    rewardXP: 60,
    completed: false,
    icon: '🎴'
  },
  {
    id: 'dq_2',
    title: "1v1 Quiz Duel yoki Mini Test",
    description: "Do'stlar yoki AI bilan 1 ta duelda qatnashing yoki test yeching",
    category: 'duel',
    current: 0,
    target: 1,
    unit: 'jang',
    rewardCoins: 50,
    rewardXP: 80,
    completed: false,
    icon: '⚔️'
  },
  {
    id: 'dq_3',
    title: "Grammatika Puzzle Mashg'uloti",
    description: "2 ta grammatika pazzli yoki gap tuzilmasini xatosiz yakunlang",
    category: 'grammar',
    current: 0,
    target: 2,
    unit: 'puzzle',
    rewardCoins: 35,
    rewardXP: 50,
    completed: false,
    icon: '🧩'
  }
];

export const STREAK_MILESTONES = [
  { days: 3, rewardCoins: 50, rewardXP: 100, label: '3-kunlik Olov', icon: '🔥' },
  { days: 7, rewardCoins: 150, rewardXP: 300, label: '1 Haftalik Qahramon', icon: '⚡' },
  { days: 14, rewardCoins: 300, rewardXP: 600, label: '2 Haftalik Doimiy Ilm', icon: '🌟' },
  { days: 21, rewardCoins: 500, rewardXP: 1000, label: '21 Kunlik Odat', icon: '💎' },
  { days: 30, rewardCoins: 1000, rewardXP: 2500, label: '30-Kunlik Afsonaviy Sertifikat', icon: '👑', specialBadge: 'Legendary 30-Day Streak Master' }
];
