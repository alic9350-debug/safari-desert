/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: served by Cloudflare Pages. The form API lives in /functions.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};
export default nextConfig;
