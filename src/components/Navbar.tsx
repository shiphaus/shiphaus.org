'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { chapters } from '@/lib/data';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signIn, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Rocket className="w-7 h-7 text-[var(--accent)]" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">Shiphaus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/chapter/${chapter.id}`}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium"
                >
                  {chapter.city}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Link href="/submit" className="btn-primary text-sm py-2 px-4">
                        Submit Project
                      </Link>
                      <div className="flex items-center gap-2">
                        <img
                          src={user.user_metadata?.avatar_url || ''}
                          alt={user.user_metadata?.full_name || 'User'}
                          className="w-8 h-8 rounded-full border border-[var(--border-subtle)]"
                        />
                        <button
                          onClick={signOut}
                          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                          title="Sign out"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={signIn}
                      className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Sign in
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)]"
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
              <hr className="border-[var(--border-subtle)]" />
              {!loading && (
                <>
                  {user ? (
                    <div className="space-y-3">
                      <Link
                        href="/submit"
                        onClick={() => setIsOpen(false)}
                        className="block btn-primary text-center text-sm"
                      >
                        Submit Project
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="w-full text-left py-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        signIn();
                        setIsOpen(false);
                      }}
                      className="w-full btn-secondary text-sm flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Sign in
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
