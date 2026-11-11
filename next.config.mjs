/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: served by Cloudflare Pages. The form API lives in /functions.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default nextConfig;
