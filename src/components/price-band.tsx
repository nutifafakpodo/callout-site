import { motion, useInView, useReducedMotion } from "framer-motion";
import * as React from "react";
import { AlertTriangle, Check } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { EASE } from "./motion";

/**
 * The animated price band.
 *
 * This is the one diagram that has to land: it is the whole product argument in
 * a single picture. A band is drawn between the catalogue minimum and maximum,
 * then quotes arrive on it — ones inside settle quietly, the one outside is
 * flagged and has to carry a written scope.
 *
 * The axis is padded beyond the band on both sides so an out-of-band quote has
 * somewhere to land; without the padding it would sit on the edge of the chart
 * and read as in-band.
 */

interface Quote {
  /** Amount in minor units (pesewas), matching the product's storage unit. */
  amount: number;
  label: string;
  /** Written justification. Required by the product for out-of-band quotes. */
  scope?: string;
}

const AXIS_PAD = 0.45;

export function PriceBand({
  service,
  min,
  max,
  currency = "GHS",
  quotes,
  className,
}: {
  service: string;
  min: number;
  max: number;
  currency?: string;
  quotes: Quote[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const play = inView || reduce;

  const span = max - min;
  const axisMin = min - span * AXIS_PAD;
  const axisMax = max + span * AXIS_PAD;
  const toPct = (value: number) =>
    ((value - axisMin) / (axisMax - axisMin)) * 100;

  const bandLeft = toPct(min);
  const bandWidth = toPct(max) - bandLeft;

  return (
    <div
      ref={ref}
      className={className}
      role="img"
      aria-label={`${service}: guild price band from ${formatMoney(min, currency)} to ${formatMoney(
        max,
        currency,
      )}. ${quotes
        .map((q) =>
          q.amount >= min && q.amount <= max
            ? `${q.label} quoted ${formatMoney(q.amount, currency)}, inside the band.`
            : `${q.label} quoted ${formatMoney(q.amount, currency)}, outside the band, which requires a written scope.`,
        )
        .join(" ")}`}
    >
      <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm sm:p-7">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Guild price band
            </p>
            <h3 className="mt-1 text-lg font-semibold text-ink-100 sm:text-xl">{service}</h3>
          </div>
          <p className="font-mono text-sm text-signal-400 sm:text-base">
            {formatMoney(min, currency)} – {formatMoney(max, currency)}
          </p>
        </div>

        {/* Axis */}
        <div className="relative h-px w-full bg-ink-700" aria-hidden="true">
          {/* The band itself, drawn outward from its own left edge. */}
          <motion.div
            className="absolute -top-px h-[3px] rounded-full bg-signal-400"
            style={{ left: `${bandLeft}%`, boxShadow: "0 0 16px hsl(167 100% 45% / 0.6)" }}
            initial={reduce ? false : { width: 0 }}
            animate={play ? { width: `${bandWidth}%` } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          />

          {/* Band endpoints */}
          {[
            { at: bandLeft, value: min },
            { at: bandLeft + bandWidth, value: max },
          ].map(({ at, value }) => (
            <motion.div
              key={value}
              // Centre the tick and its label on the value, rather than hanging
              // them off its right-hand side.
              className="absolute -top-[7px] flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${at}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={play ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: EASE, delay: 0.9 }}
            >
              <span className="h-[15px] w-px bg-signal-400" />
              <span className="mt-2 whitespace-nowrap font-mono text-[10px] text-signal-300">
                {formatMoney(value, currency)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Quotes */}
        <ul className="mt-14 space-y-3">
          {quotes.map((quote, index) => {
            const inBand = quote.amount >= min && quote.amount <= max;
            return (
              <motion.li
                key={quote.label}
                className="flex items-start gap-3"
                initial={reduce ? false : { opacity: 0, x: -12 }}
                animate={play ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  // Quotes land after the band has finished drawing, so the
                  // comparison reads in the right order.
                  delay: 1.2 + index * 0.35,
                }}
              >
                <span
                  className={[
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                    inBand
                      ? "bg-signal-400/15 text-signal-400"
                      : "bg-flag-500/15 text-flag-400",
                  ].join(" ")}
                >
                  {inBand ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : (
                    <AlertTriangle className="size-3" strokeWidth={3} />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm text-ink-200">{quote.label}</span>
                    <span
                      className={[
                        "font-mono text-sm",
                        inBand ? "text-signal-300" : "text-flag-400",
                      ].join(" ")}
                    >
                      {formatMoney(quote.amount, currency)}
                    </span>
                    {!inBand && (
                      <span className="rounded-sm bg-flag-500/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-flag-400">
                        outside band
                      </span>
                    )}
                  </span>
                  {quote.scope && (
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {quote.scope}
                    </span>
                  )}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
