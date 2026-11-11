"use client";
import { useEffect } from "react";
import { captureAttribution, pushDL } from "@/lib/tracking";

/** Captures ad click IDs/UTMs and tracks WhatsApp + phone clicks site-wide. */
export default function Tracking() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        pushDL({ event: "whatsapp_click", click_location: a.dataset.loc || "unknown" });
      } else if (href.startsWith("tel:")) {
        pushDL({ event: "phone_click", click_location: a.dataset.loc || "unknown" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
