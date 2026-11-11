"use client";
import { useEffect, useState } from "react";
import { HEADLINES, packageById } from "@/lib/site";
import { pushDL } from "@/lib/tracking";

/** H1 + subline. With ?pkg=<id> in the ad's final URL, it matches the ad and preselects that package. */
export default function HeroHeadline() {
  const [key, setKey] = useState("default");

  useEffect(() => {
    const id = new URLSearchParams(location.search).get("pkg") || "";
    if (!HEADLINES[id] || !packageById(id)) return;
    setKey(id);
    pushDL({ event: "landing_variant", package: id });
    const sel = document.querySelector<HTMLSelectElement>("#lead-form select[name=package]");
    if (sel) {
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set?.call(sel, id);
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, []);

  const h = HEADLINES[key];
  const pkg = key === "default" ? undefined : packageById(key);
  return (
    <>
      <h1>{h.pre}<span className="grad">{h.hl}</span>{h.post}</h1>
      <p className="sub">
        {pkg ? (
          <>{pkg.blurb} Booked <strong>direct with the operator</strong>, no hidden fees. From <strong>AED&nbsp;{pkg.price}</strong> per {pkg.unit}.</>
        ) : (
          <>4x4 pickup, red-dune bashing, camel ride, BBQ dinner &amp; live shows, booked <strong>direct with the operator</strong>. No middlemen, no hidden fees. From <strong>AED&nbsp;75</strong>.</>
        )}
      </p>
    </>
  );
}
