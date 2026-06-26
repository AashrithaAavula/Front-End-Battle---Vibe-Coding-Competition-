/**
 * pricingStore.js — Pub-sub store to handle currency and billing cycle changes.
 * Allows components to reactive-update only their targeted text nodes or toggle controls,
 * completely avoiding layout re-paints or section component re-renders.
 *
 * RE-RENDER SCOPE: Global pricing pub-sub store
 * ANIMATION METHOD: None
 * ASSET USED: None
 */

class PricingStore {
  constructor() {
    this.listeners = new Set();
    this.state = {
      currency: 'USD',
      billing: 'monthly',
    };
  }

  /** Subscribe to store state changes */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Update state and notify all subscribers */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  /** Get the current state snapshots */
  getState() {
    return this.state;
  }
}

export const pricingStore = new PricingStore();
