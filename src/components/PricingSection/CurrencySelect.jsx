// RE-RENDER SCOPE: Re-renders ONLY when currency changes (pricingStore subscription).
//   PricingSection parent and PricingCard are unaffected — state is isolated in pricingStore.
// ANIMATION METHOD: CSS transform (translateX sliding pill indicator) + CSS transition 180ms ease-out
// ASSET USED: CSS variables — var(--clr-accent-primary), var(--clr-bg-card), var(--clr-border)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CURRENCY_CODES } from '../../utils/currency.js';
import { pricingStore } from '../../utils/pricingStore.js';

/**
 * CurrencySelect — Premium 3-segment pill control (INR | USD | EUR).
 *
 * Implementation notes:
 *  - Identical sliding-pill pattern as PricingToggle.
 *  - ARIA role="radiogroup" with individual role="radio" buttons.
 *  - Left/Right arrow navigation per WAI-ARIA radio group pattern.
 *  - Sliding indicator driven by transform: translateX — no width/margin animations.
 *  - All DOM reads batched before writes to prevent layout thrashing.
 */

export const CurrencySelect = React.memo(() => {
  const [currency, setCurrency] = useState(() => pricingStore.getState().currency);
  const trackRef = useRef(null);
  const pillRef  = useRef(null);
  const btnRefs  = useRef([]);

  // Sync pill to active button — batch read then write
  const syncPill = useCallback((activeCurrency) => {
    const track = trackRef.current;
    const pill  = pillRef.current;
    if (!track || !pill) return;

    const idx = CURRENCY_CODES.findIndex(c => c === activeCurrency);
    const btn = btnRefs.current[idx];
    if (!btn) return;

    // BATCH reads first
    const btnLeft  = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;

    // BATCH single write
    pill.style.transform = `translateX(${btnLeft}px)`;
    pill.style.width     = `${btnWidth}px`;
  }, []);

  useEffect(() => {
    const unsubscribe = pricingStore.subscribe((state) => {
      setCurrency(state.currency);
      requestAnimationFrame(() => syncPill(state.currency));
    });
    return unsubscribe;
  }, [syncPill]);

  // Initial position — no transition on first paint
  useEffect(() => {
    const pill = pillRef.current;
    if (pill) {
      pill.style.transition = 'none';
      syncPill(currency);
      requestAnimationFrame(() => {
        pill.style.transition = '';
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = useCallback((code) => {
    pricingStore.setState({ currency: code });
  }, []);

  // Arrow key navigation
  const handleKeyDown = useCallback((e, currentIdx) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = e.key === 'ArrowRight'
        ? (currentIdx + 1) % CURRENCY_CODES.length
        : (currentIdx - 1 + CURRENCY_CODES.length) % CURRENCY_CODES.length;
      btnRefs.current[nextIdx]?.focus();
      handleSelect(CURRENCY_CODES[nextIdx]);
    }
  }, [handleSelect]);

  return (
    <div
      role="radiogroup"
      aria-label="Currency selection"
      className="seg-track seg-track--currency"
      ref={trackRef}
    >
      {/* Sliding pill indicator */}
      <span className="seg-pill" ref={pillRef} aria-hidden="true" />

      {CURRENCY_CODES.map((code, idx) => {
        const isActive = currency === code;
        return (
          <button
            key={code}
            ref={el => { btnRefs.current[idx] = el; }}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${code} currency`}
            tabIndex={isActive ? 0 : -1}
            className={`seg-btn seg-btn--sm${isActive ? ' seg-btn--active' : ''}`}
            onClick={() => handleSelect(code)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
});

CurrencySelect.displayName = 'CurrencySelect';
