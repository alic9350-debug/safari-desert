// Cloudflare Pages Function: GET /api/conversions.csv
// Google Ads "scheduled upload from HTTPS" reads this file (Basic auth) and imports
// offline conversions for leads your team moved forward in the GHL pipeline:
//   - "Safari – Qualified Lead"    : opportunity reached "Quoted on WhatsApp" or later
//   - "Safari – Booking Confirmed" : opportunity reached "Booking Confirmed" or later (or status won), value = opportunity value
// Rows carry the Google click ID when we have it, plus SHA-256 hashed email/phone
// (Enhanced conversions for leads) so leads without a click ID can still match.
// Conversion times are derived from the opportunity creation time so they stay stable
// between fetches (Google de-duplicates identical click ID + name + time rows).

interface Env {
  GHL_API_TOKEN: string;
  GHL_LOCATION_ID: string;
  GHL_PIPELINE_ID: string;
  CONVERSIONS_PASSWORD?: string;
}

const GHL = "https://services.leadconnectorhq.com";
const USER = "googleads";
const GCLID_FIELD = "48NcdVVq9tDF4SH7Jyd3"; // contact.google_click_id

const STAGE = {
  quoted: "4bc2e20a-3605-47f9-838e-1a80f3783d69",
  booked: "a854b13d-f94c-4110-904f-09652b44d08d",
  tour: "57525c9a-ad53-42e9-99a7-48fb0ca9b376",
  paid: "148bd3f1-60d7-419a-886f-a075e46c32cb",
  review: "d0d9915d-f0c3-468a-be6a-4df117b90b45",
};
const QUALIFIED = new Set([STAGE.quoted, STAGE.booked, STAGE.tour, STAGE.paid, STAGE.review]);
const BOOKED = new Set([STAGE.booked, STAGE.tour, STAGE.paid, STAGE.review]);

export const NAMES = { qualified: "Safari – Qualified Lead", booked: "Safari – Booking Confirmed" };
const LOOKBACK_DAYS = 85; // Google accepts click conversions up to 90 days after the click
const MAX_CONTACT_LOOKUPS = 40; // Workers free plan: 50 outbound requests per invocation

const hdrs = (env: Env) => ({ Authorization: `Bearer ${env.GHL_API_TOKEN}`, Version: "2021-07-28", Accept: "application/json" });

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** "yyyy-MM-dd HH:mm:ss" in Dubai time (UTC+4, no DST). */
function dubaiTime(ms: number) {
  return new Date(ms + 4 * 3600_000).toISOString().replace("T", " ").slice(0, 19);
}

const csvCell = (v: string | number) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function authorized(request: Request, env: Env) {
  const h = request.headers.get("Authorization") || "";
  if (!h.startsWith("Basic ") || !env.CONVERSIONS_PASSWORD) return false;
  let decoded = "";
  try { decoded = atob(h.slice(6)); } catch { return false; }
  const i = decoded.indexOf(":");
  const user = decoded.slice(0, i), pass = decoded.slice(i + 1);
  // constant-time-ish compare
  const a = new TextEncoder().encode(`${user}:${pass}`), b = new TextEncoder().encode(`${USER}:${env.CONVERSIONS_PASSWORD}`);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let k = 0; k < a.length; k++) diff |= a[k] ^ b[k];
  return diff === 0;
}

type Opp = { id: string; status: string; pipelineStageId: string; monetaryValue?: number; createdAt: string; contactId: string; contact?: { email?: string; phone?: string } };

export type Only = "qualified" | "booked" | undefined;

export async function buildCsv(env: Env, now = Date.now(), only: Only = undefined) {
  const since = now - LOOKBACK_DAYS * 86400_000;
  const opps: Opp[] = [];
  for (let page = 1; page <= 5; page++) {
    const url = `${GHL}/opportunities/search?location_id=${env.GHL_LOCATION_ID}&pipeline_id=${env.GHL_PIPELINE_ID}&limit=100&page=${page}`;
    const res = await fetch(url, { headers: hdrs(env) });
    if (!res.ok) throw new Error(`GHL search ${res.status}`);
    const data = (await res.json()) as { opportunities?: Opp[] };
    const batch = data.opportunities || [];
    opps.push(...batch);
    if (batch.length < 100) break;
  }

  const eligible = opps
    .filter((o) => o.status !== "lost" && o.status !== "abandoned")
    .filter((o) => QUALIFIED.has(o.pipelineStageId) || o.status === "won")
    .filter((o) => Date.parse(o.createdAt) >= since)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, MAX_CONTACT_LOOKUPS);

  const rows: string[][] = [];
  for (const o of eligible) {
    let gclid = "";
    let email = o.contact?.email || "";
    let phone = o.contact?.phone || "";
    const cr = await fetch(`${GHL}/contacts/${o.contactId}`, { headers: hdrs(env) });
    if (cr.ok) {
      const c = ((await cr.json()) as { contact?: { email?: string; phone?: string; customFields?: { id: string; value: unknown }[] } }).contact;
      gclid = String(c?.customFields?.find((f) => f.id === GCLID_FIELD)?.value || "");
      email = c?.email || email;
      phone = c?.phone || phone;
    }
    const emailHash = email ? await sha256(email.trim().toLowerCase()) : "";
    const phoneNorm = phone.replace(/[^\d+]/g, "");
    const phoneHash = /^\+\d{8,15}$/.test(phoneNorm) ? await sha256(phoneNorm) : "";
    if (!gclid && !emailHash && !phoneHash) continue;

    const created = Date.parse(o.createdAt);
    if (only !== "booked") rows.push([gclid, NAMES.qualified, dubaiTime(created + 60_000), "", "AED", emailHash, phoneHash]);
    if (only !== "qualified" && (BOOKED.has(o.pipelineStageId) || o.status === "won")) {
      rows.push([gclid, NAMES.booked, dubaiTime(created + 120_000), String(o.monetaryValue || ""), "AED", emailHash, phoneHash]);
    }
  }

  const header = ["Google Click ID", "Conversion Name", "Conversion Time", "Conversion Value", "Conversion Currency", "Email", "Phone Number"];
  return ["Parameters:TimeZone=Asia/Dubai", header.join(","), ...rows.map((r) => r.map(csvCell).join(","))].join("\n") + "\n";
}

export async function onRequestGet({ request, env }: { request: Request; env: Env }): Promise<Response> {
  if (!env.CONVERSIONS_PASSWORD) return new Response("Not configured", { status: 503 });
  if (!authorized(request, env)) {
    return new Response("Unauthorized", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="conversions"' } });
  }
  try {
    // One Google Ads Data Manager connection = one conversion action, so each connection uses
    // ?action=qualified or ?action=booked to get only its own rows.
    const a = new URL(request.url).searchParams.get("action");
    const only: Only = a === "qualified" || a === "booked" ? a : undefined;
    const csv = await buildCsv(env, Date.now(), only);
    return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
  } catch (e) {
    console.error("conversions.csv failed", e);
    return new Response("Upstream error", { status: 502 });
  }
}
