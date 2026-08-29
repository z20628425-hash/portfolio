import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { availableAvatars } from '../../data/mockData';
import { Sparkles, ArrowRight, ShieldCheck, GraduationCap, Award, Flame, Lock, Mail, User, KeyRound, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (userData: { name: string; email?: string; avatarUrl: string; role?: 'student' | 'admin' }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [selectedAvatar, setSelectedAvatar] = useState(availableAvatars[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && isRegister) {
      setError("Iltimos, ismingizni kiriting!");
      return;
    }
    if (!email.trim()) {
      setError("Iltimos, email manzilingizni kiriting!");
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError("Parol kamida 4 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });
      const data = await res.json();
      setLoading(false);

      const displayName = name.trim() || (data.user?.name) || email.split('@')[0];
      const assignedRole = (role === 'admin' || data.user?.role === 'admin') ? 'admin' : 'student';

      onLogin({
        name: displayName,
        email: email.trim(),
        avatarUrl: selectedAvatar,
        role: assignedRole,
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      // Fallback local login
      const displayName = name.trim() || email.split('@')[0];
      onLogin({
        name: displayName,
        email: email.trim(),
        avatarUrl: selectedAvatar,
        role: role,
      });
    }
  };

  const handleDemoLogin = (demoRole: 'student' | 'admin') => {
    if (demoRole === 'admin') {
      onLogin({
        name: 'Admin - Prezent Hub',
        email: 'admin@prephub.uz',
        avatarUrl: availableAvatars[1],
        role: 'admin',
      });
    } else {
      onLogin({
        name: 'Islom',
        email: 'islom@prephub.uz',
        avatarUrl: availableAvatars[0],
        role: 'student',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f6fc] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden transition-colors duration-200">
      {/* Mesh Background Blobs */}
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-sky-200/60 dark:bg-sky-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-200/50 dark:bg-blue-950/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in space-y-6">
        {/* Brand Logo & Header */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-sky-500 via-sky-600 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-sky-600/25 border border-white/40 transform hover:rotate-3 transition-transform">
            <GraduationCap className="w-10 h-10 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Prezent Prep Hub
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              {isRegister ? "Platformada yangi hisob yaratish" : "Tizimga kirish va bilim olishni davom ettirish"}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-200/80 dark:bg-slate-800 p-1 rounded-2xl border border-transparent dark:border-slate-700">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              !isRegister ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tizimga Kirish
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              isRegister ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ro'yxatdan O'tish
          </button>
        </div>

        {/* Login Form Card */}
        <div className="glass-modal p-6 md:p-8 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-xl shadow-sky-900/5 bg-white/85 dark:bg-slate-900/90 backdrop-blur-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Ismingiz
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Masalan: Islombek"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-sky-50/80 dark:bg-slate-800 border border-sky-200/80 dark:border-slate-700 outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-semibold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Email Manzil
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="masalan: student@prephub.uz"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-sky-50/80 dark:bg-slate-800 border border-sky-200/80 dark:border-slate-700 outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Parol
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-sky-50/80 dark:bg-slate-800 border border-sky-200/80 dark:border-slate-700 outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Hisob Turi (Rol)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'student' | 'admin')}
                className="w-full p-3 rounded-2xl bg-sky-50/80 dark:bg-slate-800 border border-sky-200/80 dark:border-slate-700 outline-none text-xs text-slate-800 dark:text-slate-100 font-bold"
              >
                <option value="student">🎓 Talaba / O'quvchi (Student)</option>
                <option value="admin">🛡️ Platforma Admini (Admin)</option>
              </select>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Profil avatarini tanlang
              </label>
              <div className="flex justify-between gap-2">
                {availableAvatars.map((url, idx) => {
                  const isSelected = selectedAvatar === url;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(url)}
                      className={`relative w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all ${
                        isSelected
                          ? 'border-sky-500 scale-105 shadow-md ring-2 ring-sky-400/30'
                          : 'border-sky-100 dark:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>

            {error && <p className="text-xs font-bold text-rose-500 text-center">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold rounded-2xl shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all border border-white/30 text-sm"
            >
              <span>{isRegister ? "Ro'yxatdan O'tish" : "Kirish"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Buttons */}
          <div className="pt-3 text-center border-t border-sky-100/80 dark:border-slate-800 space-y-2">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Tezkor Demo Kirish:</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="flex-1 py-2 px-3 rounded-xl bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-300 text-xs font-bold border border-sky-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Talaba Rejimi</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Rejimi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
