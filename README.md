# Maverick Safari UAE — Google Ads landing page

Next.js (static export) on **Cloudflare Pages**, with a Pages Function (`/api/lead`) that sends every form fill to **GoHighLevel**.

```
Ad click (gclid/UTMs saved in a 90-day cookie)
  → landing page → 2-step form → /api/lead
      → GHL: upsert contact (+ tags, tracking & booking fields)
      → GHL: opportunity in "Marketing Pipeline › New Lead" (with AED value)
      → GHL: note with the full request
  → /thank-you → dataLayer "generate_lead" (lead_id, value, user_data) → GTM → Google Ads / GA4
```

## Files
| Path | What it is |
|---|---|
| `lib/site.ts` | **Edit content here**: packages, prices, reviews, FAQ, WhatsApp number, GTM ID |
| `app/page.tsx` | Landing page sections |
| `components/LeadForm.tsx` | 2-step form |
| `components/ThankYou.tsx` | Thank-you page + conversion event |
| `lib/tracking.ts`, `components/Tracking.tsx` | Click-ID/UTM capture, WhatsApp/phone click events |
| `functions/api/lead.ts` | Server function → GHL API (field IDs + package prices at the top) |
| `wrangler.toml` | Cloudflare settings (location, pipeline, stage IDs) |

If you change a price in `lib/site.ts`, change it in `functions/api/lead.ts` too (used for the opportunity value).

## Deploy on Cloudflare Pages (DNS stays at Hostinger)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `safari-desert`.
2. Build settings: Framework preset **None** · Build command `npm run build` · Output directory `out` · Production branch: `main`.
3. After the first deploy: **Settings → Variables and Secrets → Add** `GHL_API_TOKEN` (type **Secret**) for Production *and* Preview → **redeploy**.
4. **Custom domains → Set up a domain** → `book.mavericksafariuae.com`.
5. Hostinger hPanel → Domains → DNS → add **CNAME** `book` → `safari-desert.pages.dev`.

## GTM setup (container GTM-TWKWS8T5)
Events pushed to the dataLayer:
| Event | When | Use |
|---|---|---|
| `generate_lead` | Thank-you page, once per lead | **Primary Google Ads conversion**. Transaction ID = `lead_id`, value = `value`, currency = `currency`. Enhanced conversions: `user_data.email`, `user_data.phone_number` |
| `whatsapp_click` | Any WhatsApp link (`click_location`) | Secondary conversion |
| `phone_click` | Any tel: link | Secondary conversion |
| `form_start`, `form_step`, `select_package` | Funnel steps | GA4 events |

## Offline conversions (qualified / booked → Google Ads)
GHL stores the click ID in the custom field `google_click_id` (plus `gbraid`/`wbraid`).
When an opportunity moves to **Hot Lead** / **New Booking** / **Sale**, a GHL workflow sends
the click ID, conversion name, time and value to Google Ads (via a Google Sheet scheduled upload, or the Google Ads API).
