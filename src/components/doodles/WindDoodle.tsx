'use client';

import { motion, type Easing } from 'framer-motion';

interface WindDoodleProps {
  animate?: boolean;
}

const easeOut: Easing = 'easeOut';

export function WindDoodle({ animate = false }: WindDoodleProps) {
  const windVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.6, ease: easeOut },
        opacity: { duration: 0.1 },
      },
    },
  };

  const leafVariants = {
    hidden: {
      opacity: 0,
      x: -15,
      y: -5,
      rotate: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: [-15 - i * 3, 5, 0],
      y: [-5, -8 + i * 2, 0],
      rotate: [0, 180 + i * 30, 360 + i * 45],
      transition: {
        duration: 1.2,
        delay: 0.4 + i * 0.15,
        ease: easeOut,
      },
    }),
  };

  return (
    <motion.svg
      width="72"
      height="48"
      viewBox="0 0 72 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginLeft: -35 }}
    >
      {/* Wind swirls */}
      <motion.path
        d="M4 20 Q12 16 20 20 T36 18"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={windVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
      />
      <motion.path
        d="M8 28 Q18 22 28 26 T48 24"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={windVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.1 }}
      />
      <motion.path
        d="M2 36 Q14 30 26 34 T50 30"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        variants={windVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />
      {/* Spiral accent */}
      <motion.path
        d="M40 14 Q44 10 48 14 Q52 18 48 22 Q44 26 40 22"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        variants={windVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Leaf 1 */}
      <motion.g
        variants={leafVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={0}
      >
        <path
          d="M44 20 Q48 16 52 20 Q48 24 44 20 M48 16 L48 24"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>

      {/* Leaf 2 */}
      <motion.g
        variants={leafVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={1}
      >
        <path
          d="M52 32 Q56 28 60 32 Q56 36 52 32 M56 28 L56 36"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>

      {/* Leaf 3 */}
      <motion.g
        variants={leafVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={2}
      >
        <path
          d="M36 38 Q40 34 44 38 Q40 42 36 38 M40 34 L40 42"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
    </motion.svg>
  );
}
