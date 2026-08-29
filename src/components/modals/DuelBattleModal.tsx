import React, { useState, useEffect } from 'react';
import {
  X,
  Swords,
  Trophy,
  Zap,
  Timer,
  ShieldAlert,
  Flame,
  CheckCircle2,
  XCircle,
  Sparkles,
  Share2,
  RotateCw,
  Crown,
  Volume2
} from 'lucide-react';
import { UserProfile, DuelQuestion, DuelOpponent } from '../../types';
import { DUEL_OPPONENTS_POOL, DUEL_QUESTIONS_POOL } from '../../data/duelBattleData';

interface DuelBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onAddRewards: (coins: number, xp: number) => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
  onOpenLeaderboard?: () => void;
}

export const DuelBattleModal: React.FC<DuelBattleModalProps> = ({
  isOpen,
  onClose,
  user,
  onAddRewards,
  onUpdateUser,
  onOpenLeaderboard,
}) => {
  const [phase, setPhase] = useState<'lobby' | 'matching' | 'battle' | 'result'>('lobby');
  const [opponent, setOpponent] = useState<DuelOpponent>(DUEL_OPPONENTS_POOL[0]);
  const [selectedQuestions, setSelectedQuestions] = useState<DuelQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  // Battle scores and HP
  const [userHp, setUserHp] = useState(100);
  const [opponentHp, setOpponentHp] = useState(100);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [opponentAnswered, setOpponentAnswered] = useState<boolean | null>(null);
  const [questionTimer, setQuestionTimer] = useState(10);
  const [customRoomCode, setCustomRoomCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Reset or initialize questions on start
  const startMatchmaking = (targetOpponent?: DuelOpponent) => {
    setPhase('matching');
    const matched = targetOpponent || DUEL_OPPONENTS_POOL[Math.floor(Math.random() * DUEL_OPPONENTS_POOL.length)];
    setOpponent(matched);

    // Shuffle 5 random questions
    const shuffled = [...DUEL_QUESTIONS_POOL].sort(() => 0.5 - Math.random()).slice(0, 5);
    setSelectedQuestions(shuffled);
    setCurrentQIndex(0);
    setUserHp(100);
    setOpponentHp(100);
    setUserScore(0);
    setOpponentScore(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setOpponentAnswered(null);
    setQuestionTimer(10);

    setTimeout(() => {
      setPhase('battle');
    }, 1800);
  };

  // Question countdown timer during battle
  useEffect(() => {
    let timer: any = null;
    if (phase === 'battle' && !isAnswerSubmitted && questionTimer > 0) {
      timer = setInterval(() => {
        setQuestionTimer((prev) => prev - 1);
      }, 1000);
    } else if (questionTimer === 0 && !isAnswerSubmitted && phase === 'battle') {
      // Time up: handle as wrong answer
      handleAnswerSelect(-1);
    }
    return () => clearInterval(timer);
  }, [phase, questionTimer, isAnswerSubmitted]);

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIndex);
    setIsAnswerSubmitted(true);

    const currentQ = selectedQuestions[currentQIndex];
    const isUserCorrect = optionIndex === currentQ.correctAnswer;
    
    // Opponent response based on accuracyRate + response time
    const isOpponentCorrect = Math.random() < opponent.accuracyRate;
    setOpponentAnswered(isOpponentCorrect);

    // Update HP and Scores
    if (isUserCorrect) {
      setUserScore((prev) => prev + 100 + questionTimer * 10);
      setOpponentHp((prev) => Math.max(0, prev - 20));
    } else {
      setUserHp((prev) => Math.max(0, prev - 20));
    }

    if (isOpponentCorrect) {
      setOpponentScore((prev) => prev + 100 + Math.floor(Math.random() * 8) * 10);
      if (!isUserCorrect) {
        setUserHp((prev) => Math.max(0, prev - 10));
      }
    } else {
      setOpponentHp((prev) => Math.max(0, prev - 10));
    }

    // Advance to next question or result after 2.2 seconds
    setTimeout(() => {
      if (currentQIndex + 1 < selectedQuestions.length) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
        setOpponentAnswered(null);
        setQuestionTimer(10);
      } else {
        // Battle finished
        finishDuel(isUserCorrect);
      }
    }, 2200);
  };

  const finishDuel = (lastUserCorrect: boolean) => {
    setPhase('result');
    const finalUserScore = userScore + (lastUserCorrect ? 100 : 0);
    const finalOpponentScore = opponentScore;
    const isWinner = finalUserScore >= finalOpponentScore;

    if (isWinner) {
      onAddRewards(80, 150);
      if (onUpdateUser) {
        onUpdateUser({
          duelWins: (user.duelWins || 0) + 1,
          duelPoints: (user.duelPoints || 1000) + 25,
        });
      }
    } else {
      onAddRewards(30, 50);
      if (onUpdateUser) {
        onUpdateUser({
          duelLosses: (user.duelLosses || 0) + 1,
          duelPoints: Math.max(800, (user.duelPoints || 1000) - 10),
        });
      }
    }
  };

  const copyDuelLink = () => {
    const code = user.referralCode || 'PREP-DUEL-88';
    navigator.clipboard.writeText(`https://present-preb-hub.vercel.app/?duel=${code}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="duel-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && phase !== 'battle') onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5 bg-slate-950/70 backdrop-blur-md animate-fade-in"
    >
      <div className="glass-modal rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-rose-500/30 dark:border-rose-900/50 bg-white dark:bg-slate-900 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl shadow-inner">
              ⚔️
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase">
                <Flame className="w-3 h-3" />
                <span>N17: 1v1 Quiz Battle</span>
              </div>
              <h2 id="duel-modal-title" className="text-lg md:text-xl font-black text-white flex items-center gap-2">
                Do'stlar Bilan Duel Arena
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body based on Phase */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1 space-y-5">
          {/* 1. LOBBY PHASE */}
          {phase === 'lobby' && (
            <div className="space-y-5 animate-fade-in">
              {/* Duel Stats Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-slate-800/90 dark:to-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block">Sizning Duel Ko'rsatkichingiz</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-lg font-black text-slate-800 dark:text-white">
                      🏆 {user.duelWins || 0} G'alaba
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      / {user.duelLosses || 0} Mag'lubiyat
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Duel Reytingi</span>
                  <span className="text-base font-black text-amber-600 dark:text-amber-400">
                    ⚡ {user.duelPoints || 1000} Elo
                  </span>
                </div>
              </div>

              {/* Match Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Random Online Challenger */}
                <div
                  onClick={() => startMatchmaking()}
                  className="p-5 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-md">
                    ⚡
                  </div>
                  <div>
                    <h4 className="text-base font-black">Tezkor Raqib Topish</h4>
                    <p className="text-xs text-rose-100 mt-1">
                      Online bilimdonlar yoki AI raqib bilan 5 ta tezkor savolda bellashing.
                    </p>
                  </div>
                  <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-black text-amber-300 group-hover:translate-x-1 transition-transform">
                    <span>Jangni Boshlash</span>
                    <Swords className="w-4 h-4" />
                  </div>
                </div>

                {/* Challenge a Friend */}
                <div
                  onClick={copyDuelLink}
                  className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-md">
                    🤝
                  </div>
                  <div>
                    <h4 className="text-base font-black">Do'stni Duelga Chaqirish</h4>
                    <p className="text-xs text-amber-100 mt-1">
                      Do'stingizga havola yuboring va bir xil savollarda kim ustunligini aniqlang.
                    </p>
                  </div>
                  <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-black text-white bg-black/20 px-3 py-1.5 rounded-xl">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isCopied ? "Havola Nusxalandi! ✅" : "Havolani Ulashish"}</span>
                  </div>
                </div>
              </div>

              {/* Online Top Challengers List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Online Reyting Qahramonlari
                </h4>
                <div className="space-y-2">
                  {DUEL_OPPONENTS_POOL.slice(0, 3).map((opp) => (
                    <div
                      key={opp.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={opp.avatarUrl}
                          alt={opp.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-rose-400"
                        />
                        <div>
                          <h5 className="text-xs font-black text-slate-800 dark:text-white">{opp.name}</h5>
                          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">{opp.rank} • {opp.rating} Elo</span>
                        </div>
                      </div>
                      <button
                        onClick={() => startMatchmaking(opp)}
                        className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-black text-xs transition-colors flex items-center gap-1"
                      >
                        <Swords className="w-3.5 h-3.5" />
                        <span>Chaqirish</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. MATCHING ANIMATION PHASE */}
          {phase === 'matching' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-rose-500 border-t-transparent animate-spin flex items-center justify-center">
                  <Swords className="w-10 h-10 text-rose-500" />
                </div>
                <div className="absolute inset-0 bg-rose-500/10 rounded-full animate-ping" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white">Raqib Izlanmoqda...</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Sizning darajangizga mos bilimdon tanlanmoqda
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-sky-500" />
                  <span className="text-xs font-black text-slate-800 dark:text-white">{user.name}</span>
                </div>
                <span className="text-base font-black text-rose-500">VS</span>
                <div className="flex items-center gap-2">
                  <img src={opponent.avatarUrl} alt={opponent.name} className="w-10 h-10 rounded-full object-cover border-2 border-rose-500" />
                  <span className="text-xs font-black text-slate-800 dark:text-white">{opponent.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. BATTLE IN PROGRESS PHASE */}
          {phase === 'battle' && selectedQuestions.length > 0 && (
            <div className="space-y-4 animate-fade-in">
              {/* Opponent & User Dual Battle Status Bar */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                {/* You */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-slate-800 dark:text-white flex items-center gap-1">
                      <span>👤 {user.name}</span>
                      <span className="text-[10px] text-sky-600 dark:text-sky-400">(Siz)</span>
                    </span>
                    <span className="font-bold text-slate-600 dark:text-slate-300">{userScore} ball</span>
                  </div>
                  {/* HP Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-500"
                      style={{ width: `${userHp}%` }}
                    />
                  </div>
                </div>

                {/* Opponent */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-slate-800 dark:text-white flex items-center gap-1">
                      <span>🤖 {opponent.name}</span>
                    </span>
                    <span className="font-bold text-slate-600 dark:text-slate-300">{opponentScore} ball</span>
                  </div>
                  {/* HP Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-500"
                      style={{ width: `${opponentHp}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Header & Countdown */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 px-2.5 py-1 rounded-xl">
                  Savol {currentQIndex + 1} / {selectedQuestions.length} • {selectedQuestions[currentQIndex].category}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-black text-xs">
                  <Timer className={`w-3.5 h-3.5 ${questionTimer <= 3 ? 'animate-ping text-rose-600' : ''}`} />
                  <span>{questionTimer} soniya</span>
                </div>
              </div>

              {/* Question Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-sm md:text-base font-black text-slate-800 dark:text-white leading-relaxed">
                  {selectedQuestions[currentQIndex].question}
                </h3>

                {/* Options List */}
                <div className="space-y-2">
                  {selectedQuestions[currentQIndex].options.map((opt, idx) => {
                    const isCorrect = idx === selectedQuestions[currentQIndex].correctAnswer;
                    const isSelected = selectedOption === idx;
                    let btnStyle = "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-700 dark:text-slate-200 hover:border-rose-400";

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-black";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 font-black";
                      } else {
                        btnStyle = "opacity-50 border-slate-200 dark:border-slate-700";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Banner when answered */}
                {isAnswerSubmitted && (
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 font-medium">
                    <strong>Tushuntirish:</strong> {selectedQuestions[currentQIndex].explanation}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. RESULT PHASE */}
          {phase === 'result' && (
            <div className="py-6 text-center space-y-5 animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20">
                {userScore >= opponentScore ? "🏆" : "🥈"}
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                  {userScore >= opponentScore ? "G'alaba! Tabriklaymiz!" : "Qiziqarli Bellashuv!"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {userScore >= opponentScore
                    ? `Siz ${opponent.name} ustidan ishonchli g'alabaga erishdingiz!`
                    : `${opponent.name} biroz tezroq harakat qildi. Yana bir bor urinib ko'ring!`}
                </p>
              </div>

              {/* Score comparison pill */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
                <div>
                  <span className="text-xs text-slate-500 block">Sizning Ballingiz</span>
                  <span className="text-xl font-black text-sky-600 dark:text-sky-400">{userScore}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Raqib Balli</span>
                  <span className="text-xl font-black text-rose-600 dark:text-rose-400">{opponentScore}</span>
                </div>
              </div>

              {/* Rewards Earned Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border border-amber-200 dark:border-amber-900/60 max-w-sm mx-auto flex items-center justify-around">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪙</span>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Mukofot</span>
                    <span className="text-sm font-black text-amber-700 dark:text-amber-300">
                      +{userScore >= opponentScore ? 80 : 30} Tangalar
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Tajriba</span>
                    <span className="text-sm font-black text-sky-700 dark:text-sky-300">
                      +{userScore >= opponentScore ? 150 : 50} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <button
                  onClick={() => startMatchmaking()}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Yana Jang Qilish</span>
                </button>
                <button
                  onClick={() => {
                    setPhase('lobby');
                  }}
                  className="py-3.5 px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all"
                >
                  Lobbyga Qaytish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
