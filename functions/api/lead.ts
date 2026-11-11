// Cloudflare Pages Function: POST /api/lead
// Validates the form, upserts the contact in GoHighLevel, creates an opportunity
// in the pipeline, and attaches a note with the full request.

interface Env {
  GHL_API_TOKEN: string;
  GHL_LOCATION_ID: string;
  GHL_PIPELINE_ID: string;
  GHL_STAGE_ID: string;
  ALLOWED_ORIGINS?: string;
}

type Ctx = { request: Request; env: Env };

const GHL = "https://services.leadconnectorhq.com";

// GHL custom field IDs (location cp6Z02inGKSRvMMNdWrO)
const FIELD = {
  google_click_id: "48NcdVVq9tDF4SH7Jyd3",
  gbraid: "fB7J2KU8bTf6h0KsL0gC",
  wbraid: "wie0vSl9htJEXVeSQlqF",
  fbclid: "SJK7un1fgz8P1WZEolwc",
  utm_source: "xuowWmc4PSUbOsbPps1Z",
  utm_medium: "ijqbh41CfMj1gk12bZze",
  utm_campaign: "Rn2aLhjppXEsxBsJjfTe",
  utm_term: "7INt1p3j8byE0wYWgORx",
  utm_content: "Pxfq9xKCKUPyxyfIiYVa",
  landing_page: "rIB76R9VB1MVTc8Hpv8T",
  lead_id: "Jzzes91wf3KaiDO6yC0q",
  tour_type: "NqczG9ZgrGxrnQlBcutT",
  pickup_location: "wrHi4VoN3YJMqsrfYBTr",
  tour_date: "ziXDPHEnby9WKWo6exPK",
  adults: "8IrMAlM3TJuoV7ko3OYK",
  children: "0SRqoFQtUjigj126RsyG",
} as const;

// Keep in sync with lib/site.ts
const PACKAGES: Record<string, { name: string; price: number; unit: "person" | "vehicle" }> = {
  "evening-standard": { name: "Evening Desert Safari", price: 75, unit: "person" },
  vip: { name: "VIP Desert Safari", price: 110, unit: "person" },
  private: { name: "Private Desert Safari", price: 500, unit: "vehicle" },
  morning: { name: "Morning Desert Safari", price: 160, unit: "person" },
  overnight: { name: "Overnight Desert Safari", price: 185, unit: "person" },
  "basic-bus": { name: "Basic Bus Desert Safari", price: 55, unit: "person" },
  "self-drive": { name: "Self-Drive Desert Safari", price: 45, unit: "person" },
  "help-me-choose": { name: "Help me choose", price: 0, unit: "person" },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const int = (v: unknown, min: number, max: number) => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
};

