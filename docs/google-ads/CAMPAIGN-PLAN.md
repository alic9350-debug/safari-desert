# Google Ads Search campaign — Maverick Safari UAE

Built for `book.mavericksafariuae.com`. Import files in this folder: `editor-keywords.csv`, `editor-ads.csv`, `editor-negatives.csv` (Google Ads Editor → Account → Import → From file). All headlines ≤30, descriptions ≤90, paths ≤15, assets within limits (validated).

## 1. Strategy in one paragraph
Search only (no Performance Max yet). Most bookings come from tourists already in the UAE searching on their phone for today or tomorrow, so the main campaign targets people **in** the UAE. A small second campaign catches travelers planning from their home country. One ad group per package, each landing on its matching `?pkg=` page (the headline on the page changes to match the ad = high ad relevance and landing page experience). Phrase + exact match only at launch; broad match only after Smart Bidding has 30+ conversions.

## 2. Competitor landscape (research)
| Type | Examples | How they compete | Your angle |
|---|---|---|---|
| Booking platforms | GetYourGuide, Viator, Klook, Tripadvisor | Huge budgets on generic terms, many reviews, resell local operators | **Direct operator, no middleman markup** |
| Large operators | Platinum Heritage, Arabian Adventures, Rayna Tours | Premium/conservation-reserve camps or huge package variety | **Boutique camp, transparent price, fast personal WhatsApp** |
| Small local operators | hundreds of AED 50–150 sellers | Price-led ads, often hidden extras | **From AED 55/75 with nothing hidden (water, henna, seating included)** |

Market prices seen in research: morning ~AED 85–150, standard evening ~AED 100–499 depending on inclusions, luxury/overnight up to AED 1,950+. Peak season Nov–Mar (prices 15–25% higher, tours sell out), low season Jun–Aug, demand peaks late December. Your AED 55–185 range is competitive.

Rules: never use competitor brand names in ad text (trademark policy). Don't bid on competitor brands at launch.

