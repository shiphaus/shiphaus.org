'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DoodlePortalProps {
  children: React.ReactNode;
}

export function DoodlePortal({ children }: DoodlePortalProps) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Find or create the doodle layer
    let layer = document.getElementById('doodle-layer');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'doodle-layer';
      layer.style.position = 'fixed';
      layer.style.top = '0';
      layer.style.left = '0';
      layer.style.width = '100%';
      layer.style.height = '100%';
      layer.style.pointerEvents = 'none';
      layer.style.zIndex = '100';
      document.body.appendChild(layer);
    }
    setContainer(layer);

    return () => {
      // Don't remove the layer on unmount - other doodles may use it
    };
  }, []);

  if (!mounted || !container) return null;

  return createPortal(children, container);
}
