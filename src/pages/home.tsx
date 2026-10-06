import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import {
  ArrowRight,
  CreditCard,
  Hammer,
  Inbox,
  Settings,
  ShieldCheck,
  Star,
  Thermometer,
  TrendingUp,
  Vote,
  Wallet,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { Button } from "@/components/button";
import { GuildVote } from "@/components/guild-vote";
import { Eyebrow, Magnetic, Reveal, Section, Stagger, StaggerItem } from "@/components/motion";
import {
  CUSTOMER_STEPS,
  FAQ,
  TRADES,
  TRADESPERSON_POINTS,
  TRUST_POINTS,
} from "@/lib/content";
import { LINKS } from "@/lib/links";
import { cn, formatMoney } from "@/lib/utils";

/** Icon names in content.ts map to components here, keeping copy free of JSX. */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wrench: Wrench,
  zap: Zap,
  hammer: Hammer,
  settings: Settings,
  thermometer: Thermometer,
  "trending-up": TrendingUp,
  inbox: Inbox,
  vote: Vote,
  wallet: Wallet,
  "shield-check": ShieldCheck,
  star: Star,
  "credit-card": CreditCard,
  "wifi-off": Wifi,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component className={className} />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Guild />
      <Trades />
      <ForTradespeople />
      <Trust />
      <Faq />
      <FinalCta />
    </>
  );
}

/**
 * States the problem in the customer's own terms before any product language.
 * The three lines animate as a set because they are one thought.
 */
function Problem() {
  return (
    <Section className="border-y border-border/60 bg-ink-900/40">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-ink-100 sm:text-3xl lg:text-4xl">
            Nobody tells you what a job should cost.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-ink-400">
            You describe the work, someone names a number, and you have no way to tell whether
            it is fair. So you call three more people, and get three more numbers. The
            tradesperson has the same problem in reverse — undercut by whoever is willing to
            quote below the cost of doing it properly.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how">
      <Reveal>
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-balance text-2xl font-bold leading-tight tracking-tight text-ink-100 sm:text-3xl lg:text-4xl">
          Three steps, and the price is never a mystery.
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-5 md:grid-cols-3" gap={0.1}>
        {CUSTOMER_STEPS.map((step) => (
          <StaggerItem key={step.step}>
            <Magnetic strength={4} className="h-full">
              <div className="group h-full rounded-2xl border border-border bg-card/70 p-6 transition-colors duration-300 hover:border-signal-400/40">
                <span className="font-mono text-xs text-signal-400">{step.step}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink-100">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-400">{step.body}</p>
              </div>
            </Magnetic>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** The differentiator, with the vote animation doing the explaining. */
function Guild() {
  return (
    <Section id="guild" className="border-y border-border/60 bg-ink-900/40">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>The guild</Eyebrow>
            <h2 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-ink-100 sm:text-3xl lg:text-4xl">
              Prices set by the trade, not by a platform.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty leading-relaxed text-ink-400">
              Every service in the catalogue has a band: a floor and a ceiling. Those numbers
              are not ours. A registered tradesperson proposes a change, the guild votes over a
              fixed window, and if it carries, the band moves for everyone in that trade and
              region.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-pretty leading-relaxed text-ink-400">
              It means the floor rises when the cost of doing good work rises — and it means a
              customer can look up a price without phoning around.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Button href={LINKS.tradespersonApp} variant="secondary" className="group">
                See the catalogue
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <GuildVote
            service="Replace a water heater"
            currentMin={50000}
            currentMax={90000}
            proposedMin={60000}
            proposedMax={105000}
          />
        </Reveal>
      </div>
    </Section>
  );
}

function Trades() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>Covered trades</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-balance text-2xl font-bold leading-tight tracking-tight text-ink-100 sm:text-3xl lg:text-4xl">
          Five trades, every job priced.
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07} as="ul">
        {TRADES.map((trade) => (
          <StaggerItem key={trade.name} as="li">
            <div className="group h-full rounded-2xl border border-border bg-card/70 p-6 transition-all duration-300 hover:border-signal-400/40 hover:bg-card">
              <span className="grid size-10 place-items-center rounded-xl bg-signal-400/10 text-signal-400 transition-transform duration-300 group-hover:scale-105">
                <Icon name={trade.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-100">{trade.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{trade.blurb}</p>
              <div className="mt-5 border-t border-border/70 pt-4">
                <p className="text-xs text-ink-600">{trade.example.service}</p>
                <p className="mt-1 font-mono text-sm text-signal-300">
                  {formatMoney(trade.example.min)} – {formatMoney(trade.example.max)}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}

        {/* Balances the 5-item grid and carries the "catalogue grows by vote" point. */}
        <StaggerItem as="li">
          <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-border bg-transparent p-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-signal-400">
              More to come
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-400">
              New services join the catalogue the same way prices change — a tradesperson
              proposes it, and the guild votes.
            </p>
          </div>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

function ForTradespeople() {
  return (
    <Section id="tradespeople" className="border-y border-border/60 bg-ink-900/40">
      <Reveal>
        <Eyebrow>For tradespeople</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-balance text-2xl font-bold leading-tight tracking-tight text-ink-100 sm:text-3xl lg:text-4xl">
          A rate you helped set, and work that fits it.
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2" gap={0.08}>
        {TRADESPERSON_POINTS.map((point) => (
          <StaggerItem key={point.title}>
            <div className="flex h-full gap-4 rounded-2xl border border-border bg-card/70 p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-signal-400/10 text-signal-400">
                <Icon name={point.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink-100">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{point.body}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <Button href={LINKS.tradespersonApp} className="group">
            Start taking work
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

function Trust() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>Trust</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-balance text-2xl font-bold leading-tight tracking-tight text-ink-100 sm:text-3xl lg:text-4xl">
          Verified people, real ratings, familiar payments.
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
        {TRUST_POINTS.map((point) => (
          <StaggerItem key={point.title}>
            <div className="h-full rounded-2xl border border-border bg-card/70 p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-signal-400/10 text-signal-400">
                <Icon name={point.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-100">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{point.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** Accordion FAQ. Native details/summary so it works without JS and is keyboard-accessible. */
function Faq() {
  const reduce = useReducedMotion();

  return (
    <Section id="faq" className="border-t border-border/60 bg-ink-900/40">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-ink-100 sm:text-3xl">
            The things people ask first.
          </h2>
        </Reveal>

        <div className="divide-y divide-border border-y border-border">
          {FAQ.map((item, index) => (
            <motion.details
              key={item.q}
              className="group py-5"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <span className="text-base font-medium text-ink-100">{item.q}</span>
                <span
                  className="mt-1 shrink-0 font-mono text-signal-400 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-400">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <Section>
      <Reveal>
        <div className={cn("relative overflow-hidden rounded-3xl border border-signal-400/25 bg-ink-900 px-6 py-16 text-center sm:px-12 sm:py-20")}>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle at center, hsl(167 100% 45% / 0.22), transparent 70%)",
            }}
            {...(reduce
              ? {}
              : {
                  animate: { opacity: [0.65, 1, 0.65] },
                  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                })}
          />

          <div className="relative">
            <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight text-ink-100 sm:text-4xl">
              Get the number first.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-ink-400">
              Browse the catalogue, see what the trade says the work is worth, and book someone
              verified to do it.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href={LINKS.customerApp} className="group">
                Find a tradesperson
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button href={LINKS.tradespersonApp} variant="secondary">
                I&apos;m a tradesperson
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
