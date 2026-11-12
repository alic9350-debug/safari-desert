# GHL automation prompts — Maverick Safari UAE

7 workflows: 5 essential before ads (1–5), 2 for growth (6–7). Paste each prompt into
GHL → Automation → Create Workflow → **Build with AI** (or use it as a manual build checklist).
Publish order: 5, 1, 2, 3, 4, then 6, 7. Archive the old snapshot drafts first so nothing fires twice.

## WhatsApp templates to create first (Settings → WhatsApp → Templates)
| Template | Category | Text |
|---|---|---|
| safari_enquiry_received | Utility | Hi {{1}}, thanks for your {{2}} request for {{3}} with Maverick Safari UAE 🐪 We're checking availability now and will send your exact price and pickup time here shortly. |
| safari_followup | Marketing | Hi {{1}}, just checking you saw our message about your desert safari on {{2}}. Popular sunset slots fill up fast. Reply here and we'll hold your spot. |
| safari_quote_nudge | Marketing | Hi {{1}}, any questions about your safari quote? Reply here and we'll confirm your {{2}} booking in 2 minutes. |
| safari_booking_confirmed | Utility | ✅ Booking confirmed, {{1}}! {{2}} on {{3}}. Pickup: {{4}} from {{5}}. Reply here with any questions. |
| safari_booking_reminder | Utility | Hi {{1}}, reminder: your desert safari is tomorrow ({{2}}). Pickup time: {{3}}. Wear comfortable clothes and be ready 10 minutes early. See you in the dunes! |
| safari_review_request | Utility | Thank you for joining Maverick Safari, {{1}}! 🌅 Would you share a quick Google review? It really helps our small team: {{2}} |

## 1. New enquiry – instant reply & follow-up
Trigger: tag added `new-enquiry` (the website form re-adds it on every submission). Re-entry ON, stop on response ON.
WhatsApp `safari_enquiry_received` → email confirmation (if email) → internal alert → 10 min: alert if still New Lead →
2 h (09–21 Dubai): `safari_followup` if still New Lead → 1 day 10:00: price-list email if still New Lead →
2 days: tag `no-reply`, remove `new-enquiry`.

## 2. Quoted – booking nudge
Trigger: stage → Quoted on WhatsApp. Re-entry OFF, stop on response ON.
Tag `quoted`, remove `new-enquiry`, remove from WF1 → 4 h: `safari_quote_nudge` if still Quoted →
1 day: internal call/lost reminder → 3 days: tag `no-reply` if still Quoted.

## 3. Booking confirmed – confirmation & reminder
Trigger: stage → Booking Confirmed. Re-entry ON.
Tag `booked`, remove `new-enquiry`/`quoted`/`no-reply`, remove from WF1/WF2 → if `pickup_time` empty: alert team, wait for it →
`safari_booking_confirmed` + email with what to bring → day before tour_date 18:00: `safari_booking_reminder` →
tour day 08:00: internal guest brief.

## 4. Tour completed – review request
Trigger: stage → Tour Completed. Wait 3 h → `safari_review_request` (+ tag `review-requested`) →
2 days: email reminder if no `reviewed` tag → internal: set paid value, move to Paid (Won). Never gate reviews.

## 5. Inbound WhatsApp/Instagram/Facebook message → New Lead
Trigger: customer replied (WhatsApp/IG/FB). If no open opportunity in Desert Safari Leads: create one in New Lead,
tags `inbound-message` + `whatsapp-lead`, internal alert. No automatic customer message; do not add `new-enquiry`.

## 6. Lost lead – tidy up & budget offer
Trigger: tag added `lost-price` / `lost-date` / `lost-other`. Set opportunity Lost, remove tags, remove from WF1–3.
`lost-price` only: next day 11:00 email offering Basic Bus AED 55 / Self-Drive AED 45.

## 7. Past guest – win-back & referral
Trigger: stage → Paid. Tag `paid` (+ `repeat-guest` if already paid before) → 45 days: if no `stop-automation` and no
open opportunity: referral email with `{{custom_values.promotion_name}}`, create opportunity in
"Reactivation/ Win Back Pipeline" → Past Customer/Cold Lead. Set the Promotion Name custom value first.

The full copy-paste prompts (with every message text) are in the chat message they were delivered in; this file is the
reference summary. Field keys: tour_type, tour_date, adults, children, pickup_location, pickup_time; custom values
safari__whatsapp_link, safari__price_list, safari__what_to_bring, safari__google_review_link, safari__pickup_areas.
