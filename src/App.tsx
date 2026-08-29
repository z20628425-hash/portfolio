import React, { useState, useEffect } from 'react';
import { TabType, UserProfile, Course, TestItem, Achievement, RecentResult, LanguageType, TestHistoryRecord, CompletedTestRecord, AdaptiveStudyPlan } from './types';
import {
  initialUserProfile,
  initialCourses,
  initialTests,
  initialAchievements,
  initialRecentResults,
  initialLeaderboard,
  initialTestHistory,
  initialCompletedTestRecords,
} from './data/mockData';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { CoursesScreen } from './components/screens/CoursesScreen';
import { TestsScreen } from './components/screens/TestsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { AdminScreen } from './components/screens/AdminScreen';

import { TestRunnerModal } from './components/modals/TestRunnerModal';
import { CourseDetailModal } from './components/modals/CourseDetailModal';
import { SearchModal } from './components/modals/SearchModal';
import { AccountModal } from './components/modals/AccountModal';
import { NotificationModal } from './components/modals/NotificationModal';
import { SupportModal } from './components/modals/SupportModal';
import { AllAchievementsModal } from './components/modals/AllAchievementsModal';
import { AITutorModal } from './components/modals/AITutorModal';
import { RewardsGameModal } from './components/modals/RewardsGameModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { ReferralModal } from './components/modals/ReferralModal';
import { LeaderboardModal } from './components/modals/LeaderboardModal';
import { IELTSPracticeModal } from './components/modals/IELTSPracticeModal';
import { DuelBattleModal } from './components/modals/DuelBattleModal';
import { GrammarPuzzleModal } from './components/modals/GrammarPuzzleModal';

// N1-N20 Roadmap Modals
import { IELTSListeningModal } from './components/modals/IELTSListeningModal';
import { IELTSReadingModal } from './components/modals/IELTSReadingModal';
import { SpacedRepetitionModal } from './components/modals/SpacedRepetitionModal';
import { SubscriptionModal } from './components/modals/SubscriptionModal';
import { ForumModal } from './components/modals/ForumModal';
import { TeacherChatModal } from './components/modals/TeacherChatModal';
import { AdaptivePlanModal } from './components/modals/AdaptivePlanModal';
import { StudyCalendarModal } from './components/modals/StudyCalendarModal';
import { ExportProgressModal } from './components/modals/ExportProgressModal';

