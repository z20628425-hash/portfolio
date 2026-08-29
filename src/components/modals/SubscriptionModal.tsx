import React, { useState, useEffect } from 'react';
import { X, Crown, Check, ShieldCheck, Zap, Sparkles, CreditCard } from 'lucide-react';
import { SubscriptionPlan, UserProfile } from '../../types';
import { initialSubscriptionPlans } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpgradeSuccess: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpgradeSuccess,
}) => {
  const { translate: t } = useLanguage();
  const [plans] = useState<SubscriptionPlan[]>(initialSubscriptionPlans);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click' | 'stripe' | 'uzum'>('payme');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlanId,
          provider: paymentMethod,
          email: user.email || 'student@prephub.uz',
          amountUzs: selectedPlan.priceUzs,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`To'lov muvaffaqiyatli amalga oshirildi (Server API orqali)! ${selectedPlan.name} imtiyozlari faollashtirildi.`);
        onUpgradeSuccess();
      } else {
        alert(data.error || "To'lov rad etildi!");
      }
    } catch (e) {
      console.error('Payment checkout error', e);
      alert("Tarmoq xatosi yoki provayder ulanishida xato!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="subscription-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscription-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div id="subscription-modal-container" className="relative w-full max-w-3xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="relative px-6 py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
              <Crown className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">{t("proAccess")}</h2>
                <span className="px-2 py-0.5 rounded-full bg-white text-orange-600 text-[10px] font-black uppercase">
                  VIP Access
                </span>
              </div>
              <p className="text-xs text-amber-100 mt-0.5">
                {t("proAccessDesc")}
              </p>
            </div>
          </div>

          <button
            id="close-subscription-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-black/10 hover:bg-black/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {successMessage ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Tabriklaymiz! Siz PRO a'zosisiz!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {successMessage}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition"
              >
                O'qishni boshlash
              </button>
            </div>
          ) : (
            <>
              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      id={`plan-card-${plan.id}`}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/40 dark:bg-orange-950/20 shadow-lg scale-[1.02]'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                          Eng Ommabop
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{plan.name}</h4>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-black text-slate-900 dark:text-white">
                              {plan.priceUzs === 0 ? "0 so'm" : `$${plan.priceUsd || Math.round(plan.priceUzs / 13000)}`}
                            </span>
                            {plan.priceUzs > 0 && (
                              <span className="text-xs font-semibold text-slate-500">
                                ({plan.priceUzs.toLocaleString()} so'm)
                              </span>
                            )}
                            <span className="text-xs text-slate-500">
                              {plan.durationMonths === 12 ? '/ yil' : '/ oy'}
                            </span>
                          </div>
                          {plan.durationMonths === 12 && (
                            <p className="text-[11px] text-emerald-600 font-bold mt-0.5">
                              ⚡ Oyiga atigi $1.8 (23,000 so'm)
                            </p>
                          )}
                        </div>

                        <ul className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                          {plan.features.map((feat, fIdx) => (
                            <li key={fIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  To'lov Tizimini Tanlang
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'payme', name: 'Payme', badge: '0% Komissiya', color: 'border-cyan-400' },
                    { id: 'click', name: 'Click Evolution', badge: 'Tezkor', color: 'border-blue-400' },
                    { id: 'uzum', name: 'Uzum Bank', badge: 'Keshbek 3%', color: 'border-purple-400' },
                    { id: 'stripe', name: 'Visa / Mastercard', badge: 'Xalqaro', color: 'border-indigo-400' },
                  ].map((method) => {
                    const isMethodSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        id={`payment-method-${method.id}`}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                          isMethodSelected
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-200 shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs">{method.name}</span>
                          <CreditCard className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          {method.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Security guarantee */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>
                  Barcha to'lovlar 256-bit SSL shifrlash orqali xavfsiz amalga oshiriladi. 14 kunlik 100% pulni qaytarish kafolati mavjud.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!successMessage && (
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div>
              <span className="text-xs text-slate-400">To'lov miqdori:</span>
              <div className="text-base font-black text-slate-900 dark:text-white flex items-baseline gap-1.5">
                <span>{selectedPlan.priceUzs === 0 ? "0 so'm" : `$${selectedPlan.priceUsd || Math.round(selectedPlan.priceUzs / 13000)}`}</span>
                {selectedPlan.priceUzs > 0 && (
                  <span className="text-xs text-slate-500 font-medium">({selectedPlan.priceUzs.toLocaleString()} so'm)</span>
                )}
              </div>
            </div>

            <button
              id="confirm-checkout-btn"
              onClick={handleCheckout}
              disabled={isLoading || selectedPlan.priceUzs === 0}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 disabled:opacity-50 transition flex items-center gap-2"
            >
              {isLoading ? (
                <span>Tranzaksiya bajarilmoqda...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Obunani faollashtirish</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