## 3. Account & campaign settings
| Setting | Campaign A: UAE In-Destination | Campaign B: Pre-Trip Source Markets |
|---|---|---|
| Name | Maverick | Search | UAE In-Destination | Maverick | Search | Pre-Trip Source Markets |
| Goal | Leads → **Submit lead form** (Safari LP – Lead Form) primary | same |
| Networks | Search only. **Uncheck** Search Partners and Display | same |
| Locations | United Arab Emirates | United Kingdom, India, Saudi Arabia, Germany, Russia, Kuwait, Qatar, France, Italy, USA |
| Location option | **Presence**: people in or regularly in | **Presence**: people in or regularly in |
| Languages | All languages (ads in English) | All languages |
| Bidding | Maximize conversions (no target) → Target CPA after 30 conv. | Maximize clicks with max CPC $1.20 for 2–3 weeks → Maximize conversions |
| Ad schedule | All day (evening/night searches book next-day tours) | All day |
| Devices | All (expect ~80% mobile) | All |
| Auto-applied recommendations | **OFF** (all) | OFF |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign=uae-in-destination&utm_term={keyword}&utm_content={adgroupid}` | `…&utm_campaign=pre-trip&…` |

Auto-tagging must be ON (gclid). The UTMs feed the `utm_*` fields in GHL so every lead shows its keyword.

## 4. Ad groups, keywords and landing pages
| Ad group | Final URL | Keywords (each as Exact **and** Phrase) |
|---|---|---|
| **Desert Safari Dubai – Generic** | `book.mavericksafariuae.com/` | desert safari dubai · dubai desert safari · desert safari in dubai · desert safari tour dubai · desert safari tours dubai · book desert safari dubai · desert safari dubai booking · desert safari dubai packages · dune bashing dubai · red dune safari dubai |
| **Evening Desert Safari** | `book.mavericksafariuae.com/?pkg=evening-standard` | evening desert safari dubai · evening desert safari · desert safari with bbq dinner · desert safari dubai with dinner · sunset desert safari dubai · evening desert safari dubai price |
| **VIP Desert Safari** | `book.mavericksafariuae.com/?pkg=vip` | vip desert safari dubai · vip desert safari · luxury desert safari dubai · premium desert safari dubai · desert safari dubai vip package |
| **Private Desert Safari** | `book.mavericksafariuae.com/?pkg=private` | private desert safari dubai · private desert safari · private land cruiser desert safari · family desert safari dubai · private desert tour dubai · desert safari for family dubai |
| **Morning Desert Safari** | `book.mavericksafariuae.com/?pkg=morning` | morning desert safari dubai · morning desert safari · morning dune bashing dubai · morning safari dubai · dune bashing dubai morning |
| **Overnight Desert Safari** | `book.mavericksafariuae.com/?pkg=overnight` | overnight desert safari dubai · overnight desert safari · desert camping dubai · overnight camping dubai desert · desert safari with overnight stay · desert camp dubai overnight |
| **Desert Safari Price – Budget** | `book.mavericksafariuae.com/?pkg=basic-bus` | cheap desert safari dubai · desert safari dubai price · desert safari dubai cost · desert safari dubai offers · desert safari dubai deals · budget desert safari dubai · desert safari dubai price per person |

Campaign B uses the ad groups: Desert Safari Dubai – Generic, Private Desert Safari, Overnight Desert Safari, VIP Desert Safari (same keywords and ads).

## 5. Responsive search ads (2 per ad group)
Structure per Google's best practice: **H1–H5 = keyword headlines**, **H6–H9 = brand and trust**, **H10–H15 = benefits and calls to action**. Ad A pins H1–H3 to position 1 (the keyword always shows first); Ad B is unpinned so Google can find the strongest combinations. Both target **Excellent** ad strength (15 unique headlines, 4 descriptions, keywords included).

### Desert Safari Dubai – Generic
Final URL `https://book.mavericksafariuae.com/` · Display path `/Desert-Safari/Dubai`

| # | Headline | Chars | Role |
|---|---|---|---|
| H1 | Desert Safari Dubai | 19 | Keyword (pin 1 in Ad A) |
| H2 | Dubai Desert Safari Tours | 25 | Keyword (pin 1 in Ad A) |
| H3 | Book Desert Safari in Dubai | 27 | Keyword (pin 1 in Ad A) |
| H4 | Desert Safari Dubai Packages | 28 | Keyword |
| H5 | Desert Safari From AED 75 | 25 | Keyword |
| H6 | Maverick Safari UAE | 19 | Brand / trust |
| H7 | Direct Operator, No Middlemen | 29 | Brand / trust |
| H8 | No Hidden Fees or Upsells | 25 | Brand / trust |
| H9 | DTCM-Certified 4x4 Drivers | 26 | Brand / trust |
| H10 | BBQ Dinner and Live Shows | 25 | Benefit / CTA |
| H11 | Pickup Across Dubai | 19 | Benefit / CTA |
| H12 | Check Availability Today | 24 | Benefit / CTA |
| H13 | Get Your Price in Minutes | 25 | Benefit / CTA |
| H14 | Book Now on WhatsApp | 20 | Benefit / CTA |
| H15 | Reserve Your Sunset Spot | 24 | Benefit / CTA |

| # | Description | Chars |
|---|---|---|
| D1 | Red dune bashing, camel ride, sandboarding, BBQ dinner and live shows. Book direct today. | 89 |
| D2 | Direct desert safari operator in Dubai. No hidden fees. Get your exact price on WhatsApp. | 89 |
| D3 | Evening, VIP, private, morning and overnight safaris. Pickup in Dubai, Sharjah and Ajman. | 89 |
| D4 | Boutique camp, DTCM-certified drivers and 100% halal BBQ. Check availability in seconds. | 88 |

