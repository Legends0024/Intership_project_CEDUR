import { generateClientId } from './utils.js';

const API_BASE = '/api';
const OFFLINE_QUEUE_KEY = 'cedur_offline_leads';

/**
 * Get queued leads waiting to be synced.
 */
function getOfflineQueue() {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save updated offline queue.
 */
function setOfflineQueue(queue) {
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/**
 * Try flushing any leads stored while offline.
 */
export async function flushOfflineQueue() {
  const queue = getOfflineQueue();
  if (queue.length === 0) return;

  const remaining = [];
  for (const item of queue) {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok && res.status >= 500) {
        remaining.push(item);
      }
    } catch {
      remaining.push(item);
    }
  }

  setOfflineQueue(remaining);
  if (remaining.length === 0 && queue.length > 0) {
    console.log('✓ Successfully synced offline leads to server.');
  }
}

// Auto-flush when browser comes back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    flushOfflineQueue();
  });
}

/**
 * Submit a lead or demo request with offline fallback.
 */
export async function submitLead(payload) {
  const fullPayload = {
    ...payload,
    client_id: payload.client_id || generateClientId(),
    source_page: payload.source_page || (typeof window !== 'undefined' ? window.location.pathname : '/'),
  };

  try {
    const response = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullPayload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Server returned ${response.status}`);
    }

    return { success: true, message: data.message || 'Thank you! We will be in touch shortly.' };
  } catch (err) {
    // If offline or network issue, queue for retry
    if (!navigator.onLine || err.name === 'TypeError') {
      const queue = getOfflineQueue();
      queue.push(fullPayload);
      setOfflineQueue(queue);
      return {
        success: true,
        queued: true,
        message: 'Saved offline. Your request will automatically sync once connected.',
      };
    }
    throw err;
  }
}

/**
 * Subscribe email to Cedur updates newsletter.
 */
export async function subscribeNewsletter(email) {
  const response = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Failed to subscribe. Please try again.');
  }

  return { success: true, message: data.message || 'Thanks for subscribing!' };
}

/**
 * Health check endpoint.
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch {
    return { status: 'offline' };
  }
}
