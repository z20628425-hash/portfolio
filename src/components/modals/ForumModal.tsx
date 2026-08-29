import React, { useState, useEffect } from 'react';
import { X, MessageSquare, ThumbsUp, Send, Plus, Search, UserCheck, Sparkles, Filter } from 'lucide-react';
import { ForumPost, UserProfile } from '../../types';

interface ForumModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const ForumModal: React.FC<ForumModalProps> = ({ isOpen, onClose, user }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<ForumPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState('IELTS Prep');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/forum/posts')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) setPosts(data.posts);
      })
      .catch((err) => console.log('Forum fetch error:', err));
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

  const handleUpvote = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/forum/posts/${postId}/upvote`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) => (p.id === postId ? { ...p, upvotes: data.upvotes, userUpvoted: true } : p))
        );
        if (activePost && activePost.id === postId) {
          setActivePost((prev) => (prev ? { ...prev, upvotes: data.upvotes, userUpvoted: true } : null));
        }
      }
    } catch (err) {
      console.log('Upvote error:', err);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          subject: newSubject,
          authorName: user.name || 'Talaba',
          authorRole: user.role || 'student',
        }),
      });
      const data = await res.json();
      if (data.post) {
        setPosts([data.post, ...posts]);
        setNewTitle('');
        setNewContent('');
        setIsCreatingPost(false);
      }
    } catch (err) {
      console.log('Create post error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !commentText.trim()) return;

    try {
      const res = await fetch(`/api/forum/posts/${activePost.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentText,
          authorName: user.name || 'Talaba',
          authorRole: user.role || 'student',
        }),
      });
      const data = await res.json();
      if (data.comment) {
        const updatedPost = {
          ...activePost,
          comments: [...activePost.comments, data.comment],
        };
        setActivePost(updatedPost);
        setPosts((prev) => prev.map((p) => (p.id === activePost.id ? updatedPost : p)));
        setCommentText('');
      }
    } catch (err) {
      console.log('Add comment error:', err);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSubject = selectedSubject === 'All' || p.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div id="forum-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div id="forum-modal-container" className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Talabalar va O'qituvchilar Forumi
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Savollaringizni bering, fikr almashing va bilim ulashing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isCreatingPost && !activePost && (
              <button
                id="create-forum-post-btn"
                onClick={() => setIsCreatingPost(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Savol berish</span>
              </button>
            )}
            <button
              id="close-forum-modal-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Subject Filter Bar */}
        {!isCreatingPost && !activePost && (
          <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Savol yoki mavzu bo'yicha qidirish..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'IELTS', 'Matematika', 'Mantiq', 'Grammar'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    selectedSubject === sub
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {sub === 'All' ? 'Barchasi' : sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* View: Creating Post */}
          {isCreatingPost ? (
            <form onSubmit={handleCreatePost} className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Yangi Muhokama Mavzusi Ochish
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Bekor qilish
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mavzu / Fan
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="IELTS Prep">IELTS Prep (Speaking, Writing, Reading, Listening)</option>
                  <option value="English Core">English Core Grammar & Vocabulary</option>
                  <option value="Matematika">Matematika va Algebra</option>
                  <option value="Mantiq">Mantiqiy Fikrlash va Intellekt</option>
                  <option value="Universitetlar">Xalqaro Universitetlar (Westminster, WIUT, MDIST)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Savol Sarlavhasi
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Masalan: IELTS Writing Task 2 da counter-argument qanday yoziladi?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Batafsil Mazmuni
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={5}
                  placeholder="Savolingizni aniq va to'liq yozing..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  Ortga
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md disabled:opacity-50"
                >
                  {isLoading ? 'Joylanmoqda...' : 'Chop etish'}
                </button>
              </div>
            </form>
          ) : activePost ? (
            /* View: Active Post Details & Comments */
            <div className="space-y-6 max-w-3xl mx-auto">
              <button
                onClick={() => setActivePost(null)}
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                ← Barcha savollarga qaytish
              </button>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activePost.authorAvatar}
                      alt={activePost.authorName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-teal-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {activePost.authorName}
                        </span>
                        {activePost.authorRole === 'teacher' && (
                          <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] font-bold">
                            Ustoz
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{activePost.timestamp}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[11px] font-semibold">
                    {activePost.subject}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activePost.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {activePost.content}
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-4">
                  <button
                    onClick={(e) => handleUpvote(activePost.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-teal-600 transition"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{activePost.upvotes}</span>
                  </button>
                  <span className="text-xs text-slate-400">
                    {activePost.comments.length} ta javob
                  </span>
                </div>
              </div>

              {/* Threaded Comments */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Fikrlar va Javoblar ({activePost.comments.length})
                </h4>

                {activePost.comments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-3 text-center">
                    Hozircha javoblar yo'q. Birinchi bo'lib fikr bildiring!
                  </p>
                ) : (
                  activePost.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={comment.authorAvatar}
                            alt={comment.authorName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {comment.authorName}
                          </span>
                          {comment.authorRole === 'teacher' && (
                            <span className="px-1.5 py-0.2 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[9px] font-bold">
                              Ustoz
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 pl-9 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="O'z javobingiz yoki tavsiyangizni yozing..."
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Yuborish</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* View: Posts List */
            <div className="space-y-3">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">Hech qanday muhokama topilmadi.</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    id={`forum-post-${post.id}`}
                    onClick={() => setActivePost(post)}
                    className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-teal-400 dark:hover:border-teal-600 cursor-pointer transition-all duration-200 hover:shadow-md space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {post.authorName}
                        </span>
                        {post.authorRole === 'teacher' && (
                          <span className="px-1.5 py-0.2 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[9px] font-bold">
                            Ustoz
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">· {post.timestamp}</span>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold">
                        {post.subject}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-xs text-slate-500">
                      <button
                        onClick={(e) => handleUpvote(post.id, e)}
                        className="flex items-center gap-1 hover:text-teal-600 font-semibold"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.upvotes}</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.comments.length} ta javob</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
