// RE-RENDER SCOPE: Local: scroll state + mobile menu open/close. Never re-renders on pricing changes.
// ANIMATION METHOD: CSS Transition (glass blur/backdrop on scroll, mobile menu fadeInUp)
// ASSET USED: LogoMark, IconMenu, IconClose, CSS variables

import React, { useState, useEffect, useCallback } from 'react';
import { LogoMark, IconMenu, IconClose } from '../assets/svg/icons.jsx';

const NAV_LINKS = [
  { label: 'Features',      href: '#features'      },
  { label: 'Pricing',       href: '#pricing'        },
  { label: 'Testimonials',  href: '#testimonials'   },
];

export const Navbar = React.memo(() => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu  = useCallback(() => setMenuOpen((o) => !o), []);
  const closeMenu   = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <nav
        className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 text-lg font-bold tracking-tight focus-visible:outline"
          style={{ color: 'var(--clr-text-primary)' }}
          aria-label="DataFlow AI — Back to top"
        >
          <LogoMark size={32} />
          <span>
            DataFlow
            <span style={{ color: 'var(--clr-accent-cyan-lt)' }}>AI</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="btn-ghost focus-visible:outline"
            style={{ padding: '8px 20px', fontSize: '0.875rem' }}
          >
            Book a Demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 focus-visible:outline"
          style={{ color: 'var(--clr-text-primary)' }}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav-menu"
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''} md:hidden`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="nav-link text-lg py-3 border-b"
            style={{ borderColor: 'var(--clr-border)' }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#cta"
          onClick={closeMenu}
          className="btn-primary mt-4 text-center justify-center"
        >
          Get Started Free
        </a>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
