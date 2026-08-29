import React, { useState } from 'react';
import { X, Users, Copy, Check, Share2, Gift, Sparkles, Trophy, Coins, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ReferralModalProps {
  user: UserProfile;
  onClose: () => void;
  onApplyReferralCode: (code: string) => boolean | Promise<boolean>; // Returns true if code accepted
  onAddRewards: (coins: number, xp: number) => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  user,
  onClose,
  onApplyReferralCode,
}) => {
  const { translate: t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const myReferralCode = user.referralCode || 'PREP-7829';
  const referralLink = `https://prep-hub.uz/?ref=${myReferralCode}`;
  const referralCount = user.referralCount || 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTelegram = () => {
    const text = `🎓 Hey! Men Prep Hub platformasida IELTS, Matematika va Mantiq bo'yicha tayyorlanmoqdaman! Link orqali ro'yxatdan o't va ikkalamiz ham +150 Tangalar va +200 XP sovg'asini olaylik! 🎁✨\n\nReferal kodim: ${myReferralCode}\n${referralLink}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleClaimCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanCode = inputCode.trim().toUpperCase();

    if (!cleanCode) {
      setErrorMessage("Iltimos, referal kodni kiriting!");
      return;
    }

    if (cleanCode === myReferralCode) {
      setErrorMessage("O'zingizning referal kodingizni kiritish mumkin emas!");
      return;
    }

    if (user.invitedByCode) {
      setErrorMessage("Siz allaqachon referal kodini kiritib, sovg'angizni olgansiz!");
      return;
    }

    const success = await onApplyReferralCode(cleanCode);
    if (success) {
      setSuccessMessage("Tabriklaymiz! Referal kod qabul qilindi: +150 Tangalar, +200 XP va +1 Charxpalak Spini berildi! 🎉");
      setInputCode('');
    } else {
      setErrorMessage("Noto'g'ri referal kod. Qayta tekshirib ko'ring!");
    }
  };

  return (
    <div
      id="referral-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="referral-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
    >
      <div id="referral-modal-container" className="glass-modal rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-amber-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white relative overflow-hidden flex justify-between items-center">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" aria-hidden="true" />

          <div className="z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-2xl shadow-md" aria-hidden="true">
              🎁
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-amber-100 font-bold text-[10px] uppercase tracking-wider">
                Referal Dastur
              </div>
              <h3 id="referral-modal-title" className="text-xl font-black text-white">{t("inviteFriends")}</h3>
            </div>
          </div>

          <button
            id="close-referral-modal-btn"
            onClick={onClose}
            aria-label="Referal oynasini yopish"
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Banner Promo Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100/30 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-900/30 border border-amber-200/80 dark:border-amber-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <h4 className="font-extrabold text-sm text-amber-950 dark:text-amber-200">Har bir do'st uchun mukofot!</h4>
              </div>
              <span className="px-2.5 py-1 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 rounded-lg text-[10px] font-black border border-amber-300 dark:border-amber-700">
                Aktiv Dastur
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Do'stingiz platformaga krib, sizning referal kodingizni kiritsa — <strong>ikkalangiz ham</strong> darhol mukofotga ega bo'lasiz!
            </p>

            <div role="region" aria-label="Taklif mukofotlari" className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-amber-200/60 dark:border-amber-800/60 shadow-2xs">
                <div className="text-base font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                  <span>🪙 +150</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500">Tangalar</div>
              </div>

              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-amber-200/60 dark:border-amber-800/60 shadow-2xs">
                <div className="text-base font-black text-sky-600 dark:text-sky-400 flex items-center justify-center gap-1">
                  <span>⚡ +200</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500">XP Bal</div>
              </div>

              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-amber-200/60 dark:border-amber-800/60 shadow-2xs">
                <div className="text-base font-black text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                  <span>🎡 +1</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500">Spin Imkoniyati</div>
              </div>
            </div>
          </div>

          {/* User's Referral Link Box */}
          <div className="space-y-2">
            <label htmlFor="user-referral-link-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Sizning Referal Kodingiz & Havolangiz:</span>
              <span className="text-amber-600 dark:text-amber-400 font-extrabold">{referralCount} ta do'st taklif qilindi</span>
            </label>

            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="px-3 py-1.5 bg-amber-500 text-white font-black text-xs rounded-xl shadow-xs">
                {myReferralCode}
              </div>
              <input
                id="user-referral-link-input"
                type="text"
                readOnly
                value={referralLink}
                aria-label="Referal havolangiz"
                className="bg-transparent flex-1 text-xs font-mono text-slate-700 dark:text-slate-300 outline-hidden overflow-hidden text-ellipsis"
              />
              <button
                id="copy-referral-link-btn"
                onClick={handleCopyLink}
                aria-label={copied ? 'Havola nusxalandi' : 'Referal havolasidan nusxa olish'}
                className="px-3 py-2 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 shadow-2xs border border-slate-200 dark:border-slate-600 flex items-center gap-1.5 transition-all active:scale-95 flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Copy className="w-4 h-4 text-slate-500" aria-hidden="true" />}
                <span>{copied ? 'Nusxalandi!' : 'Nusxa'}</span>
              </button>
            </div>

            <button
              id="share-telegram-referral-btn"
              onClick={handleShareTelegram}
              aria-label="Telegram orqali do'stlarga yuborish"
              className="w-full py-3 rounded-2xl bg-[#229ED9] hover:bg-[#1E8CBF] text-white font-black text-xs shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span>Telegram Orqali Do'stlarga Yuborish</span>
            </button>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Enter Friend's Referral Code Section */}
          <form onSubmit={handleClaimCode} className="space-y-2.5">
            <label htmlFor="friend-referral-code-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Sizni biror do'stingiz taklif qildimi? (Kod kiritish):</span>
            </label>

            {user.invitedByCode ? (
              <div role="status" className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                <span>Siz referal kod kiritib sovg'alarni olgansiz! ({user.invitedByCode})</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  id="friend-referral-code-input"
                  type="text"
                  placeholder="Masalan: PREP-7829"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  aria-label="Do'stingizning referal kodi"
                  className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-xs font-bold uppercase placeholder:normal-case focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                />
                <button
                  id="submit-friend-code-btn"
                  type="submit"
                  aria-label="Kodni yuborish va sovg'ani olish"
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-2xl shadow-sm transition-all flex items-center gap-1 active:scale-95"
                >
                  <span>Kiritish</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {!!errorMessage && (
              <div role="alert" className="text-xs text-rose-600 font-bold bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-800">
                {errorMessage}
              </div>
            )}

            {!!successMessage && (
              <div role="status" aria-live="polite" className="text-xs text-emerald-700 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                {successMessage}
              </div>
            )}
          </form>

        </div>
      </div>
    </div>
  );
};
