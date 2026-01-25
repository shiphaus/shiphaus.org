'use client';

import { motion, type Easing } from 'framer-motion';

interface FlatironsDoodleProps {
  animate?: boolean;
}

const easeOut: Easing = 'easeOut';

export function FlatironsDoodle({ animate = false }: FlatironsDoodleProps) {
  const mountainVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: easeOut, delay: i * 0.12 },
        opacity: { duration: 0.1, delay: i * 0.12 },
      },
    }),
  };

  const treeVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (i: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.7 + i * 0.08,
        ease: easeOut,
      },
    }),
  };

  return (
    <motion.svg
      width="80"
      height="48"
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginLeft: -35 }}
    >
      {/* Peak 1 - leftmost */}
      <motion.path
        d="M4 44 L12 18 L16 44"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={mountainVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={0}
      />
      {/* Crosshatch on peak 1 */}
      <motion.path
        d="M9 30 L14 32 M8 36 L15 38"
        stroke="#1A1A1A"
        strokeWidth="1"
        strokeLinecap="round"
        variants={mountainVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={0.5}
      />

      {/* Peak 2 */}
      <motion.path
        d="M14 44 L26 12 L32 44"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={mountainVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={1}
      />
      {/* Crosshatch on peak 2 */}
      <motion.path
        d="M21 26 L28 28 M19 34 L30 36"
        stroke="#1A1A1A"
        strokeWidth="1"
        strokeLinecap="round"
        variants={mountainVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={1.5}
      />

      {/* Peak 3 - tallest */}
      <motion.path
        d="M28 44 L44 6 L52 44"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={mountainVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={2}
      />
      {/* Crosshatch on peak 3 */}
      <motion.path
        d="M38 22 L47 24 M36 30 L50 33 M34 38 L52 41"
        stroke="#1A1A1A"
        strokeWidth="1"
        strokeLinecap="round"
        variants={mountainVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={2.5}
      />

      {/* Peak 4 */}
      <motion.path
        d="M48 44 L62 16 L68 44"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={mountainVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={3}
      />
      {/* Crosshatch on peak 4 */}
      <motion.path
        d="M56 28 L64 30 M54 36 L66 38"
        stroke="#1A1A1A"
        strokeWidth="1"
        strokeLinecap="round"
        variants={mountainVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={3.5}
      />

      {/* Small trees at base */}
      <motion.path
        d="M6 44 L6 42 M4 43 L6 41 L8 43"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transformOrigin: '6px 44px' }}
        variants={treeVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={0}
      />
      <motion.path
        d="M22 44 L22 42 M20 43 L22 41 L24 43"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transformOrigin: '22px 44px' }}
        variants={treeVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={1}
      />
      <motion.path
        d="M58 44 L58 42 M56 43 L58 41 L60 43"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transformOrigin: '58px 44px' }}
        variants={treeVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={2}
      />
      <motion.path
        d="M72 44 L72 42 M70 43 L72 41 L74 43"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transformOrigin: '72px 44px' }}
        variants={treeVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={3}
      />
    </motion.svg>
  );
}
