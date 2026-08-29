import React from 'react';
import { useLanguage } from "../../contexts/LanguageContext";
import { BookOpen, Calculator, Brain, ArrowRight, Zap } from 'lucide-react';
import { Course } from '../../types';

interface CoursesScreenProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const CoursesScreen: React.FC<CoursesScreenProps> = ({ courses, onSelectCourse }) => {
  const { translate: t } = useLanguage();
  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'calculate':
        return <Calculator className="w-8 h-8 text-sky-600 dark:text-sky-400" />;
      case 'psychology':
        return <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case 'book_2':
      default:
        return <BookOpen className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />;
    }
  };

  const getIconBg = (_colorScheme: string) => {
    return 'bg-sky-50 dark:bg-slate-800 border border-sky-200/60 dark:border-slate-700';
  };

  return (
    <main
      id="courses-main-content"
      role="main"
      aria-label="Kurslar va fanlar ro'yxati"
      className="pt-20 pb-32 px-4 max-w-lg mx-auto md:max-w-2xl space-y-8"
    >
      {/* Heading */}
      <div>
        <h2 id="courses-heading" className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-1">
          Mening kurslarim
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sizning bilim olish sayohatingiz shu yerdan boshlanadi
        </p>
      </div>

      {/* Courses Grid */}
      <div className="space-y-6" role="list" aria-label="Mavjud fanlar">
        {courses.map((course) => (
          <div
            key={course.id}
            id={`course-card-${course.id}`}
            role="listitem"
            className="glass-card glass-card-hover rounded-3xl p-6 shadow-xl shadow-sky-900/5 flex flex-col justify-between group border border-sky-100 dark:border-slate-800"
          >
            <div>
              <div
                className={`w-14 h-14 rounded-2xl ${getIconBg(
                  course.colorScheme
                )} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs`}
                aria-hidden="true"
              >
                {getCourseIcon(course.icon)}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{course.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {course.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-500 dark:text-slate-400">O'zlashtirish</span>
                  <span className="text-sky-600 dark:text-sky-400 font-bold">{course.progress}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-label={`${course.title} kursi o'zlashtirish darajasi`}
                  aria-valuenow={course.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-3 w-full bg-sky-100/80 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-sky-200/50 dark:border-slate-700"
                >
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-1000 ease-out shadow-xs"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <button
                id={`enter-course-btn-${course.id}`}
                onClick={() => onSelectCourse(course)}
                aria-label={`${course.title} kursiga kirish va darslarni boshlash`}
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-sky-600/25 border border-white/30"
              >
                <span>Kirish</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bento Stats Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weekly result card */}
        <div className="glass-card rounded-3xl p-5 flex items-center gap-4 border border-sky-100 dark:border-slate-800 shadow-sm">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKJIjnHF8Ig--ztOUYE-m__FfeWno_EhW063ob1QQc1Gfqf_AnfcD_VKqRZdfqqYBXB3MUxzbem8bQF3y9QJ-PDKZ-wbkI-DsCCmk77HYv_2q9_c6fp9PTo9PNiYT4YEQ1z_5Y7E0VT1IFG741BFVdmPQ_Qu8KYP6cJRwYBsq3rhD4FCnn1f6uo4sgWdsUMyFGpS2I198X0OrUrN2xcyCBsM4CHHL4YbcOYJYbL7wbKHGEnVVdr0qKEBDRIYjpbK_740pTrqzz8WM"
            alt="Weekly study graph"
            className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 shadow-md border border-sky-100 dark:border-slate-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80';
            }}
          />
          <div>
            <h4 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-1">Haftalik natija</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Siz bu hafta 12 soat dars qildingiz. O'tgan haftaga qaraganda 20% yaxshiroq.
            </p>
          </div>
        </div>

        {/* New Task Banner */}
        <div className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-5 border border-sky-300/30 relative overflow-hidden flex items-center shadow-lg shadow-sky-500/15">
          <div className="relative z-10 pr-12">
            <h4 className="font-bold text-base text-white mb-1">Yangi topshiriq!</h4>
            <p className="text-xs text-sky-100">
              Mantiq fanidan 5-modul testlari ochiq.
            </p>
          </div>
          <Zap className="absolute -right-2 -bottom-2 w-20 h-20 text-white/20 pointer-events-none" />
        </div>
      </div>
    </main>
  );
};
