// RE-RENDER SCOPE: Static component. Memoized. Never re-renders.
// ANIMATION METHOD: CSS Keyframe (ticker infinite marquee, pause-on-hover)
// ASSET USED: IconStar, IconSparkle, CSS variables

import React from 'react';
import { TESTIMONIALS } from '../utils/testimonials.js';
import { IconStar, IconSparkle } from '../assets/svg/icons.jsx';
import { useIntersection } from '../hooks/useIntersection.js';

export const Testimonials = React.memo(() => {
  useIntersection('.reveal');

  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden"
      aria-label="Customer Testimonials Section"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16 text-center">
        <div className="max-w-3xl mx-auto reveal">
          <div className="section-tag mb-4 inline-flex items-center gap-1.5 justify-center">
            <IconSparkle size={12} />
            <span>Success Stories</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Loved by Developers and Architects
          </h2>
          <p className="text-base text-[var(--clr-text-secondary)] leading-relaxed">
            See how high-growth teams leverage DataFlow AI to accelerate pipeline setup and eliminate data downtime.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Testimonials Marquee */}
      <div className="ticker-mask w-full relative z-10 reveal">
        <div className="testimonials-track" role="list">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <article
              key={`t-${i}`}
              className="testimonial-card flex flex-col justify-between"
              role="listitem"
            >
              <p className="text-xs text-[var(--clr-text-primary)] leading-relaxed italic mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex flex-col gap-4 border-t border-[rgba(255,255,255,0.05)] pt-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border"
                    style={{
                      borderColor: t.accent,
                      backgroundColor: `${t.accent}15`,
                      color: t.accent,
                      boxShadow: `0 0 10px ${t.accent}20`,
                    }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{t.name}</p>
                    <p className="text-[10px] text-[var(--clr-text-secondary)]">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>

                <div
                  className="flex gap-1"
                  role="img"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <IconStar key={si} size={11} filled />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';
export default Testimonials;
