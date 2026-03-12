'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    bio: 'Product leader turned indie hacker. Decade running teams at Series B fintech and insurtech companies. Builds and ships AI tools on the side.',
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
      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-[var(--text-primary)] text-white rounded-lg">
              About
            </span>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              AI gave everyone the tools.<br />
              We give them the <span className="text-[var(--accent)]">push</span>.
            </h1>

            <p className="text-xl text-[var(--text-secondary)] font-body leading-relaxed max-w-2xl">
              The hardest part isn&apos;t code. It&apos;s starting. Shiphaus puts you in a room with a deadline and gets the snowball rolling. AI is changing everything. We want everyone building.
            </p>
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

      {/* Consulting signal + Contact */}
      <section className="py-20 bg-[var(--text-primary)] text-white">
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

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Say Hi</h2>

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
