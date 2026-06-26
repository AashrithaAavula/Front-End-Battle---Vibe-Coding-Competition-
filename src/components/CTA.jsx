// RE-RENDER SCOPE: Static component. Memoized. Never re-renders.
// ANIMATION METHOD: CSS keyframe animations (pulseGlow, fadeInUp, reveal)
// ASSET USED: IconArrowRight, IconSparkle, CSS variables

import React from 'react';
import { IconArrowRight, IconSparkle } from '../assets/svg/icons.jsx';
import { useIntersection } from '../hooks/useIntersection.js';

export const CTA = React.memo(() => {
  useIntersection('.reveal');

  return (
    <section
      id="cta"
      className="py-24 relative overflow-hidden"
      aria-label="Call to Action — Start your free trial"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none select-none anim-pulse-glow"
        style={{ background: 'var(--clr-accent-primary)', opacity: 0.06 }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 reveal">
        <div
          className="cta-card p-10 md:p-16 text-center relative overflow-hidden"
          style={{ borderRadius: '24px' }}
        >
          {/* Corner accent glow */}
          <div
            className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: 'var(--clr-accent-cyan)', opacity: 0.12 }}
            aria-hidden="true"
          />

          {/* Tag */}
          <div className="section-tag mb-6 inline-flex items-center gap-1.5 justify-center">
            <IconSparkle size={12} />
            <span>Developer Sandbox</span>
          </div>

          {/* Headline */}
          <h2
            className="section-title mb-4"
            style={{ color: 'var(--clr-text-primary)' }}
          >
            Ready to Automate Your Data Flows?
          </h2>

          {/* Subtext */}
          <p
            className="text-base mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--clr-text-secondary)' }}
          >
            Deploy your first AI semantic mapper pipeline in under 5 minutes.
            No credit card required. Includes 10,000 free monthly API runs.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#register" className="btn-primary w-full sm:w-auto justify-center focus-visible:outline">
              <span>Start Free Sandbox</span>
              <IconArrowRight size={16} />
            </a>
            <a href="#docs" className="btn-ghost w-full sm:w-auto justify-center focus-visible:outline">
              <span>Explore Documentation</span>
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="mt-10 flex flex-wrap justify-center items-center gap-6 text-[11px] font-mono"
            style={{ color: 'var(--clr-text-secondary)' }}
          >
            {['SOC 2 CERTIFIED', 'HIPAA COMPLIANT', '256-BIT ENCRYPTION'].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--clr-accent-emerald)' }}
                  aria-hidden="true"
                />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

CTA.displayName = 'CTA';
export default CTA;