### Evening Desert Safari
Final URL `https://book.mavericksafariuae.com/?pkg=evening-standard` · Display path `/Evening-Safari/Dubai`

| # | Headline | Chars | Role |
|---|---|---|---|
| H1 | Evening Desert Safari Dubai | 27 | Keyword (pin 1 in Ad A) |
| H2 | Evening Safari From AED 75 | 26 | Keyword (pin 1 in Ad A) |
| H3 | Desert Safari with BBQ Dinner | 29 | Keyword (pin 1 in Ad A) |
| H4 | Sunset Desert Safari Dubai | 26 | Keyword |
| H5 | Evening Dune Bashing Dubai | 26 | Keyword |
| H6 | Maverick Safari UAE | 19 | Brand / trust |
| H7 | Direct Operator, No Middlemen | 29 | Brand / trust |
| H8 | No Hidden Fees or Upsells | 25 | Brand / trust |
| H9 | DTCM-Certified 4x4 Drivers | 26 | Brand / trust |
| H10 | Camel Ride and Live Shows | 25 | Benefit / CTA |
| H11 | 4x4 Pickup From Your Hotel | 26 | Benefit / CTA |
| H12 | Check Availability Today | 24 | Benefit / CTA |
| H13 | Get Your Price in Minutes | 25 | Benefit / CTA |
| H14 | Book Now on WhatsApp | 20 | Benefit / CTA |
| H15 | Reserve Your Sunset Spot | 24 | Benefit / CTA |

| # | Description | Chars |
|---|---|---|
| D1 | Sunset over the red dunes, 30-40 min dune bashing, camel ride, BBQ dinner and live shows. | 89 |
| D2 | Evening desert safari from AED 75 with 4x4 pickup. Direct operator, no hidden fees. | 83 |
| D3 | 100% halal BBQ buffet, Tanoura, belly dance and fire show at a boutique desert camp. | 84 |
| D4 | Tell us your date and group size. We reply with your exact price on WhatsApp in minutes. | 88 |

### VIP Desert Safari
Final URL `https://book.mavericksafariuae.com/?pkg=vip` · Display path `/VIP-Safari/Dubai`

| # | Headline | Chars | Role |
|---|---|---|---|
| H1 | VIP Desert Safari Dubai | 23 | Keyword (pin 1 in Ad A) |
| H2 | VIP Desert Safari From AED 110 | 30 | Keyword (pin 1 in Ad A) |
| H3 | Luxury Desert Safari Dubai | 26 | Keyword (pin 1 in Ad A) |
| H4 | Premium Desert Safari Dubai | 27 | Keyword |
| H5 | VIP Seating and Table Service | 29 | Keyword |
| H6 | Maverick Safari UAE | 19 | Brand / trust |
| H7 | Direct Operator, No Middlemen | 29 | Brand / trust |
| H8 | No Hidden Fees or Upsells | 25 | Brand / trust |
| H9 | DTCM-Certified 4x4 Drivers | 26 | Brand / trust |
| H10 | No Queues at the BBQ Buffet | 27 | Benefit / CTA |
| H11 | Shared 4x4 Hotel Pickup | 23 | Benefit / CTA |
| H12 | Check Availability Today | 24 | Benefit / CTA |
| H13 | Get Your Price in Minutes | 25 | Benefit / CTA |
| H14 | Book Now on WhatsApp | 20 | Benefit / CTA |
| H15 | Reserve Your VIP Seats | 22 | Benefit / CTA |

| # | Description | Chars |
|---|---|---|
| D1 | VIP seating with prime show views and table service, so no waiting in buffet lines. | 83 |
| D2 | VIP desert safari from AED 110 with 4x4 pickup, dune bashing, camel ride and BBQ dinner. | 88 |
| D3 | Book direct with the operator. No middlemen, no hidden fees, fast WhatsApp confirmation. | 88 |
| D4 | Perfect for couples and special occasions. Check your date and get your price in minutes. | 89 |

