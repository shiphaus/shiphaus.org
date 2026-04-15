'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const XLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
    linkedin: 'https://www.linkedin.com/in/alex-slobodnik-b412762/',
    site: 'https://justslobo.com/',
  },
  {
    name: 'Kirill',
    role: 'Founder · Chicago',
    bio: 'Product leader turned indie hacker. Decade running teams at early-stage fintech and insurtech companies. Builds and ships AI tools on the side.',
    avatar: 'https://pbs.twimg.com/profile_images/1475225953563561984/7YiRwkGF_400x400.jpg',
    x: 'https://x.com/polevoy_kirill',
    handle: '@polevoy_kirill',
    linkedin: 'https://www.linkedin.com/in/kirill-polevoy/',
    site: 'https://www.kirillpolevoy.com/',
  },
  {
    name: 'Dylan',
    role: 'Founder · Network School',
    bio: 'CPA turned web3 builder. Three-time ENS DAO Steward. Built governance tools used by ENS, Uniswap, and Optimism. Currently at Balaji\u2019s Network School.',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIqSddDDj3zpXMWiIHz7It2SXAf3baAv2nWspKsbMo4l2fkFiJ9qA=s96-c',
    x: 'https://x.com/gofordylan',
    handle: '@gofordylan',
    linkedin: 'https://www.linkedin.com/in/dylanbrodeur/',
    site: 'https://dylanbrodeur.org/',
  },
  {
    name: 'Jake',
    role: 'Chapter Lead · Minneapolis',
    bio: 'Healthcare veteran turned AI builder. Founded BuildAI. Helps companies ship internal tools that cut operational overhead.',
    avatar: '/avatars/moroshek.jpg',
    x: 'https://x.com/moroshek',
    handle: '@moroshek',
    linkedin: 'https://www.linkedin.com/in/moroshek/',
    site: 'https://moroshek.com',
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

            <h1 className="text-3xl md:text-4xl font-body leading-tight mb-4">
              Nobody should waste time on work a machine can do.
            </h1>

            <p className="text-xl text-[var(--text-secondary)] font-body leading-relaxed mb-10">
              That&apos;s why we started Shiphaus.
            </p>

            <div className="space-y-6 text-lg font-body leading-relaxed text-[var(--text-secondary)]">
              <p>
                We&apos;ve all been using AI since 2022. It was a nice tool. A better Google. Then Claude Code happened.
              </p>

              <p>
                AI stopped being a helper and started making things possible that weren&apos;t even conceivable before. It went from answering questions to doing the work.
              </p>

              <p>
                Salespeople weren&apos;t just building apps. They were deploying them. The creativity it unlocked was unlike anything we&apos;d seen. They saw the light.
              </p>
            </div>

            {/* Pull quote */}
            <div className="my-10 py-8 border-y border-[var(--border-strong)] text-center">
              <p className="font-body italic text-xl md:text-2xl text-[var(--text-primary)]">
                We joke it was our baptism. BC and AC &mdash; Before Claude, After Claude.
              </p>
            </div>

            <div className="space-y-6 text-lg font-body leading-relaxed text-[var(--text-secondary)]">
              <p>
                So we started holding free build days. We wanted to spread the word and get a community of builders and non-builders together. Oh, and pizza.
              </p>

              <p>
                Then people started asking: &ldquo;Can you help us do this at work?&rdquo;
              </p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-[var(--bg-secondary)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase bg-[var(--text-primary)] text-white rounded-lg">
              What We Offer
            </span>

            <div className="space-y-6 text-lg font-body leading-relaxed text-[var(--text-secondary)]">
              <p>
                Shiphaus runs training and workshops to get teams up to speed with AI. We also work with companies to identify repetitive workflows and automate them. We recently helped a general counsel turn hours of routine legal work into minutes.
              </p>

              <p className="text-[var(--text-primary)] font-display font-semibold text-xl">
                We know how to make the machines do the work so your team can focus on growing your business.
              </p>

              <p>
                Let&apos;s talk.
              </p>

              <a
                href="mailto:slobo@shiphaus.org"
                className="inline-block text-[var(--accent)] font-display font-semibold text-lg hover:text-[var(--accent-hover)] transition-colors"
              >
                slobo@shiphaus.org
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">The Team</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="flex items-center gap-4">
                  <a
                    href={person.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <XLogo className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <LinkedInLogo className="w-4 h-4" />
                  </a>
                  <a
                    href={person.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
