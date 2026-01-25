'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, ExternalLink, Github, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { chapters } from '@/lib/data';

export default function SubmitPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deployedUrl: '',
    githubUrl: '',
    chapterId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be signed in to submit a project');
      return;
    }

    if (!formData.title || !formData.description || !formData.deployedUrl || !formData.chapterId) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate URL
    try {
      new URL(formData.deployedUrl);
    } catch {
      setError('Please enter a valid deployed URL');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission (replace with actual Supabase insert)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <Rocket className="w-8 h-8 text-[var(--accent)]" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="card p-8">
            <Rocket className="w-12 h-12 mx-auto mb-6 text-[var(--accent)]" />
            <h1 className="text-2xl font-bold mb-4">Sign in to Submit</h1>
            <p className="text-[var(--text-secondary)] font-body mb-8">
              You need to sign in with Google to submit your project to Shiphaus.
            </p>
            <button
              onClick={signIn}
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="card p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-8 h-8 text-green-600" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-4">Project Submitted!</h1>
            <p className="text-[var(--text-secondary)] font-body mb-8">
              Thanks for shipping, {user.user_metadata?.full_name?.split(' ')[0] || 'builder'}! Your project has been submitted
              and will appear on the site shortly.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    title: '',
                    description: '',
                    deployedUrl: '',
                    githubUrl: '',
                    chapterId: '',
                  });
                }}
                className="btn-secondary"
              >
                Submit Another
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Submit Your Project</h1>
          <p className="text-[var(--text-secondary)] font-body text-lg">
            Share what you built at a Shiphaus event (or on your own).
            Projects must have a live deployed URL.
          </p>
        </motion.div>

        {/* User info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <img
              src={user.user_metadata?.avatar_url || ''}
              alt={user.user_metadata?.full_name || 'User'}
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)]"
            />
            <div>
              <p className="font-medium">{user.user_metadata?.full_name || 'Builder'}</p>
              <p className="text-sm text-[var(--text-muted)]">{user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card p-6 md:p-8"
        >
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Chapter */}
            <div>
              <label htmlFor="chapter" className="block text-sm font-medium mb-2">
                Chapter <span className="text-red-500">*</span>
              </label>
              <select
                id="chapter"
                value={formData.chapterId}
                onChange={(e) => setFormData({ ...formData, chapterId: e.target.value })}
                className="input"
                required
              >
                <option value="">Select a chapter</option>
                {chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.city}, {chapter.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input"
                placeholder="My Awesome Project"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input min-h-[120px] resize-y"
                placeholder="What does your project do? Keep it short and sweet."
                required
              />
              <p className="text-sm text-[var(--text-muted)] mt-1">
                1-2 sentences is ideal
              </p>
            </div>

            {/* Deployed URL */}
            <div>
              <label htmlFor="deployedUrl" className="block text-sm font-medium mb-2">
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Deployed URL <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="url"
                id="deployedUrl"
                value={formData.deployedUrl}
                onChange={(e) => setFormData({ ...formData, deployedUrl: e.target.value })}
                className="input"
                placeholder="https://myproject.com"
                required
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub URL <span className="text-[var(--text-muted)]">(optional)</span>
                </span>
              </label>
              <input
                type="url"
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="input"
                placeholder="https://github.com/username/repo"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Rocket className="w-5 h-5" />
                  </motion.div>
                  Submitting...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  Submit Project
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
