'use client';

import { motion } from 'framer-motion';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-6"
    >
      <div className="testimonial-quote">
        <p className="text-[var(--text-secondary)] font-body text-lg leading-relaxed mb-6 pl-4">
          {testimonial.quote}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-12 h-12 rounded-full border border-[var(--border-subtle)]"
        />
        <div>
          <p className="font-semibold text-sm">{testimonial.author}</p>
          <p className="text-[var(--text-muted)] text-sm">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
