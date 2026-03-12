'use client';

import { motion } from 'framer-motion';

const XLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const team = [
  {
    name: 'Slobo',
    role: 'Founder · New York',
    bio: '15 years across fintech, marketing, and fraud prevention. Built infrastructure used by wallet companies in production. Ex-founder, backed by Coinbase Ventures.',
    avatar: '/avatars/slobo.jpeg',
    x: 'https://x.com/AlexSlobodnik',
    handle: '@AlexSlobodnik',
  },
  {
    name: 'Kirill',
    role: 'Founder · Chicago',
    bio: 'Product leader turned indie hacker. Decade running teams at early-stage fintech and insurtech companies. Builds and ships AI tools on the side.',
    avatar: 'https://pbs.twimg.com/profile_images/1475225953563561984/7YiRwkGF_400x400.jpg',
    x: 'https://x.com/polevoy_kirill',
    handle: '@polevoy_kirill',
  },
  {
    name: 'Dylan',
    role: 'Founder · Network School',
    bio: 'CPA turned web3 builder. Three-time ENS DAO Steward. Built governance tools used by ENS, Uniswap, and Optimism. Currently at Balaji\u2019s Network School.',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIqSddDDj3zpXMWiIHz7It2SXAf3baAv2nWspKsbMo4l2fkFiJ9qA=s96-c',
    x: 'https://x.com/gofordylan',
    handle: '@gofordylan',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase bg-[var(--text-primary)] text-white rounded-lg">
              Our Story
            </span>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-10">
              We started Shiphaus because nobody should waste time on work a machine can do.
            </h1>

            <div className="space-y-6 text-lg font-body leading-relaxed text-[var(--text-secondary)]">
              <p>
                Between us &mdash; fifteen years in fintech, product, governance, and fraud prevention. We&apos;ve watched plenty of &ldquo;next big things&rdquo; come and go.
              </p>

              <p className="text-[var(--text-primary)] font-display font-bold text-xl md:text-2xl !leading-tight">
                AI is different.
              </p>

              <p>
                Not because it&apos;s flashy. Because it&apos;s useful. Every hour someone spends on work a machine could handle is an hour stolen from the work that actually matters.
              </p>
            </div>

            {/* Pull quote */}
            <div className="my-10 py-8 border-y border-[var(--border-strong)] text-center">
              <p className="font-body italic text-xl md:text-2xl text-[var(--text-primary)]">
                &ldquo;Never tell a computer something it already knows.&rdquo;
              </p>
            </div>

            <div className="space-y-6 text-lg font-body leading-relaxed text-[var(--text-secondary)]">
              <p>
                We saw smart people stuck. Not for lack of ideas &mdash; because starting is hard. The first steps are always grunt work. AI dissolves that.
              </p>

              <p>
                So we got a room. Set a deadline. Invited builders. Everyone shipped.
              </p>

              <p>
                That was Shiphaus #1. Five events and three cities later, the thesis holds. Buildathons are where we started. We&apos;re just getting going.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">The Team</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{person.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{person.role}</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] font-body mb-4">{person.bio}</p>
                <a
                  href={person.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] font-medium hover:gap-2.5 transition-all"
                >
                  <XLogo className="w-3.5 h-3.5" />
                  {person.handle}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-white/60 font-body mb-12">
              We also help teams ship AI tools. Same energy. Different timeline.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">Say Hi</h2>

            <div className="flex flex-wrap justify-center gap-6">
              {team.map((person) => (
                <a
                  key={person.handle}
                  href={person.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-white/50 hover:text-[var(--accent)] transition-colors"
                >
                  <XLogo className="w-4 h-4" />
                  <span className="text-sm font-medium">{person.handle}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
