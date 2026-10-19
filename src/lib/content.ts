/**
 * Site copy and product data.
 *
 * Everything here describes what Callout actually does. The catalogue examples
 * and price bands are real entries from the product's service catalogue, so the
 * figures shown on the site match the figures in the app. Deliberately no
 * invented customer counts, testimonials, or press quotes.
 */

export const SITE = {
  name: "Callout",
  tagline: "Know the price before they knock.",
  description:
    "Callout is a trades marketplace for Ghana where prices are set by the trade, not invented per job. Every service carries a published price band, and the tradespeople themselves vote on what it should be.",
} as const;

/** The five trades in the product catalogue. */
export const TRADES = [
  {
    name: "Plumbing",
    icon: "wrench",
    blurb: "Pipes, drainage, heaters, and sanitation.",
    example: { service: "Fix a leaking tap", min: 8000, max: 15000 },
  },
  {
    name: "Electrical",
    icon: "zap",
    blurb: "Wiring, circuits, boards, and fault diagnosis.",
    example: { service: "Install a new wall socket", min: 10000, max: 20000 },
  },
  {
    name: "Carpentry",
    icon: "hammer",
    blurb: "Furniture, fittings, and structural repairs.",
    example: { service: "Install door hinges and lock", min: 10000, max: 20000 },
  },
  {
    name: "Mechanics",
    icon: "settings",
    blurb: "Vehicle repair, engines, and servicing.",
    example: { service: "Full engine diagnostic", min: 15000, max: 30000 },
  },
  {
    name: "HVAC",
    icon: "thermometer",
    blurb: "Air conditioning, ventilation, and refrigeration.",
    example: { service: "Service a split unit", min: 12000, max: 25000 },
  },
] as const;

/** The band used in the hero and explainer. A real catalogue entry. */
export const FEATURED_BAND = {
  service: "Fix a leaking tap",
  trade: "Plumbing",
  region: "Accra",
  min: 8000,
  max: 15000,
  currency: "GHS",
} as const;

export const CUSTOMER_STEPS = [
  {
    step: "01",
    title: "Pick the job, not a price",
    body: "Choose the exact service from a published catalogue. The price band is on screen before you commit to anything.",
  },
  {
    step: "02",
    title: "Get quotes inside the band",
    body: "Verified tradespeople in your trade and region quote you. Anything outside the band has to be justified in writing.",
  },
  {
    step: "03",
    title: "Accept, track, and pay",
    body: "Accept the quote you want and follow the job. You pay by card or mobile money only once the work is marked done, then rate it.",
  },
] as const;

export const TRADESPERSON_POINTS = [
  {
    title: "Stop bidding against the floor",
    body: "A published band means you are not undercut by someone quoting below the cost of doing the work properly.",
    icon: "trending-up",
  },
  {
    title: "Jobs matched to your trade and region",
    body: "Your inbox only shows work you are actually registered and verified to do. Pass on anything you do not want.",
    icon: "inbox",
  },
  {
    title: "You set the rates, collectively",
    body: "Propose a change to any band and the guild votes. Rates move because the trade decided, not because a platform decided.",
    icon: "vote",
  },
  {
    title: "Get paid without chasing",
    body: "Invoice from the job. When the customer pays, your share goes straight to your mobile money or bank account. Callout never holds it.",
    icon: "wallet",
  },
] as const;

export const TRUST_POINTS = [
  {
    title: "Verified tradespeople",
    body: "Every tradesperson's Ghana Card and trade certificate are checked before they can take work. Only verified people are listed.",
    icon: "shield-check",
  },
  {
    title: "Ratings tied to real jobs",
    body: "Only the customer on a completed job can leave a rating, and only once. No review farming.",
    icon: "star",
  },
  {
    title: "Card and mobile money",
    body: "Payments run through Paystack, so you can pay the way you already pay for everything else.",
    icon: "credit-card",
  },
  {
    title: "Works on a bad connection",
    body: "Both apps install to your home screen and keep working when the network drops.",
    icon: "wifi-off",
  },
] as const;

export const FAQ = [
  {
    q: "Who decides the price bands?",
    a: "Registered tradespeople do. Any Pro member can propose a new band for a service, the guild votes over a fixed window, and if it passes with enough participation the band changes for everyone in that trade and region. Callout does not set prices.",
  },
  {
    q: "What if a job genuinely costs more than the band?",
    a: "A tradesperson can quote outside the band, but only by marking it as custom and writing out the scope that justifies it. You see that explanation alongside the number, so an unusual price is a conversation rather than a surprise.",
  },
  {
    q: "How do I know a tradesperson is real?",
    a: "Before anyone can take work, we check their Ghana Card and their certificate for the trade. Only verified tradespeople appear in search. Ratings can only be left by the customer on a completed job.",
  },
  {
    q: "Which trades and areas are covered?",
    a: "Plumbing, electrical, carpentry, mechanics, and HVAC, across Accra and Kumasi to start. The catalogue grows by the same guild vote that sets the bands.",
  },
  {
    q: "What does it cost a tradesperson?",
    a: "Joining and quoting are free. When a customer pays, Callout takes a fee from your share. The fee is set per trade and shown in the app before you quote; the customer pays the agreed price, nothing extra. Pro is an optional 30-day pass, never renewed automatically, that lets you propose price changes and doubles your guild vote.",
  },
  {
    q: "How do I pay?",
    a: "Card or mobile money through Paystack, once the tradesperson marks the job done. If you settle in cash, the tradesperson records it against the invoice.",
  },
  {
    q: "What if the work wasn't right?",
    a: "Report a problem from the invoice within 14 days of paying. The tradesperson gives their side, and Callout decides, including a full or partial refund to the card or mobile money account you paid with.",
  },
] as const;
