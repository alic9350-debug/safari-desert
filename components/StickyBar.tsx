"use client";
import { useEffect, useState } from "react";

/** Mobile bottom CTA bar; hides while a lead form is on screen so it never covers the form. */
export default function StickyBar({ children }: { children: React.ReactNode }) {
  const [hide, setHide] = useState(true);
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll(".lead-form"));
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setHide(visible.size > 0);
    }, { threshold: 0.15 });
    forms.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);
  return <div className={`sticky ${hide ? "hide" : ""}`}>{children}</div>;
}
