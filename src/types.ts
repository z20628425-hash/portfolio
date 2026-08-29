export type TabType = 'home' | 'courses' | 'tests' | 'profile' | 'admin' | 'leaderboard';
export type LanguageType = 'uz' | 'ru' | 'en';

export interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  bio?: string;
  password?: string;
  role?: 'student' | 'admin' | 'teacher';
  avatarUrl: string;
  rank: string;
  xp: number;
  coins: number; // Prep Coins currency
  inventory?: string[]; // Purchased items & rewards
  rating: number; // e.g., 124
  studyTimeSeconds: number; // e.g. 42 seconds or converted to format
  weeklyStudyHours: number; // e.g. 12 hours
  overallMastery: number; // e.g. 84%
  dailyGoalProgress: number; // e.g. 75%
  isVerified: boolean;
  isPremium?: boolean;
  premiumExpiresAt?: string;
  lastSpinDate?: string; // e.g. '2026-08-05'
  freeSpinUsedToday?: boolean; // Has used the 1st daily free spin
  earnedSpinsCount?: number; // Number of extra spins unlocked by scoring well in tests
  referralCode?: string; // e.g. 'PREP-7829'
  referralCount?: number; // Number of friends invited
  invitedByCode?: string; // Referral code of the inviter if applied
  registeredAt?: string;
  // N16-N19 New gamification stats
  duelWins?: number;
  duelLosses?: number;
  duelPoints?: number;
  dailyStreak?: number; // e.g. 7 days streak
  streakFrozen?: boolean;
  lastActiveDate?: string;
  vocabMasteryScore?: number;
  grammarStars?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: string;
  unlockedDate?: string;
}

export interface ModulePracticeQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
  theoryRules?: string[];
  workedExample?: {
    problem: string;
    solution: string;
  };
  quiz?: ModulePracticeQuestion;
}

export interface Course {
  id: string;
  title: string;
  category: string; // e.g., 'Core', 'Intellekt', 'Matematika'
  subtitle: string;
  description: string;
  progress: number; // 0 - 100
  topicsCount: number;
  solvedCount?: number;
  icon: string;
  colorScheme: 'primary' | 'tertiary' | 'accent';
  modules: CourseModule[];
}

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TestItem {
  id: string;
  title: string;
  subject: string;
  questionsCount: number;
  durationMinutes: number;
  isLocked: boolean;
  lockedReason?: string;
  icon: string;
  questions: TestQuestion[];
}

export interface RecentResult {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  percentage: number;
  isCurrent?: boolean;
}

export interface TestHistoryRecord {
  id: string;
  testId: string;
  testTitle: string;
  subject: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  date: string;
  timeSpentSeconds: number;
  xpEarned: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'achievement' | 'test' | 'course' | 'system' | 'reward' | 'reminder';
  isRead: boolean;
}

export interface NotificationSetting {
  studyReminders: boolean;
  testAlerts: boolean;
  achievementNotifications: boolean;
  weeklyReport: boolean;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatarUrl: string;
  xp: number;
  coins: number;
  mastery: number;
  subject: string;
  isCurrentUser?: boolean;
  duelWins?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  bandScore?: string;
}

export interface IELTSSpeakingFeedback {
  bandScore: string;
  fluencyScore: string;
  lexicalScore: string;
  grammarScore: string;
  feedback: string;
  corrections: string[];
  recommendation: string;
}

export interface IELTSWritingFeedback {
  overallBand: string;
  taskAchievement: string;
  coherenceCohesion: string;
  lexicalResource: string;
  grammarAccuracy: string;
  detailedAnalysis: string;
  improvedVersion: string;
  suggestions: string[];
}

// N5 & N6: IELTS Listening & Reading
export interface IELTSListeningSection {
  id: number;
  title: string;
  description: string;
  audioScript: string;
  audioDurationSeconds: number;
  questions: {
    id: number;
    question: string;
    type: 'multiple_choice' | 'fill_in_blank';
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
  }[];
}

export interface IELTSReadingPassage {
  id: number;
  title: string;
  passageText: string;
  wordCount: number;
  questions: {
    id: number;
    type: 'true_false_ng' | 'matching_headings' | 'multiple_choice';
    question: string;
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
  }[];
}

