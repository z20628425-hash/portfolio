import React, { useState, useEffect } from 'react';
import {
  X,
  Gift,
  Gamepad2,
  ShoppingBag,
  Coins,
  Sparkles,
  Trophy,
  Zap,
  Award,
  RotateCw,
  Check,
  Star,
  Timer,
  CheckCircle2,
  XCircle,
  Flame,
  Crown,
  Volume2,
  Layers,
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../../types';
import { IELTS_VOCABULARY_LIST } from '../../data/vocabMatchData';

interface RewardsGameModalProps {
  user: UserProfile;
  onClose: () => void;
  onAddRewards: (coins: number, xp: number, itemId?: string) => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
  initialTab?: 'wheel' | 'vocab' | 'game' | 'shop';
}

// Fortune Wheel Prizes
const WHEEL_PRIZES = [
  { id: 'p1', label: '+30 Tangalar', type: 'coins', val: 30, color: 'from-amber-400 to-yellow-500' },
  { id: 'p2', label: '+50 XP', type: 'xp', val: 50, color: 'from-sky-400 to-blue-500' },
  { id: 'p3', label: '+75 Tangalar', type: 'coins', val: 75, color: 'from-amber-500 to-orange-500' },
  { id: 'p4', label: '2x XP Boost', type: 'item', item: '2x_xp_boost', color: 'from-purple-500 to-indigo-600' },
  { id: 'p5', label: '+100 Tangalar', type: 'coins', val: 100, color: 'from-emerald-400 to-teal-500' },
  { id: 'p6', label: '+100 XP', type: 'xp', val: 100, color: 'from-blue-500 to-cyan-500' },
  { id: 'p7', label: 'JACKPOT 200', type: 'coins', val: 200, color: 'from-rose-500 to-pink-600' },
  { id: 'p8', label: 'VIP Pass', type: 'item', item: 'vip_pass', color: 'from-amber-500 to-yellow-600' },
];

// Mini-game Speed Quiz Questions
const MINI_GAME_QUESTIONS = [
  {
    q: "5² + 12² ning qiymatini toping:",
    options: ["169 (13²)", "144", "125", "100"],
    correct: 0,
    category: "Matematika"
  },
  {
    q: "'Present Simple' odatda qanday harakatlar uchun ishlatiladi?",
    options: ["Doimiy, takroriy harakatlar", "Ayni paytda sodir bo'layotgan", "Kelajakdagi reja", "O'tmishdagi harakat"],
    correct: 0,
    category: "Ingliz tili"
  },
  {
    q: "Ketma-ketlikda keyingi sonni toping: 3, 6, 12, 24, ?",
    options: ["48", "36", "30", "50"],
    correct: 0,
    category: "Mantiq"
  },
  {
    q: "Deduptiv mantiq bo'yicha: 'Barcha qushlar uchadi. Pingvin - qush.' Xulosa bormi?",
    options: ["Qoidaga ko'ra pingvin uchadi", "Pingvin qush emas", "Hech qanday xulosa yo'q", "Barcha hayvonlar pingvin"],
    correct: 0,
    category: "Mantiq"
  },
  {
    q: "'Analyze' fe'lining o'zbekcha tarjimasi nima?",
    options: ["Tahlil qilmoq", "Yozib olmoq", "Isbotlamoq", "Inkor etmoq"],
    correct: 0,
    category: "Ingliz tili"
  },
  {
    q: "x² - 9 = 0 tenglamaning musbat ildizini toping:",
    options: ["3", "9", "-3", "81"],
    correct: 0,
    category: "Matematika"
  },
  {
    q: "40 kishidan 25 tasi kitob o'qiydi. Kitob o'qiydiganlar foizini toping:",
    options: ["62.5%", "50%", "75%", "60%"],
    correct: 0,
    category: "Matematika"
  },
  {
    q: "IELTS Speaking Part 1 da javobni qanday berish to'g'ri?",
    options: ["Kengaytirib, sabab va misol bilan", "Faqat Yes yoki No deb", "Jim turib", "Faqat 1 ta so'z bilan"],
    correct: 0,
    category: "IELTS"
  }
];

// Shop Items List
const SHOP_ITEMS = [
  {
    id: 'gold_frame',
    title: "Oltin Bilimdon Ramkasi",
    category: "Profil Ramkasi",
    price: 150,
    icon: "👑",
    description: "Profil rasmingiz atrofiga oltin bilan jilolanadigan maxsus VIP ramka.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
  },
  {
    id: 'ielts_gg_crown',
    title: "IELTS GG Master Crown",
    category: "Unvon & Nishon",
    price: 300,
    icon: "🎓",
    description: "Ismingiz yonida paydo bo'ladigan afsonaviy IELTS Master toji.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300"
  },
  {
    id: 'double_xp_boost',
    title: "24 Soat 2x XP Boost",
    category: "Booster",
    price: 200,
    icon: "⚡",
    description: "Barcha bajargan dars va testlaringizdan 2 baravar ko'p XP olish imkoniyati.",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300"
  },
  {
    id: 'cert_voucher',
    title: "Prep Hub Rasmiy Sertifikati",
    category: "Hujjat",
    price: 500,
    icon: "📜",
    description: "Barcha fanlardan erishgan muvaffaqiyatlaringiz aks etgan muhrlangan sertifikat.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
  },
  {
    id: 'speaking_pass',
    title: "Cheksiz AI Speaking Pass",
    category: "Akkreditatsiya",
    price: 350,
    icon: "🎙️",
    description: "AI Examiner bilan cheksiz IELTS Speaking tahlil mashg'ulotlari.",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300"
  }
];

export const RewardsGameModal: React.FC<RewardsGameModalProps> = ({
  user,
  onClose,
  onAddRewards,
  onUpdateUser,
  initialTab = 'wheel',
}) => {
  const [activeTab, setActiveTab] = useState<'wheel' | 'vocab' | 'game' | 'shop'>(initialTab);

  // Spin Availability Calculations
  const isFreeSpinAvailable = !user.freeSpinUsedToday;
  const earnedSpinsCount = user.earnedSpinsCount || 0;
  const totalSpinsAvailable = (isFreeSpinAvailable ? 1 : 0) + earnedSpinsCount;

  // Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<any>(null);

  // Mini-Game State (Speed Quiz)
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [lastAnswerStatus, setLastAnswerStatus] = useState<'correct' | 'wrong' | null>(null);

  // Vocab Match Game State (N16)
  const [vocabGameStatus, setVocabGameStatus] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [vocabCards, setVocabCards] = useState<Array<{ id: string; key: string; text: string; type: 'en' | 'uz'; wordData: any }>>([]);
  const [selectedCardIdxs, setSelectedCardIdxs] = useState<number[]>([]);
  const [matchedKeys, setMatchedKeys] = useState<string[]>([]);
  const [vocabScore, setVocabScore] = useState(0);
  const [vocabCombo, setVocabCombo] = useState(1);
  const [vocabTimeLeft, setVocabTimeLeft] = useState(50);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [vocabEarnedCoins, setVocabEarnedCoins] = useState(0);
  const [vocabEarnedXP, setVocabEarnedXP] = useState(0);

  // Vocab Game Timer
  useEffect(() => {
    let timer: any = null;
    if (vocabGameStatus === 'playing' && vocabTimeLeft > 0) {
      timer = setInterval(() => {
        setVocabTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (vocabTimeLeft === 0 && vocabGameStatus === 'playing') {
      finishVocabGame();
    }
    return () => clearInterval(timer);
  }, [vocabGameStatus, vocabTimeLeft]);

  const speakWord = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utter = new SpeechSynthesisUtterance(word);
        utter.lang = 'en-US';
        utter.rate = 0.9;
        window.speechSynthesis.speak(utter);
      } catch (e) {
        console.log('Speech error:', e);
      }
    }
  };

  const startVocabGame = () => {
    const pickedWords = [...IELTS_VOCABULARY_LIST].sort(() => 0.5 - Math.random()).slice(0, 6);
    const cards: Array<{ id: string; key: string; text: string; type: 'en' | 'uz'; wordData: any }> = [];

    pickedWords.forEach((item) => {
      cards.push({
        id: `${item.id}_en`,
        key: item.id,
        text: item.word,
        type: 'en',
        wordData: item,
      });
      cards.push({
        id: `${item.id}_uz`,
        key: item.id,
        text: item.translation,
        type: 'uz',
        wordData: item,
      });
    });

    setVocabCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedCardIdxs([]);
    setMatchedKeys([]);
    setVocabScore(0);
    setVocabCombo(1);
    setVocabTimeLeft(50);
    setVocabEarnedCoins(0);
    setVocabEarnedXP(0);
    setVocabGameStatus('playing');
  };

  const handleCardClick = (idx: number) => {
    if (vocabGameStatus !== 'playing') return;
    if (selectedCardIdxs.includes(idx)) return;
    if (matchedKeys.includes(vocabCards[idx].key)) return;

    if (selectedCardIdxs.length === 0) {
      setSelectedCardIdxs([idx]);
      if (vocabCards[idx].type === 'en') {
        speakWord(vocabCards[idx].text);
      }
      return;
    }

    if (selectedCardIdxs.length === 1) {
      const firstIdx = selectedCardIdxs[0];
      const firstCard = vocabCards[firstIdx];
      const secondCard = vocabCards[idx];

      setSelectedCardIdxs([firstIdx, idx]);

      if (secondCard.type === 'en') {
        speakWord(secondCard.text);
      }

      // Check if match
      if (firstCard.key === secondCard.key && firstCard.type !== secondCard.type) {
        setTimeout(() => {
          setMatchedKeys((prev) => {
            const next = [...prev, firstCard.key];
            if (next.length === 6) {
              finishVocabGame(next.length);
            }
            return next;
          });
          setSelectedCardIdxs([]);
          const pts = 20 * vocabCombo;
          const coins = 12 * vocabCombo;
          const xp = 15 * vocabCombo;
          setVocabScore((prev) => prev + pts);
          setVocabEarnedCoins((prev) => prev + coins);
          setVocabEarnedXP((prev) => prev + xp);
          setVocabCombo((prev) => Math.min(prev + 1, 4));
        }, 350);
      } else {
        setTimeout(() => {
          setSelectedCardIdxs([]);
          setVocabCombo(1);
        }, 800);
      }
    }
  };

  const finishVocabGame = (forcedMatchesCount?: number) => {
    setVocabGameStatus('finished');
    const finalMatches = forcedMatchesCount !== undefined ? forcedMatchesCount : matchedKeys.length;
    const bonusCoins = finalMatches * 15 + 25;
    const bonusXP = finalMatches * 20 + 35;

    onAddRewards(bonusCoins, bonusXP);
    if (onUpdateUser) {
      onUpdateUser({
        vocabMasteryScore: (user.vocabMasteryScore || 0) + finalMatches * 10,
      });
    }
  };

  // Mini-game timer
  useEffect(() => {
    let timer: any = null;
    if (gameStatus === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      finishGame();
    }
    return () => clearInterval(timer);
  }, [gameStatus, timeLeft]);

  // Handle Wheel Spin
  const spinWheel = () => {
    if (isSpinning || totalSpinsAvailable <= 0) return;

    setIsSpinning(true);
    setWonPrize(null);

    // Random prize selection
    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const prize = WHEEL_PRIZES[prizeIndex];

    // Calculate rotation: 5 full turns (1800 deg) + segment angle
    const segmentAngle = 360 / WHEEL_PRIZES.length;
    const targetAngle = 360 * 5 + (360 - (prizeIndex * segmentAngle + segmentAngle / 2));

    setWheelRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prize);

      // Deduct spin token: 1st spin is free spin, 2nd spin is earned spin
      if (isFreeSpinAvailable) {
        if (onUpdateUser) {
          onUpdateUser({ freeSpinUsedToday: true });
        }
      } else if (earnedSpinsCount > 0) {
        if (onUpdateUser) {
          onUpdateUser({ earnedSpinsCount: Math.max(0, earnedSpinsCount - 1) });
        }
      }

      if (prize.type === 'coins') {
        onAddRewards(prize.val, 0);
      } else if (prize.type === 'xp') {
        onAddRewards(0, prize.val);
      } else if (prize.type === 'item') {
        onAddRewards(50, 50, prize.item);
      }
    }, 3800);
  };

  // Start Mini-Game
  const startGame = () => {
    setGameStatus('playing');
    setCurrentQIndex(0);
    setGameScore(0);
    setCombo(1);
    setTimeLeft(30);
    setEarnedCoins(0);
    setEarnedXP(0);
    setLastAnswerStatus(null);
  };

  // Handle Question Answer
  const handleAnswer = (optionIdx: number) => {
    if (gameStatus !== 'playing') return;

    const q = MINI_GAME_QUESTIONS[currentQIndex];
    if (optionIdx === q.correct) {
      setLastAnswerStatus('correct');
      const pts = 10 * combo;
      const coins = 10 * combo;
      const xp = 15 * combo;

      setGameScore((prev) => prev + pts);
      setEarnedCoins((prev) => prev + coins);
      setEarnedXP((prev) => prev + xp);
      setCombo((prev) => Math.min(prev + 1, 4));
    } else {
      setLastAnswerStatus('wrong');
      setCombo(1);
    }

    setTimeout(() => {
      setLastAnswerStatus(null);
      if (currentQIndex + 1 < MINI_GAME_QUESTIONS.length) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        finishGame();
      }
    }, 300);
  };

  // Finish Mini-Game
  const finishGame = () => {
    setGameStatus('finished');
    if (earnedCoins > 0 || earnedXP > 0) {
      onAddRewards(earnedCoins, earnedXP);
    }
  };

  // Handle Shop Purchase
  const handleBuyItem = (item: typeof SHOP_ITEMS[0]) => {
    if (user.coins < item.price) {
      alert(`Mablag' yetarli emas! Sizda ${user.coins} Tangalar bor, bu sovg'a uchun ${item.price} Tangalar kerak.`);
      return;
    }

    if (user.inventory?.includes(item.id)) {
      alert("Siz bu sovg'ani allaqachon xarid qilgansiz!");
      return;
    }

    onAddRewards(-item.price, 50, item.id);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
    >
      <div className="glass-modal rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl shadow-sky-900/30 flex flex-col max-h-[92vh] border border-sky-100 dark:border-slate-800">
        
        {/* Modal Top Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-600 dark:via-orange-600 dark:to-amber-700 text-white flex justify-between items-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="z-10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-xs flex items-center justify-center text-white shadow-md">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white tracking-tight">O'yin & Omad Markazi</h3>
                <span className="bg-amber-300 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  Prep Rewards
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">Tangalar to'plang, o'yinda yuting va sovg'alarga ega bo'ling!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Balance Bar */}
        <div className="px-6 py-3 bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 dark:from-amber-950/40 dark:via-sky-950/40 dark:to-amber-950/40 border-b border-amber-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-extrabold">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Sizning Tangalaringiz:</span>
            <span className="text-amber-600 dark:text-amber-300 font-black text-sm bg-amber-100 dark:bg-amber-900/60 px-2.5 py-0.5 rounded-lg border border-amber-300 dark:border-amber-700">
              🪙 {user.coins} Tangalar
            </span>
          </div>

          <div className="flex items-center gap-2 text-sky-900 dark:text-sky-200">
            <Star className="w-4 h-4 text-sky-500 fill-sky-400" />
            <span>XP:</span>
            <span className="text-sky-700 dark:text-sky-300 font-black text-sm bg-sky-100 dark:bg-sky-900/60 px-2.5 py-0.5 rounded-lg border border-sky-300 dark:border-sky-700">
              ⭐ {user.xp}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-1.5 gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('wheel')}
            className={`flex-1 py-2.5 px-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wheel'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>Charxpalak</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex-1 py-2.5 px-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'vocab'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>So'z Match (N16)</span>
          </button>

          <button
            onClick={() => setActiveTab('game')}
            className={`flex-1 py-2.5 px-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'game'
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Speed Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 py-2.5 px-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'shop'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Do'kon</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1 bg-gradient-to-b from-white via-slate-50/40 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900">
          
          {/* TAB 1: FORTUNE WHEEL */}
          {activeTab === 'wheel' && (
            <div className="flex flex-col items-center justify-center space-y-5 py-2 text-center">
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Kunlik 2x Omad Charxpalagi
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm">
                  Kuniga 2 marta aylantiring! 1-Aylantirish 100% bepul, 2-Aylantirish esa testdan yuqori natija olganingizda ochiladi! 🎓
                </p>
              </div>

              {/* 2 Spins Status Indicator Cards */}
              <div className="w-full max-w-sm grid grid-cols-2 gap-2 text-xs font-bold text-left">
                <div className={`p-3 rounded-2xl border flex flex-col gap-1 transition-all ${
                  isFreeSpinAvailable
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 opacity-80'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[11px]">1-Spin (Kunlik)</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                      isFreeSpinAvailable ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {isFreeSpinAvailable ? '100% Bepul' : 'Ishlatildi 🔒'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                    {isFreeSpinAvailable ? "Kunlik bepul aylantirish tayyor!" : "Bugungi bepul imkoniyat ishlatildi."}
                  </p>
                </div>

                <div className={`p-3 rounded-2xl border flex flex-col gap-1 transition-all ${
                  earnedSpinsCount > 0
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 opacity-80'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[11px]">2-Spin (Test Natijasi)</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                      earnedSpinsCount > 0 ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-200' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}>
                      {earnedSpinsCount > 0 ? `${earnedSpinsCount} ta Tayyor 🎓` : 'Test topshiring'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                    {earnedSpinsCount > 0
                      ? "A'lo test natijangiz uchun bonus spin!"
                      : "Testda 70%+ ball to'plab, 2-spinni oling!"}
                  </p>
                </div>
              </div>

              {/* Interactive Wheel Container */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
                {/* Pointer Arrow */}
                <div className="absolute -top-3 z-30 w-0 h-0 border-x-8 border-x-transparent border-t-[18px] border-t-rose-600 drop-shadow-md" />

                {/* Rotating Wheel Circle */}
                <div
                  className="w-full h-full rounded-full border-8 border-amber-300 dark:border-amber-500 shadow-xl overflow-hidden relative transition-all duration-[3800ms] ease-out"
                  style={{
                    transform: `rotate(${wheelRotation}deg)`,
                  }}
                >
                  {WHEEL_PRIZES.map((prize, idx) => {
                    const angle = 360 / WHEEL_PRIZES.length;
                    const rotateAngle = angle * idx;
                    return (
                      <div
                        key={prize.id}
                        className={`absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left bg-gradient-to-br ${prize.color} flex items-center justify-center text-white border-l border-white/30`}
                        style={{
                          transform: `rotate(${rotateAngle}deg) skewY(-${90 - angle}deg)`,
                        }}
                      >
                        <span
                          className="font-black text-[11px] drop-shadow-sm whitespace-nowrap"
                          style={{
                            transform: `skewY(${90 - angle}deg) rotate(${angle / 2}deg) translate(28px, -20px)`,
                          }}
                        >
                          {prize.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Center Wheel Hub */}
                <div className="absolute w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-4 border-amber-400 dark:border-amber-500 shadow-md z-20 flex flex-col items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  <span className="text-[9px] font-black text-amber-800 dark:text-amber-300">{totalSpinsAvailable} Spin</span>
                </div>
              </div>

              {/* Prize Winner Banner */}
              {wonPrize && (
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 rounded-2xl shadow-lg shadow-amber-500/25 border border-amber-300 animate-bounce space-y-1 w-full max-w-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center justify-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-200" /> TABRIKLAYMIZ! <Sparkles className="w-4 h-4 text-amber-200" />
                  </span>
                  <h5 className="text-xl font-black">{wonPrize.label} Yutingiz! 🎉</h5>
                  <p className="text-[11px] text-amber-100">Sovg'angiz hisobingizga qo'shildi.</p>
                </div>
              )}

              {/* Spin Button */}
              <button
                onClick={spinWheel}
                disabled={isSpinning || totalSpinsAvailable <= 0}
                className={`w-full max-w-sm py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                  totalSpinsAvailable <= 0
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                    : isSpinning
                    ? 'bg-amber-400 text-amber-950 cursor-wait'
                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/25 active:scale-98'
                }`}
              >
                <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>
                  {totalSpinsAvailable <= 0
                    ? "2-Spinni olish uchun test topshiring! 🎓"
                    : isSpinning
                    ? "Charxpalag aylanyapti..."
                    : `Charxpalakni Aylantirish (${isFreeSpinAvailable ? '1-Spin Bepul' : '2-Spin Test Bonusi'})`}
                </span>
              </button>
            </div>
          )}

          {/* TAB 2: VOCABULARY MATCH GAME (N16) */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              {/* Vocab View Header / Sub-toggle */}
              <div className="flex items-center justify-between p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <button
                  onClick={() => setIsDictionaryOpen(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    !isDictionaryOpen
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Juftlik Match O'yini</span>
                </button>
                <button
                  onClick={() => setIsDictionaryOpen(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    isDictionaryOpen
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>IELTS Lug'at Ro'yxati ({IELTS_VOCABULARY_LIST.length})</span>
                </button>
              </div>

              {/* 1. DICTIONARY EXPLORER VIEW */}
              {isDictionaryOpen ? (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="font-bold text-slate-500">IELTS Academic & Speaking C1/C2 So'zlar</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">Audio talaffuz bilan</span>
                  </div>

                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {IELTS_VOCABULARY_LIST.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2 hover:border-emerald-300 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-black text-sm text-slate-900 dark:text-white">{item.word}</h5>
                              {item.phonetic && (
                                <span className="text-xs text-slate-400 font-mono">{item.phonetic}</span>
                              )}
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                                {item.cefrLevel}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                              {item.translation}
                            </p>
                          </div>

                          <button
                            onClick={() => speakWord(item.word)}
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 transition-colors"
                            title="Talaffuzni eshitish"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-750 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1">
                          <p className="italic font-medium">"{item.exampleEn}"</p>
                          <p className="text-slate-500 dark:text-slate-400">{item.exampleUz}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* 2. VOCAB MATCH GAME VIEW */
                <div>
                  {vocabGameStatus === 'idle' && (
                    <div className="text-center py-6 space-y-5 max-w-md mx-auto animate-fade-in">
                      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-700 rounded-3xl mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
                        <Layers className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">
                          So'z Boyligi Match (Memory Game)
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                          Inglizcha so'z va uning o'zbekcha tarjimasini juftlab bosing. Qanchalik tez topsangiz, shuncha ko'p Tangalar va XP olasiz!
                        </p>
                      </div>

                      <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-200 flex justify-around">
                        <span>⏱️ Vaqt: 50s</span>
                        <span>🎴 6 ta Juftlik</span>
                        <span>🔥 4x Combo</span>
                      </div>

                      <button
                        onClick={startVocabGame}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition-all active:scale-98 flex items-center justify-center gap-2"
                      >
                        <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
                        <span>O'yinni Boshlash (6 Juftlik)</span>
                      </button>
                    </div>
                  )}

                  {vocabGameStatus === 'playing' && (
                    <div className="space-y-3.5 animate-fade-in">
                      {/* Status Bar */}
                      <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs font-extrabold">
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                          <Timer className={`w-4 h-4 ${vocabTimeLeft <= 10 ? 'animate-ping text-rose-600' : 'text-emerald-600'}`} />
                          <span>{vocabTimeLeft} soniya</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-lg border border-amber-300">
                            Combo: {vocabCombo}x 🔥
                          </span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-black">
                            Ball: {vocabScore}
                          </span>
                        </div>
                      </div>

                      {/* Cards Grid: 12 cards (3x4 or 4x3) */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {vocabCards.map((card, idx) => {
                          const isSelected = selectedCardIdxs.includes(idx);
                          const isMatched = matchedKeys.includes(card.key);

                          let cardClasses =
                            'p-3.5 rounded-2xl border font-bold text-xs transition-all flex flex-col items-center justify-center text-center min-h-[70px] select-none cursor-pointer ';

                          if (isMatched) {
                            cardClasses +=
                              'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-200 opacity-80 pointer-events-none scale-95';
                          } else if (isSelected) {
                            cardClasses +=
                              'bg-sky-100 dark:bg-sky-950/80 border-2 border-sky-500 text-sky-900 dark:text-sky-100 shadow-md scale-105';
                          } else {
                            cardClasses +=
                              'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-emerald-400 active:scale-95 shadow-2xs';
                          }

                          return (
                            <div
                              key={card.id}
                              onClick={() => handleCardClick(idx)}
                              className={cardClasses}
                            >
                              <span className="leading-snug">{card.text}</span>
                              {card.type === 'en' && !isMatched && (
                                <span className="text-[10px] text-sky-500 dark:text-sky-400 mt-1 font-semibold flex items-center gap-0.5">
                                  <Volume2 className="w-3 h-3" />
                                  <span>EN</span>
                                </span>
                              )}
                              {isMatched && (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black mt-1 flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Topildi</span>
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {vocabGameStatus === 'finished' && (
                    <div className="text-center py-6 space-y-5 max-w-md mx-auto animate-fade-in">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Trophy className="w-10 h-10" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                          {matchedKeys.length === 6 ? "Barcha Juftliklar Topildi! 🎴" : "Vaqt Tugadi!"}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          Siz {matchedKeys.length} / 6 ta so'z juftligini to'g'ri bog'ladingiz!
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 grid grid-cols-2 gap-3 text-left">
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Qozonilgan Tangalar</span>
                          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Coins className="w-5 h-5 fill-emerald-400" />
                            +{vocabEarnedCoins} 🪙
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Qozonilgan XP</span>
                          <p className="text-xl font-black text-sky-600 dark:text-sky-400 flex items-center gap-1">
                            <Star className="w-5 h-5 fill-sky-400" />
                            +{vocabEarnedXP} XP
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={startVocabGame}
                          className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          <RotateCw className="w-4 h-4" />
                          <span>Yana O'ynash</span>
                        </button>
                        <button
                          onClick={() => setIsDictionaryOpen(true)}
                          className="flex-1 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs transition-all"
                        >
                          Lug'atni Ko'rish
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MINI-GAME (INTELLEKT RUSH) */}
          {activeTab === 'game' && (
            <div className="space-y-5">
              {gameStatus === 'idle' && (
                <div className="text-center py-6 space-y-5 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-sky-100 dark:bg-sky-950/60 border-2 border-sky-300 dark:border-sky-700 rounded-3xl mx-auto flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-inner">
                    <Gamepad2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">Intellekt Rush ⚡ (30 soniyalik mini-o'yin)</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      30 soniya ichida mantiqiy, matematika va ingliz tili savollariga tezda to'g'ri javob bering.
                      Har bir to'g'ri javob uchun **+10 Tangalar** va **+15 XP** yutib oling! Combo orqali ballaringizni 4 baravargacha oshiring!
                    </p>
                  </div>

                  <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 text-xs font-bold text-sky-900 dark:text-sky-200 flex justify-around">
                    <span>⏱️ Vaqt: 30s</span>
                    <span>🪙 Mukofot: +10 Tangalar</span>
                    <span>🔥 Multiplier: 4x gacha</span>
                  </div>

                  <button
                    onClick={startGame}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-sky-600/25 transition-all active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
                    <span>O'yinni Boshlash (30s Speed Run)</span>
                  </button>
                </div>
              )}

              {gameStatus === 'playing' && (
                <div className="space-y-4">
                  {/* Game Status Header */}
                  <div className="flex items-center justify-between bg-sky-50 dark:bg-sky-950/50 p-3 rounded-2xl border border-sky-200 dark:border-sky-800 text-xs font-extrabold">
                    <div className="flex items-center gap-1.5 text-sky-800 dark:text-sky-200">
                      <Timer className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>Vaqt: <strong className="text-rose-600 dark:text-rose-400 text-sm">{timeLeft}s</strong></span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/60 px-2.5 py-1 rounded-xl">
                      <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-500" />
                      <span>Combo: {combo}x</span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-800 dark:text-emerald-200">
                      <Coins className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Jamg'arma: +{earnedCoins} 🪙</span>
                    </div>
                  </div>

                  {/* Question Box */}
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-sky-200 dark:border-slate-700 shadow-md space-y-4 relative">
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 dark:text-slate-400 border-b border-sky-50 dark:border-slate-700 pb-2">
                      <span className="bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 px-2.5 py-0.5 rounded-full">
                        {MINI_GAME_QUESTIONS[currentQIndex].category}
                      </span>
                      <span>Savol {currentQIndex + 1} / {MINI_GAME_QUESTIONS.length}</span>
                    </div>

                    <h5 className="text-base font-extrabold text-slate-800 dark:text-slate-100 leading-snug">
                      {MINI_GAME_QUESTIONS[currentQIndex].q}
                    </h5>

                    <div className="grid grid-cols-1 gap-2.5 pt-1">
                      {MINI_GAME_QUESTIONS[currentQIndex].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswer(oIdx)}
                          className="w-full text-left p-3.5 rounded-2xl border border-sky-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-700/80 hover:border-sky-300 font-bold text-xs text-slate-800 dark:text-slate-100 transition-all active:scale-[0.99] flex justify-between items-center"
                        >
                          <span>{opt}</span>
                          <span className="text-slate-400 dark:text-slate-500 font-semibold text-[11px]">Variant {oIdx + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {gameStatus === 'finished' && (
                <div className="text-center py-6 space-y-5 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-amber-500/25">
                    <Trophy className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">O'yin Yakunlandi! 🎯</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ajoyib natija! Barcha qozonilgan mukofotlar hisobingizga o'tkazildi.</p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 dark:from-amber-950/40 dark:via-sky-950/40 dark:to-amber-950/40 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-800 grid grid-cols-2 gap-3 text-left">
                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Qozonilgan Tangalar</span>
                      <p className="text-xl font-black text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Coins className="w-5 h-5 fill-amber-400" />
                        +{earnedCoins} 🪙
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Qozonilgan XP</span>
                      <p className="text-xl font-black text-sky-600 dark:text-sky-400 flex items-center gap-1">
                        <Star className="w-5 h-5 fill-sky-400" />
                        +{earnedXP} XP
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={startGame}
                      className="flex-1 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>Qayta O'ynash</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('shop')}
                      className="flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Do'kondan Xarid</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SHOP / SOVG'ALAR DO'KONI */}
          {activeTab === 'shop' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">Sovg'alar va Boshlang'ich VIP Imtiyozlar</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">To'plagan tangalaringiz evaziga eksklyuziv unvon va sertifikatlarni oling.</p>
                </div>
                <span className="text-xs font-black text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-700">
                  🪙 {user.coins} Tangalar
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {SHOP_ITEMS.map((item) => {
                  const isOwned = user.inventory?.includes(item.id);
                  const canAfford = user.coins >= item.price;

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isOwned
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                          : 'bg-white dark:bg-slate-800 border-sky-100 dark:border-slate-700 hover:border-sky-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-2xs">
                          {item.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{item.title}</h5>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        {isOwned ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-3 py-1.5 rounded-xl font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>Olingan</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleBuyItem(item)}
                            disabled={!canAfford}
                            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-2xs flex items-center gap-1.5 ${
                              canAfford
                                ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-amber-500/20 active:scale-95'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <Coins className="w-3.5 h-3.5 fill-current" />
                            <span>{item.price} 🪙</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