export default function App() {
  // Application State initialized with LocalStorage persistence
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('prep_hub_is_logged_in');
    return saved === 'true';
  });

  const [activeTab, setActiveTab] = useState<TabType | 'admin'>('home');
  const [currentLang, setCurrentLang] = useState<LanguageType>('uz');

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('prep_hub_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const today = new Date().toISOString().slice(0, 10);
        if (parsed.lastSpinDate !== today) {
          parsed.freeSpinUsedToday = false;
          parsed.lastSpinDate = today;
        }
        return parsed;
      } catch (e) {
        console.error("LocalStorage user load error", e);
      }
    }
    return {
      ...initialUserProfile,
      lastSpinDate: new Date().toISOString().slice(0, 10),
      freeSpinUsedToday: false,
      earnedSpinsCount: 1,
    };
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('prep_hub_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [tests, setTests] = useState<TestItem[]>(() => {
    const saved = localStorage.getItem('prep_hub_tests');
    return saved ? JSON.parse(saved) : initialTests;
  });

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (data.courses && data.courses.length > 0) {
          setCourses(data.courses);
          localStorage.setItem('prep_hub_courses', JSON.stringify(data.courses));
        } else {
          // Initialize backend with mock data if empty
          initialCourses.forEach(c => fetch('/api/admin/courses', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(c) }));
        }
      })
      .catch(console.error);

    fetch('/api/tests')
      .then(res => res.json())
      .then(data => {
        if (data.tests && data.tests.length > 0) {
          setTests(data.tests);
          localStorage.setItem('prep_hub_tests', JSON.stringify(data.tests));
        } else {
          initialTests.forEach(t => fetch('/api/admin/tests', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(t) }));
        }
      })
      .catch(console.error);
  }, []);

  const handleAddCourse = (newCourse: Course) => {
    fetch('/api/admin/courses', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(newCourse) })
      .then(() => {
        const updated = [newCourse, ...courses];
        setCourses(updated);
        localStorage.setItem('prep_hub_courses', JSON.stringify(updated));
      });
  };

  const handleDeleteCourse = (id: string) => {
    fetch(`/api/admin/courses/${id}`, { method: 'DELETE' })
      .then(() => {
        const updated = courses.filter(c => c.id !== id);
        setCourses(updated);
        localStorage.setItem('prep_hub_courses', JSON.stringify(updated));
      });
  };

  const handleAddTest = (newTest: TestItem) => {
    fetch('/api/admin/tests', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(newTest) })
      .then(() => {
        const updated = [newTest, ...tests];
        setTests(updated);
        localStorage.setItem('prep_hub_tests', JSON.stringify(updated));
      });
  };

  const handleDeleteTest = (id: string) => {
    fetch(`/api/admin/tests/${id}`, { method: 'DELETE' })
      .then(() => {
        const updated = tests.filter(t => t.id !== id);
        setTests(updated);
        localStorage.setItem('prep_hub_tests', JSON.stringify(updated));
      });
  };

  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  
  const [testHistory, setTestHistory] = useState<TestHistoryRecord[]>(() => {
    const saved = localStorage.getItem('prep_hub_test_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("LocalStorage test history load error", e);
      }
    }
    return initialTestHistory;
  });

  useEffect(() => {
    // Dynamic Achievements Calculation
    const newAchievements = [...achievements];
    let changed = false;

    const todayStr = new Date().toLocaleDateString('uz-UZ');

    // 1. Ilk qadam (First Step - 1 test)
    if (testHistory.length >= 1 && !newAchievements[0].unlocked) {
      newAchievements[0].unlocked = true;
      newAchievements[0].unlockedDate = todayStr;
      changed = true;
    }

    // 2. 7 kunlik streak (Mock: 7 tests overall for now)
    if (testHistory.length >= 7 && !newAchievements[1].unlocked) {
      newAchievements[1].unlocked = true;
      newAchievements[1].unlockedDate = todayStr;
      changed = true;
    }

    // 3. Ekspert (50 tests with 90%+)
    const expertTestsCount = testHistory.filter(t => t.scorePercent >= 90).length;
    if (newAchievements[2].progress !== `${expertTestsCount}/50` || (expertTestsCount >= 50 && !newAchievements[2].unlocked)) {
      newAchievements[2].progress = `${expertTestsCount}/50`;
      if (expertTestsCount >= 50 && !newAchievements[2].unlocked) {
        newAchievements[2].unlocked = true;
        newAchievements[2].unlockedDate = todayStr;
      }
      changed = true;
    }

    // 4. G'olib (Top 10 leaderboard, approx: 2000+ XP)
    const isTop10 = user.xp >= 2000;
    const currentRank = isTop10 ? 'Top 10 da' : 'Reytingda yo\'q';
    if (newAchievements[3].progress !== currentRank || (isTop10 && !newAchievements[3].unlocked)) {
      newAchievements[3].progress = currentRank;
      if (isTop10 && !newAchievements[3].unlocked) {
        newAchievements[3].unlocked = true;
        newAchievements[3].unlockedDate = todayStr;
      }
      changed = true;
    }

    // 5. Tezkor mantiq (Logic < 5 mins, 10 tests)
    const fastLogicCount = testHistory.filter(t => t.subject.includes('Mantiq') && t.timeSpentSeconds <= 300).length;
    if (newAchievements[4].progress !== `${fastLogicCount}/10` || (fastLogicCount >= 10 && !newAchievements[4].unlocked)) {
      newAchievements[4].progress = `${fastLogicCount}/10`;
      if (fastLogicCount >= 10 && !newAchievements[4].unlocked) {
        newAchievements[4].unlocked = true;
        newAchievements[4].unlockedDate = todayStr;
      }
      changed = true;
    }

    // 6. Lug'at ustasi (500 words -> approx mastery >= 80)
    const wordCount = Math.floor(user.mastery * 5); // Just a visual mock of progress
    const wordsCapped = wordCount > 500 ? 500 : wordCount;
    if (newAchievements[5].progress !== `${wordsCapped}/500` || (wordsCapped >= 500 && !newAchievements[5].unlocked)) {
      newAchievements[5].progress = `${wordsCapped}/500`;
      if (wordsCapped >= 500 && !newAchievements[5].unlocked) {
        newAchievements[5].unlocked = true;
        newAchievements[5].unlockedDate = todayStr;
      }
      changed = true;
    }

    if (changed) {
      setAchievements(newAchievements);
    }
  }, [testHistory, user.xp, user.mastery, achievements]);

  const [recentResults, setRecentResults] = useState<RecentResult[]>(() => {
    const saved = localStorage.getItem('prep_hub_recent_results');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("LocalStorage results load error", e);
      }
    }
    return initialRecentResults;
  });

  const [completedTests, setCompletedTests] = useState<CompletedTestRecord[]>(() => {
    const saved = localStorage.getItem('prep_hub_completed_tests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("LocalStorage completed tests error", e);
      }
    }
    return initialCompletedTestRecords;
  });

  // Fetch real/synced leaderboard from API on mount
  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        if (data.leaderboard && Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        }
      })
      .catch((err) => console.log('Leaderboard fetch error:', err));
  }, []);

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTest, setActiveTest] = useState<TestItem | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAllAchievementsOpen, setIsAllAchievementsOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isIELTSPracticeOpen, setIsIELTSPracticeOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  // N1-N20 Modal States
  const [isIELTSListeningOpen, setIsIELTSListeningOpen] = useState(false);
  const [isIELTSReadingOpen, setIsIELTSReadingOpen] = useState(false);
  const [isSpacedRepetitionOpen, setIsSpacedRepetitionOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isForumOpen, setIsForumOpen] = useState(false);
  const [isTeacherChatOpen, setIsTeacherChatOpen] = useState(false);
  const [isAdaptivePlanOpen, setIsAdaptivePlanOpen] = useState(false);
  const [isStudyCalendarOpen, setIsStudyCalendarOpen] = useState(false);
  const [isExportProgressOpen, setIsExportProgressOpen] = useState(false);
  const [isDuelBattleOpen, setIsDuelBattleOpen] = useState(false);
  const [isGrammarPuzzleOpen, setIsGrammarPuzzleOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('prep_hub_is_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('prep_hub_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('prep_hub_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('prep_hub_recent_results', JSON.stringify(recentResults));
  }, [recentResults]);

  useEffect(() => {
    localStorage.setItem('prep_hub_test_history', JSON.stringify(testHistory));
  }, [testHistory]);

  // Sync with backend
  useEffect(() => {
    if (isLoggedIn && user.email) {
      const syncData = async () => {
        try {
          await fetch('/api/user/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              appData: {
                testHistory,
                recentResults,
                achievements,
              }
            })
          });
        } catch (e) {
          console.error('Failed to sync to server', e);
        }
      };
      // Debounce sync slightly
      const timeout = setTimeout(syncData, 2000);
      return () => clearTimeout(timeout);
    }
  }, [testHistory, recentResults, achievements, isLoggedIn, user.email]);

  const handleLogin = async (userData: any) => {
    setUser((prev) => ({
      ...prev,
      name: userData.name,
      email: userData.email || prev.email,
      avatarUrl: userData.avatarUrl,
      role: userData.role || 'student',
      xp: userData.xp || 0,
      coins: userData.coins || 0,
      mastery: userData.mastery || 0,
      isPremium: userData.isPremium || false,
      isVerified: userData.isVerified || false,
      referralCode: userData.referralCode || prev.referralCode,
      lastSpinDate: new Date().toISOString().slice(0, 10),
    }));

    try {
      const email = userData.email || user.email;
      const res = await fetch(`/api/user/sync?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success && data.appData) {
        if (data.appData.testHistory) setTestHistory(data.appData.testHistory);
        if (data.appData.recentResults) setRecentResults(data.appData.recentResults);
        if (data.appData.achievements) setAchievements(data.appData.achievements);
      }
    } catch (e) {
      console.error('Failed to sync user data', e);
    }

    setIsLoggedIn(true);
    setActiveTab('home');
    showToast(`Xush kelibsiz, ${userData.name}! Profilingiz saqlandi.`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('prep_hub_is_logged_in');
    localStorage.removeItem('prep_hub_user_profile');
    localStorage.removeItem('prep_hub_test_history');
    localStorage.removeItem('prep_hub_recent_results');
    localStorage.removeItem('prep_hub_achievements');
    localStorage.removeItem('prep_hub_completed_tests');
    localStorage.removeItem('prep_hub_flashcards');
    localStorage.removeItem('prep_hub_ai_tutor_history');
    
    // Reset state to empty defaults for next user
    setTestHistory([]);
    setRecentResults(initialRecentResults);
    setAchievements(initialAchievements);
    setUser(initialUserProfile);

    setActiveTab('home');
    showToast("Tizimdan chiqildi.");
  };

  const handleApplyReferralCode = async (code: string) => {
    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralCode: code, userCode: user.referralCode, email: user.email }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setUser((prev) => ({
          ...prev,
          coins: (prev.coins || 0) + (data.bonusCoins || 150),
          xp: (prev.xp || 0) + (data.bonusXp || 200),
          earnedSpinsCount: (prev.earnedSpinsCount || 0) + (data.bonusSpins || 1),
          invitedByCode: code,
        }));
        showToast(data.message || "🎉 Referal kod qabul qilindi!");
        return true;
      } else {
        showToast(data.error || "Referal kod noto'g'ri!");
        return false;
      }
    } catch (e) {
      console.error(e);
      showToast("Server xatosi yoki tarmoq muammosi. Qayta urinib ko'ring.");
      return false;
    }
  };

  // Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddRewards = (coinsDelta: number, xpDelta: number, itemId?: string) => {
    setUser((prev) => {
      const newInventory = itemId && !prev.inventory?.includes(itemId)
        ? [...(prev.inventory || []), itemId]
        : prev.inventory;

      return {
        ...prev,
        coins: Math.max(0, (prev.coins || 0) + coinsDelta),
        xp: Math.max(0, (prev.xp || 0) + xpDelta),
        inventory: newInventory,
      };
    });

    // Sync rewards to backend
    fetch('/api/rewards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.email || user.name,
        coinsDelta,
        xpDelta,
        reason: itemId || 'activity_reward'
      }),
    }).catch((err) => console.log('Rewards sync notice:', err));

    if (coinsDelta > 0 && xpDelta > 0) {
      showToast(`🎉 +${coinsDelta} Tangalar va +${xpDelta} XP qozonildi!`);
    } else if (coinsDelta > 0) {
      showToast(`🪙 +${coinsDelta} Tangalar qozonildi!`);
    } else if (coinsDelta < 0) {
      showToast(`🛍️ Sovg'a xarid qilindi!`);
    } else if (xpDelta > 0) {
      showToast(`⭐ +${xpDelta} XP qo'shildi!`);
    }
  };

  const handleToggleModuleComplete = (courseId: string, moduleId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id !== courseId) return c;
        const updatedModules = c.modules.map((m) =>
          m.id === moduleId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedModules.filter((m) => m.completed).length;
        const newProgress = Math.round((completedCount / updatedModules.length) * 100);
        return {
          ...c,
          modules: updatedModules,
          progress: newProgress,
        };
      })
    );

    if (selectedCourse && selectedCourse.id === courseId) {
      const updatedModules = selectedCourse.modules.map((m) =>
        m.id === moduleId ? { ...m, completed: !m.completed } : m
      );
      const completedCount = updatedModules.filter((m) => m.completed).length;
      const newProgress = Math.round((completedCount / updatedModules.length) * 100);
      setSelectedCourse({
        ...selectedCourse,
        modules: updatedModules,
        progress: newProgress,
      });
    }

    setUser((prev) => ({
      ...prev,
      xp: prev.xp + 20,
      coins: (prev.coins || 0) + 15,
    }));
    showToast("+20 XP va +15 Tangalar qozonildi! Mavzu yakunlandi.");
  };

  const handleCompleteTest = (scorePercent: number, xpEarned: number) => {
    const coinsEarned = Math.round(xpEarned * 0.8);
    const earnedBonusSpin = scorePercent >= 70;

    setUser((prev) => {
      const newXp = prev.xp + xpEarned;
      const newCoins = (prev.coins || 0) + coinsEarned;
      const newOverall = Math.round((prev.overallMastery + scorePercent) / 2);
      const newSpins = earnedBonusSpin ? (prev.earnedSpinsCount || 0) + 1 : (prev.earnedSpinsCount || 0);

      return {
        ...prev,
        xp: newXp,
        coins: newCoins,
        overallMastery: Math.min(100, newOverall),
        dailyGoalProgress: Math.min(100, prev.dailyGoalProgress + 10),
        earnedSpinsCount: newSpins,
      };
    });

    setRecentResults((prev) =>
      prev.map((r) => (r.isCurrent ? { ...r, percentage: scorePercent } : r))
    );

    if (activeTest) {
      const qCount = activeTest.questions?.length || activeTest.questionsCount || 10;
      const newHistoryRecord: TestHistoryRecord = {
        id: `hist-${Date.now()}`,
        testId: activeTest.id,
        testTitle: activeTest.title,
        subject: activeTest.subject,
        scorePercent: scorePercent,
        correctCount: Math.round((scorePercent / 100) * qCount),
        totalQuestions: qCount,
        timeSpentSeconds: (activeTest.durationMinutes || 15) * 60,
        xpEarned: xpEarned,
        date: new Date().toLocaleDateString('uz-UZ'),
      };
      setTestHistory((prev) => [newHistoryRecord, ...prev]);
    }

    if (earnedBonusSpin) {
      showToast(`🎉 Yaxshi natija (${scorePercent}%)! +${xpEarned} XP, +${coinsEarned} Tangalar va Charxpalagga +1 Aylantirish Imkoniyati berildi! 🎡`);
    } else {
      showToast(`Test yakunlandi! +${xpEarned} XP va +${coinsEarned} Tangalar berildi.`);
    }
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast("Profil ma'lumotlari saqlandi!");
  };

  const handleUpgradeSubscription = () => {
    setUser((prev) => ({
      ...prev,
      isPremium: true,
      subscriptionTier: 'pro',
      coins: (prev.coins || 0) + 500,
      xp: prev.xp + 1000,
    }));
    showToast("Tabriklaymiz! Prezent Prep Hub PRO faollashtirildi! 👑");
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#f0f6fc] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-sky-500 selection:text-white transition-colors duration-200">
      {/* Background Blobs */}
      <div className="fixed -top-40 -left-40 w-[500px] h-[500px] bg-sky-200/50 dark:bg-sky-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/60 dark:bg-blue-950/25 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-200/40 dark:bg-indigo-950/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Top Header */}
      <Header
        user={user}
        currentLang={currentLang}
        onChangeLang={(lang) => setCurrentLang(lang)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenRewards={() => setIsRewardsOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAdmin={() => setActiveTab('admin')}
      />

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-sky-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg shadow-sky-600/25 border border-white/40 transition-all animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Screen Views */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <HomeScreen
            user={user}
            courses={courses}
            tests={tests}
            onSelectCourse={(course) => setSelectedCourse(course)}
            onStartTest={(test) => setActiveTest(test)}
            onTabChange={(tab) => setActiveTab(tab)}
            onOpenAITutor={() => setIsIELTSPracticeOpen(true)}
            onOpenRewards={() => setIsRewardsOpen(true)}
            onOpenReferral={() => setIsReferralOpen(true)}
            onOpenIELTSListening={() => setIsIELTSListeningOpen(true)}
            onOpenIELTSReading={() => setIsIELTSReadingOpen(true)}
            onOpenSpacedRepetition={() => setIsSpacedRepetitionOpen(true)}
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
            onOpenForum={() => setIsForumOpen(true)}
            onOpenTeacherChat={() => setIsTeacherChatOpen(true)}
            onOpenAdaptivePlan={() => setIsAdaptivePlanOpen(true)}
            onOpenStudyCalendar={() => setIsStudyCalendarOpen(true)}
            onOpenExportProgress={() => setIsExportProgressOpen(true)}
            onOpenDuelBattle={() => setIsDuelBattleOpen(true)}
            onOpenGrammarPuzzle={() => setIsGrammarPuzzleOpen(true)}
            onOpenVocabMatch={() => setIsRewardsOpen(true)}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesScreen
            courses={courses}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        )}

        {activeTab === 'tests' && (
          <TestsScreen
            user={user}
            tests={tests}
            recentResults={recentResults}
            overallMastery={user.overallMastery}
            testHistory={testHistory}
            onStartTest={(test) => setActiveTest(test)}
            onOpenIELTSListening={() => setIsIELTSListeningOpen(true)}
            onOpenIELTSReading={() => setIsIELTSReadingOpen(true)}
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            user={user}
            achievements={achievements}
            onOpenAccountModal={() => setIsAccountOpen(true)}
            onOpenNotificationModal={() => setIsNotificationOpen(true)}
            onOpenSupportModal={() => setIsSupportOpen(true)}
            onOpenAllAchievements={() => setIsAllAchievementsOpen(true)}
            onOpenRewards={() => setIsRewardsOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenAITutor={() => setIsAITutorOpen(true)}
            onOpenReferral={() => setIsReferralOpen(true)}
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
            onOpenExportProgress={() => setIsExportProgressOpen(true)}
            onOpenStudyCalendar={() => setIsStudyCalendarOpen(true)}
            onOpenForum={() => setIsForumOpen(true)}
            onOpenTeacherChat={() => setIsTeacherChatOpen(true)}
            onOpenAdaptivePlan={() => setIsAdaptivePlanOpen(true)}
            onOpenSpacedRepetition={() => setIsSpacedRepetitionOpen(true)}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'admin' && (
          <AdminScreen
            user={user}
            courses={courses}
            tests={tests}
            onAddCourse={handleAddCourse}
            onDeleteCourse={handleDeleteCourse}
            onAddTest={handleAddTest}
            onDeleteTest={handleDeleteTest}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab === 'admin' ? 'home' : activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Modals */}
      {isSearchOpen && (
        <SearchModal
          courses={courses}
          tests={tests}
          onClose={() => setIsSearchOpen(false)}
          onSelectCourse={(course) => setSelectedCourse(course)}
          onStartTest={(test) => setActiveTest(test)}
        />
      )}

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onToggleModuleComplete={handleToggleModuleComplete}
        />
      )}

      {activeTest && (
        <TestRunnerModal
          test={activeTest}
          onClose={() => setActiveTest(null)}
          onCompleteTest={handleCompleteTest}
        />
      )}

      {isAccountOpen && (
        <AccountModal
          user={user}
          onClose={() => setIsAccountOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {isNotificationOpen && (
        <NotificationModal onClose={() => setIsNotificationOpen(false)} />
      )}

      {isSupportOpen && (
        <SupportModal
          onClose={() => setIsSupportOpen(false)}
          onOpenAITutor={() => setIsAITutorOpen(true)}
        />
      )}

      {isAllAchievementsOpen && (
        <AllAchievementsModal
          achievements={achievements}
          onClose={() => setIsAllAchievementsOpen(false)}
        />
      )}

      {isAITutorOpen && (
        <AITutorModal onClose={() => setIsAITutorOpen(false)} />
      )}

      {isIELTSPracticeOpen && (
        <IELTSPracticeModal
          onClose={() => setIsIELTSPracticeOpen(false)}
          onRewardXP={(xp) => handleAddRewards(50, xp)}
        />
      )}

      {isLeaderboardOpen && (
        <LeaderboardModal
          leaderboard={leaderboard}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}

      {isRewardsOpen && (
        <RewardsGameModal
          user={user}
          onClose={() => setIsRewardsOpen(false)}
          onAddRewards={handleAddRewards}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          user={user}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {isReferralOpen && (
        <ReferralModal
          user={user}
          onClose={() => setIsReferralOpen(false)}
          onApplyReferralCode={handleApplyReferralCode}
          onAddRewards={handleAddRewards}
        />
      )}

      {/* N1-N20 Roadmap Modals */}
      <IELTSListeningModal
        isOpen={isIELTSListeningOpen}
        onClose={() => setIsIELTSListeningOpen(false)}
        onRewardCoins={(coins, xp) => handleAddRewards(coins, xp)}
      />

      <IELTSReadingModal
        isOpen={isIELTSReadingOpen}
        onClose={() => setIsIELTSReadingOpen(false)}
        onRewardCoins={(coins, xp) => handleAddRewards(coins, xp)}
      />

      <SpacedRepetitionModal
        isOpen={isSpacedRepetitionOpen}
        onClose={() => setIsSpacedRepetitionOpen(false)}
        onRewardCoins={(coins, xp) => handleAddRewards(coins, xp)}
      />

      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        user={user}
        onUpgradeSuccess={handleUpgradeSubscription}
      />

      <ForumModal
        isOpen={isForumOpen}
        onClose={() => setIsForumOpen(false)}
        user={user}
      />

      <TeacherChatModal
        isOpen={isTeacherChatOpen}
        onClose={() => setIsTeacherChatOpen(false)}
        user={user}
      />

      <AdaptivePlanModal
        isOpen={isAdaptivePlanOpen}
        onClose={() => setIsAdaptivePlanOpen(false)}
        user={user}
        onApplyPlan={(plan: AdaptiveStudyPlan) => {
          showToast(`Reja muvaffaqiyatli saqlandi! (${plan.targetScore} maqsad) 🎯`);
        }}
      />

      <StudyCalendarModal
        isOpen={isStudyCalendarOpen}
        onClose={() => setIsStudyCalendarOpen(false)}
        user={user}
        onRewardCoins={(coins, xp) => handleAddRewards(coins, xp)}
        onUpdateUser={handleUpdateUser}
      />

      <ExportProgressModal
        isOpen={isExportProgressOpen}
        onClose={() => setIsExportProgressOpen(false)}
        user={user}
        history={completedTests}
      />

      <DuelBattleModal
        isOpen={isDuelBattleOpen}
        onClose={() => setIsDuelBattleOpen(false)}
        user={user}
        onRewardCoins={(coins, xp) => handleAddRewards(coins, xp)}
      />

      <GrammarPuzzleModal
        isOpen={isGrammarPuzzleOpen}
        onClose={() => setIsGrammarPuzzleOpen(false)}
        onRewardCoins={(coins, xp) => handleAddRewards(coins, xp)}
      />
    </div>
  );
}

