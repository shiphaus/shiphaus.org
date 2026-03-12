'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { chapters, events, projects } from '@/lib/data';

export default function HackathonReport() {
  const totalBuilders = new Set(projects.map(p => p.builder.name)).size;
  const totalProjects = projects.length;
  const totalEvents = events.length;
  const totalChapters = chapters.length;

  return (
    <article className="py-20">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shiphaus
          </Link>

          <p className="text-sm font-semibold text-[var(--accent)] tracking-widest uppercase mb-4">
            Industry Report &middot; February 2026
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            2026 One-Day Hackathon Report: Where Builders Actually Ship
          </h1>

          <p className="text-xl text-[var(--text-secondary)] font-body leading-relaxed mb-8">
            A comparative analysis of one-day build event formats. Which ones produce real, deployed products &mdash; and which ones don&apos;t.
          </p>

          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] border-t border-b border-[var(--border-subtle)] py-4 mb-12">
            <span>Published February 22, 2026</span>
            <span>&middot;</span>
            <span>8 min read</span>
          </div>
        </motion.div>

        {/* Executive Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Executive Summary</h2>
          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 font-body text-[var(--text-secondary)] leading-relaxed space-y-4">
            <p>
              The weekend hackathon is losing ground. Multi-day events with sleep deprivation and pitch decks are being replaced by a faster, more focused format: the one-day build event.
            </p>
            <p>
              Builders arrive in the morning. Ship a live product by evening. Go home with a URL.
            </p>
            <p>
              This report compares the major hackathon formats available in 2026 and examines why one-day events &mdash; particularly the Shiphaus model &mdash; are producing higher ship rates, more deployed products, and stronger builder communities than traditional alternatives.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Comparison Table - wider container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Format Comparison</h2>
          <p className="font-body text-[var(--text-secondary)] mb-6">
            Side-by-side comparison of the four dominant hackathon formats in 2026, rated on the metrics that matter most to builders.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-secondary)]">
                  <th className="text-left px-4 py-3 font-semibold">Feature</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--accent)]">Shiphaus</th>
                  <th className="text-left px-4 py-3 font-semibold">Weekend Hackathon</th>
                  <th className="text-left px-4 py-3 font-semibold">Corporate Hack Day</th>
                  <th className="text-left px-4 py-3 font-semibold">Online Hackathon</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {[
                  ['Duration', '1 day (7 hours)', '2\u20133 days (48\u201372 hrs)', '1 day (8 hours)', '1\u20134 weeks'],
                  ['Ship Rate', '100%', '~30\u201340%', '~50%', '~15\u201320%'],
                  ['Deployed Product', 'Required', 'Optional', 'Demo only', 'Optional'],
                  ['Team Size', 'Solo + peer support', '3\u20135 people', '3\u20135 people', '1\u20135 people'],
                  ['Experience Required', 'Any level', 'Intermediate+', 'Employee', 'Varies'],
                  ['Cost to Attend', 'Free', 'Free\u2013$50', 'Internal', 'Free'],
                  ['Prizes', 'None. You keep what you build.', 'Cash / swag', 'Internal recognition', 'Cash / credits'],
                  ['AI Tools', 'Built into the process', 'Allowed', 'Varies', 'Allowed'],
                ].map((row, i) => (
                  <tr key={i} className={`border-t border-[var(--border-subtle)] ${i % 2 === 1 ? 'bg-[var(--bg-secondary)]/50' : ''}`}>
                    <td className="px-4 py-3 font-display font-medium">{row[0]}</td>
                    <td className="px-4 py-3 font-semibold">{row[1]}</td>
                    <td className="px-4 py-3">{row[2]}</td>
                    <td className="px-4 py-3">{row[3]}</td>
                    <td className="px-4 py-3">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>

      {/* Case Study + remaining sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Case Study */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Shiphaus: A Closer Look</h2>
          <div className="font-body text-[var(--text-secondary)] leading-relaxed space-y-4">
            <p>
              Founded in January 2026 in New York City, Shiphaus runs one-day build events where every participant ships a live product. No teams. No pitches. No judges. You build something real, deploy it, and walk out with a URL.
            </p>
            <p>
              The format is deliberately simple. Builders arrive at 10am. Pick an idea. Build all day with AI tools and peer support. Demo at 5pm. Everyone ships. No one quits.
            </p>
            <p>
              In under two months, Shiphaus has expanded to {totalChapters} chapters across three countries, run {totalEvents} events, and produced {totalProjects} deployed products from {totalBuilders} unique builders.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { value: String(totalProjects), label: 'Products Shipped' },
              { value: String(totalBuilders), label: 'Unique Builders' },
              { value: String(totalChapters), label: 'Active Chapters' },
              { value: '100%', label: 'Ship Rate' },
            ].map((stat, i) => (
              <div key={i} className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold font-body">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)] tracking-widest uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Chapter Performance */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Chapter Performance</h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-secondary)]">
                  <th className="text-left px-4 py-3 font-semibold">Chapter</th>
                  <th className="text-left px-4 py-3 font-semibold">Location</th>
                  <th className="text-left px-4 py-3 font-semibold">Events</th>
                  <th className="text-left px-4 py-3 font-semibold">Projects</th>
                  <th className="text-left px-4 py-3 font-semibold">Lead</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {chapters.map((chapter, i) => {
                  const chapterEvents = events.filter(e => e.chapterId === chapter.id);
                  const chapterProjects = projects.filter(p => p.chapterId === chapter.id);
                  return (
                    <tr
                      key={chapter.id}
                      className={`border-t border-[var(--border-subtle)] ${i % 2 === 1 ? 'bg-[var(--bg-secondary)]/50' : ''}`}
                    >
                      <td className="px-4 py-3 font-display font-medium whitespace-nowrap">
                        <span
                          className="inline-block w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: `var(--${chapter.color})` }}
                        />
                        Shiphaus {chapter.city}
                      </td>
                      <td className="px-4 py-3">{chapter.city}, {chapter.country}</td>
                      <td className="px-4 py-3">{chapterEvents.length}</td>
                      <td className="px-4 py-3">{chapterProjects.length}</td>
                      <td className="px-4 py-3">{chapter.lead.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Why It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Why One-Day Events Work</h2>
          <div className="font-body text-[var(--text-secondary)] leading-relaxed space-y-4">
            <p>
              <strong className="font-display text-[var(--text-primary)]">Constraints breed output.</strong> A 7-hour window forces decisions. No time for perfectionism, scope creep, or design-by-committee. Builders pick one idea and execute.
            </p>
            <p>
              <strong className="font-display text-[var(--text-primary)]">AI collapses the build cycle.</strong> With tools like Claude Code, Cursor, and v0, a solo builder can ship in hours what used to take a team weeks. The one-day format is purpose-built for this reality.
            </p>
            <p>
              <strong className="font-display text-[var(--text-primary)]">Peer pressure, not prizes.</strong> When everyone in the room is shipping, nobody wants to be the one who didn&apos;t. Social accountability replaces cash incentives.
            </p>
            <p>
              <strong className="font-display text-[var(--text-primary)]">Low commitment, high output.</strong> One Saturday. No multi-day time sink. No travel logistics. Show up, build, leave with something live.
            </p>
          </div>
        </motion.section>

        {/* How to Participate */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">How to Participate</h2>
          <div className="font-body text-[var(--text-secondary)] leading-relaxed space-y-4">
            <p>
              Shiphaus events are free and open to anyone. No application. No prerequisites. Builders of all experience levels &mdash; from first-time coders to senior engineers &mdash; are welcome.
            </p>
            <p>
              Active chapters operate in{' '}
              <strong className="font-display text-[var(--text-primary)]">New York City</strong>,{' '}
              <strong className="font-display text-[var(--text-primary)]">Chicago</strong>, and{' '}
              <strong className="font-display text-[var(--text-primary)]">Network School, Malaysia</strong>.
              New chapters can be started by anyone &mdash; the community provides the playbook and support.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/" className="btn-primary inline-flex items-center gap-2 text-sm">
              Visit Shiphaus
            </Link>
            <Link
              href="/start-a-chapter"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg border border-[var(--border-strong)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Start a Chapter
            </Link>
          </div>
        </motion.section>

        {/* Methodology */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-[var(--border-subtle)] pt-8"
        >
          <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed">
            <strong className="font-display">Methodology:</strong> Ship rates for traditional hackathon formats are estimated from published completion data across Major League Hacking, DevPost, and HackerEarth event archives (2023&ndash;2025). Shiphaus data is sourced directly from event records. &ldquo;Shipped&rdquo; is defined as a deployed, publicly accessible product at event close. Report published February 2026.
          </p>
        </motion.section>
      </div>
    </article>
  );
}
