"use client";
import { useMemo, useRef, useState } from "react";
import { FORM_PACKAGE_OPTIONS, ADDONS, packageById } from "@/lib/site";
import { pushDL, readAttribution } from "@/lib/tracking";
import Icon from "@/components/Icon";

const COUNTRY_CODES = [
  ["+971", "🇦🇪 +971"], ["+91", "🇮🇳 +91"], ["+92", "🇵🇰 +92"], ["+44", "🇬🇧 +44"], ["+1", "🇺🇸 +1"],
  ["+7", "🇷🇺 +7"], ["+49", "🇩🇪 +49"], ["+33", "🇫🇷 +33"], ["+39", "🇮🇹 +39"], ["+34", "🇪🇸 +34"],
  ["+966", "🇸🇦 +966"], ["+974", "🇶🇦 +974"], ["+965", "🇰🇼 +965"], ["+968", "🇴🇲 +968"], ["+973", "🇧🇭 +973"],
  ["+20", "🇪🇬 +20"], ["+86", "🇨🇳 +86"], ["+63", "🇵🇭 +63"], ["+880", "🇧🇩 +880"], ["+94", "🇱🇰 +94"],
  ["+61", "🇦🇺 +61"], ["+48", "🇵🇱 +48"], ["+31", "🇳🇱 +31"], ["+90", "🇹🇷 +90"], ["+234", "🇳🇬 +234"],
];

const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const addDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };

function Stepper({ label, value, set, min, max, hint }: { label: string; value: number; set: (n: number) => void; min: number; max: number; hint?: string }) {
  return (
    <div className="stepper">
      <span className="stepper-l">{label}{hint && <small>{hint}</small>}</span>
      <div className="stepper-c">
        <button type="button" aria-label={`Fewer ${label}`} onClick={() => set(Math.max(min, value - 1))} disabled={value <= min}><Icon name="minus" size={16} /></button>
        <output aria-live="polite">{value}</output>
        <button type="button" aria-label={`More ${label}`} onClick={() => set(Math.min(max, value + 1))} disabled={value >= max}><Icon name="plus" size={16} /></button>
      </div>
    </div>
  );
}

