// Base path support so the same build works at "/" (Cloudflare) and "/safari-desert" (GitHub Pages preview).
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE}${p}`;
// Preview builds (GitHub Pages) have no /api/lead, so the form simulates success.
export const IS_PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";
