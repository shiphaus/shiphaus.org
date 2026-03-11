import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white/40 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <img src="/shiphaus_logo_new.png" alt="" className="w-5 h-5 opacity-50" />
            <span>&copy; 2026 Shiphaus</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/reports/best-one-day-hackathons-2026" className="hover:text-white/70 transition-colors">
              2026 Hackathon Report
            </Link>
            <Link href="/start-a-chapter" className="hover:text-white/70 transition-colors">
              Start a Chapter
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
