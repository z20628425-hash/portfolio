import React, { useState } from 'react';
import { Search, X, BookOpen, FileCheck, ChevronRight } from 'lucide-react';
import { Course, TestItem } from '../../types';

interface SearchModalProps {
  courses: Course[];
  tests: TestItem[];
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
  onStartTest: (test: TestItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  courses,
  tests,
  onClose,
  onSelectCourse,
  onStartTest,
}) => {
  const [query, setQuery] = useState('');

  const filteredCourses = query.trim()
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : courses;

  const filteredTests = query.trim()
    ? tests.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.subject.toLowerCase().includes(query.toLowerCase())
      )
    : tests;

  return (
    <div
      id="search-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/40 backdrop-blur-md"
    >
      <div id="search-modal-container" className="glass-modal rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-sky-900/10 flex flex-col max-h-[80vh] border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-sky-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-sky-600 dark:text-sky-400 flex-shrink-0" aria-hidden="true" />
          <h2 id="search-modal-title" className="sr-only">Qidiruv</h2>
          <input
            id="search-main-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurslar, testlar yoki mavzularni qidiring..."
            aria-label="Kurslar va testlarni qidirish"
            autoFocus
            className="w-full text-base outline-none bg-transparent text-slate-800 dark:text-white placeholder:text-slate-400"
          />
          {query && (
            <button
              id="clear-search-query-btn"
              onClick={() => setQuery('')}
              aria-label="Qidiruv matnini tozalash"
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <button
            id="close-search-modal-btn"
            onClick={onClose}
            aria-label="Qidiruv oynasini yopish"
            className="text-xs font-bold text-sky-700 dark:text-sky-400 px-2.5 py-1.5 rounded-lg hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
          >
            Yopish
          </button>
        </div>

        {/* Search Results */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Kurslar ({filteredCourses.length})
              </h3>
              <div role="list" aria-label="Topilgan kurslar ro'yxati" className="space-y-1">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Kurs: ${c.title}. ${c.subtitle || ''}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelectCourse(c);
                        onClose();
                      }
                    }}
                    onClick={() => {
                      onSelectCourse(c);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl hover:bg-sky-50/70 dark:hover:bg-slate-800/70 cursor-pointer flex items-center justify-between border border-transparent hover:border-sky-100 dark:hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-sky-200/70 dark:border-slate-700" aria-hidden="true">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">{c.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{c.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tests */}
          {filteredTests.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Testlar ({filteredTests.length})
              </h3>
              <div role="list" aria-label="Topilgan testlar ro'yxati" className="space-y-1">
                {filteredTests.map((t) => (
                  <div
                    key={t.id}
                    role="button"
                    tabIndex={t.isLocked ? -1 : 0}
                    aria-disabled={t.isLocked}
                    aria-label={`Test: ${t.title}. Fan: ${t.subject}. ${t.isLocked ? 'Yopiq' : 'Boshlash uchun bosing'}`}
                    onKeyDown={(e) => {
                      if (!t.isLocked && (e.key === 'Enter' || e.key === ' ')) {
                        onStartTest(t);
                        onClose();
                      }
                    }}
                    onClick={() => {
                      if (!t.isLocked) {
                        onStartTest(t);
                        onClose();
                      }
                    }}
                    className={`p-3.5 rounded-2xl flex items-center justify-between border border-transparent transition-all ${
                      t.isLocked
                        ? 'opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-800/40'
                        : 'hover:bg-sky-50/70 dark:hover:bg-slate-800/70 cursor-pointer hover:border-sky-100 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-slate-700" aria-hidden="true">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.title}</h4>
                        <p className="text-xs text-slate-500">{t.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                      {t.isLocked ? 'Yopiq' : 'Boshlash'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCourses.length === 0 && filteredTests.length === 0 && (
            <div role="status" aria-live="polite" className="py-12 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto text-slate-400 mb-2" aria-hidden="true" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hech narsa topilmadi</p>
              <p className="text-xs mt-1 text-slate-400">Boshqa so'z bilan qidirib ko'ring</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
