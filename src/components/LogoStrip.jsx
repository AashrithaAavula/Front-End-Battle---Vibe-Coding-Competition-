// RE-RENDER SCOPE: Static component. Memoized. Never re-renders.
// ANIMATION METHOD: CSS Keyframe (ticker animation in globals.css, pauses on hover)
// ASSET USED: Custom inline SVGs representing partner logos, CSS variables

import React from 'react';
import { useIntersection } from '../hooks/useIntersection.js';

const LOGO_ASSETS = [
  {
    name: 'Stripe',
    svg: (
      <svg width="72" height="22" viewBox="0 0 84 24" fill="currentColor" aria-hidden="true" role="presentation">
        <path d="M12.3 9.7c0-2.8 2.2-4.1 5.3-4.1 1.7 0 3.3.4 4.5 1.1v4c-1.3-.7-2.7-1.1-4-.1-1.3 0-2.1.6-2.1 1.6 0 2.2 6.5 1.6 6.5 6.6 0 3.3-2.6 4.8-6.1 4.8-1.9 0-3.8-.5-5.1-1.3v-4.3c1.5 1 3.2 1.5 4.8 1.5 1.5 0 2.4-.6 2.4-1.6.1-2.4-6.3-1.6-6.3-6.7zM29.5 5.8V2.1L35 1v4.8h4v3.8h-4v9.6c0 1.2.6 1.8 1.8 1.8.8 0 1.5-.2 2.1-.5v3.7c-.9.4-2.1.6-3.4.6-3.6 0-4.6-1.8-4.6-5.5V9.6h-3.1V5.8h3.1zM42.2 5.8h5.3v2c1-1.5 2.8-2.3 4.8-2.3.8 0 1.5.1 2 .4v5.3c-.8-.4-1.7-.5-2.6-.5-3.3 0-4.2 1.9-4.2 4.6v6.3h-5.3V5.8zM57.6 2.2c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7-1.2 2.7-2.7 2.7-2.7-1.2-2.7-2.7zm.1 3.6h5.3v17.8h-5.3V5.8zM68.5 5.8h5.3v2c1.3-1.6 3.1-2.3 5-2.3 3.9 0 6.6 2.7 6.6 7.4 0 5-3.1 7.6-6.6 7.6-1.9 0-3.6-.8-4.9-2.2v8h-5.4V5.8zm5.3 7.3c0 2.5 1.5 3.8 3.4 3.8 1.9 0 3.3-1.3 3.3-3.8s-1.4-3.8-3.3-3.8c-1.9 0-3.4 1.3-3.4 3.8z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    svg: (
      <svg width="80" height="22" viewBox="0 0 212 44" fill="currentColor" aria-hidden="true" role="presentation">
        <path d="M26.0 2L52 46H0L26 2z" />
        <path d="M73 33V11h20.5c3.5 0 6 2.3 6 5.5 0 2.2-1.2 4-3 4.8 2.2.7 3.7 2.7 3.7 5.2 0 3.8-2.7 6.5-6.8 6.5H73zm5.5-13h14.7c.8 0 1.4-.6 1.4-1.3 0-.8-.6-1.4-1.4-1.4H78.5v2.7zm0 8.8h15.3c1 0 1.7-.7 1.7-1.7s-.7-1.7-1.7-1.7H78.5v3.4zM106.6 33.4c-7.2 0-11-4.4-11-11.5s3.8-11.5 11-11.5 11 4.4 11 11.5-3.8 11.5-11 11.5zm0-4.8c3.5 0 5.3-2.4 5.3-6.7s-1.8-6.7-5.3-6.7c-3.5 0-5.3 2.4-5.3 6.7s1.8 6.7 5.3 6.7zM133.8 33.4c-6.8 0-11-4.4-11-11.5s4.2-11.5 11-11.5c5.5 0 9.5 3 10.5 8h-5.7c-.7-1.8-2.3-3-4.8-3-3.5 0-5.3 2.4-5.3 6.5s1.8 6.5 5.3 6.5c2.5 0 4.1-1.2 4.8-3h5.7c-1 5-5 8-10.5 8zM163 33l-8-11.2V33h-5.5V11h5.5v10.5L163 11h6.3l-9 11 9.8 11H163zM171 33V11h19.5v4.8H176.5V20h13v4.5h-13v3.8h14v4.7H171zM200 33V15.8h-7.5V11H213v4.8h-7.5V33H200z" />
      </svg>
    ),
  },
  {
    name: 'Snowflake',
    svg: (
      <svg width="120" height="22" viewBox="0 0 170 36" fill="currentColor" aria-hidden="true" role="presentation">
        <path d="M13 4l3 5.2L19 4l2 1.2-3 5.2 6 0 0 2.3-6 0 3 5.2-2 1.2-3-5.2-3 5.2-2-1.2 3-5.2-6 0 0-2.3 6 0-3-5.2L13 4z" />
        <path d="M39 28V8h7.3c5.5 0 9 3.5 9 10s-3.5 10-9 10H39zm3.7-3.4h3.5c3.3 0 5.3-2.2 5.3-6.6s-2-6.6-5.3-6.6h-3.5v13.2zM57.5 28V8h13v3.3h-9.3v4.5H70v3.2h-8.8v5.7H71V28zM79.5 28.4c-3.7 0-6.4-1.3-8.3-4l2.7-2.2c1.4 2 3.3 3 5.7 3 2.5 0 3.8-1 3.8-2.5 0-1.6-1.2-2.2-4.2-2.8l-1-.2c-4.4-.9-6.3-2.7-6.3-5.9 0-3.5 2.7-5.8 7-5.8 3.2 0 5.8 1.2 7.5 3.4l-2.7 2.1c-1.2-1.7-2.8-2.4-4.8-2.4-2 0-3.3.9-3.3 2.4 0 1.4 1 2.1 3.8 2.7l1 .2c4.5.9 6.7 2.7 6.7 6 0 3.8-2.9 6-7.6 6zM98 28.4c-5.8 0-9.4-3.7-9.4-10.4S92.2 7.6 98 7.6c4.5 0 7.7 2.4 8.9 6.6h-3.9c-.8-2.1-2.6-3.3-5-3.3-3.5 0-5.6 2.5-5.6 7s2.1 7 5.6 7c2.4 0 4.2-1.2 5-3.3h3.9C105.7 26 102.5 28.4 98 28.4zM110 28V8h3.7v8.6h9.5V8h3.7v20H123.2v-8H113.7v8H110zM130 28V8h13v3.3h-9.3v4.5H143v3.2h-8.3v5.7h9.8V28H130zM150 28l-8-20h4l5.8 15.5L157.8 8h4L154 28H150zM164 28V8h13v3.3h-9.3v4.5H177v3.2h-8.3v5.7h9.8V28H164z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    svg: (
      <svg width="72" height="22" viewBox="0 0 80 28" fill="currentColor" aria-hidden="true" role="presentation">
        <path d="M4 7a3 3 0 013-3h3v6H7a3 3 0 01-3-3zM4 14a3 3 0 013-3h3v6H7a3 3 0 01-3-3zM7 17h3v6a3 3 0 01-3 0 3 3 0 01-3-3 3 3 0 013-3zM10 4h3a3 3 0 013 3 3 3 0 01-3 3h-3V4zM13 10h3a3 3 0 013 3 3 3 0 01-3 3h-3V10z" />
        <text x="25" y="21" fontStyle="normal" fontWeight="800" fontSize="15" letterSpacing="0.04em">FIGMA</text>
      </svg>
    ),
  },
  {
    name: 'Linear',
    svg: (
      <svg width="80" height="22" viewBox="0 0 96 28" fill="currentColor" aria-hidden="true" role="presentation">
        <path d="M4 14a10 10 0 0110-10l.5.02-9.52 9.52A10.04 10.04 0 014 14zm.82 3.54l9.7-9.71.48.48-9.7 9.7a10.17 10.17 0 01-.48-.47zm1.28 2.11l9.22-9.22.47.47-9.22 9.22-.47-.47zM14 4a10 10 0 110 20A10 10 0 0114 4z" />
        <text x="30" y="21" fontStyle="normal" fontWeight="800" fontSize="15" letterSpacing="0.04em">LINEAR</text>
      </svg>
    ),
  },
  {
    name: 'Notion',
    svg: (
      <svg width="80" height="22" viewBox="0 0 96 28" fill="currentColor" aria-hidden="true" role="presentation">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M9 9h6m-6 5h10m-10 5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <text x="30" y="21" fontStyle="normal" fontWeight="800" fontSize="15" letterSpacing="0.04em">NOTION</text>
      </svg>
    ),
  },
];

export const LogoStrip = React.memo(() => {
  useIntersection('.reveal');

  return (
    <section
      className="py-12 border-y border-[var(--clr-border)] bg-[rgba(10,18,32,0.3)] select-none reveal"
      aria-label="Companies trusted by DataFlow AI"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-[var(--clr-text-secondary)] mb-8">
          Trusted by high-growth engineering teams worldwide
        </p>

        {/* Infinite Horizontal Ticker */}
        <div className="ticker-mask w-full">
          <div className="ticker-track">
            {LOGO_ASSETS.map((logo, i) => (
              <div
                key={`a-${i}`}
                className="text-[var(--clr-text-secondary)] hover:text-white flex items-center justify-center"
                style={{ transition: 'color var(--dur-micro) var(--ease-out)' }}
                aria-label={logo.name}
              >
                {logo.svg}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {LOGO_ASSETS.map((logo, i) => (
              <div
                key={`b-${i}`}
                className="text-[var(--clr-text-secondary)] hover:text-white flex items-center justify-center"
                style={{ transition: 'color var(--dur-micro) var(--ease-out)' }}
                aria-label={logo.name}
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

LogoStrip.displayName = 'LogoStrip';
export default LogoStrip;
