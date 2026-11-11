# GHL setup — Maverick Safari UAE (location `cp6Z02inGKSRvMMNdWrO`)

## Already done via API
| Area | What exists now |
|---|---|
| Pipeline | **Desert Safari Leads**: New Lead → Quoted on WhatsApp → Booking Confirmed → Tour Completed → Paid → Left a Review |
| Contact fields | gclid backup (`google_click_id`), gbraid, wbraid, fbclid, utm_source/medium/campaign/term/content, landing_page, lead_id, tour_type, tour_date, adults, children, pickup_location, pickup_time, google_ads_conversion_sent |
| Tags | `new-enquiry` (re-added on every form submit — **use this as the workflow trigger**), website-lead, landing-page, google-ads, meta-ads, pkg-* (one per package), quoted, booked, tour-completed, paid, review-requested, reviewed, no-reply, lost-price, lost-date, lost-other, stop-automation, vip-guest, repeat-guest |
| Custom values | `{{custom_values.safari__whatsapp_number}}`, `{{custom_values.safari__whatsapp_link}}`, `{{custom_values.safari__main_website}}`, `{{custom_values.safari__price_list}}`, `{{custom_values.safari__pickup_areas}}`, `{{custom_values.safari__what_to_bring}}`, `{{custom_values.safari__google_review_link}}` (**empty — fill it**), `{{custom_values.marketing__website_booking_page_url}}` |

