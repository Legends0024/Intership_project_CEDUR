import { clsx } from 'clsx';

/**
 * Merge CSS class names safely.
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Format numbers as Indian Rupee currency (e.g. ₹3,945).
 */
export function formatINR(amount, options = {}) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: options.fractionDigits ?? 0,
    ...options,
  }).format(amount);
}

/**
 * Generate a UUIDv4-like client identifier for offline idempotency.
 */
export function generateClientId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'cid_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
}
