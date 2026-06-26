// RE-RENDER SCOPE: Re-renders only when screen cross-breakpoints occur or user changes active index. Memoized.
// ANIMATION METHOD: CSS keyframe animations (fadeInUp for entrance, reveal)
// ASSET USED: IconSparkle, CSS variables

import React, { useState, useCallback } from 'react';
import { FEATURES } from '../../utils/features.js';
import { useBreakpointSync } from '../../hooks/useBreakpointSync.js';
import { BentoGrid } from './BentoGrid.jsx';
import { Accordion } from './Accordion.jsx';
import { IconSparkle } from '../../assets/svg/icons.jsx';
import { useIntersection } from '../../hooks/useIntersection.js';

export const Features = React.memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync index states across mobile and desktop breakpoints using ResizeObserver
  const isMobile = useBreakpointSync(activeIndex, setActiveIndex);

  // Initialize scroll reveals
  useIntersection('.reveal');

  // Memoize state toggler to prevent child component re-renders
  const handleSelectIndex = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <section 
      id="features" 
      className="py-24 relative overflow-hidden" 
      aria-label="Features Section"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--clr-accent-violet)] opacity-5 rounded-full blur-[150px] pointer-events-none select-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="section-tag mb-4 inline-flex items-center gap-1.5 justify-center">
            <IconSparkle size={12} />
            <span>Platform Core</span>
          </div>
          
          <h2 className="section-title text-white mb-4">
            Engineered for Modern Data Teams
          </h2>
          
          <p className="text-base text-[var(--clr-text-secondary)] leading-relaxed">
            From zero-code pipelines to real-time orchestrations, DataFlow AI gives you the scalability 
            and security you need to control your data streams instantly.
          </p>
        </div>

        {/* Responsive Toggle Grid / Accordion */}
        <div className="reveal">
          {isMobile ? (
            <Accordion 
              features={FEATURES} 
              activeIndex={activeIndex} 
              setActiveIndex={handleSelectIndex} 
            />
          ) : (
            <BentoGrid 
              features={FEATURES} 
              activeIndex={activeIndex} 
              setActiveIndex={handleSelectIndex} 
            />
          )}
        </div>

      </div>
    </section>
  );
});

Features.displayName = 'Features';
