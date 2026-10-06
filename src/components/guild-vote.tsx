import { motion, useInView, useReducedMotion } from "framer-motion";
import * as React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { EASE } from "./motion";

/**
 * How a band actually moves: a proposal, a vote, a new band.
 *
 * Votes arrive one at a time, the tally bar grows, and once the window closes
 * the band shifts to the proposed figures. Sequencing matters here — the whole
 * point is that the price changed *because* of the vote, so the band must not
 * move until the tally has resolved.
 *
 * Vote weights are the product's real ones: Pro members carry 1.0, basic
 * members 0.5.
 */

const VOTES = [
  { name: "Kofi A.", trade: "Plumber", tier: "pro", weight: 1, for: true },
  { name: "Ama D.", trade: "Plumber", tier: "basic", weight: 0.5, for: true },
  { name: "Yaw M.", trade: "Plumber", tier: "pro", weight: 1, for: true },
  { name: "Esi O.", trade: "Plumber", tier: "basic", weight: 0.5, for: false },
  { name: "Kwame B.", trade: "Plumber", tier: "pro", weight: 1, for: true },
] as const;

const VOTE_INTERVAL_MS = 620;

export function GuildVote({
  service,
  currentMin,
  currentMax,
  proposedMin,
  proposedMax,
  currency = "GHS",
  className,
}: {
  service: string;
  currentMin: number;
  currentMax: number;
  proposedMin: number;
  proposedMax: number;
  currency?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  // How many votes are currently on screen. Reduced motion jumps to the end
  // state so the outcome is still legible without the sequence.
  const [cast, setCast] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCast(VOTES.length);
      return;
    }

    const timers = VOTES.map((_, index) =>
      window.setTimeout(() => setCast(index + 1), index * VOTE_INTERVAL_MS),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduce]);

  const visible = VOTES.slice(0, cast);
  const votesFor = visible.filter((v) => v.for).reduce((sum, v) => sum + v.weight, 0);
  const votesAgainst = visible.filter((v) => !v.for).reduce((sum, v) => sum + v.weight, 0);
  const total = votesFor + votesAgainst;
  const forPct = total > 0 ? (votesFor / total) * 100 : 50;

  const resolved = cast === VOTES.length;
  const passed = resolved && votesFor > votesAgainst;

  return (
    <div ref={ref} className={className}>
      <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Open proposal
            </p>
            <h3 className="mt-1 text-lg font-semibold text-ink-100">{service}</h3>
          </div>
          <span
            className={[
              "rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-500",
              resolved
                ? passed
                  ? "bg-signal-400/15 text-signal-400"
                  : "bg-ink-700 text-muted-foreground"
                : "bg-ink-800 text-ink-400",
            ].join(" ")}
            aria-live="polite"
          >
            {resolved ? (passed ? "Passed" : "Rejected") : "Voting"}
          </span>
        </div>

        {/* Current → proposed */}
        <div className="mt-6 flex items-center gap-3 font-mono text-sm">
          <motion.span
            className="text-muted-foreground"
            animate={passed ? { opacity: 0.4, textDecoration: "line-through" } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {formatMoney(currentMin, currency)}–{formatMoney(currentMax, currency)}
          </motion.span>
          <span className="text-ink-600" aria-hidden="true">
            →
          </span>
          <motion.span
            className={passed ? "text-signal-400" : "text-ink-400"}
            animate={passed ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            {formatMoney(proposedMin, currency)}–{formatMoney(proposedMax, currency)}
          </motion.span>
        </div>

        {/* Tally */}
        <div className="mt-6">
          <div className="mb-2 flex items-baseline justify-between font-mono text-[11px]">
            <span className="text-signal-400">
              For {votesFor.toFixed(1).replace(/\.0$/, "")}
            </span>
            <span className="text-muted-foreground">
              Against {votesAgainst.toFixed(1).replace(/\.0$/, "")}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-800">
            <motion.div
              className="h-full rounded-full bg-signal-400"
              initial={false}
              animate={{ width: total > 0 ? `${forPct}%` : "0%" }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>

        {/* Votes as they arrive */}
        <ul className="mt-6 space-y-2">
          {visible.map((vote) => (
            <motion.li
              key={vote.name}
              className="flex items-center gap-2.5 text-sm"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span
                className={[
                  "grid size-5 shrink-0 place-items-center rounded-full",
                  vote.for
                    ? "bg-signal-400/15 text-signal-400"
                    : "bg-ink-700 text-muted-foreground",
                ].join(" ")}
              >
                {vote.for ? (
                  <ThumbsUp className="size-2.5" strokeWidth={3} />
                ) : (
                  <ThumbsDown className="size-2.5" strokeWidth={3} />
                )}
              </span>
              <span className="text-ink-200">{vote.name}</span>
              <span className="text-xs text-muted-foreground">{vote.trade}</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-ink-600">
                {vote.tier} · {vote.weight.toString()}
              </span>
            </motion.li>
          ))}
        </ul>

        <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          Pro members carry double the weight of basic members. A proposal needs enough
          participation to count, and a majority of that weight to pass.
        </p>
      </div>
    </div>
  );
}