### Private Desert Safari
Final URL `https://book.mavericksafariuae.com/?pkg=private` · Display path `/Private-Safari/Dubai`

| # | Headline | Chars | Role |
|---|---|---|---|
| H1 | Private Desert Safari Dubai | 27 | Keyword (pin 1 in Ad A) |
| H2 | Private Land Cruiser Safari | 27 | Keyword (pin 1 in Ad A) |
| H3 | Family Desert Safari Dubai | 26 | Keyword (pin 1 in Ad A) |
| H4 | Private Safari From AED 500 | 27 | Keyword |
| H5 | Up to 6 Guests per Vehicle | 26 | Keyword |
| H6 | Maverick Safari UAE | 19 | Brand / trust |
| H7 | Direct Operator, No Middlemen | 29 | Brand / trust |
| H8 | No Hidden Fees or Upsells | 25 | Brand / trust |
| H9 | DTCM-Certified 4x4 Drivers | 26 | Brand / trust |
| H10 | Soft-Drive Option for Kids | 26 | Benefit / CTA |
| H11 | Flexible Door-to-Door Pickup | 28 | Benefit / CTA |
| H12 | Check Availability Today | 24 | Benefit / CTA |
| H13 | Get Your Price in Minutes | 25 | Benefit / CTA |
| H14 | Book Now on WhatsApp | 20 | Benefit / CTA |
| H15 | Reserve Your Private 4x4 | 24 | Benefit / CTA |

| # | Description | Chars |
|---|---|---|
| D1 | Your own Land Cruiser for up to 6 guests with flexible pickup and a soft-drive option. | 86 |
| D2 | Private desert safari from AED 500 per vehicle with camel ride, BBQ dinner and live shows. | 90 |
| D3 | Ideal for families, couples and elderly guests. Extreme dune bashing or a gentle ride. | 86 |
| D4 | Book direct with the operator. No hidden fees. Get your price on WhatsApp in minutes. | 85 |

### Morning Desert Safari
Final URL `https://book.mavericksafariuae.com/?pkg=morning` · Display path `/Morning-Safari/Dubai`

| # | Headline | Chars | Role |
|---|---|---|---|
| H1 | Morning Desert Safari Dubai | 27 | Keyword (pin 1 in Ad A) |
| H2 | Morning Dune Bashing Dubai | 26 | Keyword (pin 1 in Ad A) |
| H3 | Morning Safari From AED 160 | 27 | Keyword (pin 1 in Ad A) |
| H4 | Red Dune Bashing in Dubai | 25 | Keyword |
| H5 | Sandboarding and Camel Ride | 27 | Keyword |
| H6 | Maverick Safari UAE | 19 | Brand / trust |
| H7 | Direct Operator, No Middlemen | 29 | Brand / trust |
| H8 | No Hidden Fees or Upsells | 25 | Brand / trust |
| H9 | DTCM-Certified 4x4 Drivers | 26 | Brand / trust |
| H10 | Back at Your Hotel by Lunch | 27 | Benefit / CTA |
| H11 | Morning 4x4 Hotel Pickup | 24 | Benefit / CTA |
| H12 | Check Availability Today | 24 | Benefit / CTA |
| H13 | Get Your Price in Minutes | 25 | Benefit / CTA |
| H14 | Book Now on WhatsApp | 20 | Benefit / CTA |
| H15 | Reserve Your Morning Slot | 25 | Benefit / CTA |

| # | Description | Chars |
|---|---|---|
| D1 | 40-45 min of extreme Lahbab red dune bashing, sandboarding and camel ride. Beat the heat. | 89 |
| D2 | Morning desert safari from AED 160 with 4x4 pickup. Back at your hotel by lunchtime. | 84 |
| D3 | Book direct with the operator. DTCM-certified drivers, insured roll-caged 4x4 vehicles. | 87 |
| D4 | Short on time? Tell us your date and get your exact price on WhatsApp in minutes. | 81 |

