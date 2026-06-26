/**
 * pricingMatrix.js — Single source of truth for all pricing data.
 *
 * RULE: No price value may EVER be hardcoded in JSX/HTML.
 *       Every displayed number must derive from this object at runtime.
 *
 * Structure matches competition spec Section 4.
 */

export const PRICING_MATRIX = {
  /** Base prices in INR (the tariff=1 currency) */
  base: {
    starter:    999,
    pro:       2499,
    enterprise:4999,
  },

  /**
   * Supported currencies.
   * tariff: conversion rate FROM INR.
   * All prices = base[plan] * tariff (then apply annualMultiplier if annual).
   */
  currency: {
    INR: { symbol: '₹', tariff: 1.00,   locale: 'en-IN' },
    USD: { symbol: '$', tariff: 0.0120,  locale: 'en-US' },
    EUR: { symbol: '€', tariff: 0.0110,  locale: 'de-DE' },
  },

  /** Annual billing discount = 20% off */
  annualMultiplier: 0.80,
};

/** Ordered plan keys for consistent rendering */
export const PLAN_KEYS = ['starter', 'pro', 'enterprise'];

/** Display labels per plan */
export const PLAN_META = {
  starter: {
    label:       'Starter',
    description: 'For solo founders and small side projects.',
    cta:         'Start Free Trial',
    popular:     false,
    features: [
      '5 data pipelines',
      '10,000 API calls / month',
      '5 GB storage',
      'Basic analytics dashboard',
      'Email support',
      'REST API access',
    ],
    notIncluded: [
      'AI automation engine',
      'Team collaboration',
      '99.99% SLA',
    ],
  },
  pro: {
    label:       'Pro',
    description: 'For growing teams that need power and flexibility.',
    cta:         'Start Free Trial',
    popular:     true,
    features: [
      'Unlimited data pipelines',
      '500,000 API calls / month',
      '100 GB storage',
      'AI automation engine',
      'Team collaboration (10 seats)',
      'Priority support',
      'Custom integrations',
      'Real-time analytics',
    ],
    notIncluded: [
      'Dedicated infrastructure',
      '99.99% SLA',
    ],
  },
  enterprise: {
    label:       'Enterprise',
    description: 'Enterprise-grade scale with white-glove support.',
    cta:         'Contact Sales',
    popular:     false,
    features: [
      'Unlimited everything',
      'Custom API call limits',
      '10 TB storage',
      'Advanced AI with fine-tuning',
      'Unlimited team seats',
      'Dedicated account manager',
      'Custom SLA (99.99%)',
      'SOC 2 / HIPAA compliance',
      'On-premise deployment option',
      'SSO & SAML 2.0',
    ],
    notIncluded: [],
  },
};
