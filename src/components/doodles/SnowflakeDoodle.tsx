'use client';

import { motion, type Easing } from 'framer-motion';

interface SnowflakeDoodleProps {
  animate?: boolean;
}

const easeOut: Easing = 'easeOut';

export function SnowflakeDoodle({ animate = false }: SnowflakeDoodleProps) {
  const armVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: easeOut },
        opacity: { duration: 0.1 },
      },
    },
  };

  const branchVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.3, ease: easeOut },
        opacity: { duration: 0.1 },
      },
    },
  };

  const sparkleVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: 0.7 + i * 0.15,
        ease: easeOut,
      },
    }),
  };

  const cx = 32;
  const cy = 26;
  const armLen = 16;

  // 6 arms at 60° intervals
  const arms = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + Math.cos(rad) * armLen,
      y: cy + Math.sin(rad) * armLen,
      // Branch points at 60% along arm
      bx: cx + Math.cos(rad) * armLen * 0.6,
      by: cy + Math.sin(rad) * armLen * 0.6,
      // Branch tips (30° off the arm direction)
      b1x: cx + Math.cos(rad) * armLen * 0.6 + Math.cos(rad - Math.PI / 4) * 5,
      b1y: cy + Math.sin(rad) * armLen * 0.6 + Math.sin(rad - Math.PI / 4) * 5,
      b2x: cx + Math.cos(rad) * armLen * 0.6 + Math.cos(rad + Math.PI / 4) * 5,
      b2y: cy + Math.sin(rad) * armLen * 0.6 + Math.sin(rad + Math.PI / 4) * 5,
    };
  });

  return (
    <motion.svg
      width="64"
      height="52"
      viewBox="0 0 64 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginLeft: -30 }}
    >
      {/* Main arms */}
      {arms.map((arm, i) => (
        <motion.line
          key={`arm-${i}`}
          x1={cx}
          y1={cy}
          x2={arm.x}
          y2={arm.y}
          stroke="#1A1A1A"
          strokeWidth="1.8"
          strokeLinecap="round"
          variants={armVariants}
          initial="hidden"
          animate={animate ? 'visible' : 'hidden'}
          transition={{ delay: i * 0.06 }}
        />
      ))}

      {/* Branches */}
      {arms.map((arm, i) => (
        <g key={`branches-${i}`}>
          <motion.line
            x1={arm.bx}
            y1={arm.by}
            x2={arm.b1x}
            y2={arm.b1y}
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={branchVariants}
            initial="hidden"
            animate={animate ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 + i * 0.06 }}
          />
          <motion.line
            x1={arm.bx}
            y1={arm.by}
            x2={arm.b2x}
            y2={arm.b2y}
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={branchVariants}
            initial="hidden"
            animate={animate ? 'visible' : 'hidden'}
            transition={{ delay: 0.35 + i * 0.06 }}
          />
        </g>
      ))}

      {/* Sparkle dots */}
      <motion.circle
        cx={14}
        cy={12}
        r={1.5}
        fill="#1A1A1A"
        variants={sparkleVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={0}
      />
      <motion.circle
        cx={52}
        cy={18}
        r={1.2}
        fill="#1A1A1A"
        variants={sparkleVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={1}
      />
      <motion.circle
        cx={20}
        cy={44}
        r={1}
        fill="#1A1A1A"
        variants={sparkleVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
        custom={2}
      />
    </motion.svg>
  );
}