What the form does on each submit: upserts the contact (tags are only ever *added*), creates an opportunity in **New Lead** (or refreshes the contact's open one), adds a note with the full request, then re-adds `new-enquiry`.

## Do in the GHL screens (the API does not allow these for this sub-account)

### 0. Account settings (5 min)
1. **Settings → Business Profile → General**: Time zone **Asia/Dubai**; business phone **+971 55 252 5075**; website `https://mavericksafariuae.com` → Save.
2. **Settings → Custom Values** → `Safari - Google Review Link` → paste your Google review link (Google Business Profile → *Ask for reviews* → copy link).
3. **Settings → WhatsApp** → connect the business number (needed for WhatsApp steps below).
4. **Settings → My Staff** → make sure the person who answers leads has their mobile number and notifications on.

### 1. WhatsApp templates (submit once, Meta approves in minutes–hours)
WhatsApp only allows a *business-started* message from an approved template. Create under **Settings → WhatsApp → Templates** (category **Utility**, language English):

`safari_enquiry_received`
> Hi {{1}}, thanks for your desert safari request with Maverick Safari UAE for {{2}}. We're checking availability now and will send your exact price and pickup time here shortly. Reply anytime with questions.

`safari_booking_reminder`
> Hi {{1}}, a reminder that your desert safari is tomorrow ({{2}}). Your pickup time is {{3}}. Please wear comfortable clothes and be ready 10 minutes early. See you in the dunes!

Until they're approved, use the **SMS** versions in the workflows below.

---

### Workflow A — "Safari | New enquiry → instant reply + follow-up"
Rename and rebuild the draft **"1. New Lead Nurture (Fast 5) - Claim Offer"**.

**Settings (top-right ⚙):** Allow re-entry **ON** · Stop on response **ON**.

**Trigger:** *Contact Tag* → Tag added → `new-enquiry`.

| # | Action | Content |
|---|---|---|
| 1 | Send WhatsApp (template `safari_enquiry_received`, {{1}} = `{{contact.first_name}}`, {{2}} = `{{contact.tour_date}}`) — or **Send SMS** | SMS: `Hi {{contact.first_name}}, thanks for your desert safari request with Maverick Safari UAE ({{contact.tour_type}}, {{contact.tour_date}}). We're checking availability and will WhatsApp your price + pickup time shortly. Chat now: {{custom_values.safari__whatsapp_link}}` |
| 2 | Internal Notification → SMS + Email to assigned staff | `🔥 NEW SAFARI LEAD: {{contact.name}} {{contact.phone}} — {{contact.tour_type}} on {{contact.tour_date}}, {{contact.adults}} adults / {{contact.children}} kids, pickup {{contact.pickup_location}}. Reply within 5 min!` |
| 3 | Wait 10 minutes | |
| 4 | If/Else: Opportunity stage **is** New Lead (pipeline Desert Safari Leads) | |
| 4a | (Yes) Internal Notification | `⚠️ {{contact.name}} still not contacted after 10 min. Call/WhatsApp now: {{contact.phone}}` |
| 5 | Wait 2 hours | |
| 6 | Send SMS | `Hi {{contact.first_name}}, just checking you got our message about your {{contact.tour_type}}. Popular sunset slots fill up fast. Reply YES and we'll hold your spot.` |
| 7 | Wait 1 day | |
| 8 | Send SMS | `Hi {{contact.first_name}}, still planning your desert safari on {{contact.tour_date}}? Prices: {{custom_values.safari__price_list}}. Tap to chat: {{custom_values.safari__whatsapp_link}}` |
| 9 | Wait 2 days → Add Tag `no-reply` → Remove Tag `new-enquiry` | |

### Workflow B — "Safari | Quoted → booking nudge"
**Trigger:** *Pipeline Stage Changed* → pipeline Desert Safari Leads → stage **Quoted on WhatsApp**.

| # | Action | Content |
|---|---|---|
| 1 | Add Tag `quoted` | |
| 2 | Wait 4 hours | |
| 3 | If/Else: stage still Quoted on WhatsApp → Send SMS | `Hi {{contact.first_name}}, any questions about your safari quote? We can lock in your {{contact.tour_date}} spot now, no payment needed until pickup confirmation.` *(edit to your real payment terms)* |
| 4 | Wait 1 day → If still Quoted → Send SMS | `Last check from Maverick Safari 🐪 Shall we confirm your booking for {{contact.tour_date}}? Reply here and we'll sort it in 2 minutes.` |

### Workflow C — "Safari | Booking confirmed → confirmation + reminder"
Rebuild the draft **"2. Appointment Confirmation + Reminders"**.
**Trigger:** *Pipeline Stage Changed* → stage **Booking Confirmed**.
Before moving a lead to this stage, fill the contact's **pickup_time** field.

| # | Action | Content |
|---|---|---|
| 1 | Add Tag `booked` · Remove Tag `new-enquiry` | |
| 2 | Send SMS/WhatsApp | `✅ Booking confirmed! {{contact.tour_type}} on {{contact.tour_date}}, {{contact.adults}} adults / {{contact.children}} kids. Pickup: {{contact.pickup_time}} from {{contact.pickup_location}}. What to bring: {{custom_values.safari__what_to_bring}}` |
| 3 | Wait → until **1 day before** custom date field `tour_date`, at 18:00 | |
| 4 | Send WhatsApp template `safari_booking_reminder` (or SMS) | `Reminder: your desert safari is tomorrow! Pickup {{contact.pickup_time}}. Questions? {{custom_values.safari__whatsapp_link}}` |

### Workflow D — "Safari | Tour completed → review request"
Rebuild the draft **"4. New Sale - Send Review Request"**.
**Trigger:** *Pipeline Stage Changed* → stage **Tour Completed**.

| # | Action | Content |
|---|---|---|
| 1 | Add Tag `tour-completed` | |
| 2 | Wait 3 hours | |
| 3 | Send SMS/WhatsApp, Add Tag `review-requested` | `Thank you for joining Maverick Safari, {{contact.first_name}}! 🌅 Would you share a quick Google review? It really helps our small team: {{custom_values.safari__google_review_link}}` |
| 4 | Wait 2 days → If contact does **not** have tag `reviewed` → Send SMS | `Hi {{contact.first_name}}, if you have 30 seconds, a review would mean a lot to us: {{custom_values.safari__google_review_link}} Thank you!` |

When a review comes in, move the opportunity to **Left a Review** and add tag `reviewed`.

### Workflow E — "Safari | Lost lead tidy-up" (optional)
**Trigger:** Contact Tag added → `lost-price` / `lost-date` / `lost-other`. Action: set opportunity status **Lost**, remove `new-enquiry`. Use these tags when a lead says no, so you can see *why* you lose bookings.

Unpublish/delete **"3. Appt No Show"** (calendar-based, not used). Keep 5/6 as drafts for later.

### Daily team routine
1. New lead arrives → WhatsApp the price → move to **Quoted on WhatsApp**.
2. Guest says yes → fill **pickup_time** → move to **Booking Confirmed**.
3. After the tour → **Tour Completed**; when paid → **Paid** and set the opportunity value to the real amount, status **Won**.

These stages and values are what we send back to Google Ads as "Qualified" and "Booked" conversions.
