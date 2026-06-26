// RE-RENDER SCOPE: Scoped locally to scroll state and mobile-menu open/close state. Parent-level pricing changes will not trigger re-renders.
// ANIMATION METHOD: CSS Transition (navbar glass blur and mobile slide-down)
// ASSET USED: LogoMark, IconMenu, IconClose

import React, { useState, useEffect } from 'react';
import { LogoMark, IconMenu, IconClose } from '../../assets/svg/icons.jsx';

export const Navbar = React.memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" aria-label="Main Navigation">
        {/* Logo Section */}
        <a href="#hero" className="flex items-center gap-3 text-lg font-bold tracking-tight text-white focus-visible:outline" aria-label="DataFlow AI Home">
          <LogoMark size={32} />
          <span>
            DataFlow<span className="text-[var(--clr-accent-cyan-lt)]">AI</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#cta" className="btn-ghost focus-visible:outline" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
            Book a Demo
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden p-2 text-[var(--clr-text-primary)] hover:text-white transition-colors duration-200 focus-visible:outline"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {menuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div
        id="mobile-navigation-menu"
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''} md:hidden`}
        aria-hidden={!menuOpen}
      >
        <a href="#features" onClick={() => setMenuOpen(false)} className="nav-link text-lg py-3 border-b border-[var(--clr-border)]">
          Features
        </a>
        <a href="#pricing" onClick={() => setMenuOpen(false)} className="nav-link text-lg py-3 border-b border-[var(--clr-border)]">
          Pricing
        </a>
        <a href="#testimonials" onClick={() => setMenuOpen(false)} className="nav-link text-lg py-3 border-b border-[var(--clr-border)]">
          Testimonials
        </a>
        <a
          href="#cta"
          onClick={() => setMenuOpen(false)}
          className="btn-primary mt-4 text-center justify-center"
        >
          Get Started Free
        </a>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';
