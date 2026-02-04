'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StartAChapter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    twitter: '',
    linkedin: '',
    whatYouBuild: '',
    why: '',
    whoYouInvite: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Didn't work. Try again?");
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      setError("Didn't work. Try again?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-sm border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:text-[var(--accent)] transition-colors">
            Shiphaus
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-[1.1]">
              Run Shiphaus in Your City
            </h1>
            <p className="text-xl text-[var(--text-secondary)] font-body leading-relaxed max-w-xl mx-auto">
              Curate the builders. Find a space. Watch magic happen.
            </p>
          </motion.div>

          {/* Why Lead */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Why Lead</h2>
            <ul className="space-y-4">
              {[
                'You curate the room',
                'You watch ideas ship in 7 hours',
                'You make friends by making things',
                "You're connected to leads across cities",
                "You're early",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 pl-4 border-l-2 border-[var(--accent)]"
                >
                  <span className="text-[var(--accent)] text-xl font-bold">→</span>
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Application Form / Success State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card p-8"
                >
                  <h2 className="text-3xl font-bold mb-2">Apply to Lead</h2>
                  <p className="text-[var(--text-secondary)] font-body mb-8">Tell us about yourself and your city</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-2">
                          Name <span className="text-[var(--accent)]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">
                          Email <span className="text-[var(--accent)]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold mb-2">
                        City <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        placeholder="Where would you run Shiphaus?"
                      />
                    </div>

                    {/* Twitter and LinkedIn */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="twitter" className="block text-sm font-semibold mb-2">
                          Twitter
                        </label>
                        <input
                          type="text"
                          id="twitter"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          placeholder="@handle"
                        />
                      </div>
                      <div>
                        <label htmlFor="linkedin" className="block text-sm font-semibold mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          id="linkedin"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          placeholder="linkedin.com/in/..."
                        />
                      </div>
                    </div>

                    {/* What do you build */}
                    <div>
                      <label htmlFor="whatYouBuild" className="block text-sm font-semibold mb-2">
                        What do you build? <span className="text-[var(--accent)]">*</span>
                      </label>
                      <textarea
                        id="whatYouBuild"
                        name="whatYouBuild"
                        value={formData.whatYouBuild}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all font-body"
                        placeholder="Apps, hardware, content, communities..."
                      />
                    </div>

                    {/* Why do you want to run a chapter */}
                    <div>
                      <label htmlFor="why" className="block text-sm font-semibold mb-2">
                        Why do you want to run a chapter? <span className="text-[var(--accent)]">*</span>
                      </label>
                      <textarea
                        id="why"
                        name="why"
                        value={formData.why}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={4}
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all font-body"
                        placeholder="Why do you want to run a chapter?"
                      />
                    </div>

                    {/* Who would you invite */}
                    <div>
                      <label htmlFor="whoYouInvite" className="block text-sm font-semibold mb-2">
                        Who would you invite?
                      </label>
                      <textarea
                        id="whoYouInvite"
                        name="whoYouInvite"
                        value={formData.whoYouInvite}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all font-body"
                        placeholder="Doesn't have to be names — types of people, communities, etc."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="btn-primary w-full"
                    >
                      {isSubmitting ? 'Submitting...' : "Let's chat"}
                    </motion.button>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-red-600 text-sm font-medium">{error}</p>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="card text-center p-12"
                >
                  <div className="text-6xl mb-6">🚀</div>
                  <h2 className="text-3xl font-bold mb-4">You're in.</h2>
                  <p className="text-lg text-[var(--text-secondary)] font-body mb-8 max-w-md mx-auto">
                    We'll reach out soon to chat about bringing Shiphaus to <span className="text-[var(--accent)] font-semibold">{formData.city}</span>.
                  </p>
                  <Link href="/" className="btn-primary inline-block">
                    Back to Home
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