### Overnight Desert Safari
Final URL `https://book.mavericksafariuae.com/?pkg=overnight` · Display path `/Overnight/Dubai`

| # | Headline | Chars | Role |
|---|---|---|---|
| H1 | Overnight Desert Safari Dubai | 29 | Keyword (pin 1 in Ad A) |
| H2 | Desert Camping in Dubai | 23 | Keyword (pin 1 in Ad A) |
| H3 | Overnight Safari From AED 185 | 29 | Keyword (pin 1 in Ad A) |
| H4 | Sleep Under the Desert Stars | 28 | Keyword |
| H5 | Desert Camp with Breakfast | 26 | Keyword |
| H6 | Maverick Safari UAE | 19 | Brand / trust |
| H7 | Direct Operator, No Middlemen | 29 | Brand / trust |
| H8 | No Hidden Fees or Upsells | 25 | Brand / trust |
| H9 | DTCM-Certified 4x4 Drivers | 26 | Brand / trust |
| H10 | Tent, Bedding and Pillows | 25 | Benefit / CTA |
| H11 | BBQ Dinner and Live Shows | 25 | Benefit / CTA |
| H12 | Check Availability Today | 24 | Benefit / CTA |
| H13 | Get Your Price in Minutes | 25 | Benefit / CTA |
| H14 | Book Now on WhatsApp | 20 | Benefit / CTA |
| H15 | Reserve Your Desert Tent | 24 | Benefit / CTA |

| # | Description | Chars |
|---|---|---|
| D1 | Full evening safari, then a night under the stars and a desert sunrise with breakfast. | 86 |
| D2 | Overnight desert safari from AED 185 with 4x4 pickup, BBQ dinner, tent and bedding. | 83 |
| D3 | Dune bashing, camel ride, sandboarding and live shows. Book direct with the operator. | 85 |
| D4 | No hidden fees. Tell us your date and get your exact price on WhatsApp in minutes. | 82 |

### Desert Safari Price – Budget
Final URL `https://book.mavericksafariuae.com/?pkg=basic-bus` · Display path `/Desert-Safari/Price`

| # | Headline | Chars | Role |
|---|---|---|---|
| H1 | Desert Safari Dubai Price | 25 | Keyword (pin 1 in Ad A) |
| H2 | Desert Safari From AED 55 | 25 | Keyword (pin 1 in Ad A) |
| H3 | Budget Desert Safari Dubai | 26 | Keyword (pin 1 in Ad A) |
| H4 | Desert Safari Dubai Deals | 25 | Keyword |
| H5 | Cheap Desert Safari Dubai | 25 | Keyword |
| H6 | Maverick Safari UAE | 19 | Brand / trust |
| H7 | Direct Operator, No Middlemen | 29 | Brand / trust |
| H8 | No Hidden Fees or Upsells | 25 | Brand / trust |
| H9 | Transparent Prices Online | 25 | Brand / trust |
| H10 | BBQ Dinner and Live Shows | 25 | Benefit / CTA |
| H11 | Bus Pickup From Central Dubai | 29 | Benefit / CTA |
| H12 | Check Availability Today | 24 | Benefit / CTA |
| H13 | Get Your Price in Minutes | 25 | Benefit / CTA |
| H14 | Book Now on WhatsApp | 20 | Benefit / CTA |
| H15 | Compare All Safari Prices | 25 | Benefit / CTA |

| # | Description | Chars |
|---|---|---|
| D1 | Budget bus desert safari from AED 55 with dune bashing, camel ride, BBQ and live shows. | 87 |
| D2 | Direct operator prices with no hidden fees. Water, henna and seating are all included. | 86 |
| D3 | Evening AED 75, VIP AED 110, private AED 500 per vehicle. Compare packages and book. | 84 |
| D4 | Tell us your date and group size. Get your exact price on WhatsApp in minutes. | 78 |

