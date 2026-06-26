// RE-RENDER SCOPE: Re-renders active item when activeIndex switches.
// ANIMATION METHOD: CSS Transition (max-height based on scrollHeight)
// ASSET USED: IconChevronDown, Custom icons, CSS Variables

import React, { useRef, useState, useEffect } from 'react';
import * as Icons from '../../assets/svg/icons.jsx';

const IconMap = {
  IconPipeline:     Icons.IconPipeline,
  IconIntegrations: Icons.IconIntegrations,
  IconAnalytics:    Icons.IconAnalytics,
  IconSecurity:     Icons.IconSecurity,
  IconCollab:       Icons.IconCollab,
  IconScale:        Icons.IconScale,
};

const AccordionItem = ({ feature, isActive, onClick }) => {
  const panelRef = useRef(null);
  const [height, setHeight] = useState(0);
  const IconComponent = IconMap[feature.iconName] || Icons.IconPipeline;

  // Dynamically compute scrollHeight to ensure smooth transition to exact auto height
  useEffect(() => {
    if (panelRef.current) {
      setHeight(isActive ? panelRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <div 
      className={`accordion-item ${isActive ? 'accordion-item--active' : ''}`}
      style={{
        borderColor: isActive ? feature.accent : 'var(--clr-border)',
      }}
    >
      {/* Accordion Trigger Header */}
      <button
        type="button"
        className="accordion-trigger"
        onClick={onClick}
        aria-expanded={isActive}
        aria-controls={`panel-${feature.id}`}
        id={`trigger-${feature.id}`}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-[rgba(255,255,255,0.05)]"
            style={{
              backgroundColor: `${feature.accent}12`,
              color: feature.accent,
            }}
          >
            <IconComponent size={16} />
          </div>
          <span>{feature.title}</span>
        </div>
        <Icons.IconChevronDown size={14} className="accordion-chevron" />
      </button>

      {/* Accordion Panel Body */}
      <div
        id={`panel-${feature.id}`}
        role="region"
        aria-labelledby={`trigger-${feature.id}`}
        className="accordion-panel"
        style={{
          '--panel-max-height': `${height}px`,
        }}
      >
        <div ref={panelRef} className="accordion-panel-inner">
          <div 
            className="text-[10px] font-bold uppercase tracking-wider mb-2"
            style={{ color: feature.accent }}
          >
            {feature.tag}
          </div>
          <p className="mb-4 text-xs text-[var(--clr-text-secondary)] leading-relaxed">
            {feature.longDesc}
          </p>

          {/* Simple Inline Indicator of stats */}
          <div className="flex gap-4 p-3 bg-[rgba(255,255,255,0.02)] rounded border border-[rgba(255,255,255,0.03)] items-center">
            <span className="text-lg font-black text-white">{feature.stat}</span>
            <span className="text-[10px] text-[var(--clr-text-secondary)]">{feature.statLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Accordion = ({ features, activeIndex, setActiveIndex }) => {
  return (
    <div className="accordion-list">
      {features.map((feature, index) => (
        <AccordionItem
          key={feature.id}
          feature={feature}
          isActive={activeIndex === index}
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};
