import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import * as React from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./button";
import { LINKS } from "@/lib/links";

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "The guild", href: "#guild" },
  { label: "For tradespeople", href: "#tradespeople" },
  { label: "FAQ", href: "#faq" },
] as const;

/**
 * Sticky header.
 *
 * Transparent over the hero and solid once scrolled, so the hero reads
 * full-bleed without the nav losing contrast against content further down.
 * The scroll-progress rule doubles as a reading indicator.
 */
export function SiteHeader() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [solid, setSolid] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setSolid(latest > 24));

  // Close the mobile sheet on Escape, and lock scroll while it is open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-border bg-ink-950/85 backdrop-blur-md" : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-base" aria-label="Callout home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-400 transition-colors hover:text-ink-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={LINKS.customerApp} variant="secondary">
            Find a tradesperson
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center rounded-lg text-ink-200 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Reading progress */}
      <motion.div
        className="h-px origin-left bg-signal-400"
        style={reduce ? { scaleX: 0 } : { scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      {open && (
        <motion.div
          id="mobile-nav"
          className="border-b border-border bg-ink-950/98 px-5 pb-6 pt-2 backdrop-blur-md md:hidden"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 text-sm text-ink-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button href={LINKS.customerApp} className="mt-5 w-full">
            Find a tradesperson
          </Button>
        </motion.div>
      )}
    </header>
  );
}
