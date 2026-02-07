'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { ShiphausLogo } from '@/components/ShiphausLogo';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { chapters } from '@/lib/data';
import { NavCityLink } from './NavCityLink';
import { TaxiDoodle, WindDoodle, FlatironsDoodle, NetworkDoodle } from './doodles';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const user = session?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <ShiphausLogo size={56} />
            <span className="text-xl font-bold tracking-tight">Shiphaus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {chapters.map((chapter) => (
                <NavCityLink
                  key={chapter.id}
                  href={`/chapter/${chapter.id}`}
                  chapterId={chapter.id}
                  chapterColor={chapter.color}
                >
                  {chapter.city}
                </NavCityLink>
              ))}
            </div>

            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] animate-pulse" />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center cursor-pointer"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full border border-[var(--border-subtle)]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-semibold">
                      {(user.name || user.email || '?')[0].toUpperCase()}
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-lg overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-[var(--accent)] font-semibold text-sm hover:text-[var(--accent-hover)] transition-colors"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)] cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]"
          >
            <div className="px-4 py-4 space-y-3">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/chapter/${chapter.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
                >
                  {chapter.city}
                </Link>
              ))}

              {status === 'loading' ? null : user ? (
                <>
                  <div className="flex items-center gap-3 py-2 border-t border-[var(--border-subtle)]">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || 'User'}
                        width={28}
                        height={28}
                        className="rounded-full border border-[var(--border-subtle)]"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-semibold">
                        {(user.name || user.email || '?')[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-[var(--text-primary)] font-medium truncate">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-2 py-2 text-[var(--text-secondary)] text-sm cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-[var(--accent)] font-semibold"
                >
                  Log in
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preload doodles - only on hover-capable devices where they're used */}
      <div
        aria-hidden="true"
        className="doodle-preload"
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          width: 0,
          height: 0,
        }}
      >
        <TaxiDoodle />
        <WindDoodle />
        <FlatironsDoodle />
        <NetworkDoodle />
      </div>
    </nav>
  );
}
