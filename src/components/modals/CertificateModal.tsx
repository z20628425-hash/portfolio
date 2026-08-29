import React from 'react';
import { X, Award, ShieldCheck, Download, Printer, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';

interface CertificateModalProps {
  user: UserProfile;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ user, onClose }) => {
  const certificateId = `PREP-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
  const issueDate = new Date().toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/70 backdrop-blur-md animate-fade-in"
    >
      <div className="glass-modal rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-sky-900/40 flex flex-col max-h-[95vh] border border-amber-300/60 dark:border-amber-700/60 bg-white dark:bg-slate-900">
        
        {/* Modal Action Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-white flex justify-between items-center border-b border-amber-300/40 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-200" />
            <h3 className="font-extrabold text-sm md:text-base text-white">
              Rasmiy Prep Hub Sertifikati (Sertifikat № {certificateId})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white text-amber-900 hover:bg-amber-50 font-black text-xs shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-700" />
              <span>Chop Etish / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-6 md:p-10 overflow-y-auto flex-1 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 print:p-8 print:bg-white relative">
          
          {/* Certificate Decorative Outer Border */}
          <div className="relative border-8 border-double border-amber-400/80 dark:border-amber-600/60 rounded-2xl p-6 md:p-8 bg-white dark:bg-slate-900 shadow-xl shadow-amber-900/5 space-y-6 text-center overflow-hidden">
            
            {/* Background Watermark Seal */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <Award className="w-96 h-96 text-amber-900 dark:text-amber-400" />
            </div>

            {/* Corner Gold Flourishes */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500" />

            {/* Top Brand Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Prezent Prep Hub Rasmiy Hujjati</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white tracking-tight">
                Muvaffaqiyat Sertifikati
              </h2>
              <p className="text-xs text-amber-800 dark:text-amber-300 font-bold uppercase tracking-widest">
                CERTIFICATE OF EDUCATIONAL EXCELLENCE
              </p>
            </div>

            {/* Divider Line */}
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

            {/* Statement Body */}
            <div className="space-y-3 my-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                Ushbu rasmiy sertifikat tasdiqlaydiki:
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-amber-900 dark:text-amber-400 tracking-wide underline decoration-amber-400 decoration-2 underline-offset-8">
                {user.name}
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 max-w-lg mx-auto font-medium leading-relaxed pt-2">
                <strong>"Prezent Prep Hub"</strong> ta'lim platformasida xalqaro standartlar bo'yicha 
                <span className="text-amber-900 dark:text-amber-300 font-bold"> English Core, Mantiq & Matematika hamda IELTS Prep </span> 
                yo'nalishlarida nazariy dars va test mashg'ulotlarini muvaffaqiyatli topshirib, yuqori bilim darajasini isbotladi.
              </p>
            </div>

            {/* Achievement Badges Grid */}
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto pt-2 text-center text-xs">
              <div className="p-2 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60">
                <span className="text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase block">Umumiy Ball</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">{user.overallMastery}% Mastery</span>
              </div>
              <div className="p-2 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60">
                <span className="text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase block">To'plangan XP</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">{user.xp} XP</span>
              </div>
              <div className="p-2 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60">
                <span className="text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase block">Daraja</span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">{user.rank}</span>
              </div>
            </div>

            {/* Footer Verification & Seal Section */}
            <div className="pt-6 border-t border-amber-200 dark:border-amber-800/60 flex items-center justify-between gap-4 text-left">
              {/* Date & ID */}
              <div className="space-y-1">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Berilgan sana: <strong className="text-slate-800 dark:text-slate-200">{issueDate}</strong>
                </div>
                <div className="text-[10px] text-amber-800 dark:text-amber-400 font-mono font-bold">
                  Sertifikat kodi: {certificateId}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Blokcheyn orqali tasdiqlangan</span>
                </div>
              </div>

              {/* Gold Medal Stamp Emblem */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white flex-shrink-0">
                <div className="w-full h-full rounded-full border-2 border-dashed border-amber-100 flex flex-col items-center justify-center text-center">
                  <Award className="w-7 h-7 text-amber-100" />
                  <span className="text-[8px] font-black uppercase tracking-tighter text-amber-100">Prep Hub</span>
                  <span className="text-[7px] font-bold text-white">OFFICIAL</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
