// RE-RENDER SCOPE: None — directly mutates DOM class names, zero React state involved.
// ANIMATION METHOD: CSS Transition (.reveal → .reveal--visible via IntersectionObserver)
// ASSET USED: None

import { useEffect } from 'react';

/**
 * useIntersection
 *
 * Observes all elements matching `selector` and adds the `.reveal--visible` class
 * when they enter the viewport. Uses IntersectionObserver — never scroll event listeners.
 *
 * Observations:
 *  - Called with an empty dep-array so the observer is created exactly once per component mount.
 *  - Once an element is revealed it is unobserved (one-shot) — no ongoing work.
 *  - MutationObserver is NOT used; each lazy-loaded section calls this hook independently
 *    after its own mount, picking up its own `.reveal` elements.
 *
 * @param {string} selector   CSS selector for elements to reveal (default: '.reveal')
 */
export function useIntersection(selector = '.reveal') {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target); // One-shot: stop after first reveal
          }
        });
      },
      {
        threshold:   0.10,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty: selector is stable (string literal at every call site)
}
