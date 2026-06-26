// RE-RENDER SCOPE: Static component. Memoized. Never re-renders.
// ANIMATION METHOD: CSS Transition (hover link color change, var(--dur-micro))
// ASSET USED: LogoMark, CSS variables

import React from 'react';
import { LogoMark } from '../assets/svg/icons.jsx';

const NAV_COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing Plans', href: '#pricing' },
      { label: 'Trust & Security', href: '#security' },
      { label: 'Uptime Status', href: '#status' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'API Reference', href: '#docs' },
      { label: 'Guides & Tutorials', href: '#docs' },
      { label: 'Blog & News', href: '#blog' },
      { label: 'Careers', href: '#careers' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Data Processing DPA', href: '#dpa' },
      { label: 'Subprocessors', href: '#subprocessors' },
    ],
  },
];

export const Footer = React.memo(() => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[rgba(5,11,24,0.6)] border-t border-[var(--clr-border)] py-16 relative overflow-hidden"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">

        {/* Brand column */}
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <a
            href="#hero"
            className="flex items-center gap-3 text-lg font-bold tracking-tight text-white focus-visible:outline"
            aria-label="DataFlow AI — Back to top"
          >
            <LogoMark size={28} />
            <span>
              DataFlow<span style={{ color: 'var(--clr-accent-cyan-lt)' }}>AI</span>
            </span>
          </a>

          <p className="text-xs text-[var(--clr-text-secondary)] max-w-sm leading-relaxed">
            The next-generation AI-powered data automation and orchestration engine.
            Ingest, format, and sync semantic records safely and instantly.
          </p>

          {/* Compliance badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            {['SOC 2', 'HIPAA', 'GDPR', 'ISO 27001'].map((badge) => (
              <span
                key={badge}
                className="text-[9px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded border"
                style={{
                  borderColor: 'var(--clr-border)',
                  color: 'var(--clr-text-muted)',
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-[10px] text-[var(--clr-text-muted)] font-mono mt-4">
            &copy; {year} DataFlow AI Technologies Inc. All rights reserved.
          </p>
        </div>

        {/* Link columns */}
        <nav
          className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8"
          aria-label="Footer navigation"
        >
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-xs font-bold uppercase tracking-wider mb-4"
                style={{ color: 'var(--clr-text-primary)' }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs"
                      style={{
                        color: 'var(--clr-text-secondary)',
                        transition: 'color var(--dur-micro) var(--ease-out)',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--clr-text-primary)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--clr-text-secondary)')
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
