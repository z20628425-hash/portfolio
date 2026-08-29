import React, { useEffect } from 'react';
import { X, Download, FileSpreadsheet, Award, FileText, CheckCircle2, QrCode } from 'lucide-react';
import { UserProfile, CompletedTestRecord } from '../../types';

interface ExportProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  history: CompletedTestRecord[];
}

export const ExportProgressModal: React.FC<ExportProgressModalProps> = ({
  isOpen,
  onClose,
  user,
  history,
}) => {
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

  const handleExportCSV = () => {
    const headers = ['Test ID', 'Mavzu', 'Fan', 'To\'g\'ri Javoblar', 'Jami Savollar', 'Foiz', 'Vaqt (daq)', 'Sana'];
    const rows = history.map((h) => [
      h.testId,
      `"${h.testTitle.replace(/"/g, '""')}"`,
      h.subject,
      h.correctAnswers,
      h.totalQuestions,
      `${h.percentage}%`,
      Math.round(h.timeSpentSeconds / 60),
      h.completedAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Prezent_Prep_Hub_Progress_${user.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const dataObj = {
      student: user,
      exportDate: new Date().toISOString(),
      testHistory: history,
      system: 'Prezent Prep Hub Enterprise',
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataObj, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `Prezent_Prep_Hub_Backup_${user.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div id="export-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div id="export-modal-container" className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Natijalar va Sertifikatni Yuklab Olish
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                O'quv ko'rsatkichlaringizni Excel, CSV va rasmiy PDF sertifikat ko'rinishida eksport qiling
              </p>
            </div>
          </div>

          <button
            id="close-export-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Card 1: CSV / Excel Export */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Excel / CSV Progress Hisoboti
                </h4>
                <p className="text-[11px] text-slate-500">
                  Barcha {history.length} ta topshirilgan testlar tarixi, foizlar va vaqt sarfi
                </p>
              </div>
            </div>

            <button
              id="download-csv-btn"
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition whitespace-nowrap"
            >
              CSV Yuklab olish
            </button>
          </div>

          {/* Card 2: Printable Certificate */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Rasmiy O'quv Sertifikati & Scorecard
                </h4>
                <p className="text-[11px] text-slate-500">
                  Prezent Prep Hub tasdiqlangan akademik ko'rsatkich varaqasi (Chop etishga tayyor)
                </p>
              </div>
            </div>

            <button
              id="print-cert-btn"
              onClick={handlePrintCertificate}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition whitespace-nowrap"
            >
              Sertifikatni ochish
            </button>
          </div>

          {/* Card 3: Full JSON Backup */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  To'liq Profil Zaxira Nusxasi (JSON)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Barcha parametrlar, yutuqlar va test javoblarini saqlab olish
                </p>
              </div>
            </div>

            <button
              id="download-json-btn"
              onClick={handleExportJSON}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition whitespace-nowrap"
            >
              JSON Saqlash
            </button>
          </div>

          {/* Certificate Preview Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border-2 border-amber-300 dark:border-amber-700/60 text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Award className="w-6 h-6 text-amber-600" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-800 dark:text-amber-300">
                Prezent Prep Hub Academic Certificate
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              O'zlashtirish darajasi: <strong>{user.overallMastery}%</strong> · Reyting: <strong>{user.rating} XP</strong> · Daraja: <strong>{user.currentLevel}</strong>
            </p>
            <div className="pt-2 text-[10px] text-slate-400 font-mono">
              Sertifikat ID: PPH-{Date.now().toString().slice(-8)} · Autentifikatsiya QR mavjud
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
