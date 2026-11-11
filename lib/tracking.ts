// Client-side attribution + dataLayer helpers.

export const ATTR_KEYS = [
  "gclid", "gbraid", "wbraid", "fbclid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
] as const;

export type Attribution = Partial<Record<(typeof ATTR_KEYS)[number] | "landing_page" | "referrer" | "first_seen", string>>;

const COOKIE = "msu_attr";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days = Google Ads click-ID lookback

declare global {
  interface Window { dataLayer: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void }
}

export function pushDL(obj: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

export function readAttribution(): Attribution {
  if (typeof document === "undefined") return {};
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!m) return {};
  try { return JSON.parse(decodeURIComponent(m[1])); } catch { return {}; }
}

function writeAttribution(a: Attribution) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(a))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

/** Call once per page load. Click IDs/UTMs from a new ad click overwrite old ones; first landing info is kept. */
export function captureAttribution() {
  const params = new URLSearchParams(location.search);
  const prev = readAttribution();
  const fresh: Attribution = {};
  for (const k of ATTR_KEYS) {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 500);
  }
  const hasNewClick = Object.keys(fresh).length > 0;
  const next: Attribution = hasNewClick
    ? { ...fresh, landing_page: location.href.slice(0, 500), referrer: document.referrer.slice(0, 300), first_seen: new Date().toISOString() }
    : prev.first_seen ? prev : { landing_page: location.href.slice(0, 500), referrer: document.referrer.slice(0, 300), first_seen: new Date().toISOString() };
  writeAttribution(next);
}

export function waLink(text: string, phone: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
