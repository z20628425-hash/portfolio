import React, { useState, useEffect } from 'react';
import { X, Brain, RotateCw, CheckCircle2, ChevronRight, Sparkles, Flame, Plus, BookMarked } from 'lucide-react';
import { FlashcardItem } from '../../types';
import { initialFlashcards } from '../../data/mockData';

interface SpacedRepetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCoins?: (coins: number, xp: number) => void;
}

export const SpacedRepetitionModal: React.FC<SpacedRepetitionModalProps> = ({
  isOpen,
  onClose,
  onRewardCoins,
}) => {
  const [cards, setCards] = useState<FlashcardItem[]>(() => {
    const saved = localStorage.getItem('prep_hub_flashcards');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Flashcard load error', e);
      }
    }
    return initialFlashcards;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('IELTS Academic Band 8+ Collocations');
  const [aiSubject, setAiSubject] = useState('English Core');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newSubject, setNewSubject] = useState('English Core');

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

  const currentCard = cards[currentIndex] || cards[0];

  const handleGenerateAIFlashcards = async () => {
    if (!aiTopic.trim()) return;
    setAiGenerating(true);
    try {
      const response = await fetch('/api/gemini/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic.trim(),
          subject: aiSubject,
          count: 4,
        }),
      });
      const data = await response.json();
      if (data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
        const generatedCards: FlashcardItem[] = data.cards.map((c: any, index: number) => ({
          id: `fc-ai-${Date.now()}-${index}`,
          front: c.front,
          back: `${c.back}${c.hint ? `\n💡 Maslahat: ${c.hint}` : ''}`,
          subject: c.subject || aiSubject,
          easeFactor: 2.5,
          intervalDays: 1,
          repetitions: 0,
          dueDate: new Date().toISOString().split('T')[0],
          state: 'learning',
        }));

        const updated = [...generatedCards, ...cards];
        setCards(updated);
        localStorage.setItem('prep_hub_flashcards', JSON.stringify(updated));
        setShowAIModal(false);
      }
    } catch (err) {
      console.error('AI Flashcards generate error:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSM2Review = (rating: 0 | 1 | 2 | 3) => {
    // SuperMemo-2 (SM-2) simplified algorithm
    // 0: Again (reset to 1 day), 1: Hard (interval * 1.2), 2: Good (interval * 2.5), 3: Easy (interval * 3.5)
    if (!currentCard) return;

    let newInterval = currentCard.intervalDays;
    let newEase = currentCard.easeFactor;
    let newReps = currentCard.repetitions + 1;
    let newState: 'learning' | 'review' | 'mastered' = currentCard.state;

    if (rating === 0) {
      newInterval = 1;
      newReps = 0;
      newState = 'learning';
    } else if (rating === 1) {
      newInterval = Math.max(1, Math.round(newInterval * 1.2));
      newEase = Math.max(1.3, newEase - 0.15);
      newState = 'review';
    } else if (rating === 2) {
      newInterval = Math.round(newInterval * newEase);
      newState = newReps >= 3 ? 'mastered' : 'review';
    } else {
      newInterval = Math.round(newInterval * newEase * 1.3);
      newEase += 0.15;
      newState = 'mastered';
    }

    const updatedCards = [...cards];
    updatedCards[currentIndex] = {
      ...currentCard,
      intervalDays: newInterval,
      easeFactor: Number(newEase.toFixed(2)),
      repetitions: newReps,
      state: newState,
      dueDate: new Date(Date.now() + newInterval * 86400000).toISOString().split('T')[0],
    };

    setCards(updatedCards);
    localStorage.setItem('prep_hub_flashcards', JSON.stringify(updatedCards));

    if (onRewardCoins) {
      onRewardCoins(15, 20);
    }

    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleCreateNewCard = () => {
    if (!newFront.trim() || !newBack.trim()) return;
    const newCard: FlashcardItem = {
      id: `fc-${Date.now()}`,
      front: newFront.trim(),
      back: newBack.trim(),
      subject: newSubject,
      easeFactor: 2.5,
      intervalDays: 1,
      repetitions: 0,
      dueDate: new Date().toISOString().split('T')[0],
      state: 'learning',
    };
    const updated = [newCard, ...cards];
    setCards(updated);
    localStorage.setItem('prep_hub_flashcards', JSON.stringify(updated));
    setNewFront('');
    setNewBack('');
    setShowAddModal(false);
  };

  const masteredCount = cards.filter((c) => c.state === 'mastered').length;
  const learningCount = cards.filter((c) => c.state === 'learning').length;

  return (
    <div
      id="spaced-repetition-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spaced-repetition-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div id="spaced-repetition-modal-container" className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold" aria-hidden="true">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 id="spaced-repetition-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Spaced Repetition (SM-2 Takrorlash)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Xato qilingan test va yangi so'zlarni ilmiy algoritm bilan eslab qoling
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="ai-generate-flashcards-btn"
              onClick={() => setShowAIModal(true)}
              aria-label="AI bilan flesh-kartalar yaratish"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:opacity-95 shadow-sm transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>AI Yaratish</span>
            </button>
            <button
              id="add-flashcard-btn"
              onClick={() => setShowAddModal(true)}
              aria-label="Qo'lda yangi flesh-karta yaratish"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-200 dark:hover:bg-purple-900 transition"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Qo'lda</span>
            </button>
            <button
              id="close-flashcards-btn"
              onClick={onClose}
              aria-label="Flesh-kartalar oynasini yopish"
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div role="region" aria-label="Karta statistikasi" className="flex items-center justify-around px-6 py-2.5 bg-purple-50/50 dark:bg-purple-950/20 border-b border-purple-100/50 dark:border-purple-900/30 text-xs">
          <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-semibold">
            <BookMarked className="w-4 h-4" aria-hidden="true" />
            <span>Jami: {cards.length} ta karta</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
            <RotateCw className="w-4 h-4" aria-hidden="true" />
            <span>O'rganilmoqda: {learningCount} ta</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>O'zlashtirildi: {masteredCount} ta</span>
          </div>
        </div>

        {/* Content Body / Interactive Card */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6">
          {cards.length > 0 && currentCard ? (
            <>
              {/* Progress Indicator */}
              <div className="w-full flex items-center justify-between text-xs text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  {currentCard.subject}
                </span>
                <span>
                  {currentIndex + 1} / {cards.length}
                </span>
              </div>

              {/* 3D Flip Card */}
              <div
                id="interactive-flashcard"
                role="button"
                tabIndex={0}
                aria-label={`Flesh-karta. ${isFlipped ? 'Orqa tomon' : 'Old tomon'}: ${isFlipped ? currentCard.back : currentCard.front}. O'girish uchun Enter yoki bo'shliq tugmasini bosing.`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsFlipped(!isFlipped); }}
                onClick={() => setIsFlipped(!isFlipped)}
                className={`w-full min-h-[220px] rounded-3xl p-8 cursor-pointer border transition-all duration-300 flex flex-col items-center justify-center text-center relative shadow-lg hover:shadow-xl select-none ${
                  isFlipped
                    ? 'bg-gradient-to-br from-purple-900 to-indigo-950 text-white border-purple-700'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/10 dark:bg-white/10">
                  {isFlipped ? 'Javob & Tushuntirish' : 'Savol / So\'z'}
                </span>

                <div className="text-base sm:text-lg font-bold leading-relaxed px-4">
                  {isFlipped ? currentCard.back : currentCard.front}
                </div>

                <div className="absolute bottom-4 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-400" aria-hidden="true">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'Old tomoniga qaytish' : 'Javobni ko\'rish uchun bosing'}</span>
                </div>
              </div>

              {/* SM-2 Review Buttons */}
              {isFlipped && (
                <div className="w-full space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <p className="text-xs text-center font-medium text-slate-500">
                    Qanchalik oson esladingiz? (SM-2 Algoritmi)
                  </p>
                  <div role="group" aria-label="Eslab qolish bahosi" className="grid grid-cols-4 gap-2">
                    <button
                      id="sm2-again-btn"
                      onClick={() => handleSM2Review(0)}
                      aria-label="Qayta o'rganish, 1 kun"
                      className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition flex flex-col items-center gap-0.5"
                    >
                      <span>Qayta</span>
                      <span className="text-[10px] opacity-75">1 kun</span>
                    </button>
                    <button
                      id="sm2-hard-btn"
                      onClick={() => handleSM2Review(1)}
                      aria-label={`Qiyin esladim, ${Math.max(1, Math.round(currentCard.intervalDays * 1.2))} kun`}
                      className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition flex flex-col items-center gap-0.5"
                    >
                      <span>Qiyin</span>
                      <span className="text-[10px] opacity-75">{Math.max(1, Math.round(currentCard.intervalDays * 1.2))} kun</span>
                    </button>
                    <button
                      id="sm2-good-btn"
                      onClick={() => handleSM2Review(2)}
                      aria-label={`Yaxshi esladim, ${Math.round(currentCard.intervalDays * currentCard.easeFactor)} kun`}
                      className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold transition flex flex-col items-center gap-0.5"
                    >
                      <span>Yaxshi</span>
                      <span className="text-[10px] opacity-75">{Math.round(currentCard.intervalDays * currentCard.easeFactor)} kun</span>
                    </button>
                    <button
                      id="sm2-easy-btn"
                      onClick={() => handleSM2Review(3)}
                      aria-label={`Oson esladim, ${Math.round(currentCard.intervalDays * currentCard.easeFactor * 1.4)} kun`}
                      className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition flex flex-col items-center gap-0.5"
                    >
                      <span>Oson</span>
                      <span className="text-[10px] opacity-75">{Math.round(currentCard.intervalDays * currentCard.easeFactor * 1.4)} kun</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 space-y-3" aria-live="polite">
              <Sparkles className="w-10 h-10 text-purple-500 mx-auto" aria-hidden="true" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Barcha kartalar o'rganildi!</h3>
              <p className="text-xs text-slate-500">Yangi flesh-karta qo'shing yoki keyingi takrorlash vaqtini kuting.</p>
            </div>
          )}
        </div>

        {/* Modal for adding custom card */}
        {showAddModal && (
          <div role="dialog" aria-modal="true" aria-labelledby="add-custom-card-title" className="absolute inset-0 bg-white dark:bg-slate-900 p-6 z-10 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 id="add-custom-card-title" className="text-base font-bold text-slate-900 dark:text-white">
                  Yangi Flash-Karta Yaratish
                </h3>
                <button onClick={() => setShowAddModal(false)} aria-label="Yopish" className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="w-5 h-5 text-slate-400" aria-hidden="true" />
                </button>
              </div>

              <div>
                <label htmlFor="custom-card-subject-select" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Fan / Yo'nalish</label>
                <select
                  id="custom-card-subject-select"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="English Core">English Core (Grammatika)</option>
                  <option value="IELTS Vocabulary">IELTS Lug'at</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Mantiq">Mantiq va Tanqidiy Fikr</option>
                </select>
              </div>

              <div>
                <label htmlFor="custom-card-front-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Old tomon (Savol / So'z / Formula)</label>
                <textarea
                  id="custom-card-front-input"
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  rows={3}
                  placeholder="Masalan: 'Present Perfect qachon ishlatiladi?' yoki yangi so'z..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label htmlFor="custom-card-back-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Orqa tomon (Javob / Tarjima / Izoh)</label>
                <textarea
                  id="custom-card-back-input"
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  rows={3}
                  placeholder="Masalan: O'tmishda sodir bo'lib, natijasi hozirga bog'liq harakatlar uchun..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                aria-label="Bekor qilish"
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Bekor qilish
              </button>
              <button
                id="save-new-flashcard-btn"
                onClick={handleCreateNewCard}
                disabled={!newFront.trim() || !newBack.trim()}
                aria-label="Yangi flesh-kartani saqlash"
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md disabled:opacity-50"
              >
                Saqlash
              </button>
            </div>
          </div>
        )}

        {/* Modal for AI Flashcard Generation (Gemini Skill) */}
        {showAIModal && (
          <div role="dialog" aria-modal="true" aria-labelledby="ai-flashcard-generator-title" className="absolute inset-0 bg-white dark:bg-slate-900 p-6 z-10 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center" aria-hidden="true">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 id="ai-flashcard-generator-title" className="text-sm font-bold text-slate-900 dark:text-white">
                      AI Flashcard Generator (Gemini 3.7)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Mavzuni tanlang va AI darhol 4 ta yuqori sifatli flesh-karta yaratadi
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowAIModal(false)} aria-label="Yopish" className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="w-5 h-5 text-slate-400" aria-hidden="true" />
                </button>
              </div>

              <div>
                <label htmlFor="ai-card-subject-select" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Fan / Yo'nalish</label>
                <select
                  id="ai-card-subject-select"
                  value={aiSubject}
                  onChange={(e) => setAiSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="English Core">English Core (Grammatika & Leksika)</option>
                  <option value="IELTS Vocabulary">IELTS Academic Vocabulary</option>
                  <option value="Matematika">Matematika & Formulalar</option>
                  <option value="Mantiq">Mantiqiy Tafakkur & Xatolar</option>
                </select>
              </div>

              <div>
                <label htmlFor="ai-card-topic-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mavzu yoki So'zlar to'plami</label>
                <input
                  id="ai-card-topic-input"
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Masalan: IELTS Band 8 Academic Collocations..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>

              {/* Quick Prompt Presets */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-1.5">Tayyor Tavsiya Mavzulari:</p>
                <div role="group" aria-label="Tavsiya mavzular" className="flex flex-wrap gap-1.5">
                  {[
                    'IELTS Band 8+ Collocations',
                    'Phrasal Verbs with Context',
                    'Logarifm & Hosilalar',
                    'Grammar Conditionals & Inversion',
                    'Cognitive Fallacies in Logic',
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAiTopic(preset)}
                      aria-label={`Mavzuni tanlash: ${preset}`}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-[11px] font-medium border border-purple-200/50 dark:border-purple-800/50 transition"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={() => setShowAIModal(false)}
                aria-label="Bekor qilish"
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Bekor qilish
              </button>
              <button
                id="generate-ai-cards-confirm-btn"
                onClick={handleGenerateAIFlashcards}
                disabled={aiGenerating || !aiTopic.trim()}
                aria-label="4 ta AI flesh-karta yaratish"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {aiGenerating ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                    <span>AI Yaratmoqda...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>4 ta Karta Yaratish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
