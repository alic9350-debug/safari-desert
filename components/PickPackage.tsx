"use client";
import { pushDL } from "@/lib/tracking";

/** Button that preselects a package in the form and scrolls to it. */
export default function PickPackage({ id, children, className = "btn btn-primary" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const sel = document.querySelector<HTMLSelectElement>("#lead-form select[name=package]");
        if (sel && id) sel.value = id;
        pushDL({ event: "select_package", package: id });
        document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => document.querySelector<HTMLInputElement>("#lead-form input[name=date]")?.focus({ preventScroll: true }), 500);
      }}
    >
      {children}
    </button>
  );
}