async function ghl(env: Env, path: string, body: unknown, method = "POST") {
  const res = await fetch(`${GHL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.GHL_API_TOKEN}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, any>;
  return { ok: res.ok, status: res.status, data };
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  // Same-site check (blocks other websites posting into your CRM)
  const origin = request.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const host = new URL(request.url).origin;
  const isPreview = /^https:\/\/[a-z0-9-]+\.safari-desert\.pages\.dev$/.test(origin);
  if (origin && origin !== host && !allowed.includes(origin) && !isPreview) {
    return json({ ok: false, error: "Forbidden" }, 403);
  }
  if (!env.GHL_API_TOKEN) return json({ ok: false, error: "Server not configured" }, 500);

  let b: Record<string, any>;
  try { b = await request.json(); } catch { return json({ ok: false, error: "Invalid request" }, 400); }

  // Bot traps: honeypot filled, or submitted impossibly fast -> pretend success, store nothing
  if (str(b.company) || (Number(b.elapsed_ms) > 0 && Number(b.elapsed_ms) < 2500)) {
    return json({ ok: true, value: 0 });
  }

  const name = str(b.name, 80);
  const phone = str(b.phone, 20).replace(/[^\d+]/g, "");
  const email = str(b.email, 120).toLowerCase();
  const pkgId = str(b.package, 40);
  const date = str(b.date, 10);
  const adults = int(b.adults, 1, 50);
  const children = int(b.children, 0, 30);
  const pickup = str(b.pickup, 120);
  const addon = str(b.addon, 40);
  const leadId = str(b.lead_id, 64) || crypto.randomUUID();
  const a = (b.attribution && typeof b.attribution === "object" ? b.attribution : {}) as Record<string, unknown>;

  if (name.length < 2) return json({ ok: false, error: "Please enter your name." }, 400);
  if (!/^\+\d{8,15}$/.test(phone)) return json({ ok: false, error: "Please enter a valid WhatsApp number." }, 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: "Please check your email address." }, 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ ok: false, error: "Please choose a date." }, 400);
  const pkg = PACKAGES[pkgId];
  if (!pkg) return json({ ok: false, error: "Please choose a safari." }, 400);

  const value = pkg.unit === "vehicle" ? pkg.price : pkg.price * (adults + children);
  const [firstName, ...rest] = name.split(/\s+/);
  const gclid = str(a.gclid, 300);
  const tags = ["website-lead", "landing-page", `pkg-${pkgId}`];
  if (gclid || a.gbraid || a.wbraid) tags.push("google-ads");
  if (a.fbclid) tags.push("meta-ads");

  const cf: { id: string; field_value: string | number }[] = [];
  const add = (id: string, v: string | number) => { if (v !== "" && v !== undefined && v !== null) cf.push({ id, field_value: v }); };
  add(FIELD.google_click_id, gclid);
  add(FIELD.gbraid, str(a.gbraid, 300));
  add(FIELD.wbraid, str(a.wbraid, 300));
  add(FIELD.fbclid, str(a.fbclid, 300));
  add(FIELD.utm_source, str(a.utm_source));
  add(FIELD.utm_medium, str(a.utm_medium));
  add(FIELD.utm_campaign, str(a.utm_campaign));
  add(FIELD.utm_term, str(a.utm_term));
  add(FIELD.utm_content, str(a.utm_content));
  add(FIELD.landing_page, str(a.landing_page, 500) || str(b.page, 500));
  add(FIELD.lead_id, leadId);
  add(FIELD.tour_type, pkg.name);
  add(FIELD.pickup_location, pickup);
  add(FIELD.tour_date, date);
  add(FIELD.adults, adults);
  add(FIELD.children, children);

  // 1) Contact (upsert = no duplicates if they enquire twice)
  const c = await ghl(env, "/contacts/upsert", {
    locationId: env.GHL_LOCATION_ID,
    firstName,
    lastName: rest.join(" ") || undefined,
    name,
    phone,
    email: email || undefined,
    source: gclid ? "Google Ads - Landing Page" : "Website Landing Page",
    customFields: cf,
  });
  const contactId: string | undefined = c.data?.contact?.id;
  if (!c.ok || !contactId) {
    console.error("GHL upsert failed", c.status, JSON.stringify(c.data).slice(0, 500));
    return json({ ok: false, error: "We couldn't send your request. Please try again or message us on WhatsApp." }, 502);
  }

  // 1b) Re-add the "new-enquiry" tag on EVERY submission, so the GHL workflow trigger
  //     "Contact Tag added: new-enquiry" fires for repeat customers too (the location
  //     doesn't allow duplicate opportunities, so "Opportunity created" would not).
  // Tags are ADDED (never sent in the upsert, which would replace existing tags like "booked").
  await ghl(env, `/contacts/${contactId}/tags`, { tags: ["new-enquiry"] }, "DELETE");
  const t = await ghl(env, `/contacts/${contactId}/tags`, { tags: [...tags, "new-enquiry"] });
  if (!t.ok) console.error("GHL tag failed", t.status, JSON.stringify(t.data).slice(0, 300));

  // 2) Opportunity in the pipeline (non-fatal if it already exists)
  const oppName = `${name} – ${pkg.name} – ${date}`;
  let o = await ghl(env, "/opportunities/", {
    locationId: env.GHL_LOCATION_ID,
    pipelineId: env.GHL_PIPELINE_ID,
    pipelineStageId: env.GHL_STAGE_ID,
    contactId,
    name: oppName,
    status: "open",
    monetaryValue: value,
    source: gclid ? "Google Ads" : "Website",
  });
  // Location blocks duplicate opportunities: refresh the existing one if it is still open
  // (a won/lost opportunity is a past booking and is left untouched; the note records the new request).
  const existingId: string | undefined = o.data?.meta?.existingId;
  if (!o.ok && o.data?.code === "OPPORTUNITY_NO_DUPLICATE" && existingId) {
    const ex = await fetch(`${GHL}/opportunities/${existingId}`, {
      headers: { Authorization: `Bearer ${env.GHL_API_TOKEN}`, Version: "2021-07-28", Accept: "application/json" },
    }).then((r) => r.json() as Promise<Record<string, any>>).catch(() => ({} as Record<string, any>));
    if (ex?.opportunity?.status === "open") {
      o = await ghl(env, `/opportunities/${existingId}`, {
        pipelineId: env.GHL_PIPELINE_ID, pipelineStageId: env.GHL_STAGE_ID, name: oppName, monetaryValue: value, status: "open",
      }, "PUT");
    }
  }
  if (!o.ok) console.error("GHL opportunity failed", o.status, JSON.stringify(o.data).slice(0, 500));

  // 3) Note with the full request, for the team
  const note = [
    `New safari request (lead ${leadId})`,
    `Package: ${pkg.name}`,
    `Date: ${date}`,
    `Guests: ${adults} adults, ${children} children`,
    `Pickup: ${pickup || "-"}`,
    `Add-on: ${addon || "-"}`,
    `Estimated value: AED ${value}`,
    `Source: ${str(a.utm_source) || "-"} / ${str(a.utm_medium) || "-"} / ${str(a.utm_campaign) || "-"}`,
    `Google click ID: ${gclid || "-"}`,
  ].join("\n");
  const n = await ghl(env, `/contacts/${contactId}/notes`, { body: note });
  if (!n.ok) console.error("GHL note failed", n.status, JSON.stringify(n.data).slice(0, 300));

  return json({ ok: true, value, opportunity: o.ok });
}

export async function onRequest(): Promise<Response> {
  return json({ ok: false, error: "Method not allowed" }, 405);
}
