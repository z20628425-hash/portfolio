import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Trash2, Edit, Users, BookOpen, FileCheck2, BarChart3, Search, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';
import { Course, TestItem, UserProfile } from '../../types';

interface AdminScreenProps {
  user?: UserProfile;
  courses: Course[];
  tests: TestItem[];
  onAddCourse?: (newCourse: Course) => void;
  onDeleteCourse?: (courseId: string) => void;
  onAddTest?: (newTest: TestItem) => void;
  onDeleteTest?: (testId: string) => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  user,
  courses,
  tests,
  onAddCourse,
  onDeleteCourse,
  onAddTest,
  onDeleteTest,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'courses' | 'tests' | 'users'>('stats');
  
  // Real stats & users state
  const [analytics, setAnalytics] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetch('/api/admin/analytics').then(res => res.json()).then(data => setAnalytics(data)).catch(console.error);
      fetch('/api/admin/users').then(res => res.json()).then(data => { if(data.users) setUsersList(data.users); }).catch(console.error);
    }
  }, [user]);


  // New course modal state
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Core');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // New test modal state
  const [isAddTestOpen, setIsAddTestOpen] = useState(false);
  const [testTitle, setTestTitle] = useState('');
  const [testSubject, setTestSubject] = useState('English Core');
  const [testDuration, setTestDuration] = useState(15);

  // Role Access Guard
  if (user && user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-white border border-rose-200 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Admin Ruxsati Talab Etiladi</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Admin paneli faqat maxsus huquqqa ega foydalanuvchilar (Admin / O'qituvchi) uchun ochiq.
        </p>
        <div className="pt-2">
          <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 inline-block">
            Joriy rol: {user.role || 'student'}
          </span>
        </div>
      </div>
    );
  }

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Course = {
      id: `course-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      subtitle: newSubtitle || 'Yangi darslik moduli',
      description: newDesc || 'Kurs ta\'rifi va nazariyasi...',
      progress: 0,
      topicsCount: 1,
      icon: 'book_2',
      colorScheme: 'primary',
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: '1-Kirish Darsi',
          duration: '15 daqiqa',
          completed: false,
          content: 'Yangi modul nazariyasi va tushunchalari...',
        }
      ]
    };

    if (onAddCourse) onAddCourse(created);
    setIsAddCourseOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewDesc('');
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) return;

    const created: TestItem = {
      id: `test-${Date.now()}`,
      title: testTitle,
      subject: testSubject,
      questionsCount: 3,
      durationMinutes: testDuration,
      isLocked: false,
      icon: 'file_check',
      questions: [
        {
          id: 1,
          question: 'IELTS / Core grammatika namunaviy savoli:',
          options: ['Variant A', 'Variant B (To\'g\'ri)', 'Variant C', 'Variant D'],
          correctAnswer: 1,
          explanation: 'B varianti qoidaga to\'liq mos keladi.'
        },
        {
          id: 2,
          question: 'Matematika va mantiqiy munosabatlar namunasi:',
          options: ['42', '56 (To\'g\'ri)', '64', '72'],
          correctAnswer: 1,
          explanation: 'Mantiqiy qonuniyat bo\'yicha 56 hosil bo\'ladi.'
        }
      ]
    };

    if (onAddTest) onAddTest(created);
    setIsAddTestOpen(false);
    setTestTitle('');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 pb-28 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 backdrop-blur-md">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black">Prezent Admin Panel</h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                ACTIVE ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">Platformadagi barcha kurslar, testlar, foydalanuvchilar va analitika boshqaruvi</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAddCourseOpen(true)}
            className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Yangi Kurs
          </button>
          <button
            onClick={() => setIsAddTestOpen(true)}
            className="px-3.5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-2xl transition-all shadow-lg shadow-sky-600/30 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Yangi Test
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 bg-slate-200/70 dark:bg-slate-800 p-1.5 rounded-2xl border border-transparent dark:border-slate-700">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'stats' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Tizim Analitikasi
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'courses' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Kurslar ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'tests' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" /> Testlar ({tests.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'users' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> O'quvchilar
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Jami O'quvchilar</span>
            <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{analytics?.totalRegistered || '...'} ta</p>
            <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">▲ +12% oylik o'sish</p>
          </div>
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Ishlangan Testlar</span>
            <p className="text-2xl md:text-3xl font-black text-sky-700 dark:text-sky-400">{analytics?.testsCompletedToday || '...'} ta bugun</p>
            <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400">O'rtacha ball: {analytics?.averageScorePercent || '...'}%</p>
          </div>
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">AI Tutor So'rovlari</span>
            <p className="text-2xl md:text-3xl font-black text-indigo-700 dark:text-indigo-400">{analytics?.aiQueriesToday || '...'} ta</p>
            <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">Gemini 3.7 Flash Active</p>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-100 dark:border-sky-800">
                  {course.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{course.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{course.description}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-2">Mavzular: {course.modules.length} ta modul</p>
              </div>

              {onDeleteCourse && (
                <button
                  onClick={() => onDeleteCourse(course.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors shrink-0"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.map((test) => (
            <div key={test.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-800">
                  {test.subject}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{test.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">{test.questionsCount} ta savol • {test.durationMinutes} daqiqa</p>
              </div>

              {onDeleteTest && (
                <button
                  onClick={() => onDeleteTest(test.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors shrink-0"
                  title="Testni o'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Faol O'quvchilar Boshqaruvi</h3>
          <div className="space-y-2">
            {usersList.length > 0 ? usersList.map((u, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold">
                <div>
                  <p className="text-slate-900 dark:text-white font-extrabold">{u.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{u.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' : 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300'}`}>
                    {u.role}
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-black">{u.xp} XP</span>
                </div>
              </div>
            )) : (
              <div className="p-3 text-center text-xs text-slate-500 dark:text-slate-400">O'quvchilar yuklanmoqda...</div>
            )}
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <form onSubmit={handleCreateCourse} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Yangi Kurs Yaratish</h3>
            
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Kurs Nomi</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="masalan: Academic IELTS Reading Master"
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Kategoriya</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="Core">Core</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Intellekt">Intellekt</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Qisqa Subtitle</label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="12 ta yangi modul"
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Ta'rif</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Kurs haqida qisqacha..."
                  rows={3}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddCourseOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl"
              >
                Saqlash
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Test Modal */}
      {isAddTestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <form onSubmit={handleCreateTest} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Yangi Test Yaratish</h3>
            
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Test Nomi</label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder="masalan: IELTS Listening Mock #3"
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Fan</label>
                <select
                  value={testSubject}
                  onChange={(e) => setTestSubject(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                >
                  <option value="English Core">English Core</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Mantiq va Tanqidiy Fikr">Mantiq va Tanqidiy Fikr</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Vaqt Chegarasi (Daqiqa)</label>
                <input
                  type="number"
                  value={testDuration}
                  onChange={(e) => setTestDuration(Number(e.target.value))}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddTestOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl"
              >
                Testni Qo'shish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
