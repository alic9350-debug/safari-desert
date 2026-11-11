// Central content + settings for the landing page. Edit prices/copy here.

export const SITE = {
  brand: "Maverick Safari UAE",
  mainSite: "https://mavericksafariuae.com",
  whatsapp: "971552525075", // digits only, used for wa.me links
  whatsappDisplay: "+971 55 252 5075",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-TWKWS8T5",
  currency: "AED",
};

export type Pkg = {
  id: string;
  name: string;
  price: number;
  unit: "person" | "vehicle";
  time: string;
  tag?: string;
  blurb: string;
  includes: string[];
};

export const PACKAGES: Pkg[] = [
  {
    id: "evening-standard",
    name: "Evening Desert Safari",
    price: 75,
    unit: "person",
    time: "6–7 hrs · Evening",
    tag: "Most popular",
    blurb: "The classic: red dunes at sunset, camel ride, BBQ dinner and live shows.",
    includes: ["Pickup & drop-off", "Dune bashing & sandboarding", "Camel ride & henna", "BBQ buffet & live shows"],
  },
  {
    id: "vip",
    name: "VIP Desert Safari",
    price: 110,
    unit: "person",
    time: "6–7 hrs · Shared 4x4",
    tag: "Best value",
    blurb: "Everything in the evening safari plus VIP seating and table service.",
    includes: ["Shared 4x4 pickup & drop-off", "Dune bashing & sandboarding", "VIP seating & table service", "BBQ dinner & live shows"],
  },
  {
    id: "private",
    name: "Private Desert Safari",
    price: 500,
    unit: "vehicle",
    time: "6–7 hrs · Private 4x4",
    tag: "Families & couples",
    blurb: "Your own Land Cruiser, flexible pickup, soft-drive option on request.",
    includes: ["Private 4x4 pickup & drop-off", "Dune bashing or soft-drive", "Camel ride & sunset photos", "BBQ dinner & live shows"],
  },
  {
    id: "morning",
    name: "Morning Desert Safari",
    price: 160,
    unit: "person",
    time: "4 hrs · Morning",
    blurb: "Pure adrenaline on the high dunes before the midday heat.",
    includes: ["Morning 4x4 pickup & drop-off", "Extreme dune bashing", "Sandboarding on high dunes"],
  },
  {
    id: "overnight",
    name: "Overnight Desert Safari",
    price: 185,
    unit: "person",
    time: "Overnight",
    blurb: "The full evening safari, then sleep under the stars and wake to a desert sunrise.",
    includes: ["Evening 4x4 pickup & drop-off", "Dune bashing & camel ride", "Desert tent & breakfast"],
  },
  {
    id: "self-drive",
    name: "Self-Drive Desert Safari",
    price: 45,
    unit: "person",
    time: "Evening · Self-arrival",
    tag: "Lowest price",
    blurb: "Drive to our camp yourself and enjoy the full evening program.",
    includes: ["Self-arrival at camp", "Short camel ride & photos", "Henna & Arabic coffee", "BBQ dinner & live shows"],
  },
];

export const ADDONS = ["Quad bike", "Dune buggy", "Not sure yet"];

export const FORM_PACKAGE_OPTIONS = [
  ...PACKAGES.map((p) => ({ id: p.id, label: `${p.name} — from AED ${p.price}` })),
  { id: "help-me-choose", label: "Not sure — help me choose" },
];

export function packageById(id: string) {
  return PACKAGES.find((p) => p.id === id);
}

export const REVIEWS = [
  { name: "Rushikesh G.", text: "Good desert safari experience in Dubai with pick and drop from hotel. Economical prices which are worth the experience." },
  { name: "Shane P.", text: "Highly recommended! We enjoyed, till our next travel." },
  { name: "Bill H.", text: "Very interesting scenes. And fair pricing. Good customer care." },
  { name: "Alexis Z.", text: "Gracias por este gran día! Nos ha encantado!" },
];

export const WHY = [
  { title: "Direct operator, no middlemen", text: "When you book with Maverick, you travel with Maverick. No reseller markups, no miscommunication." },
  { title: "Zero hidden upsells", text: "Water, henna and seating are included. What you see in your quote is exactly what you pay." },
  { title: "Boutique camp, not a mega-camp", text: "Carefully selected camps, so you're not queuing behind 1,000 people for food and activities." },
  { title: "DTCM-certified drivers", text: "Roll-caged, insured 4x4s driven by veteran guides certified by Dubai Tourism." },
];

export const FAQ = [
  { q: "How fast will I get my price and pickup time?", a: "Usually within minutes during working hours. Our team confirms your package, total price and exact pickup time on WhatsApp." },
  { q: "Where do you pick up from?", a: "Premium 4x4, VIP and private safaris include door-to-door pickup from hotels and residences in Dubai, Sharjah and Ajman. Budget packages use shared meeting points." },
  { q: "Is dune bashing safe for kids or elderly guests?", a: "Dune bashing isn't recommended for pregnant women, infants under 3, or guests with back or heart conditions. We offer private soft-drive and direct-to-camp options so everyone can enjoy the camp." },
  { q: "Is the food halal? Do you have vegetarian options?", a: "Yes. All BBQ buffets are 100% halal, with a wide selection of vegetarian dishes. Tell us about allergies when booking." },
  { q: "Are quad bikes and dune buggies included?", a: "Camel rides, sandboarding and camp entertainment are included. Quad bikes (from AED 150) and dune buggies are optional add-ons." },
  { q: "What should I wear?", a: "Loose, comfortable clothes and sandals or sneakers. From November to March, bring a light jacket — the desert gets cool after sunset." },
];
