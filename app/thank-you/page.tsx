import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Request received | Maverick Safari UAE",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThankYou />;
}
