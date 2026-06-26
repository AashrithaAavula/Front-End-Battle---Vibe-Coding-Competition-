// RE-RENDER SCOPE: App root. Re-renders only when lazy chunks first resolve.
// ANIMATION METHOD: None
// ASSET USED: None

import React, { lazy, Suspense } from 'react';

// ─── Eagerly loaded (above the fold) ─────────────────────────────────────────
import { Navbar }         from './components/Navbar.jsx';
import { Hero }           from './components/Hero.jsx';
import { useIntersection } from './hooks/useIntersection.js';

// ─── Lazily loaded — Section 8 canonical flat paths ──────────────────────────
const LogoStrip    = lazy(() => import('./components/LogoStrip.jsx')        .then((m) => ({ default: m.LogoStrip    })));
const Features     = lazy(() => import('./components/FeatureSection/index.jsx').then((m) => ({ default: m.Features     })));
const Pricing      = lazy(() => import('./components/PricingSection/index.jsx').then((m) => ({ default: m.Pricing      })));
const Testimonials = lazy(() => import('./components/Testimonials.jsx')     .then((m) => ({ default: m.Testimonials })));
const CTA          = lazy(() => import('./components/CTA.jsx')              .then((m) => ({ default: m.CTA          })));
const Footer       = lazy(() => import('./components/Footer.jsx')           .then((m) => ({ default: m.Footer       })));

// ─── Minimal skeleton (prevents CLS while chunks load) ───────────────────────
function SectionFallback() {
  return (
    <div
      className="w-full min-h-[320px] flex items-center justify-center"
      style={{ background: 'var(--clr-bg-base)' }}
      aria-busy="true"
      aria-label="Loading section"
    >
      <div
        style={{
          width: 28, height: 28,
          borderRadius: '50%',
          border: '2px solid var(--clr-border)',
          borderTopColor: 'var(--clr-accent-cyan-lt)',
          animation: 'spin 0.75s linear infinite',
        }}
      />
    </div>
  );
}

export default function App() {
  // Boot IntersectionObserver for .reveal elements in the eagerly-loaded Hero section.
  // Each lazy section calls useIntersection independently after its own mount.
  useIntersection('.reveal');

  return (
    <>
      {/* ── Skip-to-content (keyboard / screen-reader) ──────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:btn-primary"
      >
        Skip to main content
      </a>

      {/* ── Persistent sticky header ─────────────────────────────────── */}
      <Navbar />

      {/* ── Primary content landmark ─────────────────────────────────── */}
      <main id="main-content" role="main">
        {/* Above-fold: eager — no Suspense boundary */}
        <Hero />

        {/* Below-fold: lazy — each section in its own Suspense so one
            slow chunk never blocks the others from rendering */}
        <Suspense fallback={<SectionFallback />}><LogoStrip /></Suspense>
        <Suspense fallback={<SectionFallback />}><Features /></Suspense>
        <Suspense fallback={<SectionFallback />}><Pricing /></Suspense>
        <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
        <Suspense fallback={<SectionFallback />}><CTA /></Suspense>
      </main>

      {/* ── Footer landmark ──────────────────────────────────────────── */}
      <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
    </>
  );
}
