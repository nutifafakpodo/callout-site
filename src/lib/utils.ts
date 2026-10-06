import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an amount held in minor units (pesewas) as cedis.
 * The product stores every money value this way; the site follows suit so the
 * figures on the page and the figures in the app cannot drift apart.
 */
export function formatMoney(minorUnits: number, currency = "GHS"): string {
  const major = minorUnits / 100;
  try {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(major);
  } catch {
    return `${currency} ${major.toFixed(0)}`;
  }
}
