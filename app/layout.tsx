import type { Metadata, Viewport } from "next";
import Tracking from "@/components/Tracking";
import { SITE } from "@/lib/site";
import { asset } from "@/lib/asset";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dubai Desert Safari from AED 75 | Maverick Safari UAE",
  description: "Book a Dubai desert safari direct with the operator: hotel pickup, 4x4 dune bashing, camel ride, BBQ dinner & live shows. No hidden fees. Fast WhatsApp confirmation.",
  // Ad landing page: keep it out of organic search so it doesn't compete with the main site.
  robots: { index: false, follow: true },
  icons: { icon: asset("/favicon.webp") },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f0d0b" };

// EEA/UK/CH visitors default to denied (Consent Mode v2); everyone else granted.
const EEA = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"];
const consentAndGtm = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${JSON.stringify(EEA)},wait_for_update:500});
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentAndGtm }} />
      </head>
      <body>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <Tracking />
        {children}
      </body>
    </html>
  );
}
