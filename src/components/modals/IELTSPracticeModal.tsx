import React, { useState, useRef } from 'react';
import { X, Mic, Send, BookOpen, Award, CheckCircle2, AlertCircle, RefreshCw, Sparkles, FileText, BarChart3, Volume2 } from 'lucide-react';
import { IELTSSpeakingFeedback, IELTSWritingFeedback } from '../../types';

interface IELTSPracticeModalProps {
  onClose: () => void;
  onRewardXP?: (xp: number) => void;
}

export const IELTSPracticeModal: React.FC<IELTSPracticeModalProps> = ({ onClose, onRewardXP }) => {
  const [activeTab, setActiveTab] = useState<'speaking' | 'writing'>('speaking');

  // Speaking State
  const [speakingPart, setSpeakingPart] = useState<'1' | '2' | '3'>('1');
  const [promptIndex, setPromptIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speakingLoading, setSpeakingLoading] = useState(false);
  const [speakingResult, setSpeakingResult] = useState<IELTSSpeakingFeedback | null>(null);

  // Writing State
  const [writingTask, setWritingTask] = useState<'task1' | 'task2'>('task2');
  const [essayContent, setEssayContent] = useState('');
  const [writingLoading, setWritingLoading] = useState(false);
  const [writingResult, setWritingResult] = useState<IELTSWritingFeedback | null>(null);

  const speakingPrompts = {
    '1': [
      "Let's talk about your hometown. What do you like most about living there?",
      "Do you work or are you a student? What are you studying?",
      "How often do you use digital technology in your daily studies?",
    ],
    '2': [
      "Describe a book or article that had a major influence on your career or goals. You should say: what it was, when you read it, and why it influenced you.",
      "Describe a challenging goal you set for yourself and achieved recently. Mention what it was and how you felt.",
    ],
    '3': [
      "How has modern technology changed the way young people learn in schools and universities?",
      "Do you think artificial intelligence will replace human teachers in the future? Why or why not?",
    ]
  };

  const writingPrompts = {
    'task1': "The chart below shows the percentage of households with internet access in three countries between 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (At least 150 words)",
    'task2': "Some people believe that artificial intelligence will significantly improve education quality, while others argue that it will cause students to lose critical thinking skills. Discuss both views and give your own opinion. (At least 250 words)"
  };

  // Mock speech recording with Web Speech API or manual input
  const handleStartRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const rec = new SpeechRecognition();
        rec.lang = 'en-US';
        rec.interimResults = true;
        rec.onstart = () => setIsRecording(true);
        rec.onresult = (e: any) => {
          let text = '';
          for (let i = e.resultIndex; i < e.results.length; i++) {
            text += e.results[i][0].transcript;
          }
          setTranscript(text);
        };
        rec.onerror = () => setIsRecording(false);
        rec.onend = () => setIsRecording(false);
        rec.start();
      } catch (e) {
        setIsRecording(false);
      }
    } else {
      alert("Browser speech recognition does not support direct mic capture here. Please type or paste your response.");
    }
  };

  // Evaluate Speaking via API
  const handleEvaluateSpeaking = async () => {
    if (!transcript.trim()) return;
    setSpeakingLoading(true);
    setSpeakingResult(null);

    try {
      const res = await fetch('/api/ielts/speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          partNumber: speakingPart,
          promptQuestion: speakingPrompts[speakingPart][promptIndex],
        })
      });
      const data = await res.json();
      if (data.feedback) {
        setSpeakingResult(data.feedback);
        if (onRewardXP) onRewardXP(150);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSpeakingLoading(false);
    }
  };

  // Evaluate Writing via API
  const handleEvaluateWriting = async () => {
    if (!essayContent.trim()) return;
    setWritingLoading(true);
    setWritingResult(null);

    try {
      const res = await fetch('/api/ielts/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essay: essayContent,
          taskType: writingTask === 'task1' ? 'Task 1 Report' : 'Task 2 Essay',
          promptTopic: writingPrompts[writingTask],
        })
      });
      const data = await res.json();
      if (data.feedback) {
        setWritingResult(data.feedback);
        if (onRewardXP) onRewardXP(200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWritingLoading(false);
    }
  };

  return (
    <div
      id="ielts-practice-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ielts-practice-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5 bg-slate-900/60 backdrop-blur-md animate-fade-in"
    >
      <div id="ielts-practice-modal-container" className="glass-modal rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-sky-100 bg-white dark:bg-slate-900 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20" aria-hidden="true">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 id="ielts-practice-modal-title" className="text-lg md:text-xl font-extrabold flex items-center gap-2">
                IELTS AI Practicum <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" aria-hidden="true" />
              </h2>
              <p className="text-xs text-sky-100 font-medium">Real Examiner AI Grading (Speaking & Writing)</p>
            </div>
          </div>
          <button
            id="close-ielts-practice-btn"
            onClick={onClose}
            aria-label="IELTS AI Practicum oynasini yopish"
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div role="tablist" aria-label="IELTS modullari" className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 px-4 pt-2 shrink-0">
          <button
            id="ielts-tab-speaking"
            role="tab"
            aria-selected={activeTab === 'speaking'}
            onClick={() => setActiveTab('speaking')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'speaking'
                ? 'border-sky-600 text-sky-700 dark:text-sky-400 bg-white dark:bg-slate-800 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Mic className="w-4 h-4" aria-hidden="true" /> IELTS Speaking Moduli
          </button>
          <button
            id="ielts-tab-writing"
            role="tab"
            aria-selected={activeTab === 'writing'}
            onClick={() => setActiveTab('writing')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'writing'
                ? 'border-sky-600 text-sky-700 dark:text-sky-400 bg-white dark:bg-slate-800 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" aria-hidden="true" /> IELTS Writing Moduli
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-5 flex-1">
          {/* SPEAKING TAB */}
          {activeTab === 'speaking' && (
            <div className="space-y-4">
              {/* Part selector */}
              <div role="group" aria-label="Speaking bo'limlari" className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                {(['1', '2', '3'] as const).map((p) => (
                  <button
                    key={p}
                    id={`speaking-part-${p}-btn`}
                    aria-pressed={speakingPart === p}
                    onClick={() => {
                      setSpeakingPart(p);
                      setPromptIndex(0);
                      setSpeakingResult(null);
                    }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      speakingPart === p ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Part {p}
                  </button>
                ))}
              </div>

              {/* Prompt card */}
              <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900 text-slate-800 dark:text-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-wider">Examiner Prompt</span>
                  <button
                    id="next-speaking-prompt-btn"
                    onClick={() => setPromptIndex((prev) => (prev + 1) % speakingPrompts[speakingPart].length)}
                    aria-label="Keyingi savolga o'tish"
                    className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" aria-hidden="true" /> Keyingi savol
                  </button>
                </div>
                <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-900 dark:text-white">
                  "{speakingPrompts[speakingPart][promptIndex]}"
                </p>
              </div>

              {/* Speech input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="speaking-transcript-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">Javobingizni ayting yoki yozing:</label>
                  <button
                    id="record-mic-btn"
                    type="button"
                    onClick={handleStartRecording}
                    aria-label={isRecording ? 'Ovoz yozilmoqda' : 'Mikrofon bilan aytish'}
                    className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                      isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" aria-hidden="true" /> {isRecording ? 'Yozib olinmoqda...' : 'Mikrofon bilan aytish'}
                  </button>
                </div>
                <textarea
                  id="speaking-transcript-input"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="IELTS Speaking javobingizni bu yerda yozing yoki mikrofon orqali yozib oling..."
                  rows={4}
                  className="w-full p-3.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-sky-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <button
                id="evaluate-speaking-btn"
                onClick={handleEvaluateSpeaking}
                disabled={speakingLoading || !transcript.trim()}
                aria-label="Javobni baholatish va Band Score olish"
                className="w-full py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-2xl hover:opacity-95 transition-all shadow-md shadow-sky-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {speakingLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" /> AI Examiner Baholamoqda...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" aria-hidden="true" /> Javobni Baholatish va Band Score Olish
                  </>
                )}
              </button>

              {/* Speaking Result View */}
              {speakingResult && (
                <div role="region" aria-live="polite" aria-label="Speaking baholash natijasi" className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-sky-50/80 dark:from-amber-950/30 dark:to-sky-950/30 border border-amber-200 dark:border-amber-900/50 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-amber-800 dark:text-amber-300 tracking-wider">Examiner Report</span>
                    <span className="text-lg font-black text-amber-600 bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-xl border border-amber-300 dark:border-amber-800">
                      IELTS Band: {speakingResult.bandScore}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Fluency</p>
                      <p className="text-sm font-extrabold text-sky-700 dark:text-sky-400">{speakingResult.fluencyScore}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Vocabulary</p>
                      <p className="text-sm font-extrabold text-blue-700 dark:text-blue-400">{speakingResult.lexicalScore}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Grammar</p>
                      <p className="text-sm font-extrabold text-indigo-700 dark:text-indigo-400">{speakingResult.grammarScore}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Examiner Izohi:</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      {speakingResult.feedback}
                    </p>
                  </div>

                  {speakingResult.corrections?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Tuzatishlar va Maslahatlar:</p>
                      <ul className="space-y-1">
                        {speakingResult.corrections.map((c, i) => (
                          <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* WRITING TAB */}
          {activeTab === 'writing' && (
            <div className="space-y-4">
              <div role="group" aria-label="Writing vazifa turi" className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                <button
                  id="writing-task1-btn"
                  aria-pressed={writingTask === 'task1'}
                  onClick={() => {
                    setWritingTask('task1');
                    setWritingResult(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    writingTask === 'task1' ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Writing Task 1 (Report)
                </button>
                <button
                  id="writing-task2-btn"
                  aria-pressed={writingTask === 'task2'}
                  onClick={() => {
                    setWritingTask('task2');
                    setWritingResult(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    writingTask === 'task2' ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Writing Task 2 (Essay)
                </button>
              </div>

              {/* Topic Prompt */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-slate-800 dark:text-slate-200 space-y-1">
                <span className="text-xs font-extrabold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">IELTS Essay Prompt</span>
                <p className="text-xs md:text-sm font-medium leading-relaxed text-slate-900 dark:text-white">
                  {writingPrompts[writingTask]}
                </p>
              </div>

              {/* Essay Text Area */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <label htmlFor="writing-essay-input">Essengizni yozing:</label>
                  <span>So'zlar soni: {essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0}</span>
                </div>
                <textarea
                  id="writing-essay-input"
                  value={essayContent}
                  onChange={(e) => setEssayContent(e.target.value)}
                  placeholder="In recent years, artificial intelligence has become a major topic of debate..."
                  rows={7}
                  className="w-full p-3.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-sky-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <button
                id="evaluate-writing-btn"
                onClick={handleEvaluateWriting}
                disabled={writingLoading || !essayContent.trim()}
                aria-label="Esseni tekshirish va Band Score olish"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:opacity-95 transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {writingLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" /> AI Examiner Esse Tekshirmoqda...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" aria-hidden="true" /> Esseni Tekshirish va Band Score Olish
                  </>
                )}
              </button>

              {/* Writing Result */}
              {writingResult && (
                <div role="region" aria-live="polite" aria-label="Writing baholash hisoboti" className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-indigo-800 dark:text-indigo-300 tracking-wider">IELTS Writing Report</span>
                    <span className="text-lg font-black text-indigo-600 bg-indigo-100 dark:bg-indigo-950 px-3 py-1 rounded-xl border border-indigo-300 dark:border-indigo-800">
                      Overall Band: {writingResult.overallBand}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-bold">
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700">
                      <p className="text-[10px] text-slate-500">Task Achievement</p>
                      <p className="text-sky-700 dark:text-sky-400 font-extrabold">{writingResult.taskAchievement}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700">
                      <p className="text-[10px] text-slate-500">Coherence & Cohesion</p>
                      <p className="text-blue-700 dark:text-blue-400 font-extrabold">{writingResult.coherenceCohesion}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700">
                      <p className="text-[10px] text-slate-500">Lexical Resource</p>
                      <p className="text-indigo-700 dark:text-indigo-400 font-extrabold">{writingResult.lexicalResource}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700">
                      <p className="text-[10px] text-slate-500">Grammatical Accuracy</p>
                      <p className="text-purple-700 dark:text-purple-400 font-extrabold">{writingResult.grammarAccuracy}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Tahlil va Xulosa:</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      {writingResult.detailedAnalysis}
                    </p>
                  </div>

                  {writingResult.suggestions?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Tavsiyalar:</p>
                      <ul className="space-y-1">
                        {writingResult.suggestions.map((s, i) => (
                          <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
