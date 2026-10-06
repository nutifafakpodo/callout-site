import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import * as React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "./button";
import { PriceBand } from "./price-band";
import { EASE } from "./motion";
import { FEATURED_BAND } from "@/lib/content";
import { LINKS } from "@/lib/links";

/**
 * Hero.
 *
 * The headline is revealed a line at a time rather than a word at a time:
 * word-by-word staggering on a sentence this short reads as a gimmick and
 * hurts legibility, while line-by-line keeps the claim readable as it arrives.
 *
 * The band diagram is the hero image. There is no stock photography of a
 * smiling plumber anywhere on this site; the product's substance is the number,
 * so the number is what gets the space.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  // Gentle parallax on the glow only. Content itself never moves on scroll —
  // text that drifts while you are reading it is hostile.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const lines = ["Know the price", "before they knock."];

  return (
    <div ref={ref} id="top" className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(167 100% 45% / 0.18), transparent 70%)",
          ...(reduce ? {} : { y: glowY, opacity: glowOpacity }),
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-ink-900/60 px-3 py-1.5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <MapPin className="size-3 text-signal-400" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-400">
              Accra &amp; Kumasi
            </span>
          </motion.div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl">
            {lines.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.1 + index * 0.1 }}
                >
                  {index === lines.length - 1 ? (
                    <>
                      before they <span className="text-signal-400">knock.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-400 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          >
            Every job on Callout carries a price band set by the trade itself — not invented
            on your doorstep. Pick the work, see the range, choose your quote.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
          >
            <Button href={LINKS.customerApp} className="group">
              Find a tradesperson
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button href={LINKS.tradespersonApp} variant="secondary">
              I&apos;m a tradesperson
            </Button>
          </motion.div>

          {/* Says something the headline does not, rather than repeating it. */}
          <motion.p
            className="mt-7 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-600"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Plumbing · Electrical · Carpentry · Mechanics · HVAC
          </motion.p>
        </div>

        {/* The diagram carries the argument. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <PriceBand
            service={FEATURED_BAND.service}
            min={FEATURED_BAND.min}
            max={FEATURED_BAND.max}
            currency={FEATURED_BAND.currency}
            quotes={[
              { amount: 9500, label: "Kofi A." },
              { amount: 13000, label: "Ama D." },
              {
                amount: 24000,
                label: "Yaw M.",
                scope:
                  "Marked custom: tap is seized into a corroded wall feed, needs the riser cut back and re-threaded.",
              },
            ]}
          />
        </motion.div>
      </div>
    </div>
  );
}
