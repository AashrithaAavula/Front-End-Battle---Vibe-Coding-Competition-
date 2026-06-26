// RE-RENDER SCOPE: Re-renders ONLY when billing cycle changes (pricingStore subscription).
//   PricingSection parent and PricingCard are unaffected — state is isolated in pricingStore.
// ANIMATION METHOD: CSS transform (translateX sliding pill indicator) + CSS transition 180ms ease-out
// ASSET USED: CSS variables — var(--clr-accent-primary), var(--clr-bg-card), var(--clr-border)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { pricingStore } from '../../utils/pricingStore.js';

/**
 * PricingToggle — Premium pill-style segmented toggle (Monthly ↔ Annual).
 *
 * Implementation notes:
 *  - "Active pill" is a single <span class="seg-pill"> that slides via
 *    CSS `transform: translateX()` — ONLY transform & opacity are animated.
 *  - translateX value is derived from the button's measured offsetLeft so we
 *    never assume fixed widths (fully responsive).
 *  - All DOM reads (offsetLeft, offsetWidth) are batched BEFORE any write,
 *    preventing layout thrashing per perf rules.
 *  - Keyboard: Left/Right arrows cycle options; Enter/Space activates focused option.
 */

const OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual',  label: 'Annual',  badge: 'Save 20%' },
];

export const PricingToggle = React.memo(() => {
  const [billing, setBilling] = useState(() => pricingStore.getState().billing);
  const trackRef  = useRef(null);
  const pillRef   = useRef(null);
  const btnRefs   = useRef([]);

  // Sync pill position to active button — batched read then write
  const syncPill = useCallback((activeBilling) => {
    const track = trackRef.current;
    const pill  = pillRef.current;
    if (!track || !pill) return;

    const idx = OPTIONS.findIndex(o => o.value === activeBilling);
    const btn = btnRefs.current[idx];
    if (!btn) return;

    // BATCH: all reads first
    const btnLeft  = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;

    // BATCH: one write
    pill.style.transform = `translateX(${btnLeft}px)`;
    pill.style.width     = `${btnWidth}px`;
  }, []);

  // Subscribe to store; sync pill on every change
  useEffect(() => {
    const unsubscribe = pricingStore.subscribe((state) => {
      setBilling(state.billing);
      // rAF defers to after React's paint so refs are ready
      requestAnimationFrame(() => syncPill(state.billing));
    });
    return unsubscribe;
  }, [syncPill]);

  // Initial pill position after mount (no animation on first paint)
  useEffect(() => {
    const pill = pillRef.current;
    if (pill) {
      pill.style.transition = 'none';  // suppress on mount
      syncPill(billing);
      requestAnimationFrame(() => {
        // Re-enable after first frame
        pill.style.transition = '';
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = useCallback((value) => {
    pricingStore.setState({ billing: value });
  }, []);

  // Keyboard: Left/Right arrows cycle through options
  const handleKeyDown = useCallback((e, currentIdx) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = e.key === 'ArrowRight'
        ? (currentIdx + 1) % OPTIONS.length
        : (currentIdx - 1 + OPTIONS.length) % OPTIONS.length;
      btnRefs.current[nextIdx]?.focus();
      handleSelect(OPTIONS[nextIdx].value);
    }
  }, [handleSelect]);

  return (
    <div
      role="group"
      aria-label="Billing cycle selection"
      className="seg-track"
      ref={trackRef}
    >
      {/* Sliding pill indicator — transform-only animation */}
      <span className="seg-pill" ref={pillRef} aria-hidden="true" />

      {OPTIONS.map((opt, idx) => {
        const isActive = billing === opt.value;
        return (
          <button
            key={opt.value}
            ref={el => { btnRefs.current[idx] = el; }}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${opt.label} billing${opt.badge ? ` — ${opt.badge}` : ''}`}
            tabIndex={isActive ? 0 : -1}
            className={`seg-btn${isActive ? ' seg-btn--active' : ''}`}
            onClick={() => handleSelect(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            <span className="seg-btn-label">{opt.label}</span>
            {opt.badge && (
              <span className="seg-badge" aria-hidden="true">
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
});

PricingToggle.displayName = 'PricingToggle';
