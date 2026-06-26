// RE-RENDER SCOPE: Re-renders when activeIndex changes.
// ANIMATION METHOD: WAAPI (svg stroke-dashoffset drawing animation on hover), CSS Transition (translateY, box-shadow)
// ASSET USED: IconMap (IconPipeline, IconIntegrations, etc.), CSS variables for color values

import React from 'react';
import * as Icons from '../../assets/svg/icons.jsx';

// Map string keys from JS data to inline SVGs
const IconMap = {
  IconPipeline:     Icons.IconPipeline,
  IconIntegrations: Icons.IconIntegrations,
  IconAnalytics:    Icons.IconAnalytics,
  IconSecurity:     Icons.IconSecurity,
  IconCollab:       Icons.IconCollab,
  IconScale:        Icons.IconScale,
};

export const BentoGrid = ({ features, activeIndex, setActiveIndex }) => {
  
  // ── WAAPI SVG path draw-on (stroke-dashoffset) ──────────────────────────────
  // Runs on mouseenter of each bento card. Only animates SVG stroke paths.
  // Uses try/catch because rect/circle don't implement getTotalLength in all browsers.
  const handleMouseEnter = (e) => {
    const svg = e.currentTarget.querySelector('svg');
    if (!svg) return;

    const drawables = svg.querySelectorAll('path, rect, circle, ellipse');
    drawables.forEach((el) => {
      let length = 100;
      try {
        // path implements getTotalLength natively in all modern browsers.
        // rect/circle may throw in Firefox — catch and use geometric fallback.
        if (typeof el.getTotalLength === 'function') {
          length = el.getTotalLength();
        } else if (el.tagName === 'circle') {
          const r = parseFloat(el.getAttribute('r') || 10);
          length = 2 * Math.PI * r;
        } else if (el.tagName === 'rect') {
          const w = parseFloat(el.getAttribute('width') || 20);
          const h = parseFloat(el.getAttribute('height') || 20);
          length = 2 * (w + h);
        }
      } catch {
        length = 100;
      }

      // Stamp initial stroke properties so the animation starts from hidden
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;

      // WAAPI: animate from hidden → fully drawn (micro: 200ms ease-out)
      el.animate(
        [
          { strokeDashoffset: `${length}`, opacity: 0.4 },
          { strokeDashoffset: '0',         opacity: 1   },
        ],
        { duration: 200, easing: 'ease-out', fill: 'forwards' }
      );
    });
  };

  // Reset after hover so the draw-on fires fresh next time
  const handleMouseLeave = (e) => {
    const svg = e.currentTarget.querySelector('svg');
    if (!svg) return;
    svg.querySelectorAll('path, rect, circle, ellipse').forEach((el) => {
      // Cancel any running animations then clear inline styles
      el.getAnimations().forEach((anim) => anim.cancel());
      el.style.strokeDasharray = '';
      el.style.strokeDashoffset = '';
    });
  };

  return (
    <div className="bento-grid" role="tablist" aria-label="Product Features Bento Grid">
      {features.map((feature, index) => {
        const IconComponent = IconMap[feature.iconName] || Icons.IconPipeline;
        const isActive = activeIndex === index;
        
        // Custom visual mockups inside the card body depending on feature ID
        let visualMockup = null;
        if (feature.id === 'pipelines') {
          visualMockup = (
            <div className="mt-6 font-mono text-[10px] bg-[var(--clr-bg-surface)] rounded-lg p-3 border border-[rgba(255,255,255,0.05)]">
              <span className="text-[var(--clr-accent-cyan-lt)]">prompt&gt;</span> sync stripe invoices with hubspot customers
              <div className="mt-2 text-[var(--clr-accent-emerald)] flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-accent-emerald)]" />
                <span>AI Agent: Pipeline generated in 0.8s (10x faster)</span>
              </div>
            </div>
          );
        } else if (feature.id === 'integrations') {
          visualMockup = (
            <div className="mt-4 flex items-center justify-between bg-[var(--clr-bg-surface)] rounded-lg p-3 border border-[rgba(255,255,255,0.05)]">
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold" style={{ background: 'rgba(255,153,50,0.12)', color: 'var(--clr-accent-cyan-lt)' }}>Stripe</span>
                <span className="text-[var(--clr-text-secondary)] text-[9px]">→</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold" style={{ background: 'rgba(255,200,1,0.12)', color: 'var(--clr-accent-primary-lt)' }}>HubSpot</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--clr-accent-emerald)] font-bold">Connected</span>
            </div>
          );
        } else if (feature.id === 'analytics') {
          visualMockup = (
            <div className="mt-4 flex items-end gap-1 h-14 bg-[var(--clr-bg-surface)] rounded-lg p-3 border border-[rgba(255,255,255,0.05)] justify-around">
              <div className="w-2.5 h-4 bg-[var(--clr-border)] rounded-sm" />
              <div className="w-2.5 h-6 bg-[var(--clr-border)] rounded-sm" />
              <div className="w-2.5 h-10 bg-[var(--clr-accent-violet)]/40 rounded-sm" />
              <div className="w-2.5 h-7 bg-[var(--clr-border)] rounded-sm" />
              <div className="w-2.5 h-12 bg-[var(--clr-accent-violet)] rounded-sm" />
            </div>
          );
        } else if (feature.id === 'security') {
          visualMockup = (
            <div className="mt-4 flex items-center gap-2 bg-[var(--clr-bg-surface)] rounded-lg p-3 border border-[rgba(255,255,255,0.05)]">
              <Icons.IconCheck size={14} color="var(--clr-accent-emerald)" />
              <span className="text-[10px] font-mono font-bold text-[var(--clr-text-secondary)]">AES-256 Cell Encryption</span>
            </div>
          );
        } else if (feature.id === 'collab') {
          visualMockup = (
            <div className="mt-6 flex flex-col gap-1.5 font-mono text-[9px] bg-[var(--clr-bg-surface)] rounded-lg p-3 border border-[rgba(255,255,255,0.05)]">
              <div className="flex justify-between text-[var(--clr-text-secondary)]">
                <span>commit 7cf82e</span>
                <span className="text-[var(--clr-accent-amber)]">Sarah (Lead BI)</span>
              </div>
              <div className="text-[var(--clr-text-primary)] truncate">&quot;Merge updated webhook schemas&quot;</div>
            </div>
          );
        } else if (feature.id === 'scale') {
          visualMockup = (
            <div className="mt-4 flex flex-col gap-1 bg-[var(--clr-bg-surface)] rounded-lg p-3 border border-[rgba(255,255,255,0.05)]">
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--clr-text-secondary)]">
                <span>THROUGHPUT:</span>
                <span className="text-[var(--clr-accent-red)] font-bold">1.2M rows/s</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.05)] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[var(--clr-accent-red)] h-full w-[85%]" />
              </div>
            </div>
          );
        }

        return (
          <div
            key={feature.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`feature-panel-${feature.id}`}
            id={`feature-tab-${feature.id}`}
            tabIndex={0}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIndex(index);
              }
            }}
            className={`bento-card flex flex-col justify-between ${
              isActive ? 'bento-card--active' : ''
            }`}
            style={{
              borderColor: isActive ? feature.accent : 'var(--clr-border)',
              boxShadow: isActive ? `0 0 30px ${feature.accent}22` : 'var(--shadow-card)',
            }}
          >
            {/* Header Content */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center border border-[rgba(255,255,255,0.05)]"
                  style={{
                    backgroundColor: `${feature.accent}12`,
                    color: feature.accent,
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <span 
                  className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border border-[rgba(255,255,255,0.05)]"
                  style={{
                    color: feature.accent,
                    backgroundColor: `${feature.accent}10`,
                  }}
                >
                  {feature.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-xs text-[var(--clr-text-secondary)] leading-relaxed">
                {isActive ? feature.longDesc : feature.shortDesc}
              </p>
            </div>

            {/* Visual Preview Footer */}
            {visualMockup}
          </div>
        );
      })}
    </div>
  );
};
