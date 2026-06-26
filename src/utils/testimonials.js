/**
 * testimonials.js — Static structured content for the customer testimonials marquee.
 * RE-RENDER SCOPE: Static config file
 * ANIMATION METHOD: None
 * ASSET USED: None
 */

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'VP of Engineering',
    company: 'SaaSify',
    initials: 'SJ',
    text: 'DataFlow AI cut our data pipeline setup from 2 weeks to under an hour. The AI schema mapping is incredibly accurate, saving our team countless hours of manual debugging.',
    rating: 5,
    accent: 'var(--clr-accent-primary)',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'CTO',
    company: 'FinTech Scale',
    initials: 'MC',
    text: 'The serverless orchestration is flawless. We scale up to 10M events daily during peak hours, and it automatically scales down to zero. The cost savings were immediate.',
    rating: 5,
    accent: 'var(--clr-accent-cyan)',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Head of Data',
    company: 'LogiGlobal',
    initials: 'ER',
    text: 'With SOC2 and cell-level decryption built-in, we migrated our entire logistics logs pipeline to DataFlow. Absolute peace of mind and bulletproof security.',
    rating: 5,
    accent: 'var(--clr-accent-violet)',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Lead Architect',
    company: 'CloudNexus',
    initials: 'DK',
    text: 'The version control and collaborative workspace changed how our data and product teams work together. Zero schema conflicts since onboarding.',
    rating: 5,
    accent: 'var(--clr-accent-emerald)',
  },
  {
    id: 5,
    name: 'Amanda Ross',
    role: 'Director of BI',
    company: 'RetailFlow',
    initials: 'AR',
    text: 'We connect raw APIs from 50+ vendors instantly. The semantic mapping engine handles all translation layers automatically. It has transformed our reporting speed.',
    rating: 5,
    accent: 'var(--clr-accent-amber)',
  },
  {
    id: 6,
    name: 'Liam O\'Connor',
    role: 'Infrastructure Lead',
    company: 'ThreatX',
    initials: 'LO',
    text: 'Uptime has been a perfect 99.99% for 6 months straight. When an upstream API changes its payload, DataFlow\'s auto-healing schema intercepts and corrects it.',
    rating: 5,
    accent: 'var(--clr-accent-red)',
  },
];
