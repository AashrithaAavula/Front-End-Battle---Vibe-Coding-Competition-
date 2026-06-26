// RE-RENDER SCOPE: Static component. Memoized. Never re-renders.
// ANIMATION METHOD: CSS keyframe animations (fadeInUp, float, pulseGlow, ticker)
// ASSET USED: IconSparkle, IconArrowRight, IconPlay, LogoMark

import React from 'react';
import { IconSparkle, IconArrowRight, IconPlay } from '../assets/svg/icons.jsx';

export const Hero = React.memo(() => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-x-hidden hero-grid-bg"
      aria-label="Introduction to DataFlow AI"
    >
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--clr-accent-primary)] opacity-10 rounded-full blur-[120px] pointer-events-none select-none anim-pulse-glow" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[var(--clr-accent-cyan)] opacity-10 rounded-full blur-[100px] pointer-events-none select-none anim-pulse-glow" style={{ animationDelay: '-1.5s' }} aria-hidden="true" />

      {/* Constrained grid — overflow-hidden prevents right-side bleed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column: Headline, CTAs, and Stats */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Version Pill tag */}
          <div className="section-tag mb-6 anim-fade-in-up delay-0" role="status">
            <IconSparkle size={12} />
            <span>Introducing DataFlow AI 2.0</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title mb-6 text-white anim-fade-in-up delay-80">
            Automate Your Data Streams with{' '}
            <span className="gradient-text-shimmer">Natural AI</span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-base sm:text-lg text-[var(--clr-text-secondary)] mb-8 max-w-2xl anim-fade-in-up delay-160">
            Ingest, transform, and orchestrate APIs, files, and databases instantly using natural language pipelines.
            Zero servers to manage, SOC 2 compliant, and scales to millions of records dynamically.
          </p>

          {/* Button Group */}
          <div className="flex flex-wrap items-center gap-4 mb-12 anim-fade-in-up delay-240">
            <a href="#cta" className="btn-primary focus-visible:outline">
              <span>Start Free Trial</span>
              <IconArrowRight size={16} />
            </a>
            <a href="#demo" className="btn-ghost focus-visible:outline">
              <IconPlay size={16} />
              <span>Watch 2-Min Demo</span>
            </a>
          </div>

          {/* Core Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-10 border-t border-[var(--clr-border)] pt-8 w-full anim-fade-in-up delay-320">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white" aria-describedby="stat-setup">10x</p>
              <p id="stat-setup" className="text-xs sm:text-sm text-[var(--clr-text-secondary)]">Faster setup</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[var(--clr-accent-cyan-lt)]" aria-describedby="stat-latency">&lt; 50ms</p>
              <p id="stat-latency" className="text-xs sm:text-sm text-[var(--clr-text-secondary)]">Flow latency</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[var(--clr-accent-emerald)]" aria-describedby="stat-uptime">99.99%</p>
              <p id="stat-uptime" className="text-xs sm:text-sm text-[var(--clr-text-secondary)]">Uptime SLA</p>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Pipeline Animation */}
        <div className="lg:col-span-5 w-full flex justify-center items-center anim-fade-in-up delay-400">
          <div
            className="w-full max-w-[420px] glass-card p-5 flex flex-col justify-between relative overflow-hidden"
            style={{ minHeight: '280px' }}
            aria-label="Interactive visual representation of an active AI data pipeline"
          >
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b border-[var(--clr-border)] pb-3 mb-4 min-w-0">
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <span
                  className="w-2 h-2 flex-shrink-0 rounded-full bg-[var(--clr-accent-emerald)] inline-block"
                  style={{ animation: 'dotBlink 1.5s infinite' }}
                />
                <span className="text-[10px] font-mono text-[var(--clr-text-secondary)] tracking-wider truncate">
                  PIPELINE_ACTIVE // REGION_US_EAST
                </span>
              </div>
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 ml-2"
                style={{
                  background: 'rgba(255,175,92,0.12)',
                  color: 'var(--clr-accent-cyan-lt)',
                  border: '1px solid rgba(255,175,92,0.2)',
                }}
              >
                AUTO_HEAL_ON
              </span>
            </div>

            {/* Pipeline Canvas Area — uses percentage-based SVG paths */}
            <div className="relative flex-grow flex items-center justify-between px-2 py-6">

              {/* Connection Paths (SVG using % coords via viewBox) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M 50 60 H 350" stroke="rgba(255,200,1,0.12)" strokeWidth="3" />
                <path d="M 50 60 H 350" stroke="url(#hero-flow-grad)" strokeWidth="1.5" />

                <defs>
                  <linearGradient id="hero-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--clr-accent-cyan)" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="var(--clr-accent-violet)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--clr-accent-primary)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Moving Data Packet */}
                <circle r="4" fill="var(--clr-accent-primary)">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M 50 60 H 350" />
                </circle>
              </svg>

              {/* Source Node */}
              <div
                className="z-10 rounded-lg p-2.5 text-center shadow-lg w-16 flex flex-col items-center gap-1 anim-float"
                style={{
                  background: 'var(--clr-bg-surface)',
                  border: '1px solid var(--clr-border)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,200,1,0.1)',
                    color: 'var(--clr-accent-primary)',
                    border: '1px solid rgba(255,200,1,0.2)',
                  }}
                >
                  <span className="font-bold text-[9px] font-mono">API</span>
                </div>
                <span className="text-[9px] font-mono text-[var(--clr-text-secondary)] font-bold">Stripe API</span>
              </div>

              {/* Core Processor (AI Agent Mapper) */}
              <div
                className="z-10 rounded-xl p-3 text-center shadow-xl w-28 flex flex-col items-center gap-1.5 relative anim-pulse-glow"
                style={{
                  animationDuration: '4s',
                  background: 'var(--clr-bg-surface)',
                  border: '2px solid var(--clr-accent-primary)',
                }}
              >
                {/* Glowing Aura */}
                <div
                  className="absolute inset-0 rounded-xl blur-md -z-10 pointer-events-none"
                  style={{ background: 'rgba(255,200,1,0.08)' }}
                />

                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,200,1,0.12)',
                    color: 'var(--clr-accent-primary)',
                    border: '1px solid rgba(255,200,1,0.25)',
                  }}
                >
                  <IconSparkle size={16} />
                </div>
                <span className="text-[10px] font-bold text-white tracking-wide">Semantic AI</span>
                <span
                  className="text-[8px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    background: 'rgba(255,200,1,0.08)',
                    color: 'var(--clr-accent-primary)',
                    border: '1px solid rgba(255,200,1,0.15)',
                  }}
                >
                  Transforming
                </span>
              </div>

              {/* Destination Node */}
              <div
                className="z-10 rounded-lg p-2.5 text-center shadow-lg w-16 flex flex-col items-center gap-1 anim-float"
                style={{
                  animationDelay: '-2s',
                  background: 'var(--clr-bg-surface)',
                  border: '1px solid var(--clr-border)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,153,50,0.1)',
                    color: 'var(--clr-accent-cyan)',
                    border: '1px solid rgba(255,153,50,0.2)',
                  }}
                >
                  <span className="font-bold text-[9px] font-mono">DB</span>
                </div>
                <span className="text-[9px] font-mono text-[var(--clr-text-secondary)] font-bold">Snowflake</span>
              </div>

            </div>

            {/* Visual Footer (Console Metrics) */}
            <div className="border-t border-[var(--clr-border)] pt-3 flex justify-between items-center text-[9px] font-mono text-[var(--clr-text-secondary)]">
              <div>
                <span>RATE: </span>
                <span className="text-white font-bold">14,280 rps</span>
              </div>
              <div>
                <span>QUALITY: </span>
                <span style={{ color: 'var(--clr-accent-emerald)' }} className="font-bold">100.0%</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
