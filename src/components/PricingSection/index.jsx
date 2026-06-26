// RE-RENDER SCOPE: Static component. Memoized. Never re-renders since billing/currency states are isolated in the pricingStore.
// ANIMATION METHOD: CSS keyframe animations (fadeInUp for entrance, reveal)
// ASSET USED: IconSparkle, CSS variables

import React from 'react';
import { PLAN_KEYS, PLAN_META } from '../../data/pricingMatrix.js';
import { CurrencySelect } from './CurrencySelect.jsx';
import { PricingToggle } from './PricingToggle.jsx';
import { PricingCard } from './PricingCard.jsx';
import { IconSparkle } from '../../assets/svg/icons.jsx';
import { useIntersection } from '../../hooks/useIntersection.js';

export const Pricing = React.memo(() => {
  // Initialize scroll reveals
  useIntersection('.reveal');

  return (
    <section 
      id="pricing" 
      className="py-24 relative overflow-hidden bg-[rgba(5,11,24,0.3)]" 
      aria-label="Pricing Section"
    >
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[var(--clr-accent-cyan)] opacity-5 rounded-full blur-[150px] pointer-events-none select-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--clr-accent-primary)] opacity-5 rounded-full blur-[120px] pointer-events-none select-none animate-pulse-glow" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="section-tag mb-4 inline-flex items-center gap-1.5 justify-center">
            <IconSparkle size={12} />
            <span>Pricing Options</span>
          </div>
          
          <h2 className="section-title text-white mb-4">
            Simple, Transparent Plans
          </h2>
          
          <p className="text-base text-[var(--clr-text-secondary)] leading-relaxed">
            Choose a tier that fits your team's workflow. All plans are dynamically computed 
            and support global payment currencies.
          </p>
        </div>

        {/* Pricing Controls (Toggle & Selectors) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 reveal">
          <PricingToggle />
          <div className="w-px h-6 bg-[var(--clr-border)] hidden sm:block" />
          <CurrencySelect />
        </div>

        {/* Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch reveal">
          {PLAN_KEYS.map((planKey) => (
            <PricingCard 
              key={planKey} 
              planKey={planKey} 
              meta={PLAN_META[planKey]} 
            />
          ))}
        </div>

        {/* Enterprise footnote */}
        <p className="text-center text-xs text-[var(--clr-text-secondary)] mt-12 reveal">
          Need custom volume limits or self-hosted deployment?{' '}
          <a href="#cta" className="text-[var(--clr-accent-primary-lt)] font-semibold hover:underline">
            Contact our systems architecture team
          </a>
        </p>

      </div>
    </section>
  );
});

Pricing.displayName = 'Pricing';
