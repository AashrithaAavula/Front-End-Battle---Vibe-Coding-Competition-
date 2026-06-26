// RE-RENDER SCOPE: The card wrapper is memoized and never re-renders when billing cycle or currency updates. Only the nested PriceText updates.
// ANIMATION METHOD: CSS Transition (character 3D digit-flip animations with inline transition delays)
// ASSET USED: IconCheck, IconX, IconStar

import React, { useState, useEffect, useRef } from 'react';
import { usePricing } from '../../hooks/usePricing.js';
import { pricingStore } from '../../utils/pricingStore.js';
import { IconCheck, IconX } from '../../assets/svg/icons.jsx';

/**
 * PriceText — isolated micro-component.
 *
 * State isolation guarantee:
 *   - Subscribes directly to pricingStore (plain pub-sub, no Context).
 *   - PricingCard (parent) is React.memo with no pricing props → never re-renders.
 *   - Only THIS component re-renders on currency/billing toggle.
 *
 * Digit-flip mechanic:
 *   1. Store emits → setUpdating(true)  → CSS class price-char--updating applied
 *      → each <span> rotates -90° on X axis (out of view) with staggered delay.
 *   2. After 100ms (within var(--dur-micro)) → new price committed to state,
 *      setUpdating(false) → spans rotate back to 0° with spring easing.
 */
function PriceText({ planKey }) {
  const [pricingState, setPricingState] = useState(() => pricingStore.getState());
  const [updating, setUpdating]         = useState(false);
  const timerRef  = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Subscribe returns an unsubscribe function — that IS our useEffect cleanup.
    const unsubscribe = pricingStore.subscribe((nextState) => {
      if (!mountedRef.current) return;

      // Phase 1 — flip OUT: apply updating class, chars rotate away
      setUpdating(true);

      // Clear any in-flight timer from rapid toggling
      clearTimeout(timerRef.current);

      // Phase 2 — commit new value, flip IN after micro delay
      timerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        setPricingState(nextState);
        setUpdating(false);
      }, 110); // Must complete within var(--dur-micro) = 180ms
    });

    return () => {
      mountedRef.current = false;
      clearTimeout(timerRef.current);
      unsubscribe();
    };
  }, []); // Empty deps — intentional: store ref never changes

  const { formatted, perLabel, moLabel } = usePricing(
    planKey,
    pricingState.currency,
    pricingState.billing
  );

  // Each character gets its own <span> for the 3-D rotateX digit-flip.
  // Key = `${index}-${char}` so React re-uses spans for same chars (stable identity),
  // but creates new DOM nodes when character count changes (e.g. ₹→$).
  const chars = formatted.split('');

  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-baseline gap-1.5">
        {/* aria-live="polite" ensures screen readers announce the price change */}
        <span
          className="price-amount flex select-none"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Price: ${formatted}`}
        >
          {chars.map((char, index) => (
            <span
              key={`${index}-${char}`}
              className={`price-char${updating ? ' price-char--updating' : ''}`}
              style={{ transitionDelay: `${index * 12}ms` }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--clr-text-secondary)' }}>
          {perLabel}
        </span>
      </div>

      {/* Monthly-equivalent subtext — only visible on annual billing */}
      <div className="h-5 mt-1">
        {moLabel && (
          <span
            className="text-xs font-mono anim-fade-in"
            style={{ color: 'var(--clr-accent-cyan-lt)' }}
          >
            {moLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export const PricingCard = React.memo(({ planKey, meta }) => {
  const isFeatured = meta.popular;

  return (
    <article 
      className={`pricing-card flex flex-col justify-between ${
        isFeatured ? 'pricing-card--featured animate-pulse-glow' : ''
      }`}
      style={isFeatured ? { animationDuration: '6s' } : undefined}
      aria-labelledby={`plan-label-${planKey}`}
    >
      {/* Visual popular badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 bg-[var(--clr-accent-primary)] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
          Most Popular
        </div>
      )}

      {/* Plan Header */}
      <div>
        <h3 id={`plan-label-${planKey}`} className="text-xl font-bold text-white mb-2">{meta.label}</h3>
        <p className="text-xs text-[var(--clr-text-secondary)] mb-6 leading-relaxed min-h-[32px]">
          {meta.description}
        </p>

        {/* Scoped pricing text (updates independently) */}
        <PriceText planKey={planKey} />

        {/* Feature List */}
        <ul className="space-y-3.5 mb-8 border-t border-[rgba(255,255,255,0.05)] pt-6" aria-label={`Features included in ${meta.label}`}>
          {meta.features.map((feature, index) => (
            <li key={`in-${index}`} className="flex items-start gap-3 text-xs text-[var(--clr-text-primary)]">
              <span className="mt-0.5 flex-shrink-0">
                <IconCheck size={14} color={isFeatured ? 'var(--clr-accent-cyan-lt)' : 'var(--clr-accent-emerald)'} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
          
          {meta.notIncluded.map((feature, index) => (
            <li key={`out-${index}`} className="flex items-start gap-3 text-xs text-[var(--clr-text-muted)]">
              <span className="mt-0.5 flex-shrink-0">
                <IconX size={14} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <a 
        href="#cta" 
        className={isFeatured ? 'btn-primary text-center justify-center w-full shadow-lg' : 'btn-ghost text-center justify-center w-full'}
      >
        {meta.cta}
      </a>
    </article>
  );
});

PricingCard.displayName = 'PricingCard';
