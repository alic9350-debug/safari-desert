# WhatsApp templates — Maverick Safari UAE

Create in GHL → Settings → WhatsApp → Templates. Language: English. Footer: `Maverick Safari UAE · Dubai`.
Rules: no variable at the very start/end of a body; links in buttons; Utility = booking info only.

| # | Name | Category | Variables (sample) | Buttons | Workflow / step |
|---|---|---|---|---|---|
| 1 | safari_enquiry_received | Utility | 1 first name (Sarah), 2 tour type (VIP Desert Safari), 3 date (20 Dec 2026) | QR: Yes, send my price · I have a question | WF1 instant |
| 2 | safari_followup_check | Marketing | 1 name, 2 date | QR: Hold my spot · Change my date | WF1 +2 h |
| 3 | safari_followup_prices | Marketing | 1 name | QR: Book now · Help me choose | WF1 next day |
| 4 | safari_quote_nudge | Marketing | 1 name, 2 date | QR: Confirm my booking · I have a question | WF2 +4 h |
| 5 | safari_booking_confirmed | Utility | 1 name, 2 tour type, 3 date, 4 pickup time (3:00 PM), 5 pickup location (JBR, Dubai Marina) | – | WF3 pickup time filled |
| 6 | safari_booking_confirmed_pending | Utility | 1 name, 2 tour type, 3 date | – | WF3 timeout path |
| 7 | safari_booking_reminder | Utility | 1 name, 2 date, 3 pickup time | – | WF3 day before 18:00 |
| 8 | safari_review_request | Utility (may become Marketing) | 1 name | URL: Leave a Google review → https://g.page/r/CS9iunr48FnJEBM/review | WF4 +3 h |
| 9 | safari_budget_option | Marketing | 1 name | QR: Book Bus Safari · Book Self-Drive | WF6 lost-price |
| 10 | safari_friends_visiting | Marketing | 1 name | QR: Yes, friends are visiting · Not right now | WF7 +45 days |

Variable mapping in GHL: first name `{{contact.first_name}}`, tour type `{{contact.tour_type}}`, date
`{{contact.tour_date}}`, pickup time `{{contact.pickup_time}}`, pickup location `{{contact.pickup_location}}`.
Full body texts were delivered in chat on 14 Nov 2026; quick-reply taps open the 24-hour free-form window.
