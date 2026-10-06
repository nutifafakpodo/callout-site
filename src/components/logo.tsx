import { cn } from "@/lib/utils";

/**
 * Wordmark.
 *
 * The bracket pair is the mark: a band with something held inside it, which is
 * what the product does to a price.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 font-semibold tracking-tight", className)}>
      <span className="font-mono text-signal-400" aria-hidden="true">
        [
      </span>
      <span className="text-ink-100">Callout</span>
      <span className="font-mono text-signal-400" aria-hidden="true">
        ]
      </span>
    </span>
  );
}
