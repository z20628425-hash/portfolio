import React, { useState } from 'react';
import { X, HelpCircle, MessageSquare, Send } from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
  onOpenAITutor: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose, onOpenAITutor }) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    fetch('/api/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback, userEmail: 'student@prephub.uz' }),
    }).catch(console.error);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      onClose();
    }, 2000);
  };

  return (
    <div
      id="support-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
    >
      <div id="support-modal-container" className="glass-modal rounded-3xl w-full max-w-md overflow-hidden shadow-2xl shadow-sky-900/10 flex flex-col border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-sky-50/80 dark:bg-slate-800/80 border-b border-sky-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <h3 id="support-modal-title" className="font-bold text-lg text-slate-800 dark:text-white">Support & Yordam</h3>
          </div>
          <button
            id="close-support-modal-btn"
            onClick={onClose}
            aria-label="Yordam oynasini yopish"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-sky-100/60 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick AI Help Option */}
          <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-blue-600 p-4 rounded-2xl border border-sky-300/30 flex items-center justify-between shadow-lg shadow-sky-500/15 text-white">
            <div>
              <h4 className="font-bold text-sm text-white">AI O'quv Yordamchisi</h4>
              <p className="text-xs text-sky-100 mt-0.5">Testlar va mavzular bo'yicha savolingiz bormi?</p>
            </div>
            <button
              id="open-ai-tutor-from-support-btn"
              onClick={() => {
                onClose();
                onOpenAITutor();
              }}
              aria-label="AI o'quv yordamchisiga savol berish"
              className="bg-white text-sky-800 px-3.5 py-2 rounded-full text-xs font-bold hover:bg-sky-50 flex-shrink-0 ml-2 shadow-md shadow-sky-900/10 transition-all"
            >
              Savol Berish
            </button>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tez-tez beriladigan savollar</h4>
            <details className="glass-card p-3.5 rounded-2xl text-xs text-slate-800 dark:text-slate-200 font-medium cursor-pointer border border-sky-100 dark:border-slate-800 shadow-xs">
              <summary className="outline-none font-bold text-sky-700 dark:text-sky-400">XP qanday hisoblanadi?</summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                Har bir muvaffaqiyatli topshirilgan test uchun 50 XP gacha, har bir o'qilgan mavzu uchun esa 20 XP beriladi.
              </p>
            </details>

            <details className="glass-card p-3.5 rounded-2xl text-xs text-slate-800 dark:text-slate-200 font-medium cursor-pointer border border-sky-100 dark:border-slate-800 shadow-xs">
              <summary className="outline-none font-bold text-sky-700 dark:text-sky-400">Yangi testlar qachon qo'shiladi?</summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                Platformadagi yangi testlar va fan bo'limlari har dushanba kuni avtomatik ravishda yangilanadi.
              </p>
            </details>
          </div>

          {/* Send Message / Feedback */}
          <form onSubmit={handleSubmit} className="space-y-2 pt-2 border-t border-sky-100 dark:border-slate-800">
            <label htmlFor="support-feedback-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Muammo yoki Taklif Yuborish
            </label>
            {submitted ? (
              <div role="status" aria-live="polite" className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 p-3 rounded-2xl text-xs text-center font-bold">
                Xabaringiz muvaffaqiyatli yuborildi! Rahmat.
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  id="support-feedback-input"
                  type="text"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Xabaringizni yozing..."
                  aria-label="Muammo yoki taklif xabari"
                  className="flex-1 p-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-200/80 dark:border-slate-700 outline-none text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-sky-500"
                />
                <button
                  id="submit-support-feedback-btn"
                  type="submit"
                  disabled={!feedback.trim()}
                  aria-label="Xabarni yuborish"
                  className="bg-sky-600 disabled:opacity-40 text-white p-3 rounded-2xl hover:bg-sky-500 flex items-center justify-center shadow-md shadow-sky-600/25 border border-white/30 transition-all"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
