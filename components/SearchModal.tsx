'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/types/post';
import { formatDate } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<<Post[]>([]);
  const [posts, setPosts] = useState<<Post[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/posts')
        .then((r) => r.json())
        .then((data) => setPosts(data.posts || []))
        .catch(() => setPosts([]));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const filtered = posts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query, posts]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <Search className="w-5 h-5 text-textMuted" />
          <input
            autoFocus
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-textMuted outline-none text-base"
          />
          <button onClick={onClose} className="p-1 hover:bg-surfaceHighlight rounded">
            <X className="w-4 h-4 text-textMuted" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 && query.trim() !== '' && (
            <div className="px-4 py-8 text-center text-textMuted text-sm">No results found for &quot;{query}&quot;</div>
          )}
          {results.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} onClick={onClose}
              className="flex items-center justify-between px-4 py-3 hover:bg-surfaceHighlight transition-colors group">
              <div>
                <h4 className="text-sm font-medium text-white group-hover:text-accent transition-colors">{post.title}</h4>
                <p className="text-xs text-textMuted mt-0.5">{formatDate(post.date)} · {post.readingTime} min read</p>
              </div>
              <ArrowRight className="w-4 h-4 text-textMuted opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="px-4 py-2 border-t border-border bg-surfaceHighlight/50">
          <p className="text-xs text-textMuted">Press <kbd className="px-1.5 py-0.5 rounded bg-border text-textSecondary text-[10px]">ESC</kbd> to close</p>
        </div>
      </div>
    </div>
  );
}
