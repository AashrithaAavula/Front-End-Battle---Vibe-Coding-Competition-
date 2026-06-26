// RE-RENDER SCOPE: Re-renders the consuming component at most once per 100ms on window resize.
// ANIMATION METHOD: None
// ASSET USED: None

import { useState, useEffect, useRef } from 'react';

/**
 * useWindowSize
 *
 * Returns the current window dimensions, debounced at 100ms to prevent
 * excessive re-renders during resize drags.
 *
 * Note: useBreakpointSync (ResizeObserver) handles the critical 768px context-lock.
 * This hook is available for components that need raw viewport dimensions.
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width:  typeof window !== 'undefined' ? window.innerWidth  : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timerRef.current); // Cancel any pending debounced update
    };
  }, []);

  return size;
}
