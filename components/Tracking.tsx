"use client";
import { useEffect } from "react";
import { captureAttribution, pushDL } from "@/lib/tracking";
import { SITE } from "@/lib/site";
import { IS_PREVIEW } from "@/lib/asset";

/** Captures ad click IDs/UTMs and tracks WhatsApp + phone clicks site-wide. */
export default function Tracking() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const kind = href.includes("wa.me") || href.includes("whatsapp.com") ? "whatsapp" : href.startsWith("tel:") ? "phone" : "";
      if (!kind) return;
      pushDL({ event: `${kind}_click`, click_location: a.dataset.loc || "unknown" });
      // Google Ads secondary conversion; counted once per click by the action's "Count: One" setting
      if (SITE.adsClickLabel && !IS_PREVIEW && window.gtag) {
        window.gtag("event", "conversion", { send_to: `${SITE.adsId}/${SITE.adsClickLabel}`, value: 10, currency: SITE.currency });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
