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
Live: https://safari-desert.pages.dev (project `safari-desert`, production branch `claude/keen-brown-xcp8vr`).

`GHL_API_TOKEN` should come from a dedicated GHL Private Integration ("Landing Page Form") with only
View/Edit Contacts and View/Edit Opportunities. A new or changed secret takes effect on the next deployment.

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `safari-desert`.
2. Build settings: Framework preset **None** · Build command `npm run build` · Output directory `out` · Production branch: `main`.
3. After the first deploy: **Settings → Variables and Secrets → Add** `GHL_API_TOKEN` (type **Secret**) for Production *and* Preview → **redeploy**.
4. **Custom domains → Set up a domain** → `book.mavericksafariuae.com`.
5. Hostinger hPanel → Domains → DNS → add **CNAME** `book` → `safari-desert.pages.dev`.

## Google Ads conversion (built into the page)
The thank-you page fires the Google Ads conversion directly with gtag:
`AW-787388788/zYBICJyuyLYdEPSyuvcC` (action "Safari LP – Lead Form"), value + AED currency,
`transaction_id` = lead_id, and enhanced-conversion `user_data` (email, phone).
**Do not** add another Google Ads conversion tag for this action in GTM. Preview builds load no tracking.

## GTM setup (container GTM-TWKWS8T5)
Events pushed to the dataLayer:
| Event | When | Use |
|---|---|---|
| `generate_lead` | Thank-you page, once per lead | **Primary Google Ads conversion**. Transaction ID = `lead_id`, value = `value`, currency = `currency`. Enhanced conversions: `user_data.email`, `user_data.phone_number` |
| `whatsapp_click` | Any WhatsApp link (`click_location`) | Secondary conversion |
| `phone_click` | Any tel: link | Secondary conversion |
| `form_start`, `form_step`, `select_package` | Funnel steps | GA4 events |

## Offline conversions (qualified / booked → Google Ads)
`GET /api/conversions.csv` (Basic auth: user `googleads`, password = Cloudflare secret `CONVERSIONS_PASSWORD`)
returns a Google Ads click-conversion upload file built live from the GHL pipeline "Desert Safari Leads":

| Conversion name | Row added when the opportunity is… | Value |
|---|---|---|
| `Safari – Qualified Lead` | in **Quoted on WhatsApp** or any later stage (or Won) | – |
| `Safari – Booking Confirmed` | in **Booking Confirmed**, Tour Completed, Paid, Left a Review (or Won) | opportunity value (AED) |

Each row has the Google click ID (contact field `google_click_id`) plus SHA-256 hashed email and phone
(enhanced conversions for leads). Lost opportunities and anything older than 85 days are skipped. Times are
stable (based on the opportunity creation time), so re-reading the file never double counts.
Google Ads → Goals → Conversions → Uploads → Schedules → Source **HTTPS** → URL
`https://book.mavericksafariuae.com/api/conversions.csv`, username `googleads`, password as above, daily.
Up to 40 recent qualified opportunities per fetch (Workers free-plan request limit).

## Google Ads final URLs (message match)
Add `?pkg=<id>` to an ad group's final URL: the headline changes to match and the package is preselected.

| Ad group | Final URL |
|---|---|
| Generic "desert safari dubai" | `https://book.mavericksafariuae.com/` |
| Evening safari | `https://book.mavericksafariuae.com/?pkg=evening-standard` |
| VIP safari | `https://book.mavericksafariuae.com/?pkg=vip` |
| Private safari | `https://book.mavericksafariuae.com/?pkg=private` |
| Morning safari | `https://book.mavericksafariuae.com/?pkg=morning` |
| Overnight safari | `https://book.mavericksafariuae.com/?pkg=overnight` |
| Cheap / budget safari | `https://book.mavericksafariuae.com/?pkg=basic-bus` |
| Self-drive safari | `https://book.mavericksafariuae.com/?pkg=self-drive` |

Turn on auto-tagging in Google Ads so every click carries a `gclid`.
