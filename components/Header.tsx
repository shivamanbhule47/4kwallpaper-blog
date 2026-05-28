'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto max-w-grid px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="4KWALLPAPER"
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
            <span className="text-lg font-semibold tracking-tight text-white hidden sm:block">
              4KWALLPAPER
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-textSecondary hover:text-white transition-colors duration-200">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-textSecondary hover:text-white transition-colors duration-200">
              About
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-surfaceHighlight transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-textSecondary" />
            </button>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-surfaceHighlight transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="px-6 py-4 space-y-4">
              <Link href="/" className="block text-sm font-medium text-textSecondary hover:text-white" onClick={() => setMobileOpen(false)}>Blog</Link>
              <Link href="/about" className="block text-sm font-medium text-textSecondary hover:text-white" onClick={() => setMobileOpen(false)}>About</Link>
              <button onClick={() => { setSearchOpen(true); setMobileOpen(false); }} className="flex items-center gap-2 text-sm font-medium text-textSecondary hover:text-white">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
