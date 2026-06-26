/**
 * currency.js — Pure price computation helpers.
 * No React. No side-effects. Fully deterministic.
 *
 * All calculations derive from PRICING_MATRIX — zero hardcoded values.
 */
import { PRICING_MATRIX } from '../data/pricingMatrix.js';

/**
 * Compute the displayed price for a plan.
 *
 * @param {'starter'|'pro'|'enterprise'} planKey
 * @param {'INR'|'USD'|'EUR'} currencyCode
 * @param {'monthly'|'annual'} billing
 * @returns {{
 *   raw:         number,    // exact float before formatting
 *   formatted:   string,    // e.g. "₹1,999" or "$23.99"
 *   perLabel:    string,    // "/month" or "/year"
 *   moLabel:     string|null // "≈ ₹166/mo" shown when annual
 *   savingsPct:  number,    // 20 (only when annual, else 0)
 * }}
 */
export function computePrice(planKey, currencyCode, billing) {
  const base = PRICING_MATRIX.base[planKey];
  const { symbol, tariff, locale } = PRICING_MATRIX.currency[currencyCode];
  const multiplier =
    billing === 'annual' ? PRICING_MATRIX.annualMultiplier : 1;
  const scale = billing === 'annual' ? 12 : 1;

  const raw = base * tariff * multiplier * scale;

  // Round to sensible decimal places per currency
  const decimals = currencyCode === 'INR' ? 0 : 2;
  const rounded  = parseFloat(raw.toFixed(decimals));

  const formatted = formatAmount(rounded, symbol, locale, decimals);

  // Monthly-equivalent label for annual billing
  let moLabel = null;
  if (billing === 'annual') {
    const mo = parseFloat((rounded / 12).toFixed(decimals));
    moLabel = `≈ ${formatAmount(mo, symbol, locale, decimals)}/mo`;
  }

  return {
    raw:        rounded,
    formatted,
    perLabel:   billing === 'annual' ? '/year' : '/month',
    moLabel,
    savingsPct: billing === 'annual' ? Math.round((1 - PRICING_MATRIX.annualMultiplier) * 100) : 0,
  };
}

/** Format a numeric amount with symbol */
function formatAmount(value, symbol, locale, decimals) {
  try {
    const numStr = value.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${symbol}${numStr}`;
  } catch {
    return `${symbol}${value}`;
  }
}

/** Get all supported currency codes */
export const CURRENCY_CODES = Object.keys(PRICING_MATRIX.currency);