## 6. Assets (add at campaign level, both campaigns)
### Sitelinks
| Text | Line 1 | Line 2 | URL |
|---|---|---|---|
| Evening Desert Safari | From AED 75 per person | BBQ dinner and live shows | `book.mavericksafariuae.com/?pkg=evening-standard` |
| VIP Desert Safari | VIP seating, table service | From AED 110 per person | `book.mavericksafariuae.com/?pkg=vip` |
| Private Land Cruiser | Up to 6 guests per vehicle | Soft-drive option for families | `book.mavericksafariuae.com/?pkg=private` |
| Morning Desert Safari | 40-45 min red dune bashing | Back at your hotel by lunch | `book.mavericksafariuae.com/?pkg=morning` |
| Overnight Desert Camping | Tent, dinner and breakfast | From AED 185 per person | `book.mavericksafariuae.com/?pkg=overnight` |
| Budget Bus Safari | From AED 55 per person | Full evening camp program | `book.mavericksafariuae.com/?pkg=basic-bus` |

### Callouts
Direct Safari Operator · No Hidden Fees · Pickup Across Dubai · 100% Halal BBQ Dinner · DTCM-Certified Drivers · Reply in Minutes · Private Tours Available · Live Shows Included · Boutique Desert Camp · Insured 4x4 Vehicles

### Structured snippets
- **Types:** Evening Safari, VIP Safari, Private Safari, Morning Safari, Overnight Safari, Budget Bus Safari
- **Amenities:** BBQ Dinner, Camel Ride, Sandboarding, Henna Painting, Live Shows, Arabic Coffee

### Price asset (type: Services, currency AED, qualifier: From)
| Header | Description | Price | URL |
|---|---|---|---|
| Evening Desert Safari | Per person, BBQ and shows | AED 75 | `/?pkg=evening-standard` |
| VIP Desert Safari | Per person, table service | AED 110 | `/?pkg=vip` |
| Private Land Cruiser | Per vehicle, up to 6 | AED 500 | `/?pkg=private` |
| Morning Desert Safari | Per person, dune bashing | AED 160 | `/?pkg=morning` |
| Overnight Desert Safari | Per person, tent, meals | AED 185 | `/?pkg=overnight` |
| Budget Bus Safari | Per person, full program | AED 55 | `/?pkg=basic-bus` |

### Other assets
- **Call:** +971 55 252 5075, schedule 09:00–21:00, count calls ≥60 s as a conversion (secondary).
- **Location:** link your Google Business Profile (shows reviews, map pin).
- **Business name / logo:** Maverick Safari UAE + logo.
- **Images (6+):** dune bashing, sunset camp, camel ride, VIP seating, private Land Cruiser, overnight tent — both 1.91:1 and 1:1 crops of your own photos.
- No promotion asset until you have a real, verifiable offer.

## 7. Negative keywords (campaign level, phrase)
job, jobs, vacancy, vacancies, salary, career, careers, hiring, recruitment, driver job, license, licence, free, wiki, wikipedia, map, weather, temperature, history, safari park, dubai safari park, zoo, animals, video, youtube, photos, pictures, wallpaper, png, game, rental, rent, for rent, buggy rental, quad bike rental, kenya, tanzania, africa, qatar, doha, oman, muscat, riyadh, jeddah, saudi, las vegas, arizona, morocco, egypt, course, training, blog, reddit, tripadvisor forum, resort, restaurant, drawing, clipart, meaning, dubai frame, burj khalifa, aquarium, miracle garden, global village, abu dhabi, al ain, liwa, fujairah

Also add any brand of a competitor you don't want to show on, and review the **Search terms** report every 2–3 days in the first month.

## 8. Budget plan (USD)
CPCs below are **estimates** (no public CPC data exists for these exact terms). Before launch, confirm in **Tools → Keyword Planner → Get search volume and forecasts** with this keyword list, location UAE.

