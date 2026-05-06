import type { FormData } from '../types';

/**
 * Booking submission client.
 *
 * Posts the booking payload to the configured backend. Order of preference:
 *   1. VITE_BOOKING_ENDPOINT  — Google Apps Script Web App URL
 *   2. VITE_FORMSPREE_ENDPOINT — Formspree fallback (https://formspree.io/f/xxxxxxxx)
 *
 * Google Apps Script note:
 *   Apps Script Web Apps reject preflight (OPTIONS) requests, so we MUST send the
 *   request as a "simple" CORS request. That means:
 *     - method: 'POST'
 *     - Content-Type: 'text/plain;charset=utf-8'  (do NOT use application/json)
 *     - body: JSON.stringify(payload) (Apps Script reads this from e.postData.contents)
 *   The companion Apps Script (see google-apps-script/Code.gs) parses the body
 *   with JSON.parse(e.postData.contents) and appends a row to your Google Sheet.
 */

export interface BookingPayload extends FormData {
  submittedAt: string;
  source: string;
  userAgent: string;
}

export interface SubmitResult {
  ok: boolean;
  status: number;
  body?: unknown;
  error?: string;
}

const BOOKING_ENDPOINT = import.meta.env.VITE_BOOKING_ENDPOINT?.trim();
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();

function buildPayload(formData: FormData): BookingPayload {
  return {
    ...formData,
    submittedAt: new Date().toISOString(),
    source: 'exoticcloudz.web',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  };
}

async function postToAppsScript(url: string, payload: BookingPayload): Promise<SubmitResult> {
  // Apps Script requires a "simple" request to avoid CORS preflight.
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  let body: unknown = null;
  const text = await res.text();
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  return { ok: res.ok, status: res.status, body };
}

async function postToFormspree(url: string, payload: BookingPayload): Promise<SubmitResult> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* ignore */
  }
  return { ok: res.ok, status: res.status, body };
}

export async function submitBooking(formData: FormData): Promise<SubmitResult> {
  const payload = buildPayload(formData);

  // 1) Google Apps Script (primary integration with Google Workspace / Sheets / Gmail)
  if (BOOKING_ENDPOINT && /^https:\/\/script\.google\.com\//.test(BOOKING_ENDPOINT)) {
    try {
      return await postToAppsScript(BOOKING_ENDPOINT, payload);
    } catch (err) {
      return {
        ok: false,
        status: 0,
        error: err instanceof Error ? err.message : 'Network error contacting Apps Script',
      };
    }
  }

  // 2) Formspree fallback
  if (FORMSPREE_ENDPOINT && /^https:\/\/formspree\.io\/f\//.test(FORMSPREE_ENDPOINT)) {
    try {
      return await postToFormspree(FORMSPREE_ENDPOINT, payload);
    } catch (err) {
      return {
        ok: false,
        status: 0,
        error: err instanceof Error ? err.message : 'Network error contacting Formspree',
      };
    }
  }

  // No endpoint configured — fail loudly so this never silently "succeeds" in prod.
  return {
    ok: false,
    status: 0,
    error:
      'No booking endpoint configured. Set VITE_BOOKING_ENDPOINT (Apps Script) or VITE_FORMSPREE_ENDPOINT in your environment.',
  };
}
