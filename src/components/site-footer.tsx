import { Logo } from "./logo";
import { LINKS, isPlaceholder } from "@/lib/links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600">
            A trades marketplace for Ghana where the trade sets the price.
          </p>
        </div>

        <nav className="flex flex-col gap-2.5 text-sm" aria-label="Footer">
          <a href="#how" className="text-ink-400 transition-colors hover:text-ink-100">
            How it works
          </a>
          <a href="#guild" className="text-ink-400 transition-colors hover:text-ink-100">
            The guild
          </a>
          <a href="#tradespeople" className="text-ink-400 transition-colors hover:text-ink-100">
            For tradespeople
          </a>
          <a href="#faq" className="text-ink-400 transition-colors hover:text-ink-100">
            FAQ
          </a>
        </nav>

        <div className="flex flex-col gap-2.5 text-sm">
          {!isPlaceholder(LINKS.customerApp) && (
            <a
              href={LINKS.customerApp}
              className="text-ink-400 transition-colors hover:text-ink-100"
              target="_blank"
              rel="noreferrer noopener"
            >
              Customer app
            </a>
          )}
          {!isPlaceholder(LINKS.tradespersonApp) && (
            <a
              href={LINKS.tradespersonApp}
              className="text-ink-400 transition-colors hover:text-ink-100"
              target="_blank"
              rel="noreferrer noopener"
            >
              Tradesperson app
            </a>
          )}
          <a
            href={`mailto:${LINKS.contactEmail}`}
            className="text-ink-400 transition-colors hover:text-ink-100"
          >
            {LINKS.contactEmail}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-border/60 pt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-700">
          © {year} Callout · Accra, Ghana
        </p>
      </div>
    </footer>
  );
}
