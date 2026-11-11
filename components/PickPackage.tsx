"use client";
import { pushDL } from "@/lib/tracking";

/** Preselects a package in the main form and scrolls to it. */
export default function PickPackage({ id, children, className = "btn btn-primary" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const sel = document.querySelector<HTMLSelectElement>("#lead-form select[name=package]");
        if (sel && id) {
          // React-controlled select: use the native setter so onChange fires
          const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
          setter?.call(sel, id);
          sel.dispatchEvent(new Event("change", { bubbles: true }));
        }
        pushDL({ event: "select_package", package: id || "none" });
        document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </button>
  );
}
