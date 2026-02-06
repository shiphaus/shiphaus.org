'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ShiphausLogoProps {
  size?: number;
  className?: string;
}

export function ShiphausLogo({ size = 40, className = '' }: ShiphausLogoProps) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ rotate: 8, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <Image
        src="/shiphaus_logo_new.png"
        alt="Shiphaus"
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
