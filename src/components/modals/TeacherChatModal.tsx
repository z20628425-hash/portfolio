import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, Star, UserCheck, Sparkles, CheckCheck } from 'lucide-react';
import { TeacherProfile, UserProfile } from '../../types';
import { initialTeacherProfiles } from '../../data/mockData';

interface TeacherChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export const TeacherChatModal: React.FC<TeacherChatModalProps> = ({ isOpen, onClose, user }) => {
  const [teachers] = useState<TeacherProfile[]>(initialTeacherProfiles);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile>(initialTeacherProfiles[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/teacher/messages')
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) setMessages(data.messages);
      })
      .catch((err) => console.log('Teacher messages fetch error:', err));
  }, [isOpen]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsSending(true);

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.email || 'student@prephub.uz',
      receiverId: selectedTeacher.id,
      senderName: user.name || 'Talaba',
      text: inputText.trim(),
      timestamp: 'Hozirgina',
      isRead: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    try {
      const res = await fetch('/api/teacher/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: userMessage.text,
          senderName: user.name || 'Talaba',
          receiverId: selectedTeacher.id,
        }),
      });
      const data = await res.json();
      // Teacher automatic response simulation
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-rep-${Date.now()}`,
            senderId: selectedTeacher.id,
            receiverId: user.email || 'student@prephub.uz',
            senderName: selectedTeacher.name,
            text: `Rahmat savolingiz uchun! "${userMessage.text.slice(0, 30)}..." bo'yicha amaliy tavsiya: kunlik darslik va testlarni yechib tahlil qiling. Savollaringiz bo'lsa bemalol yozing!`,
            timestamp: 'Hozirgina',
            isRead: false,
          },
        ]);
      }, 1500);
    } catch (err) {
      console.log('Send message error:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      id="teacher-chat-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-chat-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div id="teacher-chat-modal-container" className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold" aria-hidden="true">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="teacher-chat-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                O'qituvchi bilan Jonli Bog'lanish
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sertifikatlangan IELTS va Fan ustozlaridan to'g'ridan-to'g'ri maslahat oling
              </p>
            </div>
          </div>

          <button
            id="close-teacher-chat-btn"
            onClick={onClose}
            aria-label="Ustozlar chatini yopish"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* 2-Column Split: Left = Teachers List, Right = Chat Room */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          
          {/* Teachers Sidebar */}
          <div role="list" aria-label="Ustozlar ro'yxati" className="p-4 overflow-y-auto space-y-2.5 bg-slate-50/50 dark:bg-slate-900/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Ustozlar Ro'yxati
            </h3>
            {teachers.map((teacher) => {
              const isSelected = selectedTeacher.id === teacher.id;
              return (
                <div
                  key={teacher.id}
                  id={`teacher-item-${teacher.id}`}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${teacher.name}, ${teacher.subject}. Reyting: ${teacher.rating}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedTeacher(teacher); }}
                  onClick={() => setSelectedTeacher(teacher)}
                  className={`p-3 rounded-2xl cursor-pointer border transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={teacher.avatarUrl}
                      alt={teacher.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    {teacher.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" aria-label="Onlayn" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {teacher.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">{teacher.subject}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" aria-hidden="true" />
                        <span>{teacher.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">· {teacher.studentsCount} talaba</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Chat Conversation Area */}
          <div className="md:col-span-2 flex flex-col h-[55vh] md:h-auto overflow-hidden bg-white dark:bg-slate-900" aria-label="Xabarlar oynasi">
            {/* Selected Teacher Header */}
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTeacher.avatarUrl}
                  alt={selectedTeacher.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedTeacher.name}
                  </h4>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {selectedTeacher.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Feed */}
            <div role="log" aria-live="polite" aria-label="Suhbat yozishmalari" className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/20 dark:bg-slate-900/20">
              {messages.map((msg) => {
                const isMe = msg.senderId === (user.email || 'student@prephub.uz') || msg.senderName === user.name;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-blue-500" aria-hidden="true" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2" aria-label="Xabar yuborish">
              <input
                id="teacher-chat-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                aria-label={`${selectedTeacher.name} ga savol yoki esse yuborish`}
                placeholder={`${selectedTeacher.name} ga savol yoki esse yuborish...`}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                id="send-teacher-msg-btn"
                disabled={!inputText.trim() || isSending}
                aria-label="Xabarni yuborish"
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md disabled:opacity-50 transition"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Yuborish</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
