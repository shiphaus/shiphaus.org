'use client';

import { motion, type Easing } from 'framer-motion';

interface NetworkDoodleProps {
  animate?: boolean;
}

const backOut: Easing = 'backOut';
const easeOut: Easing = 'easeOut';

export function NetworkDoodle({ animate = false }: NetworkDoodleProps) {
  const nodeVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: backOut,
      },
    }),
  };

  const lineVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.4, ease: easeOut, delay: 0.4 + i * 0.08 },
        opacity: { duration: 0.1, delay: 0.4 + i * 0.08 },
      },
    }),
  };

  // Node positions
  const nodes = [
    { cx: 36, cy: 8 },   // top
    { cx: 60, cy: 24 },  // right
    { cx: 48, cy: 44 },  // bottom right
    { cx: 24, cy: 44 },  // bottom left
    { cx: 12, cy: 24 },  // left
  ];

  // Connection lines (fully connected)
  const lines = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 },
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
    { from: 2, to: 3 }, { from: 2, to: 4 },
    { from: 3, to: 4 },
  ];

  return (
    <motion.svg
      width="72"
      height="52"
      viewBox="0 0 72 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginLeft: -35 }}
    >
      {/* Connection lines - draw first so nodes appear on top */}
      {lines.map((line, i) => (
        <motion.line
          key={`line-${i}`}
          x1={nodes[line.from].cx}
          y1={nodes[line.from].cy}
          x2={nodes[line.to].cx}
          y2={nodes[line.to].cy}
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={lineVariants}
          initial="hidden"
          animate={animate ? 'visible' : 'hidden'}
          custom={i}
        />
      ))}

      {/* Nodes - sketchy double circles for hand-drawn feel */}
      {nodes.map((node, i) => (
        <motion.g
          key={`node-${i}`}
          variants={nodeVariants}
          initial="hidden"
          animate={animate ? 'visible' : 'hidden'}
          custom={i}
        >
          {/* Outer sketchy circle */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r="7"
            stroke="#1A1A1A"
            strokeWidth="2"
            fill="white"
          />
          {/* Inner accent circle */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="#F59E0B"
          />
          {/* Extra sketchy line for hand-drawn feel */}
          <path
            d={`M${node.cx - 6} ${node.cy - 2} Q${node.cx - 7} ${node.cy + 1} ${node.cx - 5} ${node.cy + 4}`}
            stroke="#1A1A1A"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}