// N7: Spaced Repetition Flashcard (SM-2)
export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  subject: string;
  sourceQuestionId?: number | string;
  sourceContext?: string;
  easeFactor: number; // default 2.5
  intervalDays: number; // default 1
  repetitions: number;
  dueDate: string; // ISO format or YYYY-MM-DD
  state: 'learning' | 'review' | 'mastered';
}

// N9: Payment & Premium Subscription
export interface SubscriptionPlan {
  id: string;
  name: string;
  priceUzs: number;
  priceUsd?: number;
  durationMonths: number;
  features: string[];
  isPopular?: boolean;
}

export interface PaymentTransaction {
  id: string;
  planId: string;
  amountUzs: number;
  paymentMethod: 'payme' | 'click' | 'stripe' | 'uzum';
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

// N16: Student Discussion Forum
export interface ForumComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'student' | 'teacher' | 'admin';
  content: string;
  timestamp: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  subject: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'student' | 'teacher';
  timestamp: string;
  upvotes: number;
  userUpvoted?: boolean;
  comments: ForumComment[];
}

// N17: Teacher-Student Messaging
export interface TeacherProfile {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  subject: string;
  rating: number;
  studentsCount: number;
  isOnline: boolean;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

// N18: Adaptive AI Study Path
export interface AdaptiveStudyPlan {
  targetExam: string;
  targetScore: string;
  durationWeeks: number;
  weakSubjects: string[];
  strongSubjects: string[];
  weeklyRoadmap: {
    weekNumber: number;
    focusTitle: string;
    objectives: string[];
    suggestedModules: string[];
    expectedHours: number;
  }[];
  aiAdvice: string;
}

// N20: Study Planner & Calendar
export interface StudyCalendarTask {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'test' | 'lesson' | 'review' | 'ielts';
  completed: boolean;
  durationMinutes: number;
}

// N19: Progress Export & Test Record
export interface CompletedTestRecord {
  id: string;
  testId: string;
  testTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentMinutes: number;
  completedAt: string;
  answers: Record<number, number | string>;
}

// N14: Admin Analytics
export interface AdminAnalyticsData {
  dailyActiveUsers: number;
  totalRegistered: number;
  testsCompletedToday: number;
  averageScorePercent: number;
  aiQueriesToday: number;
  totalRevenueUzs: number;
  weeklyDauTrend: { day: string; dau: number; tests: number }[];
  subjectDistribution: { subject: string; learnersCount: number; mastery: number }[];
}

// N16: Vocabulary Match Game Item
export interface VocabMatchCard {
  id: string;
  word: string;
  translation: string;
  phonetic?: string;
  category: string;
  cefrLevel: 'B1' | 'B2' | 'C1' | 'C2';
  exampleEn: string;
  exampleUz: string;
}

// N17: 1v1 Quiz Battle Duel
export interface DuelQuestion {
  id: number;
  question: string;
  category: 'IELTS' | 'English' | 'Matematika' | 'Mantiq';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DuelOpponent {
  id: string;
  name: string;
  avatarUrl: string;
  rank: string;
  rating: number;
  accuracyRate: number; // 0.7 - 0.95 for bot response simulation
}

// N18: Daily Quest / Streak Challenge
export interface DailyQuestItem {
  id: string;
  title: string;
  description: string;
  category: 'vocab' | 'test' | 'speaking' | 'duel' | 'grammar';
  current: number;
  target: number;
  unit: string;
  rewardCoins: number;
  rewardXP: number;
  completed: boolean;
  icon: string;
}

// N19: Grammar Puzzle Item
export interface GrammarPuzzleItem {
  id: string;
  type: 'word_order' | 'fill_blank';
  level: 'easy' | 'medium' | 'hard';
  topic: string; // e.g., 'Conditionals', 'Inversion', 'Passive Voice'
  prompt: string; // e.g. "To'g'ri so'z tartibini tuzing" or "Bo'shliqni to'ldiring"
  scrambledWords?: string[]; // for word order
  correctSentence: string;
  sentenceWithBlank?: string; // for fill_blank: "If I _____ harder, I would have passed the exam."
  options?: string[]; // for fill_blank: ["had studied", "studied", "would study", "have studied"]
  correctOptionIndex?: number;
  ruleExplanation: string;
}



