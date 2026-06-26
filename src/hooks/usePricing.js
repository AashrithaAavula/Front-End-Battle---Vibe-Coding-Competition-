// RE-RENDER SCOPE: Computes price details only when parameters (planKey, currencyCode, billing) change.
// ANIMATION METHOD: None
// ASSET USED: None

import { useMemo } from 'react';
import { computePrice } from '../utils/currency.js';

/**
 * Custom hook to compute and memoize plan pricing details.
 * 
 * @param {'starter'|'pro'|'enterprise'} planKey
 * @param {'INR'|'USD'|'EUR'} currencyCode
 * @param {'monthly'|'annual'} billing
 */
export function usePricing(planKey, currencyCode, billing) {
  return useMemo(() => {
    return computePrice(planKey, currencyCode, billing);
  }, [planKey, currencyCode, billing]);
}
