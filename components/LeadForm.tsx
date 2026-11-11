"use client";
import { useRef, useState } from "react";
import { FORM_PACKAGE_OPTIONS, ADDONS } from "@/lib/site";
import { pushDL, readAttribution } from "@/lib/tracking";

const COUNTRY_CODES = [
  ["+971", "🇦🇪 +971"], ["+91", "🇮🇳 +91"], ["+92", "🇵🇰 +92"], ["+44", "🇬🇧 +44"], ["+1", "🇺🇸 +1"],
  ["+7", "🇷🇺 +7"], ["+49", "🇩🇪 +49"], ["+33", "🇫🇷 +33"], ["+39", "🇮🇹 +39"], ["+34", "🇪🇸 +34"],
  ["+966", "🇸🇦 +966"], ["+974", "🇶🇦 +974"], ["+965", "🇰🇼 +965"], ["+968", "🇴🇲 +968"], ["+973", "🇧🇭 +973"],
  ["+20", "🇪🇬 +20"], ["+86", "🇨🇳 +86"], ["+63", "🇵🇭 +63"], ["+880", "🇧🇩 +880"], ["+94", "🇱🇰 +94"],
  ["+61", "🇦🇺 +61"], ["+48", "🇵🇱 +48"], ["+31", "🇳🇱 +31"], ["+90", "🇹🇷 +90"], ["+234", "🇳🇬 +234"],
];

function today() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export default function LeadForm({ id = "lead-form" }: { id?: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  const markStart = () => {
    if (!startedAt.current) {
      startedAt.current = Date.now();
      pushDL({ event: "form_start", form_id: id });
    }
  };

  const next = () => {
    const f = formRef.current!;
    const fields = ["package", "date", "adults"].map((n) => f.elements.namedItem(n) as HTMLInputElement);
    for (const el of fields) if (!el.reportValidity()) return;
    setError("");
    setStep(2);
    pushDL({ event: "form_step", form_id: id, step: 2 });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) return next();
    const f = e.currentTarget;
    if (!f.reportValidity()) return;
    const fd = new FormData(f);
    const local = String(fd.get("phone_local") || "").replace(/[^\d]/g, "").replace(/^0+/, "");
    const phone = `${fd.get("cc")}${local}`;
    if (local.length < 6 || local.length > 13) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }
    const leadId = crypto.randomUUID();
    const payload = {
      lead_id: leadId,
      name: String(fd.get("name") || "").trim(),
      phone,
      email: String(fd.get("email") || "").trim(),
      package: String(fd.get("package") || ""),
      date: String(fd.get("date") || ""),
      adults: Number(fd.get("adults") || 0),
      children: Number(fd.get("children") || 0),
      pickup: String(fd.get("pickup") || "").trim(),
      addon: String(fd.get("addon") || ""),
      company: String(fd.get("company") || ""), // honeypot
      elapsed_ms: startedAt.current ? Date.now() - startedAt.current : 0,
      attribution: readAttribution(),
      page: location.href,
    };
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; value?: number };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      sessionStorage.setItem(
        "msu_lead",
        JSON.stringify({ lead_id: leadId, name: payload.name, phone, email: payload.email, package: payload.package, date: payload.date, adults: payload.adults, children: payload.children, pickup: payload.pickup, value: data.value || 0 }),
      );
      location.href = "/thank-you";
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or message us on WhatsApp.");
    }
  }

  return (
    <form id={id} ref={formRef} className="lead-form" onSubmit={onSubmit} onFocus={markStart} noValidate={false}>
      <div className="form-head">
        <p className="form-title">Check availability & get your price</p>
        <div className="steps" aria-label={`Step ${step} of 2`}>
          <span className={step >= 1 ? "on" : ""} /> <span className={step >= 2 ? "on" : ""} />
        </div>
      </div>

      <fieldset hidden={step !== 1}>
        <label>
          Which safari?
          <select name="package" required defaultValue="">
            <option value="" disabled>Choose a package</option>
            {FORM_PACKAGE_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </label>
        <label>
          Date
          <input type="date" name="date" required min={today()} />
        </label>
        <div className="row">
          <label>
            Adults
            <input type="number" name="adults" min={1} max={50} defaultValue={2} required inputMode="numeric" />
          </label>
          <label>
            Children (3–11)
            <input type="number" name="children" min={0} max={30} defaultValue={0} inputMode="numeric" />
          </label>
        </div>
        <button type="button" className="btn btn-primary btn-block" onClick={next}>Next: Get my price →</button>
      </fieldset>

      <fieldset hidden={step !== 2}>
        <label>
          Your name
          <input name="name" autoComplete="name" required={step === 2} maxLength={80} placeholder="Full name" />
        </label>
        <label>
          WhatsApp number
          <div className="phone">
            <select name="cc" defaultValue="+971" aria-label="Country code">
              {COUNTRY_CODES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <input name="phone_local" type="tel" autoComplete="tel-national" inputMode="tel" required={step === 2} placeholder="50 123 4567" />
          </div>
        </label>
        <label>
          Hotel or pickup area
          <input name="pickup" maxLength={120} placeholder="e.g. Marina, Deira, Sharjah" />
        </label>
        <div className="row">
          <label>
            Email <span className="opt">(optional)</span>
            <input name="email" type="email" autoComplete="email" maxLength={120} placeholder="you@email.com" />
          </label>
          <label>
            Add-on
            <select name="addon" defaultValue="">
              <option value="">None</option>
              {ADDONS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
        </div>
        {/* Honeypot: hidden from humans */}
        <input name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "Sending…" : "Get my price on WhatsApp"}
        </button>
        <button type="button" className="link-back" onClick={() => setStep(1)}>← Back</button>
        <p className="fine">We reply on WhatsApp within minutes. By submitting you agree to be contacted about your booking.</p>
      </fieldset>

      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}