export default function LeadForm({ id = "lead-form", title = "Check availability & price" }: { id?: string; title?: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [pkgId, setPkgId] = useState("");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const startedAt = useRef<number>(0);
  const dateRef = useRef<HTMLInputElement>(null);
  const pkgRef = useRef<HTMLSelectElement>(null);

  const quick = useMemo(() => [{ l: "Today", v: addDays(0) }, { l: "Tomorrow", v: addDays(1) }, { l: "In 2 days", v: addDays(2) }], []);
  const pkg = packageById(pkgId);
  const estimate = pkg ? (pkg.unit === "vehicle" ? pkg.price : pkg.price * (adults + children)) : 0;

  const markStart = () => {
    if (!startedAt.current) { startedAt.current = Date.now(); pushDL({ event: "form_start", form_id: id }); }
  };

  const next = () => {
    if (!pkgRef.current!.reportValidity()) return;
    if (!date) { setError("Please choose your date."); dateRef.current?.focus(); return; }
    setError("");
    setStep(2);
    pushDL({ event: "form_step", form_id: id, step: 2, package: pkgId });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) return next();
    const f = e.currentTarget;
    if (!f.reportValidity()) return;
    const fd = new FormData(f);
    const local = String(fd.get("phone_local") || "").replace(/[^\d]/g, "").replace(/^0+/, "");
    const phone = `${fd.get("cc")}${local}`;
    if (local.length < 6 || local.length > 13) { setError("Please enter a valid WhatsApp number."); return; }
    const leadId = crypto.randomUUID();
    const payload = {
      lead_id: leadId,
      name: String(fd.get("name") || "").trim(),
      phone,
      email: String(fd.get("email") || "").trim(),
      package: pkgId, date, adults, children,
      pickup: String(fd.get("pickup") || "").trim(),
      addon: String(fd.get("addon") || ""),
      company: String(fd.get("company") || ""), // honeypot
      elapsed_ms: startedAt.current ? Date.now() - startedAt.current : 0,
      attribution: readAttribution(),
      page: location.href,
    };
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; value?: number };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      sessionStorage.setItem("msu_lead", JSON.stringify({ lead_id: leadId, name: payload.name, phone, email: payload.email, package: pkgId, date, adults, children, pickup: payload.pickup, value: data.value || estimate }));
      location.href = "/thank-you";
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or message us on WhatsApp.");
    }
  }

  return (
    <form id={id} className="lead-form" onSubmit={onSubmit} onFocus={markStart} onClick={markStart}>
      <div className="form-head">
        <div>
          <p className="form-title">{title}</p>
          <p className="form-sub">Takes 30 seconds · No payment now</p>
        </div>
        <span className="form-step">Step {step}/2</span>
      </div>
      <div className="bar"><span style={{ width: step === 1 ? "50%" : "100%" }} /></div>

      <fieldset hidden={step !== 1}>
        <label className="fl">
          <span>Choose your safari</span>
          <select ref={pkgRef} name="package" required value={pkgId} onChange={(e) => setPkgId(e.target.value)}>
            <option value="" disabled>Select a package</option>
            {FORM_PACKAGE_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </label>

        <div className="fl">
          <span>When?</span>
          <div className="chips">
            {quick.map((q) => (
              <button key={q.l} type="button" className={`chip ${date === q.v ? "on" : ""}`} onClick={() => { setDate(q.v); setError(""); }}>{q.l}</button>
            ))}
            <input ref={dateRef} type="date" name="date" aria-label="Pick a date" className={`chip-date ${date && !quick.some((q) => q.v === date) ? "on" : ""}`}
              min={addDays(0)} value={date} onChange={(e) => { setDate(e.target.value); setError(""); }} />
          </div>
        </div>

        <div className="steppers">
          <Stepper label="Adults" value={adults} set={setAdults} min={1} max={50} />
          <Stepper label="Children" hint="3–11 yrs" value={children} set={setChildren} min={0} max={30} />
        </div>

        <div className={`estimate ${pkg ? "show" : ""}`} aria-live="polite">
          {pkg ? (
            <>
              <span>Estimated total</span>
              <strong>AED {estimate.toLocaleString()}</strong>
              <small>{pkg.unit === "vehicle" ? "per private vehicle" : `${adults + children} guest${adults + children > 1 ? "s" : ""} × AED ${pkg.price}`} · final price confirmed on WhatsApp</small>
            </>
          ) : (
            <span>Select a safari to see your estimated price</span>
          )}
        </div>

        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={next}>
          Check availability <Icon name="arrow" />
        </button>
      </fieldset>

      <fieldset hidden={step !== 2}>
        <p className="almost">Almost done! Where should we send your price?</p>
        <label className="fl">
          <span>Full name</span>
          <input name="name" autoComplete="name" required={step === 2} maxLength={80} placeholder="e.g. Sarah Ahmed" />
        </label>
        <label className="fl">
          <span>WhatsApp number</span>
          <div className="phone">
            <select name="cc" defaultValue="+971" aria-label="Country code">
              {COUNTRY_CODES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <input name="phone_local" type="tel" autoComplete="tel-national" inputMode="tel" required={step === 2} placeholder="50 123 4567" />
          </div>
        </label>
        <label className="fl">
          <span>Hotel or pickup area <em>(optional)</em></span>
          <input name="pickup" maxLength={120} placeholder="e.g. JBR, Downtown, Deira, Sharjah" />
        </label>
        <div className="row">
          <label className="fl">
            <span>Email <em>(optional)</em></span>
            <input name="email" type="email" autoComplete="email" maxLength={120} placeholder="you@email.com" />
          </label>
          <label className="fl">
            <span>Add-on</span>
            <select name="addon" defaultValue="">
              <option value="">No add-on</option>
              {ADDONS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
        </div>
        <input name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
        <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={busy}>
          {busy ? "Sending…" : <>Get my price on WhatsApp <Icon name="arrow" /></>}
        </button>
        <button type="button" className="link-back" onClick={() => setStep(1)}>← Change safari or date</button>
      </fieldset>

      {error && <p className="form-error" role="alert">{error}</p>}

      <ul className="form-trust">
        <li><Icon name="lock" size={14} /> No payment now</li>
        <li><Icon name="clock" size={14} /> Reply in minutes</li>
        <li><Icon name="shield" size={14} /> No spam, ever</li>
      </ul>
    </form>
  );
}
