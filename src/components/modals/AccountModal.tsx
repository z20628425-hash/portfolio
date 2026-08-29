import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { UserProfile } from '../../types';
import { availableAvatars } from '../../data/mockData';

interface AccountModalProps {
  user: UserProfile;
  onClose: () => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  user,
  onClose,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarUrl);

  const handleSave = () => {
    onUpdateUser({ name: name.trim() || user.name, avatarUrl: selectedAvatar });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="glass-modal rounded-3xl w-full max-w-md overflow-hidden shadow-2xl shadow-sky-900/10 flex flex-col border border-sky-100 dark:border-slate-800">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-sky-50/80 dark:bg-slate-800/80 border-b border-sky-100 dark:border-slate-800">
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Account Sozlamalari</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-sky-100/60 dark:hover:bg-slate-700/60 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Profil Rasmi
            </label>
            <div className="flex gap-3 justify-center">
              {availableAvatars.map((url, index) => {
                const isSelected = selectedAvatar === url;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedAvatar(url)}
                    className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                      isSelected ? 'border-sky-500 scale-105 shadow-md shadow-sky-500/20' : 'border-sky-100 dark:border-slate-700 hover:opacity-80'
                    }`}
                  >
                    <img src={url} alt={`Avatar ${index}`} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-sky-600/60 flex items-center justify-center text-white backdrop-blur-xs">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Name Input */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Ismingiz
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/70 border border-sky-200/80 dark:border-slate-700 outline-none text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
              placeholder="Ismingizni kiriting"
            />
          </div>

          {/* User Info Stats preview */}
          <div className="glass-card p-4 rounded-2xl border border-sky-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">Daraja:</span>
              <span className="font-bold text-sky-700 dark:text-sky-400">{user.rank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">Jami XP:</span>
              <span className="font-bold text-sky-700 dark:text-sky-400">{user.xp} XP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">Reyting o'rni:</span>
              <span className="font-bold text-sky-700 dark:text-sky-400">#{user.rating}</span>
            </div>
          </div>
        </div>

        {/* Save Footer */}
        <div className="p-4 bg-sky-50/80 dark:bg-slate-800/80 border-t border-sky-100 dark:border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md shadow-sky-600/25 border border-white/30"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};
