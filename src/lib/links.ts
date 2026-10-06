/**
 * Outbound destinations.
 *
 * App URLs are build-time env vars so the same source can point at staging or
 * production without a code change. They fall back to "#" so a local build
 * without env set renders without dead-looking absolute URLs.
 */
const env = import.meta.env;

export const LINKS = {
  customerApp: env.VITE_CUSTOMER_APP_URL ?? "#",
  tradespersonApp: env.VITE_TRADESPERSON_APP_URL ?? "#",
  contactEmail: env.VITE_CONTACT_EMAIL ?? "hello@callout.gh",
} as const;

/** True when a link was never configured, so CTAs can soften rather than 404. */
export const isPlaceholder = (href: string) => href === "#";
