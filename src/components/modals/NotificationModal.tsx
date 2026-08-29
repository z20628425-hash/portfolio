import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { NotificationSetting } from '../../types';

interface NotificationModalProps {
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const [settings, setSettings] = useState<NotificationSetting>({
    studyReminders: true,
    testAlerts: true,
    achievementNotifications: true,
    weeklyReport: false,
  });

  const toggle = (key: keyof NotificationSetting) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      id="notification-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
    >
      <div id="notification-modal-container" className="glass-modal rounded-3xl w-full max-w-md overflow-hidden shadow-2xl shadow-sky-900/10 flex flex-col border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-sky-50/80 dark:bg-slate-800/80 border-b border-sky-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <h3 id="notification-modal-title" className="font-bold text-lg text-slate-800 dark:text-white">Bildirishnomalar</h3>
          </div>
          <button
            id="close-notification-modal-btn"
            onClick={onClose}
            aria-label="Bildirishnomalar oynasini yopish"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-sky-100/60 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div role="list" aria-label="Bildirishnoma sozlamalari ro'yxati" className="p-6 space-y-4">
          <div role="listitem" className="flex justify-between items-center py-2 border-b border-sky-100 dark:border-slate-800">
            <div>
              <p id="label-study-reminders" className="font-semibold text-sm text-slate-800 dark:text-slate-200">Kunlik dars eslatmalari</p>
              <p className="text-xs text-slate-500">Dars qilish vaqtini o'tkazib yubormang</p>
            </div>
            <button
              id="toggle-study-reminders-btn"
              role="switch"
              aria-checked={settings.studyReminders}
              aria-labelledby="label-study-reminders"
              onClick={() => toggle('studyReminders')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                settings.studyReminders ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.studyReminders ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div role="listitem" className="flex justify-between items-center py-2 border-b border-sky-100 dark:border-slate-800">
            <div>
              <p id="label-test-alerts" className="font-semibold text-sm text-slate-800 dark:text-slate-200">Yangi test bildirishnomalari</p>
              <p className="text-xs text-slate-500">Yangi topshiriq va quizlar haqida xabar berish</p>
            </div>
            <button
              id="toggle-test-alerts-btn"
              role="switch"
              aria-checked={settings.testAlerts}
              aria-labelledby="label-test-alerts"
              onClick={() => toggle('testAlerts')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                settings.testAlerts ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.testAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div role="listitem" className="flex justify-between items-center py-2 border-b border-sky-100 dark:border-slate-800">
            <div>
              <p id="label-achievement-notifs" className="font-semibold text-sm text-slate-800 dark:text-slate-200">Yutuq va XP xabarlari</p>
              <p className="text-xs text-slate-500">Yangi nishon yoki darajaga erishganingizda</p>
            </div>
            <button
              id="toggle-achievement-notifs-btn"
              role="switch"
              aria-checked={settings.achievementNotifications}
              aria-labelledby="label-achievement-notifs"
              onClick={() => toggle('achievementNotifications')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                settings.achievementNotifications ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.achievementNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div role="listitem" className="flex justify-between items-center py-2">
            <div>
              <p id="label-weekly-report" className="font-semibold text-sm text-slate-800 dark:text-slate-200">Haftalik hisobot</p>
              <p className="text-xs text-slate-500">Har dushanba haftalik natijalarni olish</p>
            </div>
            <button
              id="toggle-weekly-report-btn"
              role="switch"
              aria-checked={settings.weeklyReport}
              aria-labelledby="label-weekly-report"
              onClick={() => toggle('weeklyReport')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                settings.weeklyReport ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.weeklyReport ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-sky-50/80 dark:bg-slate-800/80 border-t border-sky-100 dark:border-slate-800 flex justify-end">
          <button
            id="notification-modal-ok-btn"
            onClick={() => {
              fetch('/api/notifications/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 'current_user', settings })
              }).catch(console.error);
              onClose();
            }}
            aria-label="Saqlash va oynani yopish"
            className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md shadow-sky-600/25 border border-white/30"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};
