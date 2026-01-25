'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { Chapter } from '@/types';

interface ChapterCardProps {
  chapter: Chapter;
  index?: number;
}

const colorMap: Record<string, string> = {
  'chapter-ny': '#2D5BFF',
  'chapter-chicago': '#8B5CF6',
  'chapter-boulder': '#10B981',
  'chapter-malaysia': '#F59E0B',
};

export function ChapterCard({ chapter, index = 0 }: ChapterCardProps) {
  const accentColor = colorMap[chapter.color] || '#FF6B35';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/chapter/${chapter.id}`} className="block group">
        <div className="card p-6 relative overflow-hidden">
          {/* Colored accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: accentColor }}
          />

          {/* Chapter header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">
                {chapter.city}
              </h3>
              <div className="flex items-center gap-1 text-[var(--text-muted)] text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>{chapter.country}</span>
              </div>
            </div>
            <motion.div
              className="p-2 rounded-full bg-[var(--bg-secondary)] group-hover:bg-[var(--accent-soft)] transition-colors"
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
            </motion.div>
          </div>

          {/* Lead info */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border-subtle)]">
            <img
              src={chapter.lead.avatar}
              alt={chapter.lead.name}
              className="w-10 h-10 rounded-full border-2"
              style={{ borderColor: accentColor }}
            />
            <div>
              <p className="text-sm font-medium">{chapter.lead.name}</p>
              <p className="text-xs text-[var(--text-muted)]">Chapter Lead</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Users className="w-4 h-4" style={{ color: accentColor }} />
              <span><strong>{chapter.projectCount}</strong> projects</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Calendar className="w-4 h-4" style={{ color: accentColor }} />
              <span><strong>{chapter.eventCount}</strong> events</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
