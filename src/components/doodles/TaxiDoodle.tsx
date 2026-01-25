'use client';

import { motion, type Easing } from 'framer-motion';

interface TaxiDoodleProps {
  animate?: boolean;
}

const easeInOut: Easing = 'easeInOut';

export function TaxiDoodle({ animate = false }: TaxiDoodleProps) {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: easeInOut },
        opacity: { duration: 0.1 },
      },
    },
  };

  const driveVariants = {
    hidden: { x: -60 },
    visible: {
      x: [-60, -10, -10],
      transition: {
        x: { duration: 1.2, ease: easeInOut, times: [0, 0.7, 1] },
      },
    },
  };

  return (
    <motion.svg
      width="64"
      height="40"
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={driveVariants}
      initial="hidden"
      animate={animate ? 'visible' : 'hidden'}
    >
      {/* Body */}
      <motion.path
        d="M8 28 C6 28 4 26 4 24 L4 20 C4 18 6 16 8 16 L14 16 L18 10 C19 8 21 8 22 8 L42 8 C43 8 45 8 46 10 L50 16 L56 16 C58 16 60 18 60 20 L60 24 C60 26 58 28 56 28"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FFD93D"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
      />
      {/* Roof light */}
      <motion.rect
        x="28"
        y="4"
        width="8"
        height="5"
        rx="1"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        fill="#FFD93D"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />
      {/* Windows */}
      <motion.path
        d="M18 16 L22 10 L42 10 L46 16"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />
      {/* Window divider */}
      <motion.line
        x1="32"
        y1="10"
        x2="32"
        y2="16"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.4 }}
      />
      {/* Checker pattern - simplified */}
      <motion.path
        d="M12 20 h4 v4 h-4 z M20 20 h4 v4 h-4 z M28 20 h4 v4 h-4 z M36 20 h4 v4 h-4 z M44 20 h4 v4 h-4 z"
        stroke="#1A1A1A"
        strokeWidth="1"
        fill="#1A1A1A"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
      />
      {/* Front wheel */}
      <motion.circle
        cx="16"
        cy="30"
        r="6"
        stroke="#1A1A1A"
        strokeWidth="2"
        fill="white"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.6 }}
      />
      <motion.circle
        cx="16"
        cy="30"
        r="2"
        fill="#1A1A1A"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.65 }}
      />
      {/* Rear wheel */}
      <motion.circle
        cx="48"
        cy="30"
        r="6"
        stroke="#1A1A1A"
        strokeWidth="2"
        fill="white"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.6 }}
      />
      <motion.circle
        cx="48"
        cy="30"
        r="2"
        fill="#1A1A1A"
        variants={pathVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.65 }}
      />
    </motion.svg>
  );
}
