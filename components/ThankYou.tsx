"use client";
import { useEffect, useState } from "react";
import { SITE, packageById } from "@/lib/site";
import { pushDL, waLink } from "@/lib/tracking";

type Lead = { lead_id: string; name: string; phone: string; email?: string; package: string; date: string; adults: number; children: number; pickup?: string; value?: number };

export default function ThankYou() {
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    let l: Lead | null = null;
    try { l = JSON.parse(sessionStorage.getItem("msu_lead") || "null"); } catch {}
    setLead(l);
    if (!l) return;
    // Fire the conversion once per lead (refreshes won't double count).
    const firedKey = `msu_fired_${l.lead_id}`;
    if (sessionStorage.getItem(firedKey)) return;
    sessionStorage.setItem(firedKey, "1");
    pushDL({
      event: "generate_lead",
      lead_id: l.lead_id,          // use as Google Ads "Transaction ID" (dedupe)
      value: l.value || 0,
      currency: SITE.currency,
      tour: l.package,
      user_data: {                 // Enhanced Conversions for Leads (GTM hashes it)
        email: l.email || undefined,
        phone_number: l.phone,
      },
    });
  }, []);

  const pkg = lead ? packageById(lead.package) : undefined;
  const first = lead?.name?.split(" ")[0] || "";
  const msg = lead
    ? `Hi Maverick Safari! I just sent a booking request.\nName: ${lead.name}\nSafari: ${pkg?.name || lead.package}\nDate: ${lead.date}\nGuests: ${lead.adults} adults, ${lead.children} children${lead.pickup ? `\nPickup: ${lead.pickup}` : ""}`
    : "Hi Maverick Safari! I'd like to book a desert safari.";

  return (
    <main className="ty">
      <div className="ty-card">
        <img src="/img/logo.png" alt={SITE.brand} width={200} height={57} className="ty-logo" />
        <div className="ty-check" aria-hidden="true">✓</div>
        <h1>{first ? `Thanks ${first}, we've got your request!` : "Thanks, we've got your request!"}</h1>
        <p className="lead-p">Our team is checking availability now and will send your <strong>price and pickup time on WhatsApp</strong> shortly.</p>
        {lead && (
          <ul className="ty-summary">
            <li><span>Safari</span><strong>{pkg?.name || "Help me choose"}</strong></li>
            <li><span>Date</span><strong>{lead.date}</strong></li>
            <li><span>Guests</span><strong>{lead.adults} adults{lead.children ? `, ${lead.children} children` : ""}</strong></li>
          </ul>
        )}
        <p className="ty-fast">Want it even faster? Say hi on WhatsApp now:</p>
        <a className="btn btn-wa btn-block" data-loc="thank_you" href={waLink(msg, SITE.whatsapp)} target="_blank" rel="noopener">
          Chat on WhatsApp
        </a>
        <a className="ty-back" href={SITE.mainSite}>Back to mavericksafariuae.com</a>
      </div>
    </main>
  );
}
