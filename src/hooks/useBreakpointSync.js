// RE-RENDER SCOPE: Triggers ONE re-render when the viewport crosses the 768px breakpoint.
//   Does NOT re-render on card selection (activeIndex changes) — ref is used instead.
// ANIMATION METHOD: None
// ASSET USED: None

import { useState, useEffect, useRef } from 'react';

/**
 * useBreakpointSync
 *
 * Uses a single long-lived ResizeObserver (created once, never torn down on card changes)
 * to detect when the viewport crosses the 768px mobile/desktop boundary.
 *
 * On desktop→mobile crossing:
 *   - If no panel is currently open (activeIndex === null), opens panel 0.
 *   - Otherwise preserves the current activeIndex so the accordion reflects it.
 * On mobile→desktop crossing:
 *   - No action needed — the bento grid reads activeIndex from shared state.
 *
 * @param {number|null} activeIndex  Current active feature card (read via ref — no dep-churn)
 * @param {function}    setActiveIndex  Setter for active index
 * @returns {boolean}  isMobile — true when viewport width < 768px
 */
export function useBreakpointSync(activeIndex, setActiveIndex) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Keep refs in sync so the observer callback always reads the latest value
  // without needing to be re-created on every activeIndex change.
  const activeIndexRef    = useRef(activeIndex);
  const setActiveIndexRef = useRef(setActiveIndex);
  const prevIsMobileRef   = useRef(isMobile);

  // Update refs on every render (cheap, synchronous — no effects needed)
  activeIndexRef.current    = activeIndex;
  setActiveIndexRef.current = setActiveIndex;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;

      // Use documentElement width (reliable across all browsers)
      const width = entries[0].contentRect.width || window.innerWidth;
      const isMobileNow = width < 768;

      if (isMobileNow === prevIsMobileRef.current) return; // No crossing — ignore

      prevIsMobileRef.current = isMobileNow;
      setIsMobile(isMobileNow);

      if (isMobileNow) {
        // Crossed desktop → mobile: ensure at least one accordion panel is open
        if (activeIndexRef.current === null) {
          setActiveIndexRef.current(0);
        }
        // Otherwise the existing activeIndex will be reflected by the Accordion
      }
      // Crossed mobile → desktop: BentoGrid reads activeIndex from state — no action needed
    });

    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, []); // ← Empty: observer is created once. Refs provide fresh values inside callback.

  return isMobile;
}
