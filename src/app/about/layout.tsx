import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Shiphaus',
  description:
    'Nobody should waste time on work a machine can do. Meet the team behind Shiphaus — AI training, workshops, and workflow automation.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
