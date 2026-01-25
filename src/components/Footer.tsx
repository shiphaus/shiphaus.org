import Link from 'next/link';
import { Rocket, Github } from 'lucide-react';
import { chapters } from '@/lib/data';

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Rocket className="w-6 h-6 text-[var(--accent)]" />
              <span className="text-lg font-bold">Shiphaus</span>
            </Link>
            <p className="text-[var(--text-secondary)] font-body text-sm max-w-md mb-4">
              A global community of builders who come together to ship products in a single day.
              No talk, just build.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/shiphaus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/shiphaus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Chapters */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Chapters</h4>
            <ul className="space-y-2">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    href={`/chapter/${chapter.id}`}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
                  >
                    {chapter.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/submit"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
                >
                  Submit Project
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@shiphaus.org"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
                >
                  Start a Chapter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
          <p className="text-[var(--text-muted)] text-sm text-center">
            2026 Shiphaus
          </p>
        </div>
      </div>
    </footer>
  );
}
