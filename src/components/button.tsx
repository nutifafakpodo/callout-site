import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-signal-400 text-ink-950 hover:bg-signal-300 focus-visible:outline-signal-300 font-semibold",
  secondary:
    "border border-signal-400/40 text-signal-300 hover:border-signal-400 hover:bg-signal-400/10",
  ghost: "text-ink-200 hover:text-ink-100 hover:bg-ink-800",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-200",
    VARIANTS[variant],
    className,
  );

  // Links out to the apps are external, so they carry rel=noreferrer.
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