| Plan | Daily | ~Monthly | Campaign A (UAE) | Campaign B (Pre-trip) | When |
|---|---|---|---|---|---|
| **Starter** | $20 | ~$610 | $20/day | off | First 2–3 weeks, to collect data |
| **Recommended** | $35 | ~$1,065 | $28/day | $7/day | From week 3 if cost per lead is on target |
| **Peak season** | $60 | ~$1,830 | $48/day | $12/day | Mid-Dec → early Jan, Easter, Eid holidays |
| **Low season** | $12 | ~$365 | $12/day | off | Jun–Aug |

### What the Recommended plan should deliver (estimate)
| Metric | UAE campaign | Assumption |
|---|---|---|
| Avg CPC | $0.50–1.20 | competitive tourism term, low-ticket product |
| Clicks / month | ~700–1,700 | $28/day |
| Lead rate (form + WhatsApp) | 6–12% | fast mobile page, price shown, 2-step form |
| Leads / month | ~40–200 | wide range until real data arrives |
| Cost per lead | ~$5–20 | |
| Bookings (35–50% of leads) | ~15–100 | depends on reply speed |

### Profitability guardrail (important for a low-ticket product)
Average booking ≈ 2.5 guests × ~AED 110 ≈ **AED 275 (~$75)**. Know your **profit per booking** (after camp, car, driver). If profit is ~$25, cost per booking must stay **under $25**, i.e. with a 40% close rate, cost per lead under **~$10**. Track this weekly:
- Google Ads cost ÷ GHL **Booking Confirmed** count = real cost per booking.
- Pause keywords with 25+ clicks and no lead; raise budget on ad groups with bookings (private, VIP and overnight bring higher value per booking).
- Once ~30 bookings/month flow back through the feed, switch the goal to **Booking Confirmed** with **Maximize conversion value** so Google chases higher-value bookings.

## 9. Quality Score & landing page (why it should score high)
| Quality Score factor | What's already done |
|---|---|
| **Expected CTR** | Keyword in H1 (pinned), price in headline, 6 sitelinks, callouts, prices, call, location |
| **Ad relevance** | One tight theme per ad group; keyword in headline, path and description |
| **Landing page experience** | Each ad group has its own URL whose **H1 matches the ad** (`?pkg=`), title contains "Desert Safari Dubai", prices shown on page match the ads, mobile speed score 88, HTTPS, clear contact info, privacy policy |

Keep it high: never advertise a price the page doesn't show; keep page speed fast; refresh low-performing headlines after 4–6 weeks (look at asset performance labels).

## 10. Launch checklist
1. Google Ads Editor → Import the 3 CSV files → review → Post.
2. Add settings from §3, assets from §6, budgets from §8 (Starter).
3. Conversions: only **Safari LP – Lead Form** primary; WhatsApp click, Qualified Lead, Booking Confirmed secondary; "Imported lead" not an account-default goal yet.
4. Enhanced conversions for leads ON (Google tag); auto-tagging ON.
5. Test: click your own ad (preview tool, not a real click) → landing page loads with matching headline.
6. Week 1: check Search terms daily, add negatives. Week 2–3: pause weak keywords. After 30 conversions: Target CPA.

## Sources
- Google: [Best practices for responsive search ads](https://support.google.com/google-ads/answer/6167122)
- [Desert safari Dubai prices & packages 2026 (alike.io)](https://alike.io/blog/best-safari-dubai-prices-packages-booking-hacks)
- [10 best desert safari Dubai tours 2026 (Cyprus Mail)](https://cyprus-mail.com/2026/07/10/10-best-desert-safari-dubai-tours-in-2026-top-rated)
- [Desert safari marketing Dubai — seasonality (Basecamp Advertising)](https://basecampadvertising.com/desert-safari-marketing-dubai/)
- [desertsafaridubai.com keyword traffic (ahrefstop)](https://ahrefstop.com/websites/desertsafaridubai.com)
